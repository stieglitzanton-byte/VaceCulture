import type { Metadata } from 'next'
import React from 'react'
import Link from 'next/link'
import { ArrowUp } from 'lucide-react'
import { generateAlternates } from '@/lib/seo'

type Props = {
  params: Promise<{ locale: string }>
}

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Datenschutzerklärung',
    description: 'Datenschutzerklärung von VACE Culture. Informationen zur Verarbeitung deiner Daten gemäß DSGVO.',
    alternates: generateAlternates('/datenschutz'),
  }
}

export default async function DatenschutzPage({ params }: Props) {
  const { locale } = await params

  return (
    <main className="relative bg-gradient-to-b from-black to-gray-900 min-h-screen">
      <Link
        href={`/${locale}#top`}
        className="fixed bottom-8 right-8 z-40 p-3 rounded-full bg-red-600 hover:bg-red-700 text-white transition-colors shadow-lg"
        aria-label="Back to top">
        <ArrowUp className="size-5" />
      </Link>

      <div className="mx-auto max-w-3xl px-6 py-20 md:py-32">
        <div className="mb-16 text-center">
          <Link href={`/${locale}`} className="inline-block mb-8">
            <span className="font-mono text-2xl font-bold tracking-[0.3em] text-white hover:text-red-600 transition-colors">VACE</span>
          </Link>
          <h1 className="font-mono text-xs tracking-[0.25em] text-foreground/60 uppercase">
            Datenschutz
          </h1>
        </div>

        <article className="space-y-8 text-white leading-relaxed">
          <section className="space-y-4">
            <h2 className="font-mono text-xs tracking-[0.15em] text-red-600 uppercase font-semibold">
              Verantwortlicher
            </h2>
            <div className="space-y-2 text-base text-gray-300">
              <p className="font-semibold text-white">Anton Stieglitz</p>
              <p>VACE Culture</p>
              <p>Adolf-Kolping-Straße 36</p>
              <p>79822 Titisee-Neustadt</p>
              <p>Deutschland</p>
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
              Kontaktformular (Tally)
            </h2>
            <div className="space-y-3 text-base text-gray-300">
              <p>Wir nutzen Tally.so für unser Kontaktformular. Dabei werden folgende Daten erfasst: Name, E-Mail, Instagram-Handle und deine Design-Wünsche.</p>
              <p className="text-sm">
                <span className="text-gray-400">Rechtsgrundlage: </span>
                Art. 6 Abs. 1 lit. b DSGVO (Vertragsanbahnung)
              </p>
              <p className="text-sm">
                <span className="text-gray-400">Speicherdauer: </span>
                Bis zur Abwicklung deiner Anfrage, dann Löschung innerhalb von 30 Tagen.
              </p>
            </div>
          </section>

          <section className="space-y-4 pt-8 border-t border-gray-700">
            <h2 className="font-mono text-xs tracking-[0.15em] text-red-600 uppercase font-semibold">
              Zahlungen (Stripe)
            </h2>
            <div className="space-y-3 text-base text-gray-300">
              <p>
                Zahlungen werden über Stripe abgewickelt. Die erforderlichen Zahlungsdaten werden direkt an Stripe übermittelt und nicht auf unseren Servern gespeichert.
              </p>
              <p className="text-sm">
                <span className="text-gray-400">Rechtsgrundlage: </span>
                Art. 6 Abs. 1 lit. b DSGVO (Erfüllung von Vertragspflichten)
              </p>
              <p className="text-sm">
                <span className="text-gray-400">Datenschutz: </span>
                Siehe <a href="https://stripe.com/de/privacy" target="_blank" rel="noopener noreferrer" className="text-red-600 hover:text-red-400">Stripe Datenschutzerklärung</a>
              </p>
            </div>
          </section>

          <section className="space-y-4 pt-8 border-t border-gray-700">
            <h2 className="font-mono text-xs tracking-[0.15em] text-red-600 uppercase font-semibold">
              Deine Rechte
            </h2>
            <div className="space-y-3 text-base text-gray-300">
              <p>Nach der DSGVO hast du das Recht auf Auskunft, Berichtigung, Löschung, Einschränkung und Datenübertragbarkeit. Kontaktiere uns unter anton.stieglitz@vaceculture.com</p>
            </div>
          </section>
        </article>

        <div className="mt-20 pt-12 border-t border-gray-700 text-center">
          <p className="text-xs text-gray-500 font-mono">Stand: März 2026</p>
        </div>

        <div className="mt-12 flex justify-center gap-4 text-sm">
          <Link href={`/${locale}/impressum`} className="text-gray-400 hover:text-white transition-colors">Impressum</Link>
          <span className="text-gray-700">·</span>
          <Link href={`/${locale}`} className="text-gray-400 hover:text-white transition-colors">Startseite</Link>
        </div>
      </div>
    </main>
  )
}
