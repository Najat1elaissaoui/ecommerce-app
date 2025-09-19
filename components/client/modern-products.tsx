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
    name_ar: "بروتين مصل اللبن المميز",
    price: 2999,
    quantity: 50,
    description_ar: "بروتين عالي الجودة لبناء العضلات وزيادة القوة",
    
    images: ["/protein-powder-assortment.png"],
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
    
    images: ["/protein-powder-assortment.png"],
    low_stock_threshold: 5,
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 3,
    name_ar: "بروتين مصل اللبن المميز",
    price: 3999,
    quantity: 25,
    description_ar: "بروتين عالي الجودة لبناء العضلات وزيادة القوة",
    
    images: ["/protein-powder-assortment.png"],
    low_stock_threshold: 5,
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 4,
    name_ar: "بروتين مصل اللبن المميز",
    price: 4499,
    quantity: 40,
    description_ar: "بروتين عالي الجودة لبناء العضلات وزيادة القوة",
   
    images: ["/protein-powder-assortment.png"],
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
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4">
        
        {/* Section Header */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="inline-flex items-center bg-blue-100 text-blue-600 px-4 py-2 rounded-full text-sm font-medium mb-4">
            <Zap className="w-4 h-4 ml-2" />
            المنتجات المميزة
          </div>
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 mb-6">
            اشعل
            <span className="block bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              تحولك
            </span>
          </h2>
          
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            مكملات غذائية فاخرة مصممة من قبل الخبراء، موثوقة من قبل الأبطال
          </p>
        </motion.div>

        {/* Products Grid */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          {sampleProducts.map((product, index) => (
            <motion.div
              key={`${product.id}-${index}`}
              variants={cardVariants}
              onHoverStart={() => setHoveredCard(product.id)}
              onHoverEnd={() => setHoveredCard(null)}
              whileHover={{ 
                y: -12,
                rotateY: hoveredCard === product.id ? 2 : 0,
                transition: { duration: 0.3, ease: "easeOut" }
              }}
            >
              <Card className="group relative overflow-hidden bg-white rounded-3xl shadow-xl border-0 hover:shadow-2xl transition-all duration-500 transform-gpu">
                {/* Glowing border effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl" />
                
                {/* Glass morphism effect */}
                <div className="absolute inset-0.5 bg-white/90 backdrop-blur-sm rounded-3xl" />

                <CardContent className="relative p-0 z-10">
                  {/* Product Image */}
                  <div className="relative h-64 overflow-hidden bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200 rounded-t-3xl">
                    {/* Animated background pattern */}
                    <div className="absolute  opacity-50" />
                    
                    <Image
                      src={product.images?.[0] || "/protein-powder-assortment.png"}
                      alt={product.name_ar}
                      fill
                      className=" transition-all duration-700 group-hover:scale-110 group-hover:rotate-1"
                    />
                    
                    {/* Dynamic overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    
                    {/* Floating quick action */}
                    <motion.div 
                      className="absolute top-4 left-4 opacity-0 group-hover:opacity-100 transition-all duration-300"
                      initial={{ scale: 0.8, rotate: -10 }}
                      whileHover={{ scale: 1, rotate: 0 }}
                    >
                      <Button
                        size="sm"
                        className="bg-white/90 backdrop-blur-sm text-gray-900 hover:bg-white shadow-lg border-0 rounded-full px-3 py-2"
                      >
                        <Heart className="w-4 h-4" />
                      </Button>
                    </motion.div>
                    
                    {/* Quick view button with enhanced styling */}
                    <motion.div 
                      className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300"
                      initial={{ scale: 0.7, y: 20 }}
                      whileHover={{ scale: 1, y: 0 }}
                    >
                      <Link href={`/products/${product.id}`}>
                        <Button 
                          className="bg-white/95 backdrop-blur-md text-gray-900 hover:bg-white font-bold px-8 py-3 rounded-2xl shadow-2xl border border-white/20 transform hover:scale-105 transition-all duration-300"
                          size="sm"
                        >
                          <span className="flex items-center">
                            عرض سريع
                            <ArrowRight className="w-4 h-4 mr-2 group-hover:translate-x-1 transition-transform" />
                          </span>
                        </Button>
                      </Link>
                    </motion.div>
                  </div>

                  {/* Enhanced Product Info */}
                  <div className="p-8">
                    {/* Product Name with enhanced typography */}
                    <h3 className="text-2xl font-black text-gray-900 mb-3 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-purple-600 group-hover:bg-clip-text transition-all duration-300 leading-tight">
                      {product.name_ar}
                    </h3>

                    {/* Enhanced Price Display */}
                    <div className="flex items-center justify-between mb-8">
                      <span className="text-3xl font-black text-gray-900">{product.price.toLocaleString("fr-MA")} DH</span>
                      
                      {/* Price badge */}
                      <div className="bg-gradient-to-r from-green-100 to-emerald-100 text-green-700 px-3 py-1 rounded-full text-sm font-bold">
                        أفضل سعر
                      </div>
                    </div>

                    {/* Enhanced Actions */}
                    <div className="flex flex-col sm:flex-row gap-2 sm:gap-2">
                      <Button 
                        onClick={() => handleAddToCart(product)}
                        disabled={product.quantity === 0}
                        className="flex-1 w-full bg-black hover:bg-gray-800 text-white font-bold py-3 sm:py-4 rounded-2xl group relative overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300"
                      >
                        <span className="relative z-10 flex items-center justify-center text-xs sm:text-sm">
                          <ShoppingCart className="w-3 h-3 sm:w-4 sm:h-4 ml-1 sm:ml-2" />
                          <span className="hidden xs:inline">{product.quantity === 0 ? "غير متوفر" : "أضف للسلة"}</span>
                          <span className="xs:hidden">{product.quantity === 0 ? "غير متوفر" : "إضافة"}</span>
                        </span>
                      </Button>
                      
                      <Link href={`/products/${product.id}`} className="flex-1">
                         <Button 
                          className="w-full bg-white hover:bg-gray-50 text-black border-2 border-gray-200 hover:border-gray-300 font-bold py-3 sm:py-4 rounded-2xl group relative overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300"
                        >
                         <span className="relative z-10 flex items-center justify-center text-xs sm:text-sm">
                             <span className="hidden xs:inline">عرض التفاصيل</span>
                             <span className="xs:hidden">تفاصيل</span>
                            <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2 group-hover:translate-x-1 transition-transform" />
                          </span>
                        </Button>
                      </Link>
                    </div>
                  </div>
                </CardContent>

                {/* Enhanced Hover Effect with animated gradient */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-3xl"
                  animate={{
                    background: hoveredCard === product.id 
                      ? ["linear-gradient(45deg, rgba(59,130,246,0.1), rgba(147,51,234,0.1), rgba(236,72,153,0.1))",
                         "linear-gradient(90deg, rgba(147,51,234,0.1), rgba(236,72,153,0.1), rgba(59,130,246,0.1))",
                         "linear-gradient(135deg, rgba(236,72,153,0.1), rgba(59,130,246,0.1), rgba(147,51,234,0.1))"]
                      : "linear-gradient(45deg, rgba(0,0,0,0), rgba(0,0,0,0), rgba(0,0,0,0))"
                  }}
                  transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
                />
                
                {/* Shine effect */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 group-hover:animate-pulse" />
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* View All Products Button */}
        <motion.div 
          className="text-center mt-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          viewport={{ once: true }}
        >
          <Link href="/products">
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-gray-900 to-gray-700 hover:from-gray-800 hover:to-gray-600 text-white px-12 py-4 text-lg font-semibold rounded-xl group relative overflow-hidden"
            >
              <span className="relative z-10 flex items-center">
                عرض جميع المنتجات
                <ArrowRight className="mr-3 w-5 h-5 group-hover:translate-x-2 transition-transform duration-300" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </Button>
          </Link>
        </motion.div>

        {/* Trust Badges */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          viewport={{ once: true }}
        >
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-green-600 rounded-2xl mx-auto mb-4 flex items-center justify-center">
              <Award className="w-8 h-8 text-white" />
            </div>
            <h4 className="text-lg font-bold text-gray-900 mb-2">جودة فاخرة</h4>
            <p className="text-gray-600">مختبرة معملياً ومعتمدة للنقاء</p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-blue-600 rounded-2xl mx-auto mb-4 flex items-center justify-center">
              <Zap className="w-8 h-8 text-white" />
            </div>
            <h4 className="text-lg font-bold text-gray-900 mb-2">نتائج سريعة</h4>
            <p className="text-gray-600">شاهد التحسن خلال أسابيع</p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-purple-600 rounded-2xl mx-auto mb-4 flex items-center justify-center">
              <Star className="w-8 h-8 text-white" />
            </div>
            <h4 className="text-lg font-bold text-gray-900 mb-2">الأعلى تقييماً</h4>
            <p className="text-gray-600">موثوق من قبل الملايين حول العالم</p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}