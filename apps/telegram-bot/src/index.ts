import { Telegraf } from 'telegraf';
// import { callbackQueryHandler } from './handlers/callback-query.handler';
import { helpHandler } from './handlers/help.handler';
import { mvpCallbackHandler } from './handlers/mvp-callback-query.handler';
import { startHandler } from './handlers/start.handler';

if (typeof process.env.BOT_TOKEN !== 'string') {
  throw new Error('Bot token is required');
}

const bot = new Telegraf(process.env.BOT_TOKEN);

startHandler(bot);
helpHandler(bot);
mvpCallbackHandler(bot);
// callbackQueryHandler(bot);

bot.launch();

process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
