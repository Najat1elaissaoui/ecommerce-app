"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Plus, Minus, Trash2, ShoppingBag, ArrowLeft } from "lucide-react"
import { useCart } from "@/lib/cart-context"
import Link from "next/link"

export default function CartPage() {
  const { items, total, itemCount, updateQuantity, removeItem, clearCart } = useCart()

  const handleQuantityChange = (id: number, currentQuantity: number, change: number) => {
    const newQuantity = currentQuantity + change
    if (newQuantity > 0) {
      updateQuantity(id, newQuantity)
    }
  }

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto text-center">
          <ShoppingBag className="w-24 h-24 text-muted-foreground mx-auto mb-8" />
          <h1 className="text-3xl font-bold text-foreground mb-4">سلة التسوق فارغة</h1>
          <p className="text-xl text-muted-foreground mb-8">لم تقم بإضافة أي منتجات إلى سلة التسوق بعد</p>
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

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">سلة التسوق</h1>
        <p className="text-muted-foreground">لديك {itemCount} عنصر في سلة التسوق</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          {items.map((item) => (
            <Card key={`${item.id}-${item.type}`} className="border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="flex gap-6">
                  <img
                    src={item.image || "/placeholder.svg"}
                    alt={item.name_ar}
                    className="w-24 h-24 object-cover rounded-lg"
                  />

                  <div className="flex-1 space-y-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="text-lg font-semibold text-foreground">{item.name_ar}</h3>
                        <p className="text-sm text-muted-foreground">{item.type === "product" ? "منتج" : "باقة"}</p>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeItem(item.id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleQuantityChange(item.id, item.quantity, -1)}
                          className="w-10 h-10 p-0"
                        >
                          <Minus className="w-4 h-4" />
                        </Button>
                        <span className="w-12 text-center font-medium text-lg">{item.quantity}</span>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleQuantityChange(item.id, item.quantity, 1)}
                          className="w-10 h-10 p-0"
                        >
                          <Plus className="w-4 h-4" />
                        </Button>
                      </div>

                      <div className="text-left">
                        <p className="text-2xl font-bold text-primary">
                          {(item.price * item.quantity).toLocaleString("ar-SA")} ر.س
                        </p>
                        <p className="text-sm text-muted-foreground">{item.price.toLocaleString("ar-SA")} ر.س للقطعة</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}

          <div className="flex justify-between items-center pt-4">
            <Button variant="outline" onClick={clearCart} className="text-red-500 border-red-200 bg-transparent">
              <Trash2 className="w-4 h-4 ml-2" />
              مسح السلة
            </Button>
            <Button variant="outline" asChild>
              <Link href="/products">
                <ArrowLeft className="w-4 h-4 ml-2" />
                متابعة التسوق
              </Link>
            </Button>
          </div>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <Card className="border-0 shadow-lg sticky top-24">
            <CardHeader>
              <CardTitle>ملخص الطلب</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
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
                  <span>الضريبة</span>
                  <span>{(total * 0.15).toLocaleString("ar-SA")} ر.س</span>
                </div>
                <Separator />
                <div className="flex justify-between text-lg font-bold">
                  <span>المجموع الكلي</span>
                  <span className="text-primary">{(total * 1.15).toLocaleString("ar-SA")} ر.س</span>
                </div>
              </div>

              <div className="space-y-3 pt-4">
                <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground" size="lg" asChild>
                  <Link href="/checkout">إتمام الطلب</Link>
                </Button>
                <Button variant="outline" className="w-full bg-transparent" asChild>
                  <Link href="/products">متابعة التسوق</Link>
                </Button>
              </div>

              {/* Trust Indicators */}
              <div className="pt-6 space-y-3 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full" />
                  <span>شحن مجاني لجميع الطلبات</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full" />
                  <span>ضمان استرداد الأموال</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-purple-500 rounded-full" />
                  <span>دفع آمن ومضمون</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
