'use client'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'
import React from 'react'
import { useLocale, useTranslations } from '@/lib/i18n-provider'
import LangSwitcher from '@/components/lang-switcher'

export const HeroHeader = () => {
    const [menuState, setMenuState] = React.useState(false)
    const locale = useLocale()
    const t = useTranslations('header')
    
    return (
        <header>
            <nav
                data-state={menuState && 'active'}
                className="fixed z-20 w-full border-b border-border/40 backdrop-blur-xl top-[30px]"
                style={{ backgroundColor: 'rgba(10, 10, 10, 0.7)' }}>
                <div className="mx-auto max-w-6xl px-6 transition-all duration-300">
                    <div className="relative flex flex-wrap items-center justify-between gap-6 py-3 lg:gap-0 lg:py-4">
                        <div className="flex w-full items-center justify-between gap-12 lg:w-auto">
                            <Link
                                href={`/${locale}`}
                                aria-label="home"
                                className="flex items-center space-x-2">
                                <span className='font-mono text-2xl font-bold tracking-[0.3em] text-foreground'>VACE</span>
                            </Link>

                            <button
                                onClick={() => setMenuState(!menuState)}
                                aria-label={menuState ? 'Close Menu' : 'Open Menu'}
                                className="relative z-20 -m-2.5 -mr-4 block cursor-pointer p-2.5 lg:hidden">
                                <Menu
                                    className="in-data-[state=active]:rotate-180 in-data-[state=active]:scale-0 in-data-[state=active]:opacity-0 m-auto size-6 duration-200" />
                                <X className="in-data-[state=active]:rotate-0 in-data-[state=active]:scale-100 in-data-[state=active]:opacity-100 absolute inset-0 m-auto size-6 -rotate-180 scale-0 opacity-0 duration-200" />
                            </button>
                        </div>

                        <div
                            className="in-data-[state=active]:block lg:in-data-[state=active]:flex mb-6 hidden w-full flex-wrap items-center justify-end space-y-8 rounded-3xl border border-border p-6 shadow-2xl md:flex-nowrap lg:m-0 lg:flex lg:w-fit lg:gap-6 lg:space-y-0 lg:border-transparent lg:bg-transparent lg:p-0 lg:shadow-none"
                            style={{ backgroundColor: 'rgba(10, 10, 10, 0.9)' }}>
                            <div className="flex w-full flex-col space-y-3 sm:flex-row sm:gap-3 sm:space-y-0 md:w-fit lg:bg-transparent items-center" style={{ backgroundColor: 'transparent' }}>
                                <a
                                    href="https://www.instagram.com/vaceculture/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex h-8 items-center justify-center rounded-md px-4 text-sm font-medium transition-colors"
                                    style={{ backgroundColor: '#F5F4F0', color: '#1a1a1a' }}>
                                    <span>{t('galerie')}</span>
                                </a>
                                <LangSwitcher />
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
        </header>
    )
}
