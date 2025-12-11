"use client";

import type { ButtonHTMLAttributes, ReactNode, MouseEvent } from "react";
import { usePostHog } from "posthog-js/react";

export type ButtonVariant = "primary" | "soft" | "ghost" | "outline" | "danger";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  label?: string;
  fullWidth?: boolean;
  icon?: ReactNode;
  iconPosition?: "left" | "right";
  iconOnly?: boolean; // explicit icon-only hint (but inferred if icon + no label)
  eventName?: string;
  eventTags?: string[];

  /** Text-only button (no bg, small text, uses variant colors) */
  text?: boolean;

  /** Completely plain wrapper (no ui-btn chrome, no variant) */
  plain?: boolean;

  /** Variants: ideally only one at a time */
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
  iconPosition = "left",
  iconOnly = false,
  eventName,
  eventTags,
  text,
  plain,
  primary,
  soft,
  ghost,
  outline,
  danger,
  onClick,
  ...rest
}: ButtonProps) => {
  const posthog = usePostHog();

  const isTextMode = !!text;
  const isPlainMode = !!plain;

  // Variant resolution for normal buttons
  let variantClass = "ui-btn-primary";
  let variant: ButtonVariant = "primary";

  if (soft) {
    variantClass = "ui-btn-soft";
    variant = "soft";
  }
  if (ghost) {
    variantClass = "ui-btn-ghost";
    variant = "ghost";
  }
  if (outline) {
    variantClass = "ui-btn-outline";
    variant = "outline";
  }
  if (danger) {
    variantClass = "ui-btn-danger";
    variant = "danger";
  }
  if (primary) {
    variantClass = "ui-btn-primary";
    variant = "primary";
  }

  // Icon-only if:
  // - there is an icon, and
  // - either iconOnly is true OR no label is provided
  const isIconOnly = !!icon && (iconOnly || !label);

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    if (eventName && posthog) {
      posthog.capture(eventName, {
        tags: eventTags,
        variant,
        iconOnly: isIconOnly,
        fullWidth: !!fullWidth,
        textMode: isTextMode,
        plainMode: isPlainMode,
        component: "Button",
      });
    }

    if (onClick) {
      onClick(event);
    }
  };

  // Full-width only makes sense for non-icon-only, non-plain buttons
  const widthClass = fullWidth && !isIconOnly && !isPlainMode ? "w-full" : "";

  const iconWrapperClass =
    "inline-flex items-center justify-center text-[16px] leading-none";

  const content =
    isIconOnly && icon ? (
      <>
        <span className={iconWrapperClass}>{icon}</span>
        {label && <span className="sr-only">{label}</span>}
      </>
    ) : (
      <span className="inline-flex items-center justify-center gap-1.5">
        {icon && iconPosition === "left" && (
          <span className={iconWrapperClass}>{icon}</span>
        )}
        {label && <span>{label}</span>}
        {icon && iconPosition === "right" && (
          <span className={iconWrapperClass}>{icon}</span>
        )}
      </span>
    );

  // For styled icon-only buttons: use ui-btn-icon to make them square
  const shapeClass =
    !isPlainMode && !isTextMode && isIconOnly ? "ui-btn-icon" : "";

  // Text-mode color: variant influences text color
  let textColorClass = "";
  if (isTextMode) {
    if (danger) {
      textColorClass = "text-danger hover:text-danger/85";
    } else if (primary || soft) {
      textColorClass = "text-accent hover:text-accent/85";
    } else if (ghost) {
      textColorClass = "text-muted hover:text-fg";
    } else {
      textColorClass = "text-fg hover:text-fg/80";
    }
  }

  const baseClass = isPlainMode
    ? "ui-btn-plain"
    : isTextMode
      ? "ui-btn-text"
      : "ui-btn";

  const finalClassName = [
    baseClass,
    !isPlainMode && !isTextMode && variantClass,
    !isPlainMode && !isTextMode && widthClass,
    !isPlainMode && !isTextMode && shapeClass,
    isTextMode && "px-0 py-0",
    isTextMode && textColorClass,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <button {...rest} onClick={handleClick} className={finalClassName}>
      {content}
    </button>
  );
};
