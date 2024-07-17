interface ICreateCardDto {
  name: string;
  description: string;
  languageId?: number;
}

interface IUpdateCardDto extends Partial<ICreateCardDto> {
  id: number;
}

interface ICardEntity {
  id: number;
  name: string;
  description: string;
}

export type { ICreateCardDto, IUpdateCardDto, ICardEntity };
