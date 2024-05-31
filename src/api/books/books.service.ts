import {
  BadRequestException,
  ConflictException,
  Injectable
} from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { Book } from './books.schema'
import { BookCreateeDto, BookUpdateDto } from './books.dto'

@Injectable()
export class BooksService {
  constructor(
    @InjectModel(Book.name)
    private bookModel: Model<Book>
  ) {}

  async findAll() {
    return this.bookModel.find({}, { _id: 0, _v: 0 }).exec()
  }

  async findById(id: string) {
    return this.bookModel.findOne({ id }, { _id: 0, _v: 0 }).exec()
  }

  async create(createDto: BookCreateeDto) {
    const exists = await this.findById(createDto.id)
    if (exists) {
      throw new ConflictException(`book with ISBN: ${createDto.id} exists`)
    }
    const now = new Date()
    const book: Book = {
      ...createDto,
      recordCreated: now,
      recordLastUpdate: now
    }
    return this.bookModel.create(book)
  }

  async update(updateDto: BookUpdateDto, id: string) {
    const existingRecord = await this.findById(id)
    if (!existingRecord) {
      throw new BadRequestException(`book with ISBN: ${id} does not exist`)
    }
    const newRecord = Object.assign(existingRecord, updateDto)
    newRecord.recordLastUpdate = new Date()
    await this.bookModel.updateOne({ id }, newRecord).exec()
    return newRecord
  }

  async deleteBook(id: string) {
    const exists = await this.findById(id)
    if (!exists) {
      throw new BadRequestException(`book with ISBN: ${id} does not exist`)
    }
    return this.bookModel.deleteOne({ id }).exec()
  }
}
