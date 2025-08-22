import { NextResponse } from "next/server";
import type { UIBlock, GeneratePayload } from "@/types/ui";
import { generateBlocks } from "@/lib/generates";

export async function POST(req: Request) {
  const { idea, refine, prev, mode } = await req.json();
  const prevBlocks: UIBlock[] = Array.isArray(prev) ? prev : [];
  const { blocks, theme } = generateBlocks(
    String(idea ?? ""),
    String(refine ?? ""),
    prevBlocks,
    mode ?? "append"
  );
  const payload: GeneratePayload = { blocks, theme };
  return NextResponse.json(payload);
}
