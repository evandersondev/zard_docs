import { useEffect, useMemo, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Search, X, ChevronRight, ChevronDown, Lightbulb, AlertTriangle, CheckCircle2, Info, ArrowUp } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { CodeBlock } from "@/components/CodeBlock";
import { getDocSections, type DocSection, type Block } from "@/lib/docs-content";
import { useI18n } from "@/lib/i18n-context";
import { cn } from "@/lib/utils";

const GROUP_ORDER: DocSection["group"][] = ["start", "core", "validation", "advanced", "reference"];

function groupSections(sections: DocSection[]) {
  const groups: Record<DocSection["group"], DocSection[]> = {
    start: [], core: [], validation: [], advanced: [], reference: [],
  };
  sections.forEach(s => groups[s.group].push(s));
  return groups;
}

function highlight(text: string, query: string) {
  if (!query.trim()) return <>{text}</>;
  const idx = text.toLowerCase().indexOf(query.toLowerCase());
  if (idx === -1) return <>{text}</>;
  return (
    <>
      {text.slice(0, idx)}
      <mark className="rounded bg-primary/20 px-0.5 text-foreground">{text.slice(idx, idx + query.length)}</mark>
      {text.slice(idx + query.length)}
    </>
  );
}

function BlockRenderer({ block }: { block: Block }) {
  const { t } = useI18n();
  switch (block.kind) {
    case "p":
      return <p className="text-[15px] leading-[1.75] text-foreground/85">{block.text}</p>;
    case "h3":
      return (
        <h3 id={block.id} className="mt-10 scroll-mt-24 text-lg font-semibold tracking-tight">
          {block.text}
        </h3>
      );
    case "code":
      return <CodeBlock code={block.code} language={block.lang} filename={block.filename} className="my-4" />;
    case "ul":
      return (
        <ul className="my-4 space-y-2 pl-1">
          {block.items.map((it, i) => (
            <li key={i} className="flex gap-2.5 text-[15px] leading-[1.75] text-foreground/85">
              <span className="mt-2.5 h-1 w-1 shrink-0 rounded-full bg-muted-foreground" />
              <span>{it}</span>
            </li>
          ))}
        </ul>
      );
    case "table":
      return (
        <div className="my-4 overflow-hidden rounded-lg border border-border">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-secondary/60">
                {block.headers.map((h, i) => (
                  <th key={i} className="px-4 py-2.5 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {block.rows.map((row, i) => (
                <tr key={i} className="border-b border-border last:border-0">
                  {row.map((c, j) => <td key={j} className="px-4 py-2.5 text-foreground/85">{c}</td>)}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    case "note":
      return (
        <div className="my-5 flex gap-3 rounded-md border border-border bg-secondary/50 px-4 py-3 text-sm text-foreground/85">
          <Info className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" />
          <div className="leading-relaxed">{block.text}</div>
        </div>
      );
    case "callout": {
      const styles = {
        tip:     { icon: Lightbulb,      border: "border-l-primary",      bg: "bg-accent/40",               iconCls: "text-primary",      label: t.callouts.tip },
        warning: { icon: AlertTriangle,  border: "border-l-amber-500",    bg: "bg-amber-500/5",             iconCls: "text-amber-500",    label: t.callouts.warning },
        success: { icon: CheckCircle2,   border: "border-l-emerald-500",  bg: "bg-emerald-500/5",           iconCls: "text-emerald-500",  label: t.callouts.bestPractice },
      }[block.variant];
      const Icon = styles.icon;
      return (
        <div className={cn("my-5 flex gap-3 rounded-md border border-border border-l-2 px-4 py-3 text-sm", styles.border, styles.bg)}>
          <Icon className={cn("mt-0.5 h-4 w-4 shrink-0", styles.iconCls)} />
          <div className="leading-relaxed text-foreground/90"><span className="font-semibold">{styles.label}. </span>{block.text}</div>
        </div>
      );
    }
  }
}

// ─── Search Modal ────────────────────────────────────────────────────────────

interface SearchModalProps {
  open: boolean;
  query: string;
  onQueryChange: (q: string) => void;
  onClose: () => void;
  onSelect: (id: string) => void;
  sections: DocSection[];
}

function SearchModal({ open, query, onQueryChange, onClose, onSelect, sections }: SearchModalProps) {
  const { t } = useI18n();
  const inputRef = useRef<HTMLInputElement>(null);

  // Autofocus when modal opens
  useEffect(() => {
    if (open) {
      // Small delay to ensure the element is painted before focusing
      const id = setTimeout(() => inputRef.current?.focus(), 10);
      return () => clearTimeout(id);
    }
  }, [open]);

  // Escape to close
  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open, onClose]);

  const filtered = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();
    return sections.filter(s => {
      if (s.title.toLowerCase().includes(q)) return true;
      return s.blocks.some(b => {
        if (b.kind === "p" || b.kind === "note" || b.kind === "h3" || b.kind === "callout") return b.text.toLowerCase().includes(q);
        if (b.kind === "code") return b.code.toLowerCase().includes(q);
        if (b.kind === "ul") return b.items.some(i => i.toLowerCase().includes(q));
        return false;
      });
    });
  }, [query, sections]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center pt-[18vh] bg-background/60 backdrop-blur-sm"
      onMouseDown={() => onClose()}
    >
      <div
        className="w-full max-w-xl mx-4 overflow-hidden rounded-xl border border-border bg-background shadow-2xl"
        onMouseDown={(e) => e.stopPropagation()}
      >
        {/* Input row */}
        <div className="flex items-center gap-3 border-b border-border px-4 py-3">
          <Search className="h-4 w-4 shrink-0 text-muted-foreground" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => onQueryChange(e.target.value)}
            placeholder={t.docs.search}
            className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
          />
          {query ? (
            <button
              onClick={() => onQueryChange("")}
              className="text-muted-foreground transition-colors hover:text-foreground"
              aria-label="Clear search"
            >
              <X className="h-4 w-4" />
            </button>
          ) : (
            <kbd className="rounded border border-border bg-secondary px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground">Esc</kbd>
          )}
        </div>

        {/* Results */}
        <div className="max-h-[420px] overflow-y-auto">
          {query.trim() ? (
            filtered.length > 0 ? (
              <ul className="p-2 space-y-0.5">
                <li className="px-2 pb-1.5 pt-1 text-xs text-muted-foreground">
                  {t.docs.results(filtered.length, query)}
                </li>
                {filtered.map(s => (
                  <li key={s.id}>
                    <button
                      onClick={() => onSelect(s.id)}
                      className="flex w-full items-center justify-between rounded-md px-3 py-2.5 text-left text-sm transition-colors hover:bg-secondary focus:bg-secondary focus:outline-none"
                    >
                      <div>
                        <div className="font-medium">{highlight(s.title, query)}</div>
                        <div className="mt-0.5 text-xs text-muted-foreground">{t.docs.groups[s.group]}</div>
                      </div>
                      <ChevronRight className="h-4 w-4 shrink-0 text-muted-foreground" />
                    </button>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="px-3 py-8 text-center text-sm text-muted-foreground">{t.docs.noMatches}</p>
            )
          ) : (
            <p className="px-3 py-8 text-center text-sm text-muted-foreground opacity-60">
              {t.docs.search}…
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── Docs page ───────────────────────────────────────────────────────────────

const Docs = () => {
  const { t, lang } = useI18n();
  const [searchParams, setSearchParams] = useSearchParams();

  const sections = useMemo(() => getDocSections(lang), [lang]);
  const [active, setActive] = useState<string>(sections[0].id);

  // Search modal state — query lives in URL (?q=...)
  const [searchOpen, setSearchOpen] = useState(() => !!searchParams.get("q"));
  const [query, setQuery] = useState(() => searchParams.get("q") ?? "");

  // Sidebar accordion: only one group expanded at a time.
  // Initial: "start" (Getting Started). Auto-follows the section the user is
  // viewing (see scrollspy effect below) so the active item is never hidden
  // inside a collapsed group.
  const [openGroup, setOpenGroup] = useState<DocSection["group"] | null>("start");
  const toggleGroup = (g: DocSection["group"]) =>
    setOpenGroup(prev => (prev === g ? null : g));

  // Back-to-top visibility
  const [showTop, setShowTop] = useState(false);
  useEffect(() => {
    const handler = () => setShowTop(window.scrollY > 300);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  // h3 items of the currently active section (right sidebar)
  const activeSection = useMemo(
    () => sections.find(s => s.id === active),
    [sections, active]
  );

  // Keep the sidebar accordion aligned with the section currently in view.
  // Without this, the active section could end up inside a collapsed group
  // and the user loses orientation.
  useEffect(() => {
    if (activeSection && activeSection.group !== openGroup) {
      setOpenGroup(activeSection.group);
    }
    // openGroup is intentionally omitted: we only react to the active section
    // changing, never to the user manually toggling a group.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeSection]);
  const h3Items = useMemo(
    () => (activeSection?.blocks ?? []).filter(
      (b): b is Extract<Block, { kind: "h3" }> => b.kind === "h3" && !!b.id
    ),
    [activeSection]
  );

  // On mount: restore section position from URL hash
  useEffect(() => {
    const hash = window.location.hash.slice(1);
    if (hash) {
      const id = setTimeout(() => {
        const el = document.getElementById(hash);
        if (el) el.scrollIntoView({ behavior: "auto", block: "start" });
      }, 150);
      return () => clearTimeout(id);
    }
  }, []);

  useEffect(() => {
    document.title = "Zard — Documentation";
  }, []);

  // Open modal on Ctrl/Cmd+K (fired by Navbar)
  useEffect(() => {
    const handler = () => setSearchOpen(true);
    window.addEventListener("zard:focus-search", handler);
    return () => window.removeEventListener("zard:focus-search", handler);
  }, []);

  // Sync query → URL param
  const handleQueryChange = (q: string) => {
    setQuery(q);
    if (q.trim()) {
      setSearchParams({ q }, { replace: true });
    } else {
      setSearchParams({}, { replace: true });
    }
  };

  // Close modal without selecting
  const handleClose = () => {
    setSearchOpen(false);
    setQuery("");
    setSearchParams({}, { replace: true });
  };

  // Select a result: close modal then scroll (article is always in DOM — no timing bug)
  const handleSelect = (id: string) => {
    setSearchOpen(false);
    setQuery("");
    setSearchParams({}, { replace: true });
    // Defer until modal close paint is flushed
    setTimeout(() => {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
        history.replaceState(null, "", `#${id}`);
      }
    }, 30);
  };

  const grouped = useMemo(() => groupSections(sections), [sections]);

  // Scrollspy
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter(e => e.isIntersecting);
        if (visible.length > 0) {
          visible.sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
          setActive(visible[0].target.id);
        }
      },
      { rootMargin: "-80px 0px -70% 0px", threshold: 0 }
    );
    sections.forEach(s => {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [sections]);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      history.replaceState(null, "", `#${id}`);
    }
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />

      <div className="container flex-1 py-10 lg:py-12">
        <div className="grid gap-10 lg:grid-cols-[220px_1fr_180px]">
          {/* Sidebar */}
          <aside className="lg:sticky lg:top-20 lg:self-start lg:max-h-[calc(100vh-6rem)] lg:overflow-y-auto">
            <div className="space-y-5 pr-2">
              {GROUP_ORDER.map(g => {
                const items = grouped[g];
                if (items.length === 0) return null;
                const isOpen = openGroup === g;
                return (
                  <div key={g}>
                    <button
                      onClick={() => toggleGroup(g)}
                      className="mb-1.5 flex w-full items-center justify-between px-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground transition-colors hover:text-foreground"
                    >
                      <span>{t.docs.groups[g]}</span>
                      {isOpen
                        ? <ChevronDown className="h-3 w-3" />
                        : <ChevronRight className="h-3 w-3" />
                      }
                    </button>
                    {isOpen && (
                      <ul className="space-y-px border-l border-border">
                        {items.map(s => (
                          <li key={s.id}>
                            <button
                              onClick={() => scrollTo(s.id)}
                              className={cn(
                                "block w-full -ml-px border-l-2 px-3 py-1.5 text-left text-sm transition-colors",
                                active === s.id
                                  ? "border-primary font-medium text-foreground"
                                  : "border-transparent text-muted-foreground hover:border-border hover:text-foreground"
                              )}
                            >
                              {s.title}
                            </button>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                );
              })}
            </div>
          </aside>

          {/* Main — always rendered so scrollTo() always finds elements */}
          <main className="min-w-0">
            <article className="max-w-3xl">
              <div className="mb-12">
                <div className="mb-3 font-mono text-xs uppercase tracking-wider text-muted-foreground">
                  {t.docs.badge}
                </div>
                <h1 className="text-4xl font-semibold tracking-tight">{t.docs.title}</h1>
                <p className="mt-3 text-lg text-muted-foreground">
                  {t.docs.subtitle}
                </p>
              </div>

              {sections.map(s => (
                <section key={s.id} id={s.id} className="scroll-mt-24 border-b border-border pb-14 mb-14 last:border-0">
                  <h2 className="text-2xl font-semibold tracking-tight">
                    <a href={`#${s.id}`} className="group inline-flex items-center gap-2 hover:text-primary">
                      {s.title}
                      <span className="text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100">#</span>
                    </a>
                  </h2>
                  <div className="mt-5 space-y-4">
                    {s.blocks.map((b, i) => <BlockRenderer key={i} block={b} />)}
                  </div>
                </section>
              ))}
            </article>
          </main>

          {/* On this page */}
          <aside className="hidden lg:block lg:sticky lg:top-20 lg:self-start lg:max-h-[calc(100vh-6rem)] lg:overflow-y-auto">
            <div className="border-l border-border pl-4">
              <div className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                {t.docs.onThisPage}
              </div>
              {h3Items.length > 0 ? (
                <>
                  <div className="mb-2 text-xs font-medium text-foreground/80 leading-snug">
                    {activeSection?.title}
                  </div>
                  <ul className="space-y-1.5">
                    {h3Items.map((b, i) => (
                      <li key={i}>
                        <button
                          onClick={() => {
                            const el = document.getElementById(b.id!);
                            if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
                          }}
                          className="block text-left text-xs leading-relaxed text-muted-foreground transition-colors hover:text-foreground"
                        >
                          {b.text}
                        </button>
                      </li>
                    ))}
                  </ul>
                </>
              ) : (
                <ul className="space-y-1.5">
                  {sections.map(s => (
                    <li key={s.id}>
                      <button
                        onClick={() => scrollTo(s.id)}
                        className={cn(
                          "block text-left text-xs leading-relaxed transition-colors",
                          active === s.id ? "text-primary font-medium" : "text-muted-foreground hover:text-foreground"
                        )}
                      >
                        {s.title}
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </aside>
        </div>
      </div>

      <Footer />

      {/* Back to top */}
      {showTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-6 right-6 z-50 rounded-full border border-border bg-background p-2.5 shadow-md transition-colors hover:border-primary hover:text-primary"
          aria-label="Back to top"
        >
          <ArrowUp className="h-4 w-4" />
        </button>
      )}

      {/* Search modal (command palette) */}
      <SearchModal
        open={searchOpen}
        query={query}
        onQueryChange={handleQueryChange}
        onClose={handleClose}
        onSelect={handleSelect}
        sections={sections}
      />
    </div>
  );
};

export default Docs;
