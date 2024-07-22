import { Markup, Telegraf } from 'telegraf';
import { message } from 'telegraf/filters';

if (typeof process.env.BOT_TOKEN !== 'string') {
  throw new Error('Bot token is required');
}

const bot = new Telegraf(process.env.BOT_TOKEN);

bot.on(message('text'), async (ctx) => {
  if (ctx.text === '/start') {
    const {
      user: { username },
    } = await ctx.getChatMember(ctx.chat.id);

    const inlineKeyBoard = Markup.inlineKeyboard([
      Markup.button.callback('Test', 'Test'),
      Markup.button.callback('Test2', 'Test2'),
    ]);

    const keyboard = Markup.keyboard([
      [Markup.button.text('text'), Markup.button.text('text2')],
    ]);

    ctx.sendMessage(`Hello ${username}`, {
      reply_markup: inlineKeyBoard.reply_markup,
    });

    ctx.sendMessage('test2', {
      reply_markup: keyboard.reply_markup,
    });
  }
});

bot.launch();

process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
