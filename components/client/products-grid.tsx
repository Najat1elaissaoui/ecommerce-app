"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ShoppingCart, Heart, Eye } from "lucide-react"
import Link from "next/link"
import type { Product } from "@/lib/types"
import { useCart } from "@/lib/cart-context"
import { useToast } from "@/hooks/use-toast"

interface ProductsGridProps {
  searchParams: {
    search?: string
    category?: string
    sort?: string
    page?: string
  }
  viewMode?: "grid" | "list"
}

export default function ProductsGrid({ searchParams, viewMode = "grid" }: ProductsGridProps) {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const { addItem } = useCart()
  const { toast } = useToast()

  // Helper to format price in Moroccan Dirhams (DHS) with Western (Latin) digits
  const formatPrice = (value: number) => {
    // Round to nearest whole number; adapt if fractional part should be shown
    return Math.round(value).toLocaleString('en-US')
  }

  // Mock products data
  const mockProducts: Product[] = [
    {
      id: 1,
      name_ar: "بروتين مصل اللبن - شوكولاتة",
      price: 299.99,
      quantity: 50,
      description_ar: "بروتين عالي الجودة لبناء العضلات وزيادة القوة",
      images: ["/creatine-supplement.jpg"],
      low_stock_threshold: 5,
      is_active: true,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
    {
      id: 2,
      name_ar: "كرياتين مونوهيدرات",
      price: 149.99,
      quantity: 30,
      description_ar: "مكمل الكرياتين الأفضل لزيادة الطاقة والقوة",
      images: ["/creatine-supplement.jpg"],
      low_stock_threshold: 10,
      is_active: true,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
 
  ]

  useEffect(() => {
    const timer = setTimeout(() => {
      setProducts(mockProducts)
      setLoading(false)
    }, 1000)
    return () => clearTimeout(timer)
  }, [searchParams])

  const handleAddToCart = (product: Product) => {
    addItem({
      id: product.id,
      name_ar: product.name_ar,
      price: product.price,
      type: "product",
      image: product.images?.[0],
    })
    toast({
      title: "تم إضافة المنتج للسلة",
      description: `تم إضافة ${product.name_ar} إلى سلة التسوق`,
    })
  }

  if (loading) {
    return (
      <div className="flex justify-center">
        <div className="w-full max-w-7xl">
          {viewMode === "grid" ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center">
              {[...Array(6)].map((_, i) => (
                <Card key={i} className="animate-pulse w-full max-w-sm">
                  <div className="h-64 bg-muted rounded-t-lg" />
                  <CardContent className="p-6">
                    <div className="h-4 bg-muted rounded mb-2" />
                    <div className="h-4 bg-muted rounded w-3/4 mb-4" />
                    <div className="h-10 bg-muted rounded" />
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="space-y-4 max-w-5xl mx-auto">
              {[...Array(4)].map((_, i) => (
                <Card key={i} className="animate-pulse">
                  <div className="flex gap-6 p-6">
                    <div className="h-48 w-48 bg-muted rounded-lg flex-shrink-0" />
                    <div className="flex-1 space-y-4">
                      <div className="h-6 bg-muted rounded w-3/4" />
                      <div className="h-4 bg-muted rounded w-full" />
                      <div className="h-4 bg-muted rounded w-5/6" />
                      <div className="h-4 bg-muted rounded w-2/3" />
                      <div className="flex justify-between items-center">
                        <div className="h-8 bg-muted rounded w-24" />
                        <div className="h-10 bg-muted rounded w-32" />
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <p className="text-muted-foreground">
          عرض {products.length} من أصل {products.length} منتج
        </p>
      </div>

      <div className="flex justify-center">
        <div className="w-full max-w-7xl">
          {viewMode === "grid" ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center">
              {products.map((product, index) => (
                <Card
                  key={product.id}
                  className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg animate-slide-in-left w-full max-w-sm flex flex-col min-h-[420px]"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <CardHeader className="relative p-0">
                    <div className="relative overflow-hidden rounded-t-lg">
                      <img
                        src={product.images?.[0] || "/placeholder.svg"}
                        alt={product.name_ar}
                        className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      {/* Icons removed */}
                    </div>
                  </CardHeader>
                  <CardContent className="p-6 flex flex-col flex-1 justify-between">
                    <div>
                      <Link href={`/products/${product.id}`}>
                        <h3 className="text-lg font-semibold text-foreground mb-2 hover:text-primary transition-colors line-clamp-2">
                          {product.name_ar}
                        </h3>
                      </Link>
                      <p className="text-muted-foreground text-sm mb-4 line-clamp-2">{product.description_ar}</p>
                    </div>
                    <div className="flex items-center gap-3 mt-auto w-full">
                      <span className="text-2xl font-bold text-primary">{formatPrice(product.price)} DHS</span>
                      <Button
                        className="ml-auto bg-primary hover:bg-primary/90 text-primary-foreground gap-2 px-6"
                        onClick={() => handleAddToCart(product)}
                        disabled={product.quantity === 0}
                      >
                        <ShoppingCart className="w-4 h-4" />
                        {product.quantity === 0 ? "غير متوفر" : "أضف للسلة"}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="space-y-4 max-w-5xl mx-auto">
              {products.map((product, index) => (
                <Card
                  key={product.id}
                  className="group hover:shadow-lg transition-all duration-300 animate-slide-in-left"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <CardContent className="p-0">
                    <div className="flex flex-col md:flex-row gap-6 p-6">
                      <div className="relative flex-shrink-0">
                        <div className="relative overflow-hidden rounded-lg w-full md:w-48 h-48">
                          <img
                            src={product.images?.[0] || "/placeholder.svg"}
                            alt={product.name_ar}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                          {/* Icons removed */}
                        </div>
                      </div>
                      <div className="flex-1 flex flex-col justify-between">
                        <div>
                          <Link href={`/products/${product.id}`}>
                            <h3 className="text-xl font-semibold text-foreground mb-3 hover:text-primary transition-colors">
                              {product.name_ar}
                            </h3>
                          </Link>
                          <p className="text-muted-foreground mb-4 leading-relaxed line-clamp-3">
                            {product.description_ar}
                          </p>
                          <div className="flex items-center gap-4 mb-4">
                            <Badge 
                              variant={product.quantity > product.low_stock_threshold ? "secondary" : "destructive"}
                              className="text-xs"
                            >
                              {product.quantity > product.low_stock_threshold 
                                ? "متوفر" 
                                : product.quantity > 0 
                                  ? "كمية محدودة" 
                                  : "غير متوفر"
                              }
                            </Badge>
                            <span className="text-sm text-muted-foreground">
                              الكمية المتاحة: {product.quantity}
                            </span>
                          </div>
                        </div>
                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                          <div className="flex items-center gap-3">
                            <span className="text-2xl font-bold text-primary">
                              {formatPrice(product.price)} DHS
                            </span>
                          </div>
                          <Button
                            className="bg-primary hover:bg-primary/90 text-primary-foreground gap-2 px-8"
                            onClick={() => handleAddToCart(product)}
                            disabled={product.quantity === 0}
                          >
                            <ShoppingCart className="w-4 h-4" />
                            {product.quantity === 0 ? "غير متوفر" : "أضف للسلة"}
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="flex items-center justify-center gap-2 mt-12">
        <Button variant="outline" disabled>
          السابق
        </Button>
        <Button variant="default">1</Button>
        <Button variant="outline">2</Button>
        <Button variant="outline">3</Button>
        <Button variant="outline">التالي</Button>
      </div>
    </div>
  )
}