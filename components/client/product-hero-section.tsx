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
  className="w-full relative overflow-hidden p-0 m-0"
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
                  className="bg-white hover:bg-gray-100 text-black text-sm font-bold uppercase tracking-wider px-8 py-3 border-none"
                >
                  تسوق الآن
                </button>
              </Link>
              
              {/* Product features icons */}
              <div className="flex items-center space-x-10 mt-8">
                <div className="flex flex-col items-center text-center">
                  <div className="bg-white p-1 w-8 h-8 flex items-center justify-center mb-1">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M19 14C17.89 14 17 13.1 17 12C17 10.9 17.89 10 19 10C20.11 10 21 10.9 21 12C21 13.1 20.11 14 19 14ZM19 8C16.78 8 15 9.79 15 12C15 14.21 16.78 16 19 16C21.22 16 23 14.21 23 12C23 9.79 21.22 8 19 8ZM15 17.5V19H23V17.5H15ZM7.5 14C5.57 14 4 12.43 4 10.5C4 8.57 5.57 7 7.5 7C9.43 7 11 8.57 11 10.5C11 12.43 9.43 14 7.5 14ZM7.5 5C4.46 5 2 7.46 2 10.5C2 13.54 4.46 16 7.5 16C10.54 16 13 13.54 13 10.5C13 7.46 10.54 5 7.5 5ZM2 17.5V19H13V17.5H2Z" fill="#212121"/>
                    </svg>
                  </div>
                  <span className="text-xs text-white">Vegan</span>
                </div>
                
                <div className="flex flex-col items-center text-center">
                  <div className="bg-white p-1 w-8 h-8 flex items-center justify-center mb-1">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M21 11H3V9H21V11ZM21 13H3V15H21V13Z" fill="#212121"/>
                    </svg>
                  </div>
                  <span className="text-xs text-white">Gluten-Free</span>
                </div>
                
                <div className="flex flex-col items-center text-center">
                  <div className="bg-white p-1 w-8 h-8 flex items-center justify-center mb-1">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M17 14L22 9L20.6 7.6L17 11.2L14.4 8.6L13 10L17 14ZM7 14C9.21 14 11 12.21 11 10C11 7.79 9.21 6 7 6C4.79 6 3 7.79 3 10C3 12.21 4.79 14 7 14ZM7 8C8.1 8 9 8.9 9 10C9 11.1 8.1 12 7 12C5.9 12 5 11.1 5 10C5 8.9 5.9 8 7 8ZM7 15C3.13 15 0 16.34 0 18V20H14V18C14 16.34 10.87 15 7 15Z" fill="#212121"/>
                    </svg>
                  </div>
                  <span className="text-xs text-white">Non-GMO</span>
                </div>
                
                <div className="flex flex-col items-center text-center">
                  <div className="bg-white p-1 w-8 h-8 flex items-center justify-center mb-1">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M18.3 5.71C17.91 5.32 17.28 5.32 16.89 5.71L12 10.59L7.11 5.7C6.72 5.31 6.09 5.31 5.7 5.7C5.31 6.09 5.31 6.72 5.7 7.11L10.59 12L5.7 16.89C5.31 17.28 5.31 17.91 5.7 18.3C6.09 18.69 6.72 18.69 7.11 18.3L12 13.41L16.89 18.3C17.28 18.69 17.91 18.69 18.3 18.3C18.69 17.91 18.69 17.28 18.3 16.89L13.41 12L18.3 7.11C18.68 6.73 18.68 6.09 18.3 5.71Z" fill="#212121"/>
                    </svg>
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
                <div className="bg-white p-1 w-8 h-8 flex items-center justify-center mb-1">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M19 14C17.89 14 17 13.1 17 12C17 10.9 17.89 10 19 10C20.11 10 21 10.9 21 12C21 13.1 20.11 14 19 14ZM19 8C16.78 8 15 9.79 15 12C15 14.21 16.78 16 19 16C21.22 16 23 14.21 23 12C23 9.79 21.22 8 19 8ZM15 17.5V19H23V17.5H15ZM7.5 14C5.57 14 4 12.43 4 10.5C4 8.57 5.57 7 7.5 7C9.43 7 11 8.57 11 10.5C11 12.43 9.43 14 7.5 14ZM7.5 5C4.46 5 2 7.46 2 10.5C2 13.54 4.46 16 7.5 16C10.54 16 13 13.54 13 10.5C13 7.46 10.54 5 7.5 5ZM2 17.5V19H13V17.5H2Z" fill="#212121"/>
                  </svg>
                </div>
                <span className="text-xs text-white">Vegan</span>
              </div>
                
              <div className="flex flex-col items-center text-center">
                <div className="bg-white p-1 w-8 h-8 flex items-center justify-center mb-1">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M21 11H3V9H21V11ZM21 13H3V15H21V13Z" fill="#212121"/>
                  </svg>
                </div>
                <span className="text-xs text-white">Gluten-Free</span>
              </div>
                
              <div className="flex flex-col items-center text-center">
                <div className="bg-white p-1 w-8 h-8 flex items-center justify-center mb-1">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M17 14L22 9L20.6 7.6L17 11.2L14.4 8.6L13 10L17 14ZM7 14C9.21 14 11 12.21 11 10C11 7.79 9.21 6 7 6C4.79 6 3 7.79 3 10C3 12.21 4.79 14 7 14ZM7 8C8.1 8 9 8.9 9 10C9 11.1 8.1 12 7 12C5.9 12 5 11.1 5 10C5 8.9 5.9 8 7 8ZM7 15C3.13 15 0 16.34 0 18V20H14V18C14 16.34 10.87 15 7 15Z" fill="#212121"/>
                  </svg>
                </div>
                <span className="text-xs text-white">Non-GMO</span>
              </div>
                
              <div className="flex flex-col items-center text-center">
                <div className="bg-white p-1 w-8 h-8 flex items-center justify-center mb-1">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M18.3 5.71C17.91 5.32 17.28 5.32 16.89 5.71L12 10.59L7.11 5.7C6.72 5.31 6.09 5.31 5.7 5.7C5.31 6.09 5.31 6.72 5.7 7.11L10.59 12L5.7 16.89C5.31 17.28 5.31 17.91 5.7 18.3C6.09 18.69 6.72 18.69 7.11 18.3L12 13.41L16.89 18.3C17.28 18.69 17.91 18.69 18.3 18.3C18.69 17.91 18.69 17.28 18.3 16.89L13.41 12L18.3 7.11C18.68 6.73 18.68 6.09 18.3 5.71Z" fill="#212121"/>
                  </svg>
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