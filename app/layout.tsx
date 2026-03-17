import type { Metadata, Viewport } from 'next'
import { Inter, Playfair_Display } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const inter = Inter({ 
  subsets: ["latin"],
  variable: '--font-inter',
  display: 'swap',
})

const playfair = Playfair_Display({ 
  subsets: ["latin"],
  variable: '--font-playfair',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Aura Aesthetics | Premium Botox in Beverly Hills',
  description: 'Experience natural, refined beauty with our signature Botox treatments. Beverly Hills\' premier destination for subtle, sophisticated results.',
  keywords: ['Botox', 'Beverly Hills', 'Aesthetics', 'Anti-aging', 'Med Spa', 'Cosmetic treatments'],
  openGraph: {
    title: 'Aura Aesthetics | Premium Botox in Beverly Hills',
    description: 'Experience natural, refined beauty with our signature Botox treatments.',
    type: 'website',
  },
}

export const viewport: Viewport = {
  themeColor: '#F5F0E8',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body className="font-sans antialiased">
        {children}
        <Analytics />
      </body>
    </html>
  )
}
