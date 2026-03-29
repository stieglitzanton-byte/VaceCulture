'use client'

import { useState, useEffect } from 'react'

export interface DeviceInfo {
    isMobile: boolean
    dpr: number
    isSlowConnection: boolean
    isReady: boolean
}

/**
 * Detects device type, pixel ratio, and connection quality client-side.
 * Safe for SSR – returns conservative defaults until hydration completes.
 */
export function useDeviceInfo(): DeviceInfo {
    const [info, setInfo] = useState<DeviceInfo>({
        isMobile: false,
        dpr: 1,
        isSlowConnection: false,
        isReady: false,
    })

    useEffect(() => {
        const mq = window.matchMedia('(max-width: 768px)')
        const dpr = window.devicePixelRatio ?? 1

        // Network Information API (Chrome/Android, not Safari)
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const conn = (navigator as any).connection
        const isSlowConnection = conn
            ? conn.saveData || ['slow-2g', '2g', '3g'].includes(conn.effectiveType)
            : false

        const update = () => {
            setInfo({
                isMobile: mq.matches,
                dpr,
                isSlowConnection,
                isReady: true,
            })
        }

        update()
        mq.addEventListener('change', update)
        return () => mq.removeEventListener('change', update)
    }, [])

    return info
}
