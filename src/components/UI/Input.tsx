'use client';

import type { InputHTMLAttributes } from 'react';

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  helperText?: string;
};

export function Input({
  label,
  helperText,
  className,
  id,
  ...rest
}: InputProps) {
  const inputId = id ?? rest.name;

  return (
    <div className="space-y-1">
      {label && (
        <label htmlFor={inputId} className="ui-input-label">
          {label}
        </label>
      )}
      <input
        id={inputId}
        {...rest}
        className={['ui-input', className].filter(Boolean).join(' ')}
      />
      {helperText && (
        <p className="ui-input-helper">{helperText}</p>
      )}
    </div>
  );
}