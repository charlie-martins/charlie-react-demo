'use client';

import type { InputHTMLAttributes } from 'react';
import type { ComponentType, SVGProps } from 'react';

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  helperText?: string;
  icon?: ComponentType<SVGProps<SVGSVGElement>>;
};

export function Input({
  label,
  helperText,
  className,
  id,
  icon: Icon,
  ...rest
}: InputProps) {
  const inputId = id ?? rest.name;

  const inputClassName = [
    'ui-input',
    Icon && 'pr-9', // make room for the icon on the right
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className="space-y-1">
      {label && (
        <label htmlFor={inputId} className="ui-input-label">
          {label}
        </label>
      )}

      <div className="relative">
        <input
          id={inputId}
          {...rest}
          className={inputClassName}
        />

        {Icon && (
          <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
            <Icon className="ui-input-icon" aria-hidden="true" color='grey'/>
          </span>
        )}
      </div>

      {helperText && (
        <p className="ui-input-helper">{helperText}</p>
      )}
    </div>
  );
}