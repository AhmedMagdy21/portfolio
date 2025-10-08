"use client"

import { useState, useEffect } from "react"
import { getPortfolioData, savePortfolioData } from "@/lib/storage"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { useLanguage } from "@/context/LanguageContext"
import { Save, X } from "lucide-react"

export function SummaryEditor() {
  const { t } = useLanguage()
  const [data, setData] = useState(getPortfolioData())
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState(data.summary)

  useEffect(() => {
    setFormData(data.summary)
  }, [data])

  const handleSave = () => {
    const updatedData = { ...data, summary: formData }
    savePortfolioData(updatedData)
    setData(updatedData)
    setIsEditing(false)
    // Trigger custom event for real-time updates
    window.dispatchEvent(new Event("portfolioUpdate"))
  }

  const handleCancel = () => {
    setFormData(data.summary)
    setIsEditing(false)
  }

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold">{t("dashboard.summary")}</h2>
          <p className="text-muted-foreground mt-1">Edit your personal information and introduction</p>
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
          <CardTitle>Personal Information</CardTitle>
          <CardDescription>Your name, title, and professional summary</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              disabled={!isEditing}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              disabled={!isEditing}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              disabled={!isEditing}
              rows={6}
              className="resize-none"
            />
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
