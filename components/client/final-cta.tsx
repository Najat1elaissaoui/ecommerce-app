"use client"

import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { ArrowRight, Star, Zap, Award } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function FinalCTA() {
  return (
    <section className="py-20 bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 relative overflow-hidden">
      
      {/* Background Elements */}
      <div className="absolute inset-0">
        {/* Animated particles */}
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-white/20 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -100, 0],
              opacity: [0, 1, 0],
              scale: [0.5, 1, 0.5],
            }}
            transition={{
              duration: Math.random() * 8 + 5,
              repeat: Infinity,
              delay: Math.random() * 5,
              ease: "easeInOut"
            }}
          />
        ))}
        
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-radial from-blue-500/10 via-transparent to-transparent" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Content */}
          <motion.div
            className="text-center lg:text-left"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            {/* Badge */}
            <motion.div
              className="inline-flex items-center bg-gradient-to-r from-yellow-400/20 to-orange-400/20 border border-yellow-400/30 text-yellow-300 px-4 py-2 rounded-full text-sm font-semibold mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              viewport={{ once: true }}
            >
              <Award className="w-4 h-4 ml-2" />
              عرض لوقت محدود
            </motion.div>

            {/* Main Title */}
            <motion.h2 
              className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6 leading-tight"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              viewport={{ once: true }}
            >
              ابدأ رحلة
              <span className="block bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                تحولك
              </span>
              اليوم
            </motion.h2>

            {/* Description */}
            <motion.p 
              className="text-xl text-blue-100 mb-8 max-w-lg mx-auto lg:mx-0 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              viewport={{ once: true }}
            >
              انضم لأكثر من 2 مليون رياضي يثقون بمكملاتنا المميزة في رحلتهم نحو اللياقة. 
              احصل على خصم 25% على طلبك الأول مع شحن مجاني.
            </motion.p>

            {/* Features */}
            <motion.div 
              className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              viewport={{ once: true }}
            >
              {[
                { icon: Star, text: "جودة مميزة مضمونة" },
                { icon: Zap, text: "نتائج سريعة في 2-3 أسابيع" },
                { icon: Award, text: "مختبر معملياً ومعتمد من FDA" },
                { icon: ArrowRight, text: "شحن مجاني للطلبات فوق 50$" }
              ].map((feature, index) => (
                <div key={index} className="flex items-center space-x-3 text-blue-100 space-x-reverse">
                  <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg flex items-center justify-center flex-shrink-0">
                    <feature.icon className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-sm font-medium">{feature.text}</span>
                </div>
              ))}
            </motion.div>

            {/* CTA Buttons */}
            <motion.div 
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
              viewport={{ once: true }}
            >
              <Link href="/products">
                <Button 
                  size="lg"
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 text-lg font-bold group relative overflow-hidden shadow-xl"
                >
                  <span className="relative z-10 flex items-center">
                    احصل على خصم 25%
                    <ArrowRight className="mr-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </Button>
              </Link>
              
              <Button 
                variant="outline" 
                size="lg"
                className="border-blue-400 text-blue-300 hover:bg-blue-400/20 px-8 py-4 text-lg font-semibold backdrop-blur-sm"
              >
                اعرف المزيد
              </Button>
            </motion.div>

            {/* Trust Indicators */}
            <motion.div 
              className="flex flex-wrap justify-center lg:justify-start gap-6 mt-8 text-blue-200"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
              viewport={{ once: true }}
            >
              <div className="text-center">
                <div className="text-2xl font-bold text-white">4.9★</div>
                <div className="text-xs">تقييم العملاء</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-white">2 مليون+</div>
                <div className="text-xs">عميل سعيد</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-white">50+</div>
                <div className="text-xs">دولة</div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Content - Product Showcase */}
          <motion.div 
            className="relative"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <div className="relative">
              {/* Main Product */}
              <motion.div
                className="relative z-20"
                animate={{ 
                  y: [0, -20, 0],
                  rotate: [0, 3, -3, 0]
                }}
                transition={{ 
                  duration: 8, 
                  repeat: Infinity, 
                  ease: "easeInOut" 
                }}
              >
                <Image
                  src="/footer.png"
                  alt="Premium Supplements"
                  width={450}
                  height={550}
                  className="w-full max-w-md mx-auto drop-shadow-2xl"
                />
              </motion.div>

              {/* Glowing Effects */}
              <div className="absolute inset-0 z-10">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-gradient-to-r from-blue-500/30 to-purple-500/30 rounded-full blur-3xl animate-pulse" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-gradient-to-r from-pink-500/40 to-blue-500/40 rounded-full blur-2xl animate-pulse delay-1000" />
              </div>

              {/* Floating Discount Badge */}
              <motion.div
                className="absolute -top-4 -right-4 bg-gradient-to-r from-red-500 to-pink-500 text-white p-4 rounded-2xl shadow-2xl z-30"
                animate={{
                  y: [0, -10, 0],
                  rotate: [0, 5, -5, 0],
                  scale: [1, 1.05, 1]
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <div className="text-center">
                  <div className="text-2xl font-black">25%</div>
                  <div className="text-sm font-bold">خصم</div>
                  <div className="text-xs">الطلب الأول</div>
                </div>
              </motion.div>

              {/* Free Shipping Badge */}
              <motion.div
                className="absolute -bottom-8 -left-8 bg-gradient-to-r from-green-500 to-teal-500 text-white p-4 rounded-2xl shadow-xl z-30"
                animate={{
                  y: [0, -15, 0],
                  rotate: [0, -5, 5, 0],
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  delay: 1,
                  ease: "easeInOut"
                }}
              >
                <div className="text-center">
                  <div className="text-lg font-bold">مجاني</div>
                  <div className="text-sm">الشحن</div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}