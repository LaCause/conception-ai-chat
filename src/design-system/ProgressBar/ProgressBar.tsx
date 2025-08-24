"use client";

import clsx from "clsx";
import { ProgressBarProps } from "./ProgressBar.model";

export default function ProgressBar({
  value,
  max = 100,
  label = "Progression",
  showPercent = true,
  className,
}: ProgressBarProps) {
  const pct = Math.max(0, Math.min(value, max));
  const width = `${(pct / max) * 100}%`;

  return (
    <div className={clsx("w-full", className)}>
      {/* Élément natif accessible */}
      <progress className="sr-only" value={pct} max={max} aria-label={label} />
      {/* Barre visuelle */}
      <div className="h-2 w-full overflow-hidden rounded-full bg-black/10 dark:bg-white/10">
        <div
          className="h-full bg-purple-400 transition-[width] duration-300"
          style={{ width }}
          aria-hidden="true"
        />
      </div>
      {showPercent && (
        <p className="mt-2 text-right text-xs text-[--color-muted]">
          {Math.round((pct / max) * 100)}%
        </p>
      )}
    </div>
  );
}
