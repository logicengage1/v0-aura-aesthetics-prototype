import type { Metadata, Viewport } from 'next'
import { Inter, Playfair_Display } from 'next/font/google'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
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
  title: {
    default: 'Aura Aesthetics | Premium Botox in Beverly Hills',
    template: '%s | Aura Aesthetics',
  },
  description: 'Experience natural, refined beauty with our signature Botox treatments. Beverly Hills\' premier destination for subtle, sophisticated results.',
  keywords: ['Botox Beverly Hills', 'Lip Fillers Beverly Hills', 'Anti-aging Center', 'Med Spa Beverly Hills', 'Cosmetic Aesthetics', 'Natural Botox Results', 'Aura Aesthetics'],
  authors: [{ name: 'Aura Aesthetics' }],
  creator: 'Aura Aesthetics',
  publisher: 'Aura Aesthetics',
  formatDetection: {
    email: false,
    address: true,
    telephone: true,
  },
  openGraph: {
    title: 'Aura Aesthetics | Premium Botox in Beverly Hills',
    description: 'Experience natural, refined beauty with our signature Botox treatments. Beverly Hills\' premier destination for subtle, sophisticated results.',
    url: 'https://aura-aesthetics.pro',
    siteName: 'Aura Aesthetics',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Aura Aesthetics - Timeless Beauty, Naturally Refined',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Aura Aesthetics | Premium Botox in Beverly Hills',
    description: 'Experience natural, refined beauty with our signature Botox treatments.',
    images: ['/og-image.png'],
    creator: '@auraaesthetics',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: 'https://aura-aesthetics.pro',
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
      <head>
        <link rel="preconnect" href="https://calendly.com" />
        <link rel="preconnect" href="https://assets.calendly.com" />
      </head>
      <body className="font-sans antialiased">
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
