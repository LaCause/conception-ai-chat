"use client";

import React from "react";
import clsx from "clsx";

export default function BlockPill({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={clsx(
        "inline-flex items-center gap-1 rounded-full border px-2 py-1 text-xs",
        "text-[var(--fg)]",
        className
      )}
      style={{
        borderColor: "color-mix(in srgb, var(--primary) 30%, transparent)",
        backgroundColor: "color-mix(in srgb, var(--primary) 5%, transparent)",
      }}
    >
      {children}
    </span>
  );
}
