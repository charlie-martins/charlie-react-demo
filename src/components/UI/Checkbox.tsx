'use client';

import type { InputHTMLAttributes } from 'react';
import clsx from 'clsx';
import { Check } from 'lucide-react';

type NativeCheckboxProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'type'>;

export interface CheckboxProps extends NativeCheckboxProps {
  label?: string;
  helperText?: string;
}

export const Checkbox = ({
  label,
  helperText,
  className,
  disabled,
  ...rest
}: CheckboxProps) => {
  const id = rest.id ?? rest.name;

  const wrapperClasses = clsx(
    'inline-flex items-start gap-2',
    disabled && 'opacity-60 cursor-not-allowed'
  );

  const boxWrapperClasses = 'relative inline-flex items-center justify-center';

  const boxClasses = clsx(
    'flex h-4 w-4 items-center justify-center',
    'rounded-[4px]',
    'border border-border-subtle bg-surface',
    'transition-colors duration-150',
    'peer-focus-visible:outline-none peer-focus-visible:ring-2 peer-focus-visible:ring-accent',
    'peer-checked:bg-accent peer-checked:border-accent'
  );

  const iconClasses = clsx(
    'h-3 w-3 text-bg',
    'opacity-0 peer-checked:opacity-100',
    'transition-opacity duration-150'
  );

  return (
    <div className={clsx('inline-flex flex-col gap-1', className)}>
      <label htmlFor={id} className={wrapperClasses}>
        <span className={boxWrapperClasses}>
          <input
            id={id}
            type="checkbox"
            className="peer sr-only"
            disabled={disabled}
            {...rest}
          />
          <span className={boxClasses}>
            <Check aria-hidden="true" className={iconClasses} />
          </span>
        </span>

        {label && (
          <span className="text-xs text-fg leading-tight">
            {label}
          </span>
        )}
      </label>

      {helperText && (
        <p className="text-[11px] text-muted leading-tight pl-6">
          {helperText}
        </p>
      )}
    </div>
  );
};