"use client";

export default function SkeletonResults() {
  return (
    <div className="pro-surface p-4">
      <div className="mx-auto w-full max-w-[380px]">
        <div className="rounded-[2rem] bg-black/80 p-2 shadow-2xl">
          <div className="rounded-[1.8rem] bg-neutral-900 p-2">
            <div
              className="rounded-[1.4rem] bg-[--bg] ring-1 ring-black/10 dark:ring-white/10 overflow-hidden"
              style={{ aspectRatio: "9/19.5" }}
            >
              <div className="grid gap-3 p-3">
                <div className="skel h-8 w-32" />
                <div className="skel h-10 w-full" />
                <div className="grid grid-cols-2 gap-3">
                  <div className="skel aspect-[4/3]" />
                  <div className="skel aspect-[4/3]" />
                </div>
                <div className="skel h-10 w-1/2" />
                <div className="grid gap-2">
                  <div className="skel h-12 w-full" />
                  <div className="skel h-12 w-full" />
                  <div className="skel h-12 w-3/4" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <p className="mt-3 text-center text-xs text-[--muted]">
          Génération du mockup…
        </p>
      </div>
    </div>
  );
}
