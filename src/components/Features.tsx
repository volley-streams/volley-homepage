import { features, type Feature } from "../content";

export default function Features() {
  return (
    <section
      id="features"
      className="relative py-16 sm:py-24 lg:py-28"
      aria-label="Features"
    >
      <div className="container-page">
        <div className="max-w-2xl reveal">
          <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl dark:text-white">
            What Volley does.
          </h2>
          <p className="mt-3 text-base text-slate-600 dark:text-slate-400">
            Four design choices that shape the framework.
          </p>
        </div>

        <div className="reveal mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2">
          {features.map((feature) => (
            <article
              key={feature.title}
              className="rounded-xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900"
            >
              <div className="flex items-center gap-2.5 text-slate-900 dark:text-white">
                <span className="text-slate-400 dark:text-slate-500">
                  <FeatureIcon name={feature.icon} />
                </span>
                <h3 className="text-sm font-semibold">
                  {feature.title}
                </h3>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                {feature.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function FeatureIcon({ name }: { name: Feature["icon"] }) {
  const common = {
    className: "h-4 w-4",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.8,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };

  switch (name) {
    case "bolt":
      return (
        <svg {...common}>
          <rect x="4" y="10" width="3" height="10" rx="0.5" />
          <rect x="10.5" y="6" width="3" height="14" rx="0.5" />
          <rect x="17" y="13" width="3" height="7" rx="0.5" />
          <path d="M3 20h18" />
        </svg>
      );
    case "spark":
      return (
        <svg {...common}>
          <circle cx="5" cy="6" r="1.5" />
          <circle cx="5" cy="12" r="1.5" />
          <circle cx="5" cy="18" r="1.5" />
          <circle cx="13" cy="9" r="1.5" />
          <circle cx="13" cy="15" r="1.5" />
          <circle cx="20" cy="12" r="1.5" />
          <path d="M6.5 6l5 3M6.5 12l5-3M6.5 12l5 3M6.5 18l5-3M14.5 9l4 3M14.5 15l4-3" />
        </svg>
      );
    case "trace":
      return (
        <svg {...common}>
          <path d="M3 8h6M3 14h10M3 20h14" />
          <circle cx="9" cy="8" r="1.4" />
          <circle cx="13" cy="14" r="1.4" />
          <circle cx="17" cy="20" r="1.4" />
          <path d="M9 8v6M13 14v6" strokeDasharray="1 2" />
        </svg>
      );
    case "code":
      return (
        <svg {...common}>
          <path d="m8 8-5 4 5 4M16 8l5 4-5 4M14 6l-4 12" />
        </svg>
      );
  }
}
