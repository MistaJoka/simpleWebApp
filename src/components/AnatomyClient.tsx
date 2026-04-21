"use client";
// client boundary: this file ships JS to browser; can use hooks/events
// proves "frontend calls backend" via fetch to Route Handler

import { useCallback, useMemo, useState } from "react";
// reuse shared type for state
import type { WebAppPiece } from "@/types/web-app";

// props: optional initial data from server for SSR merge
type Props = { initialPieces: WebAppPiece[] };

// export fn component: interactive panel
export function AnatomyClient({ initialPieces }: Props) {
  // state: pieces list (may refresh from API)
  const [pieces, setPieces] = useState<WebAppPiece[]>(initialPieces);
  // state: loading flag during fetch
  const [loading, setLoading] = useState(false);
  // state: last error string
  const [err, setErr] = useState<string | null>(null);

  // memo: count by side for badges
  const counts = useMemo(() => {
    // reduce tallies fe/be/both
    return pieces.reduce(
      (acc, p) => {
        // inc fe
        if (p.side === "fe" || p.side === "both") acc.fe += 1;
        // inc be
        if (p.side === "be" || p.side === "both") acc.be += 1;
        // return acc
        return acc;
      },
      { fe: 0, be: 0 },
    );
  }, [pieces]);

  // callback: refetch JSON from same-origin API
  const refresh = useCallback(async () => {
    // set loading true
    setLoading(true);
    // clear err
    setErr(null);
    try {
      // fetch GET /api/pieces
      const res = await fetch("/api/pieces", { cache: "no-store" });
      // parse JSON
      const data = (await res.json()) as { pieces?: WebAppPiece[] };
      // guard shape
      if (!data.pieces) throw new Error("bad json shape");
      // set state
      setPieces(data.pieces);
    } catch (e) {
      // stringify err
      setErr(e instanceof Error ? e.message : "fetch failed");
    } finally {
      // stop spinner
      setLoading(false);
    }
  }, []);

  // return JSX: panel + button + list
  return (
    <section className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
      {/* h2 title */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          {/* heading */}
          <h2 className="text-lg font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
            Live API: pieces catalog
          </h2>
          {/* sub */}
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            Browser fetch → Route Handler → JSON. Counts: FE-touch {counts.fe}, BE-touch {counts.be}.
          </p>
        </div>
        {/* button */}
        <button
          type="button"
          onClick={() => void refresh()}
          disabled={loading}
          className="inline-flex h-10 items-center justify-center rounded-xl bg-zinc-900 px-4 text-sm font-medium text-white transition hover:bg-zinc-800 disabled:opacity-60 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-white"
        >
          {/* label */}
          {loading ? "Loading…" : "Refetch /api/pieces"}
        </button>
      </div>
      {/* err box */}
      {err ? (
        <p className="mt-4 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-800 dark:border-red-900 dark:bg-red-950 dark:text-red-200">
          {err}
        </p>
      ) : null}
      {/* ul list */}
      <ul className="mt-5 space-y-3">
        {/* map pieces */}
        {pieces.map((p) => (
          <li
            key={p.id}
            className="rounded-xl border border-zinc-200 bg-zinc-50 p-4 dark:border-zinc-800 dark:bg-zinc-900/40"
          >
            {/* row title + badge */}
            <div className="flex flex-wrap items-center gap-2">
              <p className="font-medium text-zinc-900 dark:text-zinc-50">{p.title}</p>
              <span className="rounded-full bg-zinc-200 px-2 py-0.5 text-xs font-medium text-zinc-800 dark:bg-zinc-800 dark:text-zinc-200">
                {p.side}
              </span>
            </div>
            {/* role */}
            <p className="mt-2 text-sm text-zinc-700 dark:text-zinc-300">{p.role}</p>
            {/* files */}
            <p className="mt-2 font-mono text-xs text-zinc-600 dark:text-zinc-400">
              {p.files.join(" · ")}
            </p>
            {/* note */}
            <p className="mt-2 text-xs text-zinc-500 dark:text-zinc-500">{p.note}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
