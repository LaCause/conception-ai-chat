"use client";
import { useRef } from "react";
import { Send } from "lucide-react";
import Button from "@/design-system/Button/Button";

export default function Composer({
  value,
  onChange,
  onSubmit,
  compact,
}: {
  value: string;
  onChange: (v: string) => void;
  onSubmit: () => void;
  compact: boolean;
}) {
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  const autoResize = () => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = "0px";
    el.style.height = Math.min(el.scrollHeight, 220) + "px";
  };

  return (
    <section className="px-4 sm:px-6">
      <div className="relative gradient-border bg-[--elev]/60">
        <div className="rounded-xl p-3">
          <div className="grid grid-cols-1 items-end gap-2 sm:grid-cols-[1fr_auto]">
            <div className="flex gap-2">
              <span className="hidden text-xs opacity-60 sm:inline">⌘K</span>
              <textarea
                ref={textareaRef}
                value={value}
                onChange={(e) => {
                  onChange(e.target.value.slice(0, 1000));
                  autoResize();
                }}
                onInput={autoResize}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    if (value.trim()) onSubmit();
                  }
                }}
                placeholder="Décrivez votre idée…"
                aria-label="Décrivez votre idée d’application"
                rows={1}
                maxLength={1000}
                className="min-h-12 w-full resize-none bg-transparent text-base outline-none placeholder:text-[--muted] sm:min-h-10 sm:text-sm"
              />
            </div>
            <Button
              onClick={onSubmit}
              disabled={!value}
              variant="primary"
              size={compact ? "sm" : "md"}
              className="w-full sm:w-auto"
              aria-label="Générer le mockup"
              iconLeft={<Send className="size-4" />}
            >
              <span className="sm:hidden">Générer</span>
            </Button>
          </div>
          <div
            className={`mt-2 flex flex-wrap items-center justify-between gap-2 text-[11px] text-[--muted] ${
              compact ? "hidden sm:flex" : "flex"
            }`}
          >
            <span>Entrée = envoyer • Shift+Entrée = nouvelle ligne</span>
            <span className="ml-auto">{value.length}/1000</span>
          </div>
        </div>
      </div>
    </section>
  );
}
