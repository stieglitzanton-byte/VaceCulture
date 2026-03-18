import Link from 'next/link'
import { TextEffect } from "./motion-primitives/text-effect"
import { AnimatedGroup } from "@/components/motion-primitives/animated-group"
import { transitionVariants } from "@/lib/utils"

export default function CallToAction() {
    return (
        <section className="py-16 mx-2">
            <div className="mx-auto max-w-5xl rounded-lg border border-border/50 px-6 py-12 md:py-20 lg:py-32">
                <div className="text-center">
                    <TextEffect
                        triggerOnView
                        preset="fade-in-blur"
                        speedSegment={0.3}
                        as="h2"
                        className="text-balance text-4xl font-bold lg:text-5xl text-foreground">
                        Bereit fur dein Unikat?
                    </TextEffect>
                    <TextEffect
                        triggerOnView
                        preset="fade-in-blur"
                        speedSegment={0.3}
                        delay={0.3}
                        as="p"
                        className="mt-4 text-muted-foreground">
                        Limitierte Drops. Kein Piece gleicht dem anderen. Starte jetzt deinen Design-Prozess.
                    </TextEffect>
                    <AnimatedGroup
                        triggerOnView
                        variants={{
                            container: {
                                visible: {
                                    transition: {
                                        staggerChildren: 0.05,
                                        delayChildren: 0.75,
                                    },
                                },
                            },
                            ...transitionVariants,
                        }}
                        className="mt-12 flex flex-wrap justify-center gap-4"
                    >
                        <a
                            href="#order-form"
                            className="inline-flex h-11 items-center justify-center rounded-md px-8 text-base font-semibold tracking-wide transition-colors text-foreground"
                            style={{ backgroundColor: '#CC0000' }}>
                            <span>Design starten</span>
                        </a>

                        <Link
                            href="#"
                            className="inline-flex h-11 items-center justify-center rounded-md border border-border/50 px-8 text-base font-medium text-foreground transition-colors hover:bg-secondary">
                            <span>Kontakt</span>
                        </Link>
                    </AnimatedGroup>
                </div>
            </div>
        </section>
    )
}
