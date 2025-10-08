"use client"

import { useState } from "react"
import { ProtectedRoute } from "@/components/ProtectedRoute"
import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar"
import { SummaryEditor } from "@/components/dashboard/SummaryEditor"
import { SkillsEditor } from "@/components/dashboard/SkillsEditor"
import { ExperienceEditor } from "@/components/dashboard/ExperienceEditor"
import { EducationEditor } from "@/components/dashboard/EducationEditor"

export default function DashboardPage() {
  const [activeSection, setActiveSection] = useState<"summary" | "skills" | "experience" | "education">("summary")

  return (
    <ProtectedRoute>
      <div className="flex min-h-screen bg-background">
        <DashboardSidebar activeSection={activeSection} setActiveSection={setActiveSection} />
        <main className="flex-1 p-8 ml-64">
          <div className="max-w-4xl mx-auto">
            {activeSection === "summary" && <SummaryEditor />}
            {activeSection === "skills" && <SkillsEditor />}
            {activeSection === "experience" && <ExperienceEditor />}
            {activeSection === "education" && <EducationEditor />}
          </div>
        </main>
      </div>
    </ProtectedRoute>
  )
}
