"use client";

import { useEffect, useState } from "react";

const ZONES = [
  { label: "Delhi", timeZone: "Asia/Kolkata" },
  { label: "Sydney", timeZone: "Australia/Sydney" },
  { label: "New York", timeZone: "America/New_York" },
];

const BUSINESS_START = 9;
const BUSINESS_END = 18;

function getOffsetMinutes(timeZone: string, date: Date): number {
  const parts = new Intl.DateTimeFormat("en-US", { timeZone, timeZoneName: "shortOffset" }).formatToParts(
    date
  );
  const offsetPart = parts.find((p) => p.type === "timeZoneName")?.value ?? "GMT+0";
  const match = offsetPart.match(/GMT([+-]\d+)(?::(\d+))?/);
  if (!match) return 0;
  const hours = parseInt(match[1], 10);
  const minutes = match[2] ? parseInt(match[2], 10) : 0;
  return hours * 60 + (hours < 0 ? -minutes : minutes);
}

function localHourAtIST(istHour: number, istOffset: number, targetOffset: number): number {
  const utcMinutes = istHour * 60 - istOffset;
  const targetMinutes = ((utcMinutes + targetOffset) % 1440 + 1440) % 1440;
  return targetMinutes / 60;
}

export default function TimezoneOverlap() {
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    setNow(new Date());
    const interval = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  if (!now) {
    // Server / first paint: render the static shell, clocks fill in on mount.
    return (
      <div className="flex flex-col gap-8">
        <div className="grid grid-cols-3 gap-4">
          {ZONES.map((zone) => (
            <div key={zone.timeZone} className="text-center">
              <p className="font-mono text-xs uppercase tracking-wider text-text-muted mb-1">{zone.label}</p>
              <p className="font-mono text-2xl md:text-3xl text-text tabular-nums">--:--</p>
            </div>
          ))}
        </div>
      </div>
    );
  }

  const istOffset = getOffsetMinutes("Asia/Kolkata", now);
  const auOffset = getOffsetMinutes("Australia/Sydney", now);
  const usOffset = getOffsetMinutes("America/New_York", now);

  const hours = Array.from({ length: 24 }, (_, h) => {
    const auHour = localHourAtIST(h, istOffset, auOffset);
    const usHour = localHourAtIST(h, istOffset, usOffset);
    const overlapsAU = auHour >= BUSINESS_START && auHour < BUSINESS_END;
    const overlapsUS = usHour >= BUSINESS_START && usHour < BUSINESS_END;
    return { hour: h, overlapsAU, overlapsUS };
  });

  return (
    <div className="flex flex-col gap-8">
      <div className="grid grid-cols-3 gap-4">
        {ZONES.map((zone) => (
          <div key={zone.timeZone} className="text-center">
            <p className="font-mono text-xs uppercase tracking-wider text-text-muted mb-1">{zone.label}</p>
            <p className="font-mono text-2xl md:text-3xl text-text tabular-nums">
              {new Intl.DateTimeFormat("en-US", {
                timeZone: zone.timeZone,
                hour: "2-digit",
                minute: "2-digit",
                hour12: false,
              }).format(now)}
            </p>
          </div>
        ))}
      </div>

      <div className="flex flex-col gap-2">
        <div className="flex h-6 border border-border overflow-hidden">
          {hours.map(({ hour, overlapsAU, overlapsUS }) => (
            <div
              key={hour}
              title={`${hour}:00 IST${overlapsAU ? " · overlaps Sydney business hours" : ""}${
                overlapsUS ? " · overlaps New York business hours" : ""
              }`}
              className={`flex-1 ${
                overlapsAU && overlapsUS
                  ? "bg-accent"
                  : overlapsAU || overlapsUS
                    ? "bg-accent/50"
                    : "bg-border"
              }`}
            />
          ))}
        </div>
        <div className="flex justify-between font-mono text-[10px] text-text-muted">
          <span>00:00 IST</span>
          <span>12:00 IST</span>
          <span>23:00 IST</span>
        </div>
        <p className="text-sm text-text-muted">
          Shaded bands show IST hours that fall inside 9am to 6pm business hours in Sydney and/or New York.
        </p>
      </div>
    </div>
  );
}
