import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { WinstonModule } from 'nest-winston'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import config from './configuration/config'
import { loggerFactory } from './logger/logger.factory'
import { MongooseModule } from '@nestjs/mongoose'
import { BooksModule } from './api/books/books.module'
import { PlaylistModule } from './api/playlist/playlist.module'
import { YtModule } from './api/yt/yt.module'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      load: [config]
    }),
    WinstonModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        return loggerFactory(config)
      }
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => {
        return {
          uri: config.getOrThrow<string>('mongoUrl'),
          dbName: config.getOrThrow<string>('mongoDatabaseName')
        }
      }
    }),
    BooksModule,
    PlaylistModule,
    YtModule
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
