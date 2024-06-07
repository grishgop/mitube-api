import { ApiProperty } from '@nestjs/swagger'
import { Type } from 'class-transformer'
import {
  MaxLength,
  IsDateString,
  IsArray,
  ArrayMaxSize,
  IsOptional
} from 'class-validator'
import { Video } from './playlist.schema'

export class CreatePlaylistDto {
  @ApiProperty({ description: 'name' })
  @MaxLength(1000)
  name: string

  @ApiProperty({ description: 'videos', type: [Video] })
  @Type(() => Video)
  @IsArray()
  @ArrayMaxSize(1000)
  @IsOptional()
  videos: Video[]
}

export class PatchPlaylistDto {
  @ApiProperty({ description: 'videos', type: [Video] })
  @Type(() => Video)
  @IsArray()
  @ArrayMaxSize(1000)
  @IsOptional()
  videos: Video[]

  @ApiProperty({ description: 'videos', type: [String] })
  @MaxLength(500, { each: true })
  @IsArray()
  @ArrayMaxSize(1000)
  @IsOptional()
  deleteVideos: string[]
}
