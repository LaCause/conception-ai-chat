"use client";

import clsx from "clsx";
import React from "react";

export interface DesktopFrameProps {
  children: React.ReactNode;
  className?: string;
  chromeTitle?: string;
}

export default function DesktopFrame({
  children,
  className,
  chromeTitle = "app.local",
}: DesktopFrameProps) {
  return (
    <div
      className={clsx(
        "w-full max-w-[1200px] rounded-2xl border border-black/10 bg-[--elev] shadow-md dark:border-white/10",
        "overflow-hidden",
        className
      )}
    >
      {/* Barre navigateur / OS */}
      <div className="flex items-center gap-3 border-b border-black/10 bg-white/70 px-4 py-2 dark:border-white/10 dark:bg-white/5">
        <div className="flex items-center gap-1.5">
          <span className="inline-block size-3 rounded-full bg-red-400" />
          <span className="inline-block size-3 rounded-full bg-yellow-400" />
          <span className="inline-block size-3 rounded-full bg-green-400" />
        </div>
        <div className="mx-3 h-6 flex-1 rounded-md border border-black/10 bg-white/80 px-3 text-xs text-black/70 dark:border-white/10 dark:bg-white/10 dark:text-white/80">
          <div className="flex h-full items-center">{chromeTitle}</div>
        </div>
        <div className="hidden items-center gap-2 sm:flex">
          <div className="h-6 w-16 rounded-md bg-black/5 dark:bg-white/10" />
          <div className="h-6 w-6 rounded-md bg-black/5 dark:bg-white/10" />
        </div>
      </div>

      {/* Zone de rendu de la “page” */}
      <div className="min-h-[640px] bg-white p-4 dark:bg-[color:var(--bg,#0b0b0b)] sm:p-6">
        {/* Contenu app (ton grid) */}
        {children}
      </div>
    </div>
  );
}
