import type { JSONContent } from "@tiptap/core";
import TipTap from '../TipTap/TipTap';
import { useCardsGeneratorContext } from './CardsGeneratorProvider';

export default function CardsGeneratorEditor({ card, onRemove, onUpdate }: Props) {
  const { settings } = useCardsGeneratorContext();

  function updateCardContent (content: JSONContent) {
    card.description = content;
    onUpdate(card);
  }

  return (
    <article className="web-h-full web-relative">
      <div
        className="web-rounded-full web-w-6 web-h-6 web-bg-indigo-400 web-text-indigo-100 web-absolute web-top-0 web-right-0 web--translate-y-2 web-translate-x-1 web-flex web-align-center web-justify-center web-cursor-pointer print:web-hidden"
        onClick={() => onRemove(card)}
      >
        X
      </div>
      <TipTap
        style={{
          padding: `${settings.padding}mm`,
        }}
        className="web-text-indigo-200 web-border-2 web-border-indigo-400 web-border-solid web-h-full"
        content={card.description}
        onBlur={updateCardContent}
      />
    </article>
  );
}

interface Props {
  card: Card;
  onRemove: RemoveCardHandler;
  onUpdate: UpdateCardHandler;
}

export type RemoveCardHandler = (e: Card) => void;
export type UpdateCardHandler = (e: Card) => void;

export interface Card {
  id?: number;
  description: JSONContent | string;
}
