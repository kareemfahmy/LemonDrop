import { Geist_Mono, Inter } from 'next/font/google';

// Headlines and text: Inter. The optical-size axis gives large type the Display cut (tighter,
// finer joins) and small type the Text cut, from the same file.
export const sans = Inter({ subsets: ['latin'], axes: ['opsz'], variable: '--font-sans', display: 'swap' });

// Labels, navigation, captions and data: a monospace, set small and uppercase.
export const mono = Geist_Mono({ subsets: ['latin'], variable: '--font-mono', display: 'swap' });
