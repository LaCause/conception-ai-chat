"use client";

import clsx from "clsx";

export interface SegmentControlProps<T extends string> {
  value: T;
  onChange: (v: T) => void;
  options: { value: T; label: React.ReactNode }[];
  className?: string;
}

export function SegmentControl<T extends string>({
  value,
  onChange,
  options,
  className,
}: SegmentControlProps<T>) {
  return (
    <div
      className={clsx(
        "inline-flex overflow-hidden rounded-xl border border-black/10 bg-[--elev]/70 dark:border-white/10",
        className
      )}
    >
      {options.map((opt, i) => (
        <button
          key={opt.value}
          onClick={() => onChange(opt.value)}
          className={clsx(
            "px-3 py-2 text-sm hover:bg-black/5 dark:hover:bg-white/10",
            value === opt.value && "bg-black/5 dark:bg-white/10 font-medium",
            i !== 0 && "border-l border-black/10 dark:border-white/10"
          )}
          aria-pressed={value === opt.value}
          type="button"
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
}
