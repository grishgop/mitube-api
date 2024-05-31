import { loggerFactory } from './logger.factory'

describe('LoggerFactory', () => {
  let config: any
  beforeEach(() => {
    config = {
      getOrThrow: jest.fn()
    }
  })

  it('should initialize logger', async () => {
    config.getOrThrow.mockReturnValueOnce('debug')
    const resp = await loggerFactory(config)
    expect(resp.level).toStrictEqual('debug')
  })
})
