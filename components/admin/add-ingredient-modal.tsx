"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Upload, X, Image as ImageIcon } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

interface Ingredient {
  id: number
  name: string
  image?: string
  description?: string
  created_at: string
  updated_at: string
}

interface AddIngredientModalProps {
  isOpen: boolean
  onClose: () => void
  onSave: (ingredientData: Omit<Ingredient, "id" | "created_at" | "updated_at">) => void
  ingredient?: Ingredient | null
}

export default function AddIngredientModal({
  isOpen,
  onClose,
  onSave,
  ingredient
}: AddIngredientModalProps) {
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    image: "",
    description: ""
  })
  const [imagePreview, setImagePreview] = useState<string | null>(null)

  // Reset form when modal opens/closes or ingredient changes
  useEffect(() => {
    if (ingredient) {
      setFormData({
        name: ingredient.name,
        image: ingredient.image || "",
        description: ingredient.description || ""
      })
      setImagePreview(ingredient.image ? `/images/${ingredient.image}` : null)
    } else {
      setFormData({
        name: "",
        image: "",
        description: ""
      })
      setImagePreview(null)
    }
  }, [ingredient, isOpen])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const ingredientData = {
        name: formData.name.trim(),
        image: formData.image.trim() || undefined,
        description: formData.description.trim() || undefined
      }

      onSave(ingredientData)
    } catch (error) {
      console.error("Error saving ingredient:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      // In a real application, you would upload the file to a server
      // For now, we'll just simulate it with the filename
      const fileName = file.name
      setFormData(prev => ({ ...prev, image: fileName }))
      
      // Create preview URL
      const reader = new FileReader()
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const removeImage = () => {
    setFormData(prev => ({ ...prev, image: "" }))
    setImagePreview(null)
  }

  const handleClose = () => {
    if (!loading) {
      onClose()
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {ingredient ? "تعديل المكون" : "إضافة مكون جديد"}
          </DialogTitle>
          <DialogDescription>
            {ingredient ? "تحديث بيانات المكون" : "إضافة مكون جديد للمنتجات"}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name Field */}
          <div className="space-y-2">
            <Label htmlFor="name">اسم المكون *</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData(prev => ({...prev, name: e.target.value}))}
              placeholder="أدخل اسم المكون"
              required
            />
          </div>

          {/* Image Upload */}
          <div className="space-y-2">
            <Label>صورة المكون (اختياري)</Label>
            
            {imagePreview ? (
              <Card>
                <CardContent className="p-4">
                  <div className="relative">
                    <img
                      src={imagePreview}
                      alt="معاينة الصورة"
                      className="w-full h-32 object-cover rounded-md"
                    />
                    <Button
                      type="button"
                      variant="destructive"
                      size="sm"
                      className="absolute top-2 right-2"
                      onClick={removeImage}
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">
                    {formData.image}
                  </p>
                </CardContent>
              </Card>
            ) : (
              <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center">
                <ImageIcon className="w-12 h-12 mx-auto text-muted-foreground mb-2" />
                <p className="text-sm text-muted-foreground mb-2">
                  اختر صورة للمكون
                </p>
                <Label htmlFor="image-upload" className="cursor-pointer">
                  <Button type="button" variant="outline" className="gap-2">
                    <Upload className="w-4 h-4" />
                    تحميل صورة
                  </Button>
                  <Input
                    id="image-upload"
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="sr-only"
                  />
                </Label>
              </div>
            )}
          </div>

          {/* Description Field */}
          <div className="space-y-2">
            <Label htmlFor="description">الوصف (اختياري)</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData(prev => ({...prev, description: e.target.value}))}
              placeholder="وصف المكون وفوائده"
              rows={3}
            />
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2 justify-end pt-4">
            <Button 
              type="button" 
              variant="outline" 
              onClick={handleClose}
              disabled={loading}
            >
              إلغاء
            </Button>
            <Button type="submit" disabled={loading || !formData.name.trim()}>
              {loading ? "جاري الحفظ..." : ingredient ? "تحديث" : "إضافة"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}