import { Injectable } from '@nestjs/common';
import { CreateCardDto } from './dto/create-card.dto';
import { UpdateCardDto } from './dto/update-card.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCardMapper } from './mappers/create-card.mapper';
import { CardEntity } from './entities/card.entity';
import { Languages } from '@repo/api-sdk';
import { UpdateCardMapper } from './mappers/update-card.mapper';

@Injectable()
export class CardsService extends PrismaService {
  async create(createCardDto: CreateCardDto) {
    const card = await this.card.create({
      data: new CreateCardMapper().toPrisma(createCardDto),
      include: {
        translates: {
          where: {
            languageId: createCardDto.languageId,
          },
        },
      },
    });
    return new CardEntity(card);
  }

  async findOne(id: number) {
    const card = await this.card.findFirstOrThrow({
      include: {
        translates: {
          where: {
            languageId: Languages.Russian,
          },
        },
      },
      where: {
        id,
      },
    });

    return new CardEntity(card);
  }

  async update(id: number, updateCardDto: UpdateCardDto) {
    const { translate } = new UpdateCardMapper().toPrisma(updateCardDto);

    const card = await this.card.update({
      data: {
        translates: {
          update: {
            data: translate,
            where: {
              cardId_languageId: {
                cardId: id,
                languageId: updateCardDto.languageId,
              },
            },
          },
        },
      },
      where: {
        id,
      },
      include: {
        translates: {
          where: {
            languageId: Languages.Russian,
          },
        },
      },
    });

    return new CardEntity(card);
  }

  async remove(id: number) {
    return await this.card.delete({
      where: {
        id,
      },
    });
  }
}
