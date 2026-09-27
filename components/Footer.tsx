import { SHOW_XANTYR } from "@/lib/flags";

const SITEMAP = [
  { label: "About", href: "/#hero" },
  { label: "Work", href: "/#work" },
  ...(SHOW_XANTYR ? [{ label: "Building Xantyr", href: "/#now-building" }] : []),
  { label: "Trajectory", href: "/#trajectory" },
  { label: "Stack", href: "/#stack" },
  { label: "Private models", href: "/private-models" },
  { label: "For agencies", href: "/partners" },
  { label: "Contact", href: "/#contact" },
];

export default function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="max-w-6xl mx-auto px-6 md:px-12 py-12 flex flex-col md:flex-row md:items-start md:justify-between gap-8">
        <div>
          <p className="font-mono text-sm tracking-[0.15em] uppercase mb-2">Dev Seth</p>
          <p className="text-text-muted text-sm max-w-xs">
            {SHOW_XANTYR
              ? "CTO & co-founder, Xantyr. Building AI enterprises actually trust."
              : "Chief AI Architect. Building AI enterprises actually trust."}
          </p>
        </div>

        <nav className="grid grid-cols-2 gap-x-8 gap-y-2 font-mono text-xs uppercase tracking-wider text-text-muted">
          {SITEMAP.map((item) => (
            <a key={item.href} href={item.href} className="hover:text-accent transition-colors">
              {item.label}
            </a>
          ))}
        </nav>

        <div className="font-mono text-xs uppercase tracking-wider text-text-muted flex flex-col gap-2">
          <a
            href="https://www.linkedin.com/in/dev-seth-840774185/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-accent transition-colors"
          >
            LinkedIn
          </a>
          <a href="mailto:devseth34@gmail.com" className="hover:text-accent transition-colors">
            devseth34@gmail.com
          </a>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 md:px-12 pb-8 font-mono text-[11px] uppercase tracking-wider text-text-muted">
        © 2026 Dev Seth
      </div>
    </footer>
  );
}
