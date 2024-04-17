"use client";

import { useState } from "react";
import { useCardsGeneratorContext } from "./CardsGeneratorProvider";
import TipTap from "../TipTap/TipTap";
import type { JSONContent } from "@tiptap/core";

const testCard = {
  description: "Тест",
};

export default function CardsGenerator({ className }: Props): React.ReactNode {
  const [cards, setCards] = useState<Card[]>([testCard]);
  const { settings } = useCardsGeneratorContext();

  // function addCard(): void {
  //   setCards(() => [...cards, { description: "" }]);
  // }

  function removeCard(card: Card): void {
    setCards(() => cards.filter((c) => c !== card));
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
          <li key={c.id}>
            <article className="web-h-full web-relative">
              <div
                className="web-rounded-full web-w-6 web-h-6 web-bg-indigo-400 web-text-indigo-100 web-absolute web-top-0 web-right-0 web--translate-y-2 web-translate-x-1 web-flex web-align-center web-justify-center web-cursor-pointer"
                onClick={() => removeCard(c)}
              >
                X
              </div>
              <TipTap
                style={{
                  padding: `${settings.padding}mm`,
                }}
                className="web-text-indigo-200 web-border-2 web-border-indigo-400 web-border-solid web-h-full"
                content={c.description}
              />
            </article>
          </li>
        ))}
      </ul>
    </section>
  );
}

interface Props {
  className: string;
}

interface Card {
  id?: number;
  description: JSONContent | string;
}
