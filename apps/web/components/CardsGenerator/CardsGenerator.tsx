"use client";

import { useState } from "react";
import { useCardsGeneratorContext } from "./CardsGeneratorProvider";

const testCard = {
  title: 'Тест'
}

export default function CardsGenerator({ className }: Props): React.ReactNode {
  const [cards, setCards] = useState<Card[]>([testCard]);
  const { settings } = useCardsGeneratorContext();

  return <section className={className}>
    <ul className='web-grid' style={{
      gap: settings.gap,
      gridTemplateRows: `repeat(auto-fill, ${settings.height}mm)`,
      gridTemplateColumns: `repeat(auto-fill, ${settings.width}mm)`,
    }}>
        {cards.map((c) => <li key={c.id ?? c.title}>
          <article>
            <h2 className='web-text-indigo-200'>{c.title}</h2>
          </article>
        </li>)}
    </ul>
  </section>;
}

interface Props {
  className: string;
}

interface Card {
  id?: number;
  title: string;
}