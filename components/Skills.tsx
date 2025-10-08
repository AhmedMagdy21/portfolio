"use client"

import { useEffect, useState } from "react"
import { useLanguage } from "@/context/LanguageContext"
import { getPortfolioData } from "@/lib/storage"
import { Card } from "@/components/ui/card"

export function Skills() {
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
    <section id="skills" className="min-h-screen flex items-center justify-center py-20 px-4">
      <div className="container mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 animate-in fade-in slide-in-from-top-4">
          {t("skills.title")}
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {data.skills.map((skill, index) => (
            <Card
              key={index}
              className="p-4 text-center hover:scale-105 hover:shadow-2xl hover:shadow-primary/20 transition-all duration-500 cursor-pointer animate-in fade-in slide-in-from-bottom-2 relative overflow-hidden group"
              style={{
                animationDelay: `${index * 50}ms`,
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-primary/5 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
              <p className="font-medium relative z-10">{skill}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
