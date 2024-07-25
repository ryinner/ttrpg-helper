import { CollectionEntity } from './collection.entity';

const collectionEntityExample = new CollectionEntity({
  id: 1,
  translates: [
    {
      id: 1,
      name: 'Жрец',
    },
  ],
});

const collectionEntitySecondExample = new CollectionEntity({
  id: 2,
  translates: [
    {
      id: 2,
      name: 'Воин',
    },
  ],
});

const collectionEntityArrayExample = [
  collectionEntityExample,
  collectionEntitySecondExample,
];

export { collectionEntityExample, collectionEntityArrayExample };
