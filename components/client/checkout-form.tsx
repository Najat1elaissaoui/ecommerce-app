"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { ShoppingBag, CreditCard, Truck, Shield, ArrowLeft, CheckCircle } from "lucide-react"
import { useCart } from "@/lib/cart-context"
import { useToast } from "@/hooks/use-toast"
import Link from "next/link"

interface FormData {
  name: string
  phone: string
  address: string
}
 
 

export default function CheckoutForm() {
  const { items, total, itemCount, clearCart } = useCart()
  const { toast } = useToast()
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errors, setErrors] = useState<Partial<FormData>>({})
  const [formData, setFormData] = useState<FormData>({
    name: "",
    phone: "",
    
    address: "",
    
  })

 

 

  // Redirect if cart is empty
  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 pt-50">
        <div className="max-w-2xl mx-auto text-center">
          <ShoppingBag className="w-24 h-24 text-muted-foreground mx-auto mb-8" />
          <h1 className="text-3xl font-bold text-foreground mb-4">لا يمكن إتمام الطلب</h1>
          <p className="text-xl text-muted-foreground mb-8">سلة التسوق فارغة. أضف بعض المنتجات أولاً</p>
          <Button size="lg" asChild>
            <Link href="/products" className="gap-2">
              <ArrowLeft className="w-5 h-5" />
              تصفح المنتجات
            </Link>
          </Button>
        </div>
      </div>
    )
  }

  const validateForm = (): boolean => {
    const newErrors: Partial<FormData> = {}

    if (!formData.name.trim()) {
      newErrors.name = "الاسم مطلوب"
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "رقم الهاتف مطلوب"
    } else if (!/^[0-9+\-\s()]+$/.test(formData.phone)) {
      newErrors.phone = "رقم الهاتف غير صحيح"
    }


    if (!formData.address.trim()) {
      newErrors.address = "العنوان مطلوب"
    }


    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)

    try {
      // Create order
      const orderData = {
        client_name: formData.name,
        client_phone: formData.phone,
       
        client_address: formData.address,
       
        total_amount: total , // Including tax
        items: items.map((item) => ({
          id: item.id,
          name_ar: item.name_ar,
          price: item.price,
          quantity: item.quantity,
          type: item.type,
        })),
      }

      const response = await fetch("/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData),
      })

      if (response.ok) {
        const order = await response.json()
        clearCart()
        router.push(`/checkout/success?orderId=${order.id}`)
      } else {
        throw new Error("فشل في إنشاء الطلب")
      }
    } catch (error) {
      console.error("Checkout error:", error)
      toast({
        title: "خطأ في إتمام الطلب",
        description: "حدث خطأ أثناء معالجة طلبك. يرجى المحاولة مرة أخرى.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleInputChange = (field: keyof FormData, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }))
    }
  }

 
  const finalTotal = total

  return (
  <div className="container mx-auto px-20 py-4 pt-50">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">إتمام الطلب</h1>
        <p className="text-muted-foreground">أكمل بياناتك لإتمام عملية الشراء</p>
      </div>

   <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Checkout Form */}
        <div className="lg:col-span-2">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Customer Information */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                    <span className="text-primary font-bold">1</span>
                  </div>
                  معلومات العميل
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">الاسم الكامل *</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => handleInputChange("name", e.target.value)}
                      placeholder="أدخل اسمك الكامل"
                      className="text-right focus:ring-primary/40 focus:border-primary/60"
                    />
                    {errors.name && <p className="text-sm text-red-500 mt-1">{errors.name}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">رقم الهاتف *</Label>
                    <Input
                      id="phone"
                      value={formData.phone}
                      onChange={(e) => handleInputChange("phone", e.target.value)}
                      placeholder="05xxxxxxxx"
                      className="text-right focus:ring-primary/40 focus:border-primary/60"
                    />
                    {errors.phone && <p className="text-sm text-red-500 mt-1">{errors.phone}</p>}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="address">العنوان التفصيلي *</Label>
                    <Input
                      id="address"
                      value={formData.address}
                      onChange={(e) => handleInputChange("address", e.target.value)}
                      placeholder="الحي، الشارع، رقم المبنى"
                      className="text-right focus:ring-primary/40 focus:border-primary/60"
                    />
                    {errors.address && <p className="text-sm text-red-500 mt-1">{errors.address}</p>}
                  </div>
                </div>

               
              </CardContent>
            </Card>


            {/* Terms and Conditions */}
          

            {/* Submit Button */}
            <div className="flex justify-center">
              <Button
                type="submit"
                size="lg"
                className="w-full max-w-xs block mx-auto bg-primary hover:bg-primary/90 text-primary-foreground mt-3 text-base shadow-md rounded-xl"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <span className="flex items-center gap-2"><CheckCircle className="animate-spin w-5 h-5" /> جاري معالجة الطلب...</span>
                ) : (
                  <span>تأكيد الطلب - {finalTotal.toLocaleString("ar-MA")} د.م.</span>
                )}
              </Button>
            </div>
          </form>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <Card className="border border-border/40 shadow-md rounded-2xl sticky top-24">
            <CardHeader className="bg-primary/5 rounded-t-2xl pb-2">
              <CardTitle className="text-lg font-bold flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-primary" /> ملخص الطلب
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6 pt-4">
              <div className="space-y-3">
                <div className="flex justify-between text-lg font-bold">
                  <span>المجموع الكلي</span>
                  <span className="text-primary">{total.toLocaleString("ar-MA")} د.م.</span>
                </div>
                <Separator />
                <div className="flex items-center gap-2 text-green-600 text-sm">
                  <Shield className="w-4 h-4" /> الدفع عند الاستلام متاح
                </div>
                <div className="flex items-center gap-2 text-blue-600 text-sm">
                  <Truck className="w-4 h-4" /> توصيل سريع لجميع المدن
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
