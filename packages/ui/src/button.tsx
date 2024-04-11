"use client";

import { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  appName: string;
}

export const Button = ({ children, appName }: ButtonProps) => {
  return (
    <button
      className="ui-px-1 ui-bg-sky-500 ui-visible ui-text-wrap"
      onClick={() => alert(`Hello from your ${appName} app!`)}
    >
      {children}
    </button>
  );
};
