"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";

const NODES = [
  { id: "data", label: "Data", angle: -140 },
  { id: "training", label: "Training", angle: -60 },
  { id: "model", label: "Model", angle: 60 },
  { id: "inference", label: "Inference", angle: 140 },
];

const RADIUS = 90;
const CX = 150;
const CY = 150;
const RING_R = 130;

function nodePos(angleDeg: number) {
  const rad = (angleDeg * Math.PI) / 180;
  return { x: CX + RADIUS * Math.cos(rad), y: CY + RADIUS * Math.sin(rad) };
}

export default function BoundaryVisual() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || reduceMotion) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const size = 300;
    canvas.width = size * dpr;
    canvas.height = size * dpr;
    ctx.scale(dpr, dpr);

    const positions = NODES.map((n) => nodePos(n.angle));

    // one slow-moving particle per edge of the small inner cycle (data -> training -> model -> inference -> data)
    const particles = positions.map((_, i) => ({
      from: i,
      to: (i + 1) % positions.length,
      t: Math.random(),
      speed: 0.0025 + Math.random() * 0.001,
      bouncing: false,
      bounceT: 0,
    }));

    let raf = 0;

    function draw() {
      if (!ctx) return;
      ctx.clearRect(0, 0, size, size);

      // boundary ring
      ctx.beginPath();
      ctx.arc(CX, CY, RING_R, 0, Math.PI * 2);
      ctx.strokeStyle = "rgba(255, 77, 23, 0.35)";
      ctx.lineWidth = 1.5;
      ctx.stroke();

      // connecting lines between nodes (cycle)
      ctx.strokeStyle = "var(--border)";
      ctx.lineWidth = 1;
      for (let i = 0; i < positions.length; i++) {
        const a = positions[i];
        const b = positions[(i + 1) % positions.length];
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.stroke();
      }

      // particles
      particles.forEach((p) => {
        p.t += p.speed;
        if (p.t >= 1) {
          p.t = 0;
          // occasionally drift toward the edge and bounce back instead of continuing
          if (Math.random() < 0.3) p.bouncing = true;
        }
        const a = positions[p.from];
        const b = positions[p.to];
        let x, y;
        if (p.bouncing) {
          p.bounceT += 0.02;
          const drift = Math.sin(p.bounceT * Math.PI) * 14;
          const midX = (a.x + b.x) / 2;
          const midY = (a.y + b.y) / 2;
          const dx = midX - CX;
          const dy = midY - CY;
          const len = Math.hypot(dx, dy) || 1;
          x = midX + (dx / len) * drift;
          y = midY + (dy / len) * drift;
          if (p.bounceT >= 1) {
            p.bouncing = false;
            p.bounceT = 0;
          }
        } else {
          x = a.x + (b.x - a.x) * p.t;
          y = a.y + (b.y - a.y) * p.t;
        }
        ctx.beginPath();
        ctx.arc(x, y, 2.5, 0, Math.PI * 2);
        ctx.fillStyle = "var(--accent)";
        ctx.fill();
      });

      // nodes
      NODES.forEach((n, i) => {
        const pos = positions[i];
        ctx.beginPath();
        ctx.arc(pos.x, pos.y, 14, 0, Math.PI * 2);
        ctx.fillStyle = "var(--bg)";
        ctx.fill();
        ctx.strokeStyle = "var(--text)";
        ctx.lineWidth = 1.5;
        ctx.stroke();
        ctx.fillStyle = "var(--text-muted)";
        ctx.font = "9px var(--font-mono)";
        ctx.textAlign = "center";
        ctx.fillText(n.label, pos.x, pos.y + 26);
      });

      raf = requestAnimationFrame(draw);
    }

    raf = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(raf);
  }, [reduceMotion]);

  if (reduceMotion) {
    return (
      <svg viewBox="0 0 300 300" className="w-full max-w-[300px] mx-auto">
        <circle cx={CX} cy={CY} r={RING_R} fill="none" stroke="var(--accent)" strokeOpacity={0.35} strokeWidth={1.5} />
        {NODES.map((n, i) => {
          const pos = nodePos(n.angle);
          const next = nodePos(NODES[(i + 1) % NODES.length].angle);
          return (
            <g key={n.id}>
              <line x1={pos.x} y1={pos.y} x2={next.x} y2={next.y} stroke="var(--border)" strokeWidth={1} />
            </g>
          );
        })}
        {NODES.map((n) => {
          const pos = nodePos(n.angle);
          return (
            <g key={n.id}>
              <circle cx={pos.x} cy={pos.y} r={14} fill="var(--bg)" stroke="var(--text)" strokeWidth={1.5} />
              <text x={pos.x} y={pos.y + 26} textAnchor="middle" fontSize={9} fontFamily="var(--font-mono)" className="fill-current text-text-muted">
                {n.label}
              </text>
            </g>
          );
        })}
      </svg>
    );
  }

  return <canvas ref={canvasRef} className="w-full max-w-[300px] mx-auto" style={{ width: 300, height: 300 }} />;
}
