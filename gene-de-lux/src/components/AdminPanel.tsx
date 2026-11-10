"use client";

import { useCallback, useEffect, useState, useTransition } from "react";
import { SERVICES } from "../lib/services";
import styles from "./AdminPanel.module.css";

type Appointment = {
  id: string;
  service_id: string;
  serviceName: string;
  client_name: string;
  client_phone: string;
  starts_at: string;
  ends_at: string;
  status: string;
  notes: string;
};

type Slot = {
  startsAt: string;
  endsAt: string;
  label: string;
  dateLabel: string;
};

function formatWhen(iso: string) {
  return new Intl.DateTimeFormat("ro-RO", {
    timeZone: "Europe/Bucharest",
    weekday: "short",
    day: "numeric",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(iso));
}

export function AdminPanel() {
  const [authed, setAuthed] = useState(false);
  const [sampleAuth, setSampleAuth] = useState(false);
  const [password, setPassword] = useState("");
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [slots, setSlots] = useState<Slot[]>([]);
  const [error, setError] = useState("");
  const [pending, startTransition] = useTransition();
  const [blockSlot, setBlockSlot] = useState("");
  const [manual, setManual] = useState({
    serviceId: SERVICES[0]?.id ?? "clasic",
    clientName: "",
    clientPhone: "",
    startsAt: "",
  });

  const load = useCallback(async () => {
    const [bookingsRes, slotsRes] = await Promise.all([
      fetch("/api/admin/bookings", { cache: "no-store" }),
      fetch("/api/availability", { cache: "no-store" }),
    ]);
    if (bookingsRes.status === 401) {
      setAuthed(false);
      return;
    }
    const bookingsData = (await bookingsRes.json()) as {
      appointments?: Appointment[];
      error?: string;
    };
    const slotsData = (await slotsRes.json()) as { slots?: Slot[] };
    if (!bookingsRes.ok) {
      setError(bookingsData.error ?? "Eroare la încărcare.");
      return;
    }
    setAuthed(true);
    setAppointments(bookingsData.appointments ?? []);
    setSlots(slotsData.slots ?? []);
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  function login(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    startTransition(async () => {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ password }),
      });
      const data = (await res.json()) as {
        error?: string;
        sampleAuth?: boolean;
      };
      if (!res.ok) {
        setError(data.error ?? "Login eșuat.");
        return;
      }
      setSampleAuth(Boolean(data.sampleAuth));
      setPassword("");
      await load();
    });
  }

  function logout() {
    startTransition(async () => {
      await fetch("/api/admin/logout", { method: "POST" });
      setAuthed(false);
      setAppointments([]);
    });
  }

  function setStatus(id: string, status: "confirmed" | "cancelled") {
    startTransition(async () => {
      const res = await fetch("/api/admin/bookings", {
        method: "PATCH",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ id, status }),
      });
      if (!res.ok) {
        const data = (await res.json()) as { error?: string };
        setError(data.error ?? "Actualizare eșuată.");
        return;
      }
      await load();
    });
  }

  function blockInterval(e: React.FormEvent) {
    e.preventDefault();
    startTransition(async () => {
      const res = await fetch("/api/admin/bookings", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ block: true, startsAt: blockSlot }),
      });
      const data = (await res.json()) as { error?: string };
      if (!res.ok) {
        setError(data.error ?? "Blocarea a eșuat.");
        return;
      }
      setBlockSlot("");
      await load();
    });
  }

  function addManual(e: React.FormEvent) {
    e.preventDefault();
    startTransition(async () => {
      const res = await fetch("/api/admin/bookings", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(manual),
      });
      const data = (await res.json()) as { error?: string };
      if (!res.ok) {
        setError(data.error ?? "Adăugarea a eșuat.");
        return;
      }
      setManual((m) => ({ ...m, clientName: "", clientPhone: "", startsAt: "" }));
      await load();
    });
  }

  if (!authed) {
    return (
      <form className={styles.login} onSubmit={login}>
        <h1>Admin Roxana</h1>
        <p>Intră ca să gestionezi programările.</p>
        <label>
          <span>Parolă</span>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            autoComplete="current-password"
          />
        </label>
        {error ? <p className={styles.error}>{error}</p> : null}
        <button type="submit" disabled={pending}>
          {pending ? "…" : "Intră"}
        </button>
        <p className={styles.hint}>
          Demo local: dacă nu ai setat încă parola în Cursor Secrets, folosește
          parola de sample din mediul de dezvoltare.
        </p>
      </form>
    );
  }

  return (
    <div className={styles.panel}>
      <div className={styles.top}>
        <div>
          <h1>Programările tale</h1>
          <p>Gestionează calendarul · Rovinari</p>
          {sampleAuth ? (
            <p className={styles.hint}>
              Rulează pe date sample până adaugi parola reală în Secrets.
            </p>
          ) : null}
        </div>
        <button type="button" className={styles.ghost} onClick={logout}>
          Ieșire
        </button>
      </div>

      {error ? <p className={styles.error}>{error}</p> : null}

      <section className={styles.section}>
        <h2>Programări</h2>
        <ul className={styles.list}>
          {appointments.length === 0 ? (
            <li className={styles.empty}>Nicio programare încă.</li>
          ) : (
            appointments.map((a) => (
              <li key={a.id} className={styles.item}>
                <div>
                  <strong>
                    {formatWhen(a.starts_at)} · {a.serviceName}
                  </strong>
                  <p>
                    {a.client_name} · {a.client_phone}
                  </p>
                  {a.notes ? <p className={styles.notes}>{a.notes}</p> : null}
                  <span className={styles.badge}>{a.status}</span>
                </div>
                <div className={styles.actions}>
                  {a.status === "confirmed" ? (
                    <button
                      type="button"
                      onClick={() => setStatus(a.id, "cancelled")}
                      disabled={pending}
                    >
                      Anulează
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={() => setStatus(a.id, "confirmed")}
                      disabled={pending}
                    >
                      Reactivează
                    </button>
                  )}
                </div>
              </li>
            ))
          )}
        </ul>
      </section>

      <div className={styles.grid}>
        <form className={styles.card} onSubmit={blockInterval}>
          <h2>Blochează un interval</h2>
          <select
            value={blockSlot}
            onChange={(e) => setBlockSlot(e.target.value)}
            required
          >
            <option value="">Alege slot liber</option>
            {slots.map((s) => (
              <option key={s.startsAt} value={s.startsAt}>
                {s.dateLabel} · {s.label}
              </option>
            ))}
          </select>
          <button type="submit" disabled={pending || !blockSlot}>
            Blochează
          </button>
        </form>

        <form className={styles.card} onSubmit={addManual}>
          <h2>Adaugă programare manual</h2>
          <select
            value={manual.serviceId}
            onChange={(e) =>
              setManual((m) => ({ ...m, serviceId: e.target.value }))
            }
          >
            {SERVICES.map((s) => (
              <option key={s.id} value={s.id}>
                {s.name}
              </option>
            ))}
          </select>
          <input
            placeholder="Nume clientă"
            value={manual.clientName}
            onChange={(e) =>
              setManual((m) => ({ ...m, clientName: e.target.value }))
            }
            required
          />
          <input
            placeholder="Telefon"
            value={manual.clientPhone}
            onChange={(e) =>
              setManual((m) => ({ ...m, clientPhone: e.target.value }))
            }
            required
          />
          <select
            value={manual.startsAt}
            onChange={(e) =>
              setManual((m) => ({ ...m, startsAt: e.target.value }))
            }
            required
          >
            <option value="">Interval liber</option>
            {slots.map((s) => (
              <option key={s.startsAt} value={s.startsAt}>
                {s.dateLabel} · {s.label}
              </option>
            ))}
          </select>
          <button type="submit" disabled={pending}>
            Salvează
          </button>
        </form>
      </div>
    </div>
  );
}
