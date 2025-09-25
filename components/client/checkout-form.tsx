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
  city: string
  address: string
  comment: string
  paymentMethod: string
  agreeToTerms: boolean
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
    city: "",
    address: "",
    comment: "",
    paymentMethod: "cash",
    agreeToTerms: false,
  })

 

  const paymentMethods = [
    {
      id: "cash",
      name: "الدفع عند الاستلام",
      description: "ادفع نقداً عند وصول الطلب",
      icon: Truck,
    },
   
  ]

  // Redirect if cart is empty
  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16">
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

    if (!formData.city.trim()) {
      newErrors.city = "المدينة مطلوبة"
    }

    if (!formData.address.trim()) {
      newErrors.address = "العنوان مطلوب"
    }

    if (!formData.agreeToTerms) {
      newErrors.agreeToTerms = true
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
        client_city: formData.city,
        client_address: formData.address,
        comment: formData.comment,
        payment_method: formData.paymentMethod,
        total_amount: total * 1.15, // Including tax
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

  const taxAmount = total * 0.15
  const finalTotal = total + taxAmount

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">إتمام الطلب</h1>
        <p className="text-muted-foreground">أكمل بياناتك لإتمام عملية الشراء</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
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
                      className="text-right"
                    />
                    {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">رقم الهاتف *</Label>
                    <Input
                      id="phone"
                      value={formData.phone}
                      onChange={(e) => handleInputChange("phone", e.target.value)}
                      placeholder="05xxxxxxxx"
                      className="text-right"
                    />
                    {errors.phone && <p className="text-sm text-red-500">{errors.phone}</p>}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="city">المدينة *</Label>
                    <Input
                      id="city"
                      value={formData.city}
                      onChange={(e) => handleInputChange("city", e.target.value)}
                      placeholder="المدينة"
                      className="text-right"
                    />
                    
                    {errors.city && <p className="text-sm text-red-500">{errors.city}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="address">العنوان التفصيلي *</Label>
                    <Input
                      id="address"
                      value={formData.address}
                      onChange={(e) => handleInputChange("address", e.target.value)}
                      placeholder="الحي، الشارع، رقم المبنى"
                      className="text-right"
                    />
                    {errors.address && <p className="text-sm text-red-500">{errors.address}</p>}
                  </div>
                </div>

               
              </CardContent>
            </Card>

            {/* Payment Method */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                    <span className="text-primary font-bold">2</span>
                  </div>
                  طريقة الدفع
                </CardTitle>
              </CardHeader>
              <CardContent>
                <RadioGroup
                  value={formData.paymentMethod}
                  onValueChange={(value) => handleInputChange("paymentMethod", value)}
                  className="space-y-4"
                >
                  {paymentMethods.map((method) => (
                    <div key={method.id} className="flex items-center space-x-2 space-x-reverse">
                      <RadioGroupItem value={method.id} id={method.id} />
                      <Label htmlFor={method.id} className="flex items-center gap-3 cursor-pointer flex-1">
                        <method.icon className="w-5 h-5 text-muted-foreground" />
                        <div>
                          <p className="font-medium">{method.name}</p>
                          <p className="text-sm text-muted-foreground">{method.description}</p>
                        </div>
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </CardContent>
            </Card>

            {/* Terms and Conditions */}
          

            {/* Submit Button */}
            <Button
              type="submit"
              size="lg"
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
              disabled={isSubmitting}
            >
              {isSubmitting ? "جاري معالجة الطلب..." : `تأكيد الطلب - ${finalTotal.toLocaleString("ar-SA")} ر.س`}
            </Button>
          </form>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <Card className="border-0 shadow-lg sticky top-24">
            <CardHeader>
              <CardTitle>ملخص الطلب</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Order Items */}
              <div className="space-y-4">
                {items.map((item) => (
                  <div key={`${item.id}-${item.type}`} className="flex gap-3">
                    <img
                      src={item.image || "/placeholder.svg"}
                      alt={item.name_ar}
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <h4 className="font-medium text-sm line-clamp-2">{item.name_ar}</h4>
                      <div className="flex items-center justify-between mt-2">
                        <span className="text-sm text-muted-foreground">الكمية: {item.quantity}</span>
                        <span className="font-medium">{(item.price * item.quantity).toLocaleString("ar-SA")} ر.س</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <Separator />

              {/* Price Breakdown */}
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span>المجموع الفرعي ({itemCount} عنصر)</span>
                  <span>{total.toLocaleString("ar-SA")} ر.س</span>
                </div>
                <div className="flex justify-between">
                  <span>الشحن</span>
                  <span className="text-green-600">مجاني</span>
                </div>
                <div className="flex justify-between">
                  <span>ضريبة القيمة المضافة (15%)</span>
                  <span>{taxAmount.toLocaleString("ar-SA")} ر.س</span>
                </div>
                <Separator />
                <div className="flex justify-between text-lg font-bold">
                  <span>المجموع الكلي</span>
                  <span className="text-primary">{finalTotal.toLocaleString("ar-SA")} ر.س</span>
                </div>
              </div>

              {/* Trust Indicators */}
             
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
