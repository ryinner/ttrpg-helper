import { Telegraf } from 'telegraf';
import { message } from 'telegraf/filters';

if (typeof process.env.BOT_TOKEN !== 'string') {
  throw new Error('Bot token is required');
}

const bot = new Telegraf(process.env.BOT_TOKEN);

bot.on(message('text'), async (ctx) => {
  const {
    user: { username },
  } = await ctx.getChatMember(ctx.chat.id);
  await ctx.reply(`Hello ${username}`);
});

bot.launch();

process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
