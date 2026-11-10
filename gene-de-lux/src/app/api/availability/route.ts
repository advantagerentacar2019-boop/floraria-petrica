import { NextRequest } from "next/server";
import { sql } from "../../../lib/db";
import { generateCandidateSlots, overlaps } from "../../../lib/slots";

export const dynamic = "force-dynamic";

type Row = { starts_at: string; ends_at: string };

function dayKey(iso: string): string {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "Europe/Bucharest",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date(iso));
}

export async function GET(request: NextRequest) {
  const date = request.nextUrl.searchParams.get("date");
  const busy = await sql<Row>(
    `select starts_at::text as starts_at, ends_at::text as ends_at
     from appointments
     where status = 'confirmed' and ends_at > now()`,
  );

  let slots = generateCandidateSlots();
  if (date) {
    slots = slots.filter((s) => dayKey(s.startsAt) === date);
  }

  const available = slots.filter(
    (slot) =>
      !busy.some((b) =>
        overlaps(slot.startsAt, slot.endsAt, b.starts_at, b.ends_at),
      ),
  );

  return Response.json(
    { slots: available },
    { headers: { "cache-control": "no-store" } },
  );
}
