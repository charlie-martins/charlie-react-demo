'use client';

import type { ButtonHTMLAttributes, ReactNode } from 'react';

export type ButtonVariant = 'primary' | 'soft' | 'ghost' | 'outline' | 'danger';

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  label?: string; // optional: icon-only buttons can rely on aria-label
  fullWidth?: boolean;
  icon?: ReactNode;
  iconPosition?: 'left' | 'right';
  iconOnly?: boolean; // true = square icon button
  eventName?: string; // reserved for analytics
  eventTags?: string[]; // reserved for analytics

  /** Variant flags: use exactly one of these in practice, e.g. <Button primary /> */
  primary?: boolean;
  soft?: boolean;
  ghost?: boolean;
  outline?: boolean;
  danger?: boolean;
}

export const Button = ({
  label,
  fullWidth,
  className,
  icon,
  iconPosition = 'left',
  iconOnly = false,
  eventName,
  eventTags,
  primary,
  soft,
  ghost,
  outline,
  danger,
  ...rest
}: ButtonProps) => {
  // Mark as used so TS doesn't complain until you wire analytics
  void eventName;
  void eventTags;

  // Resolve variant class based on boolean flags. First truthy wins, otherwise default to primary.
  let variantClass = 'ui-btn-primary';

  if (soft) {
    variantClass = 'ui-btn-soft';
  }
  if (ghost) {
    variantClass = 'ui-btn-ghost';
  }
  if (outline) {
    variantClass = 'ui-btn-outline';
  }
  if (danger) {
    variantClass = 'ui-btn-danger';
  }
  if (primary) {
    variantClass = 'ui-btn-primary';
  }

  const widthClass = fullWidth && !iconOnly ? 'w-full' : '';

  const isIconOnly = !!icon && (iconOnly || !label);

  const iconWrapperClass =
    'inline-flex items-center justify-center text-[16px] leading-none';

  const content =
    isIconOnly && icon ? (
      <>
        {/* Icon-only: icon visible, label (if provided) is sr-only for a11y */}
        <span className={iconWrapperClass}>{icon}</span>
        {label && <span className="sr-only">{label}</span>}
      </>
    ) : (
      <span className="inline-flex items-center justify-center gap-1.5">
        {icon && iconPosition === 'left' && (
          <span className={iconWrapperClass}>{icon}</span>
        )}
        {label && <span>{label}</span>}
        {icon && iconPosition === 'right' && (
          <span className={iconWrapperClass}>{icon}</span>
        )}
      </span>
    );

  const shapeClass = isIconOnly ? 'p-0 h-9 w-9 aspect-square' : '';

  return (
    <button
      {...rest}
      className={[
        'ui-btn',
        variantClass,
        widthClass,
        shapeClass,
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {content}
    </button>
  );
};