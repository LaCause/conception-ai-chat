"use client";

import React from "react";
import { CheckCircle } from "lucide-react";
import Button from "@/design-system/Button/Button";
import BlockTitle from "../BlockTitle/BlockTitle";

export interface BlockFormProps {
  title?: string;
  fields?: string[];
}

export default function BlockForm({
  title = "Formulaire",
  fields = ["Nom", "Email", "Mot de passe"],
}: BlockFormProps) {
  return (
    <div
      className="rounded-xl border bg-[var(--elev)] p-4 shadow-sm"
      style={{
        borderColor: "color-mix(in srgb, var(--primary) 20%, transparent)",
      }}
    >
      <BlockTitle small>{title}</BlockTitle>
      <div className="mt-3 grid gap-3">
        {fields.map((f, i) => (
          <div key={i} className="grid gap-1">
            <label className="text-xs text-[var(--muted)]">{f}</label>
            <input
              className="h-10 rounded-lg border bg-transparent px-3 outline-none focus-visible:glow-outline"
              style={{
                borderColor:
                  "color-mix(in srgb, var(--primary) 25%, transparent)",
              }}
            />
          </div>
        ))}
      </div>
      <div className="mt-4 flex items-center justify-end gap-2">
        <Button variant="ghost">Annuler</Button>
        <Button variant="primary" iconLeft={<CheckCircle className="size-4" />}>
          Valider
        </Button>
      </div>
    </div>
  );
}
