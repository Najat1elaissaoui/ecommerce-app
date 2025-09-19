"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Star, ShoppingCart, Heart, Share2, Plus, Minus, Shield, Truck, RefreshCw } from "lucide-react"
import type { Product } from "@/lib/types"
import { useCart } from "@/lib/cart-context"
import { useToast } from "@/hooks/use-toast"

interface ProductDetailsProps {
  product: Product
}

export default function ProductDetails({ product }: ProductDetailsProps) {
  const [selectedImage, setSelectedImage] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [isFavorite, setIsFavorite] = useState(false)
  const { addItem } = useCart()
  const { toast } = useToast()

  const discount = 17 // Mock discount
  const originalPrice = product.price / (1 - discount / 100)
  const rating = 4.8
  const reviewCount = 156

  const features = [
    "100% أصلي ومضمون",
    "خالي من المواد المضافة الضارة",
    "معتمد من إدارة الغذاء والدواء",
    "تم اختباره في المختبر",
    "مناسب للنباتيين",
  ]

  const specifications = [
    { label: "الحجم", value: "2.27 كيلو" },
    { label: "عدد الحصص", value: "74 حصة" },
    { label: "البروتين لكل حصة", value: "24 جرام" },
    { label: "السعرات الحرارية", value: "120 سعرة" },
    { label: "تاريخ الانتهاء", value: "12/2025" },
  ]

  const handleQuantityChange = (change: number) => {
    const newQuantity = quantity + change
    if (newQuantity >= 1 && newQuantity <= product.quantity) {
      setQuantity(newQuantity)
    }
  }

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addItem({
        id: product.id,
        name_ar: product.name_ar,
        price: product.price,
        type: "product",
        image: product.images?.[0],
      })
    }

    toast({
      title: "تم إضافة المنتج للسلة",
      description: `تم إضافة ${quantity} من ${product.name_ar} إلى سلة التسوق`,
    })

    setQuantity(1) // Reset quantity after adding
  }

  return (
    <div className="space-y-8">
      {/* Breadcrumb */}
      <nav className="text-sm text-muted-foreground">
        <span>الرئيسية</span> / <span>المنتجات</span> / <span className="text-foreground">{product.name_ar}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Product Images */}
        <div className="space-y-4">
          <div className="relative overflow-hidden rounded-lg bg-muted">
            <img
              src={product.images?.[selectedImage] || "/placeholder.svg"}
              alt={product.name_ar}
              className="w-full h-96 object-cover"
            />
            {discount > 0 && <Badge className="absolute top-4 right-4 bg-red-100 text-red-800">خصم {discount}%</Badge>}
          </div>

          {/* Thumbnail Images */}
          {product.images && product.images.length > 1 && (
            <div className="flex gap-2">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors ${
                    selectedImage === index ? "border-primary" : "border-transparent"
                  }`}
                >
                  <img
                    src={image || "/placeholder.svg"}
                    alt={`${product.name_ar} ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-4">{product.name_ar}</h1>

            {/* Rating */}
            <div className="flex items-center gap-4 mb-4">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-5 h-5 ${
                      i < Math.floor(rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                    }`}
                  />
                ))}
                <span className="text-lg font-medium mr-2">{rating}</span>
              </div>
              <span className="text-muted-foreground">({reviewCount} تقييم)</span>
            </div>

            {/* Price */}
            <div className="flex items-center gap-4 mb-6">
              <span className="text-3xl font-bold text-primary">{product.price.toLocaleString("ar-SA")} ر.س</span>
              {discount > 0 && (
                <span className="text-xl text-muted-foreground line-through">
                  {originalPrice.toLocaleString("ar-SA")} ر.س
                </span>
              )}
            </div>

            {/* Stock Status */}
            <div className="mb-6">
              {product.quantity > product.low_stock_threshold ? (
                <Badge className="bg-green-100 text-green-800">متوفر في المخزون</Badge>
              ) : product.quantity > 0 ? (
                <Badge className="bg-orange-100 text-orange-800">كمية محدودة - متبقي {product.quantity}</Badge>
              ) : (
                <Badge className="bg-red-100 text-red-800">غير متوفر</Badge>
              )}
            </div>
          </div>

          {/* Quantity Selector */}
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <span className="font-medium">الكمية:</span>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" onClick={() => handleQuantityChange(-1)} disabled={quantity <= 1}>
                  <Minus className="w-4 h-4" />
                </Button>
                <span className="w-12 text-center font-medium">{quantity}</span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleQuantityChange(1)}
                  disabled={quantity >= product.quantity}
                >
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4">
              <Button
                size="lg"
                className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground gap-2"
                disabled={product.quantity === 0}
                onClick={handleAddToCart}
              >
                <ShoppingCart className="w-5 h-5" />
                {product.quantity === 0 ? "غير متوفر" : "أضف للسلة"}
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={() => setIsFavorite(!isFavorite)}
                className={isFavorite ? "text-red-500 border-red-500" : ""}
              >
                <Heart className={`w-5 h-5 ${isFavorite ? "fill-current" : ""}`} />
              </Button>
              <Button variant="outline" size="lg">
                <Share2 className="w-5 h-5" />
              </Button>
            </div>
          </div>

          {/* Trust Indicators */}
          <div className="grid grid-cols-3 gap-4 py-6 border-t border-border">
            <div className="text-center">
              <Shield className="w-8 h-8 text-green-600 mx-auto mb-2" />
              <p className="text-sm font-medium">ضمان الجودة</p>
            </div>
            <div className="text-center">
              <Truck className="w-8 h-8 text-blue-600 mx-auto mb-2" />
              <p className="text-sm font-medium">شحن مجاني</p>
            </div>
            <div className="text-center">
              <RefreshCw className="w-8 h-8 text-purple-600 mx-auto mb-2" />
              <p className="text-sm font-medium">إرجاع مجاني</p>
            </div>
          </div>
        </div>
      </div>

      {/* ... existing code for product details tabs ... */}
      <Card>
        <CardContent className="p-6">
          <Tabs defaultValue="description" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="description">الوصف</TabsTrigger>
              <TabsTrigger value="specifications">المواصفات</TabsTrigger>
              <TabsTrigger value="features">المميزات</TabsTrigger>
              <TabsTrigger value="reviews">التقييمات</TabsTrigger>
            </TabsList>

            <TabsContent value="description" className="mt-6">
              <div className="prose prose-lg max-w-none text-right">
                <p className="text-muted-foreground leading-relaxed">{product.description_ar}</p>
                <h3 className="text-xl font-semibold text-foreground mt-6 mb-4">طريقة الاستخدام</h3>
                <p className="text-muted-foreground leading-relaxed">
                  امزج ملعقة واحدة (30 جرام) مع 200-250 مل من الماء أو الحليب. يُنصح بتناوله بعد التمرين مباشرة أو بين
                  الوجبات.
                </p>
              </div>
            </TabsContent>

            <TabsContent value="specifications" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {specifications.map((spec, index) => (
                  <div key={index} className="flex justify-between items-center p-4 bg-muted/30 rounded-lg">
                    <span className="font-medium">{spec.label}</span>
                    <span className="text-muted-foreground">{spec.value}</span>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="features" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-primary rounded-full" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="reviews" className="mt-6">
              <div className="text-center py-8">
                <p className="text-muted-foreground">التقييمات ستكون متاحة قريباً</p>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
