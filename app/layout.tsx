import './globals.css';
import type { Metadata } from 'next';
import { Montserrat, Open_Sans } from 'next/font/google';

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['300', '500', '700'],
  variable: '--font-heading',
  display: 'swap',
});

const openSans = Open_Sans({
  subsets: ['latin'],
  weight: ['300', '500', '600'],
  variable: '--font-body',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Breach Notification Timeline Explorer (Demo)',
  description:
    'Toy, illustrative demo inspired by BreachRx Cyber RegScout. Not legal advice.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${montserrat.variable} ${openSans.variable}`}>
      <body className="font-body min-h-screen bg-gray-50 text-brx-text-body antialiased">
        <div className="mx-auto max-w-6xl px-4">{children}</div>
      </body>
    </html>
  );
}