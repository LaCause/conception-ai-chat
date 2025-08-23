"use client";

import type { UIBlock } from "@/types/ui";
import { useEffect } from "react";
import BlockRenderer from "../Block/BlockRenderer/BlockRenderer";
import DeviceFrame from "../Device/DeviceFrame/DeviceFrame";
import { colSpanClass } from "./utils";
import clsx from "clsx";
import Button from "@/design-system/Button/Button";
import DesktopFrame from "../Device/DesktopFrame/DesktopFrame";

export default function MockupCanvas({
  blocks,
  onChange,
  onSelect,
  selectedId,
  layoutMode = "both",
}: {
  blocks: UIBlock[];
  onChange?: (next: UIBlock[]) => void;
  onSelect?: (id: string | null) => void;
  selectedId?: string | null;
  layoutMode?: "mobile" | "desktop" | "both";
}) {
  useEffect(() => {
    if (!selectedId) return;
    const el = document.querySelector(`[data-block="${selectedId}"]`);
    el?.scrollIntoView({ behavior: "smooth", block: "center" });
  }, [selectedId]);

  if (!blocks.length)
    return (
      <div className="soft-card p-12 text-center">
        <h3 className="mb-2 text-lg font-semibold">
          Aucun mockup pour l’instant
        </h3>
        <p className="text-sm text-[--muted]">
          Décrivez votre idée puis cliquez sur « Générer » pour voir l’aperçu.
        </p>
      </div>
    );

  return (
    <section className="soft-card p-0 overflow-hidden">
      <div className="flex flex-col gap-8 p-4 md:p-6">
        {(layoutMode === "mobile" || layoutMode === "both") && (
          <div>
            <Header title="Aperçu mobile" />
            <div className="mt-3 flex flex-col items-center">
              <DeviceFrame>
                <div className="grid grid-cols-1 gap-3 p-3">
                  {blocks.map((b) => (
                    <div
                      key={b.id}
                      data-block={b.id}
                      className={
                        selectedId === b.id ? "glow-outline rounded-xl" : ""
                      }
                    >
                      <BlockRenderer block={b} compact />
                    </div>
                  ))}
                </div>
              </DeviceFrame>
            </div>
          </div>
        )}

        {(layoutMode === "desktop" || layoutMode === "both") && (
          <div>
            <Header
              title="Aperçu desktop"
              subtitle="Cadre ordinateur avec barre de navigation"
            />
            <div className="mt-3 flex justify-center">
              <DesktopFrame chromeTitle="mockup.local">
                <div className="rounded-xl bg-[--elev]/80 p-4 backdrop-blur dark:bg-[--elev]/70">
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-12">
                    {blocks.map((b, i) => (
                      <div key={b.id} className={`relative ${desktopSpan(b)}`}>
                        <div
                          onClick={() => onSelect?.(b.id)}
                          className={clsx(
                            "cursor-pointer rounded-xl bg-white p-4 shadow-sm dark:bg-white/10",
                            selectedId === b.id && "glow-outline"
                          )}
                        >
                          <BlockRenderer block={b} />
                        </div>

                        {onChange ? (
                          <div className="mt-2 flex gap-2">
                            <Button
                              variant="secondary"
                              size="sm"
                              onClick={() =>
                                i > 0 && onChange(move(blocks, i, i - 1))
                              }
                              aria-label="Monter"
                            >
                              ↑
                            </Button>
                            <Button
                              variant="secondary"
                              size="sm"
                              onClick={() =>
                                i < blocks.length - 1 &&
                                onChange(move(blocks, i, i + 1))
                              }
                              aria-label="Descendre"
                            >
                              ↓
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => onSelect?.(b.id)}
                              aria-pressed={selectedId === b.id}
                              className={
                                selectedId === b.id ? "glow-outline" : undefined
                              }
                            >
                              Sélection
                            </Button>
                          </div>
                        ) : null}
                      </div>
                    ))}
                  </div>
                </div>
              </DesktopFrame>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

function move<T>(arr: T[], from: number, to: number) {
  const next = arr.slice();
  const [it] = next.splice(from, 1);
  next.splice(to, 0, it);
  return next;
}

function desktopSpan(b: UIBlock) {
  // If a numeric cols value exists, keep current mapping
  if (typeof b.cols === "number") return colSpanClass(b.cols);
  // Fallbacks per block type to ensure visibility on desktop
  switch (b.type) {
    case "HEADER":
    case "HERO":
    case "DETAIL":
    case "CTA_BAR":
      return "md:col-span-12";
    case "CARD_GRID":
      return "md:col-span-12";
    case "FORM":
    case "LIST":
    case "SEARCH":
    default:
      return "md:col-span-6"; // split screen by default
  }
}

function Header({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div className="flex items-end justify-between">
      <div>
        <h3 className="text-sm font-semibold tracking-wide text-[--muted]">
          {title}
        </h3>
        {subtitle && <p className="text-xs text-[--muted]">{subtitle}</p>}
      </div>
    </div>
  );
}
