import './globals.css';
import type { ReactNode } from 'react';

export const metadata = {
  title: 'Swedish Idiom Generator',
  description: 'Fake wisdom from the North',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
