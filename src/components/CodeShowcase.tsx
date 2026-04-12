import { useState } from "react";
import { codeSample } from "../content";

export default function CodeShowcase() {
  const [copied, setCopied] = useState(false);

  const onCopy = async () => {
    try {
      await navigator.clipboard.writeText(codeSample);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      // noop — clipboard permission denied
    }
  };

  return (
    <section
      id="code"
      className="relative border-y border-slate-200 bg-slate-950 py-20 dark:border-slate-800 sm:py-28"
      aria-label="Code example"
    >
      <div className="container-page">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-center lg:gap-16">
          <div className="reveal lg:col-span-5">
            <p className="text-sm font-semibold uppercase tracking-widest text-brand-400">
              DataStream API
            </p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Pipelines as code.
            </h2>
            <p className="mt-4 text-base text-slate-400">
              A Volley pipeline is a sequence of method calls on an
              environment. Sources, operators, and sinks compose through a
              typestate builder, so the compiler rejects pipelines that are
              missing a sink or add operators after one.
            </p>
            <p className="mt-4 text-base text-slate-400">
              Apache Flink's community made the same observation years ago:
              for pipelines beyond a handful of joins, DataStream code reads
              and refactors better than SQL. Volley starts from that premise.
            </p>
            <ul className="mt-6 space-y-3 text-sm text-slate-400">
              <Bullet>
                Expression-based{" "}
                <Code>filter_expr</Code>, <Code>select_expr</Code>, and{" "}
                <Code>aggregate_expr</Code> evaluate on DataFusion.
              </Bullet>
              <Bullet>
                Windowing, keyed state, and watermarks are first-class
                operators on the builder chain.
              </Bullet>
              <Bullet>
                The same pipeline runs single-node or distributed across
                Kubernetes with Arrow Flight shuffle.
              </Bullet>
            </ul>
          </div>

          <div className="reveal lg:col-span-7" style={{ transitionDelay: "120ms" }}>
            <div className="group relative overflow-hidden rounded-xl border border-slate-700 bg-slate-900">
              {/* Terminal chrome */}
              <div className="flex items-center justify-between border-b border-slate-800 px-4 py-3">
                <span className="font-mono text-xs text-slate-500">
                  main.rs
                </span>
                <button
                  type="button"
                  onClick={onCopy}
                  className="inline-flex items-center gap-1.5 rounded-md border border-slate-700 px-2.5 py-1 text-xs font-medium text-slate-400 transition hover:border-slate-600 hover:text-slate-300"
                  aria-live="polite"
                >
                  {copied ? (
                    <>
                      <svg
                        className="h-3 w-3"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="3"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      Copied
                    </>
                  ) : (
                    <>
                      <svg
                        className="h-3 w-3"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <rect
                          x="9"
                          y="9"
                          width="11"
                          height="11"
                          rx="2"
                          ry="2"
                        />
                        <path d="M5 15V5a2 2 0 0 1 2-2h10" />
                      </svg>
                      Copy
                    </>
                  )}
                </button>
              </div>

              <pre className="overflow-x-auto p-4 font-mono text-[12px] leading-relaxed text-slate-200 sm:p-5 sm:text-[13px]">
                <code dangerouslySetInnerHTML={{ __html: highlight(codeSample) }} />
              </pre>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Bullet({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex items-start gap-3">
      <svg
        className="mt-0.5 h-4 w-4 flex-none text-brand-400"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M5 13l4 4L19 7"
        />
      </svg>
      <span>{children}</span>
    </li>
  );
}

function Code({ children }: { children: React.ReactNode }) {
  return (
    <code className="rounded bg-slate-800 px-1 py-0.5 font-mono text-xs text-slate-200">
      {children}
    </code>
  );
}

// Minimal, dependency-free Rust syntax highlighter. Covers keywords, strings,
// numbers, types, attributes, and line comments — enough for a legible
// marketing snippet without pulling in a full highlighter.
function highlight(code: string): string {
  const escape = (s: string) =>
    s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

  const keywords = new Set([
    "use",
    "fn",
    "let",
    "mut",
    "pub",
    "async",
    "await",
    "return",
    "match",
    "if",
    "else",
    "for",
    "in",
    "while",
    "loop",
    "break",
    "continue",
    "struct",
    "enum",
    "impl",
    "trait",
    "mod",
    "as",
    "where",
    "self",
    "Self",
    "move",
    "dyn",
    "ref",
    "const",
    "static",
    "type",
    "unsafe",
  ]);

  const tokens: string[] = [];
  let i = 0;
  while (i < code.length) {
    const ch = code[i];

    // line comment
    if (ch === "/" && code[i + 1] === "/") {
      let j = i;
      while (j < code.length && code[j] !== "\n") j++;
      tokens.push(
        `<span class="text-slate-500 italic">${escape(code.slice(i, j))}</span>`,
      );
      i = j;
      continue;
    }

    // string literal
    if (ch === '"') {
      let j = i + 1;
      while (j < code.length && code[j] !== '"') {
        if (code[j] === "\\") j += 2;
        else j++;
      }
      j = Math.min(j + 1, code.length);
      tokens.push(
        `<span class="text-emerald-300">${escape(code.slice(i, j))}</span>`,
      );
      i = j;
      continue;
    }

    // attribute
    if (ch === "#" && code[i + 1] === "[") {
      let depth = 0;
      let j = i;
      while (j < code.length) {
        if (code[j] === "[") depth++;
        else if (code[j] === "]") {
          depth--;
          if (depth === 0) {
            j++;
            break;
          }
        }
        j++;
      }
      tokens.push(
        `<span class="text-amber-300">${escape(code.slice(i, j))}</span>`,
      );
      i = j;
      continue;
    }

    // number
    if (/[0-9]/.test(ch)) {
      let j = i;
      while (j < code.length && /[0-9_]/.test(code[j])) j++;
      tokens.push(
        `<span class="text-rose-300">${escape(code.slice(i, j))}</span>`,
      );
      i = j;
      continue;
    }

    // identifier / keyword / type
    if (/[A-Za-z_]/.test(ch)) {
      let j = i;
      while (j < code.length && /[A-Za-z0-9_]/.test(code[j])) j++;
      const word = code.slice(i, j);
      if (keywords.has(word)) {
        tokens.push(`<span class="text-violet-300">${escape(word)}</span>`);
      } else if (/^[A-Z]/.test(word)) {
        tokens.push(`<span class="text-sky-300">${escape(word)}</span>`);
      } else if (code[j] === "(" || code[j] === "!") {
        tokens.push(`<span class="text-brand-300">${escape(word)}</span>`);
      } else {
        tokens.push(escape(word));
      }
      i = j;
      continue;
    }

    tokens.push(escape(ch));
    i++;
  }

  return tokens.join("");
}
