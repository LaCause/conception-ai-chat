export function encodeState(obj: unknown) {
  const s = JSON.stringify(obj);
  return typeof window === "undefined"
    ? ""
    : btoa(unescape(encodeURIComponent(s)));
}
export function decodeState(s: string): any | null {
  try {
    const json = decodeURIComponent(escape(atob(s)));
    return JSON.parse(json);
  } catch {
    return null;
  }
}
