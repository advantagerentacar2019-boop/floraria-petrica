"use client";

import { useEffect, useMemo, useState, useTransition } from "react";
import { SERVICES } from "../lib/services";
import styles from "./BookingForm.module.css";

type Slot = {
  startsAt: string;
  endsAt: string;
  label: string;
  dateLabel: string;
};

export function BookingForm() {
  const [slots, setSlots] = useState<Slot[]>([]);
  const [serviceId, setServiceId] = useState(SERVICES[0]?.id ?? "clasic");
  const [startsAt, setStartsAt] = useState("");
  const [clientName, setClientName] = useState("");
  const [clientPhone, setClientPhone] = useState("");
  const [notes, setNotes] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [pending, startTransition] = useTransition();

  useEffect(() => {
    let alive = true;
    fetch("/api/availability", { cache: "no-store" })
      .then((r) => r.json())
      .then((data: { slots?: Slot[] }) => {
        if (!alive) return;
        setSlots(data.slots ?? []);
      })
      .catch(() => {
        if (alive) setError("Nu am putut încărca intervalele libere.");
      });
    return () => {
      alive = false;
    };
  }, [success]);

  const grouped = useMemo(() => {
    const map = new Map<string, Slot[]>();
    for (const slot of slots) {
      const list = map.get(slot.dateLabel) ?? [];
      list.push(slot);
      map.set(slot.dateLabel, list);
    }
    return [...map.entries()];
  }, [slots]);

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setSuccess("");
    startTransition(async () => {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          serviceId,
          clientName,
          clientPhone,
          startsAt,
          notes,
        }),
      });
      const data = (await res.json()) as {
        error?: string;
        dateLabel?: string;
        timeLabel?: string;
        service?: string;
      };
      if (!res.ok) {
        setError(data.error ?? "Rezervarea a eșuat.");
        return;
      }
      setSuccess(
        `Confirmat: ${data.service} · ${data.dateLabel} la ${data.timeLabel}. Te așteptăm!`,
      );
      setStartsAt("");
      setClientName("");
      setClientPhone("");
      setNotes("");
    });
  }

  return (
    <form className={styles.form} onSubmit={onSubmit}>
      <label className={styles.field}>
        <span>Serviciu</span>
        <select
          value={serviceId}
          onChange={(e) => setServiceId(e.target.value)}
          required
        >
          {SERVICES.map((s) => (
            <option key={s.id} value={s.id}>
              {s.name} — {s.priceRon} RON
            </option>
          ))}
        </select>
      </label>

      <fieldset className={styles.slots}>
        <legend>Alege intervalul liber (~2 ore)</legend>
        {grouped.length === 0 ? (
          <p className={styles.hint}>Nu există sloturi libere în perioada afișată.</p>
        ) : (
          grouped.map(([day, daySlots]) => (
            <div key={day} className={styles.day}>
              <h3>{day}</h3>
              <div className={styles.slotRow}>
                {daySlots.map((slot) => (
                  <button
                    key={slot.startsAt}
                    type="button"
                    className={
                      startsAt === slot.startsAt
                        ? `${styles.slot} ${styles.slotActive}`
                        : styles.slot
                    }
                    onClick={() => setStartsAt(slot.startsAt)}
                  >
                    {slot.label}
                  </button>
                ))}
              </div>
            </div>
          ))
        )}
      </fieldset>

      <div className={styles.grid}>
        <label className={styles.field}>
          <span>Nume</span>
          <input
            value={clientName}
            onChange={(e) => setClientName(e.target.value)}
            required
            autoComplete="name"
            placeholder="Numele tău"
          />
        </label>
        <label className={styles.field}>
          <span>Telefon</span>
          <input
            value={clientPhone}
            onChange={(e) => setClientPhone(e.target.value)}
            required
            autoComplete="tel"
            placeholder="07xx xxx xxx"
          />
        </label>
      </div>

      <label className={styles.field}>
        <span>Notă (opțional)</span>
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          rows={3}
          placeholder="Preferințe, alergii, etc."
        />
      </label>

      {error ? <p className={styles.error}>{error}</p> : null}
      {success ? <p className={styles.success}>{success}</p> : null}

      <button
        className={styles.submit}
        type="submit"
        disabled={pending || !startsAt}
      >
        {pending ? "Se rezervă…" : "Confirmă programarea"}
      </button>
    </form>
  );
}
