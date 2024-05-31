import { Test, TestingModule } from '@nestjs/testing'
import { BooksService } from './books.service'
import { getModelToken } from '@nestjs/mongoose'
import { Book } from './books.schema'

describe('BooksService', () => {
  let service: BooksService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BooksService,
        {
          provide: getModelToken(Book.name),
          useValue: jest.fn()
        }
      ]
    }).compile()

    service = module.get<BooksService>(BooksService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
