import { Injectable } from '@nestjs/common';
import { CreateCollectionDto } from './dto/create-collection.dto';
import { UpdateCollectionDto } from './dto/update-collection.dto';
import { PrismaService } from '@/prisma/prisma.service';
import { CollectionEntity } from './entities/collection.entity';
import { CreateCollectionMapper } from './mappers/create-collection.mapper';
import { Languages } from '@repo/api-sdk';
import { UpdateCollectionMapper } from './mappers/update-collection.mapper';
import { CardEntity } from '@/cards/entities/card.entity';

@Injectable()
export class CollectionsService extends PrismaService {
  public async create(createCollectionDto: CreateCollectionDto) {
    const collection = await this.collection.create({
      data: new CreateCollectionMapper().toPrisma(createCollectionDto),
      include: {
        translates: {
          where: {
            languageId: Languages.Russian,
          },
        },
      },
    });
    return new CollectionEntity(collection);
  }

  public async findAll(): Promise<CollectionEntity[]> {
    const collections = await this.collection.findMany({
      where: {
        isPublished: true,
      },
      include: {
        translates: {
          where: {
            languageId: Languages.Russian,
          },
        },
      },
    });
    return collections.map((c) => new CollectionEntity(c));
  }

  public async findOne(id: number): Promise<CollectionEntity> {
    const collection = await this.collection.findFirstOrThrow({
      where: {
        id,
        isPublished: true,
      },
      include: {
        translates: {
          where: {
            languageId: Languages.Russian,
          },
        },
      },
    });
    return new CollectionEntity(collection);
  }

  public async findCards(id: number): Promise<CardEntity[]> {
    const collection = await this.collection.findFirst({
      where: {
        id,
        isPublished: true,
      },
      include: {
        cardsCollection: {
          include: {
            card: {
              include: {
                translates: {
                  where: {
                    languageId: Languages.Russian,
                  },
                },
              },
            },
          },
        },
      },
    });

    return collection.cardsCollection.map((cc) => new CardEntity(cc.card));
  }

  public async update(id: number, updateCollectionDto: UpdateCollectionDto) {
    const { translate } = new UpdateCollectionMapper().toPrisma(
      updateCollectionDto,
    );

    const collection = await this.collection.update({
      data: {
        translates: {
          update: {
            data: translate,
            where: {
              languageId_collectionId: {
                collectionId: id,
                languageId: Languages.Russian,
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
    return new CollectionEntity(collection);
  }

  public async remove(id: number) {
    return await this.collection.delete({
      where: {
        id,
      },
    });
  }
}
