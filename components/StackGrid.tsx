type StackGroup = {
  group: string;
  items: string[];
};

type StackGridProps = {
  groups: StackGroup[];
};

const XANTYR_STACK = [
  "Claude Code",
  "Claude (Design)",
  "Gemma",
  "Next.js + React",
  "Neon",
  "Stripe",
  "Modal + Unsloth (LoRA/QLoRA)",
  "Vercel",
  "Cloudflare R2",
  "Fly.io",
];

const GROUP_ICONS: Record<string, string> = {
  "LLM & agentic AI": "◈",
  "Cloud & MLOps": "◫",
  "Data science & ML": "◇",
  Leadership: "◆",
};

function Chip({ label, accent = false }: { label: string; accent?: boolean }) {
  return (
    <span
      className={`font-mono text-[11px] uppercase tracking-wider px-2.5 py-1 border ${
        accent ? "border-accent text-accent" : "border-border text-text-muted"
      }`}
    >
      {label}
    </span>
  );
}

export default function StackGrid({ groups }: StackGridProps) {
  return (
    <div className="flex flex-col gap-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {groups.map((group) => (
          <div
            key={group.group}
            className="border border-border p-5 flex flex-col gap-3 hover:border-accent/50 transition-colors"
          >
            <div className="flex items-center gap-2">
              <span className="text-accent text-base leading-none">{GROUP_ICONS[group.group] ?? "◆"}</span>
              <h3 className="font-mono text-[11px] uppercase tracking-[0.15em] text-text-muted">
                {group.group}
              </h3>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {group.items.map((item) => (
                <Chip key={item} label={item} />
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="border-t border-border pt-6">
        <h3 className="font-mono text-xs uppercase tracking-[0.2em] text-accent mb-3">
          Currently building with
        </h3>
        <div className="flex flex-wrap gap-2">
          {XANTYR_STACK.map((item) => (
            <Chip key={item} label={item} accent />
          ))}
        </div>
      </div>
    </div>
  );
}
