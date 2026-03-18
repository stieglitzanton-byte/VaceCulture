import type { Metadata } from 'next'
import Link from 'next/link'
import { generateAlternates } from '@/lib/seo'

type Props = {
  params: Promise<{ locale: string }>
}

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'AGB – Allgemeine Geschäftsbedingungen',
    description: 'Allgemeine Geschäftsbedingungen von VACE Culture. Infos zu Widerruf, Preisen, Lieferung und Zahlung für Custom Streetwear.',
    alternates: generateAlternates('/agb'),
  }
}

export default async function AGBPage({ params }: Props) {
  const { locale } = await params

  return (
    <div style={{ background: 'linear-gradient(135deg, #000000 0%, #111111 100%)', minHeight: '100vh', padding: '60px 20px' }}>
      <main style={{ maxWidth: '800px', margin: '0 auto', padding: '40px', background: 'rgba(20, 20, 20, 0.98)', border: '2px solid #ef4444', borderRadius: '16px', position: 'relative', zIndex: 9999 }}>
        <h1 style={{ fontSize: '48px', fontWeight: '900', textAlign: 'center', color: '#ffffff', marginBottom: '50px', textShadow: '0 0 20px rgba(255, 255, 255, 0.5)' }}>
          AGB - VACE Culture
        </h1>

        <section style={{ marginBottom: '40px' }}>
          <h2 style={{ fontSize: '32px', fontWeight: 'bold', color: '#ef4444', marginBottom: '20px', textShadow: '0 0 20px rgba(255, 255, 255, 0.3)' }}>
            1. Widerruf / Ausschluss
          </h2>
          <p style={{ fontSize: '18px', color: '#ffffff', marginBottom: '15px', textShadow: '0 0 15px rgba(255, 255, 255, 0.3)', lineHeight: '1.8' }}>
            <strong>Custom-Produkte (individualisierte Flannels):</strong> Für individuell nach deinen Vorgaben gefertigte und personalisierte Produkte besteht gemäß § 312g Abs. 2 Nr. 1 BGB kein Widerrufsrecht. Diese werden exakt nach deiner Custom-Konfiguration (Größe, Farbe, Perlen, Distressing) angefertigt und können daher nicht zurückgegeben werden.
          </p>
          <p style={{ fontSize: '18px', color: '#ffffff', marginBottom: '15px', textShadow: '0 0 15px rgba(255, 255, 255, 0.3)', lineHeight: '1.8' }}>
            <strong>Nicht individualisierte Ware:</strong> Für vorgefertigte, nicht personalisierten Artikel besteht das gesetzliche Widerrufsrecht von 14 Tagen.
          </p>
        </section>

        <section style={{ marginBottom: '40px' }}>
          <h2 style={{ fontSize: '32px', fontWeight: 'bold', color: '#ef4444', marginBottom: '20px', textShadow: '0 0 20px rgba(255, 255, 255, 0.3)' }}>
            2. Preise
          </h2>
          <p style={{ fontSize: '18px', color: '#ffffff', marginBottom: '15px', textShadow: '0 0 15px rgba(255, 255, 255, 0.3)', lineHeight: '1.8' }}>
            Alle angegebenen Preise sind Endpreise nach der Kleinunternehmerregelung (§ 19 UStG) und enthalten keine Umsatzsteuer. Versandkosten werden separat ausgewiesen und kommen hinzu.
          </p>
        </section>

        <section style={{ marginBottom: '40px' }}>
          <h2 style={{ fontSize: '32px', fontWeight: 'bold', color: '#ef4444', marginBottom: '20px', textShadow: '0 0 20px rgba(255, 255, 255, 0.3)' }}>
            3. Lieferung & Zahlung
          </h2>
          <p style={{ fontSize: '18px', color: '#ffffff', marginBottom: '15px', textShadow: '0 0 15px rgba(255, 255, 255, 0.3)', lineHeight: '1.8' }}>
            <strong>Lieferzeit:</strong> 7–14 Werktage nach Designfreigabe / Zahlungseingang.
          </p>
          <p style={{ fontSize: '18px', color: '#ffffff', marginBottom: '15px', textShadow: '0 0 15px rgba(255, 255, 255, 0.3)', lineHeight: '1.8' }}>
            <strong>Zahlung:</strong> Sichere Zahlungsabwicklung über Stripe (Kreditkarte, PayPal, Klarna und weitere Methoden je nach Verfügbarkeit). Zahlung wird vor Fertigungsstart erforderlich.
          </p>
          <p style={{ fontSize: '18px', color: '#ffffff', marginBottom: '15px', textShadow: '0 0 15px rgba(255, 255, 255, 0.3)', lineHeight: '1.8' }}>
            <strong>Versand:</strong> DHL GoGreen (CO2-neutral). Versandadresse und Nachverfolgung werden via E-Mail mitgeteilt.
          </p>
        </section>

        <footer style={{ textAlign: 'center', marginTop: '60px', paddingTop: '30px', borderTop: '1px solid rgba(239, 68, 68, 0.3)', fontSize: '14px', color: '#888888' }}>
          <div style={{ marginBottom: '15px' }}>Stand März 2026</div>
          <div>
            <Link href={`/${locale}/impressum`} style={{ color: '#ef4444', textDecoration: 'none', margin: '0 15px' }}>Impressum</Link>
            <Link href={`/${locale}/datenschutz`} style={{ color: '#ef4444', textDecoration: 'none', margin: '0 15px' }}>Datenschutz</Link>
          </div>
        </footer>
      </main>
    </div>
  )
}
