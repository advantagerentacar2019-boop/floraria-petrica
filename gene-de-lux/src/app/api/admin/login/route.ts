import { NextResponse } from "next/server";
import {
  createSessionToken,
  getAuthConfigError,
  sessionCookieOptions,
  verifyPassword,
} from "../../../../lib/auth";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  const configError = getAuthConfigError();
  if (configError) {
    return NextResponse.json(
      {
        error:
          "Adminul nu este configurat. Setează ADMIN_PASSWORD și ADMIN_SESSION_SECRET în Secrets.",
        code: configError,
      },
      { status: 503, headers: { "cache-control": "no-store" } },
    );
  }

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
    { ok: true },
    { headers: { "cache-control": "no-store" } },
  );
  res.cookies.set(cookie);
  return res;
}
