import type { Telegraf } from 'telegraf';
import { charactersMap } from '../maps/main';

export function mvpCallbackHandler(bot: Telegraf) {
  bot.on('callback_query', async (ctx) => {
    if ('data' in ctx.callbackQuery) {
      const { data } = ctx.callbackQuery;
      const [characterId, abilityId] = data.split('-');
      if (characterId === undefined) {
        return;
      }
      const character = charactersMap.get(characterId);
      if (character === undefined) {
        return;
      }
      if (abilityId === undefined) {
        ctx.answerCbQuery();
        const message = await ctx.sendMessage(
          `Персонаж выбран: ${character.name}!`,
          {
            reply_markup: character.keyboard.reply_markup,
          },
        );
        ctx.pinChatMessage(message.message_id);
        return;
      }
      const ability = character.abilities.get(abilityId);
      if (ability === undefined) {
        return;
      }
      ctx.answerCbQuery();
      await ctx.sendMessage(`*${ability.name}*\n\n${ability.description}`, {
        parse_mode: 'Markdown',
        reply_markup: character.keyboard.reply_markup,
      });
    }
  });
}
