import { ApiProperty } from '@nestjs/swagger';
import { ICreateCardDto } from '@repo/api-sdk';

export class CreateCardDto implements ICreateCardDto {
  @ApiProperty({ required: true })
  name: string;

  @ApiProperty({ required: true })
  description: string;

  @ApiProperty({ required: false })
  languageId: number;
}
