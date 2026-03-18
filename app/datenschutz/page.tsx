import React from 'react'
import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowUp } from 'lucide-react'

export const metadata: Metadata = {
    title: 'Datenschutz | VACE',
    description: 'Datenschutzerklärung von VACE Culture',
}

export default function DatenschutzPage() {
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
                        Datenschutz
                    </h1>
                </div>

                {/* Content */}
                <article className="space-y-8 text-white leading-relaxed">
                    {/* Section 1 */}
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

                    {/* Section 2 */}
                    <section className="space-y-4 pt-8 border-t border-gray-700">
                        <h2 className="font-mono text-xs tracking-[0.15em] text-red-600 uppercase font-semibold">
                            Kontaktdaten (Typeform)
                        </h2>
                        <div className="space-y-3 text-base text-gray-300">
                            <p>
                                Name, E-Mail und Instagram-Name werden ausschließlich für Custom-Anfragen, Rechnungen und Versand verarbeitet.
                            </p>
                            <p className="text-sm">
                                <span className="text-gray-400">Rechtsgrundlage: </span>
                                Art. 6 Abs. 1 lit. b DSGVO (Erfüllung von Vertragspflichten)
                            </p>
                            <p className="text-sm">
                                <span className="text-gray-400">Speicherdauer: </span>
                                10 Jahre nach Vertragsbeendigung
                            </p>
                        </div>
                    </section>

                    {/* Section 3 */}
                    <section className="space-y-4 pt-8 border-t border-gray-700">
                        <h2 className="font-mono text-xs tracking-[0.15em] text-red-600 uppercase font-semibold">
                            Zahlungen (Stripe)
                        </h2>
                        <div className="space-y-3 text-base text-gray-300">
                            <p>
                                Zahlungen werden über Stripe abgewickelt. Die erforderlichen Zahlungsdaten (Kartennummer, Verfallsdatum, CVV) werden direkt an Stripe übermittelt und nicht auf unseren Servern gespeichert.
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

                    {/* Section 4 */}
                    <section className="space-y-4 pt-8 border-t border-gray-700">
                        <h2 className="font-mono text-xs tracking-[0.15em] text-red-600 uppercase font-semibold">
                            Server-Logs
                        </h2>
                        <div className="space-y-3 text-base text-gray-300">
                            <p>
                                Anonymisierte IP-Adressen werden 7 Tage gespeichert.
                            </p>
                            <p className="text-sm">
                                <span className="text-gray-400">Rechtsgrundlage: </span>
                                Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse an Sicherheit)
                            </p>
                        </div>
                    </section>

                    {/* Section 5 */}
                    <section className="space-y-4 pt-8 border-t border-gray-700">
                        <h2 className="font-mono text-xs tracking-[0.15em] text-red-600 uppercase font-semibold">
                            Cookies & Tracking
                        </h2>
                        <p className="text-base text-gray-300">
                            Wir verwenden kein Marketing-Tracking und keine unnötigen Cookies. Es können technisch notwendige Cookies/Signale für Checkout, Sicherheit und Payment-Verarbeitung von Stripe anfallen.
                        </p>
                    </section>

                    {/* Section 6 */}
                    <section className="space-y-4 pt-8 border-t border-gray-700">
                        <h2 className="font-mono text-xs tracking-[0.15em] text-red-600 uppercase font-semibold">
                            Deine Rechte
                        </h2>
                        <div className="space-y-3 text-base text-gray-300">
                            <p>
                                Nach der DSGVO hast du das Recht auf:
                            </p>
                            <ul className="list-disc list-inside space-y-1 text-sm">
                                <li>Auskunft über deine personenbezogenen Daten</li>
                                <li>Berichtigung unrichtiger Daten</li>
                                <li>Löschung deiner Daten</li>
                                <li>Einschränkung der Verarbeitung</li>
                                <li>Widerspruch gegen Verarbeitung</li>
                                <li>Datenübertragbarkeit</li>
                                <li>Beschwerde bei einer Aufsichtsbehörde</li>
                            </ul>
                            <p className="pt-3">
                                Kontaktiere uns unter {' '}
                                <a href="mailto:anton.stieglitz@vaceculture.com" className="text-white hover:text-red-600 transition-colors">
                                    anton.stieglitz@vaceculture.com
                                </a>
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
                <div className="mt-12 flex justify-center gap-4 text-sm">
                    <Link
                        href="/impressum"
                        className="text-gray-400 hover:text-white transition-colors">
                        Impressum
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
