"use client";

import BulletList from "@tiptap/extension-bullet-list";
import Document from "@tiptap/extension-document";
import OrderedList from "@tiptap/extension-ordered-list";
import Placeholder from "@tiptap/extension-placeholder";
import {
  BubbleMenu,
  EditorContent,
  FloatingMenu,
  useEditor,
  type JSONContent,
} from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import type { CSSProperties, ReactNode } from "react";
import {
  FaAlignCenter,
  FaAlignJustify,
  FaAlignLeft,
  FaAlignRight,
  FaBold,
  FaItalic,
  FaListOl,
  FaListUl,
  FaStrikethrough,
} from "react-icons/fa";
import { useI18n } from "../../locales/client";
import TextAlign from "@tiptap/extension-text-align";
import Dropcursor from '@tiptap/extension-dropcursor';
import Image from '@tiptap/extension-image';

export default function TipTap({
  className,
  style,
  content = "",
  onBlur,
}: Props): ReactNode {
  const t = useI18n();

  const editor = useEditor({
    extensions: [
      Document.extend({
        content: "heading block*",
      }),
      StarterKit.configure({
        document: false,
        bulletList: false,
        orderedList: false,
      }),
      BulletList.configure({
        HTMLAttributes: {
          class: "web-list-disc web-ms-5",
        },
      }),
      OrderedList.configure({
        HTMLAttributes: {
          class: "web-list-decimal web-ms-5",
        },
      }),
      Placeholder.configure({
        placeholder({ node }) {
          if (node.type.name === "heading") {
            return t("tipTap.placeholder.writeTitle");
          }
          return t("tipTap.placeholder.writeContent");
        },
      }),
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      Dropcursor.configure({
        class: 'web-bg-indigo-200'
      }),
      Image.configure({
        inline: true,
        allowBase64: true,
      })
    ],
    editorProps: {
      attributes: {
        class:
          "web-outline-none focus:web-outline-none web-h-full web-overflow-hidden",
      },
    },
    content,
    onBlur: () => {
      if (editor && onBlur) {
        onBlur(editor.getJSON());
      }
    },
  });

  return (
    <>
      <EditorContent className={className} style={style} editor={editor} />
      {editor && (
        <>
          <BubbleMenu
            editor={editor}
            className="web-flex web-text-indigo-200 web-gap-2"
          >
            <FaBold
              onClick={() => editor.chain().focus().toggleMark("bold").run()}
            />
            <FaItalic
              onClick={() => editor.chain().focus().toggleMark("italic").run()}
            />
            <FaStrikethrough
              onClick={() => editor.chain().focus().toggleMark("strike").run()}
            />
            <FaAlignLeft
              onClick={() => editor.chain().focus().setTextAlign("left").run()}
            />
            <FaAlignCenter
              onClick={() =>
                editor.chain().focus().setTextAlign("center").run()
              }
            />
            <FaAlignRight
              onClick={() => editor.chain().focus().setTextAlign("right").run()}
            />
            <FaAlignJustify
              onClick={() =>
                editor.chain().focus().setTextAlign("justify").run()
              }
            />
          </BubbleMenu>
          <FloatingMenu
            editor={editor}
            className="web-flex web-text-indigo-200 web-gap-2"
          >
            {!editor.isActive("heading") && (
              <>
                <FaListUl
                  onClick={() =>
                    editor.chain().focus().toggleBulletList().run()
                  }
                />
                <FaListOl
                  onClick={() =>
                    editor.chain().focus().toggleOrderedList().run()
                  }
                />
              </>
            )}
          </FloatingMenu>
        </>
      )}
    </>
  );
}

interface Props {
  className?: string;
  style?: CSSProperties;
  content?: string | JSONContent;
  onBlur?: (content: JSONContent) => void;
}
