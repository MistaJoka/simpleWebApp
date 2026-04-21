// health probe: load balancers / uptime bots call GET /api/health
// tiny JSON proves process up + build id optional

import { NextResponse } from "next/server";

// export GET: always 200 if deploy alive
export function GET() {
  // body minimal: status + ts
  return NextResponse.json({ status: "ok", ts: Date.now() });
}
