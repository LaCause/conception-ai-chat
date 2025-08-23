"use client";

import React from "react";
import { Calendar, Heart, Star, Settings } from "lucide-react";
import Button from "@/design-system/Button/Button";
import BlockTitle from "../BlockTitle/BlockTitle";
import BlockPill from "../BlockPill/BlockPill";

export interface BlockDetailProps {
  title?: string;
  subtitle?: string;
  content?: string;
}

export default function BlockDetail({
  title = "Titre du contenu",
  subtitle = "Infos clés et tags",
  content = "Voici un exemple de zone de détail avec texte, méta-informations et actions contextuelles.",
}: BlockDetailProps) {
  return (
    <div
      className="rounded-xl border bg-[var(--elev)] p-4 shadow-sm"
      style={{
        borderColor: "color-mix(in srgb, var(--primary) 20%, transparent)",
      }}
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <BlockTitle>{title}</BlockTitle>
          {subtitle && (
            <p className="text-xs text-[var(--muted)]">{subtitle}</p>
          )}
          <div className="mt-1 flex flex-wrap gap-2">
            <BlockPill>
              <Calendar className="size-3" />
              Aujourd hui
            </BlockPill>
            <BlockPill>
              <Heart className="size-3" />
              124
            </BlockPill>
            <BlockPill>
              <Star className="size-3" />
              4.8
            </BlockPill>
          </div>
        </div>
        <Button
          variant="secondary"
          size="sm"
          className="h-9 px-3"
          iconLeft={<Settings className="size-4" />}
        >
          Options
        </Button>
      </div>
      <p className="mt-3 text-sm leading-6 text-[var(--muted)]">{content}</p>
      <div
        className="mt-4 h-32 rounded-lg bg-transparent"
        style={{
          backgroundColor:
            "color-mix(in srgb, var(--primary) 10%, transparent)",
        }}
      />
    </div>
  );
}
