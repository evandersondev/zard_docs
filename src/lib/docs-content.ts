// Bilingual docs content. Use getDocSections(lang) to retrieve translated sections.

export type Lang = "en" | "pt";

export type Block =
  | { kind: "p"; text: string }
  | { kind: "code"; lang?: "dart" | "yaml" | "sh"; code: string; filename?: string }
  | { kind: "h3"; text: string; id?: string }
  | { kind: "ul"; items: string[] }
  | { kind: "table"; headers: string[]; rows: string[][] }
  | { kind: "note"; text: string }
  | { kind: "callout"; variant: "tip" | "warning" | "success"; text: string };

export interface DocSection {
  id: string;
  title: string;
  group: "start" | "core" | "validation" | "advanced" | "reference";
  blocks: Block[];
}

type Bi<T> = { en: T; pt: T };
const bi = <T,>(en: T, pt: T): Bi<T> => ({ en, pt });

interface BiSection {
  id: string;
  group: DocSection["group"];
  title: Bi<string>;
  blocks: Bi<Block[]>;
}

const SECTIONS: BiSection[] = [
  // ============== QUICK START ==============
  {
    id: "quick-start",
    group: "start",
    title: bi("Quick Start", "Início rápido"),
    blocks: bi(
      [
        { kind: "p", text: "Get up and running with Zard in under a minute. Install, define a schema, parse your data." },
        { kind: "h3", text: "1. Install", id: "qs-install" },
        { kind: "code", lang: "sh", code: "dart pub add zard" },
        { kind: "h3", text: "2. Define a schema", id: "qs-define" },
        { kind: "code", code: `import 'package:zard/zard.dart';

final user = z.map({
  'name': z.string().min(2),
  'age': z.int().min(0),
});` },
        { kind: "h3", text: "3. Parse your data", id: "qs-parse" },
        { kind: "code", code: `final result = user.parse({
  'name': 'Ada',
  'age': 36,
});

print(result); // validated Map` },
        { kind: "callout", variant: "tip", text: "Use safeParse for user input (forms, APIs) — it returns a result object instead of throwing." },
      ],
      [
        { kind: "p", text: "Comece a usar o Zard em menos de um minuto. Instale, defina um schema, faça o parse." },
        { kind: "h3", text: "1. Instale", id: "qs-install" },
        { kind: "code", lang: "sh", code: "dart pub add zard" },
        { kind: "h3", text: "2. Defina um schema", id: "qs-define" },
        { kind: "code", code: `import 'package:zard/zard.dart';

final user = z.map({
  'name': z.string().min(2),
  'age': z.int().min(0),
});` },
        { kind: "h3", text: "3. Faça o parse", id: "qs-parse" },
        { kind: "code", code: `final result = user.parse({
  'name': 'Ada',
  'age': 36,
});

print(result); // Map validado` },
        { kind: "callout", variant: "tip", text: "Use safeParse para entradas do usuário (formulários, APIs) — retorna um objeto de resultado em vez de lançar exceção." },
      ]
    ),
  },
  // ============== MENTAL MODEL ==============
  {
    id: "mental-model",
    group: "start",
    title: bi("Mental Model", "Modelo mental"),
    blocks: bi(
      [
        { kind: "p", text: "Zard is built on three simple ideas. Once you grasp them, the entire API clicks." },
        { kind: "ul", items: [
          "A schema describes the shape and rules of your data.",
          "parse validates the input — returning the value or throwing a ZardError.",
          "safeParse never throws — it returns a result with success, data and error.",
        ]},
        { kind: "h3", text: "Composition", id: "mm-composition" },
        { kind: "p", text: "Schemas are values. You can store, share, compose, and refine them like any other Dart object." },
        { kind: "code", code: `final email = z.string().email();
final adult = z.int().min(18);

final user = z.map({
  'email': email,
  'age': adult,
});` },
        { kind: "callout", variant: "success", text: "If you've used Zod, you'll feel right at home — Zard mirrors its mental model." },
      ],
      [
        { kind: "p", text: "Zard se apoia em três ideias simples. Quando você as entende, toda a API faz sentido." },
        { kind: "ul", items: [
          "Um schema descreve o formato e as regras dos seus dados.",
          "parse valida o input — retornando o valor ou lançando um ZardError.",
          "safeParse nunca lança — retorna um resultado com success, data e error.",
        ]},
        { kind: "h3", text: "Composição", id: "mm-composition" },
        { kind: "p", text: "Schemas são valores. Você pode armazenar, compartilhar, compor e refinar como qualquer objeto Dart." },
        { kind: "code", code: `final email = z.string().email();
final adult = z.int().min(18);

final user = z.map({
  'email': email,
  'age': adult,
});` },
        { kind: "callout", variant: "success", text: "Se você já usou Zod, vai se sentir em casa — Zard espelha o mesmo modelo mental." },
      ]
    ),
  },
  {
    id: "introduction",
    group: "start",
    title: bi("Introduction", "Introdução"),
    blocks: bi(
      [
        { kind: "p", text: "Zard is a schema validation and transformation library for Dart, inspired by the popular Zod library for JavaScript. With Zard, you can define schemas to validate and transform data easily and intuitively." },
        { kind: "p", text: "Zard is built specifically for Dart and Flutter, taking full advantage of Dart's type system and language features. No code generation. No build runners. Just pure, idiomatic Dart." },
        { kind: "note", text: "If you find Zard useful, consider supporting development via Buy Me a Coffee — it helps the framework keep improving." },
      ],
      [
        { kind: "p", text: "Zard é uma biblioteca de validação e transformação de schemas para Dart, inspirada no popular Zod do JavaScript. Com Zard você define schemas para validar e transformar dados de forma simples e intuitiva." },
        { kind: "p", text: "Zard foi feito especificamente para Dart e Flutter, aproveitando todo o sistema de tipos da linguagem. Sem geração de código. Sem build runners. Apenas Dart puro e idiomático." },
        { kind: "note", text: "Se o Zard for útil para você, considere apoiar o projeto via Buy Me a Coffee — isso ajuda o framework a continuar evoluindo." },
      ]
    ),
  },
  {
    id: "installation",
    group: "start",
    title: bi("Installation", "Instalação"),
    blocks: bi(
      [
        { kind: "p", text: "Add Zard to your pubspec.yaml:" },
        { kind: "code", lang: "yaml", filename: "pubspec.yaml", code: `dependencies:\n  zard: ^1.2.0` },
        { kind: "p", text: "Then run:" },
        { kind: "code", lang: "sh", code: `flutter pub get` },
        { kind: "p", text: "Or use the pub command directly:" },
        { kind: "code", lang: "sh", code: `dart pub add zard` },
      ],
      [
        { kind: "p", text: "Adicione o Zard ao seu pubspec.yaml:" },
        { kind: "code", lang: "yaml", filename: "pubspec.yaml", code: `dependencies:\n  zard: ^1.2.0` },
        { kind: "p", text: "Depois execute:" },
        { kind: "code", lang: "sh", code: `flutter pub get` },
        { kind: "p", text: "Ou use o comando pub diretamente:" },
        { kind: "code", lang: "sh", code: `dart pub add zard` },
      ]
    ),
  },
  {
    id: "basic-usage",
    group: "start",
    title: bi("Basic Usage", "Uso básico"),
    blocks: bi(
      [
        { kind: "h3", text: "parse", id: "parse" },
        { kind: "p", text: "Use parse to validate a value. If valid, it returns the parsed value. If invalid, it throws a ZardError with details." },
        { kind: "code", code: `final helloSchema = z.string().min(3);
final hello = helloSchema.parse('hello');
print(hello); // Output: hello` },
        { kind: "h3", text: "safeParse", id: "safeParse" },
        { kind: "p", text: "safeParse never throws. It returns a ZardResult with success, data and error." },
        { kind: "code", code: `final intSchema = z.int().min(0).max(10);
final result = intSchema.safeParse(5);

if (result.success) {
  print(result.data); // 5
} else {
  print(result.error!.issues.map((i) => i.message).toList());
}` },
        { kind: "h3", text: "parseAsync", id: "parseAsync" },
        { kind: "p", text: "Validate a Future. Resolves to the parsed value or throws ZardError." },
        { kind: "code", code: `Future<int> getAge() async => 20;

final intSchema = z.int().min(0).max(100);
final age = await intSchema.parseAsync(getAge());
print(age); // 20` },
        { kind: "h3", text: "safeParseAsync", id: "safeParseAsync" },
        { kind: "code", code: `final result = await intSchema.safeParseAsync(getAge());
if (result.success) {
  print(result.data);
} else {
  print(result.error!.issues.first.message);
}` },
        { kind: "callout", variant: "warning", text: "All validation methods throw ZardError on failure when using parse / parseAsync. Use safeParse to avoid exceptions." },
      ],
      [
        { kind: "h3", text: "parse", id: "parse" },
        { kind: "p", text: "Use parse para validar um valor. Se válido, retorna o valor; se inválido, lança um ZardError com detalhes." },
        { kind: "code", code: `final helloSchema = z.string().min(3);
final hello = helloSchema.parse('hello');
print(hello); // Saída: hello` },
        { kind: "h3", text: "safeParse", id: "safeParse" },
        { kind: "p", text: "safeParse nunca lança. Retorna um ZardResult com success, data e error." },
        { kind: "code", code: `final intSchema = z.int().min(0).max(10);
final result = intSchema.safeParse(5);

if (result.success) {
  print(result.data); // 5
} else {
  print(result.error!.issues.map((i) => i.message).toList());
}` },
        { kind: "h3", text: "parseAsync", id: "parseAsync" },
        { kind: "p", text: "Valida um Future. Resolve para o valor parseado ou lança ZardError." },
        { kind: "code", code: `Future<int> getAge() async => 20;

final intSchema = z.int().min(0).max(100);
final age = await intSchema.parseAsync(getAge());
print(age); // 20` },
        { kind: "h3", text: "safeParseAsync", id: "safeParseAsync" },
        { kind: "code", code: `final result = await intSchema.safeParseAsync(getAge());
if (result.success) {
  print(result.data);
} else {
  print(result.error!.issues.first.message);
}` },
        { kind: "callout", variant: "warning", text: "Os métodos parse / parseAsync lançam ZardError em caso de falha. Use safeParse para evitar exceções." },
      ]
    ),
  },

  // ============== CORE - SCHEMAS ==============
  {
    id: "strings",
    group: "core",
    title: bi("Strings (ZString)", "Strings (ZString)"),
    blocks: bi(
      [
        { kind: "p", text: "ZString validates string values with a rich fluent API." },
        { kind: "code", code: `final value = z.string().parse('Hello'); // 'Hello'` },
        { kind: "h3", text: "Length: min / max / length" },
        { kind: "code", code: `z.string().min(3).parse('John');           // 'John'
z.string().max(10).parse('short');         // 'short'
z.string().length(5).parse('Hello');       // 'Hello'` },
        { kind: "h3", text: "Format: email / url" },
        { kind: "code", code: `z.string().email().parse('john@example.com');
z.string().url().parse('https://example.com');` },
        { kind: "h3", text: "startsWith / endsWith / contains" },
        { kind: "code", code: `z.string().startsWith('Hello').parse('Hello world');
z.string().endsWith('world').parse('Hello world');
z.string().contains('test').parse('this is a test');` },
        { kind: "h3", text: "regex" },
        { kind: "code", code: `final s = z.string().regex(RegExp(r'^\\d{3}-\\d{2}-\\d{4}\$'));
s.parse('123-45-6789');` },
        { kind: "h3", text: "Date / time formats" },
        { kind: "code", code: `z.string().date().parse('2024-04-19');
z.string().datetime().parse('2025-04-19T15:30:00');
z.string().time().parse('12:00:00');` },
        { kind: "h3", text: "Identifiers: uuid / cuid / cuid2 / guid / nanoid / ulid" },
        { kind: "code", code: `z.string().uuid().parse('550e8400-e29b-41d4-a716-446655440000');
z.string().uuid(version: 'v4').parse('...'); // also v1..v8
z.string().uuidv4().parse('...');             // shortcut
z.string().uuidv6().parse('...');             // shortcut
z.string().uuidv7().parse('...');             // shortcut
z.string().guid().parse('...');               // UUID v4 alias
z.string().cuid().parse('abcdefghijklmnopqrst');
z.string().cuid2().parse('abcdefghijklmnopqrstuvwxxy');
z.string().nanoid().parse('V1StGXR8_Z5jdHi6B-myT');
z.string().ulid().parse('01ARZ3NDEKTSV4RRFFQ69G5FAV');` },
        { kind: "h3", text: "Network: ipv4 / ipv6 / cidrv4 / cidrv6 / mac / hostname / httpUrl" },
        { kind: "code", code: `z.string().ipv4().parse('192.168.0.1');
z.string().ipv6().parse('2001:db8::1');
z.string().cidrv4().parse('10.0.0.0/24');
z.string().cidrv6().parse('2001:db8::/32');
z.string().mac().parse('00:1A:2B:3C:4D:5E');
z.string().hostname().parse('api.example.com');
z.string().httpUrl().parse('https://example.com/path');` },
        { kind: "h3", text: "Encoding: base64 / base64url / hex / jwt" },
        { kind: "code", code: `z.string().base64().parse('aGVsbG8=');
z.string().base64url().parse('aGVsbG8');
z.string().hex().parse('deadbeef');
z.string().jwt().parse('eyJhbGciOi...');` },
        { kind: "h3", text: "Hash: hash(algorithm)" },
        { kind: "p", text: "Validates SHA / MD5 hashes by length and hex alphabet. Supported algorithms: md5, sha1, sha256, sha384, sha512." },
        { kind: "code", code: `z.string().hash('sha256').parse('e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855');
z.string().hash('md5').parse('5d41402abc4b2a76b9719d911017c592');` },
        { kind: "h3", text: "Transforms (mutate the value)" },
        { kind: "code", code: `z.string().trim().parse('  hi  ');         // 'hi'
z.string().toUpperCase().parse('hi');      // 'HI'
z.string().toLowerCase().parse('HI');      // 'hi'
z.string().normalize().parse(' áéí ');     // 'aei'` },
        { kind: "h3", text: "Validators (require existing format)" },
        { kind: "code", code: `z.string().uppercase().parse('ABC');
z.string().lowercase().parse('abc');` },
        { kind: "h3", text: "stringbool — string → boolean" },
        { kind: "p", text: "True tokens: 1, true, yes, on, y, enabled. False tokens: 0, false, no, off, n, disabled. Case-insensitive with trim." },
        { kind: "code", code: `final sb = z.stringbool();
sb.parse('1');         // true
sb.parse('yes');       // true
sb.parse('ON');        // true
sb.parse(' enabled '); // true
sb.parse('0');         // false` },
        { kind: "h3", text: "Full example" },
        { kind: "code", code: `final emailSchema = z.string().min(3).max(100).email().endsWith('@example.com');
final email = emailSchema.parse('john@example.com');` },
      ],
      [
        { kind: "p", text: "ZString valida strings com uma API fluente rica." },
        { kind: "code", code: `final value = z.string().parse('Hello'); // 'Hello'` },
        { kind: "h3", text: "Tamanho: min / max / length" },
        { kind: "code", code: `z.string().min(3).parse('John');           // 'John'
z.string().max(10).parse('short');         // 'short'
z.string().length(5).parse('Hello');       // 'Hello'` },
        { kind: "h3", text: "Formato: email / url" },
        { kind: "code", code: `z.string().email().parse('john@example.com');
z.string().url().parse('https://example.com');` },
        { kind: "h3", text: "startsWith / endsWith / contains" },
        { kind: "code", code: `z.string().startsWith('Hello').parse('Hello world');
z.string().endsWith('world').parse('Hello world');
z.string().contains('test').parse('this is a test');` },
        { kind: "h3", text: "regex" },
        { kind: "code", code: `final s = z.string().regex(RegExp(r'^\\d{3}-\\d{2}-\\d{4}\$'));
s.parse('123-45-6789');` },
        { kind: "h3", text: "Datas e horários" },
        { kind: "code", code: `z.string().date().parse('2024-04-19');
z.string().datetime().parse('2025-04-19T15:30:00');
z.string().time().parse('12:00:00');` },
        { kind: "h3", text: "Identificadores: uuid / cuid / cuid2 / guid / nanoid / ulid" },
        { kind: "code", code: `z.string().uuid().parse('550e8400-e29b-41d4-a716-446655440000');
z.string().uuid(version: 'v4').parse('...'); // também aceita v1..v8
z.string().uuidv4().parse('...');             // atalho
z.string().uuidv6().parse('...');             // atalho
z.string().uuidv7().parse('...');             // atalho
z.string().guid().parse('...');               // apelido de UUID v4
z.string().cuid().parse('abcdefghijklmnopqrst');
z.string().cuid2().parse('abcdefghijklmnopqrstuvwxxy');
z.string().nanoid().parse('V1StGXR8_Z5jdHi6B-myT');
z.string().ulid().parse('01ARZ3NDEKTSV4RRFFQ69G5FAV');` },
        { kind: "h3", text: "Rede: ipv4 / ipv6 / cidrv4 / cidrv6 / mac / hostname / httpUrl" },
        { kind: "code", code: `z.string().ipv4().parse('192.168.0.1');
z.string().ipv6().parse('2001:db8::1');
z.string().cidrv4().parse('10.0.0.0/24');
z.string().cidrv6().parse('2001:db8::/32');
z.string().mac().parse('00:1A:2B:3C:4D:5E');
z.string().hostname().parse('api.example.com');
z.string().httpUrl().parse('https://example.com/path');` },
        { kind: "h3", text: "Encoding: base64 / base64url / hex / jwt" },
        { kind: "code", code: `z.string().base64().parse('aGVsbG8=');
z.string().base64url().parse('aGVsbG8');
z.string().hex().parse('deadbeef');
z.string().jwt().parse('eyJhbGciOi...');` },
        { kind: "h3", text: "Hash: hash(algorithm)" },
        { kind: "p", text: "Valida hashes SHA / MD5 pelo tamanho e alfabeto hexadecimal. Algoritmos suportados: md5, sha1, sha256, sha384, sha512." },
        { kind: "code", code: `z.string().hash('sha256').parse('e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855');
z.string().hash('md5').parse('5d41402abc4b2a76b9719d911017c592');` },
        { kind: "h3", text: "Transforms (modificam o valor)" },
        { kind: "code", code: `z.string().trim().parse('  hi  ');         // 'hi'
z.string().toUpperCase().parse('hi');      // 'HI'
z.string().toLowerCase().parse('HI');      // 'hi'
z.string().normalize().parse(' áéí ');     // 'aei'` },
        { kind: "h3", text: "Validadores (exigem formato existente)" },
        { kind: "code", code: `z.string().uppercase().parse('ABC');
z.string().lowercase().parse('abc');` },
        { kind: "h3", text: "stringbool — string → boolean" },
        { kind: "p", text: "Tokens true: 1, true, yes, on, y, enabled. Tokens false: 0, false, no, off, n, disabled. Case-insensitive com trim." },
        { kind: "code", code: `final sb = z.stringbool();
sb.parse('1');         // true
sb.parse('yes');       // true
sb.parse('ON');        // true
sb.parse(' enabled '); // true
sb.parse('0');         // false` },
        { kind: "h3", text: "Exemplo completo" },
        { kind: "code", code: `final emailSchema = z.string().min(3).max(100).email().endsWith('@example.com');
final email = emailSchema.parse('john@example.com');` },
      ]
    ),
  },
  {
    id: "ints",
    group: "core",
    title: bi("Integers (ZInt)", "Inteiros (ZInt)"),
    blocks: bi(
      [
        { kind: "code", code: `final value = z.int().parse(7); // 7` },
        { kind: "h3", text: "min / max" },
        { kind: "code", code: `z.int().min(10).parse(15);
z.int().max(10).parse(5);` },
        { kind: "h3", text: "positive / nonnegative / negative" },
        { kind: "code", code: `z.int().positive().parse(5);     // > 0
z.int().nonnegative().parse(0);  // >= 0
z.int().negative().parse(-5);    // < 0` },
        { kind: "h3", text: "multipleOf / step" },
        { kind: "code", code: `z.int().multipleOf(3).parse(9);
z.int().step(3).parse(6);` },
      ],
      [
        { kind: "code", code: `final value = z.int().parse(7); // 7` },
        { kind: "h3", text: "min / max" },
        { kind: "code", code: `z.int().min(10).parse(15);
z.int().max(10).parse(5);` },
        { kind: "h3", text: "positive / nonnegative / negative" },
        { kind: "code", code: `z.int().positive().parse(5);     // > 0
z.int().nonnegative().parse(0);  // >= 0
z.int().negative().parse(-5);    // < 0` },
        { kind: "h3", text: "multipleOf / step" },
        { kind: "code", code: `z.int().multipleOf(3).parse(9);
z.int().step(3).parse(6);` },
      ]
    ),
  },
  {
    id: "doubles",
    group: "core",
    title: bi("Doubles (ZDouble)", "Doubles (ZDouble)"),
    blocks: bi(
      [
        { kind: "code", code: `final value = z.double().parse(7.0); // 7.0` },
        { kind: "h3", text: "min / max" },
        { kind: "code", code: `z.double().min(10).parse(15.0);
z.double().max(10).parse(5.0);` },
        { kind: "h3", text: "positive / nonnegative / negative" },
        { kind: "code", code: `z.double().positive().parse(5.0);
z.double().nonnegative().parse(0.0);
z.double().negative().parse(-5.0);` },
        { kind: "h3", text: "multipleOf / step" },
        { kind: "code", code: `z.double().multipleOf(3).parse(9.0);
z.double().step(3).parse(6.0);` },
      ],
      [
        { kind: "code", code: `final value = z.double().parse(7.0); // 7.0` },
        { kind: "h3", text: "min / max" },
        { kind: "code", code: `z.double().min(10).parse(15.0);
z.double().max(10).parse(5.0);` },
        { kind: "h3", text: "positive / nonnegative / negative" },
        { kind: "code", code: `z.double().positive().parse(5.0);
z.double().nonnegative().parse(0.0);
z.double().negative().parse(-5.0);` },
        { kind: "h3", text: "multipleOf / step" },
        { kind: "code", code: `z.double().multipleOf(3).parse(9.0);
z.double().step(3).parse(6.0);` },
      ]
    ),
  },
  {
    id: "numbers",
    group: "core",
    title: bi("Numbers (ZNum)", "Números (ZNum)"),
    blocks: bi(
      [
        { kind: "p", text: "ZNum validates any numeric value — both int and double. Use it when you don't need to distinguish between the two." },
        { kind: "code", code: `z.num().parse(7);      // int accepted
z.num().parse(7.5);    // double accepted` },
        { kind: "h3", text: "min / max" },
        { kind: "code", code: `z.num().min(0).parse(3.14);
z.num().max(100).parse(99);` },
        { kind: "h3", text: "positive / nonnegative / negative" },
        { kind: "code", code: `z.num().positive().parse(1);
z.num().nonnegative().parse(0);
z.num().negative().parse(-1);` },
        { kind: "h3", text: "multipleOf / step" },
        { kind: "code", code: `z.num().multipleOf(0.5).parse(2.5);
z.num().step(0.25).parse(1.0);` },
        { kind: "callout", variant: "tip", text: "Use z.num() when you accept both 7 and 7.0 — Dart's num type covers both int and double." },
      ],
      [
        { kind: "p", text: "ZNum valida qualquer valor numérico — tanto int quanto double. Use quando não precisar distinguir entre os dois." },
        { kind: "code", code: `z.num().parse(7);      // int aceito
z.num().parse(7.5);    // double aceito` },
        { kind: "h3", text: "min / max" },
        { kind: "code", code: `z.num().min(0).parse(3.14);
z.num().max(100).parse(99);` },
        { kind: "h3", text: "positive / nonnegative / negative" },
        { kind: "code", code: `z.num().positive().parse(1);
z.num().nonnegative().parse(0);
z.num().negative().parse(-1);` },
        { kind: "h3", text: "multipleOf / step" },
        { kind: "code", code: `z.num().multipleOf(0.5).parse(2.5);
z.num().step(0.25).parse(1.0);` },
        { kind: "callout", variant: "tip", text: "Use z.num() quando aceitar tanto 7 quanto 7.0 — o tipo num do Dart cobre int e double." },
      ]
    ),
  },
  {
    id: "booleans",
    group: "core",
    title: bi("Booleans (ZBool)", "Booleans (ZBool)"),
    blocks: bi(
      [
        { kind: "p", text: "ZBool is a strict boolean validator — it only accepts true or false." },
        { kind: "code", code: `z.bool().parse(true);    // true
z.bool().parse(false);   // false` },
        { kind: "callout", variant: "warning", text: "z.bool() only accepts real bool values. Passing 1, '1', null or '' will throw ZardError. Use z.coerce.bool() if you need to coerce from other types." },
        { kind: "h3", text: "Coercion with z.coerce.bool()" },
        { kind: "p", text: "Use z.coerce.bool() to accept falsy/truthy values from strings, ints, and null." },
        { kind: "code", code: `z.coerce.bool().parse(true);    // true
z.coerce.bool().parse(false);   // false
z.coerce.bool().parse(1);       // true
z.coerce.bool().parse(0);       // false
z.coerce.bool().parse('1');     // true
z.coerce.bool().parse('0');     // false
z.coerce.bool().parse(null);    // false
z.coerce.bool().parse('');      // false` },
      ],
      [
        { kind: "p", text: "ZBool é um validador estrito de booleanos — aceita apenas true ou false." },
        { kind: "code", code: `z.bool().parse(true);    // true
z.bool().parse(false);   // false` },
        { kind: "callout", variant: "warning", text: "z.bool() só aceita valores bool reais. Passar 1, '1', null ou '' lança ZardError. Use z.coerce.bool() se precisar de coerção a partir de outros tipos." },
        { kind: "h3", text: "Coerção com z.coerce.bool()" },
        { kind: "p", text: "Use z.coerce.bool() para aceitar valores falsy/truthy de strings, ints e null." },
        { kind: "code", code: `z.coerce.bool().parse(true);    // true
z.coerce.bool().parse(false);   // false
z.coerce.bool().parse(1);       // true
z.coerce.bool().parse(0);       // false
z.coerce.bool().parse('1');     // true
z.coerce.bool().parse('0');     // false
z.coerce.bool().parse(null);    // false
z.coerce.bool().parse('');      // false` },
      ]
    ),
  },
  {
    id: "lists",
    group: "core",
    title: bi("Lists (ZList)", "Listas (ZList)"),
    blocks: bi(
      [
        { kind: "code", code: `z.list(z.string()).parse(['hello', 'world']);` },
        { kind: "h3", text: "noempty" },
        { kind: "code", code: `z.list(z.int()).noempty().parse([1]);` },
        { kind: "h3", text: "min / max / length" },
        { kind: "code", code: `z.list(z.int()).min(2).parse([1, 2, 3]);
z.list(z.int()).max(2).parse([1, 2]);
z.list(z.int()).length(2).parse([1, 2]);` },
      ],
      [
        { kind: "code", code: `z.list(z.string()).parse(['hello', 'world']);` },
        { kind: "h3", text: "noempty" },
        { kind: "code", code: `z.list(z.int()).noempty().parse([1]);` },
        { kind: "h3", text: "min / max / length" },
        { kind: "code", code: `z.list(z.int()).min(2).parse([1, 2, 3]);
z.list(z.int()).max(2).parse([1, 2]);
z.list(z.int()).length(2).parse([1, 2]);` },
      ]
    ),
  },
  {
    id: "maps",
    group: "core",
    title: bi("Maps / Objects (ZMap)", "Maps / Objetos (ZMap)"),
    blocks: bi(
      [
        { kind: "code", code: `final schema = z.map({
  'name': z.string(),
});
schema.parse({'name': 'John Doe'});` },
        { kind: "h3", text: "strict" },
        { kind: "p", text: "Reject unknown keys not declared in the schema." },
        { kind: "code", code: `final schema = z.map({
  'name': z.string(),
  'age': z.int(),
}).strict();` },
        { kind: "h3", text: "refine" },
        { kind: "code", code: `final schema = z.map({
  'name': z.string(),
  'age': z.int(),
}).refine((value) => value['age'] > 18, message: 'Age must be > 18');` },
        { kind: "h3", text: "keyof" },
        { kind: "code", code: `z.map({'name': z.string(), 'age': z.int()}).keyof();
// ['name', 'age']` },
        { kind: "h3", text: "pick / omit" },
        { kind: "code", code: `final schema = z.map({'name': z.string(), 'age': z.int()});
schema.pick(['name']);   // only name
schema.omit(['name']);   // without name` },
        { kind: "h3", text: "partial / required / merge / extend" },
        { kind: "code", code: `final user = z.map({
  'name': z.string(),
  'age': z.int(),
  'email': z.string().email().optional(),
});

user.partial();                    // all optional
user.partial(keys: ['age']);       // selected optional
user.required();                   // all required
user.merge(z.map({'role': z.string()}));
user.extend({'phone': z.string().optional()});` },
        { kind: "h3", text: "Full example" },
        { kind: "code", code: `final schema = z.map({
  'name': z.string().min(3),
  'age': z.int().min(18).nullable(),
  'email': z.string().email(),
  'isActive': z.bool().nullable(),
});

final map = schema.parse({
  'name': 'John Doe',
  'age': 30,
  'email': 'john.doe@example.com',
  'isActive': true,
});` },
      ],
      [
        { kind: "code", code: `final schema = z.map({
  'name': z.string(),
});
schema.parse({'name': 'John Doe'});` },
        { kind: "h3", text: "strict" },
        { kind: "p", text: "Rejeita chaves não declaradas no schema." },
        { kind: "code", code: `final schema = z.map({
  'name': z.string(),
  'age': z.int(),
}).strict();` },
        { kind: "h3", text: "refine" },
        { kind: "code", code: `final schema = z.map({
  'name': z.string(),
  'age': z.int(),
}).refine((value) => value['age'] > 18, message: 'Idade deve ser > 18');` },
        { kind: "h3", text: "keyof" },
        { kind: "code", code: `z.map({'name': z.string(), 'age': z.int()}).keyof();
// ['name', 'age']` },
        { kind: "h3", text: "pick / omit" },
        { kind: "code", code: `final schema = z.map({'name': z.string(), 'age': z.int()});
schema.pick(['name']);   // apenas name
schema.omit(['name']);   // sem name` },
        { kind: "h3", text: "partial / required / merge / extend" },
        { kind: "code", code: `final user = z.map({
  'name': z.string(),
  'age': z.int(),
  'email': z.string().email().optional(),
});

user.partial();                    // todos opcionais
user.partial(keys: ['age']);       // selecionados opcionais
user.required();                   // todos obrigatórios
user.merge(z.map({'role': z.string()}));
user.extend({'phone': z.string().optional()});` },
        { kind: "h3", text: "Exemplo completo" },
        { kind: "code", code: `final schema = z.map({
  'name': z.string().min(3),
  'age': z.int().min(18).nullable(),
  'email': z.string().email(),
  'isActive': z.bool().nullable(),
});

final map = schema.parse({
  'name': 'John Doe',
  'age': 30,
  'email': 'john.doe@example.com',
  'isActive': true,
});` },
      ]
    ),
  },
  {
    id: "enums",
    group: "core",
    title: bi("Enums (ZEnum)", "Enums (ZEnum)"),
    blocks: bi(
      [
        { kind: "code", code: `final status = z.\$enum(['pending', 'active', 'inactive']);
status.parse('active');` },
        { kind: "h3", text: "extract" },
        { kind: "code", code: `final schema = z.\$enum(['a', 'b', 'c']);
schema.extract(['a', 'b']); // ['a', 'b']` },
        { kind: "h3", text: "exclude" },
        { kind: "code", code: `final schema = z.\$enum(['a', 'b', 'c']);
schema.exclude(['a', 'b']); // ['c']` },
      ],
      [
        { kind: "code", code: `final status = z.\$enum(['pending', 'active', 'inactive']);
status.parse('active');` },
        { kind: "h3", text: "extract" },
        { kind: "code", code: `final schema = z.\$enum(['a', 'b', 'c']);
schema.extract(['a', 'b']); // ['a', 'b']` },
        { kind: "h3", text: "exclude" },
        { kind: "code", code: `final schema = z.\$enum(['a', 'b', 'c']);
schema.exclude(['a', 'b']); // ['c']` },
      ]
    ),
  },
  {
    id: "interfaces",
    group: "core",
    title: bi("Interfaces (ZInterface)", "Interfaces (ZInterface)"),
    blocks: bi(
      [
        { kind: "p", text: "ZInterface lets you write an interface-like syntax where keys ending with '?' become nullable. It is converted internally to a regular ZMap." },
        { kind: "code", code: `final schema = z.interface({
  'name': z.string().min(3).max(20),
  'email': z.string().email(),
  'friends?': z.list(z.int()),
});

// Equivalent to:
final schema = z.map({
  'name': z.string().min(3).max(20),
  'email': z.string().email(),
  'friends': z.list(z.int()).nullable(),
});` },
      ],
      [
        { kind: "p", text: "ZInterface permite uma sintaxe similar a uma interface onde chaves terminadas em '?' viram nullable. Internamente é convertida para um ZMap regular." },
        { kind: "code", code: `final schema = z.interface({
  'name': z.string().min(3).max(20),
  'email': z.string().email(),
  'friends?': z.list(z.int()),
});

// Equivalente a:
final schema = z.map({
  'name': z.string().min(3).max(20),
  'email': z.string().email(),
  'friends': z.list(z.int()).nullable(),
});` },
      ]
    ),
  },
  {
    id: "dates",
    group: "core",
    title: bi("Dates", "Datas"),
    blocks: bi(
      [
        { kind: "code", code: `final schema = z.date();
schema.parse(DateTime.now());

final result = schema.safeParse('2025-11-26');
if (result.success) print(result.data);` },
      ],
      [
        { kind: "code", code: `final schema = z.date();
schema.parse(DateTime.now());

final result = schema.safeParse('2025-11-26');
if (result.success) print(result.data);` },
      ]
    ),
  },

  {
    id: "union",
    group: "core",
    title: bi("Union (ZUnion)", "Union (ZUnion)"),
    blocks: bi(
      [
        { kind: "p", text: "ZUnion tries each schema in order and returns the first successful parse. Perfect for fields that can hold multiple types." },
        { kind: "code", code: `final schema = z.union([z.string(), z.int()]);
schema.parse('hello');  // 'hello'
schema.parse(42);       // 42` },
        { kind: "h3", text: "Complex union example" },
        { kind: "code", code: `final idSchema = z.union([
  z.string().uuid(),
  z.int().positive(),
]);

idSchema.parse('550e8400-e29b-41d4-a716-446655440000'); // UUID string
idSchema.parse(1234);                                    // positive int` },
        { kind: "note", text: "If no schema matches, ZardError is thrown with union_error type, along with the collected issues from all attempted schemas." },
      ],
      [
        { kind: "p", text: "ZUnion tenta cada schema em ordem e retorna o primeiro parse bem-sucedido. Ideal para campos que podem ter múltiplos tipos." },
        { kind: "code", code: `final schema = z.union([z.string(), z.int()]);
schema.parse('hello');  // 'hello'
schema.parse(42);       // 42` },
        { kind: "h3", text: "Exemplo complexo de union" },
        { kind: "code", code: `final idSchema = z.union([
  z.string().uuid(),
  z.int().positive(),
]);

idSchema.parse('550e8400-e29b-41d4-a716-446655440000'); // UUID string
idSchema.parse(1234);                                    // int positivo` },
        { kind: "note", text: "Se nenhum schema casar, ZardError é lançado com union_error, incluindo os issues coletados de todas as tentativas." },
      ]
    ),
  },
  {
    id: "file",
    group: "core",
    title: bi("Files (ZFile)", "Arquivos (ZFile)"),
    blocks: bi(
      [
        { kind: "p", text: "ZFile validates dart:io File objects. Useful for upload endpoints, CLI tools, and any code that works with the filesystem." },
        { kind: "code", code: `import 'dart:io';

final schema = z.file();
schema.parse(File('path/to/file.txt'));` },
        { kind: "h3", text: "min / max (bytes)" },
        { kind: "code", code: `z.file().min(1024).parse(file);              // at least 1 KB
z.file().max(5 * 1024 * 1024).parse(file);   // at most 5 MB` },
        { kind: "h3", text: "mime" },
        { kind: "p", text: "Restrict accepted file types by MIME type. Accepts a single string or a list." },
        { kind: "code", code: `z.file().mime('image/png').parse(file);
z.file().mime(['image/png', 'image/jpeg']).parse(file);` },
        { kind: "h3", text: "Combined example" },
        { kind: "code", code: `final avatarSchema = z.file()
  .min(1024)                                    // at least 1 KB
  .max(2 * 1024 * 1024)                         // at most 2 MB
  .mime(['image/png', 'image/jpeg', 'image/webp']);

final result = avatarSchema.safeParse(uploadedFile);` },
        { kind: "callout", variant: "warning", text: "MIME detection requires the mime package. The internal _getMimeType() method must be implemented — out of the box it returns null and MIME validation is skipped." },
      ],
      [
        { kind: "p", text: "ZFile valida objetos File do dart:io. Útil para endpoints de upload, ferramentas CLI e qualquer código que trabalhe com o sistema de arquivos." },
        { kind: "code", code: `import 'dart:io';

final schema = z.file();
schema.parse(File('caminho/para/arquivo.txt'));` },
        { kind: "h3", text: "min / max (bytes)" },
        { kind: "code", code: `z.file().min(1024).parse(file);              // no mínimo 1 KB
z.file().max(5 * 1024 * 1024).parse(file);   // no máximo 5 MB` },
        { kind: "h3", text: "mime" },
        { kind: "p", text: "Restrinja os tipos de arquivo aceitos por MIME type. Aceita uma string ou uma lista." },
        { kind: "code", code: `z.file().mime('image/png').parse(file);
z.file().mime(['image/png', 'image/jpeg']).parse(file);` },
        { kind: "h3", text: "Exemplo combinado" },
        { kind: "code", code: `final avatarSchema = z.file()
  .min(1024)                                    // no mínimo 1 KB
  .max(2 * 1024 * 1024)                         // no máximo 2 MB
  .mime(['image/png', 'image/jpeg', 'image/webp']);

final result = avatarSchema.safeParse(uploadedFile);` },
        { kind: "callout", variant: "warning", text: "A detecção de MIME requer o pacote mime. O método interno _getMimeType() precisa ser implementado — por padrão retorna null e a validação de MIME é ignorada." },
      ]
    ),
  },

  // ============== VALIDATION ==============
  {
    id: "email",
    group: "validation",
    title: bi("Email validation", "Validação de email"),
    blocks: bi(
      [
        { kind: "p", text: "Reusable email patterns. Choose one based on your strictness needs." },
        { kind: "ul", items: [
          "html5Email — browser-default; allows single-label domains (john@example).",
          "email — strict; requires a TLD (john@example.com).",
          "rfc5322Email — full RFC 5322 (quoted local-parts, tags).",
          "unicodeEmail — permissive for non-ASCII characters.",
        ] },
        { kind: "code", code: `z.string().email().parse('john@example');
z.string().email(pattern: z.regexes.email).parse('john@example.com');
z.string().email(pattern: z.regexes.rfc5322Email).parse('"john.doe"@example.co.uk');
z.string().email(pattern: z.regexes.unicodeEmail).parse('usuário@exemplo.com');` },
      ],
      [
        { kind: "p", text: "Padrões de email reutilizáveis. Escolha conforme o nível de exigência." },
        { kind: "ul", items: [
          "html5Email — padrão do navegador; permite domínios sem TLD.",
          "email — estrito; exige TLD (john@example.com).",
          "rfc5322Email — RFC 5322 completo.",
          "unicodeEmail — permissivo para caracteres não-ASCII.",
        ] },
        { kind: "code", code: `z.string().email().parse('john@example');
z.string().email(pattern: z.regexes.email).parse('john@example.com');
z.string().email(pattern: z.regexes.rfc5322Email).parse('"john.doe"@example.co.uk');
z.string().email(pattern: z.regexes.unicodeEmail).parse('usuário@exemplo.com');` },
      ]
    ),
  },
  {
    id: "url",
    group: "validation",
    title: bi("URL validation", "Validação de URL"),
    blocks: bi(
      [
        { kind: "code", code: `z.string().url().parse('https://www.example.com');

z.string().url(
  hostname: RegExp(r'^[\\w\\.-]+\\.example\\.com\$'),
).parse('https://api.example.com/path');

z.string().url(
  protocol: RegExp(r'^https:\\/\\/'),
).parse('https://secure.example.com');` },
        { kind: "note", text: "Anchors ^ and $ in your RegExp are stripped internally to avoid double-anchoring." },
      ],
      [
        { kind: "code", code: `z.string().url().parse('https://www.example.com');

z.string().url(
  hostname: RegExp(r'^[\\w\\.-]+\\.example\\.com\$'),
).parse('https://api.example.com/path');

z.string().url(
  protocol: RegExp(r'^https:\\/\\/'),
).parse('https://secure.example.com');` },
        { kind: "note", text: "Âncoras ^ e $ na sua RegExp são removidas internamente para evitar duplicação." },
      ]
    ),
  },
  {
    id: "iso",
    group: "validation",
    title: bi("ISO 8601 & advanced strings", "ISO 8601 e strings avançadas"),
    blocks: bi(
      [
        { kind: "code", code: `z.iso.date().parse('2021-01-01');
z.iso.time().parse('12:30:45');
z.iso.datetime().parse('2021-01-01T12:30:45Z');
z.iso.duration().parse('P1Y2M3DT4H5M6S');` },
        { kind: "h3", text: "Advanced string validators" },
        { kind: "ul", items: [
          "Identifiers: guid(), uuid(version), nanoid(), ulid()",
          "Networks: httpUrl(), hostname(), ipv4(), ipv6(), mac(), cidrv4(), cidrv6()",
          "Encodings: base64(), base64url(), hex(), hash('sha256'), jwt()",
          "Other: emoji() — single emoji",
        ] },
        { kind: "code", code: `z.string().uuid(version: 'v4').parse('550e8400-e29b-41d4-a716-446655440000');
z.string().ipv4().parse('192.168.1.2');
z.string().mac().parse('AA:BB:CC:DD:EE:FF');
z.string().jwt().parse('eyJhbGciOi...');
z.string().emoji().parse('😀');` },
      ],
      [
        { kind: "code", code: `z.iso.date().parse('2021-01-01');
z.iso.time().parse('12:30:45');
z.iso.datetime().parse('2021-01-01T12:30:45Z');
z.iso.duration().parse('P1Y2M3DT4H5M6S');` },
        { kind: "h3", text: "Validadores de string avançados" },
        { kind: "ul", items: [
          "Identificadores: guid(), uuid(version), nanoid(), ulid()",
          "Redes: httpUrl(), hostname(), ipv4(), ipv6(), mac(), cidrv4(), cidrv6()",
          "Codificações: base64(), base64url(), hex(), hash('sha256'), jwt()",
          "Outros: emoji() — emoji único",
        ] },
        { kind: "code", code: `z.string().uuid(version: 'v4').parse('550e8400-e29b-41d4-a716-446655440000');
z.string().ipv4().parse('192.168.1.2');
z.string().mac().parse('AA:BB:CC:DD:EE:FF');
z.string().jwt().parse('eyJhbGciOi...');
z.string().emoji().parse('😀');` },
      ]
    ),
  },

  // ============== ADVANCED ==============
  {
    id: "transform",
    group: "advanced",
    title: bi("transform", "transform"),
    blocks: bi(
      [
        { kind: "p", text: "Apply a transformation that returns the same output type." },
        { kind: "code", code: `final schema = z.string().transform((value) => value.toUpperCase());
schema.parse('hello'); // 'HELLO'` },
      ],
      [
        { kind: "p", text: "Aplica uma transformação mantendo o mesmo tipo de saída." },
        { kind: "code", code: `final schema = z.string().transform((value) => value.toUpperCase());
schema.parse('hello'); // 'HELLO'` },
      ]
    ),
  },
  {
    id: "transformTyped",
    group: "advanced",
    title: bi("transformTyped", "transformTyped"),
    blocks: bi(
      [
        { kind: "p", text: "Transform a value into a different output type — perfect for converting parsed data into your domain classes." },
        { kind: "code", code: `final schema = z.interface({
  'name': z.string().min(3).max(20),
  'email': z.string().email(),
}).transformTyped((json) => User.fromMap(json));

final user = schema.parse({
  'name': 'John Doe',
  'email': 'john.doe@example.com',
});
// user is an instance of User` },
      ],
      [
        { kind: "p", text: "Transforma um valor em outro tipo — ideal para converter dados parseados nas suas classes de domínio." },
        { kind: "code", code: `final schema = z.interface({
  'name': z.string().min(3).max(20),
  'email': z.string().email(),
}).transformTyped((json) => User.fromMap(json));

final user = schema.parse({
  'name': 'John Doe',
  'email': 'john.doe@example.com',
});
// user é uma instância de User` },
      ]
    ),
  },
  {
    id: "refine",
    group: "advanced",
    title: bi("refine", "refine"),
    blocks: bi(
      [
        { kind: "p", text: "Add custom validation logic with a predicate. Works on any schema." },
        { kind: "code", code: `final even = z.int().refine((n) => n % 2 == 0, message: 'Must be even');
even.parse(4);

// Cross-field on a map
final passwords = z.map({
  'password': z.string().min(8),
  'confirm': z.string(),
}).refine(
  (data) => data['password'] == data['confirm'],
  message: 'Passwords must match',
);` },
      ],
      [
        { kind: "p", text: "Adiciona validação customizada com um predicado. Funciona em qualquer schema." },
        { kind: "code", code: `final even = z.int().refine((n) => n % 2 == 0, message: 'Deve ser par');
even.parse(4);

// Validação cruzada em um map
final passwords = z.map({
  'password': z.string().min(8),
  'confirm': z.string(),
}).refine(
  (data) => data['password'] == data['confirm'],
  message: 'As senhas devem coincidir',
);` },
      ]
    ),
  },
  {
    id: "coerce",
    group: "advanced",
    title: bi("coerce & defaults", "coerce e defaults"),
    blocks: bi(
      [
        { kind: "p", text: "Coerce primitive values from common runtime inputs." },
        { kind: "code", code: `z.coerce.int().parse('123');       // 123
z.coerce.double().parse('3.14');   // 3.14
z.coerce.num().parse('3.14');      // 3.14 (num)
z.coerce.bool().parse('true');     // true
z.coerce.string().parse(123);      // '123'
z.coerce.date().parse('2025-11-26');` },
        { kind: "h3", text: "Default values" },
        { kind: "code", code: `final schema = z.map({
  'name': z.string(),
  'status': z.string().\$default('active'),
  'age': z.int().\$default(18),
});

schema.parse({'name': 'John'});
// { name: John, status: active, age: 18 }` },
      ],
      [
        { kind: "p", text: "Faz coerção de valores primitivos a partir de entradas comuns." },
        { kind: "code", code: `z.coerce.int().parse('123');       // 123
z.coerce.double().parse('3.14');   // 3.14
z.coerce.num().parse('3.14');      // 3.14 (num)
z.coerce.bool().parse('true');     // true
z.coerce.string().parse(123);      // '123'
z.coerce.date().parse('2025-11-26');` },
        { kind: "h3", text: "Valores padrão" },
        { kind: "code", code: `final schema = z.map({
  'name': z.string(),
  'status': z.string().\$default('active'),
  'age': z.int().\$default(18),
});

schema.parse({'name': 'John'});
// { name: John, status: active, age: 18 }` },
      ]
    ),
  },
  {
    id: "lazy",
    group: "advanced",
    title: bi("lazy & recursion", "lazy e recursão"),
    blocks: bi(
      [
        { kind: "p", text: "Use z.lazy() to define recursive or self-referential schemas without circular dependencies." },
        { kind: "code", code: `Schema<User> getUserSchema() {
  return z.interface({
    'name': z.string().min(3).max(20),
    'email': z.string().email(),
    'friends?': z.lazy(() => getUserSchema().list()),
  }).transformTyped((json) => User.fromMap(json));
}

final user = getUserSchema().parse({
  'name': 'John Doe',
  'email': 'john.doe@example.com',
  'friends': [
    {
      'name': 'Jane Doe',
      'email': 'jane.doe@example.com',
      'friends': [
        {'name': 'Evan Doe', 'email': 'evan.doe@example.com'},
      ],
    },
  ],
});

print(user?.friends.first.friends.first.name);` },
        { kind: "h3", text: "Optional / nullable / nullish" },
        { kind: "code", code: `final schema = z.map({
  'name': z.string(),
  'nickname': z.string().optional(),
  'middleName': z.string().nullable(),
  'age': z.int().nullish(),
});` },
      ],
      [
        { kind: "p", text: "Use z.lazy() para schemas recursivos ou auto-referenciados sem dependências circulares." },
        { kind: "code", code: `Schema<User> getUserSchema() {
  return z.interface({
    'name': z.string().min(3).max(20),
    'email': z.string().email(),
    'friends?': z.lazy(() => getUserSchema().list()),
  }).transformTyped((json) => User.fromMap(json));
}

final user = getUserSchema().parse({
  'name': 'John Doe',
  'email': 'john.doe@example.com',
  'friends': [
    {
      'name': 'Jane Doe',
      'email': 'jane.doe@example.com',
      'friends': [
        {'name': 'Evan Doe', 'email': 'evan.doe@example.com'},
      ],
    },
  ],
});

print(user?.friends.first.friends.first.name);` },
        { kind: "h3", text: "Optional / nullable / nullish" },
        { kind: "code", code: `final schema = z.map({
  'name': z.string(),
  'nickname': z.string().optional(),
  'middleName': z.string().nullable(),
  'age': z.int().nullish(),
});` },
      ]
    ),
  },
  {
    id: "inferType",
    group: "advanced",
    title: bi("inferType", "inferType"),
    blocks: bi(
      [
        { kind: "p", text: "Combine a ZMap schema with a factory function to parse and convert into a custom class in one step." },
        { kind: "code", code: `class User {
  final String name;
  final String email;
  User({required this.name, required this.email});
  factory User.fromMap(Map m) =>
      User(name: m['name'], email: m['email']);
}

final userSchema = z.inferType(
  fromMap: (json) => User.fromMap(json),
  mapSchema: z.map({
    'name': z.string().min(3),
    'email': z.string().email(),
  }),
);

final user = userSchema.parse({
  'name': 'John Doe',
  'email': 'john.doe@example.com',
});

print('User created: \${user.name}, \${user.email}');` },
      ],
      [
        { kind: "p", text: "Combina um schema ZMap com uma factory para parsear e converter em uma classe customizada em uma única etapa." },
        { kind: "code", code: `class User {
  final String name;
  final String email;
  User({required this.name, required this.email});
  factory User.fromMap(Map m) =>
      User(name: m['name'], email: m['email']);
}

final userSchema = z.inferType(
  fromMap: (json) => User.fromMap(json),
  mapSchema: z.map({
    'name': z.string().min(3),
    'email': z.string().email(),
  }),
);

final user = userSchema.parse({
  'name': 'John Doe',
  'email': 'john.doe@example.com',
});

print('Usuário criado: \${user.name}, \${user.email}');` },
      ]
    ),
  },
  {
    id: "full-example",
    group: "advanced",
    title: bi("Full example", "Exemplo completo"),
    blocks: bi(
      [
        { kind: "p", text: "Putting it all together: nested maps, lists, transforms and validators." },
        { kind: "code", code: `import 'package:zard/zard.dart';

final userSchema = z.map({
  'name': z.string().transform((value) => value.toUpperCase()),
  'age': z.int(),
  'sallary': z.double(),
  'email': z.string().email(message: 'Must be a valid email'),
  'tags': z.list(z.string().transform((value) => '#\$value')),
  'birthday': z.date().optional(),
  'addresses': z.list(
    z.map({
      'street': z.string(),
      'city': z.string().transform((value) => value.toUpperCase()),
    }),
  ),
});

final user = userSchema.parse({
  'name': 'John Doe',
  'age': 30,
  'sallary': 5000.0,
  'email': 'john.doe@example.com',
  'tags': ['#dart', '#flutter'],
  'birthday': DateTime.now(),
  'addresses': [
    {'street': '123 Main St', 'city': 'SPRINGFIELD'},
    {'street': '456 Elm St', 'city': 'SHELBYVILLE'},
  ],
});

print(user);` },
      ],
      [
        { kind: "p", text: "Juntando tudo: maps aninhados, listas, transforms e validadores." },
        { kind: "code", code: `import 'package:zard/zard.dart';

final userSchema = z.map({
  'name': z.string().transform((value) => value.toUpperCase()),
  'age': z.int(),
  'sallary': z.double(),
  'email': z.string().email(message: 'Deve ser um email válido'),
  'tags': z.list(z.string().transform((value) => '#\$value')),
  'birthday': z.date().optional(),
  'addresses': z.list(
    z.map({
      'street': z.string(),
      'city': z.string().transform((value) => value.toUpperCase()),
    }),
  ),
});

final user = userSchema.parse({
  'name': 'John Doe',
  'age': 30,
  'sallary': 5000.0,
  'email': 'john.doe@example.com',
  'tags': ['#dart', '#flutter'],
  'birthday': DateTime.now(),
  'addresses': [
    {'street': '123 Main St', 'city': 'SPRINGFIELD'},
    {'street': '456 Elm St', 'city': 'SHELBYVILLE'},
  ],
});

print(user);` },
      ]
    ),
  },

  // ============== REFERENCE ==============
  {
    id: "errors",
    group: "reference",
    title: bi("Error Handling", "Tratamento de erros"),
    blocks: bi(
      [
        { kind: "p", text: "When validation fails, Zard throws ZardError. Each ZardIssue contains:" },
        { kind: "ul", items: [
          "message — descriptive message about what went wrong",
          "type — error type (min_error, max_error, type_error, required_error)",
          "value — the value that failed validation",
          "path — dot-notation path to the failing field (e.g. address.zip)",
        ] },
        { kind: "h3", text: "ZardResult" },
        { kind: "table", headers: ["Member", "Description"], rows: [
          ["result.success", "true if parsing succeeded"],
          ["result.data", "Parsed value (non-null when success is true)"],
          ["result.error", "ZardError (non-null when success is false)"],
          ["result.unwrap()", "Returns data or throws ZardError"],
          ["result.unwrapOrNull()", "Returns data or null"],
          ["result.when(success:, error:)", "Pattern-match on success/failure"],
        ] },
        { kind: "code", code: `final result = schema.safeParse({'name': 'A', 'age': -1});

try { result.unwrap(); } on ZardError catch (e) {
  print('Failed: \${e.issues.length} issues');
}

print(result.unwrapOrNull()); // null

result.when(
  success: (data) => print('ok: \$data'),
  error: (err) => print('fail: \${err.issues.first.message}'),
);` },
        { kind: "h3", text: "Error formatting" },
        { kind: "code", code: `final flat = z.flattenError(result.error!);
flat.formErrors;
flat.fieldErrors;
flat.firstErrors;

final tree = z.treeifyError(result.error!);
tree.errors;
tree.properties?['name']?.errors;

print(z.prettifyError(result.error!));` },
      ],
      [
        { kind: "p", text: "Quando a validação falha, Zard lança ZardError. Cada ZardIssue contém:" },
        { kind: "ul", items: [
          "message — mensagem descritiva do que deu errado",
          "type — tipo do erro (min_error, max_error, type_error, required_error)",
          "value — o valor que falhou na validação",
          "path — caminho em notação por ponto até o campo (ex.: address.zip)",
        ] },
        { kind: "h3", text: "ZardResult" },
        { kind: "table", headers: ["Membro", "Descrição"], rows: [
          ["result.success", "true se o parse foi bem-sucedido"],
          ["result.data", "Valor parseado (não-nulo quando success é true)"],
          ["result.error", "ZardError (não-nulo quando success é false)"],
          ["result.unwrap()", "Retorna data ou lança ZardError"],
          ["result.unwrapOrNull()", "Retorna data ou null"],
          ["result.when(success:, error:)", "Pattern-match em sucesso/falha"],
        ] },
        { kind: "code", code: `final result = schema.safeParse({'name': 'A', 'age': -1});

try { result.unwrap(); } on ZardError catch (e) {
  print('Falhou: \${e.issues.length} issues');
}

print(result.unwrapOrNull()); // null

result.when(
  success: (data) => print('ok: \$data'),
  error: (err) => print('fail: \${err.issues.first.message}'),
);` },
        { kind: "h3", text: "Formatação de erros" },
        { kind: "code", code: `final flat = z.flattenError(result.error!);
flat.formErrors;
flat.fieldErrors;
flat.firstErrors;

final tree = z.treeifyError(result.error!);
tree.errors;
tree.properties?['name']?.errors;

print(z.prettifyError(result.error!));` },
      ]
    ),
  },
];

export function getDocSections(lang: Lang): DocSection[] {
  return SECTIONS.map((s) => ({
    id: s.id,
    group: s.group,
    title: s.title[lang],
    blocks: s.blocks[lang],
  }));
}

// Backwards compat (English default).
export const DOC_SECTIONS: DocSection[] = getDocSections("en");
