type ChipProps = { children: React.ReactNode; tone?: "muted" | "accent" | "onDark" };

export default function Chip({ children, tone = "muted" }: ChipProps) {
  const tones = {
    muted: "border-border text-text-muted",
    accent: "border-accent/60 text-accent",
    onDark: "border-white/15 text-white/60",
  };
  return (
    <span className={`inline-block font-mono text-[11px] uppercase tracking-wider px-2.5 py-1 border ${tones[tone]}`}>
      {children}
    </span>
  );
}
