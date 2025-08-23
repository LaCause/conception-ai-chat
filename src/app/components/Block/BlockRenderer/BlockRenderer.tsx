"use client";

import React from "react";
import clsx from "clsx";
import type { UIBlock } from "@/types/ui";

import BlockHeader from "@/app/components/Block/BlockHeader/BlockHeader";
import BlockHero from "@/app/components/Block/BlockHero/BlockHero";
import BlockSearch from "@/app/components/Block/BlockSearch/BlockSearch";
import BlockList from "@/app/components/Block/BlockList/BlockList";
import BlockCardGrid from "@/app/components/Block/BlockCardGrid/BlockCardGrid";
import BlockForm from "@/app/components/Block/BlockForm/BlockForm";
import BlockDetail from "@/app/components/Block/BlockDetail/BlockDetail";
import BlockCtaBar from "@/app/components/Block/BlockCtaBar/BlockCtaBar";

export interface BlockRendererProps {
  block: UIBlock;
  compact?: boolean;
  className?: string;
}

export default function BlockRenderer({
  block,
  compact,
  className,
}: BlockRendererProps) {
  const t = block.type;
  const title = block.title || undefined;
  const description = block.description || undefined;
  const data = block.data || {};

  return (
    <div className={clsx("w-full", className)}>
      {t === "HEADER" && <BlockHeader title={title} subtitle="Sous-titre" />}

      {t === "HERO" && <BlockHero title={title} description={description} />}

      {t === "SEARCH" && (
        <BlockSearch placeholder={title || "Rechercher…"} compact={!!compact} />
      )}

      {t === "LIST" && <BlockList title={title} />}

      {t === "CARD_GRID" && (
        <BlockCardGrid title={title} cols={Number(data?.cols ?? 2)} />
      )}

      {t === "FORM" && <BlockForm title={title} />}

      {t === "DETAIL" && <BlockDetail title={title} content={description} />}

      {t === "CTA_BAR" && <BlockCtaBar title={title || "Continuer"} />}

      {![
        "HEADER",
        "HERO",
        "SEARCH",
        "LIST",
        "CARD_GRID",
        "FORM",
        "DETAIL",
        "CTA_BAR",
      ].includes(t) && (
        <div className="rounded-xl border border-dashed border-black/20 p-4 text-sm text-[var(--muted)] dark:border-white/20">
          Type inconnu: <code className="text-xs">{t}</code>
          <pre className="mt-2 max-h-48 overflow-auto rounded-lg bg-black/5 p-2 text-xs dark:bg-white/10">
            {JSON.stringify(block, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
}
