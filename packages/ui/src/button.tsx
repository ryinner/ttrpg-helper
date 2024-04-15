"use client";

import { type ButtonHTMLAttributes } from "react";

export const Button = ({ children, className: propsClassName, ...props }: Props) => {
  const className = `${propsClassName} ui-px-2 ui-bg-indigo-400 ui-text-slate-900 ui-visible ui-text-wrap`
  
  return (
    <button
      className={className}
      {...props}
    >
      {children}
    </button>
  );
};

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
}