"use client";

import React from "react";
import clsx from "clsx";
import { Image as ImageIcon, Star, Plus } from "lucide-react";
import Button from "@/design-system/Button/Button";
import BlockTitle from "../BlockTitle/BlockTitle";

export interface BlockCardGridProps {
  title?: string;
  cols?: number;
}

export default function BlockCardGrid({
  title = "Cartes",
  cols = 2,
}: BlockCardGridProps) {
  const gridCols = Math.max(1, Math.min(4, cols));
  return (
    <div
      className="rounded-xl border bg-[var(--elev)] p-3 shadow-sm"
      style={{
        borderColor: "color-mix(in srgb, var(--primary) 20%, transparent)",
      }}
    >
      <BlockTitle small>{title}</BlockTitle>
      <div
        className={clsx(
          "mt-3 grid gap-3",
          gridCols === 1 && "grid-cols-1",
          gridCols === 2 && "grid-cols-2",
          gridCols === 3 && "grid-cols-3",
          gridCols === 4 && "grid-cols-4"
        )}
      >
        {Array.from({ length: gridCols * 2 }).map((_, i) => (
          <div
            key={i}
            className="rounded-lg border p-3"
            style={{
              borderColor:
                "color-mix(in srgb, var(--primary) 25%, transparent)",
            }}
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-2">
                <div
                  className="flex h-8 w-8 items-center justify-center rounded-lg bg-transparent"
                  style={{
                    backgroundColor:
                      "color-mix(in srgb, var(--primary) 15%, transparent)",
                  }}
                >
                  <ImageIcon className="size-4" />
                </div>
                <div>
                  <div className="text-sm font-medium">Carte {i + 1}</div>
                  <div className="text-xs text-[var(--muted)]">Sous-texte</div>
                </div>
              </div>
              <Star className="size-4 opacity-60" />
            </div>
            <div
              className="mt-3 h-20 rounded-md bg-transparent"
              style={{
                backgroundColor:
                  "color-mix(in srgb, var(--primary) 10%, transparent)",
              }}
            />
            <div className="mt-3 flex items-center justify-between">
              <Button
                variant="secondary"
                size="sm"
                className="h-8 px-2 text-xs"
              >
                Détails
              </Button>
              <Button
                variant="primary"
                size="sm"
                className="h-8 px-2 text-xs"
                iconLeft={<Plus className="size-3" />}
              >
                Ajouter
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
