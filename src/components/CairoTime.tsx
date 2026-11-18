'use client';
import { useEffect, useState } from 'react';
import { site } from '@/data/site';

const fmt = (seconds = false) =>
  new Intl.DateTimeFormat('en-GB', { hour: '2-digit', minute: '2-digit', second: seconds ? '2-digit' : undefined, hour12: false, timeZone: site.timeZone }).format(new Date());

// Real local time in Cairo: tells a remote client when they will hear back.
export function CairoTime({ seconds = false }: { seconds?: boolean }) {
  const [time, setTime] = useState<string | null>(null);
  useEffect(() => {
    const update = () => setTime(fmt(seconds));
    update();
    const id = setInterval(update, seconds ? 1000 : 15000);
    return () => clearInterval(id);
  }, [seconds]);
  return <time className="tabular" suppressHydrationWarning>{time ?? (seconds ? '--:--:--' : '--:--')}</time>;
}
