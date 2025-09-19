"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge" 
import Image from "next/image"
import { motion } from "framer-motion"
import { Heart, Shield, Zap, CheckCircle, Play, Pause, Volume2, VolumeX } from "lucide-react"
import { useState } from "react"

// Interface simplifiée pour les éléments de wellness
interface WellnessElement {
  title: string
  description: string
  icon: string // Emoji ou icône
  color: string
}

interface ProductVideoSectionProps {
  video?: {
    url: string
    thumbnail: string
    title: string
  }
}

export default function ProductVideoSection({ video }: ProductVideoSectionProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)

  const togglePlay = () => {
    setIsPlaying(!isPlaying)
    console.log(isPlaying ? "Pause video" : "Play video")
  }

  const toggleMute = () => {
    setIsMuted(!isMuted)
    console.log(isMuted ? "Unmute video" : "Mute video")
  }

  // Données inspirées du design "Complete Guide to Delicious Relaxation"
  const wellnessElements: WellnessElement[] = [
    {
      title: "Pure Energy",
      description: "Experience sustained energy throughout your day with our natural formula. Feel the difference as your body absorbs essential nutrients designed to power your active lifestyle without crashes or jitters.",
      icon: "⚡",
      color: "from-yellow-400 to-orange-500"
    },
    {
      title: "Heart Wellness", 
      description: "Support your cardiovascular health with scientifically-backed ingredients. Our carefully selected compounds work together to promote healthy circulation and overall heart function for long-term wellness.",
      icon: "❤️",
      color: "from-pink-400 to-red-500"
    },
    {
      title: "Daily Protection",
      description: "Shield your body with powerful antioxidants and immune-supporting nutrients. This comprehensive blend helps protect against daily stressors while maintaining your body's natural defense systems.",
      icon: "🛡️",
      color: "from-blue-400 to-cyan-500"
    }
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { y: 80, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { duration: 0.8 }
    }
  }

  return (
    <section className="w-full py-24 bg-gradient-to-br from-slate-50 via-blue-50/50 to-indigo-50/30 relative overflow-hidden">
      
      {/* Background decorative elements */}
      <div className="absolute inset-0">
        <motion.div 
          className="absolute top-20 left-10 w-32 h-32 bg-blue-200/20 rounded-full blur-xl"
          animate={{ 
            scale: [1, 1.2, 1],
            x: [0, 20, 0],
            y: [0, -10, 0]
          }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div 
          className="absolute bottom-32 right-16 w-48 h-48 bg-purple-200/20 rounded-full blur-2xl"
          animate={{ 
            scale: [1.2, 1, 1.2],
            x: [0, -15, 0],
            y: [0, 15, 0]
          }}
          transition={{ duration: 10, repeat: Infinity }}
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        
        {/* Section Vidéo - Si vidéo disponible */}
        {video && (
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mb-32"
          >
            <div className="text-center mb-16">
              <Badge className="mb-6 px-6 py-3 text-lg font-semibold bg-red-600 text-white rounded-full">
                VIDEO EXCLUSIVE
              </Badge>
              <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
                {video.title}
              </h2>
            </div>

            {/* Video Player */}
            <div className="max-w-5xl mx-auto">
              <Card className="bg-gray-800 border-0 rounded-3xl overflow-hidden shadow-2xl">
                <CardContent className="p-0 relative">
                  <div className="relative aspect-video group cursor-pointer" onClick={togglePlay}>
                    <div className="absolute inset-0">
                      <Image
                        src={video.thumbnail}
                        alt={video.title}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors duration-300"></div>
                    </div>

                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="relative">
                        <div className={`absolute inset-0 bg-red-600 rounded-full animate-ping ${isPlaying ? 'opacity-0' : 'opacity-75'}`}></div>
                        <div className={`absolute inset-0 bg-red-600 rounded-full ${isPlaying ? 'opacity-0' : 'opacity-100'}`}></div>
                        <Button
                          size="lg"
                          className="relative w-20 h-20 rounded-full bg-white/90 hover:bg-white text-red-600 hover:scale-110 transition-all duration-300 shadow-2xl"
                        >
                          {isPlaying ? <Pause size={32} /> : <Play size={32} className="ml-1" />}
                        </Button>
                      </div>
                    </div>

                    <div className="absolute bottom-6 left-6 right-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={(e) => {
                              e.stopPropagation()
                              toggleMute()
                            }}
                            className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 border-0"
                          >
                            {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
                          </Button>
                        </div>
                      </div>
                    </div>

                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20">
                      <div 
                        className="h-full bg-red-600 transition-all duration-1000"
                        style={{ width: isPlaying ? '45%' : '0%' }}
                      ></div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </motion.div>
        )}

        {/* Header Wellness - Inspiré du design */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Badge className="mb-8 px-8 py-4 text-base font-bold bg-gradient-to-r from-cyan-500 to-blue-600 text-white border-0 rounded-full shadow-lg">
              ✨ WELLNESS EXPERIENCE
            </Badge>
          </motion.div>
          
          <motion.h2 
            className="text-4xl md:text-6xl font-light text-gray-900 leading-tight"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            The Complete Guide to
            <br />
            <span className="font-bold bg-gradient-to-r from-cyan-600 to-blue-700 bg-clip-text text-transparent">
              Premium Wellness
            </span>
          </motion.h2>
        </motion.div>

        {/* Wellness Elements Grid - Layout alterné comme dans le design */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="max-w-6xl mx-auto space-y-20"
        >
          {wellnessElements.map((element, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              onHoverStart={() => setHoveredIndex(index)}
              onHoverEnd={() => setHoveredIndex(null)}
              className={`flex flex-col lg:flex-row items-center gap-12 ${
                index % 2 === 1 ? 'lg:flex-row-reverse' : ''
              }`}
            >
              
              {/* Icon Circle - Style du design original */}
              <motion.div 
                className="flex-shrink-0 relative"
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                {/* Glow effect */}
                <motion.div 
                  className={`absolute inset-0 bg-gradient-to-r ${element.color} rounded-full blur-2xl opacity-30 scale-150`}
                  animate={{
                    opacity: hoveredIndex === index ? 0.5 : 0.3,
                    scale: hoveredIndex === index ? 1.8 : 1.5
                  }}
                  transition={{ duration: 0.3 }}
                />
                
                {/* Main circle */}
                <div className={`relative w-32 h-32 md:w-40 md:h-40 rounded-full bg-gradient-to-r ${element.color} flex items-center justify-center shadow-2xl`}>
                  <span className="text-4xl md:text-5xl">
                    {element.icon}
                  </span>
                  
                  {/* Decorative dots comme dans le design */}
                  <div className="absolute inset-0">
                    {[...Array(8)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="absolute w-2 h-2 bg-white/30 rounded-full"
                        style={{
                          top: `${20 + Math.sin(i * Math.PI / 4) * 50}%`,
                          left: `${50 + Math.cos(i * Math.PI / 4) * 40}%`,
                        }}
                        animate={{ 
                          opacity: [0.3, 0.8, 0.3],
                          scale: [0.8, 1.2, 0.8]
                        }}
                        transition={{ 
                          duration: 2, 
                          repeat: Infinity,
                          delay: i * 0.2
                        }}
                      />
                    ))}
                  </div>
                </div>
              </motion.div>

              {/* Content */}
              <motion.div 
                className={`flex-1 text-center lg:text-left ${
                  index % 2 === 1 ? 'lg:text-right' : ''
                }`}
                whileHover={{ x: index % 2 === 1 ? -10 : 10 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                {/* Title Badge */}
                <motion.div
                  initial={{ opacity: 0, x: index % 2 === 1 ? 20 : -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className={`inline-block mb-6 ${
                    index % 2 === 1 ? 'lg:mr-0' : ''
                  }`}
                >
                  <Badge className="px-6 py-3 text-lg font-bold bg-gradient-to-r from-cyan-500 to-blue-600 text-white border-0 rounded-full shadow-lg">
                    {element.title}
                  </Badge>
                </motion.div>

                {/* Description */}
                <motion.p 
                  className="text-lg text-gray-700 leading-relaxed max-w-2xl mx-auto lg:mx-0"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                >
                  {element.description}
                </motion.p>

                {/* Decorative line */}
                <motion.div 
                  className={`mt-6 h-1 w-24 bg-gradient-to-r ${element.color} rounded-full mx-auto ${
                    index % 2 === 1 ? 'lg:ml-auto lg:mr-0' : 'lg:ml-0'
                  }`}
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                />
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

        {/* Money Back Guarantee Section - Inspiré de l'image */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 1.0 }}
          className="mt-20"
        >
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="max-w-4xl mx-auto bg-gradient-to-r from-pink-50 via-white to-pink-50 rounded-3xl p-12 shadow-2xl border border-pink-100 relative overflow-hidden"
          >
            
            {/* Background decoration */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-pink-200/20 rounded-full blur-2xl"></div>
            <div className="absolute bottom-0 left-0 w-40 h-40 bg-purple-200/20 rounded-full blur-2xl"></div>

            <div className="relative z-10 flex flex-col lg:flex-row items-center gap-8 text-center lg:text-left">
              
              {/* Money Back Guarantee Badge - Style de l'image */}
              <motion.div 
                className="flex-shrink-0 relative"
                whileHover={{ rotate: 360 }}
                transition={{ duration: 1, type: "spring" }}
              >
                <div className="relative">
                  <div className="w-32 h-32 relative">
                    <div className="absolute inset-4 bg-black rounded-full flex items-center justify-center shadow-2xl">
                      <span className="text-white text-4xl font-bold">g</span>
                    </div>
                    
                    <svg className="w-full h-full absolute inset-0" viewBox="0 0 128 128">
                      <path
                        id="circle"
                        d="M 64, 64 m -50, 0 a 50,50 0 1,1 100,0 a 50,50 0 1,1 -100,0"
                        fill="none"
                      />
                      <text className="text-sm font-bold fill-gray-700">
                        <textPath href="#circle" startOffset="0%">
                          MONEY BACK • GUARANTEED • MONEY BACK • 
                        </textPath>
                      </text>
                    </svg>
                  </div>
                  
                  <motion.div 
                    className="absolute inset-0 bg-pink-400 rounded-full blur-xl opacity-20"
                    animate={{ 
                      scale: [1, 1.2, 1],
                      opacity: [0.2, 0.4, 0.2]
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                </div>
              </motion.div>

              {/* Content */}
              <div className="flex-1">
                <motion.h3 
                  className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  Try it, <span className="bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">Risk-FREE!</span>
                </motion.h3>
                
                <motion.p 
                  className="text-lg text-gray-700 leading-relaxed max-w-2xl"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                >
                  If you're not satisfied with our product, simply contact us and we'll give you a full, 
                  <span className="font-semibold text-gray-900"> 100% hassle-free refund</span>. 
                  Your satisfaction is our guarantee.
                </motion.p>

                <motion.div 
                  className="mt-6 flex flex-wrap gap-4 justify-center lg:justify-start"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                >
                  <div className="flex items-center gap-2 text-sm text-gray-600 bg-white/80 px-4 py-2 rounded-full shadow-sm">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    30-Day Money Back
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600 bg-white/80 px-4 py-2 rounded-full shadow-sm">
                    <Shield className="w-4 h-4 text-blue-500" />
                    No Questions Asked
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600 bg-white/80 px-4 py-2 rounded-full shadow-sm">
                    <Heart className="w-4 h-4 text-pink-500" />
                    100% Satisfaction
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}