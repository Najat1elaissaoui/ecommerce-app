"use client"

import { useState } from "react"
import { motion, useMotionValue, useTransform } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Search, Grid, List, Filter, Sparkles, Zap } from "lucide-react"
import { Checkbox } from "@/components/ui/checkbox"
import { Slider } from "@/components/ui/slider"
import { Badge } from "@/components/ui/badge"

export default function ProductsHeader({
  viewMode = "grid",
  onViewModeChange
}: {
  viewMode?: "grid" | "list"
  onViewModeChange?: (mode: "grid" | "list") => void
}) {
  const [showFilters, setShowFilters] = useState(false)
  const [priceRange, setPriceRange] = useState([0, 1000])
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  
  // Create magical gradient that follows mouse
  const gradientX = useTransform(mouseX, [0, 1000], ["0%", "100%"])
  const gradientY = useTransform(mouseY, [0, 1000], ["0%", "100%"])
  
  const clearAllFilters = () => {
    if (onViewModeChange) {
      onViewModeChange("grid")
    }
    setShowFilters(false)
    setPriceRange([0, 1000])
  }
  
  const handleMouseMove = (event: React.MouseEvent) => {
    const rect = event.currentTarget.getBoundingClientRect()
    mouseX.set(event.clientX - rect.left)
    mouseY.set(event.clientY - rect.top)
  }

  // Animation variants
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
      y: 60,
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

  const cardHoverVariants = {
    hover: {
      y: -8,
      scale: 1.05,
      rotateX: 5,
      boxShadow: "0 25px 50px rgba(0,0,0,0.15)",
      transition: {
        type: "spring" as "spring",
        stiffness: 300,
        damping: 20
      }
    }
  }

  return (
    <motion.div 
      className="mb-8 max-w-7xl mx-auto px-4 relative pt-10"
      onMouseMove={handleMouseMove}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Magical Background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Floating sparkles */}
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.3, 1, 0.3],
              scale: [0.8, 1.5, 0.8],
              rotate: [0, 180, 360]
            }}
            transition={{
              duration: 2 + Math.random() * 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: Math.random() * 2
            }}
          />
        ))}
      </div>

      {/* Page Title */}
      <motion.div 
        className="text-center mb-12 relative"
        variants={itemVariants}
      >
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-pink-600/20 rounded-3xl blur-3xl"
          style={{
            x: gradientX,
            y: gradientY,
          }}
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.3, 0.6, 0.3]
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        <motion.h1 
          className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-foreground mb-6 relative z-20 leading-tight p-2"
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ 
            delay: 0.2,
            type: "spring",
            stiffness: 100,
            damping: 15
          }}
        >
          <motion.span
            className="inline-block bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent font-extrabold drop-shadow-md px-2"
            animate={{
              backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "linear"
            }}
            style={{
              backgroundSize: "200% 200%",
              overflow: "visible"
            }}
          >
            كتالوج المنتجات
          </motion.span>
          
          <motion.div
            className="absolute -top-4 -right-4 z-30"
            animate={{ 
              rotate: [0, 10, -10, 0],
              scale: [1, 1.2, 1]
            }}
            transition={{ 
              duration: 2, 
              repeat: Infinity 
            }}
          >
            <Sparkles className="w-8 h-8 text-yellow-400" />
          </motion.div>
        </motion.h1>
        
        <motion.p 
          className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed relative z-10"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          اكتشف مجموعتنا الكاملة من المكملات الغذائية عالية الجودة المصممة خصيصاً لتحقيق أهدافك الصحية
        </motion.p>
      </motion.div>

      {/* Main Controls Container */}
      <motion.div 
        className="space-y-6"
        variants={containerVariants}
      >
        
        {/* Search Bar - Full Width Centered */}
        <motion.div 
          className="flex justify-center"
          variants={itemVariants}
        >
          <motion.div 
            className="relative w-full max-w-2xl"
            whileHover={{ scale: 1.02 }}
            whileFocus={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 400 }}
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 rounded-full blur-xl"
              animate={{
                scale: [1, 1.05, 1],
                opacity: [0.5, 0.8, 0.5]
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            
            <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground z-10" />
            <Input 
              placeholder="ابحث عن المنتجات، البروتين، الفيتامينات..." 
              className="pr-12 pl-4 py-4 text-right text-lg rounded-full border-2 focus:border-primary/50 shadow-lg backdrop-blur-sm bg-white/90 relative z-10"
            />
          </motion.div>
        </motion.div>

       

      </motion.div>
    </motion.div>
  )
}
