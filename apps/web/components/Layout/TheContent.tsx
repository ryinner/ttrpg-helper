import type React from "react";

export default function TheContent({ children }: Props) {
  return <div className="web-w-5/6 web-mx-auto">{children}</div>;
}

interface Props {
  children: React.ReactNode;
}
