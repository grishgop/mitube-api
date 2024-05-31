import {
  CallHandler,
  ExecutionContext,
  INestApplication,
  NestInterceptor,
  ValidationPipe,
  VersioningType
} from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { Response as ExpressResponse } from 'express'

export class ApiResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler<any>) {
    const response: ExpressResponse = context.switchToHttp().getResponse()
    response.setHeader('Cache-Control', 'no-store')
    return next.handle()
  }
}

export function initializeApiServer(app: INestApplication) {
  app.enableVersioning({
    type: VersioningType.URI,
    prefix: 'v',
    defaultVersion: '1'
  })
  app.setGlobalPrefix('/api', {
    exclude: ['ping']
  })
  app.useGlobalPipes(
    new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true })
  )
  app.useGlobalInterceptors(new ApiResponseInterceptor())
  const configService = app.get(ConfigService)
  const startApiDocs = configService.getOrThrow<string>('startApiDocs')
  if (startApiDocs === 'true') {
    const config = new DocumentBuilder()
      .setTitle('Sample APIs')
      .setDescription('This is a sample API server')
      .setVersion('1.0')
      .addBearerAuth(undefined, 'defaultBearerAuth')
      .build()
    const document = SwaggerModule.createDocument(app, config)
    SwaggerModule.setup('api-docs', app, document)
  }
}
