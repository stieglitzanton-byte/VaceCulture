import React from 'react'
import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowUp } from 'lucide-react'

export const metadata: Metadata = {
    title: 'Impressum | VACE',
    description: 'Impressum und Kontaktinformationen von VACE Culture',
}

export default function ImpressumPage() {
    return (
        <main className="relative bg-gradient-to-b from-black to-gray-900 min-h-screen">
            {/* Back to top button */}
            <Link
                href="#top"
                className="fixed bottom-8 right-8 z-40 p-3 rounded-full bg-red-600 hover:bg-red-700 text-white transition-colors shadow-lg"
                aria-label="Zum Seitenanfang">
                <ArrowUp className="size-5" />
            </Link>

            {/* Content */}
            <div className="mx-auto max-w-3xl px-6 py-20 md:py-32">
                {/* Header */}
                <div className="mb-16 text-center">
                    <Link href="/" className="inline-block mb-8">
                        <span className="font-mono text-2xl font-bold tracking-[0.3em] text-white hover:text-red-600 transition-colors">VACE</span>
                    </Link>
                    <h1 className="font-mono text-xs tracking-[0.25em] text-foreground/60 uppercase">
                        Impressum
                    </h1>
                </div>

                {/* Content */}
                <article className="space-y-8 text-white leading-relaxed">
                    {/* Section 1 */}
                    <section className="space-y-4">
                        <h2 className="font-mono text-xs tracking-[0.15em] text-red-600 uppercase font-semibold">
                            Angaben gemäß § 5 TMG
                        </h2>
                        <div className="space-y-2 text-base text-gray-300">
                            <p className="font-semibold text-white">VACE Culture</p>
                            <p>Gewerbe: Custom Streetwear & Flannel Customization</p>
                            <p className="font-semibold text-white">Anton Stieglitz</p>
                            <p>Adolf-Kolping-Straße 36</p>
                            <p>79822 Titisee-Neustadt</p>
                            <p>Deutschland</p>
                        </div>
                    </section>

                    {/* Section 2 */}
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

                    {/* Section 3 */}
                    <section className="space-y-4 pt-8 border-t border-gray-700">
                        <h2 className="font-mono text-xs tracking-[0.15em] text-red-600 uppercase font-semibold">
                            Verbraucherstreitbeilegung
                        </h2>
                        <p className="text-base text-gray-300">
                            Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.
                        </p>
                    </section>

                    {/* Section 4 - Datenschutz Link */}
                    <section className="space-y-4 pt-8 border-t border-gray-700">
                        <h2 className="font-mono text-xs tracking-[0.15em] text-red-600 uppercase font-semibold">
                            Weitere Informationen
                        </h2>
                        <p className="text-base text-gray-300">
                            Unsere Datenschutzerklärung finden Sie <Link href="/datenschutz" className="text-red-600 hover:text-red-400 transition-colors font-semibold">hier</Link>.
                        </p>
                    </section>
                </article>

                {/* Footer */}
                <div className="mt-20 pt-12 border-t border-gray-700 text-center">
                    <p className="text-xs text-gray-500 font-mono">
                        Stand: März 2026
                    </p>
                </div>
            </div>
        </main>
    )
}
