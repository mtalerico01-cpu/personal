import type { DayPart } from '../types';

/**
 * Returns the day-part bucket for a given hour (0–23) in the user's local time.
 * - morning:   05:00–11:59
 * - afternoon: 12:00–16:59
 * - evening:   17:00–20:59
 * - night:     21:00–04:59
 */
export function getDayPart(localHour: number): DayPart {
  if (localHour >= 5 && localHour < 12) return 'morning';
  if (localHour >= 12 && localHour < 17) return 'afternoon';
  if (localHour >= 17 && localHour < 21) return 'evening';
  return 'night';
}

/**
 * Returns the day-part for a given timezone string (IANA format, e.g. "America/New_York").
 * Falls back to the device local time if the timezone is unavailable or invalid.
 */
export function getDayPartForTimezone(timezone: string): DayPart {
  try {
    const formatter = new Intl.DateTimeFormat('en-US', {
      hour: 'numeric',
      hour12: false,
      timeZone: timezone,
    });
    const hourStr = formatter.format(new Date());
    const hour = parseInt(hourStr, 10);
    return getDayPart(isNaN(hour) ? new Date().getHours() : hour);
  } catch {
    return getDayPart(new Date().getHours());
  }
}

/**
 * Formats the local time string (HH:MM) for a given timezone.
 */
export function getLocalTimeString(timezone: string): string {
  try {
    return new Intl.DateTimeFormat('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
      timeZone: timezone,
    }).format(new Date());
  } catch {
    const d = new Date();
    return `${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`;
  }
}

/**
 * Formats the local date string (YYYY-MM-DD) for a given timezone.
 */
export function getLocalDateString(timezone: string): string {
  try {
    const parts = new Intl.DateTimeFormat('en-CA', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      timeZone: timezone,
    }).formatToParts(new Date());
    const p = Object.fromEntries(parts.map(({ type, value }) => [type, value]));
    return `${p.year}-${p.month}-${p.day}`;
  } catch {
    return new Date().toISOString().slice(0, 10);
  }
}

/**
 * Returns the full day-of-week name (e.g. "Monday") for a given timezone.
 */
export function getDayOfWeek(timezone: string): string {
  try {
    return new Intl.DateTimeFormat('en-US', {
      weekday: 'long',
      timeZone: timezone,
    }).format(new Date());
  } catch {
    return ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][
      new Date().getDay()
    ];
  }
}
