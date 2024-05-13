"use client";

import type { JSONContent } from "@tiptap/core";
import TipTap from "../TipTap/TipTap";
import { useCardsGeneratorContext } from "./CardsGeneratorProvider";
import { IoIosMore } from "react-icons/io";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { useI18n } from "../../locales/client";

export default function CardsGeneratorEditor({
  card,
  onCreate,
  onUpdate,
  onRemove,
}: Props) {
  const { settings } = useCardsGeneratorContext();
  const t = useI18n();

  function updateCardContent(content: JSONContent) {
    card.description = content;
    onUpdate(card);
  }

  function removeCard() {
    onRemove(card);
  }

  function copyCard() {
    onCreate({ card, mode: AddCardMode.copy });
  }

  function createCard() {
    onCreate({ card, mode: AddCardMode.create });
  }

  return (
    <article className="web-h-full web-relative">
      <DropdownMenu.Root>
        <DropdownMenu.Trigger className="web-rounded-full web-w-6 web-h-6 web-bg-indigo-400 web-text-indigo-100 web-absolute web-top-0 web-right-0 web--translate-y-2 web-translate-x-2 web-flex web-items-center web-justify-center web-cursor-pointer print:web-hidden">
          <IoIosMore />
        </DropdownMenu.Trigger>
        <DropdownMenu.Portal>
          <DropdownMenu.Content
            className="web-bg-indigo-400 web-min-w-32 web-rounded-sm"
            sideOffset={5}
          >
            <DropdownMenu.Item
              className="web-outline-none web-select-none web-cursor-pointer web-px-2 web-py-1 web-border-b-2 web-border-solid web-border-indigo-200"
              onClick={removeCard}
            >
              {t("form.buttons.remove")}
            </DropdownMenu.Item>
            <DropdownMenu.Item
              className="web-outline-none web-select-none web-cursor-pointer web-px-2 web-py-1 web-border-b-2 web-border-solid web-border-indigo-200"
              onClick={createCard}
            >
              {t("form.buttons.add")}
            </DropdownMenu.Item>
            <DropdownMenu.Item
              className="web-outline-none web-select-none web-cursor-pointer web-px-2 web-py-1"
              onClick={copyCard}
            >
              {t("form.buttons.copy")}
            </DropdownMenu.Item>
          </DropdownMenu.Content>
        </DropdownMenu.Portal>
      </DropdownMenu.Root>
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
  onCreate: CreateCardHandler;
  onUpdate: UpdateCardHandler;
  onRemove: RemoveCardHandler;
}

export enum AddCardMode {
  create,
  copy,
}

export type CreateCardHandler = (e: { card: Card; mode: AddCardMode }) => void;
export type UpdateCardHandler = (e: Card) => void;
export type RemoveCardHandler = (e: Card) => void;

export interface Card {
  id?: number;
  description: JSONContent | string;
}
