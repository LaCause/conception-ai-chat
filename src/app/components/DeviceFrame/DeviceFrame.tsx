"use client";

export default function DeviceFrame({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="mx-auto w-full max-w-[380px]">
      <div className="relative rounded-[2.2rem] bg-black/80 p-2 shadow-2xl">
        <div className="absolute left-1/2 top-2 z-10 h-5 w-28 -translate-x-1/2 rounded-b-2xl bg-black/90" />
        <div className="rounded-[1.9rem] bg-neutral-900 p-2">
          <div
            data-mockup-root
            className="rounded-[1.5rem] bg-[--bg] ring-1 ring-black/20 dark:ring-white/10 overflow-hidden"
            style={{ aspectRatio: "9/19.5" }}
          >
            {children}
          </div>
        </div>
      </div>
      <p className="mt-3 text-center text-xs text-[--muted]">Aperçu mobile</p>
    </div>
  );
}
