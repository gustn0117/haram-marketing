import { NextResponse } from "next/server";
import { readInquiries, deleteInquiry } from "@/lib/inquiries";

export const dynamic = "force-dynamic";

const PASSWORD = process.env.ADMIN_PASSWORD || "1234";

export async function POST(req: Request) {
  const body = await req.json().catch(() => ({}));

  if (String(body.password ?? "") !== PASSWORD) {
    return NextResponse.json(
      { ok: false, error: "비밀번호가 올바르지 않습니다." },
      { status: 401 },
    );
  }

  if (body.action === "delete") {
    const id = String(body.id ?? "");
    if (id) await deleteInquiry(id);
    const inquiries = await readInquiries();
    return NextResponse.json({ ok: true, inquiries });
  }

  const inquiries = await readInquiries();
  return NextResponse.json({ ok: true, inquiries });
}
