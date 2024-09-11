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

const warrior = new Character('warrior', 'Воин', [
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

const rogue = new Character('rogue', 'Плут', [
  {
    id: 1,
    name: 'Сопротивление урону (Электричество)',
    description: 'Урон от электричества уменьшен вдвое',
  },
  {
    id: 2,
    name: 'Оружие дракона',
    description:
      'Линия 5 на 30 футов (спас. ЛОВ). 2д6 урона, при спасе половина.',
  },
  {
    id: 3,
    name: 'Дурная репутация',
    description:
      'Где бы вы ни оказались, вас боятся из-за вашей репутации. Находясь в цивилизованном поселении, вы можете безнаказанно совершать небольшие преступления, такие как отказ платить за еду в таверне или выламывание двери в магазине, так как жители боятся сообщать о вас властям.',
  },
  {
    id: 4,
    name: 'Скрытая атака',
    description:
      'Один раз в ход вы можете причинить дополнительные 1д6 урона одному из существ, по которому вы попали атакой, совершённой с преимуществом. Атака должна использовать дальнобойное оружие или оружие со свойством «фехтовальное». Вам не нужно иметь преимущество при броске атаки, если другой враг цели находится в пределах 5 футов от неё. Этот враг не должен быть недееспособным, и у вас не должно быть помехи для броска атаки.',
  },
  {
    id: 5,
    name: 'Воровской жаргон',
    description:
      'Во время плутовского обучения вы выучили воровской жаргон, тайную смесь диалекта, жаргона и шифра, который позволяет скрывать сообщения в, казалось бы, обычном разговоре. Только другое существо, знающее воровской жаргон, понимает такие сообщения. Это занимает в четыре раза больше времени, нежели передача тех же слов прямым текстом.\nКроме того, вы понимаете набор секретных знаков и символов, используемый для передачи коротких и простых сообщений. Например, является ли область опасной или территорией гильдии воров, находится ли поблизости добыча, простодушны ли люди в округе, и предоставляют ли здесь безопасное убежище для воров в бегах.',
  },
  {
    id: 6,
    name: 'Хитрое действие',
    description:
      'Ваше мышление и ловкость позволяют двигаться и действовать быстрее. Вы можете в каждом своем ходу боя совершать бонусное действие. Это действие может быть использовано только для Рывка, Отхода или Засады.',
  },
  {
    id: 7,
    name: 'Точное прицеливание',
    description:
      'Бонусным действием вы можете дать себе преимущество на следующий бросок атаки в текущем ходу. Вы можете использовать это бонусное действие только в том случае, если не перемещались в этом ходу. После того, как вы используете его, ваша скорость станет равной 0 до конца текущего хода.',
  },
  {
    id: 8,
    name: 'Ликвидация',
    description:
      'Вы становитесь смертоносными для врагов. Вы совершаете с преимуществом броски атаки по всем существам, которые ещё не совершали ход в этом бою. Кроме того, все попадания по существам, захваченным врасплох, являются критическими попаданиями.',
  },
]);

const charactersMap = new Map<string, Character>([
  [warrior.id, warrior],
  [rogue.id, rogue],
]);

export { charactersMap };