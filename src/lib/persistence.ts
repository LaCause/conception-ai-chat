import { UIBlock } from "@/types/ui";
import { encodeState } from "./share";
import { ThemeVars } from "@/types/ui";

export const CLEARED_FLAG = "state-cleared";

export async function requestGenerate({
  idea,
  refine,
  prev,
  mode,
}: {
  idea: string;
  refine?: string;
  prev: UIBlock[];
  mode: "append" | "replace";
}): Promise<{ blocks: UIBlock[]; theme?: ThemeVars }> {
  const res = await fetch("/api/generate", {
    method: "POST",
    body: JSON.stringify({ idea, refine, prev, mode }),
  });
  if (!res.ok) throw new Error("/api/generate failed");
  const json = await res.json();
  return { blocks: json.blocks ?? [], theme: json.theme };
}

export function buildShareUrl(href: string, idea: string, blocks: UIBlock[]) {
  const url = new URL(href);
  url.searchParams.set("s", encodeState({ idea, blocks }));
  return url.toString();
}

export function performClearPersistence() {
  try {
    localStorage.removeItem("state");
    sessionStorage.setItem(CLEARED_FLAG, "1");
  } catch {}
  const url = new URL(window.location.href);
  if (url.searchParams.has("s")) {
    url.searchParams.delete("s");
    window.history.replaceState({}, "", url.toString());
  }
}
