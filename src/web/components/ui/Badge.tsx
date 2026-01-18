import { type ReactNode } from "react";

interface BadgeProps {
  children: ReactNode;
  className?: string;
}

export function Badge({ children, className = "" }: BadgeProps) {
  const baseStyles =
    "flex items-center gap-2 px-3 py-1.5 rounded-full bg-stone-700/50 text-stone-400 text-xs";

  return <span className={`${baseStyles} ${className}`}>{children}</span>;
}
