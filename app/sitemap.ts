import type { MetadataRoute } from 'next'

const BASE_URL = 'https://vaceculture.com'
const locales = ['de', 'en', 'it', 'es'] as const

type ChangeFrequency = 'weekly' | 'monthly' | 'always' | 'hourly' | 'daily' | 'yearly' | 'never'

const pages: Array<{
  path: string
  changeFrequency: ChangeFrequency
  priority: number
}> = [
  { path: '',          changeFrequency: 'monthly', priority: 1.0 },
  { path: '/agb',      changeFrequency: 'monthly', priority: 0.6 },
  { path: '/datenschutz', changeFrequency: 'monthly', priority: 0.6 },
  { path: '/impressum',   changeFrequency: 'monthly', priority: 0.6 },
  { path: '/widerruf',    changeFrequency: 'monthly', priority: 0.6 },
]

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = []

  for (const { path, changeFrequency, priority } of pages) {
    for (const locale of locales) {
      entries.push({
        url: `${BASE_URL}/${locale}${path}`,
        lastModified: new Date(),
        changeFrequency,
        priority,
      })
    }
  }

  return entries
}
