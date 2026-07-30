"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";

const LAT_BANDS = 14;
const LON_BANDS = 24;
const RADIUS = 1;

type Point3D = { x: number; y: number; z: number };

function buildSphere(): Point3D[][] {
  const rings: Point3D[][] = [];
  for (let i = 0; i <= LAT_BANDS; i++) {
    const theta = (i / LAT_BANDS) * Math.PI;
    const ring: Point3D[] = [];
    for (let j = 0; j <= LON_BANDS; j++) {
      const phi = (j / LON_BANDS) * Math.PI * 2;
      ring.push({
        x: RADIUS * Math.sin(theta) * Math.cos(phi),
        y: RADIUS * Math.cos(theta),
        z: RADIUS * Math.sin(theta) * Math.sin(phi),
      });
    }
    rings.push(ring);
  }
  return rings;
}

export default function Globe({ size = 420 }: { size?: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const mouse = useRef({ x: -9999, y: -9999, active: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    const wrap = wrapRef.current;
    if (!canvas || !wrap) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = size * dpr;
    canvas.height = size * dpr;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.scale(dpr, dpr);

    const rings = buildSphere();
    const cx = size / 2;
    const cy = size / 2;
    const focal = size * 1.1;
    const baseR = size * 0.34;

    let raf = 0;
    let t = 0;

    function project(p: Point3D, rotY: number, rotX: number, breathe: number) {
      // rotate around Y
      const cosY = Math.cos(rotY);
      const sinY = Math.sin(rotY);
      const x1 = p.x * cosY - p.z * sinY;
      const z1 = p.x * sinY + p.z * cosY;
      // rotate around X
      const cosX = Math.cos(rotX);
      const sinX = Math.sin(rotX);
      const y2 = p.y * cosX - z1 * sinX;
      const z2 = p.y * sinX + z1 * cosX;

      const scale = (focal / (focal + z2 * baseR)) * breathe;
      return {
        sx: cx + x1 * baseR * scale,
        sy: cy + y2 * baseR * scale,
        depth: z2,
      };
    }

    function draw() {
      if (!ctx) return;
      t += 0.008;
      const breathe = 1 + Math.sin(t * 1.3) * 0.035;
      const rotY = t * 0.35;
      const rotX = Math.sin(t * 0.2) * 0.25 + 0.15;
      const hue = 16 + (1 - Math.cos(t * 0.1)) * 152; // starts orange, drifts through pink/magenta and back

      ctx.clearRect(0, 0, size, size);

      // aura: light spilling a little past the wireframe's edge
      const auraR = baseR * 1.18 * breathe;
      const aura = ctx.createRadialGradient(cx, cy, baseR * 0.15, cx, cy, auraR);
      aura.addColorStop(0, `hsla(${hue}, 95%, 65%, 0.32)`);
      aura.addColorStop(0.7, `hsla(${hue}, 95%, 60%, 0.12)`);
      aura.addColorStop(1, `hsla(${hue}, 95%, 60%, 0)`);
      ctx.fillStyle = aura;
      ctx.beginPath();
      ctx.arc(cx, cy, auraR, 0, Math.PI * 2);
      ctx.fill();

      // core: a small light-emitting orb at the centre
      const corePulse = 0.65 + 0.35 * Math.sin(t * 2.2);
      const coreR = baseR * 0.24 * (0.9 + corePulse * 0.2);
      const core = ctx.createRadialGradient(cx, cy, 0, cx, cy, coreR);
      core.addColorStop(0, `hsla(${hue}, 40%, 96%, ${0.85 * corePulse + 0.1})`);
      core.addColorStop(0.45, `hsla(${hue}, 95%, 70%, ${0.55 * corePulse})`);
      core.addColorStop(1, `hsla(${hue}, 95%, 60%, 0)`);
      ctx.fillStyle = core;
      ctx.beginPath();
      ctx.arc(cx, cy, coreR, 0, Math.PI * 2);
      ctx.fill();

      const rippleAmp = mouse.current.active * 10;

      const projected = rings.map((ring) =>
        ring.map((p) => {
          const pr = project(p, rotY, rotX, breathe);
          if (rippleAmp > 0.05) {
            const dx = pr.sx - mouse.current.x;
            const dy = pr.sy - mouse.current.y;
            const dist = Math.hypot(dx, dy);
            const falloff = Math.exp(-dist / 90);
            const wave = Math.sin(dist * 0.12 - t * 6) * rippleAmp * falloff;
            const nx = dist === 0 ? 0 : dx / dist;
            const ny = dist === 0 ? 0 : dy / dist;
            pr.sx += nx * wave;
            pr.sy += ny * wave;
          }
          return pr;
        })
      );

      // longitude + latitude lines
      for (let i = 0; i < projected.length; i++) {
        const ring = projected[i];
        for (let j = 0; j < ring.length - 1; j++) {
          const a = ring[j];
          const b = ring[j + 1];
          const avgDepth = (a.depth + b.depth) / 2;
          const alpha = 0.15 + Math.max(0, (avgDepth + 1) / 2) * 0.55;
          ctx.strokeStyle = `hsla(${hue}, 90%, 58%, ${alpha})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(a.sx, a.sy);
          ctx.lineTo(b.sx, b.sy);
          ctx.stroke();
        }
      }
      for (let j = 0; j < projected[0].length; j++) {
        for (let i = 0; i < projected.length - 1; i++) {
          const a = projected[i][j];
          const b = projected[i + 1][j];
          const avgDepth = (a.depth + b.depth) / 2;
          const alpha = 0.12 + Math.max(0, (avgDepth + 1) / 2) * 0.5;
          ctx.strokeStyle = `hsla(${hue}, 90%, 58%, ${alpha})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(a.sx, a.sy);
          ctx.lineTo(b.sx, b.sy);
          ctx.stroke();
        }
      }

      wrap!.style.setProperty("--globe-hue", String(hue));

      // ease ripple back down when not hovering
      mouse.current.active *= 0.94;

      raf = requestAnimationFrame(draw);
    }

    if (reduceMotion) {
      t = 0;
      const breathe = 1;
      const rotY = 0.6;
      const rotX = 0.3;
      ctx.clearRect(0, 0, size, size);
      const staticAuraR = baseR * 1.18;
      const staticAura = ctx.createRadialGradient(cx, cy, baseR * 0.15, cx, cy, staticAuraR);
      staticAura.addColorStop(0, "hsla(16, 95%, 65%, 0.32)");
      staticAura.addColorStop(0.7, "hsla(16, 95%, 60%, 0.12)");
      staticAura.addColorStop(1, "hsla(16, 95%, 60%, 0)");
      ctx.fillStyle = staticAura;
      ctx.beginPath();
      ctx.arc(cx, cy, staticAuraR, 0, Math.PI * 2);
      ctx.fill();

      const staticCoreR = baseR * 0.24;
      const staticCore = ctx.createRadialGradient(cx, cy, 0, cx, cy, staticCoreR);
      staticCore.addColorStop(0, "hsla(16, 40%, 96%, 0.8)");
      staticCore.addColorStop(0.45, "hsla(16, 95%, 70%, 0.55)");
      staticCore.addColorStop(1, "hsla(16, 95%, 60%, 0)");
      ctx.fillStyle = staticCore;
      ctx.beginPath();
      ctx.arc(cx, cy, staticCoreR, 0, Math.PI * 2);
      ctx.fill();

      const projected = rings.map((ring) => ring.map((p) => project(p, rotY, rotX, breathe)));
      for (let i = 0; i < projected.length; i++) {
        const ring = projected[i];
        for (let j = 0; j < ring.length - 1; j++) {
          const a = ring[j];
          const b = ring[j + 1];
          ctx.strokeStyle = "hsla(16, 90%, 58%, 0.4)";
          ctx.beginPath();
          ctx.moveTo(a.sx, a.sy);
          ctx.lineTo(b.sx, b.sy);
          ctx.stroke();
        }
      }
      wrap.style.setProperty("--globe-hue", "16");
    } else {
      raf = requestAnimationFrame(draw);
    }

    function handleMove(e: MouseEvent) {
      const rect = canvas!.getBoundingClientRect();
      mouse.current.x = e.clientX - rect.left;
      mouse.current.y = e.clientY - rect.top;
      mouse.current.active = 1;
    }
    function handleLeave() {
      mouse.current.x = -9999;
      mouse.current.y = -9999;
    }

    if (!reduceMotion) {
      wrap.addEventListener("mousemove", handleMove);
      wrap.addEventListener("mouseleave", handleLeave);
    }

    return () => {
      cancelAnimationFrame(raf);
      wrap.removeEventListener("mousemove", handleMove);
      wrap.removeEventListener("mouseleave", handleLeave);
    };
  }, [size, reduceMotion]);

  return (
    <div
      ref={wrapRef}
      className="relative flex items-center justify-center"
      style={{ width: size, height: size, ["--globe-hue" as string]: 16 }}
    >
      <div
        className="pointer-events-none absolute rounded-full blur-3xl transition-opacity"
        style={{
          width: size * 1.35,
          height: size * 1.35,
          background: `radial-gradient(circle, hsla(var(--globe-hue), 90%, 55%, 0.4) 0%, hsla(var(--globe-hue), 90%, 55%, 0.1) 45%, transparent 70%)`,
        }}
      />
      <canvas
        ref={canvasRef}
        style={{ width: size, height: size }}
        className="relative"
      />
    </div>
  );
}
