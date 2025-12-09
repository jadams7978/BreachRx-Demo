import { useEffect, useState } from 'react';
export function useMounted(): boolean {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  return mounted;
}

// lib/datetime.ts
export function addHours(date: Date, hours: number): Date {
  return new Date(date.getTime() + hours * 60 * 60 * 1000);
}
export function truncateToMinute(d: Date): Date {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate(), d.getHours(), d.getMinutes(), 0, 0);
}
export function formatLocalDateTime(d: Date): string {
  return new Intl.DateTimeFormat(undefined, {
    year: 'numeric',
    month: 'short',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  }).format(d);
}
export function toLocalDatetimeInputValue(d: Date): string {
  const pad = (n: number) => String(n).padStart(2, '0');
  const yyyy = d.getFullYear();
  const mm = pad(d.getMonth() + 1);
  const dd = pad(d.getDate());
  const hh = pad(d.getHours());
  const mi = pad(d.getMinutes());
  return `${yyyy}-${mm}-${dd}T${hh}:${mi}`;
}
export function parseLocalDatetime(s: string): Date {
  const [date, time] = s.split('T');
  const [y, m, d] = date.split('-').map(Number);
  const [hh = 0, mm = 0] = (time ?? '00:00').split(':').map(Number);
  return new Date(y, (m ?? 1) - 1, d ?? 1, hh, mm, 0, 0);
}
export function humanizeDelta(deadline: Date): { label: string; isOverdue: boolean } {
  const now = Date.now();
  const ms = deadline.getTime() - now;
  const abs = Math.abs(ms);
  const mins = Math.floor(abs / 60000);
  const days = Math.floor(mins / (60 * 24));
  const hours = Math.floor((mins % (60 * 24)) / 60);
  const minutes = mins % 60;
  const core = days > 0 ? `${days}d ${hours}h ${minutes}m` : hours > 0 ? `${hours}h ${minutes}m` : `${minutes}m`;
  return ms < 0 ? { label: `Overdue by ${core}`, isOverdue: true } : { label: `${core} remaining`, isOverdue: false };
}