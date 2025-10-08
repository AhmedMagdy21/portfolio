"use client"

import type React from "react"
import { createContext, useContext, useEffect, useState } from "react"

export type Language = "en" | "ar" | "it"

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

const translations: Record<Language, Record<string, string>> = {
  en: {
    // Navigation
    "nav.summary": "Summary",
    "nav.skills": "Skills",
    "nav.experience": "Experience",
    "nav.education": "Education",
    "nav.projects": "Projects",
    "nav.contact": "Contact",

    // Hero
    "hero.name": "Ahmed Magdy",
    "hero.title": "Front-End Developer",
    "hero.description":
      "Front-End Developer specializing in modern, responsive web applications using React. Experienced in scalable UI development, secure RESTful API integration, and complex systems like license management, ERP, and ZATCA-compliant invoicing. Passionate about clean code, performance optimization, and continuous learning, with hands-on experience using AI tools such as GitHub Copilot and Cursor.",
    "hero.downloadCV": "Download CV",

    // Skills
    "skills.title": "Skills & Technologies",

    // Experience
    "experience.title": "Work Experience",
    "experience.projects": "Projects",

    // Education
    "education.title": "Education",

    // Counter
    "counter.title": "Projects Completed",
    "counter.subtitle": "Successful projects delivered",

    // Contact
    "contact.title": "Get In Touch",
    "contact.phone": "Phone",
    "contact.email": "Email",
    "contact.location": "Location",
    "contact.linkedin": "LinkedIn",

    // Login
    "login.title": "Admin Login",
    "login.email": "Email",
    "login.password": "Password",
    "login.submit": "Login",
    "login.error": "Invalid credentials",

    // Dashboard
    "dashboard.title": "Admin Dashboard",
    "dashboard.logout": "Logout",
    "dashboard.summary": "Summary",
    "dashboard.skills": "Skills",
    "dashboard.experience": "Experience",
    "dashboard.education": "Education",
    "dashboard.save": "Save Changes",
    "dashboard.cancel": "Cancel",
    "dashboard.add": "Add",
    "dashboard.edit": "Edit",
    "dashboard.delete": "Delete",
  },
  ar: {
    // Navigation
    "nav.summary": "الملخص",
    "nav.skills": "المهارات",
    "nav.experience": "الخبرة",
    "nav.education": "التعليم",
    "nav.projects": "المشاريع",
    "nav.contact": "التواصل",

    // Hero
    "hero.name": "أحمد مجدي",
    "hero.title": "مطور واجهات أمامية",
    "hero.description":
      "مطور واجهات أمامية متخصص في تطبيقات الويب الحديثة والمتجاوبة باستخدام React. خبرة في تطوير واجهات المستخدم القابلة للتوسع، وتكامل REST API الآمن، والأنظمة المعقدة مثل إدارة التراخيص، وأنظمة ERP، والفواتير المتوافقة مع ZATCA. شغوف بالكود النظيف، وتحسين الأداء، والتعلم المستمر، مع خبرة عملية في استخدام أدوات الذكاء الاصطناعي مثل GitHub Copilot و Cursor.",
    "hero.downloadCV": "تحميل السيرة الذاتية",

    // Skills
    "skills.title": "المهارات والتقنيات",

    // Experience
    "experience.title": "الخبرة العملية",
    "experience.projects": "المشاريع",

    // Education
    "education.title": "التعليم",

    // Counter
    "counter.title": "المشاريع المنجزة",
    "counter.subtitle": "مشاريع ناجحة تم تسليمها",

    // Contact
    "contact.title": "تواصل معي",
    "contact.phone": "الهاتف",
    "contact.email": "البريد الإلكتروني",
    "contact.location": "الموقع",
    "contact.linkedin": "لينكد إن",

    // Login
    "login.title": "تسجيل دخول المسؤول",
    "login.email": "البريد الإلكتروني",
    "login.password": "كلمة المرور",
    "login.submit": "تسجيل الدخول",
    "login.error": "بيانات اعتماد غير صالحة",

    // Dashboard
    "dashboard.title": "لوحة التحكم",
    "dashboard.logout": "تسجيل الخروج",
    "dashboard.summary": "الملخص",
    "dashboard.skills": "المهارات",
    "dashboard.experience": "الخبرة",
    "dashboard.education": "التعليم",
    "dashboard.save": "حفظ التغييرات",
    "dashboard.cancel": "إلغاء",
    "dashboard.add": "إضافة",
    "dashboard.edit": "تعديل",
    "dashboard.delete": "حذف",
  },
  it: {
    // Navigation
    "nav.summary": "Riepilogo",
    "nav.skills": "Competenze",
    "nav.experience": "Esperienza",
    "nav.education": "Istruzione",
    "nav.projects": "Progetti",
    "nav.contact": "Contatto",

    // Hero
    "hero.name": "Ahmed Magdy",
    "hero.title": "Sviluppatore Front-End",
    "hero.description":
      "Sviluppatore Front-End specializzato in applicazioni web moderne e responsive utilizzando React. Esperienza nello sviluppo di UI scalabili, integrazione sicura di API RESTful e sistemi complessi come gestione licenze, ERP e fatturazione conforme a ZATCA. Appassionato di codice pulito, ottimizzazione delle prestazioni e apprendimento continuo, con esperienza pratica nell'uso di strumenti AI come GitHub Copilot e Cursor.",
    "hero.downloadCV": "Scarica CV",

    // Skills
    "skills.title": "Competenze e Tecnologie",

    // Experience
    "experience.title": "Esperienza Lavorativa",
    "experience.projects": "Progetti",

    // Education
    "education.title": "Istruzione",

    // Counter
    "counter.title": "Progetti Completati",
    "counter.subtitle": "Progetti di successo consegnati",

    // Contact
    "contact.title": "Contattami",
    "contact.phone": "Telefono",
    "contact.email": "Email",
    "contact.location": "Posizione",
    "contact.linkedin": "LinkedIn",

    // Login
    "login.title": "Accesso Amministratore",
    "login.email": "Email",
    "login.password": "Password",
    "login.submit": "Accedi",
    "login.error": "Credenziali non valide",

    // Dashboard
    "dashboard.title": "Dashboard Amministratore",
    "dashboard.logout": "Esci",
    "dashboard.summary": "Riepilogo",
    "dashboard.skills": "Competenze",
    "dashboard.experience": "Esperienza",
    "dashboard.education": "Istruzione",
    "dashboard.save": "Salva Modifiche",
    "dashboard.cancel": "Annulla",
    "dashboard.add": "Aggiungi",
    "dashboard.edit": "Modifica",
    "dashboard.delete": "Elimina",
  },
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>("en")
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const savedLang = localStorage.getItem("language") as Language
    if (savedLang && ["en", "ar", "it"].includes(savedLang)) {
      setLanguageState(savedLang)
      document.documentElement.lang = savedLang
      document.documentElement.dir = savedLang === "ar" ? "rtl" : "ltr"
    }
  }, [])

  const setLanguage = (lang: Language) => {
    setLanguageState(lang)
    localStorage.setItem("language", lang)
    document.documentElement.lang = lang
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr"
  }

  const t = (key: string): string => {
    return translations[language][key] || key
  }

  if (!mounted) {
    return null
  }

  return <LanguageContext.Provider value={{ language, setLanguage, t }}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}
