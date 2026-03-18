import type { Metadata } from 'next'
import Link from 'next/link'
import { generateAlternates } from '@/lib/seo'

type Props = {
  params: Promise<{ locale: string }>
}

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Widerrufsbelehrung',
    description: 'Widerrufsbelehrung von VACE Culture. Custom-Produkte sind vom Widerruf ausgeschlossen. Informationen zu Gewährleistung und Rückgabe.',
    alternates: generateAlternates('/widerruf'),
  }
}

export default async function WiderrufPage({ params }: Props) {
  const { locale } = await params

  return (
    <main className="relative bg-gradient-to-b from-black to-gray-900 min-h-screen">
      <div className="mx-auto max-w-3xl px-6 py-20 md:py-32">
        <div className="mb-16 text-center">
          <Link href={`/${locale}`} className="inline-block mb-8">
            <span className="font-mono text-2xl font-bold tracking-[0.3em] text-white hover:text-red-600 transition-colors">VACE</span>
          </Link>
          <h1 className="font-mono text-xs tracking-[0.25em] text-foreground/60 uppercase">
            Widerrufsbelehrung
          </h1>
        </div>

        <article className="space-y-8 text-white leading-relaxed">
          <section className="space-y-4">
            <h2 className="font-mono text-xs tracking-[0.15em] text-red-600 uppercase font-semibold">
              Widerrufsrecht – Custom-Produkte
            </h2>
            <div className="space-y-3 text-base text-gray-300">
              <p>
                <strong>Für individualisierte Custom-Produkte (handgefertigte Flannels mit Perlen, Distressing etc.)</strong> besteht gemäß § 312g Abs. 2 Nr. 1 BGB <strong>KEIN Widerrufsrecht</strong>.
              </p>
              <p>
                Jedes VACE Flannel wird nach deinen individuellen Vorgaben handgefertigt und kann daher nicht widerrufen oder zurückgegeben werden.
              </p>
              <p className="text-sm">
                <span className="text-gray-400">Speicherdauer:</span> Rechnungsunterlagen werden 10 Jahre nach Vertragsende aufbewahrt.
              </p>
            </div>
          </section>

          <section className="space-y-4 pt-8 border-t border-gray-700">
            <h2 className="font-mono text-xs tracking-[0.15em] text-red-600 uppercase font-semibold">
              Widerrufsrecht – nicht personalisierte Ware
            </h2>
            <div className="space-y-3 text-base text-gray-300">
              <p>
                Für Artikel, die nicht individualisiert sind, besteht das gesetzliche Widerrufsrecht von <strong>14 Tagen</strong> ab Erhalt der Ware.
              </p>
              <p>
                Der Widerruf muss schriftlich erfolgen und an: anton.stieglitz@vaceculture.com gesendet werden.
              </p>
            </div>
          </section>

          <section className="space-y-4 pt-8 border-t border-gray-700">
            <h2 className="font-mono text-xs tracking-[0.15em] text-red-600 uppercase font-semibold">
              Gewährleistung
            </h2>
            <div className="space-y-3 text-base text-gray-300">
              <p>
                Für handwerkliche Mängel werden Nachbesserungen angeboten. Die Gewährleistungsfrist beträgt 2 Jahre ab Übergabe der Ware.
              </p>
              <p>
                Im Falle eines Mangels kontaktiere uns sofort unter anton.stieglitz@vaceculture.com
              </p>
            </div>
          </section>
        </article>

        <div className="mt-20 pt-12 border-t border-gray-700 text-center">
          <p className="text-xs text-gray-500 font-mono">Stand: März 2026</p>
        </div>

        <div className="mt-12 flex justify-center gap-4 text-sm">
          <Link href={`/${locale}/agb`} className="text-gray-400 hover:text-white transition-colors">AGB</Link>
          <span className="text-gray-700">·</span>
          <Link href={`/${locale}`} className="text-gray-400 hover:text-white transition-colors">Startseite</Link>
        </div>
      </div>
    </main>
  )
}
