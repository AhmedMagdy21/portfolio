"use client"

import { useState, useEffect } from "react"
import { getPortfolioData, savePortfolioData } from "@/lib/storage"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/context/LanguageContext"
import { Plus, Trash2, Save, X } from "lucide-react"
import { Badge } from "@/components/ui/badge"

export function SkillsEditor() {
  const { t } = useLanguage()
  const [data, setData] = useState(getPortfolioData())
  const [isEditing, setIsEditing] = useState(false)
  const [skills, setSkills] = useState<string[]>(data.skills)
  const [newSkill, setNewSkill] = useState("")

  useEffect(() => {
    setSkills(data.skills)
  }, [data])

  const handleAddSkill = () => {
    if (newSkill.trim()) {
      setSkills([...skills, newSkill.trim()])
      setNewSkill("")
    }
  }

  const handleRemoveSkill = (index: number) => {
    setSkills(skills.filter((_, i) => i !== index))
  }

  const handleSave = () => {
    const updatedData = { ...data, skills }
    savePortfolioData(updatedData)
    setData(updatedData)
    setIsEditing(false)
    window.dispatchEvent(new Event("portfolioUpdate"))
  }

  const handleCancel = () => {
    setSkills(data.skills)
    setIsEditing(false)
  }

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold">{t("dashboard.skills")}</h2>
          <p className="text-muted-foreground mt-1">Manage your technical skills and expertise</p>
        </div>
        {!isEditing && (
          <Button onClick={() => setIsEditing(true)} className="gap-2">
            <Save className="h-4 w-4" />
            {t("dashboard.edit")}
          </Button>
        )}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Skills List</CardTitle>
          <CardDescription>Add or remove skills from your portfolio</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {isEditing && (
            <div className="flex gap-2">
              <Input
                placeholder="Enter a new skill..."
                value={newSkill}
                onChange={(e) => setNewSkill(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleAddSkill()}
              />
              <Button onClick={handleAddSkill} className="gap-2">
                <Plus className="h-4 w-4" />
                {t("dashboard.add")}
              </Button>
            </div>
          )}

          <div className="flex flex-wrap gap-2">
            {skills.map((skill, index) => (
              <Badge key={index} variant="secondary" className="text-sm py-2 px-3">
                {skill}
                {isEditing && (
                  <button onClick={() => handleRemoveSkill(index)} className="ml-2 hover:text-destructive">
                    <Trash2 className="h-3 w-3" />
                  </button>
                )}
              </Badge>
            ))}
          </div>

          {isEditing && (
            <div className="flex gap-2 pt-4">
              <Button onClick={handleSave} className="gap-2">
                <Save className="h-4 w-4" />
                {t("dashboard.save")}
              </Button>
              <Button onClick={handleCancel} variant="outline" className="gap-2 bg-transparent">
                <X className="h-4 w-4" />
                {t("dashboard.cancel")}
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
