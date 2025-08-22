import type { UIBlock } from "@/types/ui";
import type { ThemeTokens } from "@/types/ui";

type Mode = "append" | "replace";

const match = (s: string, ...terms: string[]) =>
  terms.some((t) => s.includes(t));
const uid = (p: string) => `${p}-${Math.random().toString(36).slice(2, 8)}`;

/** Palette par défaut (violet énergique) */
const DEFAULT_THEME: ThemeTokens = {
  primary: "oklch(62% 0.23 280)",
  gradFrom: "oklch(62% 0.23 280)",
  gradMid: "oklch(58% 0.20 320)",
  gradTo: "oklch(56% 0.19 30)",
};

/** Heuristique: mappe des sujets à des palettes cohérentes */
function pickTheme(text: string): ThemeTokens {
  const s = text.toLowerCase();

  // Finance / fintech: vert confiance
  if (match(s, "finance", "budget", "banque", "invest", "trading", "fintech")) {
    return {
      primary: "oklch(60% 0.14 160)", // vert doux
      gradFrom: "oklch(62% 0.16 160)",
      gradMid: "oklch(58% 0.14 180)",
      gradTo: "oklch(55% 0.12 140)",
    };
  }

  // Santé / bien-être: bleu apaisant
  if (match(s, "santé", "health", "bien-être", "wellness", "médical", "care")) {
    return {
      primary: "oklch(65% 0.12 230)",
      gradFrom: "oklch(68% 0.14 230)",
      gradMid: "oklch(64% 0.12 250)",
      gradTo: "oklch(60% 0.10 210)",
    };
  }

  // Éducation: bleu/violet studieux
  if (
    match(s, "éducation", "cours", "learning", "learn", "school", "formation")
  ) {
    return {
      primary: "oklch(60% 0.20 270)",
      gradFrom: "oklch(62% 0.21 270)",
      gradMid: "oklch(58% 0.19 300)",
      gradTo: "oklch(56% 0.17 240)",
    };
  }

  // Food / recettes: orange chaleureux
  if (match(s, "recette", "food", "cuisine", "restaurant", "meal", "calorie")) {
    return {
      primary: "oklch(70% 0.18 60)",
      gradFrom: "oklch(72% 0.20 50)",
      gradMid: "oklch(68% 0.18 30)",
      gradTo: "oklch(64% 0.16 80)",
    };
  }

  // Voyage: bleu/lagon & sable
  if (match(s, "voyage", "travel", "trip", "vol", "hotel", "itinéraire")) {
    return {
      primary: "oklch(70% 0.14 210)",
      gradFrom: "oklch(72% 0.16 210)",
      gradMid: "oklch(68% 0.13 250)",
      gradTo: "oklch(72% 0.10 85)", // sable doux
    };
  }

  // Fitness / sport: vert/menthe punchy
  if (match(s, "fitness", "workout", "sport", "run", "yoga", "gym")) {
    return {
      primary: "oklch(75% 0.17 150)",
      gradFrom: "oklch(76% 0.18 150)",
      gradMid: "oklch(70% 0.16 175)",
      gradTo: "oklch(68% 0.12 120)",
    };
  }

  // Gaming / entertainment: rose/indigo néon
  if (
    match(s, "gaming", "jeu", "stream", "twitch", "e-sport", "entertainment")
  ) {
    return {
      primary: "oklch(65% 0.24 320)",
      gradFrom: "oklch(68% 0.24 320)",
      gradMid: "oklch(60% 0.20 280)",
      gradTo: "oklch(58% 0.18 340)",
    };
  }

  // Nature / écologie
  if (match(s, "nature", "écologie", "environnement", "plante", "jardin")) {
    return {
      primary: "oklch(70% 0.12 140)",
      gradFrom: "oklch(72% 0.14 140)",
      gradMid: "oklch(66% 0.10 120)",
      gradTo: "oklch(68% 0.11 180)",
    };
  }

  return DEFAULT_THEME;
}

// --- ancien hasSimilar/pushIfNew identiques ---
function hasSimilar(arr: UIBlock[], probe: Partial<UIBlock>) {
  return arr.some(
    (b) =>
      b.type === probe.type &&
      (probe.title
        ? b.title?.toLowerCase() === probe.title.toLowerCase()
        : true)
  );
}
function pushIfNew(arr: UIBlock[], b: UIBlock) {
  if (!hasSimilar(arr, { type: b.type, title: b.title })) arr.push(b);
}

/** Retourne désormais { blocks, theme } */
export function generateBlocks(
  idea: string,
  refine: string,
  prev: UIBlock[] = [],
  mode: Mode = "append"
): { blocks: UIBlock[]; theme: ThemeTokens } {
  const text = (idea + " " + refine).toLowerCase().trim();
  const theme = pickTheme(text);

  let blocks: UIBlock[] =
    mode === "replace"
      ? [{ id: "hdr", type: "HEADER", title: "App Name", cols: 12, order: 0 }]
      : prev.length
      ? prev.map((b) => ({ ...b }))
      : [{ id: "hdr", type: "HEADER", title: "App Name", cols: 12, order: 0 }];

  const add = (type: UIBlock["type"], patch?: Partial<UIBlock>) => {
    const base: UIBlock = {
      id: uid(type.toLowerCase()),
      type,
      cols: 12,
      order: blocks.length + 1,
      ...patch,
    };
    pushIfNew(blocks, base);
  };

  // Intent → suggestions de blocs (ADD-ONLY)
  if (match(text, "accueil", "hero", "landing"))
    add("HERO", { title: "Bienvenue", description: "Pitch court" });
  if (match(text, "recherche", "search", "scanner", "scan"))
    add("SEARCH", { title: "Rechercher / Scanner" });
  if (
    match(
      text,
      "liste",
      "feed",
      "fil",
      "articles",
      "recettes",
      "workouts",
      "tasks"
    )
  )
    add("LIST", { title: "Liste" });
  if (match(text, "carte", "grid", "cards"))
    add("CARD_GRID", { title: "Cartes", data: { cols: 2 } });
  if (
    match(
      text,
      "form",
      "formulaire",
      "inscription",
      "profil",
      "ajouter",
      "nouveau"
    )
  )
    add("FORM", { title: "Formulaire" });
  if (match(text, "détail", "detail", "fiche", "profil détaillé"))
    add("DETAIL", { title: "Détail" });

  if (!blocks.some((b) => b.type === "CTA_BAR"))
    add("CTA_BAR", { title: "Action principale", order: 99 });

  // Refine add-only
  if (match(text, "feed", "articles"))
    add("LIST", { title: "Feed d’articles" });
  if (match(text, "emphase", "cartes", "grid"))
    add("CARD_GRID", { title: "Cartes (emphase)", cols: 12 });
  if (match(text, "auth", "login", "signup", "s'inscrire"))
    add("FORM", { title: "Inscription / Connexion" });

  // Normalise l’ordre mais conserve l’append
  blocks = blocks.map((b, i) => ({ ...b, order: i }));

  return { blocks, theme };
}
