import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Shirt, Sparkles, Diamond } from 'lucide-react'
import React, { ReactNode } from 'react'
import { TextEffect } from "@/components/motion-primitives/text-effect"
import { transitionVariants } from "@/lib/utils"
import { AnimatedGroup } from "@/components/motion-primitives/animated-group"

export default function Features() {
    return (
        <section id="how" className="py-16 md:py-32">
            <div className="@container mx-auto max-w-5xl px-6">
                <div className="text-center">
                    <TextEffect
                        triggerOnView
                        preset="fade-in-blur"
                        speedSegment={0.3}
                        as="h2"
                        className="text-balance text-4xl font-bold lg:text-5xl text-foreground">
                        Jedes Piece ist einzigartig
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
                >
                    <Card
                        className="@min-4xl:max-w-full @min-4xl:grid-cols-3 @min-4xl:divide-x @min-4xl:divide-y-0 mx-auto mt-8 grid max-w-sm divide-y overflow-hidden shadow-zinc-950/5 *:text-center md:mt-16 border-border/50">
                        <div className="group shadow-zinc-950/5">
                            <CardHeader className="pb-3">
                                <CardDecorator>
                                    <Shirt
                                        className="size-6"
                                        aria-hidden
                                    />
                                </CardDecorator>
                                <h3 className="mt-6 font-medium text-xl text-foreground">Premium Selection</h3>
                            </CardHeader>
                            <CardContent>
                                <p className="text-sm text-muted-foreground">{'Die Basis bildet immer ein extrem hochwertiges, schweres Flannel. Sorgfältig von uns ausgewählt für den perfekten, modernen Streetwear-Fit.'}</p>
                            </CardContent>
                        </div>

                        <div className="group shadow-zinc-950/5">
                            <CardHeader className="pb-3">
                                <CardDecorator>
                                    <Sparkles
                                        className="size-6"
                                        aria-hidden
                                    />
                                </CardDecorator>
                                <h3 className="mt-6 font-medium text-xl text-foreground">Hand-Embellished</h3>
                            </CardHeader>
                            <CardContent>
                                <p className="mt-3 text-sm text-muted-foreground">{'Echte Handarbeit im Detail. Jede Perle, jeder Cut und jede Custom-Applikation wird einzeln und präzise in unserem Atelier in Deutschland angebracht.'}</p>
                            </CardContent>
                        </div>

                        <div className="group shadow-zinc-950/5">
                            <CardHeader className="pb-3">
                                <CardDecorator>
                                    <Diamond
                                        className="size-6"
                                        aria-hidden
                                    />
                                </CardDecorator>
                                <h3 className="mt-6 font-medium text-xl text-foreground">{'1 of 1 Design'}</h3>
                            </CardHeader>
                            <CardContent>
                                <p className="mt-3 text-sm text-muted-foreground">{'Keine Massenware, keine Restocks. Dein Piece wird individuell nach deiner Vision veredelt. Ein absolutes Unikat, das nur für dich existiert.'}</p>
                            </CardContent>
                        </div>
                    </Card>
                </AnimatedGroup>
            </div>
        </section>
    )
}

const CardDecorator = ({ children }: { children: ReactNode }) => (
    <div
        className="mask-radial-from-40% mask-radial-to-60% relative mx-auto size-36 duration-200 [--color-border:color-mix(in_oklab,var(--color-zinc-950)10%,transparent)] group-hover:[--color-border:color-mix(in_oklab,var(--color-zinc-950)20%,transparent)] dark:[--color-border:color-mix(in_oklab,var(--color-white)15%,transparent)] dark:group-hover:[--color-border:color-mix(in_oklab,var(--color-white)20%,transparent)]">
        <div
            aria-hidden
            className="absolute inset-0 bg-[linear-gradient(to_right,var(--color-border)_1px,transparent_1px),linear-gradient(to_bottom,var(--color-border)_1px,transparent_1px)] bg-size-[24px_24px] dark:opacity-50"
        />
        <div
            className="bg-background absolute inset-0 m-auto flex size-12 items-center justify-center border-l border-t">{children}</div>
    </div>
)
