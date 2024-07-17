import { CreateCardDto } from '../dto/create-card.dto';
import { Prisma } from '@prisma/client';

export class CreateCardMapper {
  toPrisma(createCardDto: CreateCardDto): Prisma.CardCreateInput {
    return {
      translates: {
        create: {
          name: createCardDto.name,
          description: createCardDto.description,
          languageId: createCardDto.languageId,
        },
      },
    };
  }
}
