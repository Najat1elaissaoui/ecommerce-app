"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Star, ShoppingCart } from "lucide-react"
import Link from "next/link"
import { useCart } from "@/lib/cart-context"
import { useToast } from "@/hooks/use-toast"

export default function FeaturedProducts() {
  const { addItem } = useCart()
  const { toast } = useToast()

  const products = [
    {
      id: 1,
      name: "بروتين مصل اللبن",
      price: 299.99,
      originalPrice: 349.99,
      rating: 4.9,
      reviews: 156,
      image: "/protein-powder-assortment.png",
      badge: "الأكثر مبيعاً",
      badgeColor: "bg-green-100 text-green-800",
    },
    {
      id: 2,
      name: "كرياتين مونوهيدرات",
      price: 149.99,
      originalPrice: 179.99,
      rating: 4.8,
      reviews: 89,
      image: "/creatine-supplement.jpg",
      badge: "عرض خاص",
      badgeColor: "bg-red-100 text-red-800",
    },
    {
      id: 3,
      name: "فيتامين د3",
      price: 89.99,
      originalPrice: 109.99,
      rating: 4.7,
      reviews: 234,
      image: "/placeholder.svg?key=6d6gi",
      badge: "جديد",
      badgeColor: "bg-blue-100 text-blue-800",
    },
  ]

  const handleAddToCart = (product: (typeof products)[0]) => {
    addItem({
      id: product.id,
      name_ar: product.name,
      price: product.price,
      type: "product",
      image: product.image,
    })

    toast({
      title: "تم إضافة المنتج للسلة",
      description: `تم إضافة ${product.name} إلى سلة التسوق`,
    })
  }

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 animate-slide-in-right">
            المنتجات المميزة
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-pretty animate-slide-in-left">
            اكتشف مجموعتنا المختارة من أفضل المكملات الغذائية عالية الجودة
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {products.map((product, index) => (
            <Card
              key={product.id}
              className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg animate-slide-in-left"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <CardHeader className="relative p-0">
                <div className="relative overflow-hidden rounded-t-lg">
                  <img
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <Badge className={`absolute top-4 right-4 ${product.badgeColor}`}>{product.badge}</Badge>
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <CardTitle className="text-xl mb-2 text-foreground">{product.name}</CardTitle>

                <div className="flex items-center gap-2 mb-4">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-medium">{product.rating}</span>
                  </div>
                  <span className="text-sm text-muted-foreground">({product.reviews} تقييم)</span>
                </div>

                <div className="flex items-center gap-3 mb-6">
                  <span className="text-2xl font-bold text-primary">{product.price.toLocaleString("ar-SA")} ر.س</span>
                  <span className="text-lg text-muted-foreground line-through">
                    {product.originalPrice.toLocaleString("ar-SA")} ر.س
                  </span>
                </div>

                <Button
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground gap-2"
                  onClick={() => handleAddToCart(product)}
                >
                  <ShoppingCart className="w-4 h-4" />
                  أضف للسلة
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Button
            size="lg"
            variant="outline"
            className="border-primary text-primary hover:bg-primary/10 bg-transparent"
          >
            <Link href="/products">عرض جميع المنتجات</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
