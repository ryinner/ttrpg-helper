import { CardEntity } from './card.entity';

const cardEntityExample = new CardEntity({
  id: 1,
  translates: [
    {
      name: 'Тремер',
      description: 'Вампирский клан кровавых чародеев',
    },
  ],
});

const cardEntitySecondExample = new CardEntity({
  id: 2,
  translates: [
    {
      name: 'Носферату',
      description: 'Вампирский клан изуродованный проклятьем',
    },
  ],
});

const cardEntityArrayExample = [cardEntityExample, cardEntitySecondExample];

export { cardEntityExample, cardEntityArrayExample };
