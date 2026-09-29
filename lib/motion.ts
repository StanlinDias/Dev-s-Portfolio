// Motion tokens. The CSS side lives in app/globals.css (--ease-*, --dur-*),
// keep the two in sync.
export const ease = {
  outExpo: [0.16, 1, 0.3, 1] as const,
  inOut: [0.65, 0, 0.35, 1] as const,
};

export const duration = {
  fast: 0.18,
  base: 0.42,
  slow: 0.7,
};

export const STAGGER_MS = 60;
export const MAX_STAGGERED = 8;

/** Inline style for the nth sibling in a staggered reveal group. */
export function stagger(i: number) {
  return { "--reveal-delay": `${Math.min(i, MAX_STAGGERED - 1) * STAGGER_MS}ms` } as React.CSSProperties;
}
