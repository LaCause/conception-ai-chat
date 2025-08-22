export function colSpanClass(cols?: number) {
  const map: Record<number, string> = {
    12: "md:col-span-12",
    9: "md:col-span-9",
    8: "md:col-span-8",
    6: "md:col-span-6",
    4: "md:col-span-4",
    3: "md:col-span-3",
    2: "md:col-span-2",
  };
  return map[cols ?? 12] ?? "md:col-span-12";
}
