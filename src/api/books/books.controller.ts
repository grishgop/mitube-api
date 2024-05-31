import {
  Body,
  Controller,
  Get,
  Inject,
  LoggerService,
  NotFoundException,
  Param,
  Patch,
  Post
} from '@nestjs/common'
import {
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags
} from '@nestjs/swagger'
import { BooksService } from './books.service'
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston'
import { Book } from './books.schema'
import { BookCreateeDto, BookUpdateDto } from './books.dto'

@ApiTags('Book management APIs')
@Controller('books')
export class BooksController {
  constructor(
    private readonly bookService: BooksService,
    @Inject(WINSTON_MODULE_NEST_PROVIDER)
    private readonly logger: LoggerService
  ) {}

  @ApiOperation({ summary: 'Get all books' })
  @ApiOkResponse({ type: [Book] })
  @Get()
  async getAll() {
    const start = Date.now()
    const books = await this.bookService.findAll()
    this.logger.debug(`GET /books completed in ${Date.now() - start}ms`)
    return books
  }

  @ApiOperation({ summary: 'Get book by ID (ISBN)' })
  @ApiOkResponse({ type: Book })
  @ApiNotFoundResponse()
  @Get(':id')
  async getById(@Param('id') id: string) {
    const record = await this.bookService.findById(id)
    if (!record) {
      throw new NotFoundException(`no book found for ISBN: ${id}`)
    }
    return record
  }

  @ApiOperation({ summary: 'Create book record' })
  @ApiCreatedResponse({ type: Book })
  @Post()
  async createBook(@Body() createDto: BookCreateeDto) {
    return this.bookService.create(createDto)
  }

  @ApiOperation({ summary: 'Update book by ID (ISBN)' })
  @ApiOkResponse({ type: Book })
  @ApiNotFoundResponse()
  @Patch(':id')
  async uddateById(@Param('id') id: string, @Body() updateDto: BookUpdateDto) {
    return this.bookService.update(updateDto, id)
  }
}
