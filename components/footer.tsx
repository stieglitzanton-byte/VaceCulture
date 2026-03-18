'use client'

import Link from 'next/link'
import React from 'react'
import { useTranslations, useLocale } from '@/lib/i18n-provider'
import { Instagram } from 'lucide-react'

function TikTokIcon({ className }: { className?: string }) {
    return (
        <svg
            className={className}
            viewBox="0 0 24 24"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true">
            <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 0 0-.79-.05A6.34 6.34 0 0 0 3.15 15a6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.34-6.34V8.87a8.16 8.16 0 0 0 4.76 1.52v-3.4a4.85 4.85 0 0 1-1-.3z" />
        </svg>
    )
}

const legalLinks = [
    { titleKey: 'impressum', href: (locale: string) => `/${locale}/impressum` },
    { titleKey: 'agb', href: (locale: string) => `/${locale}/agb` },
    { titleKey: 'widerruf', href: (locale: string) => `/${locale}/widerruf` },
    { titleKey: 'datenschutz', href: (locale: string) => `/${locale}/datenschutz` },
]

export default function FooterSection() {
    const t = useTranslations('footer')
    const locale = useLocale()
    
    return (
        <footer className="py-16 md:py-32">
            <div className="mx-auto max-w-5xl px-6">
                <Link
                    href={`/${locale}`}
                    aria-label="go home"
                    className="mx-auto block w-fit">
                    <span className="font-mono text-2xl font-bold tracking-[0.3em] text-foreground">VACE</span>
                </Link>

                <div className="my-8 flex flex-wrap items-center justify-center gap-6 text-sm">
                    {legalLinks.map((link) => (
                        <Link
                            key={link.titleKey}
                            href={link.href(locale)}
                            className="text-muted-foreground hover:text-foreground block duration-150">
                            <span>{t(link.titleKey)}</span>
                        </Link>
                    ))}
                </div>

                <div className="my-6 flex items-center justify-center gap-5">
                    <a
                        href="https://www.instagram.com/vaceculture/"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="VACE on Instagram"
                        className="text-foreground/70 hover:text-[#CC0000] transition-colors duration-200">
                        <Instagram className="size-5" />
                    </a>
                    <a
                        href="https://www.tiktok.com/@vaceculture"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="VACE on TikTok"
                        className="text-foreground/70 hover:text-[#CC0000] transition-colors duration-200">
                        <TikTokIcon className="size-5" />
                    </a>
                </div>

                <span className="text-muted-foreground block text-center text-sm font-mono">
                    {t('copyright')}
                </span>
            </div>
        </footer>
    )
}
