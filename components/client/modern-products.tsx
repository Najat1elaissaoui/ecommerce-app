"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { Star, ShoppingCart, Heart, ArrowRight, Zap, Award } from "lucide-react"
import { useState } from "react"
import { useCart } from "@/lib/cart-context"
import { useToast } from "@/hooks/use-toast"
import type { Product } from "@/lib/types"

const sampleProducts: Product[] = [
  {
    id: 1,
    name_ar: "علكة خل التفاح",
    price: 2999,
    quantity: 50,
    description_ar: "علكة خل التفاح الأولى عالميًا. غنية بالفيتامينات والعناصر الغذائية لدعم الصحة العامة.",
    images: ["/goli1.png"],
    low_stock_threshold: 5,
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 2,
    name_ar: "بروتين مصل اللبن المميز",
    price: 3499,
    quantity: 30,
    description_ar: "بروتين عالي الجودة لبناء العضلات وزيادة القوة",
    
    images: ["/goli2.png"],
    low_stock_threshold: 5,
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 3,
    name_ar: "بروتيبن EXTRA-STRENGTH SLEEP",
    price: 3499,
    quantity: 30,
    description_ar: "بروتين عالي الجودة لبناء العضلات وزيادة القوة",
    
    images: ["/goli3.png"],
    low_stock_threshold: 5,
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
 
]

export default function ModernProductsSection() {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null)
  const { addItem } = useCart()
  const { toast } = useToast()

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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  }

  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: 50,
      scale: 0.9 
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: {
        type: "spring" as const,
        stiffness: 100,
        damping: 15
      }
    }
  }

  return (
  <section className="py-4 md:py-8 bg-gradient-to-b from-gray-50 to-white overflow-hidden pt-0">
      <div className="container mx-auto px-4">
        
        {/* Section Header */}
  <div className="text-center mb-4 md:mb-6 opacity-0 animate-[fadeInUp_0.8s_0.2s_forwards]">
          <div className="inline-flex items-center bg-blue-100 text-blue-600 px-4 py-2 rounded-full text-sm font-medium mb-4">
            <Zap className="w-4 h-4 ml-2" />
            المنتجات المميزة
          </div>
          
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-black text-gray-900 mb-4 md:mb-6">
            اشعل
            <span className="block bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              تحولك
            </span>
          </h2>
          
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
            مكملات غذائية فاخرة مصممة من قبل الخبراء، موثوقة من قبل الأبطال
          </p>
        </div>

        {/* Products Grid - Improved responsive layout */}
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 md:gap-4">
          {sampleProducts.map((product, index) => (
            <div
              key={`${product.id}-${index}`}
              className="opacity-0 animate-[fadeInUp_0.8s_forwards]"
              style={{ animationDelay: `${0.3 + index * 0.1}s` }}
            >
              <Card className="group relative overflow-hidden bg-white rounded-3xl shadow-xl border-0 hover:shadow-2xl transition-all duration-500 transform-gpu hover:-translate-y-2 active:translate-y-0">
                {/* Glowing border effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl" />
                
                {/* Glass morphism effect */}
                <div className="absolute inset-0.5 bg-white/90 backdrop-blur-sm rounded-3xl" />

                <CardContent className="relative p-0 z-10">
                  {/* Product Image */}
                  <div className="relative aspect-[1/1] w-full h-40 md:h-52 flex items-center justify-center bg-white rounded-t-3xl overflow-hidden">
                    <Image
                      src={product.images?.[0] || "/protein-powder-assortment.png"}
                      alt={product.name_ar}
                      fill
                      className="object-contain w-full h-full"
                      sizes="(max-width: 768px) 100vw, 100vw"
                    />
                  </div>
                  {/* Product Info: only name and price */}
                  <div className="p-3 md:p-4 flex flex-col items-center justify-center text-center">
                    <h3 className="text-base md:text-lg font-bold text-gray-900 mb-1 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-purple-600 group-hover:bg-clip-text transition-all duration-300 leading-tight">
                      {product.name_ar}
                    </h3>
                    <span className="text-base font-black text-gray-900 mb-2">{product.price.toLocaleString("fr-MA")} DH</span>
                    <Link href={`/products/${product.id}`} className="w-full">
                      <Button 
                        className="w-full bg-black text-white font-bold py-2 rounded-xl group relative overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer"
                      >
                        <span className="relative z-10 flex items-center justify-center text-xs sm:text-sm">
                          <span>عرض التفاصيل</span>
                          <ArrowRight className="w-4 h-4 mr-2 group-hover:translate-x-1 transition-transform" />
                        </span>
                      </Button>
                    </Link>
                  </div>
                </CardContent>

                {/* Mobile touch effect */}
                <div className="absolute inset-0 bg-black/5 opacity-0 active:opacity-100 md:active:opacity-0 transition-opacity duration-200 rounded-3xl pointer-events-none" />
              </Card>
            </div>
          ))}
        </div>

        {/* View All Products Button */}
  <div className="text-center mt-4 md:mt-8 opacity-0 animate-[fadeInUp_0.8s_0.7s_forwards]">
          <Link href="/products">
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-gray-900 to-gray-700 hover:from-gray-800 hover:to-gray-600 text-white px-8 md:px-12 py-3 md:py-4 text-base md:text-lg font-semibold rounded-xl group relative overflow-hidden cursor-pointer"
            >
              <span className="relative z-10 flex items-center">
                عرض جميع المنتجات
                <ArrowRight className="mr-3 w-5 h-5 group-hover:translate-x-2 transition-transform duration-300" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </Button>
          </Link>
        </div>

        {/* Trust Badges - Improved for mobile */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-12 md:mt-20">
          {[
            {
              icon: <Award className="w-6 h-6 md:w-8 md:h-8 text-white" />,
              title: "جودة فاخرة",
              desc: "مختبرة معملياً ومعتمدة للنقاء",
              color: "from-green-400 to-green-600",
              delay: "0.8s"
            },
            {
              icon: <Zap className="w-6 h-6 md:w-8 md:h-8 text-white" />,
              title: "نتائج سريعة",
              desc: "شاهد التحسن خلال أسابيع",
              color: "from-blue-400 to-blue-600",
              delay: "0.9s"
            },
            {
              icon: <Star className="w-6 h-6 md:w-8 md:h-8 text-white" />,
              title: "الأعلى تقييماً",
              desc: "موثوق من قبل الملايين",
              color: "from-purple-400 to-purple-600",
              delay: "1.0s"
            }
          ].map((badge, index) => (
            <div 
              key={index} 
              className="flex flex-row md:flex-col items-center md:items-center text-right md:text-center bg-white/50 backdrop-blur-sm p-4 md:p-6 rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 opacity-0 animate-[fadeIn_0.8s_forwards]"
              style={{ animationDelay: badge.delay }}
            >
              <div className={`w-12 h-12 md:w-16 md:h-16 bg-gradient-to-br ${badge.color} rounded-2xl md:mx-auto mb-0 md:mb-4 ml-4 md:ml-0 flex items-center justify-center`}>
                {badge.icon}
              </div>
              <div>
                <h4 className="text-base md:text-lg font-bold text-gray-900 mb-1 md:mb-2">{badge.title}</h4>
                <p className="text-sm md:text-base text-gray-600">{badge.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}