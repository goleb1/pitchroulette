import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Product Pitch Roulette',
  description: 'A casino-themed slot machine for Product Pitch Roulette team building activity',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
