import { Toaster } from '@/components/ui/toaster';
import './globals.scss';
import type { Metadata } from 'next';
import { Analytics } from '@vercel/analytics/react';
import { ThemeProvider } from '@/components/global/theme-provider';

export const metadata: Metadata = {
  title: 'Nauta',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem={true}>
          {children}
          <Toaster />
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  )
}
