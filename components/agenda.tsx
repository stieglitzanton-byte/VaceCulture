'use client'

import { TextEffect } from "@/components/motion-primitives/text-effect"
import React from "react"
import { transitionVariants } from "@/lib/utils"
import { AnimatedGroup } from "@/components/motion-primitives/animated-group"
import { useTranslations } from '@/lib/i18n-provider'

export default function Agenda() {
    const t = useTranslations('process')

    return (
        <section id="design" className="scroll-py-16 py-16 md:scroll-py-32 md:py-32">
            <div className="mx-auto max-w-5xl px-6">
                <div className="grid gap-y-12 px-2 lg:grid-cols-[1fr_auto]">
                    <div className="text-center lg:text-left">
                        <TextEffect
                            triggerOnView
                            preset="fade-in-blur"
                            speedSegment={0.3}
                            as="h2"
                            className="mb-4 text-3xl font-bold md:text-4xl text-foreground">
                            {t('title')}
                        </TextEffect>
                    </div>

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
                        className="divide-y divide-dashed divide-border/50 sm:mx-auto sm:max-w-lg lg:mx-0"
                    >
                        <div className="pb-6">
                            <div className="font-medium space-x-2">
                                <span className='text-muted-foreground font-mono'>01</span>
                                <span className="text-foreground">{t('step1.title')}</span>
                            </div>
                            <p className="text-muted-foreground mt-4">{t('step1.description')}</p>
                        </div>
                        <div className="py-6">
                            <div className="font-medium space-x-2">
                                <span className='text-muted-foreground font-mono'>02</span>
                                <span className="text-foreground">{t('step2.title')}</span>
                            </div>
                            <p className="text-muted-foreground mt-4">{t('step2.description')}</p>
                        </div>
                        <div className="py-6">
                            <div className="font-medium space-x-2">
                                <span className='text-muted-foreground font-mono'>03</span>
                                <span className="text-foreground">{t('step3.title')}</span>
                            </div>
                            <p className="text-muted-foreground mt-4">{t('step3.description')}</p>
                        </div>
                        <div className="py-6">
                            <div className="font-medium space-x-2">
                                <span className='text-muted-foreground font-mono'>04</span>
                                <span className="text-foreground">{t('step4.title')}</span>
                            </div>
                            <p className="text-muted-foreground mt-4">{t('step4.description')}</p>
                        </div>
                    </AnimatedGroup>
                </div>
            </div>
        </section>
    )
}
