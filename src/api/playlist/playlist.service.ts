import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose';
import { Playlist } from './playlist.schema';
import { Model } from 'mongoose';
import { CreatePlaylistDto } from './playlist.dto';
import { randomUUID } from 'crypto';

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
          videos: [],
        }
        return this.playlistModel.create(playlist)
      }
}
