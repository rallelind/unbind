import { forwardRef, type LabelHTMLAttributes, type ReactNode } from "react";

interface LabelProps extends LabelHTMLAttributes<HTMLLabelElement> {
  children: ReactNode;
}

export const Label = forwardRef<HTMLLabelElement, LabelProps>(
  ({ className = "", children, ...props }, ref) => {
    const baseStyles = "block text-stone-500 text-xs font-ui mb-1";

    return (
      <label
        ref={ref}
        className={`${baseStyles} ${className}`}
        {...props}
      >
        {children}
      </label>
    );
  }
);

Label.displayName = "Label";
