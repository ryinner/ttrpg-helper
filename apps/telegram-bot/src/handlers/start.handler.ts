import { Markup, type Telegraf } from 'telegraf';
import type { InlineKeyboardButton } from 'telegraf/types';
import { charactersMap } from '../maps/main';
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

    for (const message of helloMessagesFactory(username)) {
      await ctx.reply(message);
      await wait(200);
    }

    await ctx.sendMessage('Выбери своего героя', {
      reply_markup: keyboard.reply_markup,
    });
  });
}

async function wait(timeout = 1000): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(resolve, timeout);
  });
}
