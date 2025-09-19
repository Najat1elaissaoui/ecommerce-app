"use client"

import { Suspense, useState } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import ProductsGrid from "@/components/client/products-grid"
import ProductsFilters from "@/components/client/products-filters"
import ProductsHeader from "@/components/client/products-header"
import Header from "@/components/client/header"
import Footer from "@/components/client/footer"
import { Skeleton } from "@/components/ui/skeleton"

interface ProductsPageProps {
  searchParams: {
    search?: string
    category?: string
    sort?: string
    page?: string
  }
}

export default function ProductsPage({ searchParams }: ProductsPageProps) {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const { scrollYProgress } = useScroll()
  
  // Parallax effects
  const yBg = useTransform(scrollYProgress, [0, 1], ["0%", "50%"])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0.3])

  // Staggered container variants
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

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      
      {/* Animated Background Elements */}
      <div className="fixed inset-0 pointer-events-none">
        {/* Floating particles */}
        <motion.div 
          className="absolute inset-0"
          style={{ y: yBg, opacity }}
        >
          {[...Array(12)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -30, 0],
                x: [0, Math.random() * 20 - 10, 0],
                opacity: [0.3, 0.8, 0.3],
                scale: [0.8, 1.2, 0.8]
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                ease: "easeInOut",
                delay: Math.random() * 2
              }}
            />
          ))}
        </motion.div>

        {/* Gradient orbs */}
        <motion.div
          className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-purple-600/20 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        <motion.div
          className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-tr from-pink-400/20 to-orange-600/20 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.5, 0.2]
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
        />
      </div>

      <Header />
      
      <motion.main 
        className="pt-20 relative z-10"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div 
          className="container mx-auto px-4 py-8"
          variants={itemVariants}
        >
          <motion.div variants={itemVariants}>
            <ProductsHeader viewMode={viewMode} onViewModeChange={setViewMode} />
          </motion.div>

          <motion.div 
            className="grid grid-cols-1 lg:grid-cols-4 gap-8"
            variants={containerVariants}
          >
            {/* Filters Sidebar */}
            <motion.div 
              className="lg:col-span-1"
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <motion.div
                className="sticky top-28"
                initial={{ x: -100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.3, type: "spring", stiffness: 100 }}
              >
                <ProductsFilters />
              </motion.div>
            </motion.div>

            {/* Products Grid */}
            <motion.div 
              className="lg:col-span-3"
              variants={itemVariants}
            >
              <Suspense fallback={<ProductsGridSkeleton viewMode={viewMode} />}>
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5, duration: 0.6 }}
                >
                  <ProductsGrid searchParams={searchParams} viewMode={viewMode} />
                </motion.div>
              </Suspense>
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.main>
      
      <Footer />
    </div>
  )
}

function ProductsGridSkeleton({ viewMode = "grid" }: { viewMode?: "grid" | "list" }) {
  const skeletonVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.6,
        type: "spring" as const,
        stiffness: 100
      }
    })
  }

  const shimmerVariants = {
    initial: { x: "-100%" },
    animate: { 
      x: "100%",
      transition: {
        duration: 1.5,
        repeat: Infinity,
        ease: "easeInOut" as const
      }
    }
  }

  return viewMode === "grid" ? (
    <motion.div 
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      variants={{
        visible: {
          transition: {
            staggerChildren: 0.1
          }
        }
      }}
      initial="hidden"
      animate="visible"
    >
      {[...Array(9)].map((_, i) => (
        <motion.div 
          key={i} 
          className="space-y-4"
          variants={skeletonVariants}
          custom={i}
          whileHover={{ 
            scale: 1.05,
            rotateY: 5,
            transition: { type: "spring", stiffness: 300 }
          }}
        >
          <div className="relative h-64 w-full rounded-lg bg-gradient-to-br from-gray-200 to-gray-300 overflow-hidden">
            <motion.div 
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent"
              variants={shimmerVariants}
              initial="initial"
              animate="animate"
            />
          </div>
          
          <div className="space-y-2">
            <div className="relative h-4 w-3/4 bg-gradient-to-r from-gray-200 to-gray-300 rounded overflow-hidden">
              <motion.div 
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent"
                variants={shimmerVariants}
                initial="initial"
                animate="animate"
                style={{ animationDelay: `${i * 0.2}s` }}
              />
            </div>
            
            <div className="relative h-4 w-1/2 bg-gradient-to-r from-gray-200 to-gray-300 rounded overflow-hidden">
              <motion.div 
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent"
                variants={shimmerVariants}
                initial="initial"
                animate="animate"
                style={{ animationDelay: `${i * 0.3}s` }}
              />
            </div>
          </div>
          
          <div className="relative h-10 w-full bg-gradient-to-r from-gray-200 to-gray-300 rounded overflow-hidden">
            <motion.div 
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent"
              variants={shimmerVariants}
              initial="initial"
              animate="animate"
              style={{ animationDelay: `${i * 0.4}s` }}
            />
          </div>
        </motion.div>
      ))}
    </motion.div>
  ) : (
    <motion.div 
      className="space-y-4"
      variants={{
        visible: {
          transition: {
            staggerChildren: 0.15
          }
        }
      }}
      initial="hidden"
      animate="visible"
    >
      {[...Array(6)].map((_, i) => (
        <motion.div 
          key={i} 
          className="flex gap-6 p-6 border rounded-lg bg-white shadow-sm"
          variants={skeletonVariants}
          custom={i}
          whileHover={{ 
            scale: 1.02,
            boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
            transition: { type: "spring", stiffness: 300 }
          }}
        >
          <div className="relative h-48 w-48 rounded-lg bg-gradient-to-br from-gray-200 to-gray-300 flex-shrink-0 overflow-hidden">
            <motion.div 
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent"
              variants={shimmerVariants}
              initial="initial"
              animate="animate"
            />
          </div>
          
          <div className="flex-1 space-y-4">
            <div className="relative h-6 w-3/4 bg-gradient-to-r from-gray-200 to-gray-300 rounded overflow-hidden">
              <motion.div 
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent"
                variants={shimmerVariants}
                initial="initial"
                animate="animate"
              />
            </div>
            
            {[...Array(3)].map((_, j) => (
              <div key={j} className="relative h-4 w-full bg-gradient-to-r from-gray-200 to-gray-300 rounded overflow-hidden">
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent"
                  variants={shimmerVariants}
                  initial="initial"
                  animate="animate"
                  style={{ animationDelay: `${j * 0.2}s` }}
                />
              </div>
            ))}
            
            <div className="flex justify-between items-center pt-4">
              <div className="relative h-8 w-24 bg-gradient-to-r from-gray-200 to-gray-300 rounded overflow-hidden">
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent"
                  variants={shimmerVariants}
                  initial="initial"
                  animate="animate"
                />
              </div>
              
              <div className="relative h-10 w-32 bg-gradient-to-r from-gray-200 to-gray-300 rounded overflow-hidden">
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent"
                  variants={shimmerVariants}
                  initial="initial"
                  animate="animate"
                />
              </div>
            </div>
          </div>
        </motion.div>
      ))}
    </motion.div>
  )
}
