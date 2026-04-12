import { links } from "../content";

const quickstart = `# Install the CLI
$ cargo install --git \\
    https://github.com/volley-streams/volley \\
    volley-cli

# Scaffold a new project
$ volley new my-pipeline
$ cd my-pipeline

# Start developing
$ $EDITOR src/main.rs

# Run your pipeline
$ cargo run`;

export default function Hero() {
  return (
    <section id="top" className="relative pt-20 sm:pt-28 lg:pt-36">
      <div className="container-page">
        <div className="grid items-center gap-12 md:grid-cols-12 md:gap-16">
          <div className="min-w-0 md:col-span-5">
            <p className="animate-fade-in-down text-sm font-medium text-slate-500 dark:text-slate-400">
              v0.8 · Apache 2.0
            </p>

            <h1 className="mt-6 animate-fade-in-up text-balance text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl dark:text-white">
              Stream processing in Rust.
            </h1>

            <p
              className="mt-6 animate-fade-in-up text-pretty text-lg text-slate-600 dark:text-slate-400"
              style={{ animationDelay: "120ms" }}
            >
              Built on Apache Arrow and DataFusion. Typed DataStream API,
              vectorized operators, embedded ML inference, and per-record
              OpenTelemetry tracing. Inspired by Apache Flink.
            </p>

            <div
              className="mt-8 animate-fade-in-up"
              style={{ animationDelay: "220ms" }}
            >
              <a href={links.quickstart} target="_blank" rel="noreferrer" className="btn btn-primary">
                Get started
                <svg
                  className="h-4 w-4"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                  />
                </svg>
              </a>
            </div>
          </div>

          <div
            className="min-w-0 animate-fade-in-up md:col-span-7"
            style={{ animationDelay: "300ms" }}
          >
            <div className="overflow-hidden rounded-xl border border-slate-200 bg-slate-950 dark:border-slate-700">
              <div className="flex items-center border-b border-slate-800 px-4 py-3">
                <span className="font-mono text-xs text-slate-500">
                  quickstart
                </span>
              </div>
              <pre className="code-scroll-hint overflow-x-auto p-4 font-mono text-[12px] leading-relaxed text-slate-300 sm:p-5 sm:text-[13px]">
                <code dangerouslySetInnerHTML={{ __html: highlightShell(quickstart) }} />
              </pre>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function highlightShell(code: string): string {
  const escape = (s: string) =>
    s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

  return code
    .split("\n")
    .map((line) => {
      const trimmed = line.trimStart();
      if (trimmed.startsWith("#")) {
        return `<span class="text-slate-500">${escape(line)}</span>`;
      }
      if (trimmed.startsWith("$")) {
        const cmd = line.slice(line.indexOf("$") + 2);
        const prefix = line.slice(0, line.indexOf("$") + 2);
        return `<span class="text-slate-500">${escape(prefix)}</span>${highlightCommand(cmd)}`;
      }
      // continuation line (starts with spaces, follows a \)
      return highlightCommand(line);
    })
    .join("\n");
}

function highlightCommand(cmd: string): string {
  const escape = (s: string) =>
    s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

  return escape(cmd)
    .replace(
      /\b(cargo|volley|cd)\b/g,
      '<span class="text-white font-medium">$1</span>',
    )
    .replace(
      /\b(install|new|run)\b/g,
      '<span class="text-brand-300">$1</span>',
    )
    .replace(
      /(--git)/g,
      '<span class="text-slate-400">$1</span>',
    )
    .replace(
      /(\$EDITOR)/g,
      '<span class="text-amber-300">$1</span>',
    )
    .replace(
      /(https:\/\/[^\s\\]+)/g,
      '<span class="text-slate-400">$1</span>',
    )
    .replace(
      /\b(my-pipeline|src\/main\.rs)\b/g,
      '<span class="text-emerald-300">$1</span>',
    );
}
