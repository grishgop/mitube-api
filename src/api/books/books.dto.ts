import { ApiProperty } from '@nestjs/swagger'
import {
  MaxLength,
  IsDateString,
  IsOptional,
  IsNotEmpty
} from 'class-validator'

export class BookCreateeDto {
  @ApiProperty({ description: 'book ISBN' })
  @IsNotEmpty()
  @MaxLength(500)
  id: string

  @ApiProperty({ description: 'book title' })
  @IsNotEmpty()
  @MaxLength(1000)
  title: string

  @ApiProperty({ description: 'book author' })
  @IsNotEmpty()
  @MaxLength(500)
  author: string

  @ApiProperty({ description: 'book publish date. use format YYYYMMDD.' })
  @IsNotEmpty()
  @MaxLength(10)
  @IsDateString()
  publishDate: string
}

export class BookUpdateDto {
  @ApiProperty({ description: 'book title' })
  @IsOptional()
  @MaxLength(1000)
  title: string

  @ApiProperty({ description: 'book author' })
  @IsOptional()
  @MaxLength(500)
  author: string

  @ApiProperty({ description: 'book publish date. use format YYYYMMDD.' })
  @IsOptional()
  @MaxLength(10)
  @IsDateString()
  publishDate: string
}
