"use client";

export interface ToolbarProps {
  onRefine: (r: string) => void;
  onExportJSON: () => void;
  disabled?: boolean;
}
export default function Toolbar({
  onRefine,
  onExportJSON,
  disabled,
}: ToolbarProps) {
  return (
    <div className="soft-card flex flex-wrap items-center gap-2 p-3">
      <div className="inline-flex overflow-hidden rounded-xl border border-black/10 dark:border-white/10">
        <button
          disabled={disabled}
          onClick={() => onRefine("ajouter un formulaire d’inscription")}
          className="px-3 py-2 text-sm hover:bg-black/[0.04] disabled:opacity-50 dark:hover:bg-white/10"
        >
          + Formulaire
        </button>
        <button
          disabled={disabled}
          onClick={() => onRefine("mettre l’accent sur les cartes (grid)")}
          className="px-3 py-2 text-sm hover:bg-black/[0.04] disabled:opacity-50 dark:hover:bg:white/10"
        >
          Emphase cartes
        </button>
        <button
          disabled={disabled}
          onClick={() => onRefine("ajouter un feed d’articles")}
          className="px-3 py-2 text-sm hover:bg-black/[0.04] disabled:opacity-50 dark:hover:bg:white/10"
        >
          + Feed
        </button>
      </div>

      <div className="ml-auto flex gap-2">
        <button onClick={onExportJSON} className="btn-ghost">
          Exporter JSON
        </button>
      </div>
    </div>
  );
}
