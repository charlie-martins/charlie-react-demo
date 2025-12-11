"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/UI/Button";
import { useTheme } from "@/lib/ThemeContext";
// import { SunIcon, MoonIcon } from '@heroicons/react/24/solid';
import { SunMoon } from "lucide-react";

export const ThemeToggle = () => {
  const { resolvedTheme, toggleTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const isDark = mounted ? resolvedTheme === "dark" : false;

  const icon = <SunMoon size={24} />;
  const label = isDark ? "Switch to light mode" : "Switch to dark mode";

  return (
    <Button
      icon={icon}
      iconOnly
      primary
      type="button"
      aria-label={label}
      onClick={toggleTheme}
    />
  );
};
