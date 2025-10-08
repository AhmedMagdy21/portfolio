"use client"

import { useEffect, useState } from "react"
import { useLanguage } from "@/context/LanguageContext"
import { getPortfolioData } from "@/lib/storage"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Briefcase } from "lucide-react"

export function Experience() {
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
    <section id="experience" className="min-h-screen flex items-center justify-center py-20 px-4">
      <div className="container mx-auto max-w-4xl">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 animate-in fade-in slide-in-from-top-4">
          {t("experience.title")}
        </h2>
        <div className="space-y-6">
          {data.experience.map((exp, index) => (
            <Card
              key={exp.id}
              className="animate-in fade-in slide-in-from-bottom-4 hover:shadow-lg transition-all duration-300 relative overflow-hidden group"
              style={{
                animationDelay: `${index * 100}ms`,
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-purple-500/5 to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-primary via-purple-500 to-primary scale-y-0 group-hover:scale-y-100 transition-transform duration-500 origin-top" />

              <CardHeader className="relative z-10">
                <div className="flex items-start gap-4">
                  <div className="p-2 bg-primary/10 rounded-lg group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300">
                    <Briefcase className="h-6 w-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <CardTitle className="text-xl group-hover:text-primary transition-colors">{exp.company}</CardTitle>
                    <CardDescription className="text-base">
                      {exp.role} • {exp.location} • {exp.period}
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4 relative z-10">
                <p className="text-muted-foreground">{exp.description}</p>
                {exp.projects && exp.projects.length > 0 && (
                  <div className="space-y-2">
                    <h4 className="font-semibold text-sm">{t("experience.projects")}:</h4>
                    <ul className="space-y-2">
                      {exp.projects.map((project, idx) => (
                        <li key={idx} className="text-sm hover:translate-x-2 transition-transform duration-200">
                          <span className="font-medium">{project.name}</span>
                          <span className="text-muted-foreground"> - {project.description}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
