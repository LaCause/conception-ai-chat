"use client";
import clsx from "clsx";

import { Share2, RotateCcw } from "lucide-react";

import Toolbar from "@/app/components/Toolbar/Toolbar";
import Button from "@/design-system/Button/Button";
import ViewControls from "../ViewControls/ViewControls";
import ThemeToggle from "@/design-system/ThemeToggle/ThemeToggle";

export default function HeaderBar({
  compact,
  hasResults,
  loading,
  onShare,
  onReset,
  onRefine,
  onExport,
  layoutMode,
  onLayoutChange,
  composer,
}: {
  compact: boolean;
  hasResults: boolean;
  loading: boolean;
  onShare: () => void;
  onReset: () => void;
  onRefine: (r: string) => void;
  onExport: () => void;
  layoutMode: "mobile" | "desktop" | "both";
  onLayoutChange: (m: "mobile" | "desktop" | "both") => void;
  composer: React.ReactNode;
}) {
  return (
    <header
      className={clsx(
        "sticky top-0 z-10 border-b border-black/10 bg-[--elev]/70 backdrop-blur transition-all duration-300 dark:border-white/10",
        compact ? "py-1" : "py-3 sm:py-4"
      )}
    >
      <div
        className={clsx(
          "mx-auto flex w-full flex-col px-4 sm:px-6",
          compact ? "gap-1" : "gap-3 sm:gap-4"
        )}
      >
        {/* Titre + actions */}
        <div className="flex flex-col items-start justify-between gap-2 sm:flex-row sm:items-center">
          <h1
            className={clsx(
              "gradient-text font-semibold transition-all duration-300",
              compact ? "text-sm sm:text-base" : "text-xl sm:text-2xl"
            )}
          >
            De l’idée au mockup
          </h1>
          <div className="flex flex-wrap items-center gap-2">
            {compact ? (
              <>
                <Button
                  onClick={onShare}
                  variant="secondary"
                  size="sm"
                  aria-label="Partager"
                  title="Partager"
                  className="h-9 w-9 p-0"
                >
                  <Share2 className="size-4" />
                </Button>
                <Button
                  onClick={onReset}
                  variant="ghost"
                  size="sm"
                  aria-label="Réinitialiser"
                  title="Réinitialiser"
                  className="h-9 w-9 p-0"
                >
                  <RotateCcw className="size-4" />
                </Button>
                <ThemeToggle />
              </>
            ) : (
              <>
                <Button onClick={onShare} variant="secondary" size="sm">
                  Partager
                </Button>
                <Button onClick={onReset} variant="ghost" size="sm">
                  Réinitialiser
                </Button>
                <ThemeToggle />
              </>
            )}
          </div>
        </div>

        {/* 👉 Composer inséré ici, toujours visible */}
        <div
          className={clsx(
            "transition-all duration-300",
            compact
              ? "pointer-events-none max-h-0 -translate-y-1 opacity-0"
              : "pointer-events-auto max-h-[240px] translate-y-0 opacity-100"
          )}
        >
          {composer}
        </div>

        {/* Contrôles de vue */}
        <div
          className={clsx(
            "transition-all duration-300",
            compact
              ? "max-h-0 -translate-y-1 opacity-0 overflow-hidden"
              : "max-h-20 translate-y-0 opacity-100"
          )}
        >
          <ViewControls value={layoutMode} onChange={onLayoutChange} />
        </div>

        {/* Toolbar — cachée quand compact */}
        <div
          className={clsx(
            "transition-all duration-200",
            compact ? "opacity-0 h-0 overflow-hidden" : "opacity-100 h-auto"
          )}
        >
          <Toolbar
            onRefine={onRefine}
            onExportJSON={onExport}
            disabled={!hasResults || loading}
          />
        </div>
      </div>
    </header>
  );
}
