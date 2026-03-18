'use client'

import React, { useState, useEffect } from 'react'
import { useTranslations } from '@/lib/i18n-provider'
import { AnimatedGroup } from "@/components/motion-primitives/animated-group"
import { transitionVariants } from "@/lib/utils"
import HeroCarousel from "@/components/hero-carousel"

function useAnfragenCount() {
    const [count, setCount] = useState(0)

    useEffect(() => {
        const today = new Date()
        const seed = today.getFullYear() * 10000 + (today.getMonth() + 1) * 100 + today.getDate()
        const base = (seed % 11) + 14
        setCount(base)

        const interval = setInterval(() => {
            if (Math.random() > 0.6) {
                setCount(prev => prev + 1)
            }
        }, 45000)

        return () => clearInterval(interval)
    }, [])

    return count
}

export default function HeroSection() {
    const anfragen = useAnfragenCount()
    const t = useTranslations('hero')

    return (
        <main className="overflow-x-hidden">
            {/* Urgency banner */}
            <div
                className="fixed top-0 left-0 right-0 z-30 flex items-center justify-center py-1.5 text-center"
                style={{ backgroundColor: '#CC0000' }}
            >
                <span className="relative flex size-2 mr-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white/60" />
                    <span className="relative inline-flex size-2 rounded-full bg-white" />
                </span>
                <p className="font-mono text-xs tracking-widest uppercase text-white/95">
                    {t('urgency')}
                </p>
            </div>

            <section className="relative min-h-screen flex items-center">
                <div className="absolute inset-0 bg-gradient-to-br from-black to-gray-900 -z-10" />

                <div className="w-full max-w-screen-xl mx-auto px-6 lg:px-12 pt-28 pb-16 lg:pt-36 lg:pb-24">
                    <div className="flex flex-col lg:flex-row lg:items-center gap-12 lg:gap-16">

                        {/* LEFT SIDE – 60% */}
                        <div className="flex-none w-full lg:w-[60%]">
                            <AnimatedGroup
                                variants={{
                                    container: {
                                        visible: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
                                    },
                                    ...transitionVariants,
                                }}
                                className="flex flex-col items-start gap-0"
                            >
                                {/* Eyebrow */}
                                <p className="font-mono text-[11px] tracking-[0.22em] uppercase text-white/40 mb-5">
                                    {t('eyebrow')}
                                </p>

                                {/* H1 */}
                                <h1 className="text-5xl md:text-6xl xl:text-7xl font-bold text-white leading-[1.05] tracking-tight text-balance">
                                    {t('headline')}
                                </h1>

                                {/* Live counter */}
                                <div className="flex items-center gap-2 mt-6">
                                    <span className="relative flex size-2">
                                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-60" style={{ backgroundColor: '#CC0000' }} />
                                        <span className="relative inline-flex size-2 rounded-full" style={{ backgroundColor: '#CC0000' }} />
                                    </span>
                                    <p className="font-mono text-xs tracking-widest uppercase text-white/40">
                                        <span className="text-white font-bold">{anfragen}</span>{' '}{t('counter')}
                                    </p>
                                </div>

                                {/* Subtitle */}
                                <p
                                    className="mt-7 max-w-xl text-xl text-white/90"
                                    style={{ lineHeight: '1.4' }}
                                >
                                    {t('subheadline')}
                                </p>

                                {/* CTA */}
                                <div className="mt-10 flex flex-col sm:flex-row items-start sm:items-center gap-4">
                                    <a
                                        href="#order-form"
                                        className="inline-flex items-center justify-center rounded-full px-8 py-4 text-base font-semibold text-white shadow-2xl transition-all duration-200 hover:scale-[1.03]"
                                        style={{ backgroundColor: '#CC0000' }}
                                        onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#b91c1c')}
                                        onMouseLeave={e => (e.currentTarget.style.backgroundColor = '#CC0000')}
                                    >
                                        {t('cta')}
                                    </a>
                                    <a
                                        href="#how"
                                        className="text-base text-white/50 underline underline-offset-4 decoration-white/20 hover:text-white/80 hover:decoration-white/50 transition-colors"
                                    >
                                        {t('howItWorks')}
                                    </a>
                                </div>
                            </AnimatedGroup>
                        </div>

                        {/* RIGHT SIDE – 40% */}
                        <div className="flex-none w-full lg:w-[40%] h-[420px] md:h-[520px] lg:h-[600px]">
                            <HeroCarousel />
                        </div>

                    </div>
                </div>
            </section>
        </main>
    )
}
