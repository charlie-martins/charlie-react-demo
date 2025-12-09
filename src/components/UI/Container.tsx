// src/components/layout/Container.tsx
'use client';

import type { ReactNode, ElementType } from 'react';
import clsx from 'clsx';

interface ContainerProps {
  as?: ElementType;
  children: ReactNode;
  className?: string;
  /** Layout direction */
  direction?: 'row' | 'column';
  /** If true, min-height: 100vh */
  fullHeight?: boolean;
}

export const Container = ({
  as: Component = 'div',
  children,
  className,
  direction = 'column',
  fullHeight = false,
}: ContainerProps) => {
  return (
    <Component
      className={clsx(
        'flex',
        direction === 'row' ? 'flex-row' : 'flex-col',
        fullHeight && 'min-h-screen',
        'min-w-0', 
        className
      )}
    >
      {children}
    </Component>
  );
};