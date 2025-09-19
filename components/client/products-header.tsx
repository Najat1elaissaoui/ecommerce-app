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
      className="mb-8 max-w-7xl mx-auto px-4 relative"
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
          className="text-4xl md:text-6xl lg:text-7xl font-black text-foreground mb-6 relative z-10"
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
            className="inline-block bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent"
            animate={{
              backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "linear"
            }}
            style={{
              backgroundSize: "200% 200%"
            }}
          >
            كتالوج المنتجات
          </motion.span>
          
          <motion.div
            className="absolute -top-4 -right-4"
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

        {/* Filters and Controls - Organized Cards */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto"
          variants={containerVariants}
        >
          
          {/* Sort Card */}
          <motion.div variants={itemVariants} whileHover={cardHoverVariants.hover}>
            <Card 
              className="shadow-lg hover:shadow-2xl transition-all duration-300 relative overflow-hidden bg-white/80 backdrop-blur-sm border-0"
            >
              {/* Card glow effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-transparent to-purple-500/10 opacity-0 group-hover:opacity-100"
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              />
              
              <CardHeader className="pb-3 relative z-10">
                <CardTitle className="text-base font-semibold flex items-center gap-2">
                  <motion.div
                    animate={{ rotate: [0, 5, -5, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <List className="w-4 h-4 text-blue-500" />
                  </motion.div>
                  ترتيب حسب
                </CardTitle>
              </CardHeader>
              <CardContent className="relative z-10">
                <Select defaultValue="newest">
                  <SelectTrigger className="w-full border-gray-200 focus:border-blue-400 transition-colors">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="newest">الأحدث</SelectItem>
                    <SelectItem value="price-low">السعر: من الأقل للأعلى</SelectItem>
                    <SelectItem value="price-high">السعر: من الأعلى للأقل</SelectItem>
                    <SelectItem value="name">الاسم</SelectItem>
                    <SelectItem value="rating">التقييم</SelectItem>
                  </SelectContent>
                </Select>
              </CardContent>
            </Card>
          </motion.div>

          {/* Price Range Card */}
          <motion.div variants={itemVariants} whileHover={cardHoverVariants.hover}>
            <Card 
              className="shadow-lg hover:shadow-2xl transition-all duration-300 relative overflow-hidden bg-white/80 backdrop-blur-sm border-0"
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-green-500/10 via-transparent to-teal-500/10 opacity-0"
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              />
              
              <CardHeader className="pb-3 relative z-10">
                <CardTitle className="text-base font-semibold flex items-center gap-2">
                  <motion.div
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    <Filter className="w-4 h-4 text-green-500" />
                  </motion.div>
                  نطاق السعر
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 relative z-10">
                <Slider 
                  value={priceRange} 
                  onValueChange={setPriceRange} 
                  max={1000} 
                  step={10} 
                  className="w-full"
                />
                <div className="flex items-center justify-between text-sm font-medium">
                  <motion.div whileHover={{ scale: 1.1 }}>
                    <Badge variant="outline" className="text-xs bg-green-50 border-green-200">
                      {priceRange[0]} DH
                    </Badge>
                  </motion.div>
                  <span className="text-muted-foreground">إلى</span>
                  <motion.div whileHover={{ scale: 1.1 }}>
                    <Badge variant="outline" className="text-xs bg-green-50 border-green-200">
                      {priceRange[1]} DH
                    </Badge>
                  </motion.div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* View Mode Card */}
          <motion.div variants={itemVariants} whileHover={cardHoverVariants.hover}>
            <Card 
              className="shadow-lg hover:shadow-2xl transition-all duration-300 relative overflow-hidden bg-white/80 backdrop-blur-sm border-0"
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-transparent to-pink-500/10 opacity-0"
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              />
              
              <CardHeader className="pb-3 relative z-10">
                <CardTitle className="text-base font-semibold flex items-center gap-2">
                  <motion.div
                    animate={{ rotate: [0, 90, 180, 270, 360] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                  >
                    <Grid className="w-4 h-4 text-purple-500" />
                  </motion.div>
                  نمط العرض
                </CardTitle>
              </CardHeader>
              <CardContent className="relative z-10">
                <div className="flex gap-2">
                  <motion.div className="flex-1" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button
                      variant={viewMode === "grid" ? "default" : "outline"}
                      size="sm"
                      className="w-full relative overflow-hidden"
                      onClick={() => onViewModeChange && onViewModeChange("grid")}
                    >
                      <Grid className="w-4 h-4 ml-2" />
                      شبكة
                    </Button>
                  </motion.div>
                  <motion.div className="flex-1" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button
                      variant={viewMode === "list" ? "default" : "outline"}
                      size="sm"
                      className="w-full relative overflow-hidden"
                      onClick={() => onViewModeChange && onViewModeChange("list")}
                    >
                      <List className="w-4 h-4 ml-2" />
                      قائمة
                    </Button>
                  </motion.div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>

        {/* Clear Filters Button */}
        <motion.div 
          className="flex justify-center"
          variants={itemVariants}
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button 
              variant="ghost" 
              onClick={clearAllFilters}
              className="text-muted-foreground hover:text-foreground relative group overflow-hidden px-6 py-3 rounded-full"
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-red-500/10 to-orange-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                animate={{
                  scale: [1, 1.1, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                }}
              />
              <span className="relative z-10 flex items-center gap-2">
                <Zap className="w-4 h-4" />
                مسح جميع الفلاتر
              </span>
            </Button>
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.div>
  )
}
