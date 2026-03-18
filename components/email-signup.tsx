'use client'

import React, { useState } from 'react'

export default function EmailSignup() {
    const [email, setEmail] = useState('')
    const [submitted, setSubmitted] = useState(false)

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (email.trim()) {
            setSubmitted(true)
        }
    }

    if (submitted) {
        return (
            <div className="w-full">
                <p className="font-mono text-xs text-muted-foreground tracking-wider uppercase mb-2">
                    Stay updated
                </p>
                <div className="flex items-center gap-3 rounded-md border border-border/50 px-4 py-3"
                    style={{ backgroundColor: 'rgba(15, 15, 15, 0.6)' }}>
                    <p className="text-sm text-foreground">{"Du bist dabei. Wir melden uns."}</p>
                </div>
            </div>
        )
    }

    return (
        <div className="w-full">
            <p className="font-mono text-xs text-muted-foreground tracking-wider uppercase mb-2">
                Stay updated
            </p>
            <form onSubmit={handleSubmit} className="flex gap-2">
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email for the next drop..."
                    required
                    className="h-10 flex-1 rounded-md border border-border/50 px-3 py-2 font-mono text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring"
                    style={{ backgroundColor: 'rgba(15, 15, 15, 0.6)' }}
                />
                <button
                    type="submit"
                    className="h-10 shrink-0 rounded-md px-5 text-sm font-medium transition-colors"
                    style={{ backgroundColor: '#F5F4F0', color: '#1a1a1a' }}>
                    Join
                </button>
            </form>
        </div>
    )
}
