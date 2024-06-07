import { Module } from '@nestjs/common'
import { YtService } from './yt.service'
import { YtController } from './yt.controller'
import { HttpModule } from '@nestjs/axios'

@Module({
  imports: [
    HttpModule.register({
      timeout: 60000
    })
  ],
  providers: [YtService],
  controllers: [YtController]
})
export class YtModule {}
