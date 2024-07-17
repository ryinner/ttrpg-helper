import { IUpdateCardDto } from '@repo/api-sdk';
import { CreateCardDto } from './create-card.dto';
import { ApiProperty, PartialType } from '@nestjs/swagger';

export class UpdateCardDto
  extends PartialType(CreateCardDto)
  implements IUpdateCardDto
{
  @ApiProperty({ required: true })
  id: number;
}
