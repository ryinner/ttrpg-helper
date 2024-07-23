import type { Telegraf } from 'telegraf';

const messages = [
  '1. Выбери колоду: нажми на одну из кнопок',
  '2. Посмотри колоду: все в чате',
  '3. Наслаждайся игрой',
];

export async function helpHandler(bot: Telegraf) {
  bot.help(async (ctx) => {
    for (const message of messages) {
      await ctx.reply(message);
    }
  });
}
