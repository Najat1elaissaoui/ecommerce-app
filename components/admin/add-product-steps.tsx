"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { 
  ChevronLeft, 
  ChevronRight, 
  Plus, 
  X, 
  Upload, 
  Video, 
  Image as ImageIcon,
  Trash2,
  Check
} from "lucide-react"
import { useToast } from "@/hooks/use-toast"

// Interfaces pour les différentes sections
interface HomeImage {
  image: string
  description: string
}

interface Benefit {
  id: string
  title?: string
  description: string
  image?: string
  nameOnly?: boolean
}

interface ServingComponent {
  id: string
  name: string
  quantity: string
}

interface Reason {
  id: string
  title: string
  description: string
  image?: string
}

interface Opinion {
  id: string
  name: string
  rating: number
  comment: string
  image?: string
}

interface CustomSectionElement {
  id: string
  name: string
  description: string
  image?: string
}

interface CustomSection {
  id: string
  title: string
  description: string
  elements: CustomSectionElement[]
}

interface ProductPack {
  id: string
  name: string
  price: number
  quantity: number
}

interface ProductFormData {
  // Step 1: Basic Info
  name: string
  homeImage1: HomeImage
  homeImage2: HomeImage
  
  // Step 2: Product Image
  productImage: string
  productDescription: string
  
  // Step 3: Benefits
  benefitsTitle: string
  benefits: Benefit[]
  
  // Step 4: Ingredients
  selectedIngredients: number[]
  
  // Step 5: Video
  videoUrl?: string
  
  // Step 6: Serving Contains
  servingComponents: ServingComponent[]
  suggestedUse: string
  doesNotContain: string
  
  // Step 7: Reasons
  reasons: Reason[]
  
  // Step 8: Opinions
  opinions: Opinion[]
  
  // Step 9: Custom Sections
  customSections: CustomSection[]
  
  // Step 10: Packs
  packs: ProductPack[]
}

interface Ingredient {
  id: number
  name: string
  image?: string
  description?: string
}

interface AddProductStepsProps {
  isOpen: boolean
  onClose: () => void
  onSave: (productData: ProductFormData) => void
  product?: any
  ingredients: Ingredient[]
}

const STEPS = [
  { id: 1, title: "المعلومات الأساسية", description: "اسم المنتج وصور الصفحة الرئيسية" },
  { id: 2, title: "صورة المنتج", description: "صورة المنتج الأساسية ووصفها" },
  { id: 3, title: "الفوائد", description: "فوائد المنتج وخصائصه" },
  { id: 4, title: "المكونات", description: "اختيار مكونات المنتج" },
  { id: 5, title: "الفيديو", description: "إضافة فيديو توضيحي (اختياري)" },
  { id: 6, title: "التركيبة", description: "مكونات كل حصة" },
  { id: 7, title: "أسباب الشراء", description: "الأسباب المقنعة لشراء المنتج" },
  { id: 8, title: "الآراء", description: "آراء وتقييمات العملاء" },
  { id: 9, title: "أقسام مخصصة", description: "أقسام إضافية قابلة للتخصيص" },
  { id: 10, title: "العبوات", description: "تعريف عبوات وأسعار المنتج" }
]

// Step Components
function StepOneBasicInfo({ formData, setFormData }: { formData: ProductFormData, setFormData: React.Dispatch<React.SetStateAction<ProductFormData>> }) {
  const handleImageUpload = (file: File, type: 'homeImage1' | 'homeImage2') => {
    const url = URL.createObjectURL(file)
    setFormData(prev => ({
      ...prev,
      [type]: { ...prev[type], image: url }
    }))
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>معلومات المنتج الأساسية</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="productName">اسم المنتج</Label>
            <Input
              id="productName"
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              placeholder="أدخل اسم المنتج"
            />
          </div>
        </CardContent>
      </Card>

      <div className="grid md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>صورة الصفحة الرئيسية 1</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label>الصورة</Label>
              <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-4 text-center">
                {formData.homeImage1.image ? (
                  <div className="space-y-2">
                    <img src={formData.homeImage1.image} alt="Preview" className="w-full h-32 object-cover rounded" />
                    <Button variant="outline" size="sm" onClick={() => setFormData(prev => ({ ...prev, homeImage1: { ...prev.homeImage1, image: "" } }))}>
                      <X className="w-4 h-4 mr-2" />
                      إزالة
                    </Button>
                  </div>
                ) : (
                  <div>
                    <ImageIcon className="w-12 h-12 mx-auto text-muted-foreground mb-2" />
                    <Label htmlFor="homeImage1Upload" className="cursor-pointer">
                      <Button variant="outline" className="gap-2">
                        <Upload className="w-4 h-4" />
                        اختر صورة
                      </Button>
                      <Input
                        id="homeImage1Upload"
                        type="file"
                        accept="image/*"
                        onChange={(e) => e.target.files?.[0] && handleImageUpload(e.target.files[0], 'homeImage1')}
                        className="sr-only"
                      />
                    </Label>
                  </div>
                )}
              </div>
            </div>
            <div>
              <Label>الوصف</Label>
              <Textarea
                value={formData.homeImage1.description}
                onChange={(e) => setFormData(prev => ({ ...prev, homeImage1: { ...prev.homeImage1, description: e.target.value } }))}
                placeholder="وصف الصورة الأولى"
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>صورة الصفحة الرئيسية 2</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label>الصورة</Label>
              <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-4 text-center">
                {formData.homeImage2.image ? (
                  <div className="space-y-2">
                    <img src={formData.homeImage2.image} alt="Preview" className="w-full h-32 object-cover rounded" />
                    <Button variant="outline" size="sm" onClick={() => setFormData(prev => ({ ...prev, homeImage2: { ...prev.homeImage2, image: "" } }))}>
                      <X className="w-4 h-4 mr-2" />
                      إزالة
                    </Button>
                  </div>
                ) : (
                  <div>
                    <ImageIcon className="w-12 h-12 mx-auto text-muted-foreground mb-2" />
                    <Label htmlFor="homeImage2Upload" className="cursor-pointer">
                      <Button variant="outline" className="gap-2">
                        <Upload className="w-4 h-4" />
                        اختر صورة
                      </Button>
                      <Input
                        id="homeImage2Upload"
                        type="file"
                        accept="image/*"
                        onChange={(e) => e.target.files?.[0] && handleImageUpload(e.target.files[0], 'homeImage2')}
                        className="sr-only"
                      />
                    </Label>
                  </div>
                )}
              </div>
            </div>
            <div>
              <Label>الوصف</Label>
              <Textarea
                value={formData.homeImage2.description}
                onChange={(e) => setFormData(prev => ({ ...prev, homeImage2: { ...prev.homeImage2, description: e.target.value } }))}
                placeholder="وصف الصورة الثانية"
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

function StepTwoProductImage({ formData, setFormData }: { formData: ProductFormData, setFormData: React.Dispatch<React.SetStateAction<ProductFormData>> }) {
  const handleImageUpload = (file: File) => {
    const url = URL.createObjectURL(file)
    setFormData(prev => ({ ...prev, productImage: url }))
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>صورة المنتج الرئيسية</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label>صورة المنتج</Label>
            <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-4 text-center">
              {formData.productImage ? (
                <div className="space-y-2">
                  <img src={formData.productImage} alt="Product" className="w-full max-w-md mx-auto h-48 object-cover rounded" />
                  <Button variant="outline" size="sm" onClick={() => setFormData(prev => ({ ...prev, productImage: "" }))}>
                    <X className="w-4 h-4 mr-2" />
                    إزالة الصورة
                  </Button>
                </div>
              ) : (
                <div>
                  <ImageIcon className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
                  <Label htmlFor="productImageUpload" className="cursor-pointer">
                    <Button variant="outline" className="gap-2">
                      <Upload className="w-4 h-4" />
                      اختر صورة المنتج
                    </Button>
                    <Input
                      id="productImageUpload"
                      type="file"
                      accept="image/*"
                      onChange={(e) => e.target.files?.[0] && handleImageUpload(e.target.files[0])}
                      className="sr-only"
                    />
                  </Label>
                </div>
              )}
            </div>
          </div>
          <div>
            <Label>وصف المنتج</Label>
            <Textarea
              value={formData.productDescription}
              onChange={(e) => setFormData(prev => ({ ...prev, productDescription: e.target.value }))}
              placeholder="وصف تفصيلي للمنتج"
              rows={4}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

function StepThreeBenefits({ formData, setFormData }: { formData: ProductFormData, setFormData: React.Dispatch<React.SetStateAction<ProductFormData>> }) {
  const addBenefit = () => {
    const newBenefit: Benefit = {
      id: Date.now().toString(),
      description: "",
      nameOnly: false
    }
    setFormData(prev => ({ ...prev, benefits: [...prev.benefits, newBenefit] }))
  }

  const updateBenefit = (id: string, updates: Partial<Benefit>) => {
    setFormData(prev => ({
      ...prev,
      benefits: prev.benefits.map(benefit => 
        benefit.id === id ? { ...benefit, ...updates } : benefit
      )
    }))
  }

  const removeBenefit = (id: string) => {
    setFormData(prev => ({
      ...prev,
      benefits: prev.benefits.filter(benefit => benefit.id !== id)
    }))
  }

  const handleImageUpload = (file: File, benefitId: string) => {
    const url = URL.createObjectURL(file)
    updateBenefit(benefitId, { image: url })
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>قسم الفوائد</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label>عنوان قسم الفوائد</Label>
            <Input
              value={formData.benefitsTitle}
              onChange={(e) => setFormData(prev => ({ ...prev, benefitsTitle: e.target.value }))}
              placeholder="مثال: فوائد المنتج"
            />
          </div>
        </CardContent>
      </Card>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">الفوائد</h3>
          <Button onClick={addBenefit} className="gap-2">
            <Plus className="w-4 h-4" />
            إضافة فائدة
          </Button>
        </div>

        {formData.benefits.map((benefit) => (
          <Card key={benefit.id}>
            <CardContent className="pt-4 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Checkbox
                    checked={benefit.nameOnly}
                    onCheckedChange={(checked) => updateBenefit(benefit.id, { nameOnly: !!checked })}
                  />
                  <Label>اسم الفائدة فقط</Label>
                </div>
                <Button variant="destructive" size="sm" onClick={() => removeBenefit(benefit.id)}>
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>

              {!benefit.nameOnly && (
                <div>
                  <Label>عنوان الفائدة</Label>
                  <Input
                    value={benefit.title || ""}
                    onChange={(e) => updateBenefit(benefit.id, { title: e.target.value })}
                    placeholder="عنوان الفائدة"
                  />
                </div>
              )}

              <div>
                <Label>وصف الفائدة</Label>
                <Textarea
                  value={benefit.description}
                  onChange={(e) => updateBenefit(benefit.id, { description: e.target.value })}
                  placeholder="وصف تفصيلي للفائدة"
                  rows={2}
                />
              </div>

              <div>
                <Label>صورة الفائدة (اختياري)</Label>
                <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-4 text-center">
                  {benefit.image ? (
                    <div className="space-y-2">
                      <img src={benefit.image} alt="Benefit" className="w-full h-24 object-cover rounded" />
                      <Button variant="outline" size="sm" onClick={() => updateBenefit(benefit.id, { image: undefined })}>
                        <X className="w-4 h-4 mr-2" />
                        إزالة
                      </Button>
                    </div>
                  ) : (
                    <Label htmlFor={`benefit-image-${benefit.id}`} className="cursor-pointer">
                      <Button variant="outline" size="sm" className="gap-2">
                        <Upload className="w-4 h-4" />
                        إضافة صورة
                      </Button>
                      <Input
                        id={`benefit-image-${benefit.id}`}
                        type="file"
                        accept="image/*"
                        onChange={(e) => e.target.files?.[0] && handleImageUpload(e.target.files[0], benefit.id)}
                        className="sr-only"
                      />
                    </Label>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}

        {formData.benefits.length === 0 && (
          <div className="text-center py-8 text-muted-foreground">
            لا توجد فوائد مضافة بعد. اضغط على "إضافة فائدة" لبدء الإضافة.
          </div>
        )}
      </div>
    </div>
  )
}

function StepFourIngredients({ formData, setFormData, ingredients }: { formData: ProductFormData, setFormData: React.Dispatch<React.SetStateAction<ProductFormData>>, ingredients: Ingredient[] }) {
  const toggleIngredient = (ingredientId: number) => {
    setFormData(prev => ({
      ...prev,
      selectedIngredients: prev.selectedIngredients.includes(ingredientId)
        ? prev.selectedIngredients.filter(id => id !== ingredientId)
        : [...prev.selectedIngredients, ingredientId]
    }))
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>اختيار المكونات</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {ingredients.map((ingredient) => (
              <Card key={ingredient.id} className={`cursor-pointer transition-colors ${formData.selectedIngredients.includes(ingredient.id) ? 'ring-2 ring-primary' : ''}`}>
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <Checkbox
                      checked={formData.selectedIngredients.includes(ingredient.id)}
                      onCheckedChange={() => toggleIngredient(ingredient.id)}
                    />
                    <div className="flex-1">
                      <h4 className="font-medium">{ingredient.name}</h4>
                      {ingredient.description && (
                        <p className="text-sm text-muted-foreground mt-1">{ingredient.description}</p>
                      )}
                      {ingredient.image && (
                        <Badge variant="secondary" className="mt-2">
                          صورة متوفرة
                        </Badge>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          {ingredients.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              لا توجد مكونات متاحة. يرجى إضافة مكونات أولاً من قسم إدارة المكونات.
            </div>
          )}
        </CardContent>
      </Card>

      {formData.selectedIngredients.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>المكونات المختارة</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {formData.selectedIngredients.map((ingredientId) => {
                const ingredient = ingredients.find(i => i.id === ingredientId)
                return ingredient ? (
                  <Badge key={ingredient.id} variant="default" className="gap-2">
                    {ingredient.name}
                    <X 
                      className="w-3 h-3 cursor-pointer" 
                      onClick={() => toggleIngredient(ingredient.id)}
                    />
                  </Badge>
                ) : null
              })}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

function StepFiveVideo({ formData, setFormData }: { formData: ProductFormData, setFormData: React.Dispatch<React.SetStateAction<ProductFormData>> }) {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>إضافة فيديو (اختياري)</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label>رابط الفيديو</Label>
            <Input
              value={formData.videoUrl || ""}
              onChange={(e) => setFormData(prev => ({ ...prev, videoUrl: e.target.value }))}
              placeholder="مثال: https://youtube.com/watch?v=..."
            />
            <p className="text-sm text-muted-foreground mt-1">
              يمكنك إضافة رابط من YouTube، Vimeo، أو أي منصة فيديو أخرى
            </p>
          </div>
          
          {formData.videoUrl && (
            <div className="border rounded-lg p-4 bg-muted/50">
              <div className="flex items-center gap-2 mb-2">
                <Video className="w-4 h-4 text-primary" />
                <span className="font-medium">معاينة الفيديو</span>
              </div>
              <div className="bg-gray-200 rounded h-48 flex items-center justify-center">
                <div className="text-center">
                  <Video className="w-12 h-12 mx-auto text-gray-400 mb-2" />
                  <p className="text-sm text-gray-500">سيتم عرض الفيديو هنا</p>
                  <p className="text-xs text-gray-400 mt-1">{formData.videoUrl}</p>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

function StepSixServing({ formData, setFormData }: { formData: ProductFormData, setFormData: React.Dispatch<React.SetStateAction<ProductFormData>> }) {
  const addServingComponent = () => {
    const newComponent: ServingComponent = {
      id: Date.now().toString(),
      name: "",
      quantity: ""
    }
    setFormData(prev => ({ ...prev, servingComponents: [...prev.servingComponents, newComponent] }))
  }

  const updateServingComponent = (id: string, updates: Partial<ServingComponent>) => {
    setFormData(prev => ({
      ...prev,
      servingComponents: prev.servingComponents.map(component => 
        component.id === id ? { ...component, ...updates } : component
      )
    }))
  }

  const removeServingComponent = (id: string) => {
    setFormData(prev => ({
      ...prev,
      servingComponents: prev.servingComponents.filter(component => component.id !== id)
    }))
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Each Serving Contains</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <Label>مكونات كل حصة</Label>
            <Button onClick={addServingComponent} size="sm" className="gap-2">
              <Plus className="w-4 h-4" />
              إضافة مكون
            </Button>
          </div>

          <div className="space-y-3">
            {formData.servingComponents.map((component) => (
              <div key={component.id} className="flex gap-2 items-center">
                <Input
                  value={component.name}
                  onChange={(e) => updateServingComponent(component.id, { name: e.target.value })}
                  placeholder="اسم المكون (مثال: Sodium)"
                  className="flex-1"
                />
                <Input
                  value={component.quantity}
                  onChange={(e) => updateServingComponent(component.id, { quantity: e.target.value })}
                  placeholder="الكمية (مثال: 10 mg)"
                  className="w-32"
                />
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => removeServingComponent(component.id)}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            ))}
          </div>

          {formData.servingComponents.length === 0 && (
            <div className="text-center py-4 text-muted-foreground">
              لم تتم إضافة أي مكونات بعد
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>معلومات إضافية</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label>Suggested Use</Label>
            <Textarea
              value={formData.suggestedUse}
              onChange={(e) => setFormData(prev => ({ ...prev, suggestedUse: e.target.value }))}
              placeholder="طريقة الاستخدام المقترحة"
              rows={3}
            />
          </div>
          <div>
            <Label>Our gummies do not contain</Label>
            <Textarea
              value={formData.doesNotContain}
              onChange={(e) => setFormData(prev => ({ ...prev, doesNotContain: e.target.value }))}
              placeholder="ما لا يحتويه المنتج"
              rows={2}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

function StepSevenReasons({ formData, setFormData }: { formData: ProductFormData, setFormData: React.Dispatch<React.SetStateAction<ProductFormData>> }) {
  const addReason = () => {
    const newReason: Reason = {
      id: Date.now().toString(),
      title: "",
      description: ""
    }
    setFormData(prev => ({ ...prev, reasons: [...prev.reasons, newReason] }))
  }

  const updateReason = (id: string, updates: Partial<Reason>) => {
    setFormData(prev => ({
      ...prev,
      reasons: prev.reasons.map(reason => 
        reason.id === id ? { ...reason, ...updates } : reason
      )
    }))
  }

  const removeReason = (id: string) => {
    setFormData(prev => ({
      ...prev,
      reasons: prev.reasons.filter(reason => reason.id !== id)
    }))
  }

  const handleImageUpload = (file: File, reasonId: string) => {
    const url = URL.createObjectURL(file)
    updateReason(reasonId, { image: url })
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">أسباب شراء هذا المنتج</h3>
        <Button onClick={addReason} className="gap-2">
          <Plus className="w-4 h-4" />
          إضافة سبب
        </Button>
      </div>

      <div className="space-y-4">
        {formData.reasons.map((reason) => (
          <Card key={reason.id}>
            <CardContent className="pt-4 space-y-4">
              <div className="flex items-center justify-between">
                <Label>سبب الشراء</Label>
                <Button variant="destructive" size="sm" onClick={() => removeReason(reason.id)}>
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>

              <div>
                <Label>العنوان</Label>
                <Input
                  value={reason.title}
                  onChange={(e) => updateReason(reason.id, { title: e.target.value })}
                  placeholder="عنوان السبب"
                />
              </div>

              <div>
                <Label>الوصف</Label>
                <Textarea
                  value={reason.description}
                  onChange={(e) => updateReason(reason.id, { description: e.target.value })}
                  placeholder="وصف تفصيلي للسبب"
                  rows={3}
                />
              </div>

              <div>
                <Label>صورة السبب (اختياري)</Label>
                <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-4 text-center">
                  {reason.image ? (
                    <div className="space-y-2">
                      <img src={reason.image} alt="Reason" className="w-full h-32 object-cover rounded" />
                      <Button variant="outline" size="sm" onClick={() => updateReason(reason.id, { image: undefined })}>
                        <X className="w-4 h-4 mr-2" />
                        إزالة الصورة
                      </Button>
                    </div>
                  ) : (
                    <Label htmlFor={`reason-image-${reason.id}`} className="cursor-pointer">
                      <Button variant="outline" size="sm" className="gap-2">
                        <Upload className="w-4 h-4" />
                        إضافة صورة
                      </Button>
                      <Input
                        id={`reason-image-${reason.id}`}
                        type="file"
                        accept="image/*"
                        onChange={(e) => e.target.files?.[0] && handleImageUpload(e.target.files[0], reason.id)}
                        className="sr-only"
                      />
                    </Label>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}

        {formData.reasons.length === 0 && (
          <div className="text-center py-8 text-muted-foreground">
            لا توجد أسباب مضافة بعد. اضغط على "إضافة سبب" لبدء الإضافة.
          </div>
        )}
      </div>
    </div>
  )
}

export default function AddProductSteps({ 
  isOpen, 
  onClose, 
  onSave, 
  product, 
  ingredients 
}: AddProductStepsProps) {
  const [currentStep, setCurrentStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const { toast } = useToast()

  // Initialize form data
  const [formData, setFormData] = useState<ProductFormData>({
    name: "",
    homeImage1: { image: "", description: "" },
    homeImage2: { image: "", description: "" },
    productImage: "",
    productDescription: "",
    benefitsTitle: "",
    benefits: [],
    selectedIngredients: [],
    servingComponents: [],
    suggestedUse: "",
    doesNotContain: "",
    reasons: [],
    opinions: [],
    customSections: [],
    packs: []
  })

  // Reset form when modal opens/closes
  useEffect(() => {
    if (product && isOpen) {
      // Load existing product data
      setFormData(product)
    } else if (isOpen) {
      // Reset to initial state
      setFormData({
        name: "",
        homeImage1: { image: "", description: "" },
        homeImage2: { image: "", description: "" },
        productImage: "",
        productDescription: "",
        benefitsTitle: "",
        benefits: [],
        selectedIngredients: [],
        servingComponents: [],
        suggestedUse: "",
        doesNotContain: "",
        reasons: [],
        opinions: [],
        customSections: [],
        packs: []
      })
      setCurrentStep(1)
    }
  }, [product, isOpen])

  const nextStep = () => {
    if (currentStep < STEPS.length) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSubmit = async () => {
    setLoading(true)
    try {
      onSave(formData)
      toast({
        title: "تم حفظ المنتج بنجاح",
        description: "تم إنشاء المنتج بكل تفاصيله"
      })
    } catch (error) {
      toast({
        title: "خطأ",
        description: "حدث خطأ أثناء حفظ المنتج",
        variant: "destructive"
      })
    } finally {
      setLoading(false)
    }
  }

  // Image upload handler
  const handleImageUpload = (file: File, callback: (url: string) => void) => {
    // In a real app, upload to server and get URL
    const url = URL.createObjectURL(file)
    callback(url)
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
      <div className="bg-background rounded-lg shadow-lg max-w-4xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="border-b p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold">
                {product ? "تعديل المنتج" : "إضافة منتج جديد"}
              </h2>
              <p className="text-muted-foreground">
                {STEPS[currentStep - 1].description}
              </p>
            </div>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="w-4 h-4" />
            </Button>
          </div>
          
          {/* Progress Steps */}
          <div className="mt-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">
                الخطوة {currentStep} من {STEPS.length}
              </span>
              <span className="text-sm text-muted-foreground">
                {Math.round((currentStep / STEPS.length) * 100)}%
              </span>
            </div>
            <div className="w-full bg-muted rounded-full h-2">
              <div 
                className="bg-primary h-2 rounded-full transition-all"
                style={{ width: `${(currentStep / STEPS.length) * 100}%` }}
              />
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[60vh]">
          {currentStep === 1 && (
            <StepOneBasicInfo formData={formData} setFormData={setFormData} />
          )}
          {currentStep === 2 && (
            <StepTwoProductImage formData={formData} setFormData={setFormData} />
          )}
          {currentStep === 3 && (
            <StepThreeBenefits formData={formData} setFormData={setFormData} />
          )}
          {currentStep === 4 && (
            <StepFourIngredients formData={formData} setFormData={setFormData} ingredients={ingredients} />
          )}
          {currentStep === 5 && (
            <StepFiveVideo formData={formData} setFormData={setFormData} />
          )}
          {currentStep === 6 && (
            <StepSixServing formData={formData} setFormData={setFormData} />
          )}
          {currentStep === 7 && (
            <StepSevenReasons formData={formData} setFormData={setFormData} />
          )}
          {currentStep === 8 && (
            <div className="text-center text-muted-foreground py-8">
              قسم الآراء غير متوفر حالياً.
            </div>
          )}
          {currentStep === 9 && (
            <StepNineCustomSections formData={formData} setFormData={setFormData} />
          )}
          {currentStep === 10 && (
            <StepTenPacks formData={formData} setFormData={setFormData} />
          )}
        </div>

        {/* Footer */}
        <div className="border-t p-6 flex items-center justify-between">
          <Button
            variant="outline"
            onClick={prevStep}
            disabled={currentStep === 1}
            className="gap-2"
          >
            <ChevronRight className="w-4 h-4" />
            السابق
          </Button>
          
          <div className="flex gap-2">
            {currentStep < STEPS.length ? (
              <Button onClick={nextStep} className="gap-2">
                التالي
                <ChevronLeft className="w-4 h-4" />
              </Button>
            ) : (
              <Button onClick={handleSubmit} disabled={loading} className="gap-2">
                {loading ? "جاري الحفظ..." : "حفظ المنتج"}
                <Check className="w-4 h-4" />
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}