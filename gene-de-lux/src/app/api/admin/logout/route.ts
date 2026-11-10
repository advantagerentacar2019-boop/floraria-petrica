import { NextResponse } from "next/server";
import { clearSessionCookieOptions } from "../../../../lib/auth";

export const dynamic = "force-dynamic";

export async function POST() {
  const cookie = clearSessionCookieOptions();
  const res = NextResponse.json(
    { ok: true },
    { headers: { "cache-control": "no-store" } },
  );
  res.cookies.set(cookie);
  return res;
}
