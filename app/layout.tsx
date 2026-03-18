import React from "react"
import type { Metadata } from 'next'
import { Inter, Space_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { headers } from 'next/headers'
import './globals.css'
import Dither from "@/components/Dither"

const _inter = Inter({ subsets: ["latin"], variable: "--font-inter" })
const _spaceMono = Space_Mono({ weight: ["400", "700"], subsets: ["latin"], variable: "--font-space-mono" })

export const metadata: Metadata = {
  metadataBase: new URL('https://vaceculture.com'),
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ClothingStore',
  name: 'VACE Culture',
  url: 'https://vaceculture.com',
  description: 'Premium 1-of-1 custom streetwear brand from Germany',
  brand: {
    '@type': 'Brand',
    name: 'VACE Culture',
  },
  sameAs: [
    'https://instagram.com/vaceculture',
    'https://tiktok.com/@vaceculture',
  ],
}

const VALID_LOCALES = ['de', 'en', 'es', 'it']

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const headersList = await headers()
  const localeHeader = headersList.get('x-locale') ?? 'de'
  const lang = VALID_LOCALES.includes(localeHeader) ? localeHeader : 'de'

  return (
    <html lang={lang} className="dark" data-scroll-behavior="smooth">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${_inter.variable} ${_spaceMono.variable} font-sans antialiased`}>
        <div className='absolute w-full h-dvh max-h-155 sm:max-h-115 md:max-h-125 lg:max-h-190 xl:max-h-195'>
          <Dither
            waveColor={[0.15, 0.02, 0.02]}
            disableAnimation={false}
            enableMouseInteraction
            mouseRadius={0.3}
            colorNum={4}
            pixelSize={2}
            waveAmplitude={0.3}
            waveFrequency={3}
            waveSpeed={0.03}
          />
        </div>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
