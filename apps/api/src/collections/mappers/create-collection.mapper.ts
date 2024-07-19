import { Prisma } from '@prisma/client';
import { CreateCollectionDto } from '../dto/create-collection.dto';
import { Languages } from '@repo/api-sdk';

export class CreateCollectionMapper {
  public toPrisma(
    createCollectionDto: CreateCollectionDto,
  ): Prisma.CollectionCreateInput {
    return {
      translates: {
        create: {
          name: createCollectionDto.name,
          languageId: Languages.Russian,
        },
      },
    };
  }
}
