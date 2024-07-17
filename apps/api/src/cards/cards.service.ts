import { Injectable } from '@nestjs/common';
import { CreateCardDto } from './dto/create-card.dto';
import { UpdateCardDto } from './dto/update-card.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCardMapper } from './mappers/create-card.mapper';
import { CardEntity } from './entities/card.entity';
import { Languages } from '@repo/api-sdk';

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
    const card = await this.card.findFirst({
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

  update(id: number, updateCardDto: UpdateCardDto) {
    return `This action updates a #${id} card`;
  }

  remove(id: number) {
    return `This action removes a #${id} card`;
  }
}
