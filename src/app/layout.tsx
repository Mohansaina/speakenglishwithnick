import type { Metadata, Viewport } from 'next';
import { Plus_Jakarta_Sans, Newsreader } from 'next/font/google';
import './globals.css';

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

const newsreader = Newsreader({
  subsets: ['latin'],
  style: ['normal', 'italic'],
  variable: '--font-serif',
  display: 'swap',
});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#0d382c',
};

export const metadata: Metadata = {
  title: 'Speak English with Nick | American English Accent & Fluency Coach',
  description: 'Top-rated American English accent and fluency training. Specialized for Spanish speakers and ambitious professionals to speak effortless, natural English with total confidence.',
  keywords: [
    'Speak English With Nick',
    'American Accent Training',
    'English Fluency Coach',
    'Spanish Speakers English',
    'Acento en Ingles Americano',
    '20 Min Daily Fluency'
  ],
  authors: [{ name: 'Coach Nick' }],
  openGraph: {
    title: 'Speak English with Nick | American English Accent & Fluency Coach',
    description: 'Master natural American English rhythm, eliminate mental translation, and speak with confidence.',
    url: 'https://speakenglishwithnick.com',
    siteName: 'Speak English with Nick',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${jakarta.variable} ${newsreader.variable} scroll-smooth`}>
      <body className="font-sans bg-white text-stone-900 antialiased overflow-x-hidden min-h-screen">
        {children}
      </body>
    </html>
  );
}
