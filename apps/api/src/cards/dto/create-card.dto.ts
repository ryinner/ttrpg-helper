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
  @ApiProperty({ required: true })
  name: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(512)
  @ApiProperty({ required: true })
  description: string;

  @IsInt()
  @IsOptional()
  @ApiProperty({ required: false })
  languageId: number = Languages.Russian;
}
