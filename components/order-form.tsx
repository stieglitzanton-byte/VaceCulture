'use client'

import React, { useEffect } from 'react'
import { useTranslations } from '@/lib/i18n-provider'

export default function OrderForm() {
    const t = useTranslations('orderForm')
    
    useEffect(() => {
        const w = 'https://tally.so/widgets/embed.js'

        const load = () => {
            if (typeof (window as any).Tally !== 'undefined') {
                (window as any).Tally.loadEmbeds()
            } else {
                document
                    .querySelectorAll<HTMLIFrameElement>('iframe[data-tally-src]:not([src])')
                    .forEach((e) => { e.src = e.dataset.tallySrc || '' })
            }
        }

        if (typeof (window as any).Tally !== 'undefined') {
            load()
        } else if (!document.querySelector(`script[src="${w}"]`)) {
            const s = document.createElement('script')
            s.src = w
            s.onload = load
            s.onerror = load
            document.body.appendChild(s)
        }
    }, [])

    return (
        <section
            id="order-form"
            className="relative py-20 md:py-32 px-6"
            style={{ background: 'linear-gradient(180deg, #000000 0%, #0a0a0a 100%)' }}>

            {/* Mobile sticky CTA */}
            <div className="fixed bottom-0 left-0 right-0 z-50 px-4 pb-4 md:hidden pointer-events-none">
                <a
                    href="#order-form"
                    className="pointer-events-auto flex items-center justify-center w-full py-4 rounded-2xl font-bold text-white text-base tracking-widest uppercase"
                    style={{
                        backgroundColor: '#DC2626',
                        boxShadow: '0 8px 32px rgba(220,38,38,0.6)',
                    }}>
                    {t('cta')}
                </a>
            </div>

            {/* Section heading */}
            <div className="mx-auto max-w-5xl mb-12 text-center">
                <p className="font-mono text-xs tracking-[0.35em] mb-4 uppercase" style={{ color: '#ef4444' }}>
                    — {t('sectionLabel')} —
                </p>
                <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-balance leading-tight drop-shadow-sm" style={{ color: '#ffffff' }}>
                    Design Your{' '}
                    <span style={{ color: '#ef4444' }}>VACE</span>
                </h2>
                <p className="mt-5 text-lg max-w-xl mx-auto leading-relaxed" style={{ color: 'rgba(220,38,38,0.9)' }}>
                    {t('description')}
                </p>

                {/* Desktop CTA — above form */}
                <a
                    href="#order-form"
                    className="hidden md:inline-flex items-center justify-center mt-8 px-10 py-4 rounded-full font-bold text-white text-base tracking-widest uppercase transition-colors duration-200"
                    style={{ backgroundColor: '#DC2626', boxShadow: '0 8px 32px rgba(220,38,38,0.5)' }}
                    onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#b91c1c')}
                    onMouseLeave={e => (e.currentTarget.style.backgroundColor = '#DC2626')}>
                    {t('cta')}
                </a>
            </div>

            {/* Form container */}
            <div
                className="mx-auto max-w-3xl rounded-2xl overflow-hidden"
                style={{
                    background: 'linear-gradient(180deg, #0a0a0a 0%, #000000 100%)',
                    border: '4px solid rgba(220,38,38,0.8)',
                    boxShadow: '0 25px 50px -12px rgba(0,0,0,0.9), 0 0 60px rgba(220,38,38,0.15)',
                }}>

                {/* Top bar */}
                <div
                    className="flex items-center justify-between px-6 py-4 border-b"
                    style={{ borderColor: 'rgba(220,38,38,0.35)' }}>
                    <span className="font-mono text-xs tracking-[0.25em] uppercase font-bold" style={{ color: '#ef4444' }}>
                        {t('formLabel')}
                    </span>
                    <span className="flex items-center gap-1.5">
                        <span className="relative flex size-2">
                            <span className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-75" style={{ backgroundColor: '#ef4444' }} />
                            <span className="relative inline-flex size-2 rounded-full" style={{ backgroundColor: '#ef4444' }} />
                        </span>
                        <span className="font-mono text-xs font-bold" style={{ color: '#ef4444' }}>{t('live')}</span>
                    </span>
                </div>

                {/* Tally iframe */}
                <div className="px-4 py-6">
                    <iframe
                        data-tally-src="https://tally.so/embed/dWAkVA?alignLeft=1&hideTitle=1&transparentBackground=1&dynamicHeight=1&formEventsForwarding=1"
                        loading="lazy"
                        width="100%"
                        height="177"
                        frameBorder={0}
                        marginHeight={0}
                        marginWidth={0}
                        title="VACE Custom Order"
                        style={{
                            minHeight: '177px',
                            filter: 'contrast(1.3) saturate(2) hue-rotate(0deg)',
                            backdropFilter: 'blur(0px) saturate(200%)',
                        }}
                    />
                </div>
            </div>

            {/* Trust signals */}
            <div className="mx-auto max-w-3xl mt-8 flex flex-wrap items-center justify-center gap-6 text-xs font-mono font-bold tracking-wider">
                <span style={{ color: '#ef4444' }}>{t('trust1')}</span>
                <span style={{ color: 'rgba(220,38,38,0.4)' }}>|</span>
                <span style={{ color: '#ef4444' }}>{t('trust2')}</span>
                <span style={{ color: 'rgba(220,38,38,0.4)' }}>|</span>
                <span style={{ color: '#ef4444' }}>{t('trust3')}</span>
            </div>
        </section>
    )
}
