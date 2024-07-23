import { CollectionApi, EBaseUrls } from '@repo/api-sdk';
import { Markup, Telegraf } from 'telegraf';
import { helpHandler } from './handlers/help.hanlder';
import type { InlineKeyboardButton } from 'telegraf/types';

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
  const keyboard = Markup.inlineKeyboard(buttons);

  await ctx.sendMessage('Выбери свою колоду', {
    reply_markup: keyboard.reply_markup,
  });
});

async function cardsKeyboard(id: number) {
  const cards = await collectionApi.cards(id);
  const buttons: InlineKeyboardButton[][] = [[]];
  cards.forEach((c, i) => {
    const button = Markup.button.callback(c.name, `card-${c.id}`);
    if (i % 2 < buttons.length) {
      buttons.at(buttons.length - 1)?.push(button);
    } else {
      buttons.push([button]);
    }
  });

  return Markup.inlineKeyboard(buttons);
}

bot.on('callback_query', async (ctx) => {
  if ('data' in ctx.callbackQuery) {
    const { data } = ctx.callbackQuery;
    const [entity, id] = data.split('-');

    switch (entity) {
      case 'collection':
        ctx.answerCbQuery('Ваша колода');
        await ctx.sendMessage('Выберите способность', {
          reply_markup: (await cardsKeyboard(Number(id))).reply_markup,
        });
        break;

      default:
        break;
    }
  }
});

helpHandler(bot);

bot.launch();

process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
