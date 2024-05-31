import { Test, TestingModule } from '@nestjs/testing'
import { BooksController } from './books.controller'
import { BooksService } from './books.service'
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston'

describe('BooksController', () => {
  let controller: BooksController

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: BooksService,
          useValue: jest.fn()
        },
        {
          provide: WINSTON_MODULE_NEST_PROVIDER,
          useValue: jest.fn()
        }
      ],
      controllers: [BooksController]
    }).compile()

    controller = module.get<BooksController>(BooksController)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })
})
