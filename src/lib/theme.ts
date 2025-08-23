import { ThemeVars } from "@/types/ui";

export type LayoutMode = "mobile" | "desktop" | "both";

export function applyThemeVars(theme?: ThemeVars) {
  if (!theme) return;
  const r = document.documentElement;
  r.style.setProperty("--primary", theme.primary);
  r.style.setProperty("--grad-from", theme.gradFrom);
  r.style.setProperty("--grad-mid", theme.gradMid);
  r.style.setProperty("--grad-to", theme.gradTo);
}

export function saveThemeVars(theme?: ThemeVars) {
  if (!theme) return;
  try {
    localStorage.setItem("themeVars", JSON.stringify(theme));
  } catch {}
}

export function loadThemeVars(): ThemeVars | null {
  try {
    const raw = localStorage.getItem("themeVars");
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function computeThemeFromIdea(txt: string): ThemeVars | null {
  const t = txt.toLowerCase();

  if (/\b(fintech|banque|budget|finance|crypto|bours|trading)\b/.test(t)) {
    return {
      primary: "oklch(60% 0.14 160)",
      gradFrom: "oklch(62% 0.16 160)",
      gradMid: "oklch(58% 0.14 180)",
      gradTo: "oklch(55% 0.12 140)",
    };
  }

  if (/\b(santé|medical|médecin|health|clinic|soin)\b/.test(t)) {
    return {
      primary: "oklch(62% 0.12 240)",
      gradFrom: "oklch(64% 0.13 235)",
      gradMid: "oklch(58% 0.11 250)",
      gradTo: "oklch(55% 0.10 230)",
    };
  }

  if (/\b(recette|cuisine|food|restaurant|menu|cook)\b/.test(t)) {
    return {
      primary: "oklch(70% 0.15 70)",
      gradFrom: "oklch(72% 0.16 60)",
      gradMid: "oklch(66% 0.14 80)",
      gradTo: "oklch(60% 0.12 50)",
    };
  }

  if (/\b(éducation|cours|lesson|learn|school|formation)\b/.test(t)) {
    return {
      primary: "oklch(60% 0.15 300)",
      gradFrom: "oklch(62% 0.16 295)",
      gradMid: "oklch(58% 0.14 310)",
      gradTo: "oklch(55% 0.13 285)",
    };
  }
  return null;
}
