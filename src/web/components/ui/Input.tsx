import { forwardRef, type InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className = "", ...props }, ref) => {
    const baseStyles =
      "w-full px-3 py-2 rounded-lg bg-stone-700 border border-stone-600 text-stone-100 font-ui text-base placeholder:text-stone-500 focus:outline-none focus:ring-2 focus:ring-stone-400/50";

    return (
      <input
        ref={ref}
        className={`${baseStyles} ${className}`}
        {...props}
      />
    );
  }
);

Input.displayName = "Input";
