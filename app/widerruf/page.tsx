import React from 'react'
import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowUp } from 'lucide-react'

export const metadata: Metadata = {
    title: 'Widerrufsbelehrung | VACE',
    description: 'Widerrufsbelehrung und Widerrufsrecht von VACE Culture',
}

export default function WiderrufsbelehrungPage() {
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
                        Widerrufsbelehrung
                    </h1>
                </div>

                {/* Content */}
                <article className="space-y-8 text-white leading-relaxed">
                    {/* Section 1 - Custom */}
                    <section className="space-y-4">
                        <h2 className="font-mono text-xs tracking-[0.15em] text-red-600 uppercase font-semibold">
                            Custom-Produkte (Personalisierte Flannels)
                        </h2>
                        <div className="space-y-3 text-base text-gray-300">
                            <p>
                                <strong>Kein Widerrufsrecht.</strong> Für individuell nach deinen Spezifikationen gefertigte und personalisierte Produkte besteht kein Widerrufsrecht nach § 312g Abs. 2 Nr. 1 BGB.
                            </p>
                            <p className="text-sm">
                                Dies gilt für alle Custom-Flannels mit individueller Konfiguration (Größe, Farbe, Perlen, Distressing, Custom-Details). Diese Produkte sind nicht rückgängig zu machen oder als Standardware verfügbar.
                            </p>
                        </div>
                    </section>

                    {/* Section 2 - Non-Custom */}
                    <section className="space-y-4 pt-8 border-t border-gray-700">
                        <h2 className="font-mono text-xs tracking-[0.15em] text-red-600 uppercase font-semibold">
                            Nicht-Personalisierte Ware (falls angeboten)
                        </h2>
                        <div className="space-y-3 text-base text-gray-300">
                            <p>
                                <strong>14-Tage Widerrufsrecht.</strong> Für vorgefertigte, nicht personalisierten Produkte besteht das gesetzliche Widerrufsrecht von 14 Tagen nach Kaufabschluss.
                            </p>
                            <p>
                                Um dein Widerrufsrecht auszuüben, muss eine klare Erklärung an <a href="mailto:anton.stieglitz@vaceculture.com" className="text-white hover:text-red-600 transition-colors">anton.stieglitz@vaceculture.com</a> erfolgen.
                            </p>
                            <p className="text-sm">
                                Die Ware muss unbenutzt und in Originalverpackung zurück sein.
                            </p>
                        </div>
                    </section>

                    {/* Section 3 - Rückgabe */}
                    <section className="space-y-4 pt-8 border-t border-gray-700">
                        <h2 className="font-mono text-xs tracking-[0.15em] text-red-600 uppercase font-semibold">
                            Rückgabe & Mängelgewährleistung
                        </h2>
                        <div className="space-y-3 text-base text-gray-300">
                            <p>
                                Falls ein Produkt einen <strong>handwerklichen Fehler von VACE</strong> aufweisen sollte, meldest du dich bitte sofort unter <a href="mailto:anton.stieglitz@vaceculture.com" className="text-white hover:text-red-600 transition-colors">anton.stieglitz@vaceculture.com</a>.
                            </p>
                            <p>
                                Wir bieten dann Nachbesserung oder – nach Vereinbarung – einen Austausch an.
                            </p>
                        </div>
                    </section>
                </article>

                {/* Footer */}
                <div className="mt-20 pt-12 border-t border-gray-700 text-center">
                    <p className="text-xs text-gray-500 font-mono">
                        Stand: März 2026
                    </p>
                </div>

                {/* Navigation */}
                <div className="mt-12 flex justify-center gap-4 text-sm flex-wrap">
                    <Link
                        href="/agb"
                        className="text-gray-400 hover:text-white transition-colors">
                        AGB
                    </Link>
                    <span className="text-gray-700">·</span>
                    <Link
                        href="/impressum"
                        className="text-gray-400 hover:text-white transition-colors">
                        Impressum
                    </Link>
                    <span className="text-gray-700">·</span>
                    <Link
                        href="/datenschutz"
                        className="text-gray-400 hover:text-white transition-colors">
                        Datenschutz
                    </Link>
                    <span className="text-gray-700">·</span>
                    <Link
                        href="/"
                        className="text-gray-400 hover:text-white transition-colors">
                        Startseite
                    </Link>
                </div>
            </div>
        </main>
    )
}
