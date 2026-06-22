"use client";

import { useState } from "react";
import { Container } from "@/components/ui";

type Inquiry = {
  id: string;
  createdAt: string;
  name: string;
  company: string;
  phone: string;
  type: string;
  budget: string;
  message: string;
};

export default function AdminPage() {
  const [password, setPassword] = useState("");
  const [authed, setAuthed] = useState(false);
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function call(action?: "delete", id?: string) {
    const res = await fetch("/api/admin", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password, action, id }),
    });
    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      throw new Error(data.error || "요청에 실패했습니다.");
    }
    return res.json();
  }

  async function login(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const data = await call();
      setInquiries(data.inquiries ?? []);
      setAuthed(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  }

  async function refresh() {
    setLoading(true);
    try {
      const data = await call();
      setInquiries(data.inquiries ?? []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  }

  async function remove(id: string) {
    if (!confirm("이 문의를 삭제할까요?")) return;
    try {
      const data = await call("delete", id);
      setInquiries(data.inquiries ?? []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "오류가 발생했습니다.");
    }
  }

  function fmt(iso: string) {
    try {
      return new Date(iso).toLocaleString("ko-KR", {
        dateStyle: "medium",
        timeStyle: "short",
      });
    } catch {
      return iso;
    }
  }

  if (!authed) {
    return (
      <Container className="flex min-h-screen flex-col items-center justify-center py-32">
        <form
          onSubmit={login}
          className="flex w-full max-w-sm flex-col gap-5 rounded-2xl border border-line bg-surface p-8"
        >
          <div className="flex flex-col gap-1">
            <span className="label">ADMIN</span>
            <h1 className="font-serif text-2xl">문의 관리</h1>
          </div>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="비밀번호"
            autoFocus
            className="form-input"
          />
          {error ? <p className="text-sm text-red-500">{error}</p> : null}
          <button
            type="submit"
            disabled={loading}
            className="rounded-sm bg-gold px-6 py-3.5 text-sm font-medium text-ink transition-colors duration-300 hover:bg-gold-bright disabled:opacity-60"
          >
            {loading ? "확인 중…" : "로그인"}
          </button>
        </form>
      </Container>
    );
  }

  return (
    <Container className="min-h-screen py-32">
      <div className="flex flex-col gap-3 border-b border-line pb-8 sm:flex-row sm:items-end sm:justify-between">
        <div className="flex flex-col gap-1">
          <span className="label">ADMIN</span>
          <h1 className="font-serif text-3xl">문의 관리</h1>
          <p className="text-sm text-muted">총 {inquiries.length}건</p>
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={refresh}
            disabled={loading}
            className="rounded-sm border border-line-strong px-5 py-2.5 text-sm transition-colors hover:border-gold hover:text-gold disabled:opacity-60"
          >
            {loading ? "불러오는 중…" : "새로고침"}
          </button>
          <button
            type="button"
            onClick={() => {
              setAuthed(false);
              setPassword("");
              setInquiries([]);
            }}
            className="rounded-sm border border-line-strong px-5 py-2.5 text-sm transition-colors hover:border-gold hover:text-gold"
          >
            로그아웃
          </button>
        </div>
      </div>

      {error ? <p className="mt-6 text-sm text-red-500">{error}</p> : null}

      {inquiries.length === 0 ? (
        <p className="py-20 text-center text-sm text-muted">
          아직 접수된 문의가 없습니다.
        </p>
      ) : (
        <ul className="mt-8 flex flex-col gap-4">
          {inquiries.map((q) => (
            <li
              key={q.id}
              className="flex flex-col gap-4 rounded-2xl border border-line bg-surface p-6"
            >
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div className="flex flex-col gap-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="font-serif text-lg">{q.name}</h3>
                    {q.company ? (
                      <span className="text-sm text-muted">· {q.company}</span>
                    ) : null}
                  </div>
                  <span className="text-xs text-faint">{fmt(q.createdAt)}</span>
                </div>
                <button
                  type="button"
                  onClick={() => remove(q.id)}
                  className="rounded-sm border border-line px-3 py-1.5 text-xs text-muted transition-colors hover:border-red-400 hover:text-red-500"
                >
                  삭제
                </button>
              </div>

              <div className="flex flex-wrap gap-x-6 gap-y-1.5 text-sm">
                <span>
                  <span className="text-faint">연락처</span>{" "}
                  <a href={`tel:${q.phone.replace(/-/g, "")}`} className="text-gold">
                    {q.phone}
                  </a>
                </span>
                {q.type ? (
                  <span>
                    <span className="text-faint">유형</span> {q.type}
                  </span>
                ) : null}
                {q.budget ? (
                  <span>
                    <span className="text-faint">예산</span> {q.budget}
                  </span>
                ) : null}
              </div>

              <p className="whitespace-pre-wrap border-t border-line pt-4 text-sm leading-relaxed text-paper/90">
                {q.message}
              </p>
            </li>
          ))}
        </ul>
      )}
    </Container>
  );
}
