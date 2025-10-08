"use client"

import { useEffect, useState } from "react"
import { useLanguage } from "@/context/LanguageContext"
import { getPortfolioData } from "@/lib/storage"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { GraduationCap } from "lucide-react"

export function Education() {
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
    <section id="education" className="min-h-screen flex items-center justify-center py-20 px-4">
      <div className="container mx-auto max-w-4xl">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 animate-in fade-in slide-in-from-top-4">
          {t("education.title")}
        </h2>
        <div className="space-y-6">
          {data.education.map((edu, index) => (
            <Card
              key={edu.id}
              className="animate-in fade-in slide-in-from-left-4 hover:shadow-lg transition-shadow"
              style={{
                animationDelay: `${index * 100}ms`,
              }}
            >
              <CardHeader>
                <div className="flex items-start gap-4">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <GraduationCap className="h-6 w-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <CardTitle className="text-xl">{edu.degree}</CardTitle>
                    <CardDescription className="text-base">
                      {edu.institution} • {edu.period}
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
