"use client";

import BulletList from '@tiptap/extension-bullet-list';
import OrderedList from '@tiptap/extension-ordered-list';
import {
  BubbleMenu,
  EditorContent,
  FloatingMenu,
  useEditor,
  type JSONContent,
} from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import type { CSSProperties, ReactNode } from "react";
import { FaBold, FaItalic, FaListOl, FaListUl, FaStrikethrough } from 'react-icons/fa';

export default function TipTap({
  className,
  style,
  content = "",
  onBlur,
}: Props): ReactNode {
  const editor = useEditor({
    extensions: [
      StarterKit,
      BulletList.configure({
        HTMLAttributes: {
          class: 'web-list-disc web-ms-5'
        }
      }),
      OrderedList.configure({
        HTMLAttributes: {
          class: 'web-list-decimal web-ms-5'
        }
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
          <BubbleMenu editor={editor} className='web-flex web-text-indigo-200 web-gap-2'>
            <FaBold onClick={() => editor.chain().focus().toggleMark('bold').run()} />
            <FaItalic onClick={() => editor.chain().focus().toggleMark('italic').run()} />
            <FaStrikethrough onClick={() => editor.chain().focus().toggleMark('strike').run()} />
          </BubbleMenu>
          <FloatingMenu editor={editor} className='web-flex web-text-indigo-200 web-gap-2'>
            <FaListUl onClick={() => editor.chain().focus().toggleBulletList().run()} />
            <FaListOl onClick={() => editor.chain().focus().toggleOrderedList().run()} />
          </FloatingMenu>
        </>
      )}
    </>
  );
}

interface Props {
  style?: CSSProperties;
  className?: string;
  content?: string | JSONContent;
  onBlur?: (content: JSONContent) => void;
}
