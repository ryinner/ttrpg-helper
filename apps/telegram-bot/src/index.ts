import { CollectionApi, EBaseUrls } from '@repo/api-sdk';
import { Markup, Telegraf } from 'telegraf';

if (typeof process.env.BOT_TOKEN !== 'string') {
  throw new Error('Bot token is required');
}

const bot = new Telegraf(process.env.BOT_TOKEN);
const collectionApi = new CollectionApi({
  baseUrl: EBaseUrls.development,
});

const helloMessages = (username: string | undefined) => {
  return [
    `Привет ${username ?? 'друг'}!`,
    'Добро пожаловать в тестовую версию помощника мастера!',
    'Я создан для того, чтобы помогать мастерам и игрокам проводить игры :)',
    'Пока что я умею только выдавать небольшие колоды карт для упрощения объяснения способностей персонажей: просто выбери интересующую тебя колоду снизу.',
    'Но я готов учится и развиваться, и я буду очень рад, если ты поможешь мне в этом!',
  ];
};

bot.start(async (ctx) => {
  const {
    user: { username },
  } = await ctx.getChatMember(ctx.chat.id);

  for (const message of helloMessages(username)) {
    await ctx.reply(message);
  }

  const collections = await collectionApi.get();
  const buttons = collections.map((collection) => {
    return [
      Markup.button.callback(collection.name, `collection-${collection.id}`),
    ];
  });
  const keyboard = Markup.keyboard(buttons);
  await ctx.sendMessage('Выбери свою колоду', {
    reply_markup: keyboard.reply_markup,
  });
});

const helpMessages = [
  '1. Выбери колоду: нажми на одну из кнопок',
  '2. Посмотри колоду: все в чате',
  '3. Наслаждайся игрой',
];

bot.help(async (ctx) => {
  for (const message of helpMessages) {
    await ctx.reply(message);
  }
});

bot.launch();

process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
