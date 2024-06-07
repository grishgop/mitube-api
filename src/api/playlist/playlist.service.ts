import { BadRequestException, Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Playlist, Video } from './playlist.schema'
import { Model } from 'mongoose'
import { CreatePlaylistDto, PatchPlaylistDto } from './playlist.dto'
import { randomUUID } from 'crypto'

@Injectable()
export class PlaylistService {
  constructor(
    @InjectModel(Playlist.name)
    private playlistModel: Model<Playlist>
  ) {}
  async findAll() {
    return this.playlistModel.find({}, { _id: 0, _v: 0 }).exec()
  }

  async findById(id: string) {
    return this.playlistModel.findOne({ id }, { _id: 0, _v: 0 }).exec()
  }

  async create(createDto: CreatePlaylistDto) {
    const now = new Date()
    const playlist: Playlist = {
      ...createDto,
      recordCreated: now,
      recordLastUpdate: now,
      id: randomUUID(),
      videos: []
    }
    return this.playlistModel.create(playlist)
  }

  async patch(patchDto: PatchPlaylistDto, id: string) {
    const playlist = await this.findById(id)
    if (!playlist) {
      throw new BadRequestException(`no playlist with id: ${id}`)
    }
    const videoMap = playlist.videos.reduce((acc, video, idx) => {
      acc[video.videoId] = idx + 1
      return acc
    }, {} as any)

    if (patchDto.videos) {
      const hasDuplicate = patchDto.videos.some((val) => {
        return videoMap[val.videoId] ? true : false
      })
      if (hasDuplicate) {
        throw new BadRequestException('duplicate video')
      }
      playlist.videos = playlist.videos.concat(patchDto.videos)
    }
    if (patchDto.deleteVideos && patchDto.deleteVideos.length > 0) {
      patchDto.deleteVideos.forEach((val) => {
        if (videoMap[val]) {
          playlist.videos.splice(videoMap[val] - 1, 1)
        }
      })
    }
    await this.playlistModel.updateOne({ id }, playlist)
    return playlist
  }
}
