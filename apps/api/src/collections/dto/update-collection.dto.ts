import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateCollectionDto } from './create-collection.dto';
import { IUpdateCollectionDto } from '@repo/api-sdk';
import { IsInt, IsNotEmpty } from 'class-validator';

export class UpdateCollectionDto
  extends PartialType(CreateCollectionDto)
  implements IUpdateCollectionDto
{
  @IsInt()
  @IsNotEmpty()
  @ApiProperty({ required: true })
  id: number;
}
