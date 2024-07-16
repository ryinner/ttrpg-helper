import type { Card, CardTranslate } from '@prisma/client';

export class CardEntity {
  constructor(card: Partial<Card>, cardTranslate: Partial<CardTranslate>) {
    this.id = card.id;
    this.name = cardTranslate.name;
    this.description = cardTranslate.description;
  }

  id: number;

  name: string;

  description: string;
}
