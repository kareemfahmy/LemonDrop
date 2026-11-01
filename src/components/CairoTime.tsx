'use client';
import { useEffect, useState } from 'react';
import { site } from '@/data/site';

const fmt = () =>
  new Intl.DateTimeFormat('en-GB', { hour: '2-digit', minute: '2-digit', hour12: false, timeZone: site.timeZone }).format(new Date());

// Real local time in Cairo: tells a remote client when they will hear back.
export function CairoTime() {
  const [time, setTime] = useState<string | null>(null);
  useEffect(() => {
    const update = () => setTime(fmt());
    update();
    const id = setInterval(update, 15000);
    return () => clearInterval(id);
  }, []);
  return <time className="tabular" suppressHydrationWarning>{time ?? '--:--'}</time>;
}
