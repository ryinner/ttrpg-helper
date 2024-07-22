import { CollectionApi, EBaseUrls } from '@repo/api-sdk';
import { Markup, Telegraf } from 'telegraf';

if (typeof process.env.BOT_TOKEN !== 'string') {
  throw new Error('Bot token is required');
}

const bot = new Telegraf(process.env.BOT_TOKEN);
const collectionApi = new CollectionApi({
  baseUrl: EBaseUrls.development,
});

bot.start(async (ctx) => {
  const {
    user: { username },
  } = await ctx.getChatMember(ctx.chat.id);
  await ctx.sendMessage(`Привет ${username}!`);
  await ctx.sendMessage(
    'Добро пожаловать в тестовую версию помощника мастера! Надеюсь я смогу помочь в ваших играх :).',
  );
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

bot.help(async (ctx) => {
  await ctx.reply(
    'Я создан для того, чтобы помогать мастерам и игрокам проводить игры!',
  );
  await ctx.reply(
    'Пока что я умею только выдавать небольшие колоды карт для упрощения объяснения способностей персонажей: просто выбери интересующую тебя колоду снизу.',
  );
  await ctx.reply(
    'Но я готов учится и развиваться, и я буду очень рад, если ты поможешь мне в этом!',
  );
});

bot.launch();

process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
