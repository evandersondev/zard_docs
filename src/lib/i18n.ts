export type Lang = "en" | "pt";

export const translations = {
  en: {
    nav: { docs: "Documentation", github: "GitHub", getStarted: "Get Started" },
    hero: {
      badge: "v1.0 · Schema validation for Dart",
      title1: "Schema validation",
      title2: "for Dart, done right.",
      subtitle: "Define, validate, and transform data with a powerful, intuitive API. Built for Flutter and Dart developers who love type safety.",
      cta1: "Get Started",
      cta2: "View Documentation",
      installNote: "dart pub add zard",
      tagline: "Define once. Validate anywhere. Get fully typed data.",
      credibility: {
        version: "v1.0.0",
        oss: "Open source · MIT",
        pub: "pub.dev",
        github: "GitHub",
      },
    },
    features: {
      title: "Built for the Dart ecosystem",
      subtitle: "Everything you need to validate, parse, and transform data — without the ceremony.",
      items: [
        { icon: "zap", title: "Lightning fast", desc: "Optimized parser hitting ~1M ops/sec on objects and ~4M on primitives." },
        { icon: "brain", title: "Intuitive API", desc: "Chain validators fluently. If you know Zod, you already know Zard." },
        { icon: "shield", title: "Type-safe", desc: "Statically inferred output types with first-class Dart generics." },
        { icon: "shuffle", title: "Transformations", desc: "Parse and transform in a single pipeline with .transform() and .coerce." },
        { icon: "blocks", title: "Composable", desc: "Compose schemas with .merge, .extend, .pick, .omit, .partial — pure Zod parity." },
        { icon: "package", title: "Dart & Flutter", desc: "Zero JS bridges. Pure Dart. Works everywhere Flutter runs." },
      ],
    },
    perf: {
      title: "Performance you can ship",
      subtitle: "Benchmarked against the libraries you already know.",
      headers: ["Library", "Small object", "Complex object", "Notes"],
      rows: [
        ["Zard", "~0.93 µs", "~7.3 µs", "Native Dart"],
        ["Zod (JS)", "~0.13 µs", "~1.3 µs", "JS engine"],
        ["Yup (JS)", "~5.7 µs", "~66 µs", "Reference"],
      ],
      callout: "~6–10× faster than Yup, competitive with Zod.",
    },
    examples: {
      title: "Real Dart, no magic",
      subtitle: "Pick a tab to see Zard in action.",
      tabs: { strings: "Strings", objects: "Objects", validation: "Validation", transform: "Transform" },
    },
    usedFor: {
      title: "Used for",
      subtitle: "Wherever data enters your app, Zard keeps it honest.",
      items: [
        { title: "API validation", desc: "Validate request bodies and responses at the edges of your backend." },
        { title: "Form validation", desc: "Safely parse user input from Flutter forms with friendly errors." },
        { title: "Environment config", desc: "Coerce and validate .env variables at startup — fail fast on misconfig." },
        { title: "Data parsing", desc: "Turn untyped JSON into strongly-typed Dart values with one call." },
      ],
    },
    realWorld: {
      title: "Real-world usage",
      subtitle: "Practical snippets you can paste into a project today.",
      tabs: {
        api: "API validation",
        env: "Environment variables",
        form: "Form validation",
      },
      samples: {
        api: `// Validate an incoming HTTP request body
final request = z.map({
  'email': z.string().email(),
  'password': z.string().min(8),
}).parse(body);`,
        env: `// Validate environment variables at startup
final env = z.map({
  'PORT': z.coerce.int().min(1),
  'DATABASE_URL': z.string().url(),
  'DEBUG': z.coerce.bool().optional(),
}).parse(dotenv);`,
        form: `// Validate a Flutter form — never throws
final form = z.map({
  'name': z.string().min(2),
  'age': z.int().min(18),
  'email': z.string().email(),
}).safeParse(input);

if (!form.success) {
  showErrors(form.error!.issues);
}`,
      },
    },
    compare: {
      title: "Why Zard over alternatives",
      subtitle: "Built specifically for Dart — not a port, not a wrapper.",
      headers: ["Feature", "Zard", "Zod", "Yup"],
      rows: [
        ["Dart-native",           "✅", "❌", "❌"],
        ["Type inference",        "✅", "✅", "⚠️"],
        ["Performance",           "⚡⚡⚡", "⚡⚡⚡", "🐢"],
        ["Async validation",      "✅", "✅", "✅"],
        ["No code generation",    "✅", "—",  "—"],
        ["Flutter-ready",         "✅", "❌", "❌"],
      ],
      note: "Zod and Yup are excellent — but they run on the JS VM. Zard runs as pure Dart, on every platform Flutter runs.",
    },
    how: {
      title: "How it works",
      subtitle: "Three steps. Define a schema, parse your data, get a typed result.",
      steps: [
        { title: "Define a schema", desc: "Describe the shape and rules of your data using a fluent API.", code: "final user = z.map({\n  'name': z.string(),\n  'age': z.int(),\n});" },
        { title: "Parse the input", desc: "Validate raw input — throw on error, or use safeParse for a result.", code: "final result = user.parse(data);" },
        { title: "Get a typed result", desc: "You receive validated, transformed data ready to use in your app.", code: "// result is a validated Map\nprint(result['name']);" },
      ],
    },
    why: {
      title: "Why Zard",
      subtitle: "A native validation library that respects how Dart developers actually work.",
      items: [
        { title: "Inspired by Zod", desc: "Familiar fluent API. Migrate mental models from JS in minutes." },
        { title: "Native Dart", desc: "No code generation, no build runners. Just pure, idiomatic Dart." },
        { title: "Better DX", desc: "Rich error formatting, async support, refine, coerce, lazy — built in." },
      ],
    },
    cta: { title: "Start building with Zard today", subtitle: "Add it to your pubspec, write your first schema in 60 seconds.", install: "Install", docs: "Documentation" },
    callouts: { tip: "Tip", warning: "Warning", bestPractice: "Best practice" },
    footer: { rights: "All rights reserved.", made: "Made with ❤ for Dart & Flutter" },
    docs: {
      search: "Search the docs…",
      onThisPage: "On this page",
      badge: "Documentation",
      title: "Zard Docs",
      subtitle: "Everything you need to validate, parse, and transform data in Dart.",
      results: (n: number, q: string) => `${n} result${n === 1 ? "" : "s"} for "${q}"`,
      noMatches: "No matches.",
      groups: {
        start: "Getting Started",
        core: "Core Concepts",
        validation: "Validation",
        advanced: "Advanced",
        reference: "Reference",
      },
    },
  },
  pt: {
    nav: { docs: "Documentação", github: "GitHub", getStarted: "Começar" },
    hero: {
      badge: "v1.0 · Validação de schema para Dart",
      title1: "Validação de schema",
      title2: "para Dart, do jeito certo.",
      subtitle: "Defina, valide e transforme dados com uma API poderosa e intuitiva. Feita para desenvolvedores Flutter e Dart que amam type safety.",
      cta1: "Começar",
      cta2: "Ver documentação",
      installNote: "dart pub add zard",
      tagline: "Defina uma vez. Valide em qualquer lugar. Dados totalmente tipados.",
      credibility: {
        version: "v1.0.0",
        oss: "Código aberto · MIT",
        pub: "pub.dev",
        github: "GitHub",
      },
    },
    features: {
      title: "Feito para o ecossistema Dart",
      subtitle: "Tudo que você precisa para validar, parsear e transformar dados — sem cerimônia.",
      items: [
        { icon: "zap", title: "Extremamente rápido", desc: "Parser otimizado com ~1M ops/seg em objetos e ~4M em primitivos." },
        { icon: "brain", title: "API intuitiva", desc: "Encadeie validadores fluentemente. Se você conhece Zod, já conhece Zard." },
        { icon: "shield", title: "Type-safe", desc: "Tipos de saída inferidos estaticamente com generics nativos de Dart." },
        { icon: "shuffle", title: "Transformações", desc: "Parse e transforme em um único pipeline com .transform() e .coerce." },
        { icon: "blocks", title: "Composável", desc: "Componha schemas com .merge, .extend, .pick, .omit, .partial." },
        { icon: "package", title: "Dart & Flutter", desc: "Zero pontes JS. Dart puro. Funciona em todo lugar que o Flutter roda." },
      ],
    },
    perf: {
      title: "Performance pronta para produção",
      subtitle: "Comparado com as bibliotecas que você já conhece.",
      headers: ["Library", "Objeto pequeno", "Objeto complexo", "Notas"],
      rows: [
        ["Zard", "~0.93 µs", "~7.3 µs", "Dart nativo"],
        ["Zod (JS)", "~0.13 µs", "~1.3 µs", "Engine JS"],
        ["Yup (JS)", "~5.7 µs", "~66 µs", "Referência"],
      ],
      callout: "~6–10× mais rápido que Yup, competitivo com Zod.",
    },
    examples: {
      title: "Dart real, sem mágica",
      subtitle: "Escolha uma aba para ver o Zard em ação.",
      tabs: { strings: "Strings", objects: "Objetos", validation: "Validação", transform: "Transform" },
    },
    usedFor: {
      title: "Para que serve",
      subtitle: "Onde quer que dados entrem no seu app, o Zard mantém a consistência.",
      items: [
        { title: "Validação de API", desc: "Valide o corpo de requisições e respostas nas bordas do seu backend." },
        { title: "Validação de formulários", desc: "Parse seguro de inputs em formulários Flutter com mensagens amigáveis." },
        { title: "Variáveis de ambiente", desc: "Converta e valide as variáveis do .env na inicialização — falhe rápido em má configuração." },
        { title: "Parsing de dados", desc: "Transforme JSON sem tipo em valores Dart fortemente tipados em uma chamada." },
      ],
    },
    realWorld: {
      title: "Casos de uso reais",
      subtitle: "Snippets práticos que você pode colar no seu projeto hoje.",
      tabs: {
        api: "Validação de API",
        env: "Variáveis de ambiente",
        form: "Validação de formulário",
      },
      samples: {
        api: `// Valida o body de uma requisição HTTP
final request = z.map({
  'email': z.string().email(),
  'password': z.string().min(8),
}).parse(body);`,
        env: `// Valida variáveis de ambiente no startup
final env = z.map({
  'PORT': z.coerce.int().min(1),
  'DATABASE_URL': z.string().url(),
  'DEBUG': z.coerce.bool().optional(),
}).parse(dotenv);`,
        form: `// Valida um formulário Flutter — nunca lança exceção
final form = z.map({
  'name': z.string().min(2),
  'age': z.int().min(18),
  'email': z.string().email(),
}).safeParse(input);

if (!form.success) {
  showErrors(form.error!.issues);
}`,
      },
    },
    compare: {
      title: "Por que Zard e não as alternativas",
      subtitle: "Feito especificamente para Dart — não é um port, nem um wrapper.",
      headers: ["Recurso", "Zard", "Zod", "Yup"],
      rows: [
        ["Nativo em Dart",         "✅", "❌", "❌"],
        ["Inferência de tipos",    "✅", "✅", "⚠️"],
        ["Performance",            "⚡⚡⚡", "⚡⚡⚡", "🐢"],
        ["Validação async",        "✅", "✅", "✅"],
        ["Sem geração de código",  "✅", "—",  "—"],
        ["Pronto para Flutter",    "✅", "❌", "❌"],
      ],
      note: "Zod e Yup são excelentes — mas rodam na VM do JS. O Zard roda como Dart puro, em toda plataforma onde o Flutter roda.",
    },
    how: {
      title: "Como funciona",
      subtitle: "Três passos. Defina um schema, faça o parse e receba um resultado tipado.",
      steps: [
        { title: "Defina o schema", desc: "Descreva o formato e as regras dos seus dados com uma API fluente.", code: "final user = z.map({\n  'name': z.string(),\n  'age': z.int(),\n});" },
        { title: "Faça o parse", desc: "Valide os dados de entrada — lança exceção, ou use safeParse para um resultado.", code: "final result = user.parse(data);" },
        { title: "Receba o resultado", desc: "Você recebe os dados validados e prontos para uso na aplicação.", code: "// result é um Map validado\nprint(result['name']);" },
      ],
    },
    why: {
      title: "Por que Zard",
      subtitle: "Uma biblioteca de validação nativa que respeita como desenvolvedores Dart realmente trabalham.",
      items: [
        { title: "Inspirado no Zod", desc: "API fluente familiar. Migre o modelo mental do JS em minutos." },
        { title: "Dart nativo", desc: "Sem geração de código, sem build runners. Apenas Dart puro e idiomático." },
        { title: "Melhor DX", desc: "Formatação rica de erros, suporte async, refine, coerce, lazy — built-in." },
      ],
    },
    cta: { title: "Comece a usar Zard hoje", subtitle: "Adicione no pubspec e escreva seu primeiro schema em 60 segundos.", install: "Instalar", docs: "Documentação" },
    callouts: { tip: "Dica", warning: "Atenção", bestPractice: "Boa prática" },
    footer: { rights: "Todos os direitos reservados.", made: "Feito com ❤ para Dart & Flutter" },
    docs: {
      search: "Buscar na documentação…",
      onThisPage: "Nesta página",
      badge: "Documentação",
      title: "Documentação Zard",
      subtitle: "Tudo o que você precisa para validar, parsear e transformar dados em Dart.",
      results: (n: number, q: string) => `${n} resultado${n === 1 ? "" : "s"} para "${q}"`,
      noMatches: "Nenhum resultado.",
      groups: {
        start: "Primeiros passos",
        core: "Conceitos centrais",
        validation: "Validação",
        advanced: "Avançado",
        reference: "Referência",
      },
    },
  },
};

export type Translations = typeof translations.en;
