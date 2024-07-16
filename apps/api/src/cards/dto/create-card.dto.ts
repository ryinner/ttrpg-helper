import { ApiProperty } from '@nestjs/swagger';

export class CreateCardDto {
  @ApiProperty({ required: true })
  name: string;

  @ApiProperty({ required: true })
  description: string;

  @ApiProperty({ required: true })
  languageId: number;
}
