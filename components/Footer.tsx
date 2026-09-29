import Link from "next/link";
import { site } from "@/content/site";
import { caseStudies } from "@/content/case-studies";
import { SHOW_XANTYR } from "@/lib/flags";

const SITEMAP = [
  { label: "Work", href: "/#work" },
  { label: "Models", href: "/#models" },
  { label: "Industries", href: "/#industries" },
  { label: "Method", href: "/private-models" },
  { label: "Contact", href: "/#contact" },
];

export default function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="max-w-6xl mx-auto px-6 md:px-12 py-12 grid grid-cols-1 md:grid-cols-[1.2fr_1fr_1.4fr_1fr] gap-10">
        <div>
          <p className="font-mono text-sm tracking-[0.15em] uppercase mb-2">{site.name}</p>
          <p className="text-text-muted text-sm max-w-xs">
            {SHOW_XANTYR
              ? "CTO & co-founder, Xantyr. Building AI enterprises actually trust."
              : "Chief AI Architect. Private models and production AI."}
          </p>
        </div>

        <nav aria-label="Site" className="flex flex-col gap-2 font-mono text-xs uppercase tracking-wider text-text-muted">
          {SITEMAP.map((item) => (
            <Link key={item.href} href={item.href} className="hover:text-accent transition-colors">
              {item.label}
            </Link>
          ))}
        </nav>

        <nav aria-label="Case studies" className="flex flex-col gap-2 text-sm text-text-muted">
          <p className="font-mono text-[11px] uppercase tracking-wider">Case studies</p>
          {caseStudies.map((c) => (
            <Link key={c.slug} href={`/work/${c.slug}`} transitionTypes={["nav-forward"]} className="hover:text-accent transition-colors">
              {c.title}
            </Link>
          ))}
        </nav>

        <div className="font-mono text-xs uppercase tracking-wider text-text-muted flex flex-col gap-2">
          <a href={site.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors">
            LinkedIn
          </a>
          <a href={`mailto:${site.email}`} className="hover:text-accent transition-colors normal-case">
            {site.email}
          </a>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 md:px-12 pb-8 font-mono text-[11px] uppercase tracking-wider text-text-muted">
        © 2026 {site.name}
      </div>
    </footer>
  );
}
