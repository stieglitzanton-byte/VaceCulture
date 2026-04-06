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

function getNextSunday(): Date {
    const now = new Date()
    const dayOfWeek = now.getDay()
    const daysUntilSunday = dayOfWeek === 0 ? 0 : 7 - dayOfWeek
    const sunday = new Date(now)
    sunday.setDate(now.getDate() + daysUntilSunday)
    sunday.setHours(23, 59, 59, 0)
    return sunday
}

function useCountdown(): string {
    const [timeLeft, setTimeLeft] = useState('')

    useEffect(() => {
        const target = getNextSunday()

        function update() {
            const diff = target.getTime() - Date.now()
            if (diff <= 0) {
                setTimeLeft('00:00:00')
                return
            }
            const h = Math.floor(diff / 3600000)
            const m = Math.floor((diff % 3600000) / 60000)
            const s = Math.floor((diff % 60000) / 1000)
            setTimeLeft(
                `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`
            )
        }

        update()
        const interval = setInterval(update, 1000)
        return () => clearInterval(interval)
    }, [])

    return timeLeft
}

export default function HeroSection() {
    const anfragen = useAnfragenCount()
    const countdown = useCountdown()
    const t = useTranslations('hero')

    return (
        <main className="overflow-x-hidden">
            {/* Urgency Banner */}
            <div
                className="fixed top-0 left-0 right-0 z-30 flex items-center justify-center py-1.5 text-center"
                style={{ backgroundColor: '#C8001E' }}
            >
                <span className="relative flex size-2 mr-2 shrink-0">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white/60" />
                    <span className="relative inline-flex size-2 rounded-full bg-white" />
                </span>
                <p className="font-mono text-xs tracking-widest uppercase text-white/95">
                    {t('urgency')}{countdown ? ` – ${t('urgencyCountdown')} ${countdown}` : ''}
                </p>
            </div>

            <section
                className="relative min-h-screen flex items-center"
                style={{ backgroundColor: '#0A0A0A' }}
            >
                <div className="w-full max-w-screen-xl mx-auto px-6 lg:px-12 pt-28 pb-16 lg:pt-36 lg:pb-24">
                    <div className="flex flex-col lg:flex-row lg:items-center gap-12 lg:gap-16">

                        {/* IMAGE – above text on mobile, right on desktop */}
                        <div className="order-first lg:order-last flex-none w-full lg:w-[40%] overflow-hidden h-[clamp(300px,70vw,450px)] lg:h-[600px]">
                            <HeroCarousel />
                        </div>

                        {/* TEXT – below image on mobile, left on desktop */}
                        <div className="order-last lg:order-first flex-none w-full lg:w-[60%]">
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

                                {/* H1 – untouched */}
                                <h1 className="text-[40px] md:text-6xl xl:text-7xl font-bold text-white leading-[1.05] tracking-tight text-balance">
                                    {t('headline')}
                                </h1>

                                {/* Subheadline – short 3-word version */}
                                <p
                                    className="mt-5"
                                    style={{
                                        fontFamily: 'Inter, sans-serif',
                                        fontSize: '16px',
                                        color: '#888888',
                                        letterSpacing: '0.05em',
                                        lineHeight: '1.5',
                                    }}
                                >
                                    {t('subheadline')}
                                </p>

                                {/* Social Proof Badge – directly under subheadline */}
                                <div className="flex items-center gap-2.5 mt-4">
                                    <span className="relative flex shrink-0" style={{ width: '10px', height: '10px' }}>
                                        <span
                                            className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-75"
                                            style={{ backgroundColor: '#C8001E' }}
                                        />
                                        <span
                                            className="relative inline-flex rounded-full"
                                            style={{ width: '10px', height: '10px', backgroundColor: '#C8001E' }}
                                        />
                                    </span>
                                    <p
                                        style={{
                                            fontFamily: 'var(--font-bebas, "Bebas Neue", sans-serif)',
                                            fontSize: '14px',
                                            letterSpacing: '0.15em',
                                            color: '#888888',
                                            textTransform: 'uppercase',
                                        }}
                                    >
                                        <span style={{ color: '#ffffff' }}>{anfragen}</span>
                                        {' '}{t('counter')}
                                    </p>
                                </div>

                                {/* CTA Group */}
                                <div className="mt-10 flex flex-col sm:flex-row items-start sm:items-center gap-4 w-full">
                                    <a
                                        href="#order-form"
                                        className="inline-flex items-center justify-center rounded-full text-base font-semibold text-white shadow-2xl w-full sm:w-auto"
                                        style={{
                                            backgroundColor: '#C8001E',
                                            padding: '18px 40px',
                                            transition: 'transform 0.2s ease',
                                        }}
                                        onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.03)')}
                                        onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}
                                    >
                                        {t('cta')}
                                    </a>

                                    <div className="flex flex-col gap-1.5">
                                        <a
                                            href="#how"
                                            className="text-base transition-all"
                                            style={{
                                                color: 'rgba(255,255,255,0.6)',
                                                opacity: 0.6,
                                                textDecoration: 'none',
                                            }}
                                            onMouseEnter={e => {
                                                e.currentTarget.style.opacity = '1'
                                                e.currentTarget.style.textDecoration = 'underline'
                                            }}
                                            onMouseLeave={e => {
                                                e.currentTarget.style.opacity = '0.6'
                                                e.currentTarget.style.textDecoration = 'none'
                                            }}
                                        >
                                            {t('howItWorks')}
                                        </a>
                                        <span style={{ fontSize: '12px', color: '#888888' }}>
                                            ↩ {t('ctaTrust')}
                                        </span>
                                    </div>
                                </div>
                            </AnimatedGroup>
                        </div>

                    </div>
                </div>
            </section>
        </main>
    )
}
