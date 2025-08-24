"use client";

import { useEffect, useMemo, useState } from "react";
import type { Blocks, UIBlock } from "@/types/ui";
import { decodeState } from "@/lib/share";

import SkeletonResults from "./components/SkeletonResults/SkeletonResults";
import MockUpCanvas from "./components/MockUpCanvas/MockUpCanvas";
import Inspector from "./components/Preview/Inspector/Inspector";
import Composer from "./components/Workspace/Composer/Composer";
import WorkspaceLayout from "./components/Workspace/WorkspaceLayout/WorkspaceLayout";
import HeaderBar from "./components/Workspace/HeaderBar/HeaderBar";
import {
  applyThemeVars,
  computeThemeFromIdea,
  LayoutMode,
  loadThemeVars,
  saveThemeVars,
} from "@/lib/theme";
import {
  buildShareUrl,
  CLEARED_FLAG,
  performClearPersistence,
  requestGenerate,
} from "@/lib/persistence";
import { ThemeVars } from "@/types/ui";

export default function Page() {
  const [idea, setIdea] = useState("");
  const [blocks, setBlocks] = useState<UIBlock[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [animKey, setAnimKey] = useState(0);
  const [layoutMode, setLayoutMode] = useState<LayoutMode>("both");
  const [compactHeader, setCompactHeader] = useState(false);

  const selected = useMemo(
    () => blocks.find((b) => b.id === selectedId) ?? null,
    [blocks, selectedId]
  );
  const hasResults = blocks.length > 0;

  useEffect(() => {
    const onScroll = () => setCompactHeader(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (sessionStorage.getItem(CLEARED_FLAG) === "1") {
      sessionStorage.removeItem(CLEARED_FLAG);
      const url = new URL(window.location.href);
      if (url.searchParams.has("s")) {
        url.searchParams.delete("s");
        window.history.replaceState({}, "", url.toString());
      }
      setIdea("");
      setBlocks([]);
      const persistedTheme = loadThemeVars();
      if (persistedTheme) applyThemeVars(persistedTheme);
      return;
    }

    const params = new URLSearchParams(window.location.search);
    const s = params.get("s");
    if (s) {
      const st = decodeState<Blocks>(s);
      if (st?.blocks) setBlocks(st.blocks);
      if (st?.idea) setIdea(st.idea);
      const persistedTheme = loadThemeVars();
      if (persistedTheme) applyThemeVars(persistedTheme);
      return;
    }

    const raw = localStorage.getItem("state");
    const persistedTheme = loadThemeVars();
    if (persistedTheme) applyThemeVars(persistedTheme);

    if (raw) {
      try {
        const parsed = JSON.parse(raw);
        setBlocks(parsed.blocks ?? []);
        setIdea(parsed.idea ?? "");
      } catch {
        localStorage.removeItem("state");
      }
    } else {
      setBlocks([
        { id: "hdr", type: "HEADER", title: "App Name", cols: 12, order: 0 },
        {
          id: "hero",
          type: "HERO",
          title: "Bienvenue",
          description: "Pitch court",
          cols: 12,
          order: 1,
        },
        {
          id: "search",
          type: "SEARCH",
          title: "Recherche / Scanner",
          cols: 12,
          order: 2,
        },
        { id: "list", type: "LIST", title: "Liste", cols: 12, order: 3 },
        {
          id: "cta",
          type: "CTA_BAR",
          title: "Action principale",
          cols: 12,
          order: 99,
        },
      ]);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("state", JSON.stringify({ idea, blocks }));
  }, [idea, blocks]);

  const generate = async (
    refine?: string,
    mode: "append" | "replace" = "append"
  ) => {
    if (!idea.trim() && !refine) return;
    setLoading(true);
    try {
      const { blocks: newBlocks, theme } = await requestGenerate({
        idea,
        refine,
        prev: blocks,
        mode,
      });

      let themeToApply: ThemeVars | undefined = theme;

      if (!themeToApply) {
        const baseText = refine && refine.trim().length > 0 ? refine : idea;
        themeToApply = computeThemeFromIdea(baseText) ?? undefined;
      }

      applyThemeVars(themeToApply);
      saveThemeVars(themeToApply);

      setBlocks(newBlocks);
      setSelectedId(null);
      setAnimKey(Date.now());
    } catch (e) {
      console.error("generate failed:", e);
    } finally {
      setLoading(false);
    }
  };

  const share = () => {
    const url = buildShareUrl(window.location.href, idea, blocks);
    navigator.clipboard.writeText(url);
    alert("Lien copié !");
  };

  const clearPersistence = () => {
    performClearPersistence();
    setIdea("");
    setBlocks([]);
    setSelectedId(null);
  };

  return (
    <div className="relative min-h-screen bg-[--bg]">
      <HeaderBar
        compact={compactHeader}
        hasResults={hasResults}
        loading={loading}
        onShare={share}
        onReset={clearPersistence}
        onRefine={(r) => generate(r)}
        onExport={() => {
          const blob = new Blob([JSON.stringify({ idea, blocks }, null, 2)], {
            type: "application/json",
          });
          const url = URL.createObjectURL(blob);
          const a = document.createElement("a");
          a.href = url;
          a.download = "mockup.json";
          a.click();
          URL.revokeObjectURL(url);
        }}
        layoutMode={layoutMode}
        onLayoutChange={setLayoutMode}
        composer={
          <Composer
            value={idea}
            onChange={setIdea}
            onSubmit={() => generate()}
            compact={compactHeader}
          />
        }
      />

      <WorkspaceLayout
        showInspector={!!selected}
        inspector={
          selected && (
            <Inspector
              selected={selected}
              onDelete={() => {
                if (!selected) return;
                setBlocks(blocks.filter((b) => b.id !== selected.id));
                setSelectedId(null);
              }}
              onChange={(patch) => {
                if (!selected) return;
                setBlocks(
                  blocks.map((b) =>
                    b.id === selected.id ? { ...b, ...patch } : b
                  )
                );
              }}
            />
          )
        }
      >
        {loading ? (
          <SkeletonResults />
        ) : (
          <div key={animKey} className="slide-in-right">
            <MockUpCanvas
              blocks={blocks}
              selectedId={selectedId}
              onSelect={setSelectedId}
              onChange={setBlocks}
              layoutMode={layoutMode}
            />
          </div>
        )}
      </WorkspaceLayout>
    </div>
  );
}
