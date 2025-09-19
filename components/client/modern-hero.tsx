"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { ShoppingCart, Star, Award, TrendingUp, ArrowRight, Zap } from "lucide-react"
import { useState, useEffect } from "react"

export default function ModernHero() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <section className="relative min-h-screen overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900">
      
      {/* Background Pattern */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 opacity-30">
          <div className="w-full h-full" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Cpath d='m36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            backgroundSize: '60px 60px'
          }} />
        </div>
      </div>

      {/* Floating Elements */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-blue-400/30 rounded-full"
            style={{
              left: `${20 + (i * 15)}%`,
              top: `${30 + (i * 10)}%`,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.3, 0.8, 0.3],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 4 + i,
              repeat: Infinity,
              delay: i * 0.5,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>

      <div className="relative z-10 container mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-screen">
          
          {/* Left Content */}
          <motion.div 
            className="space-y-8"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <Badge className="bg-blue-500/20 text-blue-300 border-blue-500/50 px-4 py-2">
                <Star className="w-4 h-4 mr-2" />
                #1 Supplements Brand
              </Badge>
            </motion.div>

            {/* Main Title */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="space-y-4"
            >
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-white leading-tight">
                Fuel Your
                <span className="block bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                  Performance
                </span>
              </h1>
              <p className="text-xl md:text-2xl text-blue-100 font-light max-w-lg">
                Premium supplements crafted for athletes who demand excellence
              </p>
            </motion.div>

            {/* Stats */}
            <motion.div 
              className="grid grid-cols-3 gap-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
            >
              <div className="text-center">
                <div className="text-3xl font-bold text-white">2M+</div>
                <div className="text-sm text-blue-200">Happy Customers</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white">4.9★</div>
                <div className="text-sm text-blue-200">Average Rating</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white">50+</div>
                <div className="text-sm text-blue-200">Products</div>
              </div>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div 
              className="flex flex-col sm:flex-row gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
            >
              <Link href="/products">
                <Button 
                  size="lg" 
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 text-lg font-semibold group relative overflow-hidden"
                >
                  <span className="relative z-10 flex items-center">
                    Shop Now
                    <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </Button>
              </Link>
              
              <Button 
                variant="outline" 
                size="lg"
                className="border-blue-400 text-blue-300 hover:bg-blue-400/20 px-8 py-4 text-lg font-semibold"
              >
                Learn More
              </Button>
            </motion.div>

            {/* Trust Badges */}
            <motion.div 
              className="flex flex-wrap gap-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
            >
              <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
                <Award className="w-4 h-4 text-yellow-400" />
                <span className="text-sm text-white">FDA Approved</span>
              </div>
              <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
                <Zap className="w-4 h-4 text-green-400" />
                <span className="text-sm text-white">Lab Tested</span>
              </div>
              <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
                <TrendingUp className="w-4 h-4 text-blue-400" />
                <span className="text-sm text-white">Best Seller</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Content - Product Showcase */}
          <motion.div 
            className="relative"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            {/* Main Product Image */}
            <div className="relative">
              <motion.div 
                className="relative z-20"
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
                  src="/protein-powder-assortment.png"
                  alt="Premium Supplements"
                  width={500}
                  height={600}
                  className="w-full max-w-md mx-auto drop-shadow-2xl"
                />
              </motion.div>

              {/* Glowing Effects */}
              <div className="absolute inset-0 z-10">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full blur-3xl animate-pulse" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-pink-500/30 to-blue-500/30 rounded-full blur-2xl animate-pulse delay-1000" />
              </div>

              {/* Floating Icons */}
              <motion.div
                className="absolute top-20 -left-8 bg-gradient-to-br from-green-400 to-green-600 p-4 rounded-full shadow-xl z-30"
                animate={{
                  y: [0, -15, 0],
                  rotate: [0, 10, -10, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <Star className="w-6 h-6 text-white" />
              </motion.div>

              <motion.div
                className="absolute bottom-32 -right-8 bg-gradient-to-br from-orange-400 to-red-500 p-4 rounded-full shadow-xl z-30"
                animate={{
                  y: [0, -20, 0],
                  rotate: [0, -15, 15, 0],
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  delay: 0.5,
                  ease: "easeInOut"
                }}
              >
                <Zap className="w-6 h-6 text-white" />
              </motion.div>

              <motion.div
                className="absolute top-40 right-16 bg-gradient-to-br from-purple-400 to-pink-500 p-4 rounded-full shadow-xl z-30"
                animate={{
                  y: [0, -12, 0],
                  rotate: [0, 8, -8, 0],
                }}
                transition={{
                  duration: 3.5,
                  repeat: Infinity,
                  delay: 1,
                  ease: "easeInOut"
                }}
              >
                <Award className="w-6 h-6 text-white" />
              </motion.div>
            </div>

            {/* Product Cards */}
            <div className="absolute -bottom-8 -left-8 bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/20 z-30">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-purple-500 rounded-xl flex items-center justify-center">
                  <ShoppingCart className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className="text-white font-semibold">Fast Delivery</div>
                  <div className="text-blue-200 text-sm">Within 24 hours</div>
                </div>
              </div>
            </div>

            <div className="absolute -top-8 -right-8 bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/20 z-30">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-teal-500 rounded-xl flex items-center justify-center">
                  <Star className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className="text-white font-semibold">Top Rated</div>
                  <div className="text-blue-200 text-sm">4.9/5 stars</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}