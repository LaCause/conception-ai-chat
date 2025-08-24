"use client";
import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";

export default function ThemeToggle() {
  const [dark, setDark] = useState(false);
  useEffect(() => {
    const root = document.documentElement;
    const saved = localStorage.getItem("theme");
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
      className="inline-flex items-center gap-2 rounded-xl border border-black/10 bg-[--elev]/80 px-3 py-2 text-sm dark:border-white/10"
      aria-pressed={dark}
      title={dark ? "Passer en clair" : "Passer en sombre"}
    >
      <span className="relative inline-flex size-5 items-center justify-center">
        <Sun
          className={`size-5 transition-transform ${
            dark ? "rotate-90 scale-0" : ""
          }`}
        />
        <Moon
          className={`absolute size-5 transition-transform ${
            dark ? "" : "-rotate-90 scale-0"
          }`}
        />
      </span>
      {dark ? "Sombre" : "Clair"}
    </button>
  );
}
