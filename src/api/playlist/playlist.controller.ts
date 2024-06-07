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
import { PlaylistService } from './playlist.service'
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston'
import { Playlist } from './playlist.schema'
import { CreatePlaylistDto, PatchPlaylistDto } from './playlist.dto'

@ApiTags('playlist management apis')
@Controller('playlist')
export class PlaylistController {
  constructor(
    private readonly playlistservice: PlaylistService,
    @Inject(WINSTON_MODULE_NEST_PROVIDER)
    private readonly logger: LoggerService
  ) {}

  @ApiOperation({ summary: 'Get all playlists' })
  @ApiOkResponse({ type: [Playlist] })
  @Get()
  async getAll() {
    const start = Date.now()
    const playlists = await this.playlistservice.findAll()
    this.logger.debug(`GET /playlists completed in ${Date.now() - start}ms`)
    return playlists
  }

  @ApiOperation({ summary: 'Get playlist by ID' })
  @ApiOkResponse({ type: Playlist })
  @ApiNotFoundResponse()
  @Get(':id')
  async getById(@Param('id') id: string) {
    const record = await this.playlistservice.findById(id)
    if (!record) {
      throw new NotFoundException(`no playlist found for id: ${id}`)
    }
    return record
  }

  @ApiOperation({ summary: 'Create playlist' })
  @ApiCreatedResponse({ type: Playlist })
  @Post()
  async createBook(@Body() createDto: CreatePlaylistDto) {
    return this.playlistservice.create(createDto)
  }

  @ApiOperation({ summary: 'Update playlist' })
  @ApiOkResponse({ type: Playlist })
  @ApiNotFoundResponse()
  @Patch(':id')
  async uddateById(
    @Param('id') id: string,
    @Body() updateDto: PatchPlaylistDto
  ) {
    return this.playlistservice.patch(updateDto, id)
  }
}
