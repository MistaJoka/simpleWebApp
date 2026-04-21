// Edge middleware: runs before route handlers (fast path)
// demo: stamp header so learners see req touched early

import { NextResponse } from "next/server";
// NextRequest type for cookies/path
import type { NextRequest } from "next/server";

// export middleware fn: req in → response out
export function middleware(request: NextRequest) {
  // clone passthrough response
  const res = NextResponse.next();
  // stamp header visible in browser devtools Network
  res.headers.set("x-anatomy-mw", "1");
  // optional echo path for debug (no PII)
  res.headers.set("x-pathname", request.nextUrl.pathname);
  // return mutated response
  return res;
}

// export config: limit which paths run mw (skip static)
export const config = {
  // matcher regex: all except _next static + image opt + favicon
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\..*).*)"],
};
