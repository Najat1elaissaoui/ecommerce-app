"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { colors } from "@/lib/colors"
import Image from "next/image"
import { ShoppingCart, Check, Sparkles, Heart, Shield, Leaf } from "lucide-react"
import { useState, useEffect } from "react"
import { motion, useAnimation, useInView, easeInOut } from "framer-motion"
import { useRef } from "react"

interface ProductHeroSectionProps {
  name: string
  image: string
  description: string
  category: string
  price?: number // Prix optionnel maintenant
}

export default function ProductHeroSection({ 
  name, 
  image, 
  description, 
  category
}: ProductHeroSectionProps) {
  const [addedToCart, setAddedToCart] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })
  const controls = useAnimation()

  useEffect(() => {
    if (isInView) {
      controls.start("visible")
    }
  }, [isInView, controls])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 20,
        y: (e.clientY / window.innerHeight) * 20,
      })
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  const handleAddToCart = () => {
    setAddedToCart(true)
    setTimeout(() => setAddedToCart(false), 3000)
    console.log("Produit ajouté au panier:", name)
  }

  // Animations variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        duration: 0.6
      }
    }
  }

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: "easeInOut"
      }
    }
  }

  const floatingVariants = {
    animate: {
      y: [-10, 10, -10],
      x: [-5, 5, -5],
      rotate: [0, 5, -5, 0],
      transition: {
        duration: 6,
        repeat: Infinity,
        ease: easeInOut
      }
    }
  }

  const glowVariants = {
    animate: {
      scale: [1, 1.2, 1],
      opacity: [0.3, 0.6, 0.3],
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  }

  return (
    <section 
      ref={ref}
      className="w-full min-h-screen relative overflow-hidden bg-gradient-to-br from-violet-900 via-purple-800 to-indigo-900"
    >
      {/* Animated background elements */}
      <motion.div 
        className="absolute inset-0"
        style={{
          background: `radial-gradient(circle at ${50 + mousePosition.x}% ${50 + mousePosition.y}%, rgba(147, 51, 234, 0.3) 0%, transparent 70%)`
        }}
      />
      
      {/* Floating orbs */}
      <motion.div 
        variants={floatingVariants}
        animate="animate"
        className="absolute top-20 right-20 w-32 h-32 bg-pink-400/20 rounded-full blur-xl"
      />
      <motion.div 
        variants={floatingVariants}
        animate="animate"
        style={{ animationDelay: '2s' }}
        className="absolute bottom-32 left-16 w-48 h-48 bg-blue-400/10 rounded-full blur-2xl"
      />
      <motion.div 
        variants={floatingVariants}
        animate="animate"
        style={{ animationDelay: '4s' }}
        className="absolute top-1/2 left-1/4 w-24 h-24 bg-emerald-400/20 rounded-full blur-lg"
      />

      {/* Geometric shapes */}
      <motion.div
        className="absolute top-1/4 right-1/4 w-6 h-6 border-2 border-white/30"
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      />
      <motion.div
        className="absolute bottom-1/4 left-1/3 w-4 h-4 bg-gradient-to-r from-pink-400 to-violet-400 rounded-full"
        animate={{ 
          scale: [1, 1.5, 1],
          opacity: [0.7, 1, 0.7]
        }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="container mx-auto px-4 py-20 relative z-10">
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate={controls}
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-screen"
        >
          
          {/* Left side - Product Info */}
          <div className="text-white space-y-8">
            
            {/* Category badge */}
            <motion.div variants={itemVariants}>
              <Badge 
                className="px-6 py-3 text-sm font-bold bg-gradient-to-r from-pink-500 to-violet-500 text-white border-0 rounded-full shadow-lg"
              >
                <Sparkles className="w-4 h-4 mr-2" />
                {category.toUpperCase()}
              </Badge>
            </motion.div>

            {/* Main title */}
            <motion.div variants={itemVariants} className="space-y-4">
              <motion.p 
                className="text-lg font-medium bg-gradient-to-r from-pink-300 to-violet-300 bg-clip-text text-transparent"
                animate={{ 
                  backgroundPosition: ["0%", "100%", "0%"]
                }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                WORLD'S FIRST
              </motion.p>
              <motion.h1 
                className="text-5xl lg:text-7xl font-black leading-tight bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                {name}
              </motion.h1>
            </motion.div>

            {/* Description */}
            <motion.p 
              variants={itemVariants}
              className="text-xl text-gray-200 leading-relaxed max-w-2xl font-light"
            >
              {description}
            </motion.p>

            {/* Modern benefits with icons */}
            <motion.div 
              variants={itemVariants}
              className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-8"
            >
              {[
                { icon: Leaf, label: "100% Natural", color: "from-green-400 to-emerald-500" },
                { icon: Shield, label: "FDA Approved", color: "from-blue-400 to-cyan-500" },
                { icon: Heart, label: "Heart Health", color: "from-pink-400 to-rose-500" },
                { icon: Sparkles, label: "Premium Quality", color: "from-yellow-400 to-orange-500" }
              ].map((benefit, index) => (
                <motion.div
                  key={benefit.label}
                  className="group relative"
                  whileHover={{ scale: 1.1, y: -5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className={`absolute inset-0 bg-gradient-to-r ${benefit.color} rounded-2xl blur-xl opacity-0 group-hover:opacity-60 transition-opacity duration-300`} />
                  <div className="relative bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20 text-center">
                    <benefit.icon className="w-8 h-8 mx-auto mb-2 text-white group-hover:text-white transition-colors" />
                    <span className="text-sm font-semibold text-gray-200 group-hover:text-white transition-colors">
                      {benefit.label}
                    </span>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* Action button */}
            <motion.div 
              variants={itemVariants}
              className="pt-8"
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  size="lg"
                  onClick={handleAddToCart}
                  className={`px-12 py-6 text-lg font-bold rounded-2xl transition-all duration-500 flex items-center gap-4 shadow-2xl ${
                    addedToCart 
                      ? 'bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700'
                      : 'bg-gradient-to-r from-pink-500 to-violet-600 hover:from-pink-600 hover:to-violet-700'
                  }`}
                >
                  <motion.div
                    animate={addedToCart ? { rotate: 360 } : { rotate: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    {addedToCart ? (
                      <Check className="w-6 h-6" />
                    ) : (
                      <ShoppingCart className="w-6 h-6" />
                    )}
                  </motion.div>
                  {addedToCart ? 'AJOUTÉ AU PANIER!' : 'DÉCOUVRIR MAINTENANT'}
                </Button>
              </motion.div>
            </motion.div>
          </div>

          {/* Right side - Product Image */}
          <motion.div 
            variants={itemVariants}
            className="relative"
          >
            {/* Glow effect */}
            <motion.div 
              variants={glowVariants}
              animate="animate"
              className="absolute inset-0 bg-gradient-to-r from-pink-400/30 via-violet-400/30 to-blue-400/30 rounded-full blur-3xl scale-150"
            />
            
            <motion.div 
              className="relative z-10 max-w-md mx-auto lg:max-w-none"
              whileHover={{ 
                scale: 1.05,
                rotate: [0, 1, -1, 0],
                transition: { duration: 0.5 }
              }}
            >
              <motion.div
                animate={{ 
                  y: [-10, 10, -10],
                  transition: { duration: 4, repeat: Infinity, ease: "easeInOut" }
                }}
              >
                <Image
                  src={image}
                  alt={name}
                  width={500}
                  height={600}
                  className="w-full h-auto object-contain drop-shadow-2xl"
                  priority
                />
              </motion.div>
              
              {/* Floating elements around product */}
              <motion.div 
                className="absolute -top-8 -right-8 w-20 h-20 bg-gradient-to-r from-pink-400/20 to-violet-400/20 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/30"
                animate={{ 
                  rotate: 360,
                  scale: [1, 1.2, 1],
                  transition: { duration: 8, repeat: Infinity }
                }}
              >
                <Sparkles className="w-8 h-8 text-white" />
              </motion.div>
              
              <motion.div 
                className="absolute bottom-16 -left-8 w-16 h-16 bg-gradient-to-r from-blue-400/20 to-emerald-400/20 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/20"
                animate={{ 
                  y: [-5, 5, -5],
                  x: [-2, 2, -2],
                  transition: { duration: 3, repeat: Infinity }
                }}
              >
                <Heart className="w-6 h-6 text-white" />
              </motion.div>

              <motion.div 
                className="absolute top-1/2 -right-6 w-12 h-12 bg-gradient-to-r from-yellow-400/20 to-orange-400/20 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/20"
                animate={{ 
                  scale: [1, 1.3, 1],
                  rotate: [0, 180, 360],
                  transition: { duration: 5, repeat: Infinity }
                }}
              >
                <Shield className="w-5 h-5 text-white" />
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom gradient transition */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent"></div>
    </section>
  )
}