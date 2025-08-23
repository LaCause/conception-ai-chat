"use client";

import React from "react";
import Button from "@/design-system/Button/Button";
import { Bell, Settings, User } from "lucide-react";
import BlockTitle from "../BlockTitle/BlockTitle";
import BlockSub from "../BlockSub/BlockSub";

export interface BlockHeaderProps {
  title?: string;
  subtitle?: string;
}

export default function BlockHeader({
  title = "App Name",
  subtitle = "Sous-titre ou statut",
}: BlockHeaderProps) {
  return (
    <div
      className="rounded-xl border bg-[var(--elev)] p-4 shadow-sm"
      style={{
        borderColor: "color-mix(in srgb, var(--primary) 20%, transparent)",
      }}
    >
      <div className="flex items-center justify-between">
        <div>
          <BlockTitle>{title}</BlockTitle>
          <BlockSub>{subtitle}</BlockSub>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm">
            <Bell className="size-4" />
          </Button>
          <Button variant="ghost" size="sm">
            <Settings className="size-4" />
          </Button>
          <div
            className="flex h-9 w-9 items-center justify-center rounded-full bg-transparent text-[var(--fg)]"
            style={{
              backgroundColor:
                "color-mix(in srgb, var(--primary) 15%, transparent)",
            }}
          >
            <User className="size-4" />
          </div>
        </div>
      </div>
    </div>
  );
}
