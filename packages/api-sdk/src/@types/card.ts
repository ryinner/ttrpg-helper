interface ICreateCardDto {
  name: string;
  description: string;
}

interface IUpdateCardDto extends Partial<ICreateCardDto> {
  id: number;
}

interface ICardEntity {
  id: number;
  name: string;
  description: string;
}

export type { ICardEntity, ICreateCardDto, IUpdateCardDto };
