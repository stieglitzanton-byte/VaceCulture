import { TextEffect } from "@/components/motion-primitives/text-effect"
import React from "react"
import { transitionVariants } from "@/lib/utils"
import { AnimatedGroup } from "@/components/motion-primitives/animated-group"

export default function Agenda() {
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
                            Der Prozess
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
                                <span className="text-foreground">Vision teilen</span>
                            </div>
                            <p className="text-muted-foreground mt-4">{'Sag uns, welchen Vibe du suchst. Farbe, Fit und der Grad des Distressings \u2013 du gibst die Richtung vor, wir setzen es um.'}</p>
                        </div>
                        <div className="py-6">
                            <div className="font-medium space-x-2">
                                <span className='text-muted-foreground font-mono'>02</span>
                                <span className="text-foreground">Premium Blank Auswahl</span>
                            </div>
                            <p className="text-muted-foreground mt-4">{'Wir sourcen das perfekte, schwere Base-Flannel für dein Projekt. Qualität und Schnitt stehen hier an erster Stelle.'}</p>
                        </div>
                        <div className="py-6">
                            <div className="font-medium space-x-2">
                                <span className='text-muted-foreground font-mono'>03</span>
                                <span className="text-foreground">Hand-Customized</span>
                            </div>
                            <p className="text-muted-foreground mt-4">{'In unserem Atelier in Deutschland wird dein Piece veredelt. Jede Perle, jeder Cut und jede Custom-Naht wird von Hand platziert.'}</p>
                        </div>
                        <div className="py-6">
                            <div className="font-medium space-x-2">
                                <span className='text-muted-foreground font-mono'>04</span>
                                <span className="text-foreground">{'Dein 1 of 1'}</span>
                            </div>
                            <p className="text-muted-foreground mt-4">{'Dein exklusives VACE Flannel wird hochwertig verpackt und an dich verschickt. Niemand sonst auf der Welt hat genau dieses Piece.'}</p>
                        </div>
                    </AnimatedGroup>
                </div>
            </div>
        </section>
    )
}
