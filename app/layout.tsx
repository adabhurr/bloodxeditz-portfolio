import type { Metadata } from 'next';
import './globals.css';
export const metadata: Metadata = {
  title: 'BLOODXEDITZ — Visuals Beyond Reality',
  description: 'The visual playground of BloodXEditz. After Effects edits, motion and cinematic visuals.',
};
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
