"use client";

import { EditorContent, useEditor, type JSONContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import type { ReactNode } from "react";

export default function TipTap({
  className,
  content = "",
  onBlur,
}: Props): ReactNode {
  const editor = useEditor({
    extensions: [StarterKit],
    content,
    onBlur: () => {
      if (editor && onBlur) {
        onBlur(editor.getJSON());
      }
    },
  });

  return <EditorContent className={className} editor={editor} />;
}

interface Props {
  className?: string;
  content?: string | JSONContent;
  onBlur?: (content: JSONContent) => void;
}
