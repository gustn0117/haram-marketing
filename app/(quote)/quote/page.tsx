import type { Metadata } from "next";
import Link from "next/link";
import "./quote.css";
import {
  ABOUT,
  CLIENT,
  COVER,
  DOC,
  GROUPS,
  NOTES,
  PDF_FILENAME,
  PDF_URL,
  PROCESS,
  SENDER,
  SERVICES,
  VAT_LABEL,
  groupOf,
  groupTotal,
  pad2,
  serviceNo,
  servicesOf,
} from "@/lib/quote-data";
import PriceLines from "@/components/quote/PriceLines";
import Specimen, { SPECIMEN_DEVICE } from "@/components/client/Specimen";
import QuoteHeader from "@/components/quote/QuoteHeader";
import { Hatch, QuoteFooter, RichText, THEME, keepDots, quoteNav, tel } from "@/components/quote/shared";

/* ─────────────────────────────────────────────────────────────
   견적서 메뉴 (haram-marketing.co.kr/quote) — 흰 바탕.
   첫 화면 · 서비스 9가지 카드(누르면 서비스별 안내 페이지 /quote/[서비스]) · 견적 정리 · 진행 방식 · 하람 소개.
   글과 금액은 lib/quote-data.ts(견적서 저장소 data.ts 사본)에서 가져옵니다.
   [PDF 받기]는 public/documents 의 A4 견적서 PDF (견적서 저장소에서 npm run pdf 로 만든 파일의 사본).
   ───────────────────────────────────────────────────────────── */

export const metadata: Metadata = {
  title: "서비스 견적서",
  description: "하람마케팅 서비스 견적서 — 마케팅 대행 · 제작 개발 서비스 9가지와 비용",
  /* 견적서는 검색에 노출하지 않음 (사이트맵에도 넣지 않음) */
  robots: { index: false, follow: false },
};

export default function QuoteMenu() {
  return (
    <div className="wq is-light">
      <a href="#wq-main" className="wq-skip">
        본문으로 이동
      </a>
      <QuoteHeader {...quoteNav()} pdfUrl={PDF_URL} pdfFilename={PDF_FILENAME} />
      <main id="wq-main">
        <Hero />
        <ServiceMenu />
        <Summary />
        <Process />
        <About />
      </main>
      <QuoteFooter />
    </div>
  );
}

/* ── 첫 화면 — 제목 · 받는 곳 / 대표 사진 자리 ── */
function Hero() {
  return (
    <section className="wq-hero" id="top" aria-labelledby="wq-title">
      <div className="wq-wrap wq-hero-grid">
        <div className="wq-hero-copy">
          <p className="wq-eyebrow">
            {DOC.titleEn} · {DOC.year}
          </p>
          <h1 id="wq-title">
            {SENDER.nameKr} {DOC.title}
          </h1>
          <p className="wq-hero-statement">{COVER.statement.join(" ")}</p>
          <p className="wq-hero-context">
            {keepDots(COVER.context.join(" "))} 금액은 모두 {VAT_LABEL}입니다.
          </p>
          <dl className="wq-hero-meta">
            <div>
              <dt>받는 곳</dt>
              <dd>{CLIENT.addressee}</dd>
            </div>
            <div>
              <dt>보내는 곳</dt>
              <dd>하람마케팅 · {SENDER.rep}</dd>
            </div>
            <div>
              <dt>문의</dt>
              <dd>
                <a href={tel}>{SENDER.phone}</a>
              </dd>
            </div>
          </dl>
        </div>
        <Hatch className="wq-hero-image" label="이미지 · 웨딩홀 대표 사진" />
      </div>
    </section>
  );
}

/* ── 서비스 9가지 — 플랫폼 색 카드, 누르면 서비스별 안내 페이지 ── */
function ServiceMenu() {
  return (
    <section id="services" className="wq-menu" aria-labelledby="wq-menu-title">
      <div className="wq-wrap">
        <header className="wq-head">
          <p className="wq-eyebrow">Services</p>
          <h2 id="wq-menu-title">서비스 {SERVICES.length}가지</h2>
          <p>서비스를 누르면 서비스별 안내 페이지가 열립니다.</p>
        </header>
        <div className="wq-cards">
          {SERVICES.map((service) => (
            <Link key={service.id} href={`/quote/${service.id}`} className="wq-card" data-theme={THEME[service.id]}>
              <span className="wq-card-visual" data-device={SPECIMEN_DEVICE[service.id]}>
                <Specimen id={service.id} />
              </span>
              <span className="wq-card-body">
                <span className="wq-card-meta">
                  <span>{serviceNo(service)}</span>
                  <span>{groupOf(service.group).label}</span>
                </span>
                <strong>{keepDots(service.title)}</strong>
                <span className="wq-card-summary">{keepDots(service.summary)}</span>
                <span className="wq-card-foot">
                  <PriceLines service={service} className="wq-card-price" />
                  <span className="wq-card-go">안내 보기</span>
                </span>
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── 견적 정리 — 서비스별 금액 · 묶음 합계 · 안내사항 ── */
function Summary() {
  return (
    <section id="summary" className="wq-summary" aria-labelledby="wq-summary-title">
      <div className="wq-wrap">
        <header className="wq-head">
          <p className="wq-eyebrow">Quotation</p>
          <h2 id="wq-summary-title">견적 정리</h2>
          <p>서비스별 금액과 묶음 합계입니다. 금액은 모두 {VAT_LABEL}입니다.</p>
        </header>
        <div className="wq-sheet">
          {GROUPS.map((group) => {
            const total = groupTotal(group.id);
            return (
              <div key={group.id} className="wq-sum-group">
                <h3>
                  {group.label}
                  <span>{group.basis}</span>
                </h3>
                <ul>
                  {servicesOf(group.id).map((service) => (
                    <li key={service.id}>
                      <Link href={`/quote/${service.id}`} className="wq-sum-row">
                        <i data-theme={THEME[service.id]} aria-hidden="true" />
                        <span className="wq-sum-name">{keepDots(service.title)}</span>
                        <span className="wq-sum-summary">{keepDots(service.summary)}</span>
                        <PriceLines service={service} className="wq-sum-price" />
                      </Link>
                    </li>
                  ))}
                </ul>
                <p className="wq-sum-total">
                  <span className="wq-sum-total-label">
                    {total.label}
                    {total.hasAmount && !total.complete && <small>{total.excluded.join(", ")} 별도</small>}
                  </span>
                  <strong>{total.value}</strong>
                </p>
              </div>
            );
          })}
          <ul className="wq-notes">
            {NOTES.map((note) => (
              <li key={note}>{note}</li>
            ))}
          </ul>
          <div className="wq-sheet-foot">
            <p>
              견적 및 상담 문의 <strong>{SENDER.rep}</strong> <a href={tel}>{SENDER.phone}</a>
            </p>
            <a href={PDF_URL} download={PDF_FILENAME} className="wq-btn wq-btn-solid">
              PDF 받기
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── 진행 방식 — 마케팅 대행 · 제작 개발 각 네 단계 ── */
function Process() {
  return (
    <section id="process" className="wq-process" aria-labelledby="wq-process-title">
      <div className="wq-wrap">
        <header className="wq-head">
          <p className="wq-eyebrow">How We Work</p>
          <h2 id="wq-process-title">진행 방식</h2>
          <p>마케팅 대행은 매달 같은 순서로 운영하고, 제작 · 개발은 오픈까지 네 단계로 진행합니다.</p>
        </header>
        <div className="wq-tracks">
          {GROUPS.map((group) => (
            <div key={group.id} className="wq-track">
              <h3>{group.label}</h3>
              <ol>
                {PROCESS[group.id].map((step, index) => (
                  <li key={step.title}>
                    <span>{pad2(index + 1)}</span>
                    <div>
                      <strong>{step.title}</strong>
                      <p>{step.detail}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── 하람 소개 — 소개 · 사진 자리 · 일하는 방식 네 가지 ── */
function About() {
  return (
    <section id="about" className="wq-about" aria-labelledby="wq-about-title">
      <div className="wq-wrap">
        <div className="wq-about-grid">
          <div className="wq-head">
            <p className="wq-eyebrow">About Haram</p>
            <h2 id="wq-about-title">{ABOUT.title}</h2>
            {ABOUT.intro.map((text) => (
              <p key={text}>
                <RichText text={text} />
              </p>
            ))}
          </div>
          <Hatch className="wq-about-image" label="이미지 · 하람마케팅 팀 사진" />
        </div>
        <ul className="wq-strengths">
          {ABOUT.strengths.map((item) => (
            <li key={item.title}>
              <strong>{item.title}</strong>
              <p>{item.detail}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
