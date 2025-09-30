"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"

interface ProductHeroSectionProps {
  name: string
  image: string
  description: string
  category: string
  price?: number
  productColor?: {
    main: string
    light: string
    dark: string
    contrastText: string
  }
}

export default function ProductHeroSection({ 
  name, 
  image, 
  description, 
  category,
  productColor = {
    main: "#7C3AED",
    light: "#9F67FF",
    dark: "#5B21B6",
    contrastText: "#FFFFFF"
  }
}: ProductHeroSectionProps) {

  return (
    <section 
      className="w-full relative overflow-hidden p-0 m-0 min-h-[700px] flex items-center"
      style={{
        background: `linear-gradient(to bottom right, ${productColor.dark}, ${productColor.main}, ${productColor.dark})`
      }}
    >
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Left side - Product Info */}
          <div className="text-white space-y-8">
            
            {/* Category badge */}
            <div>
              <Badge 
                className="px-6 py-3 text-sm font-bold text-white border-0 rounded-full shadow-lg"
                style={{
                  background: `linear-gradient(to right, ${productColor.main}, ${productColor.light})`
                }}
              >
                {category.toUpperCase()}
              </Badge>
            </div>

            {/* Main title */}
            <div className="space-y-4">
              <h1 className="text-4xl md:text-6xl font-bold leading-tight">
                {name}
              </h1>
            </div>

            {/* Description */}
            <p className="text-xl text-gray-200 leading-relaxed">
              {description}
            </p>

            {/* Shop Now button - desktop version */}
            <div className="hidden md:block mt-6">
              <Link href="#product-packs" scroll={false}>
                <button 
                  className="bg-white hover:bg-gray-100 text-black text-sm font-bold uppercase tracking-wider px-8 py-3 border-none cursor-pointer transition duration-200"
                >
                  تسوق الآن
                </button>
              </Link>
              
              {/* Product features icons */}
              <div className="flex items-center space-x-10 mt-8">
                <div className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 flex items-center justify-center mb-1">
                    <Image src="/h1.png" alt="h1 h2 h3 h4" width={64} height={64} />
                  
                  </div>
                  <span className="text-xs text-white">Vegan</span>
                </div>
                
                <div className="flex flex-col items-center text-center"><div className="w-16 h-16 flex items-center justify-center mb-1">
                    <Image src="/h2.png" alt="h1 h2 h3 h4" width={64} height={64} />
                  
                  </div>
                  <span className="text-xs text-white">Gluten-Free</span>
                </div>
                
                <div className="flex flex-col items-center text-center">
                 <div className="w-16 h-16 flex items-center justify-center mb-1">
                    <Image src="/h3.png" alt="h1 h2 h3 h4" width={64} height={64} />
                  </div>
                  <span className="text-xs text-white">Non-GMO</span>
                </div>
                
                <div className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 flex items-center justify-center mb-1">
                    <Image src="/h4.png" alt="h1 h2 h3 h4" width={64} height={64} />
                  </div>
                  <span className="text-xs text-white">Gelatin-Free</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right side - Product Image */}
          <div className="relative flex justify-center">
            <div className="max-w-md">
              <Image
                src={image}
                alt={name}
                width={500}
                height={600}
                className="w-full h-auto object-contain"
                priority
              />
            </div>
          </div>
          
          {/* Mobile version of Shop Now and features - at the bottom */}
          <div className="md:hidden flex flex-col items-center space-y-6 col-span-1 mt-4">
            <a href="#order-form-section" className="w-full" style={{ display: 'block' }}>
              <button 
                className="bg-white hover:bg-gray-100 text-black text-sm font-bold uppercase tracking-wider px-8 py-3 border-none w-full"
              >
                تسوق الآن
              </button>
            </a>
            
            <div className="flex items-center justify-between w-full px-2 mt-2">
              <div className="flex flex-col items-center text-center">
                <div className="w-10 h-10 flex items-center justify-center mb-1">
                  <Image src="/h1.png" alt="h1" width={40} height={40} />
                </div>
                <span className="text-xs text-white">Vegan</span>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="w-10 h-10 flex items-center justify-center mb-1">
                  <Image src="/h2.png" alt="h2" width={40} height={40} />
                </div>
                <span className="text-xs text-white">Gluten-Free</span>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="w-10 h-10 flex items-center justify-center mb-1">
                  <Image src="/h3.png" alt="h3" width={40} height={40} />
                </div>
                <span className="text-xs text-white">Non-GMO</span>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="w-10 h-10 flex items-center justify-center mb-1">
                  <Image src="/h4.png" alt="h4" width={40} height={40} />
                </div>
                <span className="text-xs text-white">Gelatin-Free</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}