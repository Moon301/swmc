import { cn } from "@/lib/utils";
import type { HTMLAttributes } from "react";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  hover?: boolean;
}

export function Card({ className, hover, children, ...props }: CardProps) {
  return (
    <div
      className={cn(
        "card-soft p-5",
        hover && "card-soft-hover",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
