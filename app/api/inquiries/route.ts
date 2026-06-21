import { NextResponse } from "next/server";
import { addInquiry } from "@/lib/inquiries";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const name = String(body.name ?? "").trim();
    const phone = String(body.phone ?? "").trim();
    const message = String(body.message ?? "").trim();

    if (!name || !phone || !message) {
      return NextResponse.json(
        { ok: false, error: "이름·연락처·내용은 필수입니다." },
        { status: 400 },
      );
    }

    await addInquiry({
      name,
      company: String(body.company ?? "").trim(),
      phone,
      type: String(body.type ?? "").trim(),
      budget: String(body.budget ?? "").trim(),
      message,
    });

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json(
      { ok: false, error: "처리 중 오류가 발생했습니다." },
      { status: 500 },
    );
  }
}
