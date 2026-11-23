import Image from "next/image";
import type { ReactNode } from "react";

export type PhotoId = "hero" | "flowers" | "couple" | "consultation" | "team" | "reception";
export type IconName = "arrow" | "up-right" | "heart" | "message" | "send" | "bookmark" | "search" | "menu" | "grid" | "play" | "pin" | "calendar" | "check" | "bell" | "users" | "file" | "chart" | "settings" | "chevron" | "plus" | "gift" | "ticket" | "phone" | "globe" | "shield" | "clock" | "spark";

const PATHS: Record<IconName, string> = {
  arrow: "M4 12h16M14 6l6 6-6 6", "up-right": "M6 18 18 6M6 6h12v12",
  heart: "M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8L12 21l8.8-8.6a5.5 5.5 0 0 0 0-7.8Z",
  message: "M21 11a9 9 0 0 1-9 9H3l1.8-4.3A9 9 0 1 1 21 11Z",
  send: "m3 3 19 9-19 9 4-9-4-9ZM7 12h15", bookmark: "M6 3h12v19l-6-4-6 4V3Z",
  search: "m21 21-5-5M18 10a8 8 0 1 1-16 0 8 8 0 0 1 16 0Z", menu: "M4 7h16M4 12h16M4 17h16",
  grid: "M3 3h7v7H3zM14 3h7v7h-7zM3 14h7v7H3zM14 14h7v7h-7z", play: "m9 5 11 7-11 7V5Z",
  pin: "M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 0 1 16 0ZM15 10a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z",
  calendar: "M4 5h16v16H4zM8 2v6M16 2v6M4 11h16", check: "m5 12 4 4L19 6",
  bell: "M18 8a6 6 0 0 0-12 0c0 8-3 8-3 10h18c0-2-3-2-3-10ZM9 22h6",
  users: "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2M16 3a4 4 0 0 1 0 8M22 21v-2a4 4 0 0 0-3-3.9M13 7a4 4 0 1 1-8 0 4 4 0 0 1 8 0Z",
  file: "M14 2H4v20h16V8l-6-6ZM14 2v6h6M8 13h8M8 17h5", chart: "M4 20V10h4v10M10 20V4h4v16M16 20v-7h4v7",
  settings: "M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8ZM12 2v3M12 19v3M2 12h3M19 12h3M5 5l2 2M17 17l2 2M5 19l2-2M17 7l2-2",
  chevron: "m9 5 7 7-7 7", plus: "M12 4v16M4 12h16", gift: "M3 8h18v4H3zM5 12v10h14V12M12 8v14M12 8H7a3 3 0 1 1 3-3l2 3ZM12 8h5a3 3 0 1 0-3-3l-2 3Z",
  ticket: "M3 4h18v6a2 2 0 0 0 0 4v6H3v-6a2 2 0 0 0 0-4V4ZM15 4v3M15 10v4M15 17v3",
  phone: "M7 3H4a1 1 0 0 0-1 1c0 9.4 7.6 17 17 17a1 1 0 0 0 1-1v-3l-5-2-2 2a15 15 0 0 1-7-7l2-2-2-5Z",
  globe: "M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0ZM3 12h18M12 3c-5 5-5 13 0 18 5-5 5-13 0-18Z",
  shield: "m12 2 9 4v6c0 6-9 10-9 10S3 18 3 12V6l9-4ZM8 12l3 3 5-6", clock: "M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0ZM12 6v6l4 2",
  spark: "m12 2 2.6 7.4L22 12l-7.4 2.6L12 22l-2.6-7.4L2 12l7.4-2.6L12 2Z",
};

export function I({ name, className = "" }: { name: IconName; className?: string }) {
  return <svg className={`pv-icon ${className}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={PATHS[name]} /></svg>;
}

export function Photo({ id, className = "", preload = false }: { id: PhotoId; className?: string; preload?: boolean }) {
  return <span className={`pv-photo ${className}`}><Image src={`/images/preview-photos/${id}.webp`} alt="" fill sizes="(max-width: 600px) 180px, 400px" preload={preload} /></span>;
}

export function Brand({ light = false }: { light?: boolean }) {
  return <span className={`pv-brand${light ? " is-light" : ""}`}><span className="pv-brand-mark">m.</span><span>MAISON<small>WEDDING & CELEBRATION</small></span></span>;
}

export function Phone({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`pv-phone ${className}`}><div className="pv-phone-status"><span>9:41</span><i /><span>▮▮▮ ▰</span></div><div className="pv-phone-content">{children}</div><span className="pv-home-line" /></div>;
}

export function Browser({ children, domain = "maison.wedding", className = "" }: { children: ReactNode; domain?: string; className?: string }) {
  return <div className={`pv-browser ${className}`}><div className="pv-browser-bar"><span className="pv-browser-dots"><i /><i /><i /></span><span className="pv-browser-address"><I name="shield" />{domain}</span><I name="plus" /></div><div className="pv-browser-content">{children}</div></div>;
}

export function Chip({ children, tone = "" }: { children: ReactNode; tone?: string }) {
  return <span className={`pv-chip ${tone ? `is-${tone}` : ""}`}>{children}</span>;
}

export function Note({ icon, title, children, className = "" }: { icon: IconName; title: string; children: ReactNode; className?: string }) {
  return <div className={`pv-note ${className}`}><span className="pv-note-icon"><I name={icon} /></span><span><b>{title}</b><small>{children}</small></span><I name="check" /></div>;
}

export function Field({ label, value, icon }: { label: string; value: string; icon?: IconName }) {
  return <span className="pv-field"><small>{label}</small><span>{value}{icon && <I name={icon} />}</span></span>;
}

export function Action({ children, icon = "arrow", pale = false }: { children: ReactNode; icon?: IconName; pale?: boolean }) {
  return <span className={`pv-action${pale ? " is-pale" : ""}`}>{children}<I name={icon} /></span>;
}

/** 장식용 입장 코드. 실제 QR 데이터를 담지 않습니다. */
export function PassCode() {
  const cells = Array.from({ length: 21 * 21 }, (_, n) => {
    const x = n % 21, y = Math.floor(n / 21);
    for (const [ox, oy] of [[0, 0], [14, 0], [0, 14]]) {
      if (x >= ox && x < ox + 7 && y >= oy && y < oy + 7) {
        const dx = x - ox, dy = y - oy;
        return dx === 0 || dx === 6 || dy === 0 || dy === 6 || (dx >= 2 && dx <= 4 && dy >= 2 && dy <= 4);
      }
    }
    return ((x * 17 + y * 11 + x * y * 3) % 7) < 3;
  });
  return <svg className="pv-pass-code" viewBox="-2 -2 25 25" aria-hidden="true">{cells.map((on, n) => on && <rect key={n} x={n % 21} y={Math.floor(n / 21)} width="1" height="1" fill="currentColor" />)}</svg>;
}
