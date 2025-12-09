'use client';

import { Input } from "./Input";
import { Search as SearchIcon} from "lucide-react";

export const Search = () => {
  return (
    <Input
      placeholder="Search..."
      icon={SearchIcon}
    />
  );
}