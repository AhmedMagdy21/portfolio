"use client"

import { useEffect, useState } from "react"
import { useLanguage } from "@/context/LanguageContext"
import { getPortfolioData } from "@/lib/storage"
import { Mail, MapPin, Phone, Linkedin } from "lucide-react"
import { LaserFlow } from "@/components/animations/LaserFlow"

export function Footer() {
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

  const contactItems = [
    {
      icon: Phone,
      label: t("contact.phone"),
      value: `${data.contact.phone} / ${data.contact.phone2}`,
      href: `https://wa.me/2${data.contact.phone}`,
    },
    {
      icon: Mail,
      label: t("contact.email"),
      value: data.contact.email,
      href: `mailto:${data.contact.email}`,
    },
    {
      icon: MapPin,
      label: t("contact.location"),
      value: data.contact.location,
      href: null,
    },
    {
      icon: Linkedin,
      label: t("contact.linkedin"),
      value: "LinkedIn Profile",
      href: data.contact.linkedin,
    },
  ]

  return (
    <footer id="contact" className="py-20 px-4 border-t border-border relative overflow-hidden">
      <LaserFlow />

      <div className="container mx-auto max-w-4xl relative z-10">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 animate-in fade-in">{t("contact.title")}</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {contactItems.map((item, index) => (
            <div
              key={index}
              className="flex items-center gap-4 p-4 rounded-lg bg-card hover:bg-accent transition-all duration-300 animate-in fade-in slide-in-from-bottom-2 group"
              style={{
                animationDelay: `${index * 100}ms`,
              }}
            >
              <div className="p-3 bg-primary/10 rounded-lg group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300">
                <item.icon className="h-6 w-6 text-primary" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-muted-foreground">{item.label}</p>
                {item.href ? (
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium hover:text-primary transition-colors"
                  >
                    {item.value}
                  </a>
                ) : (
                  <p className="font-medium">{item.value}</p>
                )}
              </div>
            </div>
          ))}
        </div>
        <div className="mt-12 text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} Ahmed Magdy. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
