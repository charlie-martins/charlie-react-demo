import type { ReactNode } from "react";

type CardProps = {
  children: ReactNode;
  className?: string;
  title?: string;
};

export function Card({ children, className, title }: CardProps) {
  return (
    <div className={["ui-card", className].filter(Boolean).join(" ")}>
      {title && <h2 className="ui-card-title">{title}</h2>}
      {children}
    </div>
  );
}
