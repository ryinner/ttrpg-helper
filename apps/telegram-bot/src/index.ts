import { Markup, Telegraf } from 'telegraf';
import type { InlineKeyboardButton } from 'telegraf/types';
import { helpHandler } from './handlers/help.handler';
import { startHandler } from './handlers/start.handler';
import { api } from './utilities/api.utility';

if (typeof process.env.BOT_TOKEN !== 'string') {
  throw new Error('Bot token is required');
}

const bot = new Telegraf(process.env.BOT_TOKEN);

async function cardsKeyboard(id: number) {
  const cards = await api.collection.cards(id);
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
        ctx.answerCbQuery();
        await ctx.sendMessage('Ваша колода', {
          reply_markup: (await cardsKeyboard(Number(id))).reply_markup,
        });
        break;

      case 'card':
        ctx.answerCbQuery();
        ctx.sendMessage((await api.cards.getOne(Number(id))).description);
        break;
      default:
        break;
    }
  }
});

startHandler(bot);
helpHandler(bot);

bot.launch();

process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
