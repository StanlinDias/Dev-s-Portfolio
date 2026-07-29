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

function Chip({ label, accent = false }: { label: string; accent?: boolean }) {
  return (
    <span
      className={`font-mono text-xs uppercase tracking-wider px-3 py-1.5 border ${
        accent ? "border-accent text-accent" : "border-border text-text-muted"
      }`}
    >
      {label}
    </span>
  );
}

export default function StackGrid({ groups }: StackGridProps) {
  return (
    <div className="flex flex-col gap-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {groups.map((group) => (
          <div key={group.group}>
            <h3 className="font-mono text-xs uppercase tracking-[0.2em] text-text-muted mb-3">
              {group.group}
            </h3>
            <div className="flex flex-wrap gap-2">
              {group.items.map((item) => (
                <Chip key={item} label={item} />
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="border-t border-border pt-8">
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
