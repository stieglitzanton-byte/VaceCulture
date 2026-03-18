import type { Metadata } from 'next'
import React from 'react'
import Link from 'next/link'
import { generateAlternates } from '@/lib/seo'

type Props = {
  params: Promise<{ locale: string }>
}

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Impressum',
    description: 'Impressum von VACE Culture – Angaben gemäß § 5 TMG. Kontaktdaten und rechtliche Hinweise.',
    alternates: generateAlternates('/impressum'),
  }
}

export default async function ImpressumPage({ params }: Props) {
  const { locale } = await params

  return (
    <main className="relative bg-gradient-to-b from-black to-gray-900 min-h-screen">
      <div className="mx-auto max-w-3xl px-6 py-20 md:py-32">
        <div className="mb-16 text-center">
          <Link href={`/${locale}`} className="inline-block mb-8">
            <span className="font-mono text-2xl font-bold tracking-[0.3em] text-white hover:text-red-600 transition-colors">VACE</span>
          </Link>
          <h1 className="font-mono text-xs tracking-[0.25em] text-foreground/60 uppercase">
            Impressum
          </h1>
        </div>

        <article className="space-y-8 text-white leading-relaxed">
          <section className="space-y-4">
            <h2 className="font-mono text-xs tracking-[0.15em] text-red-600 uppercase font-semibold">
              Angaben gemäß § 5 TMG
            </h2>
            <div className="space-y-2 text-base text-gray-300">
              <p className="font-semibold text-white">Anton Stieglitz</p>
              <p>VACE Culture</p>
              <p>Adolf-Kolping-Straße 36</p>
              <p>79822 Titisee-Neustadt</p>
              <p>Deutschland</p>
            </div>
          </section>

          <section className="space-y-4 pt-8 border-t border-gray-700">
            <h2 className="font-mono text-xs tracking-[0.15em] text-red-600 uppercase font-semibold">
              Kontakt
            </h2>
            <div className="space-y-2 text-base text-gray-300">
              <p>
                <span className="text-gray-400">Telefon: </span>
                <a href="tel:+491712341330" className="text-white hover:text-red-600 transition-colors">
                  +49 171 2341330
                </a>
              </p>
              <p>
                <span className="text-gray-400">E-Mail: </span>
                <a href="mailto:anton.stieglitz@vaceculture.com" className="text-white hover:text-red-600 transition-colors">
                  anton.stieglitz@vaceculture.com
                </a>
              </p>
            </div>
          </section>

          <section className="space-y-4 pt-8 border-t border-gray-700">
            <h2 className="font-mono text-xs tracking-[0.15em] text-red-600 uppercase font-semibold">
              Haftungsausschluss
            </h2>
            <p className="text-base text-gray-300">
              Trotz sorgfältiger Kontrolle übernehmen wir keine Haftung für die Inhalte externer Links.
            </p>
          </section>
        </article>

        <div className="mt-20 pt-12 border-t border-gray-700 text-center">
          <p className="text-xs text-gray-500 font-mono">Stand: März 2026</p>
        </div>

        <div className="mt-12 flex justify-center gap-4 text-sm">
          <Link href={`/${locale}/datenschutz`} className="text-gray-400 hover:text-white transition-colors">Datenschutz</Link>
          <span className="text-gray-700">·</span>
          <Link href={`/${locale}`} className="text-gray-400 hover:text-white transition-colors">Startseite</Link>
        </div>
      </div>
    </main>
  )
}
