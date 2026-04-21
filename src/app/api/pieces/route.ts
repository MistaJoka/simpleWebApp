// Route Handler: GET /api/pieces → JSON list (server-only logic ok here)
// demonstrates backend-visible surface without extra server process

import { NextResponse } from "next/server";
// pull static catalog
import { WEB_APP_PIECES } from "@/data/pieces";

// export GET: HTTP verb fn Next maps to route
export async function GET() {
  // return JSON + cache hint for demo (short s-maxage ok for static list)
  return NextResponse.json(
    { ok: true, pieces: WEB_APP_PIECES, generatedAt: new Date().toISOString() },
    { headers: { "cache-control": "s-maxage=60, stale-while-revalidate=300" } },
  );
}
