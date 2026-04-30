// Format a millisecond timestamp as a short, human-friendly relative time
// string. Examples: "Just now", "12m ago", "3h ago", "Yesterday 3:14 PM",
// "Mar 4 9:01 AM", "Jan 12 2025".
export function formatRelativeTime(timestamp: number, now: number = Date.now()): string {
  const diffMs = now - timestamp;
  if (diffMs < 0) return 'Just now';

  const diffMin = Math.floor(diffMs / 60_000);
  const diffHr = Math.floor(diffMs / 3_600_000);

  const date = new Date(timestamp);
  const nowDate = new Date(now);

  const sameDay = (a: Date, b: Date) =>
    a.getDate() === b.getDate() &&
    a.getMonth() === b.getMonth() &&
    a.getFullYear() === b.getFullYear();

  const yesterday = new Date(now - 86_400_000);

  const formatTimeOfDay = (d: Date): string => {
    const h = d.getHours();
    const m = d.getMinutes();
    const ampm = h >= 12 ? 'PM' : 'AM';
    const hh = h % 12 || 12;
    const mm = m < 10 ? `0${m}` : String(m);
    return `${hh}:${mm} ${ampm}`;
  };

  if (diffMs < 60_000) return 'Just now';
  if (diffMin < 60) return `${diffMin}m ago`;
  if (diffHr < 24 && sameDay(date, nowDate)) return `${diffHr}h ago`;
  if (sameDay(date, yesterday)) return `Yesterday ${formatTimeOfDay(date)}`;

  if (date.getFullYear() === nowDate.getFullYear()) {
    return `${date.toLocaleDateString(undefined, { month: 'short', day: 'numeric' })} ${formatTimeOfDay(date)}`;
  }

  return date.toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' });
}
