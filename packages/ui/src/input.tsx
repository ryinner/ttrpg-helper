import { forwardRef, useId, type InputHTMLAttributes } from "react";

export const Input = forwardRef<HTMLInputElement, Props>(function Input(
  { className: propsClassName, ...props },
  ref,
) {
  const id = useId();
  const className = `${propsClassName} ui-rounded-sm focus:ui-outline focus:ui-outline-offset-1 focus:ui-outline-2 focus:ui-outline-indigo-400`;

  return (
    <div>
      <input
        ref={ref}
        id={id}
        className={className}
        {...props}
      />
    </div>
  );
});

interface Props extends InputHTMLAttributes<HTMLInputElement> {

}
