"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type { UIBlock } from "@/types/ui";
import { encodeState, decodeState } from "@/lib/share";
import SkeletonResults from "./components/SkeletonResults/SkeletonResults";
import MockupCanvas from "./components/MockUpCanvas/MockUpCanvas";
import Inspector from "./components/Preview/Inspector/Inspector";
import Toolbar from "./components/Toolbar/Toolbar";
import { Sun, Moon, Send } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import Button from "@/design-system/Button/Button";
import clsx from "clsx";

function applyThemeVars(theme?: {
  primary: string;
  gradFrom: string;
  gradMid: string;
  gradTo: string;
}) {
  if (!theme) return;
  const r = document.documentElement;
  r.style.setProperty("--primary", theme.primary);
  r.style.setProperty("--grad-from", theme.gradFrom);
  r.style.setProperty("--grad-mid", theme.gradMid);
  r.style.setProperty("--grad-to", theme.gradTo);
}

function ThemeToggle() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const root = document.documentElement;
    const saved = (typeof window !== "undefined" &&
      localStorage.getItem("theme")) as "light" | "dark" | null;
    const initial = saved
      ? saved === "dark"
      : root.classList.contains("dark") ||
        window.matchMedia("(prefers-color-scheme: dark)").matches;
    setDark(initial);
    root.classList.toggle("dark", initial);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
    try {
      localStorage.setItem("theme", dark ? "dark" : "light");
    } catch {}
  }, [dark]);

  return (
    <button
      onClick={() => setDark((v) => !v)}
      className="btn-ghost inline-flex items-center gap-2"
      aria-pressed={dark}
      aria-label="Basculer le thème"
      title={dark ? "Passer en clair" : "Passer en sombre"}
    >
      <span className="relative inline-flex size-5 items-center justify-center">
        <Sun
          className={`size-5 transition-transform duration-200 ${
            dark ? "rotate-90 scale-0" : "rotate-0 scale-100"
          }`}
        />
        <Moon
          className={`absolute size-5 transition-transform duration-200 ${
            dark ? "rotate-0 scale-100" : "-rotate-90 scale-0"
          }`}
        />
      </span>
      <span className="text-sm">{dark ? "Sombre" : "Clair"}</span>
    </button>
  );
}

export default function Page() {
  const [idea, setIdea] = useState("");
  const [blocks, setBlocks] = useState<UIBlock[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [animKey, setAnimKey] = useState(0);
  const [layoutMode, setLayoutMode] = useState<"mobile" | "desktop" | "both">(
    "both"
  );
  const [compactHeader, setCompactHeader] = useState(false);

  const selected = useMemo(
    () => blocks.find((b) => b.id === selectedId) ?? null,
    [blocks, selectedId]
  );

  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const autoResize = () => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = "0px";
    el.style.height = Math.min(el.scrollHeight, 220) + "px";
  };

  useEffect(() => {
    const onScroll = () => setCompactHeader(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const isMetaK = (e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k";
      if (isMetaK) {
        e.preventDefault();
        textareaRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const s = params.get("s");
    if (s) {
      const st = decodeState(s);
      if (st?.blocks) setBlocks(st.blocks);
      if (st?.idea) setIdea(st.idea);
      return;
    }
    const raw = localStorage.getItem("state");
    if (raw) {
      try {
        const parsed = JSON.parse(raw);
        setBlocks(parsed.blocks ?? []);
        setIdea(parsed.idea ?? "");
      } catch {}
    }
  }, []);

  useEffect(() => {
    if (blocks.length === 0) {
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
    setLoading(true);
    const res = await fetch("/api/generate", {
      method: "POST",
      body: JSON.stringify({ idea, refine, prev: blocks, mode }),
    });
    const json = await res.json();

    applyThemeVars(json.theme);

    setBlocks(json.blocks);
    setSelectedId(null);
    setLoading(false);
    setAnimKey(Date.now());
  };

  const share = () => {
    const url = new URL(window.location.href);
    url.searchParams.set("s", encodeState({ idea, blocks }));
    navigator.clipboard.writeText(url.toString());
    alert("Lien copié !");
  };

  const clearPersistence = () => {
    localStorage.removeItem("state");
    const url = new URL(window.location.href);
    if (url.searchParams.has("s")) {
      url.searchParams.delete("s");
      window.history.replaceState({}, "", url.toString());
    }
    setIdea("");
    setBlocks([]);
    setSelectedId(null);
  };

  const hasResults = blocks.length > 0;

  return (
    <div className="relative min-h-screen bg-[--bg]">
      {/* Fond animé derrière, ne bloque pas les clics */}

      {/* Workspace en 2 lignes : header sticky / contenu */}
      <div className="grid min-h-screen grid-rows-[auto_1fr]">
        {/* HEADER STICKY COMPACTABLE */}
        <header
          className={`pro-surface sticky top-0 z-10 border-b border-black/10 backdrop-blur transition-all duration-300 dark:border-white/10
            ${compactHeader ? "py-2 bg-[--elev]/80" : "py-6 bg-[--elev]/70"}`}
        >
          <div
            className={`mx-auto flex w-full flex-col gap-4 transition-all duration-300 ${
              compactHeader ? "max-w-4xl" : "max-w-5xl"
            }`}
          >
            <div className="flex items-center justify-between">
              <h1
                className={`gradient-text font-semibold transition-all duration-300 ${
                  compactHeader ? "text-xl" : "text-2xl"
                }`}
              >
                De l’idée au mockup
              </h1>
              <div className="flex items-center gap-2">
                <Button onClick={share} variant="secondary" size="sm">
                  Partager
                </Button>
                +{" "}
                <Button onClick={clearPersistence} variant="ghost" size="sm">
                  Réinitialiser
                </Button>
                <ThemeToggle />
              </div>
            </div>

            {/* Composer façon ChatGPT */}
            <div className="relative gradient-border bg-[--elev]/60 transition-all duration-300">
              <div
                className={`rounded-xl transition-all duration-300 ${
                  compactHeader
                    ? "p-2 bg-white/60 dark:bg-white/5"
                    : "p-3 bg-white/70 dark:bg-white/5"
                }`}
              >
                <div className="flex items-end gap-2">
                  <span
                    className={`opacity-60 text-xs ${
                      compactHeader ? "mb-1" : "mb-2"
                    }`}
                  >
                    ⌘K
                  </span>
                  <textarea
                    ref={textareaRef}
                    value={idea}
                    onChange={(e) => {
                      const v = e.target.value.slice(0, 1000);
                      setIdea(v);
                      autoResize();
                    }}
                    onInput={autoResize}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault();
                        if (!loading && idea.trim()) generate();
                      }
                    }}
                    placeholder="Écrivez votre idée… (Entrée = envoyer, Shift+Entrée = nouvelle ligne)"
                    aria-label="Décrivez votre idée d’application"
                    rows={1}
                    className={`max-h-56 w-full resize-none bg-transparent outline-none placeholder:text-[--muted] transition-all duration-300
                      ${
                        compactHeader ? "min-h-8 text-sm" : "min-h-12 text-base"
                      }`}
                  />
                  <Button
                    onClick={() => generate()}
                    disabled={!idea || loading}
                    variant="primary"
                    size={compactHeader ? "sm" : "md"}
                    className={clsx(
                      "ml-1 rounded-lg",
                      compactHeader ? "h-10 w-10 p-0" : "h-12 w-12 p-0"
                    )}
                    aria-label="Générer le mockup"
                    title="Générer"
                    iconLeft={
                      <Send className={compactHeader ? "size-4" : "size-5"} />
                    }
                  />
                </div>
                <div
                  className={`mt-2 flex items-center justify-between text-[11px] text-[--muted] transition-opacity duration-200 ${
                    compactHeader ? "opacity-0" : "opacity-100"
                  }`}
                >
                  <span>Entrée = envoyer • Shift+Entrée = nouvelle ligne</span>
                  <span>{idea.length}/1000</span>
                </div>
              </div>
            </div>

            {/* Contrôles de vue */}
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="inline-flex overflow-hidden rounded-xl border border-black/10 bg-[--elev]/70 dark:border-white/10">
                <Button
                  variant="ghost"
                  size="sm"
                  className={clsx(
                    "rounded-none",
                    layoutMode === "mobile" &&
                      "bg-black/5 dark:bg-white/10 font-medium"
                  )}
                  onClick={() => setLayoutMode("mobile")}
                >
                  📱 Mobile
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className={clsx(
                    "rounded-none border-l border-black/10 dark:border-white/10",
                    layoutMode === "desktop" &&
                      "bg-black/5 dark:bg-white/10 font-medium"
                  )}
                  onClick={() => setLayoutMode("desktop")}
                >
                  💻 Desktop
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className={clsx(
                    "rounded-none border-l border-black/10 dark:border-white/10",
                    layoutMode === "both" &&
                      "bg-black/5 dark:bg-white/10 font-medium"
                  )}
                  onClick={() => setLayoutMode("both")}
                >
                  ⬛ Les deux
                </Button>
              </div>
            </div>

            {/* Toolbar intégrée — disparaît en mode compact */}
            <div
              className={`transition-all duration-300 ${
                compactHeader
                  ? "opacity-0 h-0 overflow-hidden"
                  : "opacity-100 h-auto"
              }`}
            >
              <Toolbar
                onRefine={(r) => generate(r)}
                onExportJSON={() => {
                  const blob = new Blob(
                    [JSON.stringify({ idea, blocks }, null, 2)],
                    { type: "application/json" }
                  );
                  const url = URL.createObjectURL(blob);
                  const a = document.createElement("a");
                  a.href = url;
                  a.download = "mockup.json";
                  a.click();
                  URL.revokeObjectURL(url);
                }}
                disabled={!hasResults || loading}
              />
            </div>
          </div>
        </header>

        {/* CONTENU : Preview pleine largeur + Inspector slide-in */}
        <main className="flex-1 bg-[--bg] px-6 py-4">
          <div className="mx-auto max-w-[1600px] space-y-6">
            {/* Zone preview */}
            <section className="rounded-2xl bg-[--elev]/70 p-6 shadow-sm transition-all">
              {loading ? (
                <SkeletonResults />
              ) : (
                <div key={animKey} className="slide-in-right">
                  <MockupCanvas
                    blocks={blocks}
                    selectedId={selectedId}
                    onSelect={setSelectedId}
                    onChange={setBlocks}
                    layoutMode={layoutMode}
                  />
                </div>
              )}
            </section>

            {/* Inspector latéral -> sur grand écran, on le place à droite avec motion */}
            <AnimatePresence>
              {selected && (
                <motion.aside
                  key="inspector"
                  initial={{ x: 40, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: 40, opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  className="rounded-2xl border border-black/10 bg-[--elev]/90 p-4 shadow-lg dark:border-white/10"
                >
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
                </motion.aside>
              )}
            </AnimatePresence>
          </div>
        </main>
      </div>
    </div>
  );
}
