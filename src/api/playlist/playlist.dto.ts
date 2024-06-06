import { ApiProperty } from "@nestjs/swagger"
import { Type } from "class-transformer"
import { MaxLength, IsDateString, IsArray, ArrayMaxSize, IsOptional } from "class-validator"
import { Video } from "./playlist.schema"

export class CreatePlaylistDto {
  @ApiProperty({ description: 'name' })
  @MaxLength(1000)
  name: string

  @ApiProperty({ description: 'videos', type: [Video] })
  @MaxLength(500)
  @Type(() => Video)
  @IsArray()
  @ArrayMaxSize(1000)
  @IsOptional()
  videos: Video[]
}