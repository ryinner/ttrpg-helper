import { Markup } from 'telegraf';
import type { InlineKeyboardButton } from 'telegraf/types';

interface Ability {
  id: number;
  name: string;
  description: string;
}

class Character {
  public keyboard;

  public abilities;

  constructor(
    public id: string,
    public name: string,
    abilities: Ability[],
  ) {
    this.id = id;
    this.name = name;
    this.abilities = new Map<string, Ability>(
      abilities.map((a) => [a.id.toString(), a]),
    );
    this.keyboard = Markup.inlineKeyboard(this.buttons);
  }

  private get buttons() {
    return Array.from(this.abilities.values()).reduce<InlineKeyboardButton[][]>(
      (buttons, ability, index) => {
        const button = Markup.button.callback(
          ability.name,
          `${this.id}-${ability.id}`,
        );
        if (index % 2 === 1) {
          buttons.at(-1)?.push(button);
        } else {
          buttons.push([button]);
        }
        return buttons;
      },
      [],
    );
  }
}

const warrior = new Character('1', 'Воин', [
  {
    id: 1,
    name: 'Странник',
    description:
      'Вы отлично запоминаете карты и местность, и всегда можете вспомнить общие характеристики местности, поселения, и прочие особенности в окрестностях. Кроме того, вы каждый день можете находить еду и пресную воду для себя и пяти других товарищей, при условии, что вокруг вас можно найти ягоды, дичь, воду и так далее',
  },
  {
    id: 2,
    name: 'Дикий атакующий',
    description:
      'Один раз в ход, когда вы совершаете бросок урона для рукопашной атаки оружием, вы можете перебросить все кости урона этого оружия и использовать любой из вариантов.',
  },
  {
    id: 3,
    name: 'Дуэлянт',
    description:
      'Пока вы держите рукопашное оружие в одной руке и не используете другого оружия, вы получаете бонус +2 к броскам урона этим оружием.',
  },
  {
    id: 4,
    name: 'Второе дыхание',
    description:
      'Один раз в отдых. В свой ход вы можете бонусным действием восстановить хиты в размере 1к10 + ваш уровень воина.',
  },
  {
    id: 5,
    name: 'Всплеск действий',
    description:
      'Один раз в отдых. В свой ход можно совершить одно дополнительное действие',
  },
  {
    id: 6,
    name: 'Боевое превосходство (4д8)',
    description:
      'Вы можете применить один из приемов, тратя кость превосходства (1д8): Атака с финтом (следующая атака с преимуществом + кость в урон), Ответный удар (Если существо промазало, атака реакцией + кость в урон), Парирование (уменьшить урон на кость + ловкость)',
  },
]);

const charactersMap = new Map<string, Character>([[warrior.id, warrior]]);

export { charactersMap };
