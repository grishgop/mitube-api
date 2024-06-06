import { Module } from '@nestjs/common'
import { PlaylistService } from './playlist.service'
import { PlaylistController } from './playlist.controller'
import { Playlist, PlaylistSchema } from './playlist.schema'
import { MongooseModule } from '@nestjs/mongoose'

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Playlist.name,
        schema: PlaylistSchema
      }
    ])
  ],
  providers: [PlaylistService],
  controllers: [PlaylistController]
})
export class PlaylistModule {}
