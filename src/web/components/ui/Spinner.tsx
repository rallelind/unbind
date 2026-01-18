import { Loader2 } from "lucide-react";

type SpinnerSize = "sm" | "md" | "lg";

interface SpinnerProps {
  size?: SpinnerSize;
  className?: string;
}

const sizeStyles: Record<SpinnerSize, string> = {
  sm: "w-3 h-3",
  md: "w-5 h-5",
  lg: "w-12 h-12",
};

export function Spinner({ size = "md", className = "" }: SpinnerProps) {
  return (
    <Loader2
      className={`animate-spin ${sizeStyles[size]} ${className}`}
    />
  );
}
