import "server-only";
import { SAMPLE_HALLS } from "./sample";
import type { Role, Viewer } from "./types";

/* 로그인 계정 — 틀 단계라 샘플 계정만 있습니다.
   - 웨딩홀 계정: 계약 중인 샘플 웨딩홀마다 하나 (아이디는 Hall.loginId, 비밀번호 1234)
   - 하람 계정: 아이디 haram, 비밀번호는 문의 관리(/admin)와 같은 ADMIN_PASSWORD (없으면 1234)
   실제 계정은 하람 관리 화면에서 웨딩홀마다 발급해 DB에 저장하고, 비밀번호는 해시로만 보관하도록 바꿉니다.
   그때 로그인 시도 횟수 제한도 함께 붙입니다. */

type Account = Viewer & { loginId: string; password: string };

const SAMPLE_PASSWORD = "1234";

function accounts(): Account[] {
  return [
    ...SAMPLE_HALLS.filter((hall) => hall.status === "active").map((hall) => ({
      accountId: `acc-${hall.id}`,
      loginId: hall.loginId,
      password: SAMPLE_PASSWORD,
      role: "hall" as Role,
      name: hall.name,
      hallId: hall.id,
    })),
    {
      accountId: "acc-haram",
      loginId: "haram",
      password: process.env.ADMIN_PASSWORD || SAMPLE_PASSWORD,
      role: "admin" as Role,
      name: "하람마케팅",
      hallId: null,
    },
  ];
}

const toViewer = ({ accountId, role, name, hallId }: Account): Viewer => ({ accountId, role, name, hallId });

/** 아이디 · 비밀번호 확인 — 맞으면 화면에 내려도 되는 값만 돌려줌 */
export async function checkLogin(loginId: string, password: string): Promise<Viewer | null> {
  const account = accounts().find((item) => item.loginId === loginId.trim().toLowerCase());
  return account && account.password === password ? toViewer(account) : null;
}

/** 세션의 계정 번호로 다시 찾기 — 계약이 끝나 계정을 막으면 여기서 null */
export async function findAccount(accountId: string): Promise<Viewer | null> {
  const account = accounts().find((item) => item.accountId === accountId);
  return account ? toViewer(account) : null;
}
