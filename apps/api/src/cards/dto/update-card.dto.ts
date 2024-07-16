import { CreateCardDto } from './create-card.dto';
import { ApiProperty, PartialType } from '@nestjs/swagger';

export class UpdateCardDto extends PartialType(CreateCardDto) {
  @ApiProperty({ required: true })
  id: number;
}
