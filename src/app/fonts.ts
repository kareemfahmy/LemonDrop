import { Inter } from 'next/font/google';

// One family for everything. The optical-size axis gives large type the Display cut (tighter,
// finer joins) and small type the Text cut, from the same file.
export const sans = Inter({ subsets: ['latin'], axes: ['opsz'], variable: '--font-sans', display: 'swap' });
