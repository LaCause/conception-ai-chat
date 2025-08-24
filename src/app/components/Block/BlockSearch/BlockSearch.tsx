"use client";

import React from "react";
import clsx from "clsx";
import { Search as SearchIcon } from "lucide-react";
import BlockPill from "../BlockPill/BlockPill";

export interface BlockSearchProps {
  placeholder?: string;
  hint?: string;
  compact?: boolean;
}

export default function BlockSearch({
  placeholder = "Rechercher…",
  hint = "Conseil : tapez un mot-clé ou scannez",
  compact,
}: BlockSearchProps) {
  return (
    <div
      className="rounded-xl border bg-[var(--elev)] p-4 shadow-sm"
      style={{
        borderColor: "color-mix(in srgb, var(--primary) 20%, transparent)",
      }}
    >
      <div
        className={clsx(
          "flex items-center gap-2 rounded-lg border bg-white/70 px-3 dark:bg-white/5",
          compact ? "py-2" : "py-3"
        )}
        style={{
          borderColor: "color-mix(in srgb, var(--primary) 25%, transparent)",
        }}
      >
        <SearchIcon className="size-4 opacity-70" />
        <input
          placeholder={placeholder}
          className="w-full bg-transparent outline-none placeholder:text-[var(--muted)]"
        />
        <BlockPill>⌘K</BlockPill>
      </div>
      {!compact && <p className="mt-2 text-xs text-[var(--muted)]">{hint}</p>}
    </div>
  );
}
