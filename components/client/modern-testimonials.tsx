"use client"

import { motion } from "framer-motion"
import { Star, Quote, CheckCircle } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"

interface Opinion {
  customerName: string
  rating: number
  comment: string
  date: string
  location?: string
  verified?: boolean
  product?: string
  beforeAfter?: {
    before: string
    after: string
  }
  avatar?: string
}

const defaultOpinions: Opinion[] = [
  {
    customerName: "سارة م.",
    rating: 5,
    comment: "طعم رائع وفعال حقاً! كنت أتناول هذه المكملات لمدة شهرين وأشعر بتحسن كبير. مستوى الطاقة لدي تحسن بشكل ملحوظ.",
    date: "2024-01-15",
    location: "الدار البيضاء، المغرب",
    verified: true,
    product: "بروتين مصل اللبن المميز",
    avatar: "/arab-female-athlete.jpg"
  },
  {
    customerName: "أحمد ك.",
    rating: 5,
    comment: "أفضل بودرة بروتين استخدمتها على الإطلاق! نتائج رائعة في بناء العضلات ووقت الاستشفاء. أنصح بها جميع الرياضيين.",
    date: "2024-02-20",
    location: "الرباط، المغرب",
    verified: true,
    product: "ماس جينر برو",
    avatar: "/arab-male-bodybuilder.jpg"
  },
  {
    customerName: "فاطمة ر.",
    rating: 4,
    comment: "جودة ممتازة وشحن سريع. مكمل الكرياتين ساعدني في أداء تمارين أكثر كثافة.",
    date: "2024-03-10",
    location: "مراكش، المغرب",
    verified: true,
    product: "كرياتين نقي",
    avatar: "/arab-female-athlete.jpg"
  }
]

interface ModernTestimonialsProps {
  opinions?: Opinion[]
}

export default function ModernTestimonials({ opinions = defaultOpinions }: ModernTestimonialsProps) {
  // Keep only first 3 testimonials
  const displayOpinions = opinions.slice(0, 3)

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
    <section className="py-2 md:py-2 bg-gradient-to-b from-gray-50 to-white pt-0">
      <div className="container mx-auto px-3 md:px-4 pt-0">
        
        {/* Section Header */}
        <motion.div 
          className="text-center mb-10 md:mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="inline-flex items-center bg-gradient-to-r from-yellow-100 to-orange-100 text-orange-600 px-4 sm:px-6 py-2 sm:py-3 rounded-full text-xs sm:text-sm font-semibold mb-4 md:mb-6">
            <Star className="w-4 h-4 sm:w-5 sm:h-5 mr-2 fill-current" />
            آراء العملاء
          </div>
          
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 mb-4 md:mb-6">
            قصص حقيقية،
            <span className="block bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
              نتائج حقيقية
            </span>
          </h2>
          
          <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            لا تأخذ كلامنا فقط. إليك ما يقوله عملاؤنا عن رحلة تحولهم.
          </p>

          {/* Overall Stats */}
          <div className="flex justify-center items-center gap-4 sm:gap-8 mt-6 md:mt-8">
            <div className="text-center">
              <div className="flex items-center justify-center mb-1 sm:mb-2">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-yellow-400 fill-current" />
                ))}
              </div>
              <div className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900">4.9</div>
              <div className="text-xs sm:text-sm text-gray-600">متوسط التقييم</div>
            </div>
            <div className="w-px h-8 sm:h-10 md:h-12 bg-gray-300" />
            <div className="text-center">
              <div className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900">10,000+</div>
              <div className="text-xs sm:text-sm text-gray-600">مراجعات محققة</div>
            </div>
          </div>
        </motion.div>

        {/* Static Testimonials Grid */}
        <motion.div 
          className="mb-10 md:mb-16"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {displayOpinions.map((opinion, index) => (
              <motion.div 
                key={`${index}-${opinion.customerName}`}
                variants={cardVariants}
              >
                <Card className="bg-gradient-to-br from-blue-50 to-purple-50 border-0 shadow-lg hover:shadow-xl transition-shadow duration-300 h-full">
                  <CardContent className="p-4 sm:p-6">
                    <div className="flex flex-col h-full">
                      
                      {/* Avatar and verification */}
                      <div className="flex items-center gap-4 mb-4">
                        <div className="relative flex-shrink-0">
                          <Image
                            src={opinion.avatar || "/placeholder-user.jpg"}
                            alt={opinion.customerName}
                            width={60}
                            height={60}
                            className="w-12 h-12 sm:w-14 sm:h-14 md:w-15 md:h-15 rounded-full object-cover shadow-md"
                          />
                          {opinion.verified && (
                            <div className="absolute -top-1 -right-1 bg-green-500 text-white rounded-full p-1 shadow-lg">
                              <CheckCircle className="w-3 h-3" />
                            </div>
                          )}
                        </div>

                        <div className="flex-1">
                          <div className="font-bold text-lg text-gray-900 mb-1">
                            {opinion.customerName}
                          </div>
                          {opinion.location && (
                            <div className="text-sm text-gray-600">
                              {opinion.location}
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Rating */}
                      <div className="flex items-center gap-2 mb-4">
                        {[...Array(5)].map((_, i) => (
                          <Star 
                            key={i} 
                            className={`w-4 h-4 ${i < opinion.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                          />
                        ))}
                        <span className="ml-1 text-sm text-gray-600 font-medium">
                          {opinion.rating}.0
                        </span>
                      </div>

                      {/* Quote */}
                      <div className="flex-1 mb-4">
                        <Quote className="w-8 h-8 text-blue-300 mb-2" />
                        <p className="text-gray-700 leading-relaxed italic text-sm">
                          "{opinion.comment}"
                        </p>
                      </div>

                      {/* Product */}
                      {opinion.product && (
                        <div className="mt-auto">
                          <div className="inline-block bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-medium">
                            {opinion.product}
                          </div>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Trust Badges */}
        <motion.div 
          className="mt-10 md:mt-16 p-5 sm:p-6 md:p-8 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl sm:rounded-2xl md:rounded-3xl border border-blue-100"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="text-center mb-5 md:mb-8">
            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">
              موثوق من عملاء حول العالم
            </h3>
            <p className="text-sm sm:text-base text-gray-600">
              انضم إلى الآلاف من العملاء الراضين الذين حولوا رحلتهم الرياضية
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
            <div className="text-center">
              <div className="text-xl sm:text-2xl md:text-3xl font-bold text-blue-600 mb-1 sm:mb-2">98%</div>
              <div className="text-xs sm:text-sm text-gray-600">رضا العملاء</div>
            </div>
            <div className="text-center">
              <div className="text-xl sm:text-2xl md:text-3xl font-bold text-green-600 mb-1 sm:mb-2">24/7</div>
              <div className="text-xs sm:text-sm text-gray-600">دعم العملاء</div>
            </div>
            <div className="text-center">
              <div className="text-xl sm:text-2xl md:text-3xl font-bold text-purple-600 mb-1 sm:mb-2">50k+</div>
              <div className="text-xs sm:text-sm text-gray-600">تقييم 5 نجوم</div>
            </div>
            <div className="text-center">
              <div className="text-xl sm:text-2xl md:text-3xl font-bold text-orange-600 mb-1 sm:mb-2">1M+</div>
              <div className="text-xs sm:text-sm text-gray-600">عميل سعيد</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}