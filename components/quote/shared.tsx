import { CLIENT, DOC, GROUPS, PDF_FILENAME, PDF_URL, SENDER, VAT_LABEL, servicesOf, serviceNo, type Service } from "@/lib/quote-data";
import Specimen, { SPECIMEN_DEVICE } from "@/components/client/Specimen";
import Image from "next/image";
import ServiceFeature from "@/components/client/ServiceFeature";
import type { PhotoId } from "@/components/client/previews/primitives";
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

/** 사진 자리(빗금)에 적는 말 — 어떤 사진을 넣을 자리인지 */
export const IMAGE_LABEL: Record<string, string> = {
  instagram: "이미지 · 피드 사진",
  blog: "이미지 · 블로그 대표 사진",
  posting: "이미지 · 후기 사진",
  place: "이미지 · 홀 전경 사진",
  crm: "이미지 · 운영 화면",
  homepage: "이미지 · 홈페이지 첫 화면",
  landing: "이미지 · 이벤트 배너",
  fair: "이미지 · 박람회 현장 사진",
  membership: "이미지 · 회원 카드",
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

/** 미리 정한 이미지 자리의 위치와 크기는 유지하고 내용만 채웁니다. */
export function Hatch({ label, className = "", image, serviceId, index = 0 }: {
  label: string; className?: string; image?: PhotoId; serviceId?: string; index?: number;
}) {
  const photo = image ?? (label.includes("팀") ? "team" : "hero");
  return (
    <div className={`wq-hatch ${className}`} aria-hidden="true">
      {serviceId ? <ServiceFeature id={serviceId} index={index} /> : <Image src={`/images/preview-photos/${photo}.webp`} alt="" fill sizes="(max-width: 960px) 90vw, 45vw" />}
    </div>
  );
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

/** 3D 비주얼이 있는 서비스는 뒤 사진과 별도 문구 없이 표시합니다. */
export function ServiceVisual({ service }: { service: Service }) {
  const isStandaloneVisual = service.group === "marketing" || service.id === "crm" || service.id === "homepage";
  const photos: Record<string, PhotoId> = { landing: "couple", fair: "consultation", membership: "reception" };
  return (
    <figure className="wq-visual" data-device={SPECIMEN_DEVICE[service.id]} data-service={service.id}>
      {!isStandaloneVisual && <Hatch className="wq-visual-image" label={IMAGE_LABEL[service.id]} image={photos[service.id]} />}
      <div className="wq-visual-mock">
        <Specimen id={service.id} />
      </div>
      {!isStandaloneVisual && <figcaption>예시 화면입니다. 실제 구성은 예식장에 맞춰 정합니다.</figcaption>}
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
