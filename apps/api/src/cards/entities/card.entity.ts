import { Card, CardTranslate } from '@prisma/client';
import { ICardEntity } from '@repo/api-sdk';

export class CardEntity implements ICardEntity {
  constructor(card: Partial<Card>, cardTranslate: Partial<CardTranslate>) {
    this.id = card.id;
    this.name = cardTranslate.name;
    this.description = cardTranslate.description;
  }

  id: number;

  name: string;

  description: string;
}
