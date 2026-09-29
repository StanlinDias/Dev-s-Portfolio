import type { CSSProperties } from "react";
import type { FlowDiagramSpec, FlowNode } from "@/content/types";

type FlowDiagramProps = {
  spec: FlowDiagramSpec;
  /** Unique per page; namespaces the SVG marker ids. */
  id: string;
  /** "full" animates on scroll and reflows vertically on phones; "preview" is static and compact. */
  variant?: "full" | "preview";
  className?: string;
};

const NODE_W = 172;
const NODE_H = 60;
const GAP_X = 56;
const GAP_Y = 40;
const PAD = 20;
const BOUNDARY_LABEL = 30;
const FONT = 14;
const LINE_H = 16;

type Placed = FlowNode & { x: number; y: number };

function wrap(label: string, maxChars: number) {
  const lines: string[] = [];
  let line = "";
  for (const word of label.split(" ")) {
    const next = line ? `${line} ${word}` : word;
    if (next.length > maxChars && line) {
      lines.push(line);
      line = word;
    } else {
      line = next;
    }
  }
  if (line) lines.push(line);
  return lines;
}

/** Point where the segment from a rect's centre towards (dx, dy) leaves the rect. */
function exitPoint(cx: number, cy: number, dx: number, dy: number) {
  const tx = dx === 0 ? Infinity : NODE_W / 2 / Math.abs(dx);
  const ty = dy === 0 ? Infinity : NODE_H / 2 / Math.abs(dy);
  const t = Math.min(tx, ty);
  return { x: cx + dx * t, y: cy + dy * t };
}

export function describeFlow(spec: FlowDiagramSpec) {
  const label = (id: string) => spec.nodes.find((n) => n.id === id)?.label ?? id;
  const steps = spec.edges.map((e) => `${label(e.from)} to ${label(e.to)}`).join("; ");
  return `Flow diagram${spec.boundary ? `, all inside ${spec.boundary}` : ""}: ${steps}.`;
}

function Diagram({
  spec,
  id,
  vertical,
  animated,
}: {
  spec: FlowDiagramSpec;
  id: string;
  vertical: boolean;
  animated: boolean;
}) {
  const top = PAD + (spec.boundary ? BOUNDARY_LABEL : 0);
  const pos = (n: FlowNode) => (vertical ? { c: n.row, r: n.col } : { c: n.col, r: n.row });
  const maxC = Math.max(...spec.nodes.map((n) => pos(n).c));
  const maxR = Math.max(...spec.nodes.map((n) => pos(n).r));

  const placed: Placed[] = spec.nodes.map((n) => {
    const { c, r } = pos(n);
    return { ...n, x: PAD + c * (NODE_W + GAP_X), y: top + r * (NODE_H + GAP_Y) };
  });
  const byId = new Map(placed.map((n) => [n.id, n]));

  const width = PAD * 2 + (maxC + 1) * NODE_W + maxC * GAP_X;
  const height = top + PAD + (maxR + 1) * NODE_H + maxR * GAP_Y;
  const markerId = `${id}-${vertical ? "v" : "h"}-arrow`;
  const maxChars = Math.floor((NODE_W - 20) / (FONT * 0.56));

  const edges = spec.edges.map((e) => {
    const a = byId.get(e.from)!;
    const b = byId.get(e.to)!;
    const ax = a.x + NODE_W / 2;
    const ay = a.y + NODE_H / 2;
    const bx = b.x + NODE_W / 2;
    const by = b.y + NODE_H / 2;
    const len = Math.hypot(bx - ax, by - ay) || 1;
    const dx = (bx - ax) / len;
    const dy = (by - ay) / len;
    const start = exitPoint(ax, ay, dx, dy);
    const end = exitPoint(bx, by, -dx, -dy);
    const d = `M ${start.x.toFixed(1)} ${start.y.toFixed(1)} L ${(end.x - dx * 3).toFixed(1)} ${(end.y - dy * 3).toFixed(1)}`;
    return { ...e, d, len: Math.hypot(end.x - start.x, end.y - start.y), order: Math.min(pos(a).c, pos(b).c) };
  });

  // Nodes pop in in column order.
  const order = [...new Set(placed.map((n) => pos(n).c))].sort((x, y) => x - y);

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      className="w-full h-auto"
      role="img"
      aria-label={describeFlow(spec)}
    >
      <defs>
        <marker id={markerId} viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
          <path d="M 0 0 L 10 5 L 0 10 z" fill="var(--text-muted)" />
        </marker>
      </defs>

      {spec.boundary && (
        <g>
          <rect
            className="flow-boundary"
            x={4}
            y={4}
            width={width - 8}
            height={height - 8}
            rx={14}
            fill="none"
            stroke="var(--accent)"
            strokeOpacity={0.55}
            strokeWidth={1.5}
            style={{ "--len": 2 * (width + height) } as CSSProperties}
          />
          <text
            x={PAD}
            y={PAD + 10}
            className="flow-label font-mono uppercase"
            fontSize={11}
            letterSpacing="0.18em"
            fill="var(--accent)"
          >
            {spec.boundary}
          </text>
        </g>
      )}

      {edges.map((e, i) => (
        <g key={`${e.from}-${e.to}`} style={{ "--i": e.order, "--len": Math.ceil(e.len) } as CSSProperties}>
          <path
            className={`flow-edge-line ${e.dashed ? "is-dashed" : ""}`}
            d={e.d}
            fill="none"
            stroke="var(--text-muted)"
            strokeOpacity={e.dashed ? 0.6 : 0.75}
            strokeWidth={1.25}
            markerEnd={`url(#${markerId})`}
          />
          {animated && !e.dashed && (
            <path
              className="flow-particles"
              d={e.d}
              fill="none"
              stroke="var(--accent)"
              strokeWidth={2.5}
              strokeLinecap="round"
              style={{ animationDelay: `${i * 0.3}s` }}
            />
          )}
        </g>
      ))}

      {placed.map((n) => {
        const lines = wrap(n.label, maxChars);
        const isModel = n.kind === "model";
        const textTop = n.y + NODE_H / 2 - ((lines.length - 1) * LINE_H) / 2;
        return (
          <g key={n.id} className="flow-node" style={{ "--i": order.indexOf(pos(n).c) } as CSSProperties}>
            <rect
              x={n.x}
              y={n.y}
              width={NODE_W}
              height={NODE_H}
              rx={8}
              fill={isModel ? "color-mix(in srgb, var(--accent) 9%, var(--bg))" : "var(--bg)"}
              stroke={isModel ? "var(--accent)" : "color-mix(in srgb, var(--text) 22%, transparent)"}
              strokeWidth={isModel ? 1.5 : 1}
            />
            {isModel && (
              <text x={n.x + 9} y={n.y + 15} fontSize={11} fill="var(--accent)" aria-hidden="true">
                ◈
              </text>
            )}
            <text
              className="flow-label"
              x={n.x + NODE_W / 2}
              y={textTop}
              textAnchor="middle"
              dominantBaseline="central"
              fontSize={FONT}
              fill={isModel ? "var(--text)" : "var(--text-muted)"}
            >
              {lines.map((line, i) => (
                <tspan key={i} x={n.x + NODE_W / 2} dy={i === 0 ? 0 : LINE_H}>
                  {line}
                </tspan>
              ))}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

export default function FlowDiagram({ spec, id, variant = "full", className = "" }: FlowDiagramProps) {
  if (variant === "preview") {
    return (
      <div className={`flow flow-preview ${className}`}>
        <Diagram spec={spec} id={id} vertical={false} animated />
      </div>
    );
  }

  return (
    <div className={`flow ${className}`} data-reveal="diagram" data-flow>
      <div className="hidden md:block">
        <Diagram spec={spec} id={id} vertical={false} animated />
      </div>
      <div className="md:hidden max-w-sm mx-auto">
        <Diagram spec={spec} id={id} vertical animated />
      </div>
    </div>
  );
}
