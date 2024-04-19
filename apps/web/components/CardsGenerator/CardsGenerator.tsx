"use client";

import { useState } from "react";
import { useCardsGeneratorContext } from "./CardsGeneratorProvider";
import CardsGeneratorEditor, {
  type Card,
  type RemoveCardHandler,
  type UpdateCardHandler,
} from "./CardsGeneratorEditor";

const testCard = {
  description: '<h1 style="text-align: center"></h1><p style="text-align: left"></p>',
};

export default function CardsGenerator({ className }: Props): React.ReactNode {
  const [cards, setCards] = useState<Card[]>([testCard]);
  const { settings } = useCardsGeneratorContext();

  // function addCard(): void {
  //   setCards(() => [...cards, { description: "" }]);
  // }

  const updateCard: UpdateCardHandler = (card) => {
    setCards(() => cards.map((c) => c !== card ? c : card));
  } 

  const removeCard: RemoveCardHandler = (card) => {
    setCards(() => cards.filter((c) => c !== card));
  };

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
          <li key={c.id}>
            <CardsGeneratorEditor card={c} onRemove={removeCard} onUpdate={updateCard} />
          </li>
        ))}
      </ul>
    </section>
  );
}

interface Props {
  className: string;
}
