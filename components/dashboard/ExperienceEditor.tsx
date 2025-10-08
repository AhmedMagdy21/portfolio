"use client"

import { useState, useEffect } from "react"
import { getPortfolioData, savePortfolioData } from "@/lib/storage"
import type { PortfolioData } from "@/lib/storage"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { useLanguage } from "@/context/LanguageContext"
import { Plus, Trash2, Save, X, Edit } from "lucide-react"

export function ExperienceEditor() {
  const { t } = useLanguage()
  const [data, setData] = useState(getPortfolioData())
  const [experience, setExperience] = useState(data.experience)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [isAdding, setIsAdding] = useState(false)

  const emptyExperience: PortfolioData["experience"][0] = {
    id: Date.now().toString(),
    company: "",
    location: "",
    period: "",
    role: "",
    description: "",
    projects: [],
  }

  const [formData, setFormData] = useState(emptyExperience)

  useEffect(() => {
    setExperience(data.experience)
  }, [data])

  const handleEdit = (exp: PortfolioData["experience"][0]) => {
    setFormData(exp)
    setEditingId(exp.id)
  }

  const handleAdd = () => {
    setFormData({ ...emptyExperience, id: Date.now().toString() })
    setIsAdding(true)
  }

  const handleSave = () => {
    let updatedExperience
    if (isAdding) {
      updatedExperience = [...experience, formData]
    } else {
      updatedExperience = experience.map((exp) => (exp.id === editingId ? formData : exp))
    }

    const updatedData = { ...data, experience: updatedExperience }
    savePortfolioData(updatedData)
    setData(updatedData)
    setExperience(updatedExperience)
    setEditingId(null)
    setIsAdding(false)
    setFormData(emptyExperience)
    window.dispatchEvent(new Event("portfolioUpdate"))
  }

  const handleCancel = () => {
    setEditingId(null)
    setIsAdding(false)
    setFormData(emptyExperience)
  }

  const handleDelete = (id: string) => {
    const updatedExperience = experience.filter((exp) => exp.id !== id)
    const updatedData = { ...data, experience: updatedExperience }
    savePortfolioData(updatedData)
    setData(updatedData)
    setExperience(updatedExperience)
    window.dispatchEvent(new Event("portfolioUpdate"))
  }

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold">{t("dashboard.experience")}</h2>
          <p className="text-muted-foreground mt-1">Manage your work experience and projects</p>
        </div>
        {!isAdding && !editingId && (
          <Button onClick={handleAdd} className="gap-2">
            <Plus className="h-4 w-4" />
            {t("dashboard.add")}
          </Button>
        )}
      </div>

      {(isAdding || editingId) && (
        <Card className="border-primary">
          <CardHeader>
            <CardTitle>{isAdding ? "Add New Experience" : "Edit Experience"}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="company">Company</Label>
                <Input
                  id="company"
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="role">Role</Label>
                <Input
                  id="role"
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="period">Period</Label>
                <Input
                  id="period"
                  value={formData.period}
                  onChange={(e) => setFormData({ ...formData, period: e.target.value })}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={3}
              />
            </div>

            <div className="flex gap-2">
              <Button onClick={handleSave} className="gap-2">
                <Save className="h-4 w-4" />
                {t("dashboard.save")}
              </Button>
              <Button onClick={handleCancel} variant="outline" className="gap-2 bg-transparent">
                <X className="h-4 w-4" />
                {t("dashboard.cancel")}
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="space-y-4">
        {experience.map((exp) => (
          <Card key={exp.id}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle>{exp.company}</CardTitle>
                  <CardDescription>
                    {exp.role} • {exp.location} • {exp.period}
                  </CardDescription>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="icon" onClick={() => handleEdit(exp)}>
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="destructive" size="icon" onClick={() => handleDelete(exp.id)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">{exp.description}</p>
              {exp.projects && exp.projects.length > 0 && (
                <div className="mt-4">
                  <p className="text-sm font-semibold mb-2">Projects:</p>
                  <ul className="space-y-1">
                    {exp.projects.map((project, idx) => (
                      <li key={idx} className="text-sm">
                        <span className="font-medium">{project.name}</span> - {project.description}
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
  )
}
