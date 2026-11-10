import { randomUUID } from "node:crypto";
import { sql } from "../../../lib/db";
import { getService } from "../../../lib/services";
import { generateCandidateSlots, overlaps } from "../../../lib/slots";

export const dynamic = "force-dynamic";

type Row = { starts_at: string; ends_at: string };

export async function POST(request: Request) {
  let body: {
    serviceId?: string;
    clientName?: string;
    clientPhone?: string;
    startsAt?: string;
    notes?: string;
  };
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "JSON invalid." }, { status: 400 });
  }

  const serviceId = body.serviceId?.trim() ?? "";
  const clientName = body.clientName?.trim() ?? "";
  const clientPhone = body.clientPhone?.trim() ?? "";
  const startsAt = body.startsAt?.trim() ?? "";
  const notes = body.notes?.trim() ?? "";

  const service = getService(serviceId);
  if (!service) {
    return Response.json({ error: "Serviciu invalid." }, { status: 400 });
  }
  if (clientName.length < 2) {
    return Response.json({ error: "Numele este obligatoriu." }, { status: 400 });
  }
  if (clientPhone.length < 6) {
    return Response.json({ error: "Telefon invalid." }, { status: 400 });
  }

  const slot = generateCandidateSlots().find((s) => s.startsAt === startsAt);
  if (!slot) {
    return Response.json(
      { error: "Intervalul nu mai este disponibil." },
      { status: 409 },
    );
  }

  const busy = await sql<Row>(
    `select starts_at::text as starts_at, ends_at::text as ends_at
     from appointments
     where status = 'confirmed' and ends_at > now()`,
  );
  if (
    busy.some((b) => overlaps(slot.startsAt, slot.endsAt, b.starts_at, b.ends_at))
  ) {
    return Response.json(
      { error: "Intervalul tocmai a fost rezervat." },
      { status: 409 },
    );
  }

  const id = randomUUID();
  await sql(
    `insert into appointments
      (id, service_id, client_name, client_phone, starts_at, ends_at, status, notes)
     values ($1, $2, $3, $4, $5::timestamptz, $6::timestamptz, 'confirmed', $7)`,
    [
      id,
      service.id,
      clientName,
      clientPhone,
      slot.startsAt,
      slot.endsAt,
      notes,
    ],
  );

  return Response.json(
    {
      id,
      service: service.name,
      startsAt: slot.startsAt,
      endsAt: slot.endsAt,
      dateLabel: slot.dateLabel,
      timeLabel: slot.label,
    },
    { status: 201, headers: { "cache-control": "no-store" } },
  );
}
