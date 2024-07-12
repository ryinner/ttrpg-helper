import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

enum Languages {
  Russian = 1,
  English = 2,
}

enum TTRPGS {
  VampireTheMasquerade = 1,
  DungeonsAndDragons = 2,
}

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
              },
              {
                languageId: Languages.English,
                name: 'Vampire The Masquerade',
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
              },
              {
                languageId: Languages.English,
                name: 'Dungeons and Dragons',
              },
            ],
          },
        },
      },
    });
  }
}

async function main(): Promise<void> {
  await languages();
  await ttrpgs();
  await Promise.all([]);
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
