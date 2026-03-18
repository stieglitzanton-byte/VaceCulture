import type { Metadata } from 'next'
import HeroSection from "@/components/hero-section"
import Features from "@/components/features-3"
import Agenda from "@/components/agenda"
import CallToAction from "@/components/call-to-action"
import OrderForm from "@/components/order-form"
import { HeroHeader } from "@/components/header"
import FooterSection from "@/components/footer"
import { generateAlternates } from '@/lib/seo'

type Props = {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params

  const titles: Record<string, string> = {
    de: 'Premium 1-of-1 Custom Streetwear',
    en: 'Premium 1-of-1 Custom Streetwear',
    es: 'Streetwear Personalizado Premium 1-de-1',
    it: 'Streetwear Personalizzato Premium 1-di-1',
  }

  const descriptions: Record<string, string> = {
    de: 'Entdecke VACE Culture – handgefertigte Custom Flannels mit Perlen, Distressing und exklusiven Details. Jedes Stück ein Unikat.',
    en: 'Discover VACE Culture – handcrafted custom flannels with pearls, distressing and exclusive details. Every piece unique.',
    es: 'Descubre VACE Culture – flannels personalizados con perlas, envejecimiento y detalles exclusivos. Cada pieza es única.',
    it: 'Scopri VACE Culture – flannel personalizzati con perle, distressing e dettagli esclusivi. Ogni pezzo è unico.',
  }

  return {
    title: titles[locale] ?? titles['de'],
    description: descriptions[locale] ?? descriptions['de'],
    alternates: generateAlternates(''),
  }
}

export default async function Home() {
  return (
    <>
      <HeroHeader />
      <HeroSection />
      <Features />
      <Agenda />
      <CallToAction />
      <OrderForm />
      <FooterSection />
    </>
  )
}
