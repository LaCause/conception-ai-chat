import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const visited = req.cookies.get("visited")?.value;
  const url = req.nextUrl.clone();

  if (
    url.pathname.startsWith("/onboarding") ||
    url.pathname.startsWith("/api") ||
    url.pathname.startsWith("/_next") ||
    url.pathname === "/favicon.ico"
  )
    return NextResponse.next();

  if (visited === "true") return NextResponse.next();

  url.pathname = "/onboarding";
  return NextResponse.redirect(url);
}

export const config = { matcher: "/:path*" };
