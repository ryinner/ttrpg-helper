import { Markup, type Context, type Telegraf } from 'telegraf';
import type { InlineKeyboardButton } from 'telegraf/types';
import { charactersMap } from '../maps/main.js';

export function heroesHandler(bot: Telegraf) {
  bot.command('heroes', sendHeroesList);
}

export async function sendHeroesList(ctx: Context) {
  const buttons = Array.from(charactersMap.values()).reduce<
    InlineKeyboardButton[][]
  >((buttons, character, index) => {
    const button = Markup.button.callback(character.name, `${character.id}`);
    if (index % 2 === 1) {
      buttons.at(-1)?.push(button);
    } else {
      buttons.push([button]);
    }
    return buttons;
  }, []);

  const keyboard = Markup.inlineKeyboard(buttons);

  await ctx.sendMessage('Выбери своего героя', {
    reply_markup: keyboard.reply_markup,
  });
}
