"use client"

import { useRouter } from "next/navigation"
import { useLanguage } from "@/context/LanguageContext"
import { logout } from "@/lib/auth"
import { Button } from "@/components/ui/button"
import { User, Briefcase, GraduationCap, Code, LogOut, Home } from "lucide-react"
import Link from "next/link"

interface DashboardSidebarProps {
  activeSection: "summary" | "skills" | "experience" | "education"
  setActiveSection: (section: "summary" | "skills" | "experience" | "education") => void
}

export function DashboardSidebar({ activeSection, setActiveSection }: DashboardSidebarProps) {
  const router = useRouter()
  const { t } = useLanguage()

  const handleLogout = () => {
    logout()
    router.push("/login")
  }

  const sections = [
    { id: "summary" as const, label: t("dashboard.summary"), icon: User },
    { id: "skills" as const, label: t("dashboard.skills"), icon: Code },
    { id: "experience" as const, label: t("dashboard.experience"), icon: Briefcase },
    { id: "education" as const, label: t("dashboard.education"), icon: GraduationCap },
  ]

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 border-r border-border bg-card p-6 flex flex-col">
      <div className="mb-8">
        <h1 className="text-2xl font-bold">{t("dashboard.title")}</h1>
        <p className="text-sm text-muted-foreground mt-1">Content Management</p>
      </div>

      <nav className="flex-1 space-y-2">
        {sections.map((section) => (
          <button
            key={section.id}
            onClick={() => setActiveSection(section.id)}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
              activeSection === section.id
                ? "bg-primary text-primary-foreground"
                : "hover:bg-accent text-muted-foreground hover:text-foreground"
            }`}
          >
            <section.icon className="h-5 w-5" />
            <span className="font-medium">{section.label}</span>
          </button>
        ))}
      </nav>

      <div className="space-y-2 pt-4 border-t border-border">
        <Link href="/" className="w-full">
          <Button variant="outline" className="w-full justify-start gap-3 bg-transparent">
            <Home className="h-5 w-5" />
            View Portfolio
          </Button>
        </Link>
        <Button variant="destructive" onClick={handleLogout} className="w-full justify-start gap-3">
          <LogOut className="h-5 w-5" />
          {t("dashboard.logout")}
        </Button>
      </div>
    </aside>
  )
}
