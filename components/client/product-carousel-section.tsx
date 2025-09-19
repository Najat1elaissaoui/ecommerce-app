"use client"

import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState, useEffect } from "react"
import Image from "next/image"

interface ProductCard {
  id: number
  title: string
  subtitle: string
  description: string
  features: string[]
  buttonText: string
  image: string
  backgroundColor: string
  textColor: string
}

const productCards: ProductCard[] = [
  {
    id: 1,
    title: "حلوى النوم الهانئ",
    subtitle: "Say Hello to Goli®",
    description: "مصنوعة من المغنيسيوم وبلسم الليمون وفيتامين د، بالإضافة إلى الجرعة المثالية من الميلاتونين لمساعدتك:",
    features: [
      "نم بشكل أفضل وأطول",
      "ادعم دورة نوم صحية", 
      "استيقظ منتعشاً ومرتاحاً",
      "ابق نائماً لفترة أطول"
    ],
    buttonText: "استكشف",
    image: "/protein-powder-assortment.png",
    backgroundColor: "bg-gradient-to-br from-purple-600 to-purple-800",
    textColor: "text-white"
  },
  {
    id: 2,
    title: "حلوى متعددة الفيتامينات للنساء",
    subtitle: "Say Hello to Goli®",
    description: "كاملة مع جميع الفيتامينات الأساسية الـ 13 للمساعدة في دعم:",
    features: [
      "شعر وبشرة وأظافر صحية",
      "أسنان وعظام قوية",
      "نظام مناعي صحي"
    ],
    buttonText: "استكشف",
    image: "/creatine-supplement.jpg",
    backgroundColor: "bg-gradient-to-br from-pink-500 to-pink-700",
    textColor: "text-white"
  },
  {
    id: 3,
    title: "مكمل البروتين المميز",
    subtitle: "Say Hello to Goli®",
    description: "بروتين عالي الجودة مع جميع الأحماض الأمينية الأساسية للمساعدة في:",
    features: [
      "بناء العضلات وتقويتها",
      "تحسين الاستشفاء بعد التمرين",
      "زيادة الطاقة والقوة",
      "دعم الأداء الرياضي"
    ],
    buttonText: "استكشف",
    image: "/arab-male-bodybuilder.jpg",
    backgroundColor: "bg-gradient-to-br from-blue-500 to-blue-700",
    textColor: "text-white"
  }
]

export default function ProductCarouselSection() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying) return
    
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % productCards.length)
    }, 4000)

    return () => clearInterval(interval)
  }, [isAutoPlaying])

  const goToSlide = (index: number) => {
    setCurrentIndex(index)
    setIsAutoPlaying(false)
    setTimeout(() => setIsAutoPlaying(true), 8000)
  }

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % productCards.length)
    setIsAutoPlaying(false)
    setTimeout(() => setIsAutoPlaying(true), 8000)
  }

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + productCards.length) % productCards.length)
    setIsAutoPlaying(false)
    setTimeout(() => setIsAutoPlaying(true), 8000)
  }

  return (
    <section className="py-16 bg-gray-50 overflow-hidden" dir="rtl">
      <div className="container mx-auto px-4">
        
        {/* Main Carousel */}
        <div className="relative max-w-7xl mx-auto">
          
          {/* Current Card Display */}
          <div className="relative h-[600px] md:h-[500px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="absolute inset-0 w-full"
              >
                <div
                  className={`${productCards[currentIndex].backgroundColor} ${productCards[currentIndex].textColor} rounded-3xl shadow-2xl overflow-hidden h-full relative`}
                >
                  <div className="grid md:grid-cols-2 h-full">
                    
                    {/* Text Content */}
                    <div className="p-8 md:p-12 flex flex-col justify-center relative z-10">
                      
                      {/* Subtitle */}
                      <motion.p 
                        className="text-sm opacity-90 mb-2 font-medium"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 0.9, y: 0 }}
                        transition={{ delay: 0.2 }}
                      >
                        {productCards[currentIndex].subtitle}
                      </motion.p>

                      {/* Main Title */}
                      <motion.h3 
                        className="text-3xl md:text-4xl lg:text-5xl font-black mb-6 leading-tight"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                      >
                        {productCards[currentIndex].title}
                      </motion.h3>

                      {/* Description */}
                      <motion.p 
                        className="text-base md:text-lg opacity-90 mb-6 leading-relaxed"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 0.9, y: 0 }}
                        transition={{ delay: 0.4 }}
                      >
                        {productCards[currentIndex].description}
                      </motion.p>

                      {/* Features List */}
                      <motion.ul 
                        className="space-y-3 mb-8"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                      >
                        {productCards[currentIndex].features.map((feature, idx) => (
                          <motion.li 
                            key={idx}
                            className="flex items-center text-sm md:text-base opacity-90"
                            initial={{ opacity: 0, x: 30 }}
                            animate={{ opacity: 0.9, x: 0 }}
                            transition={{ delay: 0.5 + idx * 0.1 }}
                          >
                            <div className="w-2 h-2 bg-white rounded-full ml-3 flex-shrink-0" />
                            {feature}
                          </motion.li>
                        ))}
                      </motion.ul>

                      {/* CTA Button */}
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.7 }}
                      >
                        <Button 
                          className="bg-black text-white hover:bg-gray-800 px-8 py-4 text-lg font-bold rounded-full group transition-all duration-300"
                          size="lg"
                        >
                          {productCards[currentIndex].buttonText}
                          <ChevronLeft className="mr-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </Button>
                      </motion.div>
                    </div>

                    {/* Image Section */}
                    <div className="relative flex items-center justify-center p-8">
                      <motion.div
                        className="relative z-10"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.4, type: "spring", stiffness: 100 }}
                      >
                        <motion.div
                          animate={{ 
                            y: [0, -10, 0],
                            rotate: [0, 2, -2, 0]
                          }}
                          transition={{ 
                            duration: 6, 
                            repeat: Infinity, 
                            ease: "easeInOut"
                          }}
                        >
                          <Image
                            src={productCards[currentIndex].image}
                            alt={productCards[currentIndex].title}
                            width={400}
                            height={400}
                            className="max-w-xs md:max-w-sm w-full h-auto object-contain drop-shadow-2xl"
                          />
                        </motion.div>
                      </motion.div>

                      {/* Decorative Elements */}
                      <div className="absolute inset-0">
                        <motion.div
                          className="absolute top-1/4 left-1/4 w-24 h-24 bg-white/10 rounded-full blur-xl"
                          animate={{ 
                            scale: [1, 1.2, 1],
                            opacity: [0.3, 0.6, 0.3]
                          }}
                          transition={{ duration: 4, repeat: Infinity }}
                        />
                        <motion.div
                          className="absolute bottom-1/4 right-1/4 w-32 h-32 bg-white/10 rounded-full blur-xl"
                          animate={{ 
                            scale: [1, 1.3, 1],
                            opacity: [0.2, 0.5, 0.2]
                          }}
                          transition={{ duration: 5, repeat: Infinity, delay: 1 }}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Background Pattern */}
                  <div className="absolute inset-0 opacity-10">
                    <div className="absolute -top-12 -right-12 w-48 h-48 border border-white rounded-full" />
                    <div className="absolute -bottom-12 -left-12 w-64 h-64 border border-white rounded-full" />
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={prevSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-white/20 backdrop-blur-md hover:bg-white/30 rounded-full flex items-center justify-center text-white transition-all duration-300 group"
          >
            <ChevronRight className="w-6 h-6 group-hover:scale-110 transition-transform" />
          </button>
          
          <button
            onClick={nextSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-white/20 backdrop-blur-md hover:bg-white/30 rounded-full flex items-center justify-center text-white transition-all duration-300 group"
          >
            <ChevronLeft className="w-6 h-6 group-hover:scale-110 transition-transform" />
          </button>

          {/* Dots Indicators */}
          <div className="flex justify-center mt-8 space-x-2 space-x-reverse">
            {productCards.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? 'bg-gray-800 scale-125' 
                    : 'bg-gray-400 hover:bg-gray-600'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}