import { ApiProperty } from '@nestjs/swagger';
import { Card, CardTranslate } from '@prisma/client';
import { ICardEntity } from '@repo/api-sdk';

export class CardEntity implements ICardEntity {
  constructor(card: Partial<Card & { translates: Partial<CardTranslate>[] }>) {
    this.id = card.id;
    this.name = card.translates[0].name;
    this.description = card.translates[0].description;
  }

  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  description: string;
}
