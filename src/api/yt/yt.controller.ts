import { Controller, Get, Query } from '@nestjs/common'
import { ApiOkResponse, ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger'
import { YtService } from './yt.service'

@ApiTags('video apis')
@Controller('videos')
export class YtController {
  constructor(private readonly ytService: YtService) {}
  @ApiOperation({ summary: 'Search YouTube videos' })
  @ApiOkResponse()
  @Get()
  @ApiQuery({
    name: 'title',
    required: true,
    type: String
  })
  @ApiQuery({
    name: 'pageToken',
    required: false,
    type: String
  })
  async search(
    @Query('title') title: string,
    @Query('pageToken') pageToken: string
  ) {
    return this.ytService.searchVideo(title, pageToken)
  }

  @ApiOperation({ summary: 'Get video info' })
  @ApiOkResponse()
  @Get('details')
  @ApiQuery({
    name: 'id',
    required: true,
    type: String
  })
  async getVidInfo(@Query('id') id: string) {
    return this.ytService.getVidById(id)
  }
}
