import { Markup, type Telegraf } from 'telegraf';
import type { InlineKeyboardButton } from 'telegraf/types';
import { api } from '../utilities/api.utility';

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

export function callbackQueryHandler(bot: Telegraf) {
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
}
