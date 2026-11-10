import { randomUUID } from "node:crypto";
import { NextRequest } from "next/server";
import { requireAdmin } from "../../../../lib/auth";
import { sql } from "../../../../lib/db";
import { getService } from "../../../../lib/services";
import { generateCandidateSlots, overlaps } from "../../../../lib/slots";

export const dynamic = "force-dynamic";

type Appointment = {
  id: string;
  service_id: string;
  client_name: string;
  client_phone: string;
  starts_at: string;
  ends_at: string;
  status: string;
  notes: string;
  created_at: string;
};

export async function GET() {
  if (!(await requireAdmin())) {
    return Response.json({ error: "Neautorizat." }, { status: 401 });
  }
  const rows = await sql<Appointment>(
    `select id, service_id, client_name, client_phone,
            starts_at::text as starts_at, ends_at::text as ends_at,
            status, notes, created_at::text as created_at
     from appointments
     order by starts_at asc`,
  );
  return Response.json(
    {
      appointments: rows.map((r) => ({
        ...r,
        serviceName: getService(r.service_id)?.name ?? r.service_id,
      })),
    },
    { headers: { "cache-control": "no-store" } },
  );
}

export async function POST(request: NextRequest) {
  if (!(await requireAdmin())) {
    return Response.json({ error: "Neautorizat." }, { status: 401 });
  }

  let body: {
    serviceId?: string;
    clientName?: string;
    clientPhone?: string;
    startsAt?: string;
    notes?: string;
    block?: boolean;
  };
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "JSON invalid." }, { status: 400 });
  }

  const startsAt = body.startsAt?.trim() ?? "";
  const slot = generateCandidateSlots(new Date(0)).find(
    (s) => s.startsAt === startsAt,
  );
  // Also allow past/future from full candidate with now
  const liveSlot =
    generateCandidateSlots().find((s) => s.startsAt === startsAt) ??
    // Admin can book any generated wall slot in window by regenerating from past
    (() => {
      const all = generateCandidateSlots(new Date(Date.now() - 7 * 864e5));
      return all.find((s) => s.startsAt === startsAt);
    })();

  const chosen = liveSlot ?? slot;
  if (!chosen) {
    return Response.json({ error: "Interval invalid." }, { status: 400 });
  }

  const isBlock = Boolean(body.block);
  const serviceId = isBlock ? "block" : (body.serviceId?.trim() ?? "");
  if (!isBlock && !getService(serviceId)) {
    return Response.json({ error: "Serviciu invalid." }, { status: 400 });
  }

  const clientName = isBlock
    ? "BLOCARE"
    : (body.clientName?.trim() || "Clientă (admin)");
  const clientPhone = isBlock ? "-" : (body.clientPhone?.trim() || "-");
  const notes = body.notes?.trim() ?? (isBlock ? "Interval blocat de Roxana" : "");

  const busy = await sql<{ starts_at: string; ends_at: string }>(
    `select starts_at::text as starts_at, ends_at::text as ends_at
     from appointments where status = 'confirmed'`,
  );
  if (
    busy.some((b) =>
      overlaps(chosen.startsAt, chosen.endsAt, b.starts_at, b.ends_at),
    )
  ) {
    return Response.json({ error: "Interval ocupat." }, { status: 409 });
  }

  const id = randomUUID();
  await sql(
    `insert into appointments
      (id, service_id, client_name, client_phone, starts_at, ends_at, status, notes)
     values ($1, $2, $3, $4, $5::timestamptz, $6::timestamptz, 'confirmed', $7)`,
    [id, serviceId, clientName, clientPhone, chosen.startsAt, chosen.endsAt, notes],
  );

  return Response.json({ id }, { status: 201 });
}

export async function PATCH(request: NextRequest) {
  if (!(await requireAdmin())) {
    return Response.json({ error: "Neautorizat." }, { status: 401 });
  }
  let body: { id?: string; status?: string };
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "JSON invalid." }, { status: 400 });
  }
  const id = body.id?.trim() ?? "";
  const status = body.status?.trim() ?? "";
  if (!id || !["confirmed", "cancelled"].includes(status)) {
    return Response.json({ error: "Date invalide." }, { status: 400 });
  }
  await sql(`update appointments set status = $1 where id = $2`, [status, id]);
  return Response.json({ ok: true });
}
