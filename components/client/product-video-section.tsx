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

       
      </div>
    </section>
  )
}