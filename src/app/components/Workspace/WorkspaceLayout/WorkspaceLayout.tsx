"use client";
import clsx from "clsx";

export default function WorkspaceLayout({
  inspector,
  children,
  showInspector,
}: {
  inspector: React.ReactNode;
  children: React.ReactNode;
  showInspector: boolean;
}) {
  return (
    <main className="flex-1 px-4 py-4 sm:px-6">
      <div
        className={clsx(
          "mx-auto grid max-w-[1600px] gap-4",
          showInspector && "lg:grid-cols-[1fr_340px]"
        )}
      >
        <section className="order-1 rounded-xl bg-[--elev]/70 p-4 shadow-sm sm:p-6 lg:order-none">
          {children}
        </section>
        {showInspector && (
          <aside className="order-2 rounded-xl border border-black/10 bg-[--elev]/90 p-4 shadow-lg dark:border-white/10 lg:order-none">
            {inspector}
          </aside>
        )}
      </div>
    </main>
  );
}
