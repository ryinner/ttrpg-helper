import { IUpdateCardDto } from '@repo/api-sdk';
import { CreateCardDto } from './create-card.dto';
import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsInt, IsNotEmpty } from 'class-validator';

export class UpdateCardDto
  extends PartialType(CreateCardDto)
  implements IUpdateCardDto
{
  @IsInt()
  @IsNotEmpty()
  @ApiProperty({ required: true })
  id: number;
}
