import { Prisma } from '@prisma/client';
import { UpdateCardDto } from '../dto/update-card.dto';

export class UpdateCardMapper {
  toPrisma(updateCardDto: UpdateCardDto): {
    translate: Prisma.CardTranslateUpdateInput;
  } {
    const translateUpdate: Prisma.CardTranslateUpdateWithoutCardInput = {};
    if (updateCardDto.description) {
      translateUpdate.description = updateCardDto.description;
    }
    if (translateUpdate.name) {
      translateUpdate.name = updateCardDto.name;
    }
    return {
      translate: translateUpdate,
    };
  }
}
