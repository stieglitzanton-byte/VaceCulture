const BASE_URL = 'https://vaceculture.com'
const locales = ['de', 'en', 'it', 'es'] as const

export function generateAlternates(path: string) {
  return {
    canonical: `${BASE_URL}/de${path}`,
    languages: {
      de: `${BASE_URL}/de${path}`,
      en: `${BASE_URL}/en${path}`,
      it: `${BASE_URL}/it${path}`,
      es: `${BASE_URL}/es${path}`,
      'x-default': `${BASE_URL}/de${path}`,
    },
  }
}

export { BASE_URL, locales }
