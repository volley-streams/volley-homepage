import { useCallback, useEffect, useRef, useState } from "react";
import { links } from "../content";

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(() => {
          setScrolled(window.scrollY > 8);
          ticking = false;
        });
      }
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close on Escape key
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, close]);

  // Close on click outside menu
  useEffect(() => {
    if (!open) return;
    const onClick = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        close();
      }
    };
    window.addEventListener("click", onClick);
    return () => window.removeEventListener("click", onClick);
  }, [open, close]);

  // Lock body scroll when menu is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
      return () => { document.body.style.overflow = ""; };
    }
  }, [open]);

  return (
    <header
      className={[
        "sticky top-0 z-40 w-full transition-all duration-300",
        scrolled
          ? "border-b border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-950"
          : "border-b border-transparent",
      ].join(" ")}
    >
      <div className="container-page flex h-16 items-center justify-between">
        <a
          href="#top"
          className="group flex items-center gap-2.5 text-slate-900 dark:text-white"
        >
          <span className="text-lg font-bold tracking-tight">Volley</span>
        </a>

        <nav className="hidden items-center gap-1 md:flex">
          <a
            href="#features"
            className="rounded-md px-3 py-2 text-sm font-medium text-slate-600 transition hover:text-slate-900 dark:text-slate-300 dark:hover:text-white"
          >
            Features
          </a>
          <a
            href="#code"
            className="rounded-md px-3 py-2 text-sm font-medium text-slate-600 transition hover:text-slate-900 dark:text-slate-300 dark:hover:text-white"
          >
            Example
          </a>
          <a
            href={links.docs}
            className="rounded-md px-3 py-2 text-sm font-medium text-slate-600 transition hover:text-slate-900 dark:text-slate-300 dark:hover:text-white"
          >
            Docs
          </a>
          <a
            href={links.github}
            target="_blank"
            rel="noreferrer"
            className="btn btn-primary ml-2 !py-2 !px-4 text-xs"
          >
            <GithubIcon className="h-4 w-4" />
            GitHub
          </a>
        </nav>

        <button
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="inline-flex h-11 w-11 items-center justify-center rounded-md border border-slate-200 text-slate-700 transition hover:bg-slate-50 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800 md:hidden"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            {open ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 7h16M4 12h16M4 17h16"
              />
            )}
          </svg>
        </button>
      </div>

      {open && (
        <div ref={menuRef} className="border-t border-slate-200 bg-white md:hidden dark:border-slate-800 dark:bg-slate-950">
          <div className="container-page flex flex-col gap-1 py-3">
            {[
              { href: "#features", label: "Features" },
              { href: "#code", label: "Example" },
              { href: links.docs, label: "Documentation" },
              { href: links.quickstart, label: "Quickstart" },
              { href: links.github, label: "GitHub" },
            ].map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={() => setOpen(false)}
                className="rounded-md px-3 py-3 text-sm font-medium text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800"
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}

function GithubIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 2C6.477 2 2 6.486 2 12.02c0 4.427 2.865 8.184 6.839 9.504.5.093.683-.217.683-.483 0-.237-.009-.868-.014-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.339-2.22-.254-4.555-1.113-4.555-4.953 0-1.094.39-1.989 1.029-2.69-.103-.253-.446-1.272.098-2.651 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.748-1.026 2.748-1.026.546 1.379.202 2.398.1 2.651.64.701 1.028 1.596 1.028 2.69 0 3.85-2.338 4.696-4.566 4.945.359.31.679.922.679 1.858 0 1.341-.012 2.422-.012 2.751 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.02C22 6.486 17.523 2 12 2Z"
      />
    </svg>
  );
}
