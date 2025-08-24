"use client";

import React from "react";
import { ChevronRight, Image as ImageIcon } from "lucide-react";
import BlockTitle from "../BlockTitle/BlockTitle";

export interface BlockListProps {
  title?: string;
  items?: string[];
}

export default function BlockList({
  title = "Liste",
  items = ["Élément 1", "Élément 2", "Élément 3"],
}: BlockListProps) {
  return (
    <div
      className="rounded-xl border bg-[var(--elev)] p-3 shadow-sm"
      style={{
        borderColor: "color-mix(in srgb, var(--primary) 20%, transparent)",
      }}
    >
      <BlockTitle small>{title}</BlockTitle>
      <ul className="mt-2 divide-y divide-[var(--primary)]">
        {items.map((t, i) => (
          <li key={i} className="flex items-center justify-between py-2">
            <div className="flex items-center gap-3">
              <div
                className="flex h-8 w-8 items-center justify-center rounded-md bg-transparent text-[var(--fg)]"
                style={{
                  backgroundColor:
                    "color-mix(in srgb, var(--primary) 15%, transparent)",
                }}
              >
                <ImageIcon className="size-4" />
              </div>
              <span>{t}</span>
            </div>
            <ChevronRight className="size-4 opacity-60" />
          </li>
        ))}
      </ul>
    </div>
  );
}
