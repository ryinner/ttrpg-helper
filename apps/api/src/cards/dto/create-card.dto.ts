import { ApiProperty } from '@nestjs/swagger';
import { ICreateCardDto, Languages } from '@repo/api-sdk';
import {
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

export class CreateCardDto implements ICreateCardDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(64)
  @ApiProperty({ required: true, maxLength: 64 })
  name: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(512)
  @ApiProperty({ required: true, maxLength: 512 })
  description: string;

  @IsInt()
  @IsOptional()
  @ApiProperty({ required: false })
  languageId: number = Languages.Russian;
}
