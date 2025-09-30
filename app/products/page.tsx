"use client"

import { Suspense, useState, useEffect } from "react"
import { motion } from "framer-motion"
import ProductsGrid from "@/components/client/products-grid"
import ProductsFilters from "@/components/client/products-filters"
import ProductsHeader from "@/components/client/products-header"
import Header from "@/components/client/header"
import Footer from "@/components/client/footer"
import { Button } from "@/components/ui/button"
import { Filter, X } from "lucide-react"

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
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)
  const [mounted, setMounted] = useState(false)

  // Pour éviter les erreurs d'hydratation
  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      
      {/* Fond d'écran subtil et moderne */}
      <div className="fixed inset-0 pointer-events-none">
        {/* Gradient de fond */}
        <div className="absolute inset-0 bg-gradient-to-b from-gray-50 to-white opacity-70" />
        
        {/* Pattern subtil */}
        <div className="absolute inset-0 bg-[url('/placeholder.svg')] bg-repeat opacity-5" />
        
        {/* Orbes gradients */}
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/10 to-purple-600/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-tr from-pink-400/10 to-orange-600/10 rounded-full blur-3xl" />
      </div>

      <Header />
      
      <main className="pt-20 relative z-10">
        <div className="container mx-auto px-4 py-6 md:py-8">
          {/* En-tête de la page produits */}
          <div className="opacity-0 animate-[fadeIn_0.5s_0.2s_forwards]">
            <ProductsHeader viewMode={viewMode} onViewModeChange={setViewMode} />
          </div>

          {/* Bouton filtres mobile */}
          <div className="lg:hidden my-4 opacity-0 animate-[fadeIn_0.5s_0.3s_forwards]">
            <Button 
              variant="outline" 
              className="w-full flex items-center justify-center gap-2 py-5"
              onClick={() => setMobileFiltersOpen(true)}
            >
              <Filter className="w-4 h-4" /> 
              تصفية المنتجات
            </Button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Filtres pour mobile - modal */}
            {mounted && mobileFiltersOpen && (
              <div className="fixed inset-0 bg-black/50 z-50 lg:hidden animate-[fadeIn_0.3s_ease-out_forwards]">
                <div className="absolute top-0 left-0 bottom-0 w-[85%] max-w-md bg-white shadow-xl animate-[slideInRight_0.3s_ease-out_forwards]">
                  <div className="p-4 border-b flex items-center justify-between">
                    <h3 className="font-bold text-lg">تصفية المنتجات</h3>
                    <Button variant="ghost" size="sm" onClick={() => setMobileFiltersOpen(false)}>
                      <X className="w-5 h-5" />
                    </Button>
                  </div>
                  <div className="p-4 overflow-y-auto max-h-[calc(100vh-6rem)]">
                    <ProductsFilters />
                  </div>
                  <div className="p-4 border-t">
                    <Button className="w-full" onClick={() => setMobileFiltersOpen(false)}>
                      تطبيق الفلترة
                    </Button>
                  </div>
                </div>
              </div>
            )}
            
            {/* Filtres pour desktop */}
            <div className="hidden lg:block lg:col-span-1 opacity-0 animate-[fadeInRight_0.5s_0.4s_forwards]">
              <div className="sticky top-28">
                <ProductsFilters />
              </div>
            </div>

            {/* Grille de produits */}
            <div className="lg:col-span-3 opacity-0 animate-[fadeInUp_0.5s_0.5s_forwards]">
              <Suspense fallback={<ProductsGridSkeleton viewMode={viewMode} />}>
                <ProductsGrid />
              </Suspense>
            </div>
          </div>
        </div>
      </main>
      
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
