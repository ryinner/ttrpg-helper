'use client'

import { EditorContent, useEditor, type JSONContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import type { ReactNode } from 'react';

export default function TipTap ({ content = '', onBlur }: Props): ReactNode {
  const editor = useEditor({
    extensions: [
      StarterKit
    ],
    content,
    onBlur: () => {
      if (editor && onBlur) {
        onBlur(editor.getJSON());
      }
    }
  });

  return <EditorContent editor={editor} />
}

interface Props {
  content?: string | JSONContent;
  onBlur?: (content: JSONContent) => void;
}