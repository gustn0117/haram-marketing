import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import "../quote.css";
import { PDF_FILENAME, PDF_URL, PROCESS, SERVICES, groupOf, pad2, serviceNo, shortName, type Service } from "@/lib/quote-data";
import PriceLines from "@/components/quote/PriceLines";
import QuoteHeader from "@/components/quote/QuoteHeader";
import {
  Hatch,
  LockIcon,
  PhoneIcon,
  QuoteFooter,
  ServiceVisual,
  THEME,
  keepDots,
  priceCaption,
  quoteNav,
  tel,
} from "@/components/quote/shared";

/* ─────────────────────────────────────────────────────────────
   서비스 안내 페이지 (/quote/[서비스]) — 서비스 하나를 랜딩페이지 한 장으로.
   첫 화면은 플랫폼 색(인스타그램 그라데이션 · 네이버 초록 · 차콜 / 오프화이트), 아래 구역은 흰 바탕에 같은 색을 포인트로.
   첫 화면 · 포함 사항 · 진행 방식 · 비용 · 이전 / 다음 서비스.
   글과 금액은 lib/quote-data.ts. 더 자세한 내용은 고객 전용 페이지(/client/[서비스], 비밀번호)로 연결합니다.
   ───────────────────────────────────────────────────────────── */

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return SERVICES.map((service) => ({ slug: service.id }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const service = SERVICES.find((item) => item.id === slug);
  return {
    title: service ? `${service.title} · 서비스 견적서` : "서비스 견적서",
    robots: { index: false, follow: false },
  };
}

/** 금액이 두 줄이거나 '견적 협의'가 있으면 그 설명, 아니면 data.ts 의 비용 안내 문장 */
const priceNotice = (service: Service) => service.notice;

const PROCESS_NOTE: Record<string, string> = {
  marketing: "첫 달에는 진단과 셋업을 함께 하고, 이후에는 매달 같은 순서로 운영합니다.",
  build: "범위와 일정을 먼저 정하고, 단계마다 결과물을 공유하며 오픈까지 진행합니다.",
};

export default async function ServiceLanding({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const service = SERVICES.find((item) => item.id === slug);
  if (!service) notFound();

  const group = groupOf(service.group);
  const index = SERVICES.indexOf(service);
  const prev = SERVICES[(index - 1 + SERVICES.length) % SERVICES.length];
  const next = SERVICES[(index + 1) % SERVICES.length];

  return (
    <div className="wq is-light">
      <a href="#wq-main" className="wq-skip">
        본문으로 이동
      </a>
      <QuoteHeader {...quoteNav()} current={service.id} pdfUrl={PDF_URL} pdfFilename={PDF_FILENAME} />
      <main id="wq-main" className="wq-lp" data-theme={THEME[service.id]}>
        {/* ── 첫 화면 — 플랫폼 색 ── */}
        <section className="wq-svc wq-lp-hero" aria-labelledby="wq-lp-title">
          <div className="wq-wrap wq-svc-grid">
            <div className="wq-svc-copy">
              <nav className="wq-crumbs" aria-label="현재 위치">
                <Link href="/quote">서비스 견적서</Link>
                <span aria-hidden="true">/</span>
                <Link href="/quote#services">{group.label}</Link>
              </nav>
              <p className="wq-svc-mark">
                <span className="wq-svc-no">{serviceNo(service)}</span>
                <span className="wq-svc-en">{service.en}</span>
              </p>
              <h1 id="wq-lp-title">{keepDots(service.title)}</h1>
              <p className="wq-svc-desc">{keepDots(service.description)}</p>
              <div className="wq-price">
                <p className="wq-price-label">비용</p>
                <PriceLines service={service} className="wq-price-lines" />
                <p className="wq-price-caption">{priceCaption(service)}</p>
                <div className="wq-price-actions">
                  <a href={tel} className="wq-btn wq-btn-solid">
                    <PhoneIcon />
                    전화 상담
                  </a>
                  <a href={`/client/${service.id}`} className="wq-btn" title="견적서와 함께 받은 비밀번호로 열립니다">
                    <LockIcon />
                    자세히 보기
                  </a>
                </div>
              </div>
            </div>
            <ServiceVisual service={service} />
          </div>
        </section>

        {/* ── 포함 사항 ── */}
        <section className="wq-lp-section" aria-labelledby="wq-lp-includes">
          <div className="wq-wrap">
            <header className="wq-head">
              <p className="wq-eyebrow">What&apos;s Included</p>
              <h2 id="wq-lp-includes">포함 사항</h2>
              <p>{keepDots(service.summary)}</p>
            </header>
            <ul className="wq-features">
              {service.includes.map((item) => (
                <li key={item} className="wq-feature">
                  <Hatch label="이미지" />
                  <i aria-hidden="true" />
                  <strong>{keepDots(item)}</strong>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ── 진행 방식 ── */}
        <section className="wq-lp-section is-tint" aria-labelledby="wq-lp-process">
          <div className="wq-wrap">
            <header className="wq-head">
              <p className="wq-eyebrow">Process</p>
              <h2 id="wq-lp-process">진행 방식</h2>
              <p>{PROCESS_NOTE[service.group]}</p>
            </header>
            <ol className="wq-steps">
              {PROCESS[service.group].map((step, stepIndex) => (
                <li key={step.title}>
                  <span>{pad2(stepIndex + 1)}</span>
                  <strong>{step.title}</strong>
                  <p>{step.detail}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* ── 비용 ── */}
        <section className="wq-lp-section" aria-labelledby="wq-lp-cost">
          <div className="wq-wrap wq-cost">
            <header className="wq-head">
              <p className="wq-eyebrow">Price</p>
              <h2 id="wq-lp-cost">비용</h2>
              <p>
                다른 서비스와 묶음 합계는{" "}
                <Link href="/quote#summary" className="wq-inline-link">
                  견적 정리
                </Link>
                에서 볼 수 있습니다.
              </p>
            </header>
            <div className="wq-cost-card">
              <PriceLines service={service} className="wq-cost-lines" />
              <p className="wq-price-caption">{priceCaption(service)}</p>
              {priceNotice(service) && <p className="wq-cost-notice">{priceNotice(service)}</p>}
              <div className="wq-price-actions">
                <a href={tel} className="wq-btn wq-btn-solid">
                  <PhoneIcon />
                  전화 상담
                </a>
                <a href={PDF_URL} download={PDF_FILENAME} className="wq-btn">
                  PDF 받기
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ── 이전 · 다음 서비스 ── */}
        <nav className="wq-lp-section wq-pager-wrap" aria-label="다른 서비스">
          <div className="wq-wrap">
            <div className="wq-pager">
              {[
                { item: prev, label: "이전 서비스" },
                { item: next, label: "다음 서비스" },
              ].map(({ item, label }) => (
                <Link key={label} href={`/quote/${item.id}`} className="wq-pager-card" data-theme={THEME[item.id]}>
                  <small>{label}</small>
                  <span>
                    {serviceNo(item)} {keepDots(shortName(item))}
                  </span>
                </Link>
              ))}
            </div>
            <Link href="/quote#services" className="wq-pager-all">
              서비스 {SERVICES.length}가지 모두 보기
            </Link>
          </div>
        </nav>
      </main>
      <QuoteFooter />
    </div>
  );
}
