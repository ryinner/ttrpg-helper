"use client";

import {
  BubbleMenu,
  EditorContent,
  FloatingMenu,
  useEditor,
  type JSONContent,
} from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import type { CSSProperties, ReactNode } from "react";

export default function TipTap({
  className,
  style,
  content = "",
  onBlur,
}: Props): ReactNode {
  const editor = useEditor({
    extensions: [StarterKit],
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
          <BubbleMenu editor={editor}>
            <div>Bold</div>
          </BubbleMenu>
          <FloatingMenu>
            <div>Heading</div>
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
