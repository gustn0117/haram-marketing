import type { ReactNode } from "react";
import { I, type IconName } from "./primitives";

export { I };

/** 실제 사진이나 화면 대신 쓰는, 서비스 설명용 도형입니다. */
export function Artwork({ variant = 0, className = "" }: { variant?: number; className?: string }) {
  return (
    <span className={`sm-art sm-art-${variant % 4} ${className}`}>
      {variant % 4 === 0 ? <svg viewBox="0 0 120 120" fill="none" aria-hidden="true"><path d="M32 105V53a28 28 0 0 1 56 0v52" fill="currentColor" opacity=".2" /><path d="M43 105V55a17 17 0 0 1 34 0v50" stroke="currentColor" strokeWidth="2" /><path d="M22 105h76M25 105V72m70 33V72" stroke="currentColor" strokeWidth="2" /><circle cx="25" cy="68" r="7" fill="currentColor" opacity=".45" /><circle cx="95" cy="68" r="7" fill="currentColor" opacity=".45" /></svg>
        : variant % 4 === 1 ? <svg viewBox="0 0 120 120" fill="none" aria-hidden="true"><circle cx="48" cy="61" r="24" stroke="currentColor" strokeWidth="8" opacity=".35" /><circle cx="75" cy="61" r="24" stroke="currentColor" strokeWidth="3" /><path d="m62 25 5-9 5 9-5 6-5-6Z" fill="currentColor" opacity=".6" /></svg>
          : variant % 4 === 2 ? <svg viewBox="0 0 120 120" fill="none" aria-hidden="true"><path d="M62 103V42M62 80C34 79 30 56 30 56c24 0 32 24 32 24ZM62 63c25-2 31-24 31-24-23 0-31 24-31 24Z" stroke="currentColor" strokeWidth="2" /><circle cx="61" cy="32" r="15" fill="currentColor" opacity=".3" /><circle cx="45" cy="35" r="10" fill="currentColor" opacity=".25" /><circle cx="76" cy="37" r="11" fill="currentColor" opacity=".4" /></svg>
            : <svg viewBox="0 0 120 120" fill="none" aria-hidden="true"><rect x="22" y="28" width="76" height="64" rx="38" fill="currentColor" opacity=".15" /><path d="M35 91V51a12 12 0 0 1 24 0v40M62 91V51a12 12 0 0 1 24 0v40M21 92h78" stroke="currentColor" strokeWidth="2" /></svg>}
    </span>
  );
}

export function Lines({ count = 2, className = "" }: { count?: number; className?: string }) {
  return <span className={`sm-lines ${className}`}>{Array.from({ length: count }, (_, i) => <i key={i} />)}</span>;
}

export function ScreenHeading({ children, icon, wordmark = false }: { children: ReactNode; icon?: IconName; wordmark?: boolean }) {
  return <div className={`sm-heading${wordmark ? " is-wordmark" : ""}`}>{icon && <I name={icon} />}<b>{children}</b><I name="menu" /></div>;
}

export function MockButton({ children, pale = false }: { children: ReactNode; pale?: boolean }) {
  return <span className={`sm-button${pale ? " is-pale" : ""}`}>{children}<I name="arrow" /></span>;
}

export function MockForm({ title = "상담 신청", compact = false }: { title?: string; compact?: boolean }) {
  return <div className={`sm-form${compact ? " is-compact" : ""}`}><b>{title}</b>{(compact ? ["성함", "연락처"] : ["성함", "연락처", "방문 희망일"]).map(label => <span className="sm-field" key={label}>{label}<i /></span>)}<MockButton>신청하기</MockButton></div>;
}

export function MiniCalendar({ compact = false }: { compact?: boolean }) {
  return <div className={`sm-calendar${compact ? " is-compact" : ""}`}><div><I name="calendar" /><b>일정 관리</b><span>〈　〉</span></div><section>{["일", "월", "화", "수", "목", "금", "토"].map(day => <b key={day}>{day}</b>)}{Array.from({ length: compact ? 14 : 21 }, (_, i) => <span key={i}><small>{i + 1}</small>{[2, 5, 9, 12, 16, 19].includes(i) && <i />}</span>)}</section></div>;
}

export function SimpleMap() {
  return <div className="sm-map"><svg viewBox="0 0 300 180" fill="none" aria-hidden="true"><rect x="20" y="18" width="65" height="50" rx="9" /><rect x="114" y="6" width="62" height="56" rx="9" /><rect x="207" y="16" width="73" height="49" rx="9" /><rect x="25" y="112" width="68" height="50" rx="9" /><rect x="121" y="119" width="53" height="53" rx="9" /><rect x="207" y="110" width="68" height="51" rx="9" /><path d="M0 89h300M101 0v180M192 0v180" stroke="white" strokeWidth="13" /></svg><span><I name="pin" /><b>웨딩홀</b></span></div>;
}

export function MemberCard() {
  return <div className="sm-member-card"><span>WEDDING MEMBERSHIP<I name="spark" /></span><b>MEMBER</b><i /><small>회원 전용 카드</small></div>;
}

export function MockList({ labels, icon = "file" }: { labels: string[]; icon?: IconName }) {
  return <div className="sm-list">{labels.map((label, i) => <div key={label}><span className="sm-list-icon"><I name={icon} /></span><span><b>{label}</b><Lines count={i % 2 + 1} /></span><I name="chevron" /></div>)}</div>;
}
