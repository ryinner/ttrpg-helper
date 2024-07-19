import { ApiProperty } from '@nestjs/swagger';
import { Collection, CollectionTrasnlate } from '@prisma/client';
import { ICollectionEntity } from '@repo/api-sdk';

export class CollectionEntity implements ICollectionEntity {
  constructor(
    collection: Partial<Collection & { translates: CollectionTrasnlate[] }>,
  ) {
    this.id = collection.id;
    this.name = collection.translates[0].name;
  }

  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;
}
