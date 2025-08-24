"use client";

import React from "react";
import Button from "@/design-system/Button/Button";
import { Plus } from "lucide-react";

export interface BlockHeroProps {
  title?: string;
  description?: string;
  cta?: string;
}

export default function BlockHero({
  title = "Bienvenue 👋",
  description = "Présentez votre proposition de valeur en une phrase.",
  cta = "Commencer",
}: BlockHeroProps) {
  return (
    <div
      className="relative overflow-hidden rounded-2xl border p-6 shadow-sm"
      style={{
        borderColor: "color-mix(in srgb, var(--primary) 20%, transparent)",
      }}
    >
      <div
        className="pointer-events-none absolute -inset-2 opacity-30 blur-2xl"
        style={{
          background:
            "linear-gradient(90deg,var(--grad-from),var(--grad-mid),var(--grad-to))",
          mask: "radial-gradient(60% 80% at 10% 10%, black, transparent 70%)",
        }}
      />
      <div className="relative">
        <h2 className="text-2xl font-bold gradient-text">{title}</h2>
        <p className="mt-2 text-[var(--muted)]">{description}</p>
        <div className="mt-4 flex items-center gap-2">
          <Button
            variant="primary"
            size="md"
            iconLeft={<Plus className="size-4" />}
          >
            {cta}
          </Button>
          <Button variant="secondary" size="md">
            En savoir plus
          </Button>
        </div>
      </div>
    </div>
  );
}
