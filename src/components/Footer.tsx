import { links } from "../content";

export default function Footer() {
  return (
    <footer className="py-12">
      <div className="container-page">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          <div className="max-w-sm">
            <span className="text-base font-bold tracking-tight text-slate-900 dark:text-white">
              Volley
            </span>
            <p className="mt-3 text-sm text-slate-600 dark:text-slate-400">
              A high-performance stream processing framework built in Rust.
              Licensed under Apache 2.0.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 text-sm min-[400px]:grid-cols-2 sm:grid-cols-3">
            <FooterColumn
              heading="Get started"
              items={[
                { label: "Quickstart", href: links.quickstart },
                { label: "Documentation", href: links.docs },
                { label: "Kubernetes", href: links.kubernetes },
              ]}
            />
            <FooterColumn
              heading="Reference"
              items={[
                { label: "Architecture", href: links.architecture },
                { label: "Crate map", href: links.crateMap },
                { label: "AI agents", href: links.agents },
              ]}
            />
            <FooterColumn
              heading="Community"
              items={[
                { label: "GitHub", href: links.github },
                { label: "Contributing", href: links.contributing },
                { label: "License", href: links.license },
              ]}
            />
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-slate-200 pt-6 text-xs text-slate-500 dark:border-slate-800 dark:text-slate-500 sm:flex-row">
          <p>© {new Date().getFullYear()} Volley contributors.</p>
          <p className="flex items-center gap-1.5">
            Built with
            <span className="text-rose-500">♥</span>
            in Rust.
          </p>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({
  heading,
  items,
}: {
  heading: string;
  items: { label: string; href: string }[];
}) {
  return (
    <div>
      <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
        {heading}
      </h3>
      <ul className="mt-4 space-y-2.5">
        {items.map((item) => (
          <li key={item.label}>
            <a
              href={item.href}
              target={item.href.startsWith("http") ? "_blank" : undefined}
              rel={item.href.startsWith("http") ? "noreferrer" : undefined}
              className="text-slate-600 transition hover:text-slate-900 dark:text-slate-300 dark:hover:text-white"
            >
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
