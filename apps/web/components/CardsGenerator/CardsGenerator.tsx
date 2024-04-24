"use client";

import { useState } from "react";
import { useCardsGeneratorContext } from "./CardsGeneratorProvider";
import CardsGeneratorEditor, {
  AddCardMode,
  type Card,
  type CreateCardHandler,
  type RemoveCardHandler,
  type UpdateCardHandler,
} from "./CardsGeneratorEditor";
import { jsonCopy } from "@repo/helpers/object";

const defaultCardTemplate = {
  description:
    '<h1 style="text-align: center"></h1><p style="text-align: left"></p>',
} as const;

export default function CardsGenerator({ className }: Props): React.ReactNode {
  const [cards, setCards] = useState<Card[]>([defaultCardTemplate]);
  const { settings } = useCardsGeneratorContext();

  const updateCard: UpdateCardHandler = (card) => {
    setCards(() => cards.map((c) => (c !== card ? c : card)));
  };

  const removeCard: RemoveCardHandler = (card) => {
    setCards(() => cards.filter((c) => c !== card));
  };

  const createCard: CreateCardHandler = ({ card, mode }) => {
    const newCard = jsonCopy<Card>({ object: mode === AddCardMode.copy ? card : defaultCardTemplate });
    setCards((cards) => cards.reduce<Card[]>((result, c) => {
      result.push(c);
      if (c === card) {
        result.push(newCard);
      }
      return result;
    }, []));
  }

  return (
    <section className={className}>
      <ul
        className="web-grid"
        style={{
          gap: settings.gap,
          gridTemplateRows: `repeat(auto-fill, ${settings.height}mm)`,
          gridTemplateColumns: `repeat(auto-fill, ${settings.width}mm)`,
        }}
      >
        {cards.map((c) => (
          <li key={c.description.toString()}>
            <CardsGeneratorEditor
              card={c}
              onRemove={removeCard}
              onUpdate={updateCard}
              onCreate={createCard}
            />
          </li>
        ))}
      </ul>
    </section>
  );
}

interface Props {
  className: string;
}
