'use client';

import type { InputHTMLAttributes } from 'react';
import { Input } from '@/ui';
import { Search as SearchIcon } from 'lucide-react';

type SearchProps = InputHTMLAttributes<HTMLInputElement>;

export const Search = ({ placeholder, ...rest }: SearchProps) => {
  return (
    <Input
      placeholder={placeholder ?? 'Search...'}
      icon={SearchIcon}
      {...rest}
    />
  );
};