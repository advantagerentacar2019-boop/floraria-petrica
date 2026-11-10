import { createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";

const COOKIE = "gdl_admin";
const MAX_AGE_SEC = 60 * 60 * 12;

export type AuthConfigError = "missing_admin_password" | "missing_session_secret";

function readSecret(name: "ADMIN_PASSWORD" | "ADMIN_SESSION_SECRET"): string | null {
  const value = process.env[name]?.trim() ?? "";
  return value.length > 0 ? value : null;
}

/** Admin auth is available only when both secrets are configured. */
export function getAuthConfigError(): AuthConfigError | null {
  if (!readSecret("ADMIN_PASSWORD")) return "missing_admin_password";
  if (!readSecret("ADMIN_SESSION_SECRET")) return "missing_session_secret";
  return null;
}

function sessionSigningKey(): string {
  const key = readSecret("ADMIN_SESSION_SECRET");
  if (!key) {
    throw new Error("ADMIN_SESSION_SECRET is not configured");
  }
  return key;
}

function sign(value: string): string {
  return createHmac("sha256", sessionSigningKey()).update(value).digest("hex");
}

export function verifyPassword(password: string): boolean {
  const expected = readSecret("ADMIN_PASSWORD");
  if (!expected) return false;
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
  if (getAuthConfigError()) return false;
  const [exp, sig] = token.split(".");
  if (!exp || !sig) return false;
  const expNum = Number(exp);
  if (!Number.isFinite(expNum) || expNum * 1000 < Date.now()) return false;
  try {
    const expected = sign(exp);
    return timingSafeEqual(Buffer.from(sig), Buffer.from(expected));
  } catch {
    return false;
  }
}

export async function requireAdmin(): Promise<boolean> {
  const jar = await cookies();
  return readTokenValid(jar.get(COOKIE)?.value);
}
