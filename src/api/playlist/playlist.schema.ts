import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { ApiProperty } from '@nestjs/swagger'
import { Type } from 'class-transformer'
import { ArrayMaxSize, IsArray, IsDateString, MaxLength } from 'class-validator'

export class Video {
  @ApiProperty({ description: 'title' })
  @Prop({ required: true })
  @MaxLength(5000)
  title: string

  @ApiProperty({ description: 'video id' })
  @Prop({ required: true })
  @MaxLength(500)
  videoId: string

  @ApiProperty({ description: 'thumbnail url' })
  @Prop({ required: true })
  @MaxLength(1000)
  thumbnailurl: string

  @ApiProperty({ description: 'description' })
  @Prop({ required: true })
  @MaxLength(5000)
  description: string

  @ApiProperty({ description: 'channel title' })
  @Prop({ required: true })
  @MaxLength(500)
  channeltitle: string

  @ApiProperty({ description: 'channel id' })
  @Prop({ required: true })
  @MaxLength(500)
  channelId: string

  @ApiProperty({ description: 'published at' })
  @Prop({ required: true })
  @MaxLength(500)
  publishedAt: Date

  @ApiProperty({ description: 'embed html' })
  @Prop({ required: true })
  @MaxLength(500)
  embedHtml: string
}

@Schema({
  autoCreate: true,
  collection: 'playlists'
})
export class Playlist {
  @ApiProperty({ description: 'playlist id' })
  @Prop({ required: true })
  @MaxLength(500)
  id: string

  @ApiProperty({ description: 'name' })
  @Prop({ required: true })
  @MaxLength(1000)
  name: string

  @ApiProperty({ description: 'date this entry was created in database' })
  @Prop({ required: true })
  recordCreated: Date

  @ApiProperty({ description: 'date this entry was updated in database' })
  @Prop({ required: true })
  recordLastUpdate: Date

  @ApiProperty({ description: 'videos', type: [Video] })
  @Prop([{ type: Video }])
  @MaxLength(500)
  @Type(() => Video)
  @IsArray()
  @ArrayMaxSize(1000)
  videos: Video[]
}

export const PlaylistSchema = SchemaFactory.createForClass(Playlist)

PlaylistSchema.index({ id: 1 }, { unique: true })
