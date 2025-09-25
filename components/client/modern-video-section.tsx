"use client"

import { motion } from "framer-motion"
import { Play, Star, Users, Award } from "lucide-react"
import { useState } from "react"

export default function ModernVideoSection() {
  const [isPlaying, setIsPlaying] = useState(false)
  
  // Extract video ID from YouTube URL
  const videoId = "HZhgKAdFkrw"
  
  const handlePlayClick = () => {
    setIsPlaying(true)
  }

  return (
    <section className="py-12 md:py-20 bg-gradient-to-b from-white to-gray-50" dir="rtl">
      <div className="container mx-auto px-3 md:px-4">
        
        {/* Section Header */}
        <motion.div 
          className="text-center mb-8 sm:mb-12 md:mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="inline-flex items-center bg-gradient-to-r from-red-100 to-pink-100 text-red-600 px-4 sm:px-6 py-2 sm:py-3 rounded-full text-xs sm:text-sm font-semibold mb-4 md:mb-6">
            <Play className="w-4 h-4 sm:w-5 sm:h-5 ml-2" />
            فيديو مميز
          </div>
          
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 mb-4 md:mb-6">
            شاهد منتجاتنا
            <span className="block bg-gradient-to-r from-red-500 to-pink-500 bg-clip-text text-transparent">
              أثناء الاستخدام
            </span>
          </h2>
          
          <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            اكتشف كيف تُحسّن مكملاتنا المميزة أداء الرياضيين. مشاهدة واحدة تغني عن ألف كلمة.
          </p>
        </motion.div>

        {/* Video Container */}
        <motion.div 
          className="max-w-5xl mx-auto px-3 sm:px-4"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <div className="relative group">
            
            {/* Video Player */}
            <div className="relative aspect-video rounded-xl sm:rounded-2xl md:rounded-3xl overflow-hidden shadow-lg sm:shadow-xl md:shadow-2xl bg-gray-900">
              {!isPlaying ? (
                // Video Thumbnail with Play Button
                <div className="relative w-full h-full">
                  {/* YouTube Thumbnail */}
                  <img
                    src={`https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`}
                    alt="Video thumbnail"
                    className="w-full h-full object-cover"
                  />
                  
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-colors duration-300" />
                  
                  {/* Play Button */}
                  <motion.button
                    className="absolute inset-0 flex items-center justify-center"
                    onClick={handlePlayClick}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <div className="relative">
                      {/* Pulsing rings */}
                      <motion.div
                        className="absolute inset-0 bg-red-500/30 rounded-full"
                        animate={{ scale: [1, 1.2, 1], opacity: [1, 0, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      />
                      <motion.div
                        className="absolute inset-0 bg-red-500/20 rounded-full"
                        animate={{ scale: [1, 1.4, 1], opacity: [1, 0, 1] }}
                        transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                      />
                      
                      {/* Play button */}
                      <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-32 lg:h-32 bg-gradient-to-r from-red-500 to-pink-500 rounded-full flex items-center justify-center shadow-lg sm:shadow-xl md:shadow-2xl group-hover:shadow-red-500/25 transition-all duration-300">
                        <Play className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 text-white ml-1" fill="white" />
                      </div>
                    </div>
                  </motion.button>

                  {/* Video Info Overlay */}
                 
                </div>
              ) : (
                // YouTube Embed
                <iframe
                  src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`}
                  title="Product Video"
                  className="w-full h-full"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              )}
            </div>

            {/* Decorative elements */}
            <motion.div
              className="absolute -top-2 sm:-top-3 md:-top-4 -right-2 sm:-right-3 md:-right-4 w-16 sm:w-20 md:w-24 h-16 sm:h-20 md:h-24 bg-gradient-to-br from-red-400 to-pink-500 rounded-full opacity-20 blur-lg md:blur-xl"
              animate={{ 
                scale: [1, 1.2, 1],
                rotate: [0, 180, 360]
              }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            />
            
            <motion.div
              className="absolute -bottom-4 sm:-bottom-6 md:-bottom-8 -left-4 sm:-left-6 md:-left-8 w-20 sm:w-24 md:w-32 h-20 sm:h-24 md:h-32 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full opacity-10 blur-xl md:blur-2xl"
              animate={{ 
                scale: [1, 1.3, 1],
                rotate: [0, -180, -360]
              }}
              transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>
        </motion.div>

        {/* Video Stats */}
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8 mt-10 md:mt-16 max-w-4xl mx-auto px-2"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="text-center bg-white/50 rounded-xl p-4 shadow-sm">
            <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-gradient-to-br from-red-400 to-pink-500 rounded-xl sm:rounded-2xl mx-auto mb-3 sm:mb-4 flex items-center justify-center shadow-lg">
              <Play className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-white" />
            </div>
            <h4 className="text-base sm:text-lg font-bold text-gray-900 mb-1 sm:mb-2">محتوى حصري</h4>
            <p className="text-xs sm:text-sm text-gray-600">محتوى مميز حول منتجاتنا</p>
          </div>
          
          <div className="text-center bg-white/50 rounded-xl p-4 shadow-sm">
            <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-gradient-to-br from-blue-400 to-blue-600 rounded-xl sm:rounded-2xl mx-auto mb-3 sm:mb-4 flex items-center justify-center shadow-lg">
              <Users className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-white" />
            </div>
            <h4 className="text-base sm:text-lg font-bold text-gray-900 mb-1 sm:mb-2">رياضيون حقيقيون</h4>
            <p className="text-xs sm:text-sm text-gray-600">شهادات لرياضيين محترفين</p>
          </div>
          
          <div className="text-center bg-white/50 rounded-xl p-4 shadow-sm">
            <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-gradient-to-br from-green-400 to-teal-500 rounded-xl sm:rounded-2xl mx-auto mb-3 sm:mb-4 flex items-center justify-center shadow-lg">
              <Award className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-white" />
            </div>
            <h4 className="text-base sm:text-lg font-bold text-gray-900 mb-1 sm:mb-2">نتائج مثبتة</h4>
            <p className="text-xs sm:text-sm text-gray-600">نتائج مدعومة علميًا</p>
          </div>
        </motion.div>

        {/* Call to Action */}
        <motion.div 
          className="text-center mt-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="bg-gradient-to-r from-red-50 to-pink-50 rounded-2xl sm:rounded-3xl p-5 sm:p-8 border border-red-100 shadow-lg">
            <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-3 md:mb-4">
              هل أنت مستعد لبدء تحولك؟
            </h3>
            <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6 max-w-2xl mx-auto">
              انضم إلى الآلاف من الرياضيين الذين طوروا أداءهم مع مكملاتنا المميزة.
            </p>
            <motion.button
              className="bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700 text-white font-bold px-5 sm:px-8 py-3 sm:py-4 rounded-xl sm:rounded-2xl text-sm sm:text-base md:text-lg shadow-lg sm:shadow-xl transition-all duration-300 group"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              اكتشف منتجاتنا
              <motion.span
                className="inline-block ml-2"
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                →
              </motion.span>
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}