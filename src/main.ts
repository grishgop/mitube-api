import helmet from 'helmet'
import { NestFactory } from '@nestjs/core'
import { NestExpressApplication } from '@nestjs/platform-express'
import { AppModule } from './app.module'
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston'
import { ConfigService } from '@nestjs/config'
import { initializeApiServer } from './api-util'

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule)
  app.enableCors({
    credentials: true,
    origin: true
  })
  app.use(helmet())
  app.useLogger(app.get(WINSTON_MODULE_NEST_PROVIDER))
  const config = app.get(ConfigService)
  initializeApiServer(app)
  await app.listen(config.getOrThrow<number>('port'))
}
bootstrap()
