import { Archivo, Host_Grotesk } from 'next/font/google';

// Display: Archivo variable with the width axis (expanded and heavy, like the mark's stem).
export const display = Archivo({ subsets: ['latin'], axes: ['wdth'], variable: '--font-display', display: 'swap' });

// Text and UI.
export const text = Host_Grotesk({ subsets: ['latin'], weight: ['400', '500'], variable: '--font-text', display: 'swap' });
