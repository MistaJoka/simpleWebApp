// Home route: Server Component (default) — teaches FE vs BE split
// imports client child only where interactivity needed (fetch button)

import { AnatomyClient } from "@/components/AnatomyClient";
// static data for SSR initial HTML (no loading flash)
import { WEB_APP_PIECES } from "@/data/pieces";

// export default page component for /
export default function HomePage() {
  // return main layout: hero + grid + client island
  return (
    <div className="flex flex-1 flex-col">
      {/* header strip */}
      <header className="border-b border-zinc-200 bg-white/80 backdrop-blur dark:border-zinc-800 dark:bg-zinc-950/80">
        <div className="mx-auto flex max-w-5xl flex-col gap-2 px-6 py-8">
          {/* title */}
          <p className="text-xs font-semibold uppercase tracking-widest text-zinc-500">Free-stack anatomy</p>
          {/* h1 */}
          <h1 className="text-3xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
            Map of a modern web app (frontend + backend surfaces)
          </h1>
          {/* lead */}
          <p className="max-w-3xl text-base leading-relaxed text-zinc-600 dark:text-zinc-400">
            Same repo can ship UI, HTTP APIs, edge middleware, static assets. Below: what browser folks care about vs what
            server folks care about. Money cost: $0 for local dev; deploy targets often have free tiers—still optional.
          </p>
        </div>
      </header>
      {/* body */}
      <main className="mx-auto flex w-full max-w-5xl flex-col gap-10 px-6 py-10">
        {/* two-column explainer */}
        <section className="grid gap-6 lg:grid-cols-2">
          {/* fe card */}
          <div className="rounded-2xl border border-blue-200 bg-blue-50 p-6 dark:border-blue-900/60 dark:bg-blue-950/30">
            <h2 className="text-lg font-semibold text-blue-950 dark:text-blue-100">Frontend lens</h2>
            <ul className="mt-4 space-y-3 text-sm leading-relaxed text-blue-900/90 dark:text-blue-100/90">
              <li>• HTML/CSS/JS bundles, fonts, images optimized for display.</li>
              <li>• Hydration: React attaches event handlers after HTML paint.</li>
              <li>• Public folder files load without going through your UI code.</li>
              <li>• Only `NEXT_PUBLIC_*` env vars are visible here—treat as public.</li>
            </ul>
          </div>
          {/* be card */}
          <div className="rounded-2xl border border-amber-200 bg-amber-50 p-6 dark:border-amber-900/60 dark:bg-amber-950/30">
            <h2 className="text-lg font-semibold text-amber-950 dark:text-amber-100">Backend lens</h2>
            <ul className="mt-4 space-y-3 text-sm leading-relaxed text-amber-900/90 dark:text-amber-100/90">
              <li>• Route Handlers = your HTTP API (JSON, auth checks, DB calls).</li>
              <li>• Middleware runs first: sessions, redirects, security headers.</li>
              <li>• Server Components & SSR run on Node (or edge) before HTML ships.</li>
              <li>• Secrets stay in server-only env vars—never prefix with NEXT_PUBLIC_.</li>
            </ul>
          </div>
        </section>
        {/* flow ascii */}
        <section className="rounded-2xl border border-zinc-200 bg-zinc-50 p-6 font-mono text-xs leading-relaxed text-zinc-800 dark:border-zinc-800 dark:bg-zinc-900/40 dark:text-zinc-200">
          <h2 className="mb-3 font-sans text-base font-semibold text-zinc-900 dark:text-zinc-50">Request flow (simplified)</h2>
          <pre className="whitespace-pre-wrap">
            {`browser
  → DNS/TLS (host)
  → CDN (maybe)
  → middleware.ts        // early rules, headers
  → route handler / page   // API JSON or HTML render
  → response + caches`}
          </pre>
        </section>
        {/* file checklist */}
        <section className="rounded-2xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-950">
          <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">Minimum file map (this repo)</h2>
          <ul className="mt-4 grid gap-3 font-mono text-xs text-zinc-700 dark:text-zinc-300 sm:grid-cols-2">
            <li>package.json — deps + scripts</li>
            <li>tsconfig.json — TS compiler + paths</li>
            <li>next.config.ts — Next knobs</li>
            <li>eslint.config.mjs — lint policy</li>
            <li>postcss.config.mjs — Tailwind pipeline</li>
            <li>src/app/layout.tsx — HTML shell + metadata</li>
            <li>src/app/page.tsx — `/` UI (this file)</li>
            <li>src/app/globals.css — global styles</li>
            <li>src/app/api/**/route.ts — HTTP endpoints</li>
            <li>middleware.ts — request gate</li>
            <li>public/** — static assets</li>
            <li>.env.example — documented env keys</li>
          </ul>
        </section>
        {/* client island */}
        <AnatomyClient initialPieces={WEB_APP_PIECES} />
      </main>
      {/* footer */}
      <footer className="mt-auto border-t border-zinc-200 py-8 text-center text-xs text-zinc-500 dark:border-zinc-800">
        Health check: <span className="font-mono">GET /api/health</span> · Pieces JSON:{" "}
        <span className="font-mono">GET /api/pieces</span>
      </footer>
    </div>
  );
}
