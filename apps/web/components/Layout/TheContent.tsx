import type React from "react";

export default function TheContent({
  children,
  className: propsClassName,
}: Props) {
  const className = `web-w-5/6 web-mx-auto ${propsClassName}`.trim();

  return <div className={className}>{children}</div>;
}

interface Props {
  children: React.ReactNode;
  className?: string;
}
