import { NextResponse } from "next/server";
import {
  createSessionToken,
  isSampleAdminAuth,
  sessionCookieOptions,
  verifyPassword,
} from "../../../../lib/auth";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  let password = "";
  try {
    const body = (await request.json()) as { password?: string };
    password = body.password ?? "";
  } catch {
    return NextResponse.json({ error: "JSON invalid." }, { status: 400 });
  }

  if (!verifyPassword(password)) {
    return NextResponse.json({ error: "Parolă greșită." }, { status: 401 });
  }

  const token = createSessionToken();
  const cookie = sessionCookieOptions(token);
  const res = NextResponse.json(
    { ok: true, sampleAuth: isSampleAdminAuth() },
    { headers: { "cache-control": "no-store" } },
  );
  res.cookies.set(cookie);
  return res;
}
