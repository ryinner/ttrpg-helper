import { Prisma } from '@prisma/client';
import { UpdateCollectionDto } from '../dto/update-collection.dto';

export class UpdateCollectionMapper {
  public toPrisma(UpdateCardDto: UpdateCollectionDto): {
    translate: Prisma.CollectionTranslateUpdateInput;
  } {
    const translateUpdate: Prisma.CollectionTranslateUpdateWithoutCollectionInput =
      {};
    if (UpdateCollectionDto.name) {
      translateUpdate.name = UpdateCardDto.name;
    }
    return {
      translate: translateUpdate,
    };
  }
}
