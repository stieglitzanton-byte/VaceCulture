'use client'

import React, { useState, useRef, useEffect } from 'react'
import { useLocale } from '@/lib/i18n-provider'
import { useRouter, usePathname } from 'next/navigation'

const LOCALES = [
    { code: 'de', flag: '🇩🇪', label: 'DE' },
    { code: 'en', flag: '🇺🇸', label: 'EN' },
    { code: 'it', flag: '🇮🇹', label: 'IT' },
    { code: 'es', flag: '🇪🇸', label: 'ES' },
] as const

export default function LangSwitcher() {
    const locale = useLocale()
    const router = useRouter()
    const pathname = usePathname()
    const [open, setOpen] = useState(false)
    const ref = useRef<HTMLDivElement>(null)

    // Close on outside click
    useEffect(() => {
        function handleClick(e: MouseEvent) {
            if (ref.current && !ref.current.contains(e.target as Node)) {
                setOpen(false)
            }
        }
        document.addEventListener('mousedown', handleClick)
        return () => document.removeEventListener('mousedown', handleClick)
    }, [])

    const active = LOCALES.find(l => l.code === locale)!

    const handleLanguageChange = (newLocale: string) => {
        // Remove the current locale from the pathname
        const pathWithoutLocale = pathname.replace(`/${locale}`, '')
        const newPath = `/${newLocale}${pathWithoutLocale || ''}`
        router.push(newPath)
        setOpen(false)
    }

    return (
        <div ref={ref} className="relative">
            {/* Trigger */}
            <button
                onClick={() => setOpen(o => !o)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-mono font-medium transition-all duration-200 border"
                style={{
                    backgroundColor: 'rgba(255,255,255,0.05)',
                    borderColor: 'rgba(255,255,255,0.12)',
                    color: '#ef4444',
                }}
                aria-label="Switch language"
                aria-expanded={open}
            >
                <span>{active.flag}</span>
                <span style={{ color: '#ef4444' }}>{active.label}</span>
                <svg
                    width="10" height="10" viewBox="0 0 10 10" fill="none"
                    className="transition-transform duration-200"
                    style={{ transform: open ? 'rotate(180deg)' : 'rotate(0deg)' }}
                >
                    <path d="M1 3l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            </button>

            {/* Dropdown */}
            {open && (
                <div
                    className="absolute right-0 mt-2 w-36 rounded-lg overflow-hidden shadow-2xl z-50"
                    style={{
                        backgroundColor: 'rgba(15, 15, 15, 0.98)',
                        border: '1px solid rgba(255,255,255,0.1)',
                        backdropFilter: 'blur(12px)',
                    }}
                >
                    {LOCALES.map(l => (
                        <button
                            key={l.code}
                            onClick={() => handleLanguageChange(l.code)}
                            className="flex items-center gap-3 w-full px-4 py-2.5 text-sm font-mono transition-all duration-150 text-left"
                            style={{
                                color: l.code === locale ? '#ef4444' : 'rgba(255,255,255,0.7)',
                                backgroundColor: l.code === locale ? 'rgba(239,68,68,0.08)' : 'transparent',
                                boxShadow: l.code === locale ? '0 0 0 1px rgba(239,68,68,0.15) inset' : 'none',
                            }}
                            onMouseEnter={e => {
                                if (l.code !== locale) e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.05)'
                            }}
                            onMouseLeave={e => {
                                if (l.code !== locale) e.currentTarget.style.backgroundColor = 'transparent'
                            }}
                        >
                            <span className="text-base">{l.flag}</span>
                            <span>{l.label}</span>
                            {l.code === locale && (
                                <span className="ml-auto w-1.5 h-1.5 rounded-full" style={{ backgroundColor: '#ef4444' }} />
                            )}
                        </button>
                    ))}
                </div>
            )}

            {/* Mobile: horizontal row */}
            <div className="sm:hidden flex gap-2 mt-2">
                {LOCALES.map(l => (
                    <button
                        key={l.code}
                        onClick={() => handleLanguageChange(l.code)}
                        className="flex items-center gap-1 px-2 py-1 rounded text-xs font-mono transition-all duration-200"
                        style={{
                            color: l.code === locale ? '#ef4444' : 'rgba(255,255,255,0.5)',
                            border: `1px solid ${l.code === locale ? '#ef4444' : 'rgba(255,255,255,0.15)'}`,
                        }}
                    >
                        <span>{l.flag}</span>
                        <span>{l.label}</span>
                    </button>
                ))}
            </div>
        </div>
    )
}
