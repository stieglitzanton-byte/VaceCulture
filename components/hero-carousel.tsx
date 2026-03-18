'use client'

import React, { useState, useEffect, useRef, useCallback } from 'react'
import Image from 'next/image'

const IMAGES = [
    { src: '/images/vace-flannel.webp', alt: 'VACE Culture Custom Flannel with Hand-Applied Pearls – custom streetwear' },
    { src: '/images/carousel-1.webp', alt: 'VACE Culture Flannel Street Styling – custom streetwear' },
    { src: '/images/carousel-2.webp', alt: 'VACE Culture Pearl Embellishment Detail Shot – custom streetwear' },
    { src: '/images/carousel-3.webp', alt: 'VACE Culture Custom Flannel Back View – custom streetwear' },
]

export default function HeroCarousel() {
    const [current, setCurrent] = useState(0)
    const [isPaused, setIsPaused] = useState(false)
    const [isHovered, setIsHovered] = useState(false)
    const touchStartX = useRef<number | null>(null)
    const intervalRef = useRef<NodeJS.Timeout | null>(null)

    const next = useCallback(() => {
        setCurrent(prev => (prev + 1) % IMAGES.length)
    }, [])

    const prev = useCallback(() => {
        setCurrent(prev => (prev - 1 + IMAGES.length) % IMAGES.length)
    }, [])

    const goTo = useCallback((idx: number) => {
        setCurrent(idx)
    }, [])

    useEffect(() => {
        if (isPaused || isHovered) {
            if (intervalRef.current) clearInterval(intervalRef.current)
            return
        }
        intervalRef.current = setInterval(next, 3000)
        return () => {
            if (intervalRef.current) clearInterval(intervalRef.current)
        }
    }, [isPaused, isHovered, next])

    const handleTouchStart = (e: React.TouchEvent) => {
        touchStartX.current = e.touches[0].clientX
    }

    const handleTouchEnd = (e: React.TouchEvent) => {
        if (touchStartX.current === null) return
        const delta = e.changedTouches[0].clientX - touchStartX.current
        if (delta > 50) prev()
        else if (delta < -50) next()
        touchStartX.current = null
    }

    return (
        <div
            className="relative w-full h-full flex flex-col select-none"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
        >
            {/* Image container */}
            <div className="relative flex-1 min-h-0 overflow-hidden rounded-2xl">
                {IMAGES.map((img, idx) => (
                    <div
                        key={img.src}
                        className="absolute inset-0 transition-all duration-700 ease-in-out"
                        style={{
                            opacity: idx === current ? 1 : 0,
                            transform: idx === current
                                ? (isHovered ? 'scale(1.05)' : 'scale(1.0)')
                                : 'scale(1.0)',
                            transition: 'opacity 700ms ease-in-out, transform 500ms ease-in-out',
                            zIndex: idx === current ? 1 : 0,
                        }}
                    >
                        <Image
                            src={img.src}
                            alt={img.alt}
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 100vw, 40vw"
                            priority={idx === 0}
                        />
                        {/* Subtle dark vignette */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/20 pointer-events-none" />
                    </div>
                ))}

                {/* Arrow buttons */}
                <button
                    onClick={prev}
                    className="absolute left-3 top-1/2 -translate-y-1/2 z-10 flex size-9 items-center justify-center rounded-full bg-black/50 backdrop-blur-sm border border-white/10 text-white/80 hover:text-white hover:bg-black/70 transition-all"
                    aria-label="Previous image"
                >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M15 18l-6-6 6-6" />
                    </svg>
                </button>
                <button
                    onClick={next}
                    className="absolute right-3 top-1/2 -translate-y-1/2 z-10 flex size-9 items-center justify-center rounded-full bg-black/50 backdrop-blur-sm border border-white/10 text-white/80 hover:text-white hover:bg-black/70 transition-all"
                    aria-label="Next image"
                >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M9 18l6-6-6-6" />
                    </svg>
                </button>

                {/* Pause / play on hover indicator */}
                {isHovered && (
                    <div className="absolute top-3 right-3 z-10 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/50 backdrop-blur-sm border border-white/10">
                        <span className="size-1.5 rounded-full bg-white/60" />
                        <span className="size-1.5 rounded-full bg-white/60" />
                        <span className="font-mono text-[9px] text-white/60 uppercase tracking-wider ml-1">Paused</span>
                    </div>
                )}
            </div>

            {/* Dot navigation */}
            <div className="flex items-center justify-center gap-2 mt-4">
                {IMAGES.map((_, idx) => (
                    <button
                        key={idx}
                        onClick={() => goTo(idx)}
                        aria-label={`Go to image ${idx + 1}`}
                        className="transition-all duration-300 rounded-full"
                        style={{
                            width: idx === current ? '20px' : '6px',
                            height: '6px',
                            backgroundColor: idx === current ? '#CC0000' : 'rgba(255,255,255,0.25)',
                        }}
                    />
                ))}
            </div>
        </div>
    )
}
