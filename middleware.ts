import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const locales = ['de', 'en', 'es', 'it']
const defaultLocale = 'de'

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname

  // Check if pathname already has a locale
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  )

  if (pathnameHasLocale) {
    const locale = pathname.split('/')[1]
    const response = NextResponse.next()
    response.headers.set('x-locale', locale)
    return response
  }

  // Skip static files and API routes
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.includes('.') // Static files like /favicon.ico
  ) {
    return NextResponse.next()
  }

  // Redirect to default locale
  const url = request.nextUrl.clone()
  url.pathname = `/${defaultLocale}${pathname}`
  return NextResponse.redirect(url)
}

export const config = {
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)']
}
