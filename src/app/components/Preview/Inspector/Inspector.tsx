"use client";
import type { UIBlock, BlockType } from "@/types/ui";

const COLS = [12, 9, 8, 6, 4, 3, 2];
const TYPES: BlockType[] = [
  "HEADER",
  "HERO",
  "SEARCH",
  "LIST",
  "CARD_GRID",
  "FORM",
  "DETAIL",
  "CTA_BAR",
];

export default function Inspector({
  selected,
  onChange,
  onDelete,
}: {
  selected?: UIBlock | null;
  onChange: (patch: Partial<UIBlock>) => void;
  onDelete: () => void;
}) {
  if (!selected)
    return (
      <aside className="rounded-2xl border border-black/10 p-4 text-sm text-[--color-muted]">
        Sélectionne un bloc pour l’éditer.
      </aside>
    );

  return (
    <aside className="grid gap-3 rounded-2xl border border-black/10 p-4">
      <div className="text-sm font-medium">Inspector</div>
      <label className="text-xs">Type</label>
      <select
        value={selected.type}
        onChange={(e) => onChange({ type: e.target.value as BlockType })}
        className="rounded-lg border border-black/10 bg-transparent px-2 py-1 outline-none focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[--primary]"
      >
        {TYPES.map((t) => (
          <option key={t} value={t}>
            {t}
          </option>
        ))}
      </select>

      <label className="text-xs">Titre</label>
      <input
        value={selected.title ?? ""}
        onChange={(e) => onChange({ title: e.target.value })}
        className="rounded-lg border border-black/10 bg-transparent px-2 py-1 outline-none focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[--primary]"
      />

      <label className="text-xs">Description</label>
      <textarea
        value={selected.description ?? ""}
        onChange={(e) => onChange({ description: e.target.value })}
        className="min-h-20 rounded-lg border border-black/10 bg-transparent px-2 py-1 outline-none focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[--primary]"
      />

      <label className="text-xs">Colonnes (desktop)</label>
      <div className="flex flex-wrap gap-2">
        {COLS.map((c) => (
          <button
            key={c}
            onClick={() => onChange({ cols: c })}
            className={`rounded-md border border-black/10 px-2 py-1 text-xs ${
              selected.cols === c
                ? "bg-[--primary] text-[--primary-contrast]"
                : ""
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      <button
        onClick={onDelete}
        className="mt-2 rounded-lg border border-black/10 px-3 py-2 text-sm"
      >
        Supprimer le bloc
      </button>
    </aside>
  );
}
