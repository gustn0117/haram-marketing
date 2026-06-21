import { promises as fs } from "fs";
import path from "path";
import crypto from "crypto";

export type Inquiry = {
  id: string;
  createdAt: string;
  name: string;
  company: string;
  phone: string;
  type: string;
  budget: string;
  message: string;
};

// Docker 컨테이너에서는 persistent-data 볼륨(/app/data)에 저장되어 재배포에도 유지됩니다.
const DATA_DIR = process.env.DATA_DIR || path.join(process.cwd(), "data");
const FILE = path.join(DATA_DIR, "inquiries.json");

async function ensureFile() {
  await fs.mkdir(DATA_DIR, { recursive: true });
  try {
    await fs.access(FILE);
  } catch {
    await fs.writeFile(FILE, "[]", "utf8");
  }
}

export async function readInquiries(): Promise<Inquiry[]> {
  await ensureFile();
  try {
    const raw = await fs.readFile(FILE, "utf8");
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? (parsed as Inquiry[]) : [];
  } catch {
    return [];
  }
}

export async function addInquiry(
  data: Omit<Inquiry, "id" | "createdAt">,
): Promise<Inquiry> {
  const list = await readInquiries();
  const item: Inquiry = {
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
    ...data,
  };
  list.unshift(item);
  await fs.writeFile(FILE, JSON.stringify(list, null, 2), "utf8");
  return item;
}

export async function deleteInquiry(id: string): Promise<void> {
  const list = await readInquiries();
  const next = list.filter((i) => i.id !== id);
  await fs.writeFile(FILE, JSON.stringify(next, null, 2), "utf8");
}
