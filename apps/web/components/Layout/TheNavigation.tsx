import type React from "react";

export default function TheNavigation({ children }: Props): JSX.Element {
  return <nav>{children}</nav>;
}

interface Props {
  children: React.ReactNode;
}
