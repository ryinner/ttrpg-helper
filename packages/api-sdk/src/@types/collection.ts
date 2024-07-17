interface ICreateCollectionDto {
  name: string;
}

interface IUpdateCollectionDto extends Partial<ICreateCollectionDto> {
  id: number;
}

interface ICollectionEntity {
  id: number;
  name: string;
}

export type { ICreateCollectionDto, IUpdateCollectionDto, ICollectionEntity };
