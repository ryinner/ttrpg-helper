import { type Telegraf } from 'telegraf';
import { sendHeroesList } from './heroes.handler.js';
// import { api } from '../utilities/api.utility';

function helloMessagesFactory(username: string | undefined): string[] {
  return [
    `Привет ${username ?? 'друг'}!`,
    'Добро пожаловать в помощника мастера V0.0.1!',
    'Я создан для того, чтобы помогать мастерам и игрокам проводить хорошо проводить в НРИ :)',
    'Пока что я умею только выдавать информацию о способностях персонажей. Но я готов учится и развиваться, и я буду очень рад, если ты поможешь мне в этом!',
  ];
}

export function startHandler(bot: Telegraf) {
  bot.start(async (ctx) => {
    const {
      user: { username },
    } = await ctx.getChatMember(ctx.chat.id);

    // const collections = await api.collection.get();
    // const buttons = collections.map((collection) => {
    //   return [
    //     Markup.button.callback(collection.name, `collection-${collection.id}`),
    //   ];
    // });

    // const keyboard = Markup.inlineKeyboard(buttons);

    for (const message of helloMessagesFactory(username)) {
      await ctx.reply(message);
      await wait(200);
    }

    sendHeroesList(ctx);
  });
}

async function wait(timeout = 1000): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(resolve, timeout);
  });
}
