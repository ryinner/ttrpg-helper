import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function languages(): Promise<void> {
  const languagesCount = await prisma.language.count();
  if (languagesCount === 0) {
    await prisma.language.createMany({
      data: [
        {
          code: 'ru',
        },
        {
          code: 'en',
        },
      ],
    });
  }
}

async function main(): Promise<void> {
  await languages();
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
