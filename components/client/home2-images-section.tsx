"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { colors } from "@/lib/colors"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { useState } from "react"

const featuredProducts = [
  {
    id: 1,
    name: "Women's Complete Multi Gummies",
    homeImage2: "/protein-powder-assortment.png",
    description: "Protéine whey premium de haute qualité pour maximiser la croissance musculaire et accélérer la récupération post-entraînement.",
    gradient: "from-pink-500 to-pink-600",
    benefits: ["STRONG BONES", "TEETH & MUSCLES"],
    badge: "A HEALTHY IMMUNE SYSTEM"
  },
  {
    id: 2,
    name: "Triple Action Immune Gummies",
    homeImage2: "/creatine-supplement.jpg",
    description: "A delicious Blackberry Strawberry lemonade flavor, made with a powerful blend of Vitamins C & D combined with Zinc to help:",
    gradient: "from-orange-500 to-red-500",
    benefits: ["PROVIDE ADDED ANTIOXIDANT BENEFITS", "OVERALL GOOD HEALTH"],
    badge: "SUPPORT A HEALTHY IMMUNE SYSTEM"
  },
  {
    id: 3,
    name: "Supergreens Gummies",
    homeImage2: "/muscular-athlete-holding-protein-supplement-bottle.jpg",
    description: "Our delicious Supergreens are made with a unique blend of key vitamins, minerals and nutrients to help support:",
    gradient: "from-green-500 to-green-600",
    benefits: ["DIGESTIVE HEALTH FUNCTION"],
    badge: "Health from Within."
  }
]

export default function Home2ImagesSection() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const totalSlides = featuredProducts.length

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides)
  }

  const goToSlide = (index: number) => {
    setCurrentSlide(index)
  }

  return (
    <section className="w-full py-20 bg-gradient-to-br from-gray-50 via-white to-gray-100 overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Titre */}
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center text-4xl lg:text-6xl font-bold mb-16" 
          style={{ color: colors.text.primary }}
        >
          Say Hello to Goli®
        </motion.h2>

        {/* Carrousel moderne */}
        <div className="relative max-w-4xl mx-auto">
          <div className="overflow-hidden rounded-3xl">
            <motion.div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {featuredProducts.map((product, index) => (
                <div key={product.id} className="w-full flex-shrink-0 px-4">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className={`relative h-[500px] lg:h-[400px] rounded-3xl overflow-hidden shadow-2xl bg-gradient-to-br ${product.gradient} p-8 lg:p-12 text-white`}
                  >
                    {/* Contenu principal */}
                    <div className="flex flex-col lg:flex-row items-center justify-between h-full">
                      {/* Section texte */}
                      <div className="flex-1 space-y-6 lg:pr-8">
                        <div>
                          <h3 className="text-3xl lg:text-4xl font-bold mb-4">
                            {product.name}
                          </h3>
                          <p className="text-white/90 text-lg leading-relaxed mb-6">
                            {product.description}
                          </p>
                        </div>

                        {/* Bénéfices */}
                        <div className="space-y-3">
                          {product.benefits.map((benefit, idx) => (
                            <div key={idx} className="flex items-center space-x-3">
                              <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center">
                                <div className="w-2 h-2 rounded-full bg-white"></div>
                              </div>
                              <span className="font-semibold text-sm uppercase tracking-wide">
                                {benefit}
                              </span>
                            </div>
                          ))}
                        </div>

                        {/* Badge */}
                        <div className="inline-block px-4 py-2 bg-white/20 rounded-full">
                          <span className="font-semibold text-sm">
                            {product.badge}
                          </span>
                        </div>

                        {/* Bouton */}
                        <Button
                          className="px-8 py-4 bg-black text-white font-bold uppercase tracking-wide rounded-lg hover:bg-gray-900 transition-all duration-300 hover:scale-105 shadow-lg"
                        >
                          EXPLORE →
                        </Button>
                      </div>

                      {/* Section image */}
                      <div className="flex-shrink-0 relative">
                        <div className="relative w-64 h-64 lg:w-80 lg:h-80">
                          <div className="absolute inset-0 bg-white/10 rounded-full"></div>
                          <Image
                            src={product.homeImage2}
                            alt={product.name}
                            fill
                            className="object-contain p-8 drop-shadow-2xl"
                          />
                          
                          {/* Icône de validation */}
                          <div className="absolute -top-4 -right-4 w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-lg">
                            <div className="w-8 h-8 bg-current rounded-full flex items-center justify-center text-white">
                              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                              </svg>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Boutons de navigation */}
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center hover:scale-110 transition-all duration-300 z-10"
          >
            <ChevronLeft className="w-6 h-6 text-gray-600" />
          </button>

          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center hover:scale-110 transition-all duration-300 z-10"
          >
            <ChevronRight className="w-6 h-6 text-gray-600" />
          </button>

          {/* Indicateurs de pagination */}
          <div className="flex justify-center mt-8 space-x-2">
            {featuredProducts.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentSlide
                    ? 'bg-gray-800 w-8'
                    : 'bg-gray-400 hover:bg-gray-600'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
