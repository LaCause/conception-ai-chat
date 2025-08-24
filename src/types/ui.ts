export interface Blocks {
  blocks: UIBlock[];
  idea: string;
}

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

  cols?: number;
  order?: number;
  data?: Record<string, unknown>;
}

export interface ThemeTokens {
  primary: string;
  gradFrom: string;
  gradMid: string;
  gradTo: string;
}

export interface GeneratePayload {
  blocks: UIBlock[];
  theme?: ThemeTokens;
}

export type ThemeVars = {
  primary: string;
  gradFrom: string;
  gradMid: string;
  gradTo: string;
};
