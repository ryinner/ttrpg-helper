import { Injectable } from '@nestjs/common';
import { CreateCollectionDto } from './dto/create-collection.dto';
import { UpdateCollectionDto } from './dto/update-collection.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { CollectionEntity } from './entities/collection.entity';
import { CreateCollectionMapper } from './mappers/create-collection.mapper';
import { Languages } from '@repo/api-sdk';
import { UpdateCollectionMapper } from './mappers/update-collection.mapper';

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

  // findAll() {
  //   return `This action returns all collections`;
  // }

  public async findOne(id: number): Promise<CollectionEntity> {
    const collection = await this.collection.findFirstOrThrow({
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
