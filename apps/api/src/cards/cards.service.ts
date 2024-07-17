import { Injectable } from '@nestjs/common';
import { CreateCardDto } from './dto/create-card.dto';
import { UpdateCardDto } from './dto/update-card.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCardMapper } from './mappers/create-card.mapper';
import { CardEntity } from './entities/card.entity';

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

  findAll() {
    return 'This action returns all cards';
  }

  async findOne(id: number) {
    const card = await this.card.findFirst({
      include: {},
      where: {
        id,
      },
    });

    return `This action returns a #${id} card`;
  }

  update(id: number, updateCardDto: UpdateCardDto) {
    return `This action updates a #${id} card`;
  }

  remove(id: number) {
    return `This action removes a #${id} card`;
  }
}
