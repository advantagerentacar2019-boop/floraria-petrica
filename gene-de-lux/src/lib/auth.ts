import { createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";

const COOKIE = "gdl_admin";
const MAX_AGE_SEC = 60 * 60 * 12;

function adminPassword(): string {
  const fromEnv = process.env.ADMIN_PASSWORD?.trim();
  if (fromEnv) return fromEnv;
  // Local / sample fallback until the user sets ADMIN_PASSWORD in Cursor secrets
  return "demo-admin";
}

export function isSampleAdminAuth(): boolean {
  return !process.env.ADMIN_PASSWORD?.trim();
}

function sign(value: string): string {
  return createHmac("sha256", adminPassword()).update(value).digest("hex");
}

export function verifyPassword(password: string): boolean {
  const expected = adminPassword();
  const a = Buffer.from(password);
  const b = Buffer.from(expected);
  if (a.length !== b.length) return false;
  return timingSafeEqual(a, b);
}

export function createSessionToken(): string {
  const exp = String(Math.floor(Date.now() / 1000) + MAX_AGE_SEC);
  return `${exp}.${sign(exp)}`;
}

export function sessionCookieOptions(token: string) {
  return {
    name: COOKIE,
    value: token,
    httpOnly: true,
    sameSite: "lax" as const,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: MAX_AGE_SEC,
  };
}

export function clearSessionCookieOptions() {
  return {
    name: COOKIE,
    value: "",
    httpOnly: true,
    sameSite: "lax" as const,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 0,
  };
}

export function readTokenValid(token: string | undefined): boolean {
  if (!token) return false;
  const [exp, sig] = token.split(".");
  if (!exp || !sig) return false;
  const expNum = Number(exp);
  if (!Number.isFinite(expNum) || expNum * 1000 < Date.now()) return false;
  const expected = sign(exp);
  try {
    return timingSafeEqual(Buffer.from(sig), Buffer.from(expected));
  } catch {
    return false;
  }
}

export async function requireAdmin(): Promise<boolean> {
  const jar = await cookies();
  return readTokenValid(jar.get(COOKIE)?.value);
}
