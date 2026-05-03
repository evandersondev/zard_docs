import { useState } from "react";
import { CodeBlock } from "@/components/CodeBlock";
import { useI18n } from "@/lib/i18n-context";
import { cn } from "@/lib/utils";

const SAMPLES = {
  strings: `final email = z.string().email();
final url = z.string().url();
final uuid = z.string().uuid();

email.parse('john@example.com');
url.parse('https://zard.dev');

// Transforms
final clean = z.string().trim().toLowerCase();
print(clean.parse('  HELLO  ')); // hello`,
  objects: `final user = z.map({
  'name': z.string().min(2),
  'age': z.int().min(0).max(120),
  'email': z.string().email().optional(),
  'role': z.\$enum(['admin', 'user']),
});

final result = user.parse({
  'name': 'Ada',
  'age': 36,
  'role': 'admin',
});`,
  validation: `final schema = z.map({
  'password': z.string().min(8),
  'confirm': z.string(),
}).refine(
  (data) => data['password'] == data['confirm'],
  message: 'Passwords must match',
);

final result = schema.safeParse({
  'password': 'secret123',
  'confirm': 'different',
});

if (!result.success) {
  print(result.error!.issues.first.message);
}`,
  transform: `// Coerce primitives
z.coerce.int().parse('123');     // 123
z.coerce.bool().parse('true');   // true
z.coerce.date().parse('2025-01-01');

// Transform values
final length = z.string().transformTyped((s) => s.length);
print(length.parse('hello')); // 5

final upper = z.string()
  .trim()
  .transform((s) => s.toUpperCase());`,
};

export function Examples() {
  const { t } = useI18n();
  const [tab, setTab] = useState<keyof typeof SAMPLES>("strings");

  const tabs: { key: keyof typeof SAMPLES; label: string }[] = [
    { key: "strings", label: t.examples.tabs.strings },
    { key: "objects", label: t.examples.tabs.objects },
    { key: "validation", label: t.examples.tabs.validation },
    { key: "transform", label: t.examples.tabs.transform },
  ];

  return (
    <section className="border-b border-border section-animate">
      <div className="container py-20 lg:py-28">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">{t.examples.title}</h2>
          <p className="mt-3 text-muted-foreground">{t.examples.subtitle}</p>
        </div>

        <div className="mx-auto mt-10 max-w-3xl">
          <div className="mb-4 flex items-center gap-1 border-b border-border">
            {tabs.map(tb => (
              <button
                key={tb.key}
                onClick={() => setTab(tb.key)}
                className={cn(
                  "relative whitespace-nowrap px-3 py-2 text-sm font-medium transition-colors",
                  tab === tb.key
                    ? "text-foreground after:absolute after:inset-x-0 after:-bottom-px after:h-px after:bg-primary"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {tb.label}
              </button>
            ))}
          </div>
          <CodeBlock code={SAMPLES[tab]} filename={`${tab}.dart`} />
        </div>
      </div>
    </section>
  );
}
