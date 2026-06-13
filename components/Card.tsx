import type { HTMLAttributes, ReactNode } from "react";
import { cn, designSystem } from "@/lib/designSystem";

type CardElement = "div" | "article" | "section" | "li";

type CardProps = HTMLAttributes<HTMLElement> & {
  as?: CardElement;
  children: ReactNode;
};

export function Card({
  as: Component = "div",
  children,
  className,
  ...props
}: CardProps) {
  return (
    <Component className={cn(designSystem.components.card, className)} {...props}>
      {children}
    </Component>
  );
}
