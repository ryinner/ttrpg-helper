import { ApiProperty } from '@nestjs/swagger';
import { ICreateCollectionDto } from '@repo/api-sdk';
import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateCollectionDto implements ICreateCollectionDto {
  @IsString()
  @MaxLength(64)
  @IsNotEmpty()
  @ApiProperty({ required: true, maxLength: 64 })
  name: string;
}
