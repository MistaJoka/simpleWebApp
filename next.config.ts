// Next config: framework-level switches (images, redirects, env)
// typed import for autocomplete

import type { NextConfig } from "next";

// const config object exported default
const nextConfig: NextConfig = {
  // strict mode React dev double-invoke helpers (default on App Router)
  reactStrictMode: true,
  // pin turbopack root → cwd when run npm from app dir (silence parent lockfile warn)
  turbopack: {
    // process cwd = repo root in dev/build
    root: process.cwd(),
  },
};

// export default for next to read
export default nextConfig;
