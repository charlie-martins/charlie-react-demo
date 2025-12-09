"use client";

import { useId } from "react";
import clsx from "clsx";

interface ColorPickerProps {
  label?: string;
  /** List of colors as CSS color strings (e.g. hex, rgb, hsl) */
  colors?: string[];
  /** Currently selected color value */
  value: string;
  /** Called when the selection changes */
  onChange: (color: string) => void;
  /** Optional radio group name (for form integration) */
  name?: string;
}

const defaultColors = [
  "rgb(236, 72, 153)", // pink
  "rgb(168, 85, 247)", // purple
  "rgb(59, 130, 246)", // blue
  "rgb(34, 197, 94)", // green
  "rgb(251, 191, 36)", // mango
];

export const ColorPicker = ({
  label = "Choose a label color",
  colors = defaultColors,
  value,
  onChange,
  name,
}: ColorPickerProps) => {
  const fallbackId = useId();
  const groupName = name ?? `color-picker-${fallbackId}`;

  return (
    <fieldset className="border-0 p-0 m-0">
      <legend className="mb-2 text-xs font-medium text-fg">{label}</legend>

      <div className="flex items-center gap-3">
        {colors.map((color) => {
          const isSelected = value === color;
          const id = `${groupName}-${color}`;

          return (
            <label
              key={color}
              htmlFor={id}
              className="cursor-pointer inline-flex items-center justify-center"
            >
              <input
                id={id}
                type="radio"
                name={groupName}
                value={color}
                checked={isSelected}
                onChange={() => onChange(color)}
                className="sr-only"
              />

              <span
                className={clsx(
                  "inline-flex items-center justify-center rounded-full transition-transform",
                  isSelected ? "scale-100" : "opacity-80 hover:scale-105",
                )}
                style={
                  isSelected
                    ? {
                        // Inner ring: white, Outer ring: selected color
                        boxShadow: `0 0 0 2px rgb(249, 250, 251), 0 0 0 4px ${color}`,
                      }
                    : undefined
                }
              >
                <span
                  className="h-7 w-7 rounded-full"
                  style={{ backgroundColor: color }}
                />
              </span>
            </label>
          );
        })}
      </div>
    </fieldset>
  );
};
