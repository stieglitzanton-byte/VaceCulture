import type { Metadata } from 'next'
import { I18nProvider } from '@/lib/i18n-provider'

const locales = ['de', 'en', 'es', 'it'] as const

type Props = {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}

export const metadata: Metadata = {
  metadataBase: new URL('https://vace-culture.com'),
  title: {
    default: 'VACE Culture – Premium Custom Streetwear',
    template: '%s | VACE Culture',
  },
  description: 'VACE Culture steht für exklusive 1-of-1 Streetwear. Premium Flannels mit handgemachten Details – einzigartig, limitiert, unverwechselbar.',
  keywords: ['custom streetwear', 'flannel', 'premium streetwear', 'VACE Culture', '1 of 1 clothing'],
  authors: [{ name: 'VACE Culture' }],
  creator: 'VACE Culture',
  robots: { index: true, follow: true },
  openGraph: {
    type: 'website',
    siteName: 'VACE Culture',
    locale: 'de_DE',
    alternateLocale: ['en_US', 'it_IT', 'es_ES'],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@vaceculture',
    creator: '@vaceculture',
  },
}

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params
  const validLocale = locales.includes(locale as typeof locales[number]) ? locale : 'de'

  return (
    <I18nProvider locale={validLocale}>
      {children}
    </I18nProvider>
  )
}
