import { Telegraf } from 'telegraf';
import { message } from 'telegraf/filters';

const bot = new Telegraf(process.env.BOT_TOKEN);

bot.on(message('text'), async (ctx) => {
  const {
    user: { username },
  } = await ctx.getChatMember(ctx.chat.id);
  await ctx.reply(`Hello ${username}`);
});

bot.launch();
