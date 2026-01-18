import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from "react";

type ButtonVariant = "primary" | "secondary" | "ghost";
type ButtonRounded = "lg" | "xl" | "full";
type ButtonSize = "sm" | "md";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  rounded?: ButtonRounded;
  size?: ButtonSize;
  children: ReactNode;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary: "bg-stone-100 text-stone-900 hover:bg-white",
  secondary: "border border-stone-600 text-stone-300 hover:bg-stone-700/50",
  ghost: "bg-stone-700 text-stone-300 hover:bg-stone-600",
};

const roundedStyles: Record<ButtonRounded, string> = {
  lg: "rounded-lg",
  xl: "rounded-xl",
  full: "rounded-full",
};

const sizeStyles: Record<ButtonSize, Record<ButtonRounded, string>> = {
  sm: {
    lg: "px-3 py-2 text-sm",
    xl: "px-3 py-2 text-sm",
    full: "px-5 py-2 text-sm",
  },
  md: {
    lg: "px-6 py-3 text-sm",
    xl: "px-6 py-3 text-sm",
    full: "px-8 py-3 text-sm",
  },
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "primary",
      rounded = "xl",
      size = "md",
      className = "",
      disabled,
      children,
      ...props
    },
    ref
  ) => {
    const baseStyles =
      "flex items-center justify-center gap-2 font-ui font-medium transition-colors disabled:opacity-40 disabled:cursor-not-allowed";

    return (
      <button
        ref={ref}
        disabled={disabled}
        className={`${baseStyles} ${variantStyles[variant]} ${roundedStyles[rounded]} ${sizeStyles[size][rounded]} ${className}`}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
