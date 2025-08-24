"use client";

import React from "react";
import { ChevronRight } from "lucide-react";
import Button from "@/design-system/Button/Button";

export interface BlockCtaBarProps {
  title?: string;
  secondary?: string;
}

export default function BlockCtaBar({
  title = "Action principale",
  secondary = "Plus tard",
}: BlockCtaBarProps) {
  return (
    <div
      className="sticky bottom-2 z-0 mt-2 rounded-xl border bg-[var(--elev)] p-3 shadow-sm"
      style={{
        borderColor: "color-mix(in srgb, var(--primary) 20%, transparent)",
      }}
    >
      <div className="flex items-center justify-between gap-3">
        <div className="text-sm text-[var(--muted)]">Prêt à continuer ?</div>
        <div className="flex items-center gap-2">
          <Button variant="ghost">{secondary}</Button>
          <Button
            variant="primary"
            iconRight={<ChevronRight className="size-4" />}
          >
            {title}
          </Button>
        </div>
      </div>
    </div>
  );
}
