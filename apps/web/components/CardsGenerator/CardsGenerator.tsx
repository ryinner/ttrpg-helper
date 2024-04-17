"use client";

import { useState } from "react";
import { useCardsGeneratorContext } from "./CardsGeneratorProvider";
import TipTap from '../TipTap/TipTap';
import type { JSONContent } from '@tiptap/core';

const testCard = {
  title: 'Тест',
  description: 'Тест'
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
            <TipTap content={c.description} />
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
  description: JSONContent | string;
}