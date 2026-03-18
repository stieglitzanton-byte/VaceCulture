'use client'

import React, { createContext, useContext, ReactNode } from 'react'

// Import messages directly
import de from '@/messages/de.json'
import en from '@/messages/en.json'
import es from '@/messages/es.json'
import it from '@/messages/it.json'

type Locale = 'de' | 'en' | 'es' | 'it'
type Messages = typeof de

const messages: Record<Locale, Messages> = { de, en, es, it }

interface I18nContextType {
  locale: Locale
  t: (key: string) => string
  messages: Messages
}

const I18nContext = createContext<I18nContextType | null>(null)

export function I18nProvider({ 
  children, 
  locale 
}: { 
  children: ReactNode
  locale: string 
}) {
  const validLocale = (messages[locale as Locale] ? locale : 'de') as Locale
  const currentMessages = messages[validLocale]

  const t = (key: string): string => {
    const keys = key.split('.')
    let value: unknown = currentMessages
    
    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = (value as Record<string, unknown>)[k]
      } else {
        return key // Return key if not found
      }
    }
    
    return typeof value === 'string' ? value : key
  }

  return (
    <I18nContext.Provider value={{ locale: validLocale, t, messages: currentMessages }}>
      {children}
    </I18nContext.Provider>
  )
}

export function useTranslations(namespace?: string) {
  const context = useContext(I18nContext)
  if (!context) {
    throw new Error('useTranslations must be used within an I18nProvider')
  }

  return (key: string): string => {
    const fullKey = namespace ? `${namespace}.${key}` : key
    return context.t(fullKey)
  }
}

export function useLocale(): Locale {
  const context = useContext(I18nContext)
  if (!context) {
    return 'de'
  }
  return context.locale
}
