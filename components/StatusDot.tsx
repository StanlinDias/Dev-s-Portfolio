export default function StatusDot({ status }: { status: string }) {
  return (
    <span className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-wider text-text-muted">
      <span className="relative flex h-1.5 w-1.5">
        <span className="absolute inline-flex h-full w-full rounded-full bg-accent opacity-60 motion-safe:animate-ping" />
        <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent" />
      </span>
      {status}
    </span>
  );
}
