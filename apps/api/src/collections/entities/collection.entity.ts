import { ApiProperty } from '@nestjs/swagger';
import { Collection, CollectionTranslate } from '@prisma/client';
import { ICollectionEntity } from '@repo/api-sdk';

export class CollectionEntity implements ICollectionEntity {
  constructor(
    collection: Partial<Collection & { translates: CollectionTranslate[] }>,
  ) {
    this.id = collection.id;
    this.name = collection.translates[0].name;
  }

  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;
}
