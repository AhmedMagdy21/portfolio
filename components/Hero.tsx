"use client"

import { useEffect, useState } from "react"
import { useLanguage } from "@/context/LanguageContext"
import { getPortfolioData } from "@/lib/storage"
import { downloadCV } from "@/lib/cv-data"
import Image from "next/image"
import { BlurText } from "@/components/animations/BlurText"
import { DecryptedText } from "@/components/animations/DecryptedText"
import { Particles } from "@/components/animations/Particles"
import { ArrowDownTrayIcon } from "@heroicons/react/24/outline"

export function Hero() {
  const { t } = useLanguage()
  const [data, setData] = useState(getPortfolioData())

  useEffect(() => {
    const handleStorage = () => {
      setData(getPortfolioData())
    }
    window.addEventListener("storage", handleStorage)
    window.addEventListener("portfolioUpdate", handleStorage)
    return () => {
      window.removeEventListener("storage", handleStorage)
      window.removeEventListener("portfolioUpdate", handleStorage)
    }
  }, [])

  return (
    <section id="summary" className="min-h-screen flex items-center justify-center pt-16 px-4 relative">
      <Particles />

      <div className="container mx-auto relative z-10 p-5">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="flex justify-center md:justify-start order-2 md:order-1">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full blur-2xl opacity-20 animate-pulse" />
              <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-4 border-primary/20 shadow-2xl">
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202025-10-08%20at%2005.20.21_6d310ff4-L93khCLjiFsI7AfzmbGJGhOar21BQQ.jpg"
                  alt={data.summary.name}
                  fill
                  className="object-cover w-full h-full"
                  priority
                />
              </div>
            </div>
          </div>

          <div className="space-y-6 order-1 md:order-2">
            <div className="space-y-2">
              <BlurText text={data.summary.name} className="text-4xl md:text-6xl font-bold text-balance" delay={200} />
              <BlurText
                text={data.summary.title}
                className="text-2xl md:text-3xl text-primary font-semibold"
                delay={600}
              />
            </div>
            <DecryptedText
              text={data.summary.description}
              className="text-lg text-muted-foreground leading-relaxed text-pretty"
              delay={1000}
            />
            <div className="pt-4">
              <button
                onClick={downloadCV}
                className="group relative inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-blue-500/50"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <ArrowDownTrayIcon className="w-5 h-5 relative z-10 group-hover:animate-bounce" />
                <span className="relative z-10">{t("hero.downloadCV")}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
