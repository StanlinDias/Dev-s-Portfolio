import SectionEyebrow from "@/components/SectionEyebrow";
import { press } from "@/content/site";

export default function PressLine() {
  return (
    <div className="px-6 md:px-12 py-10 md:py-12 max-w-6xl mx-auto border-t border-border flex flex-col md:flex-row md:items-center gap-5 md:gap-10">
      <SectionEyebrow className="shrink-0 text-text-muted">work featured in</SectionEyebrow>
      <ul className="flex flex-wrap items-center gap-x-8 gap-y-3 md:justify-between flex-1">
        {press.map((outlet) => {
          const mark = (
            <span className="font-serif italic text-xl md:text-2xl text-text/55 transition-colors duration-[180ms] hover:text-text">
              {outlet.name}
            </span>
          );
          return (
            <li key={outlet.name}>
              {outlet.url ? (
                <a href={outlet.url} target="_blank" rel="noopener noreferrer" aria-label={`${outlet.name} coverage`}>
                  {mark}
                </a>
              ) : (
                mark
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
