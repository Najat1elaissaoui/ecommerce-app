"use client"

import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Star, ShoppingCart } from "lucide-react"
import Link from "next/link"

interface RelatedProductsProps {
  currentProductId: number
}

export default function RelatedProducts({ currentProductId }: RelatedProductsProps) {
  // Mock related products
  const relatedProducts = [
    {
      id: 3,
      name_ar: "فيتامين د3 - 5000 وحدة",
      price: 89.99,
      originalPrice: 109.99,
      rating: 4.7,
      reviews: 89,
      image: "/placeholder.svg?key=vitamin-d3",
      discount: 18,
    },
    {
      id: 4,
      name_ar: "أوميغا 3 - زيت السمك",
      price: 199.99,
      originalPrice: 239.99,
      rating: 4.9,
      reviews: 156,
      image: "/placeholder.svg?key=omega-3",
      discount: 17,
    },
    {
      id: 5,
      name_ar: "مالتي فيتامين للرجال",
      price: 129.99,
      originalPrice: 149.99,
      rating: 4.6,
      reviews: 234,
      image: "/placeholder.svg?key=multivitamin",
      discount: 13,
    },
    {
      id: 6,
      name_ar: "BCAA - أحماض أمينية",
      price: 179.99,
      originalPrice: 199.99,
      rating: 4.8,
      reviews: 178,
      image: "/placeholder.svg?key=bcaa",
      discount: 10,
    },
  ]

  return (
    <section className="mt-16">
      <div className="text-center mb-8">
        <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">منتجات ذات صلة</h2>
        <p className="text-muted-foreground">منتجات أخرى قد تعجبك</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {relatedProducts.map((product, index) => (
          <Card
            key={product.id}
            className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg animate-slide-in-left"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <CardHeader className="relative p-0">
              <div className="relative overflow-hidden rounded-t-lg">
                <img
                  src={product.image || "/placeholder.svg"}
                  alt={product.name_ar}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <Badge className="absolute top-3 right-3 bg-red-100 text-red-800">خصم {product.discount}%</Badge>
              </div>
            </CardHeader>

            <CardContent className="p-4">
              <Link href={`/products/${product.id}`}>
                <h3 className="font-semibold text-foreground mb-2 hover:text-primary transition-colors line-clamp-2">
                  {product.name_ar}
                </h3>
              </Link>

              <div className="flex items-center gap-1 mb-3">
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                <span className="text-sm font-medium">{product.rating}</span>
                <span className="text-xs text-muted-foreground">({product.reviews})</span>
              </div>

              <div className="flex items-center gap-2 mb-4">
                <span className="text-lg font-bold text-primary">{product.price.toLocaleString("ar-SA")} ر.س</span>
                <span className="text-sm text-muted-foreground line-through">
                  {product.originalPrice.toLocaleString("ar-SA")} ر.س
                </span>
              </div>

              <Button size="sm" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground gap-2">
                <ShoppingCart className="w-3 h-3" />
                أضف للسلة
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}
