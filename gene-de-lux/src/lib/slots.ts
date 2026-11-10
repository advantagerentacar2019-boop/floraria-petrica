const TZ = "Europe/Bucharest";
const SLOT_HOURS = [10, 12, 14, 16] as const;
const DURATION_HOURS = 2;
const DAYS_AHEAD = 21;

export type Slot = {
  startsAt: string;
  endsAt: string;
  label: string;
  dateLabel: string;
};

function bucharestParts(date: Date) {
  const fmt = new Intl.DateTimeFormat("en-GB", {
    timeZone: TZ,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    weekday: "short",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
  const parts = Object.fromEntries(
    fmt.formatToParts(date).map((p) => [p.type, p.value]),
  );
  return {
    year: Number(parts.year),
    month: Number(parts.month),
    day: Number(parts.day),
    weekday: parts.weekday,
    hour: Number(parts.hour),
    minute: Number(parts.minute),
  };
}

/** Build a Date for a Bucharest wall-clock moment. */
export function atBucharest(
  year: number,
  month: number,
  day: number,
  hour: number,
  minute = 0,
): Date {
  const guess = new Date(Date.UTC(year, month - 1, day, hour - 2, minute));
  for (let i = 0; i < 4; i++) {
    const p = bucharestParts(guess);
    const want = Date.UTC(year, month - 1, day, hour, minute);
    const got = Date.UTC(p.year, p.month - 1, p.day, p.hour, p.minute);
    guess.setTime(guess.getTime() + (want - got));
  }
  return guess;
}

function isSunday(year: number, month: number, day: number): boolean {
  const d = atBucharest(year, month, day, 12);
  return bucharestParts(d).weekday === "Sun";
}

function addDays(
  year: number,
  month: number,
  day: number,
  n: number,
): { year: number; month: number; day: number } {
  const d = atBucharest(year, month, day, 12);
  d.setUTCDate(d.getUTCDate() + n);
  const p = bucharestParts(d);
  return { year: p.year, month: p.month, day: p.day };
}

export function generateCandidateSlots(from = new Date()): Slot[] {
  const now = from;
  const start = bucharestParts(now);
  const slots: Slot[] = [];

  for (let offset = 0; offset < DAYS_AHEAD; offset++) {
    const day = addDays(start.year, start.month, start.day, offset);
    if (isSunday(day.year, day.month, day.day)) continue;

    for (const hour of SLOT_HOURS) {
      const starts = atBucharest(day.year, day.month, day.day, hour, 0);
      if (starts.getTime() <= now.getTime() + 60 * 60 * 1000) continue;
      const ends = new Date(starts.getTime() + DURATION_HOURS * 60 * 60 * 1000);
      const dateLabel = new Intl.DateTimeFormat("ro-RO", {
        timeZone: TZ,
        weekday: "long",
        day: "numeric",
        month: "long",
      }).format(starts);
      const timeLabel = new Intl.DateTimeFormat("ro-RO", {
        timeZone: TZ,
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      }).format(starts);
      slots.push({
        startsAt: starts.toISOString(),
        endsAt: ends.toISOString(),
        label: timeLabel,
        dateLabel,
      });
    }
  }
  return slots;
}

export function overlaps(
  aStart: string,
  aEnd: string,
  bStart: string,
  bEnd: string,
): boolean {
  return aStart < bEnd && aEnd > bStart;
}
