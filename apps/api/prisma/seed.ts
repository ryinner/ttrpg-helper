import { PrismaClient } from '@prisma/client';
import { Languages, TTRPGS, Tags } from '@repo/api-sdk';

const prisma = new PrismaClient();

async function languages(): Promise<void> {
  const languagesCount = await prisma.language.count();
  if (languagesCount === 0) {
    await prisma.language.createMany({
      data: [
        {
          id: Languages.Russian,
          code: 'ru',
        },
        {
          id: Languages.English,
          code: 'en',
        },
      ],
    });
  }
}

async function ttrpgs(): Promise<void> {
  const systemsCount = await prisma.tTRPG.count();
  if (systemsCount === 0) {
    await prisma.tTRPG.create({
      data: {
        id: TTRPGS.VampireTheMasquerade,
        translates: {
          createMany: {
            data: [
              {
                languageId: Languages.Russian,
                name: 'Вампиры Маскарад',
                nameShort: 'ВтМ',
              },
              {
                languageId: Languages.English,
                name: 'Vampire The Masquerade',
                nameShort: 'VtM',
              },
            ],
          },
        },
      },
    });
    await prisma.tTRPG.create({
      data: {
        id: TTRPGS.DungeonsAndDragons,
        translates: {
          createMany: {
            data: [
              {
                languageId: Languages.Russian,
                name: 'Подземелья и Драконы',
                nameShort: 'ДнД',
              },
              {
                languageId: Languages.English,
                name: 'Dungeons and Dragons',
                nameShort: 'DnD',
              },
            ],
          },
        },
      },
    });
  }
}

async function tags(): Promise<void> {
  const tagsCount = await prisma.tag.count();
  if (tagsCount === 0) {
    await prisma.tag.create({
      data: {
        id: Tags.Disciplines,
        translates: {
          create: {
            languageId: Languages.Russian,
            name: 'Дисциплины',
          },
        },
      },
    });
    await prisma.tag.create({
      data: {
        id: Tags.Bane,
        translates: {
          create: {
            languageId: Languages.Russian,
            name: 'Клановый изъян',
          },
        },
      },
    });
    await prisma.tag.create({
      data: {
        id: Tags.Clan,
        translates: {
          create: {
            languageId: Languages.Russian,
            name: 'Клан',
          },
        },
      },
    });
    await prisma.tag.create({
      data: {
        id: Tags.Spell,
        translates: {
          create: {
            languageId: Languages.Russian,
            name: 'Заклинание',
          },
        },
      },
    });
  }
}

async function collections(): Promise<void> {
  const cardsCollectionCount = await prisma.collection.count();
  if (cardsCollectionCount === 0) {
    await prisma.collection.create({
      data: {
        isPublished: true,
        translates: {
          create: {
            name: 'Жрец',
            languageId: Languages.Russian,
          },
        },
      },
    });
  }
}

async function cards(): Promise<void> {
  const cardCount = await prisma.card.count();
  if (cardCount === 0) {
    await prisma.card.create({
      data: {
        translates: {
          create: {
            name: 'Благословение',
            description:
              'Вы благословляете до трёх существ на свой выбор в пределах дистанции. Каждый раз, когда до окончания заклинания цель совершает бросок атаки или спасбросок, она может бросить к4 и добавить выпавшее число к результату.',
            languageId: Languages.Russian,
          },
        },
      },
    });
  }
}

async function cardsCollections(): Promise<void> {
  const cardCardsCollectionCount = await prisma.cardCollection.count();
  if (cardCardsCollectionCount === 0) {
    await prisma.cardCollection.create({
      data: {
        cardId: 1,
        collectionId: 1,
      },
    });
  }
}

async function clients(): Promise<void> {
  await prisma.client.upsert({
    create: {
      username: process.env.TELEGRAM_BOT_LOGIN,
      password: process.env.TELEGRAM_BOT_PASSWORD,
    },
    update: {},
    where: {
      username: process.env.TELEGRAM_BOT_LOGIN,
    },
  });
}

async function main(): Promise<void> {
  await languages();
  await Promise.all([ttrpgs(), tags(), collections(), cards(), clients()]);
  await cardsCollections();
}

main()
  .then(async () => {
    await prisma.$disconnect();
    return true;
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
