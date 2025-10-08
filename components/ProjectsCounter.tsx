"use client"

import { Counter } from "@/components/animations/Counter"
import { useLanguage } from "@/context/LanguageContext"

export function ProjectsCounter() {
  const { t } = useLanguage()

  return (
    <section className="py-20 px-4 bg-muted/30">
      <div className="container mx-auto text-center">
        <h3 className="text-2xl md:text-3xl font-bold mb-4">{t("counter.title")}</h3>
        <div className="flex justify-center items-baseline gap-2">
          <Counter target={16} duration={2500} className="text-6xl md:text-8xl font-bold text-primary" />
          <span className="text-3xl md:text-4xl text-muted-foreground">+</span>
        </div>
        <p className="text-lg text-muted-foreground mt-4">{t("counter.subtitle")}</p>
      </div>
    </section>
  )
}
