export type BlockType =
  | "HEADER"
  | "HERO"
  | "SEARCH"
  | "LIST"
  | "CARD_GRID"
  | "FORM"
  | "DETAIL"
  | "CTA_BAR";

export interface UIBlock {
  id: string;
  type: BlockType;
  title?: string;
  description?: string;
  hint?: string;
  // layout suggéré (peut être ignoré sur mobile)
  cols?: number; // 1-12
  order?: number; // tri d’affichage
  data?: Record<string, unknown>;
}

// --- ajoute en bas du fichier ---

export interface ThemeTokens {
  primary: string; // ex: oklch(...)
  gradFrom: string;
  gradMid: string;
  gradTo: string;
}

export interface GeneratePayload {
  blocks: UIBlock[];
  theme?: ThemeTokens;
}
