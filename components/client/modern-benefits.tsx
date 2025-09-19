"use client"

import { motion } from "framer-motion"
import { 
  Award, 
  Shield, 
  Zap, 
  Users, 
  Truck, 
  Star, 
  CheckCircle,
  Target,
  Clock,
  Globe
} from "lucide-react"
import Image from "next/image"

const features = [
  {
    icon: Award,
    title: "جودة فاخرة",
    description: "مكملات مختبرة معملياً بأعلى معايير النقاء",
    color: "from-yellow-400 to-orange-500",
    stats: "99.9% نقي"
  },
  {
    icon: Shield,
    title: "معتمد من FDA",
    description: "جميع المنتجات معتمدة ومرخصة من السلطات الصحية",
    color: "from-green-400 to-teal-500",
    stats: "100% آمن"
  },
  {
    icon: Zap,
    title: "نتائج سريعة",
    description: "شاهد تحسينات ملحوظة في الأداء خلال أسابيع",
    color: "from-blue-400 to-purple-500",
    stats: "2-3 أسابيع"
  },
  {
    icon: Users,
    title: "موثوق من الملايين",
    description: "أكثر من 2 مليون عميل راضٍ حول العالم",
    color: "from-pink-400 to-red-500",
    stats: "2 مليون+ مستخدم"
  },
  {
    icon: Truck,
    title: "شحن مجاني سريع",
    description: "توصيل مجاني للطلبات فوق 50$ خلال 2-3 أيام عمل",
    color: "from-indigo-400 to-blue-500",
    stats: "24-48 ساعة"
  },
  {
    icon: Star,
    title: "الأعلى تقييماً",
    description: "تقييم ثابت 4.9/5 نجوم من عملائنا",
    color: "from-purple-400 to-pink-500",
    stats: "4.9★ تقييم"
  }
]

const testimonialStats = [
  { label: "عملاء سعداء", value: "2 مليون+", icon: Users },
  { label: "منتجات مُباعة", value: "10 مليون+", icon: Target },
  { label: "دول مخدومة", value: "50+", icon: Globe },
  { label: "متوسط التقييم", value: "4.9★", icon: Star }
]

export default function ModernBenefitsSection() {
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

  const itemVariants = {
    hidden: { 
      opacity: 0, 
      y: 30,
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
    <div>
      {/* Main Benefits Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          
          {/* Section Header */}
          <motion.div 
            className="text-center mb-20"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="inline-flex items-center bg-gradient-to-r from-blue-100 to-purple-100 text-blue-600 px-6 py-3 rounded-full text-sm font-semibold mb-6">
              <CheckCircle className="w-5 h-5 ml-2" />
              لماذا تختارنا
            </div>
            
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 mb-6">
              علم تحقيق
              <span className="block bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                الأداء المثالي
              </span>
            </h2>
            
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              كل مكمل غذائي مصنوع بدقة، مدعوم بالعلم، وموثوق من قبل الرياضيين حول العالم. 
              اختبر الفرق الذي تصنعه الجودة.
            </p>
          </motion.div>

          {/* Features Grid */}
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ 
                  y: -5,
                  transition: { type: "spring", stiffness: 300, damping: 20 }
                }}
                className="group"
              >
                <div className="relative bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl border border-gray-100 transition-all duration-500 overflow-hidden">
                  
                  {/* Background Gradient */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />
                  
                  {/* Icon */}
                  <div className="relative mb-6">
                    <div className={`w-16 h-16 bg-gradient-to-br ${feature.color} rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300`}>
                      <feature.icon className="w-8 h-8 text-white" />
                    </div>
                    
                    {/* Stats Badge */}
                    <div className="absolute -top-2 -right-2">
                      <div className={`bg-gradient-to-r ${feature.color} text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg`}>
                        {feature.stats}
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="relative z-10">
                    <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {feature.description}
                    </p>
                  </div>

                  {/* Hover Effect */}
                  <motion.div
                    className={`absolute -right-8 -bottom-8 w-24 h-24 bg-gradient-to-br ${feature.color} rounded-full opacity-0 group-hover:opacity-10 transition-all duration-500`}
                    whileHover={{ scale: 1.2, rotate: 180 }}
                  />
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gradient-to-br from-gray-900 via-blue-900 to-indigo-900">
        <div className="container mx-auto px-4">
          
          {/* Stats Grid */}
          <motion.div 
            className="grid grid-cols-2 md:grid-cols-4 gap-8"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            {testimonialStats.map((stat, index) => (
              <motion.div
                key={index}
                className="text-center"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
              >
                <div className="mb-4 flex justify-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-purple-500 rounded-2xl flex items-center justify-center shadow-lg">
                    <stat.icon className="w-8 h-8 text-white" />
                  </div>
                </div>
                <div className="text-3xl md:text-4xl font-black text-white mb-2">
                  {stat.value}
                </div>
                <div className="text-blue-200 font-medium">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Call to Action */}
          <motion.div 
            className="text-center mt-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
              مستعد لتحويل أدائك؟
            </h3>
            <p className="text-blue-200 text-lg mb-8 max-w-2xl mx-auto">
              انضم إلى ملايين الرياضيين الذين يثقون بمكملاتنا المميزة في رحلتهم نحو اللياقة
            </p>
            <motion.button
              className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-bold px-8 py-4 rounded-2xl text-lg shadow-xl transition-all duration-300 group"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              ابدأ رحلتك
              <motion.span
                className="inline-block mr-2"
                animate={{ x: [0, -5, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                ←
              </motion.span>
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4">
          
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-6">
              وعد الجودة
              <span className="block bg-gradient-to-r from-green-600 to-teal-600 bg-clip-text text-transparent">
                لدينا
              </span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            
            {/* Process Steps */}
            <motion.div 
              className="space-y-8"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              {[
                {
                  step: "01",
                  title: "مصادر مميزة",
                  description: "نحصل فقط على أفضل المكونات من موردين معتمدين حول العالم"
                },
                {
                  step: "02", 
                  title: "الاختبار المعملي",
                  description: "كل دفعة تخضع لاختبارات صارمة من جهة ثالثة للنقاء والفعالية"
                },
                {
                  step: "03",
                  title: "التصنيع عالي الجودة", 
                  description: "يُصنع في مرافق معتمدة من FDA وفقاً لمعايير GMP"
                },
                {
                  step: "04",
                  title: "رضا العملاء",
                  description: "ضمان رضا 100% مع شحن سريع وموثوق"
                }
              ].map((process, index) => (
                <motion.div 
                  key={index}
                  className="flex items-start space-x-4"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center text-white font-black text-lg shadow-lg flex-shrink-0">
                    {process.step}
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-gray-900 mb-2">
                      {process.title}
                    </h4>
                    <p className="text-gray-600 leading-relaxed">
                      {process.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* Image */}
            <motion.div 
              className="relative"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                <Image
                  src="/modern-supplement-store-interior-with-products.jpg"
                  alt="Quality manufacturing process"
                  width={600}
                  height={500}
                  className="w-full h-[500px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-blue-900/20 via-transparent to-transparent" />
              </div>
              
              {/* Floating Badge */}
              <motion.div
                className="absolute -top-6 -right-6 bg-white rounded-2xl p-6 shadow-xl border border-gray-100"
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
                <div className="text-center">
                  <div className="text-2xl font-black text-green-600">100%</div>
                  <div className="text-sm text-gray-600 font-semibold">جودة</div>
                  <div className="text-sm text-gray-600">مضمونة</div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  )
}