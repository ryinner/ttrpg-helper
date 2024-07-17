import { ApiProperty } from '@nestjs/swagger';
import { ICollectionEntity } from '@repo/api-sdk';

export class CollectionEntity implements ICollectionEntity {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;
}
