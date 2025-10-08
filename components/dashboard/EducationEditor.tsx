"use client"

import { useState, useEffect } from "react"
import { getPortfolioData, savePortfolioData } from "@/lib/storage"
import type { PortfolioData } from "@/lib/storage"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { useLanguage } from "@/context/LanguageContext"
import { Plus, Trash2, Save, X, Edit } from "lucide-react"

export function EducationEditor() {
  const { t } = useLanguage()
  const [data, setData] = useState(getPortfolioData())
  const [education, setEducation] = useState(data.education)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [isAdding, setIsAdding] = useState(false)

  const emptyEducation: PortfolioData["education"][0] = {
    id: Date.now().toString(),
    degree: "",
    institution: "",
    period: "",
  }

  const [formData, setFormData] = useState(emptyEducation)

  useEffect(() => {
    setEducation(data.education)
  }, [data])

  const handleEdit = (edu: PortfolioData["education"][0]) => {
    setFormData(edu)
    setEditingId(edu.id)
  }

  const handleAdd = () => {
    setFormData({ ...emptyEducation, id: Date.now().toString() })
    setIsAdding(true)
  }

  const handleSave = () => {
    let updatedEducation
    if (isAdding) {
      updatedEducation = [...education, formData]
    } else {
      updatedEducation = education.map((edu) => (edu.id === editingId ? formData : edu))
    }

    const updatedData = { ...data, education: updatedEducation }
    savePortfolioData(updatedData)
    setData(updatedData)
    setEducation(updatedEducation)
    setEditingId(null)
    setIsAdding(false)
    setFormData(emptyEducation)
    window.dispatchEvent(new Event("portfolioUpdate"))
  }

  const handleCancel = () => {
    setEditingId(null)
    setIsAdding(false)
    setFormData(emptyEducation)
  }

  const handleDelete = (id: string) => {
    const updatedEducation = education.filter((edu) => edu.id !== id)
    const updatedData = { ...data, education: updatedEducation }
    savePortfolioData(updatedData)
    setData(updatedData)
    setEducation(updatedEducation)
    window.dispatchEvent(new Event("portfolioUpdate"))
  }

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold">{t("dashboard.education")}</h2>
          <p className="text-muted-foreground mt-1">Manage your educational background</p>
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
            <CardTitle>{isAdding ? "Add New Education" : "Edit Education"}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="degree">Degree / Certificate</Label>
              <Input
                id="degree"
                value={formData.degree}
                onChange={(e) => setFormData({ ...formData, degree: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="institution">Institution</Label>
              <Input
                id="institution"
                value={formData.institution}
                onChange={(e) => setFormData({ ...formData, institution: e.target.value })}
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
        {education.map((edu) => (
          <Card key={edu.id}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle>{edu.degree}</CardTitle>
                  <CardDescription>
                    {edu.institution} • {edu.period}
                  </CardDescription>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="icon" onClick={() => handleEdit(edu)}>
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="destructive" size="icon" onClick={() => handleDelete(edu.id)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
          </Card>
        ))}
      </div>
    </div>
  )
}
