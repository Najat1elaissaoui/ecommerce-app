"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { 
  ChevronLeft, 
  ChevronRight, 
  Plus, 
  X, 
  Upload, 
  Video, 
  Image as ImageIcon,
  Trash2,
  Check,
  Star
} from "lucide-react"
import { useToast } from "@/hooks/use-toast"

// Simplified interfaces for the product form
interface ProductFormData {
  // Step 1: Basic Info
  name: string
  homeImage1: { image: string; description: string }
  homeImage2: { image: string; description: string }
  
  // Step 2: Product Details
  productImage: string
  productDescription: string
  price: number
  quantity: number
  
  // Step 3: Benefits
  benefitsTitle: string
  benefits: Array<{
    id: string
    name: string
    description?: string
 
  }>
  
  // Step 4: Ingredients
  selectedIngredients: number[]
  
  // Step 5: Video
  videoUrl?: string
  
  // Step 6: Serving info
  servingComponents: Array<{ id: string; name: string; quantity: string }>
  suggestedUse: string
  doesNotContain: string
  
  // Step 7: Reasons
  reasons: Array<{ id: string; title: string; description: string; image?: string }>
  
  // Step 8: Opinions
  opinions: Array<{ id: string; name: string; rating: number; comment: string }>
  
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
  { id: 2, title: "تفاصيل المنتج", description: "صورة المنتج والسعر والكمية" },
  { id: 3, title: "الفوائد", description: "فوائد المنتج وخصائصه" },
  { id: 4, title: "المكونات", description: "اختيار مكونات المنتج" },
  { id: 5, title: "الفيديو", description: "إضافة فيديو توضيحي (اختياري)" },
  { id: 6, title: "التركيبة", description: "مكونات كل حصة" },
  { id: 7, title: "أسباب الشراء", description: "الأسباب المقنعة لشراء المنتج" },
  { id: 8, title: "الآراء", description: "آراء وتقييمات العملاء" },
 
]

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
    price: 0,
    quantity: 0,
    benefitsTitle: "",
    benefits: [],
    selectedIngredients: [],
    servingComponents: [],
    suggestedUse: "",
    doesNotContain: "",
    reasons: [],
    opinions: [],
    
  })

  // Reset form when modal opens/closes
  useEffect(() => {
    if (product && isOpen) {
      setFormData(product)
    } else if (isOpen) {
      setFormData({
        name: "",
        homeImage1: { image: "", description: "" },
        homeImage2: { image: "", description: "" },
        productImage: "",
        productDescription: "",
        price: 0,
        quantity: 0,
        benefitsTitle: "",
        benefits: [],
        selectedIngredients: [],
        servingComponents: [],
        suggestedUse: "",
        doesNotContain: "",
        reasons: [],
        opinions: [],
        
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

  const handleImageUpload = (file: File): string => {
    return URL.createObjectURL(file)
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-2 sm:p-4">
      <div className="bg-background rounded-lg shadow-lg w-full max-w-4xl max-h-[95vh] sm:max-h-[90vh] flex flex-col mx-2 sm:mx-0">
        {/* Header */}
        <div className="border-b p-4 sm:p-6 flex-shrink-0">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold">
                {product ? "تعديل المنتج" : "إضافة منتج جديد"}
              </h2>
              <p className="text-muted-foreground text-sm sm:text-base">
                {STEPS[currentStep - 1].description}
              </p>
            </div>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="w-4 h-4" />
            </Button>
          </div>
          
          {/* Progress Steps */}
          <div className="mt-4 sm:mt-6">
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
        <div className="p-4 sm:p-6 overflow-y-auto flex-1 min-h-0">
          {/* Step 1: Basic Info */}
          {currentStep === 1 && (
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

              {/* Home Images */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
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
                                onChange={(e) => {
                                  const file = e.target.files?.[0]
                                  if (file) {
                                    const url = handleImageUpload(file)
                                    setFormData(prev => ({ ...prev, homeImage1: { ...prev.homeImage1, image: url } }))
                                  }
                                }}
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
                                onChange={(e) => {
                                  const file = e.target.files?.[0]
                                  if (file) {
                                    const url = handleImageUpload(file)
                                    setFormData(prev => ({ ...prev, homeImage2: { ...prev.homeImage2, image: url } }))
                                  }
                                }}
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
          )}

          {/* Step 2: Product Details */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>تفاصيل المنتج</CardTitle>
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
                              onChange={(e) => {
                                const file = e.target.files?.[0]
                                if (file) {
                                  const url = handleImageUpload(file)
                                  setFormData(prev => ({ ...prev, productImage: url }))
                                }
                              }}
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

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <Label>السعر</Label>
                      <Input
                        type="number"
                        value={formData.price}
                        onChange={(e) => setFormData(prev => ({ ...prev, price: parseFloat(e.target.value) || 0 }))}
                        placeholder="0.00"
                      />
                    </div>
                    <div>
                      <Label>الكمية</Label>
                      <Input
                        type="number"
                        value={formData.quantity}
                        onChange={(e) => setFormData(prev => ({ ...prev, quantity: parseInt(e.target.value) || 0 }))}
                        placeholder="0"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Step 3: Benefits */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>قسم الفوائد</CardTitle>
                </CardHeader>
               
              </Card>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold">الفوائد</h3>
                  <Button onClick={() => {
                    const newBenefit = {
                      id: Date.now().toString(),
                      name: "",
                      description: ""
                    }
                    setFormData(prev => ({ ...prev, benefits: [...prev.benefits, newBenefit] }))
                  }} className="gap-2">
                    <Plus className="w-4 h-4" />
                    إضافة فائدة
                  </Button>
                </div>

                {formData.benefits.map((benefit, index) => (
                  <Card key={benefit.id}>
                    <CardContent className="pt-4 space-y-4">
                      <div className="flex items-center justify-between">
                        <Label>الفائدة {index + 1}</Label>
                        <Button 
                          variant="destructive" 
                          size="sm" 
                          onClick={() => setFormData(prev => ({
                            ...prev,
                            benefits: prev.benefits.filter(b => b.id !== benefit.id)
                          }))}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>

                      <div>
                        <Label>اسم الفائدة</Label>
                        <Input
                          value={benefit.name}
                          onChange={(e) => setFormData(prev => ({
                            ...prev,
                            benefits: prev.benefits.map(b => 
                              b.id === benefit.id ? { ...b, name: e.target.value } : b
                            )
                          }))}
                          placeholder="اسم الفائدة"
                        />
                      </div>

                      <div>
                        <Label>وصف الفائدة (اختياري)</Label>
                        <Textarea
                          value={benefit.description || ""}
                          onChange={(e) => setFormData(prev => ({
                            ...prev,
                            benefits: prev.benefits.map(b => 
                              b.id === benefit.id ? { ...b, description: e.target.value } : b
                            )
                          }))}
                          placeholder="وصف تفصيلي للفائدة"
                          rows={2}
                        />
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
          )}

          {/* Step 4: Ingredients */}
          {currentStep === 4 && (
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>اختيار المكونات</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {ingredients.map((ingredient) => (
                      <Card key={ingredient.id} className={`cursor-pointer transition-colors ${formData.selectedIngredients.includes(ingredient.id) ? 'ring-2 ring-primary' : ''}`}>
                        <CardContent className="p-4">
                          <div className="flex items-start gap-3">
                            <Checkbox
                              checked={formData.selectedIngredients.includes(ingredient.id)}
                              onCheckedChange={() => {
                                setFormData(prev => ({
                                  ...prev,
                                  selectedIngredients: prev.selectedIngredients.includes(ingredient.id)
                                    ? prev.selectedIngredients.filter(id => id !== ingredient.id)
                                    : [...prev.selectedIngredients, ingredient.id]
                                }))
                              }}
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
                              onClick={() => setFormData(prev => ({
                                ...prev,
                                selectedIngredients: prev.selectedIngredients.filter(id => id !== ingredient.id)
                              }))}
                            />
                          </Badge>
                        ) : null
                      })}
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          )}

          {/* Step 5: Video */}
          {currentStep === 5 && (
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
          )}

          {/* Step 6: Serving */}
          {currentStep === 6 && (
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>محتويات كل حصة</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label>مكونات كل حصة</Label>
                    <Button onClick={() => {
                      const newComponent = {
                        id: Date.now().toString(),
                        name: "",
                        quantity: ""
                      }
                      setFormData(prev => ({ ...prev, servingComponents: [...prev.servingComponents, newComponent] }))
                    }} size="sm" className="gap-2">
                      <Plus className="w-4 h-4" />
                      إضافة مكون
                    </Button>
                  </div>

                  <div className="space-y-3">
                    {formData.servingComponents.map((component) => (
                      <div key={component.id} className="flex flex-col sm:flex-row gap-2 items-start sm:items-center">
                        <Input
                          value={component.name}
                          onChange={(e) => setFormData(prev => ({
                            ...prev,
                            servingComponents: prev.servingComponents.map(c => 
                              c.id === component.id ? { ...c, name: e.target.value } : c
                            )
                          }))}
                          placeholder="اسم المكون (مثال: صوديوم)"
                          className="flex-1"
                        />
                        <Input
                          value={component.quantity}
                          onChange={(e) => setFormData(prev => ({
                            ...prev,
                            servingComponents: prev.servingComponents.map(c => 
                              c.id === component.id ? { ...c, quantity: e.target.value } : c
                            )
                          }))}
                          placeholder="الكمية (مثال: 10 ملغ)"
                          className="sm:w-32 w-full"
                        />
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={() => setFormData(prev => ({
                            ...prev,
                            servingComponents: prev.servingComponents.filter(c => c.id !== component.id)
                          }))}
                          className="w-full sm:w-auto"
                        >
                          <Trash2 className="w-4 h-4" />
                          <span className="sm:hidden ml-2">حذف</span>
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
                    <Label>طريقة الاستعمال المقترحة</Label>
                    <Textarea
                      value={formData.suggestedUse}
                      onChange={(e) => setFormData(prev => ({ ...prev, suggestedUse: e.target.value }))}
                      placeholder="طريقة الاستخدام المقترحة"
                      rows={3}
                    />
                  </div>
                  <div>
                    <Label>لا يحتوي المنتج على</Label>
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
          )}

          {/* Step 7: Reasons */}
          {currentStep === 7 && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">أسباب شراء هذا المنتج</h3>
                <Button onClick={() => {
                  const newReason = {
                    id: Date.now().toString(),
                    title: "",
                    description: ""
                  }
                  setFormData(prev => ({ ...prev, reasons: [...prev.reasons, newReason] }))
                }} className="gap-2">
                  <Plus className="w-4 h-4" />
                  إضافة سبب
                </Button>
              </div>

              <div className="space-y-4">
                {formData.reasons.map((reason, index) => (
                  <Card key={reason.id}>
                    <CardContent className="pt-4 space-y-4">
                      <div className="flex items-center justify-between">
                        <Label>السبب {index + 1}</Label>
                        <Button 
                          variant="destructive" 
                          size="sm" 
                          onClick={() => setFormData(prev => ({
                            ...prev,
                            reasons: prev.reasons.filter(r => r.id !== reason.id)
                          }))}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>

                      <div>
                        <Label>العنوان</Label>
                        <Input
                          value={reason.title}
                          onChange={(e) => setFormData(prev => ({
                            ...prev,
                            reasons: prev.reasons.map(r => 
                              r.id === reason.id ? { ...r, title: e.target.value } : r
                            )
                          }))}
                          placeholder="عنوان السبب"
                        />
                      </div>

                      <div>
                        <Label>الوصف</Label>
                        <Textarea
                          value={reason.description}
                          onChange={(e) => setFormData(prev => ({
                            ...prev,
                            reasons: prev.reasons.map(r => 
                              r.id === reason.id ? { ...r, description: e.target.value } : r
                            )
                          }))}
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
                              <Button 
                                variant="outline" 
                                size="sm" 
                                onClick={() => setFormData(prev => ({
                                  ...prev,
                                  reasons: prev.reasons.map(r => 
                                    r.id === reason.id ? { ...r, image: undefined } : r
                                  )
                                }))}
                              >
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
                                onChange={(e) => {
                                  const file = e.target.files?.[0]
                                  if (file) {
                                    const url = handleImageUpload(file)
                                    setFormData(prev => ({
                                      ...prev,
                                      reasons: prev.reasons.map(r => 
                                        r.id === reason.id ? { ...r, image: url } : r
                                      )
                                    }))
                                  }
                                }}
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
          )}

          {/* Step 8: Opinions */}
          {currentStep === 8 && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">آراء العملاء</h3>
                <Button onClick={() => {
                  const newOpinion = {
                    id: Date.now().toString(),
                    name: "",
                    rating: 5,
                    comment: ""
                  }
                  setFormData(prev => ({ ...prev, opinions: [...prev.opinions, newOpinion] }))
                }} className="gap-2">
                  <Plus className="w-4 h-4" />
                  إضافة رأي
                </Button>
              </div>

              <div className="space-y-4">
                {formData.opinions.map((opinion, index) => (
                  <Card key={opinion.id}>
                    <CardContent className="pt-4 space-y-4">
                      <div className="flex items-center justify-between">
                        <Label>الرأي {index + 1}</Label>
                        <Button 
                          variant="destructive" 
                          size="sm" 
                          onClick={() => setFormData(prev => ({
                            ...prev,
                            opinions: prev.opinions.filter(o => o.id !== opinion.id)
                          }))}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <Label>اسم العميل</Label>
                          <Input
                            value={opinion.name}
                            onChange={(e) => setFormData(prev => ({
                              ...prev,
                              opinions: prev.opinions.map(o => 
                                o.id === opinion.id ? { ...o, name: e.target.value } : o
                              )
                            }))}
                            placeholder="اسم العميل"
                          />
                        </div>
                        <div>
                          <Label>التقييم</Label>
                          <div className="flex items-center gap-1">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <Star
                                key={star}
                                className={`w-5 h-5 cursor-pointer ${
                                  star <= opinion.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'
                                }`}
                                onClick={() => setFormData(prev => ({
                                  ...prev,
                                  opinions: prev.opinions.map(o => 
                                    o.id === opinion.id ? { ...o, rating: star } : o
                                  )
                                }))}
                              />
                            ))}
                          </div>
                        </div>
                      </div>

                      <div>
                        <Label>التعليق</Label>
                        <Textarea
                          value={opinion.comment}
                          onChange={(e) => setFormData(prev => ({
                            ...prev,
                            opinions: prev.opinions.map(o => 
                              o.id === opinion.id ? { ...o, comment: e.target.value } : o
                            )
                          }))}
                          placeholder="تعليق العميل"
                          rows={3}
                        />
                      </div>
                    </CardContent>
                  </Card>
                ))}

                {formData.opinions.length === 0 && (
                  <div className="text-center py-8 text-muted-foreground">
                    لا توجد آراء مضافة بعد. اضغط على "إضافة رأي" لبدء الإضافة.
                  </div>
                )}
              </div>
            </div>
          )}

         

         

          {/* Placeholder for future steps */}
          {currentStep > 8 && (
            <div className="text-center py-12">
              <h3 className="text-lg font-semibold mb-2">{STEPS[currentStep - 1]?.title}</h3>
              <p className="text-muted-foreground mb-4">{STEPS[currentStep - 1]?.description}</p>
              <div className="bg-muted rounded-lg p-8">
                <p className="text-muted-foreground">
                  هذه الخطوة قيد التطوير...
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="border-t p-4 sm:p-6 flex-shrink-0">
          <div className="flex items-center justify-between gap-4">
            <Button
              variant="outline"
              onClick={prevStep}
              disabled={currentStep === 1}
              className="gap-2 flex-shrink-0"
            >
              <ChevronRight className="w-4 h-4" />
              <span className="hidden sm:inline">السابق</span>
            </Button>
            
            <div className="flex gap-2 flex-shrink-0">
              {currentStep < STEPS.length ? (
                <Button onClick={nextStep} className="gap-2">
                  <span className="hidden sm:inline">التالي</span>
                  <span className="sm:hidden">التالي</span>
                  <ChevronLeft className="w-4 h-4" />
                </Button>
              ) : (
                <Button onClick={handleSubmit} disabled={loading} className="gap-2">
                  {loading ? (
                    <>
                      <span className="hidden sm:inline">جاري الحفظ...</span>
                      <span className="sm:hidden">حفظ...</span>
                    </>
                  ) : (
                    <>
                      <span className="hidden sm:inline">حفظ المنتج</span>
                      <span className="sm:hidden">حفظ</span>
                    </>
                  )}
                  <Check className="w-4 h-4" />
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}