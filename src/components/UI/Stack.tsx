"use client";

import type { ReactNode } from "react";
import { Container } from "./Container";

type StackProps = {
  title?: string;
  children: ReactNode;
  className?: string;
};

/**
 * Column stack for page content with a consistent width and gap.
 * Renders an optional page title.
 */
export function Stack({ title, children, className }: StackProps) {
  return (
    <Container
      direction="column"
      className={["w-1/2 gap-4", className].filter(Boolean).join(" ")}
    >
      {title && <h1 className="text-lg font-semibold">{title}</h1>}
      {children}
    </Container>
  );
}
