"use client"

import { motion } from "framer-motion"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState, useEffect, useRef } from "react"
import Image from "next/image"

// Importer les données produits réelles depuis la page produit (copier ici pour liaison)
const productsData = [
  {
    id: 1,
    name: "علكة خل التفاح",
    productColor: {
      main: "#AE3131",
      light: "#D15858",
      dark: "#8C1E1E",
      contrastText: "#FFFFFF"
    },
    homeImage1: "/goli1.png",
    basicInfo: {
      description: "أول علكة خل تفاح في العالم بطعم لذيذ وفوائد صحية متعددة.",
      category: "مكمل غذائي",
      price: 17.39
    }
  },
  {
    id: 2,
    name: "بروتين مصل اللبن المميز",
    productColor: {
      main: "#0088CC",
      light: "#4AAFDF",
      dark: "#006699",
      contrastText: "#FFFFFF"
    },
    homeImage1: "/goli2.png",
    basicInfo: {
      description: "أول علكة خل تفاح في العالم بطعم لذيذ وفوائد صحية متعددة.",
      category: "مكمل غذائي",
      price: 17.39
    }
  },
  {
    id: 3,
     name: "بروتيبن EXTRA-STRENGTH SLEEP",
   productColor: {
      main: "#7a30cfff",
      light: "#52255bff",
      dark: "#2a0d3eff",
      contrastText: "#FFFFFF"
    },
    homeImage1: "/goli3.png",
    basicInfo: {
      description: "أول علكة خل تفاح في العالم بطعم لذيذ وفوائد صحية متعددة.",
      category: "مكمل غذائي",
      price: 17.39
    }
  }
]

// Utilitaire pour générer la couleur de fond à partir du code couleur produit
function getBgStyle(color: string) {
  return { background: color }
}

// Générer les cartes à partir des produits réels
const productCards = productsData.map((p) => ({
  id: p.id,
  title: p.name,
  description: p.basicInfo.description,
  buttonText: "عرض التفاصيل",
  image: p.homeImage1,
  backgroundColor: p.productColor.main,
  textColor: p.productColor.contrastText,
}))

export default function ProductCarouselSection() {
  const carouselRef = useRef<HTMLDivElement>(null)
  const [activeIndex, setActiveIndex] = useState(1) // Centre card is active by default
  const [isDragging, setIsDragging] = useState(false)
  const [startX, setStartX] = useState(0)
  const [scrollLeft, setScrollLeft] = useState(0)
  const [isAutoScrolling, setIsAutoScrolling] = useState(true)
  const [direction, setDirection] = useState<'left' | 'right'>('right')
  const [scrollProgress, setScrollProgress] = useState(0)
  const [transitioning, setTransitioning] = useState(false)
  
  // Pour créer un effet de défilement infini, nous dupliquons les cartes
  // Pour assurer une rotation fluide, nous créons un tableau plus long avec répétition
  const extendedCards = [...productCards, ...productCards, ...productCards]
  
  // Change de slide avec animation et met à jour l'index actif
  const changeSlide = (direction: 'prev' | 'next') => {
    if (transitioning) return
    
    setTransitioning(true)
    
    let newIndex = direction === 'next' 
      ? (activeIndex + 1) % productCards.length
      : (activeIndex - 1 + productCards.length) % productCards.length
    
    // Animation de transition plus prononcée
    setScrollProgress(direction === 'next' ? -25 : 25)
    
    // Après un court délai pour permettre l'animation, changer l'index
    setTimeout(() => {
      setActiveIndex(newIndex)
      // Utiliser requestAnimationFrame pour une animation plus fluide
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setScrollProgress(0)
          setTimeout(() => {
            setTransitioning(false)
          }, 150)
        })
      })
    }, 250)
  }
  
  // Navigation functions
  const nextSlide = () => {
    if (transitioning) return
    setDirection('right')
    changeSlide('next')
  }
  
  const prevSlide = () => {
    if (transitioning) return
    setDirection('left')
    changeSlide('prev')
  }
  
  // Auto-scroll avec rotation continue
  useEffect(() => {
    if (isDragging || !isAutoScrolling || transitioning) return
    
    const interval = setInterval(() => {
      nextSlide()
    }, 5000) // Change card every 5 seconds
    
    return () => clearInterval(interval)
  }, [activeIndex, isDragging, isAutoScrolling, transitioning])
  
  // Mouse/touch event handlers for dragging
  const handleMouseDown = (e: React.MouseEvent) => {
    if (transitioning) return
    setIsDragging(true)
    setStartX(e.pageX)
    setIsAutoScrolling(false)
  }
  
  const handleTouchStart = (e: React.TouchEvent) => {
    if (transitioning) return
    setIsDragging(true)
    setStartX(e.touches[0].pageX)
    setIsAutoScrolling(false)
  }
  
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || transitioning) return
    e.preventDefault()
    
    const x = e.pageX
    const diff = startX - x
    
    // Visualisation du défilement pendant le drag
    setScrollProgress(diff * 0.15) // Facteur pour contrôler la sensibilité
    
    // Change slide based on drag distance
    if (Math.abs(diff) > 60) {
      if (diff > 0) {
        setDirection('right')
        nextSlide()
      } else {
        setDirection('left')
        prevSlide()
      }
      setIsDragging(false)
    }
  }
  
  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || transitioning) return
    
    const x = e.touches[0].pageX
    const diff = startX - x
    
    // Visualisation du défilement pendant le drag
    setScrollProgress(diff * 0.15)
    
    // Change slide based on drag distance
    if (Math.abs(diff) > 60) {
      if (diff > 0) {
        setDirection('right')
        nextSlide()
      } else {
        setDirection('left')
        prevSlide()
      }
      setIsDragging(false)
    }
  }
  
  const handleDragEnd = () => {
    setIsDragging(false)
    setScrollProgress(0)
    setIsAutoScrolling(true)
  }

  // Calcule les indices pour les cartes, avec l'active au centre
  // Correction pour éviter la répétition de la même carte à gauche et à droite si seulement 2 produits
  const getCardIndices = () => {
    if (productCards.length === 2) {
      return {
        left: (activeIndex === 0 ? 1 : 0),
        active: activeIndex,
        right: (activeIndex === 0 ? 1 : 0)
      }
    }
    return {
      left: (activeIndex - 1 + productCards.length) % productCards.length,
      active: activeIndex,
      right: (activeIndex + 1) % productCards.length
    }
  }

  const indices = getCardIndices()

  return (
  <section className="py-0 md:py-0 bg-white overflow-hidden w-full pt-0 mt-0">
  <div className="w-full px-3 md:px-6 max-w-[90rem] mx-auto pt-0 mt-0 py-0">
         
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-black text-gray-900 mb-4 md:mb-6 text-center w-full mt-0 pt-0 flex items-center justify-center" style={{lineHeight: '1.1'}}>
            <span style={{marginLeft: '12px'}}>اكتشف</span>
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent" style={{marginRight: '12px'}}>
              منتجاتنا
            </span>
          </h2>
        {/* Nouvelle mise en page du carrousel avec cartes alignées horizontalement */}
        <div 
          className="relative w-full mx-auto"
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleDragEnd}
          onMouseLeave={handleDragEnd}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleDragEnd}
        >
          {/* Conteneur des cartes sur une ligne avec effet de défilement */}
          <div 
            className="flex justify-center items-center relative"
            id="product-carousel"
            ref={carouselRef}
          >
            {/* Carte de gauche */}
            <div
              className="relative scale-75 opacity-80"
              onClick={() => !transitioning && setActiveIndex(indices.left)}
            >
              <div
                className="rounded-2xl overflow-hidden shadow-xl cursor-pointer h-[220px] sm:h-[250px] md:h-[270px] w-[260px] sm:w-[320px] md:w-[380px] lg:w-[420px] flex flex-row items-stretch"
                style={getBgStyle(productCards[indices.left].backgroundColor)}
              >
                <div className="flex flex-col justify-center w-2/3 p-3 gap-2">
                  <h3 className="text-base font-bold text-right w-full" style={{color: productCards[indices.left].textColor}}>{productCards[indices.left].title}</h3>
                  <p className="text-xs text-right w-full line-clamp-2" style={{color: productCards[indices.left].textColor, opacity: 0.9}}>{productCards[indices.left].description}</p>
                  <Button
                    className="bg-black/80 hover:bg-black text-white px-3 py-1 text-xs rounded-full w-2/3 mt-2 self-start cursor-pointer"
                    onClick={() => {
                      window.location.href = `/products/${productCards[indices.left].id}`
                    }}
                  >
                    {productCards[indices.left].buttonText}
                  </Button>
                </div>
                <div className="flex items-center justify-center w-1/3 p-2">
                  <Image
                    src={productCards[indices.left].image}
                    alt={productCards[indices.left].title}
                    width={80}
                    height={80}
                    className="object-contain drop-shadow-lg mx-auto"
                  />
                </div>
              </div>
            </div>
            
            
            {/* Carte centrale (active) - plus grande que les autres */}
            <div
              className="relative z-20"
              key={activeIndex}
            >
              <div
                className="rounded-2xl overflow-hidden shadow-2xl h-[250px] sm:h-[290px] md:h-[320px] w-[300px] sm:w-[400px] md:w-[520px] lg:w-[600px] flex flex-row items-stretch transition-all duration-300"
                style={getBgStyle(productCards[indices.active].backgroundColor)}
              >
                <div className="flex flex-col justify-center w-2/3 p-6 gap-3">
                  <h3 className="text-lg md:text-2xl font-bold text-right w-full" style={{color: productCards[indices.active].textColor}}>{productCards[indices.active].title}</h3>
                  <p className="text-sm md:text-base text-right w-full line-clamp-3" style={{color: productCards[indices.active].textColor, opacity: 0.9}}>{productCards[indices.active].description}</p>
                  <Button
                    className="bg-black/80 hover:bg-black text-white px-4 py-2 text-sm md:text-base font-medium rounded-full w-2/3 mt-3 group self-start cursor-pointer"
                    onClick={() => {
                      window.location.href = `/products/${productCards[indices.active].id}`
                    }}
                  >
                    {productCards[indices.active].buttonText}
                    <ChevronRight className="ml-1 w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </Button>
                </div>
                <div className="flex items-center justify-center w-1/3 p-2">
                  <Image
                    src={productCards[indices.active].image}
                    alt={productCards[indices.active].title}
                    width={110}
                    height={110}
                    className="object-contain drop-shadow-xl mx-auto"
                  />
                </div>
              </div>
            </div>
            
            {/* Carte de droite */}
            <div
              className="relative scale-75 opacity-80"
              onClick={() => !transitioning && setActiveIndex(indices.right)}
            >
              <div
                className="rounded-2xl overflow-hidden shadow-xl cursor-pointer h-[220px] sm:h-[250px] md:h-[270px] w-[260px] sm:w-[320px] md:w-[380px] lg:w-[420px] flex flex-row items-stretch"
                style={getBgStyle(productCards[indices.right].backgroundColor)}
              >
                <div className="flex flex-col justify-center w-2/3 p-3 gap-2">
                  <h3 className="text-base font-bold text-right w-full" style={{color: productCards[indices.right].textColor}}>{productCards[indices.right].title}</h3>
                  <p className="text-xs text-right w-full line-clamp-2" style={{color: productCards[indices.right].textColor, opacity: 0.9}}>{productCards[indices.right].description}</p>
                  <Button
                    className="bg-black/80 hover:bg-black text-white px-3 py-1 text-xs rounded-full w-2/3 mt-2 self-start cursor-pointer"
                    onClick={() => {
                      window.location.href = `/products/${productCards[indices.right].id}`
                    }}
                  >
                    {productCards[indices.right].buttonText}
                  </Button>
                </div>
                <div className="flex items-center justify-center w-1/3 p-2">
                  <Image
                    src={productCards[indices.right].image}
                    alt={productCards[indices.right].title}
                    width={80}
                    height={80}
                    className="object-contain drop-shadow-lg mx-auto"
                  />
                </div>
              </div>
            </div>
          </div>
          
          {/* Contrôles de navigation sous forme de flèches */}
          <div className="hidden md:flex justify-between items-center max-w-6xl mx-auto mt-6">
            <button
              onClick={prevSlide}
              className="bg-gray-100 hover:bg-gray-200 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 disabled:opacity-50"
              aria-label="Previous"
              disabled={transitioning}
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            
            {/* Indicateurs de position */}
            <div className="flex justify-center items-center space-x-3 flex-grow">
              {productCards.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => !transitioning && setActiveIndex(idx)}
                  className={`transition-all duration-300 ${
                    idx === activeIndex 
                      ? "bg-gray-800 w-3 h-3 rounded-full" 
                      : "bg-gray-300 w-2 h-2 rounded-full"
                  }`}
                  aria-label={`Slide ${idx + 1}`}
                  disabled={transitioning}
                />
              ))}
            </div>
            
            <button
              onClick={nextSlide}
              className="bg-gray-100 hover:bg-gray-200 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 disabled:opacity-50"
              aria-label="Next"
              disabled={transitioning}
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
          
          {/* Navigation mobile */}
          <div className="md:hidden flex justify-center mt-6 space-x-2">
            {productCards.map((_, idx) => (
              <button
                key={idx}
                onClick={() => !transitioning && setActiveIndex(idx)}
                className={`transition-all duration-300 ${
                  idx === activeIndex 
                    ? "bg-gray-800 w-3 h-3 rounded-full" 
                    : "bg-gray-300 w-2 h-2 rounded-full"
                }`}
                aria-label={`Slide ${idx + 1}`}
                disabled={transitioning}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}