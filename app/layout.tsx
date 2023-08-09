import { Toaster } from '@/components/ui/toaster'
import './globals.scss'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Nauta',
  openGraph: {
    images: "/og-general.png",
    url: ""
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        {children}
        <Toaster />
      </body>
    </html>
  )
}
