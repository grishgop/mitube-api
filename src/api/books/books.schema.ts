import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { ApiProperty } from '@nestjs/swagger'
import { IsDateString, MaxLength } from 'class-validator'

@Schema({
  autoCreate: true,
  collection: 'books'
})
export class Book {
  @ApiProperty({ description: 'book ISBN' })
  @Prop({ required: true })
  @MaxLength(500)
  id: string

  @ApiProperty({ description: 'book title' })
  @Prop({ required: true })
  @MaxLength(1000)
  title: string

  @ApiProperty({ description: 'book author' })
  @Prop({ required: true })
  @MaxLength(500)
  author: string

  @ApiProperty({ description: 'book publish date. use format YYYYMMDD.' })
  @Prop({ required: true })
  @MaxLength(10)
  @IsDateString()
  publishDate: string

  @ApiProperty({ description: 'date this entry was created in database' })
  @Prop({ required: true })
  recordCreated: Date

  @ApiProperty({ description: 'date this entry was updated in database' })
  @Prop({ required: true })
  recordLastUpdate: Date
}

export const BookSchema = SchemaFactory.createForClass(Book)

BookSchema.index({ id: 1 }, { unique: true })
