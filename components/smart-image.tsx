'use client'

import Image, { type ImageProps } from 'next/image'
import { useDeviceInfo } from '@/hooks/use-device-info'

interface SmartImageProps extends Omit<ImageProps, 'quality' | 'sizes'> {
    /** Quality for desktop (default: 75) */
    desktopQuality?: number
    /** Quality for mobile – higher to compensate for DPR 2x/3x compression (default: 90) */
    mobileQuality?: number
    /**
     * Sizes string for desktop. Mobile always gets "100vw".
     * Default: "(max-width: 768px) 100vw, 50vw"
     */
    desktopSizes?: string
}

/**
 * Drop-in replacement for next/image that automatically increases quality
 * on mobile devices to compensate for Retina / high-DPR displays.
 *
 * Before hydration (SSR): uses desktopQuality so the initial HTML is correct.
 * After hydration on mobile: switches to mobileQuality. No visible flash because
 * Next.js serves from cache and the higher-quality image loads over the existing one.
 */
export function SmartImage({
    desktopQuality = 75,
    mobileQuality = 90,
    desktopSizes = '(max-width: 768px) 100vw, 50vw',
    priority,
    style,
    ...props
}: SmartImageProps) {
    const { isMobile, isSlowConnection, isReady } = useDeviceInfo()

    // On slow mobile connections, don't trade bandwidth for quality
    const effectivelyMobile = isReady && isMobile && !isSlowConnection

    const quality = effectivelyMobile ? mobileQuality : desktopQuality
    const sizes = effectivelyMobile ? '100vw' : desktopSizes

    // Prioritize the image automatically on mobile (above the fold in a hero)
    const effectivePriority = priority ?? (isReady && isMobile)

    return (
        <Image
            {...props}
            quality={quality}
            sizes={sizes}
            priority={effectivePriority}
            style={style}
        />
    )
}
