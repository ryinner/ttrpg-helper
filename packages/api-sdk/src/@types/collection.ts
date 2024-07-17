interface ICollectionCreateDto {
  name: string;
}

interface ICollectionUpdateDto extends Partial<ICollectionCreateDto> {
  id: number;
}

interface ICollectionEntity {
  id: number;
  name: string;
}

export type { ICollectionCreateDto, ICollectionUpdateDto, ICollectionEntity };
