// Lightweight Dart syntax highlighter (regex-based, returns HTML)
const KEYWORDS = [
  'final', 'var', 'void', 'late', 'const', 'import', 'as', 'class', 'extends',
  'implements', 'with', 'return', 'if', 'else', 'for', 'while', 'try', 'catch',
  'on', 'throw', 'async', 'await', 'true', 'false', 'null', 'new', 'this',
  'Future', 'List', 'Map', 'String', 'int', 'double', 'bool', 'DateTime', 'RegExp',
];

function escapeHtml(s: string) {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

export function highlightDart(code: string): string {
  // Tokenize using a single regex with named alternatives
  const re = new RegExp(
    [
      `(?<comment>\\/\\/[^\\n]*|\\/\\*[\\s\\S]*?\\*\\/)`,
      `(?<string>'(?:\\\\.|[^'\\\\\\n])*'|"(?:\\\\.|[^"\\\\\\n])*")`,
      `(?<number>\\b\\d+(?:\\.\\d+)?\\b)`,
      `(?<kw>\\b(?:${KEYWORDS.join('|')})\\b)`,
      `(?<fn>\\b[a-zA-Z_$][\\w$]*(?=\\s*\\())`,
      `(?<prop>\\.[a-zA-Z_$][\\w$]*)`,
      `(?<punct>[{}()\\[\\];,:=<>!?+\\-*/&|])`,
    ].join('|'),
    'g'
  );

  let out = '';
  let last = 0;
  let m: RegExpExecArray | null;
  while ((m = re.exec(code)) !== null) {
    if (m.index > last) out += escapeHtml(code.slice(last, m.index));
    const g = m.groups || {};
    const raw = escapeHtml(m[0]);
    if (g.comment) out += `<span class="tok-comment">${raw}</span>`;
    else if (g.string) out += `<span class="tok-string">${raw}</span>`;
    else if (g.number) out += `<span class="tok-number">${raw}</span>`;
    else if (g.kw) out += `<span class="tok-keyword">${raw}</span>`;
    else if (g.fn) out += `<span class="tok-fn">${raw}</span>`;
    else if (g.prop) out += `<span class="tok-prop">${raw}</span>`;
    else if (g.punct) out += `<span class="tok-punct">${raw}</span>`;
    else out += raw;
    last = m.index + m[0].length;
  }
  if (last < code.length) out += escapeHtml(code.slice(last));
  return out;
}
