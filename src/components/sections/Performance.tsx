import { useI18n } from "@/lib/i18n-context";

// Values in µs — lower is better. Used to compute bar widths relative to slowest.
// Updated for zard 1.2.0 (Dart 3.11 JIT vs Node 24 V8, Stopwatch w/ warmup).
const PERF_DATA = [
  { name: "Zard",   small: 0.36,  complex: 2.93, note: "Native Dart · v1.2", highlight: true  },
  { name: "Zod",    small: 0.37,  complex: 0.89, note: "JS engine",          highlight: false },
  { name: "Yup",    small: 3.82,  complex: 40.6, note: "Reference",          highlight: false },
];

const MAX_SMALL   = Math.max(...PERF_DATA.map(r => r.small));
const MAX_COMPLEX = Math.max(...PERF_DATA.map(r => r.complex));

function Bar({ value, max, highlight }: { value: number; max: number; highlight: boolean }) {
  const pct = Math.round((value / max) * 100);
  return (
    <div className="flex items-center gap-3">
      <div className="h-1.5 w-32 overflow-hidden rounded-full bg-secondary">
        <div
          className={`h-full rounded-full transition-all duration-700 ${highlight ? "bg-primary" : "bg-muted-foreground/40"}`}
          style={{ width: `${pct}%` }}
        />
      </div>
      <span className="font-mono text-xs tabular-nums text-muted-foreground">{value} µs</span>
    </div>
  );
}

export function Performance() {
  const { t } = useI18n();
  return (
    <section className="border-b border-border section-animate">
      <div className="container py-20 lg:py-28">
        <div className="mx-auto max-w-2xl text-center">
          <div className="mb-3 font-mono text-xs uppercase tracking-wider text-muted-foreground">Benchmarks</div>
          <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">{t.perf.title}</h2>
          <p className="mt-3 text-muted-foreground">{t.perf.subtitle}</p>
        </div>

        <div className="mx-auto mt-10 max-w-3xl space-y-3">
          {PERF_DATA.map((row) => (
            <div
              key={row.name}
              className={`rounded-xl border p-5 transition-colors ${
                row.highlight
                  ? "border-primary/30 bg-primary/5"
                  : "border-border bg-card"
              }`}
            >
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div className="flex items-center gap-3">
                  <span className={`text-base font-semibold ${row.highlight ? "text-primary" : "text-foreground"}`}>
                    {row.name}
                  </span>
                  <span className="rounded-full border border-border bg-secondary px-2 py-0.5 font-mono text-[10px] text-muted-foreground">
                    {row.note}
                  </span>
                </div>
              </div>

              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                <div>
                  <p className="mb-1.5 text-xs text-muted-foreground">{t.perf.headers[1]}</p>
                  <Bar value={row.small} max={MAX_SMALL} highlight={row.highlight} />
                </div>
                <div>
                  <p className="mb-1.5 text-xs text-muted-foreground">{t.perf.headers[2]}</p>
                  <Bar value={row.complex} max={MAX_COMPLEX} highlight={row.highlight} />
                </div>
              </div>
            </div>
          ))}
        </div>

        <p className="mx-auto mt-5 max-w-3xl text-center text-sm text-muted-foreground">
          {t.perf.callout}
        </p>
      </div>
    </section>
  );
}
