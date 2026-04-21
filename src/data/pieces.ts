// static catalog: critical layers modern web app stack
// free stack: Next+TS+Tailwind+Node runtime (no paid svc req local)

import type { WebAppPiece } from "@/types/web-app";

// export const: build-time list API can reuse
export const WEB_APP_PIECES: WebAppPiece[] = [
  {
    id: "entry",
    title: "Package + scripts",
    side: "both",
    role: "Decl deps, npm scripts (dev/build/start), lock reproducible installs.",
    files: ["package.json", "package-lock.json"],
    note: "npm i = free. Lockfile pins versions → same machine-ish builds.",
  },
  {
    id: "ts",
    title: "TypeScript config",
    side: "both",
    role: "Tells compiler target, JSX mode, path aliases (@/*), strict types.",
    files: ["tsconfig.json", "next-env.d.ts"],
    note: "Strict TS catches bugs early; paths shorten imports.",
  },
  {
    id: "nextcfg",
    title: "Next.js config",
    side: "both",
    role: "Framework knobs: images, redirects, env exposure, expt flags.",
    files: ["next.config.ts"],
    note: "One place infra-ish rules live beside code.",
  },
  {
    id: "lint",
    title: "Lint rules",
    side: "both",
    role: "ESLint catches footguns (a11y, hooks, imports) before prod.",
    files: ["eslint.config.mjs"],
    note: "Teams gate CI on lint; keeps style consistent.",
  },
  {
    id: "css",
    title: "Global styles + Tailwind",
    side: "fe",
    role: "Design tokens, base body styles, Tailwind @import pipeline.",
    files: ["src/app/globals.css", "postcss.config.mjs"],
    note: "Tailwind = utility CSS; PostCSS wires Tailwind v4 plugin.",
  },
  {
    id: "layout",
    title: "Root layout (RSC)",
    side: "both",
    role: "HTML shell, fonts, metadata; wraps all routes.",
    files: ["src/app/layout.tsx"],
    note: "Server Component default: SEO + shared chrome without client JS bloat.",
  },
  {
    id: "page",
    title: "Route page UI",
    side: "fe",
    role: "URL maps to file; default Server Component can stream HTML.",
    files: ["src/app/page.tsx"],
    note: "App Router = file-based routing; colocate UI per URL.",
  },
  {
    id: "public",
    title: "Static public assets",
    side: "fe",
    role: "Files served as-is at / (favicon, robots, icons).",
    files: ["public/"],
    note: "CDN-friendly; no bundle for raw static files.",
  },
  {
    id: "api",
    title: "Route Handlers (HTTP API)",
    side: "be",
    role: "REST/JSON endpoints run on server; hide secrets from browser.",
    files: ["src/app/api/**/route.ts"],
    note: "Same deploy as UI; no separate server mandatory for small apps.",
  },
  {
    id: "mw",
    title: "Middleware",
    side: "be",
    role: "Edge/Node intercept req early: auth, headers, redirects, A/B.",
    files: ["middleware.ts"],
    note: "Runs before route; good for cookie session checks.",
  },
  {
    id: "env",
    title: "Environment variables",
    side: "be",
    role: "Secrets + per-env config; NEXT_PUBLIC_* exposed to browser.",
    files: [".env.local", ".env.example"],
    note: "Never commit real secrets; .example documents keys only.",
  },
];
