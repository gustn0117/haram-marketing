import { CLIENT, DOC, GROUPS, PDF_FILENAME, PDF_URL, SENDER, VAT_LABEL, servicesOf, serviceNo, type Service } from "@/lib/quote-data";
import ServicePreview from "@/components/client/ServicePreview";
import type { NavGroup, NavLink } from "./QuoteHeader";

/* /quote 견적서 메뉴 페이지와 /quote/[서비스] 안내 페이지가 함께 쓰는 것들 */

/** 화면 색 — quote.css 의 [data-theme] 와 짝. 인스타그램 = 그라데이션 · 네이버 = 초록 세 가지 · 제작 · 개발 = 차콜 / 오프화이트 */
export const THEME: Record<string, string> = {
  instagram: "instagram",
  blog: "naver",
  posting: "naver-deep",
  place: "naver-pale",
  crm: "dark",
  homepage: "light",
  landing: "dark",
  fair: "light",
  membership: "dark",
};

export const GROUP_EN: Record<string, string> = { marketing: "Marketing", build: "Development" };

export const tel = `tel:${SENDER.phone.replace(/\D/g, "")}`;

/** " · " 앞뒤를 줄바꿈 안 되는 공백으로 — 줄 첫머리에 가운뎃점이 오지 않게 */
export const keepDots = (text: string) => text.replace(/ · /g, "\u00a0·\u00a0");

/** 금액 밑 작은 글씨 — VAT 별도 · 키워드마다 상이 */
export const priceCaption = (service: Service) => [VAT_LABEL, service.note].filter(Boolean).join(" · ");

/** 머리말 메뉴 — 묶음별 서비스(안내 페이지로) · 견적 정리 · 진행 방식 · 하람 소개 */
export function quoteNav(): { groups: NavGroup[]; links: NavLink[] } {
  return {
    groups: GROUPS.map((group) => ({
      id: group.id,
      label: group.label,
      items: servicesOf(group.id).map((service) => ({
        id: service.id,
        no: serviceNo(service),
        label: service.title,
        theme: THEME[service.id],
      })),
    })),
    links: [
      { href: "/quote#summary", label: "견적 정리" },
      { href: "/quote#process", label: "진행 방식" },
      { href: "/quote#about", label: "하람 소개" },
    ],
  };
}

/** **굵게** 표시한 부분만 진하게 */
export function RichText({ text }: { text: string }) {
  return (
    <>
      {text.split(/(\*\*[^*]+\*\*)/g).map((part, index) =>
        part.startsWith("**") ? <strong key={index}>{part.slice(2, -2)}</strong> : part,
      )}
    </>
  );
}

/** 포함 사항에도 해당 서비스의 새 화면 이미지를 사용합니다. */
export function FeatureVisual({ serviceId, index }: { serviceId: string; index: number }) {
  return <span className="wq-feature-image" data-detail={index % 4}><ServicePreview id={serviceId} decorative sizes="(max-width: 960px) 45vw, 280px" /></span>;
}

export function PhoneIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
      <path d="M7.5 4h-2A1.5 1.5 0 0 0 4 5.6 14.4 14.4 0 0 0 18.4 20a1.5 1.5 0 0 0 1.6-1.5v-2l-3.6-1.6-1.8 1.8a10.6 10.6 0 0 1-5.3-5.3L11.1 9.6 9.5 6z" />
    </svg>
  );
}

export function LockIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
      <rect x="5" y="10.5" width="14" height="10" />
      <path d="M8.5 10.5V7.5a3.5 3.5 0 0 1 7 0v3" />
    </svg>
  );
}

/** 인스타그램·블로그 등 서비스 화면을 담은 완성 이미지를 보여 줍니다. */
export function ServiceVisual({ service }: { service: Service }) {
  return (
    <figure className="wq-visual">
      <ServicePreview id={service.id} preload />
      <figcaption>서비스 이해를 돕는 예시 이미지입니다. 실제 화면·정보·수치는 예식장에 맞춰 구성합니다.</figcaption>
    </figure>
  );
}

/** 상담 · 견적 문의 — 모든 견적서 페이지 맨 아래 */
export function QuoteFooter() {
  return (
    <footer className="wq-foot" data-theme="dark">
      <div className="wq-wrap">
        <div className="wq-foot-grid">
          <div>
            <p className="wq-eyebrow">Contact</p>
            <a className="wq-foot-phone" href={tel}>
              {SENDER.phone}
            </a>
            <p className="wq-foot-rep">상담 · 견적 문의 {SENDER.rep}</p>
          </div>
          <div className="wq-foot-actions">
            <a href={tel} className="wq-btn wq-btn-solid">
              <PhoneIcon />
              전화 상담
            </a>
            <a href={PDF_URL} download={PDF_FILENAME} className="wq-btn">
              PDF 받기
            </a>
          </div>
        </div>
        <div className="wq-foot-meta">
          <span className="wq-foot-logo">
            하람마케팅<i aria-hidden="true" />HARAM MARKETING
          </span>
          <span>
            {CLIENT.nameEn.toUpperCase()} × {SENDER.nameEn}
          </span>
          <span>{DOC.year}</span>
        </div>
      </div>
    </footer>
  );
}
