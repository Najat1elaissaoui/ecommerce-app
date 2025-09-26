"use client"

import { motion } from "framer-motion"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState, useEffect, useRef } from "react"
import Image from "next/image"

interface ProductCard {
  id: number
  title: string
  subtitle: string
  description: string
  features: string[]
  buttonText: string
  image: string
  backgroundColor: string
  textColor: string
}

const productCards: ProductCard[] = [
  {
    id: 1,
    title: "حلوى النوم الهانئ",
    subtitle: "Say Hello to Goli®",
    description: "مصنوعة من المغنيسيوم وبلسم الليمون وفيتامين د، بالإضافة إلى الجرعة المثالية من الميلاتونين لمساعدتك:",
    features: [
      "نم بشكل أفضل وأطول",
      "ادعم دورة نوم صحية", 
      "استيقظ منتعشاً ومرتاحاً",
      "ابق نائماً لفترة أطول"
    ],
    buttonText: "استكشف",
    image: "/protein-powder-assortment.png",
    backgroundColor: "bg-gradient-to-br from-purple-600 to-purple-800",
    textColor: "text-white"
  },
  {
    id: 2,
    title: "حلوى متعددة الفيتامينات",
    subtitle: "Say Hello to Goli®",
    description: "كاملة مع جميع الفيتامينات الأساسية الـ 13 للمساعدة في دعم:",
    features: [
      "شعر وبشرة وأظافر صحية",
      "أسنان وعظام قوية",
      "نظام مناعي صحي"
    ],
    buttonText: "استكشف",
    image: "/creatine-supplement.jpg",
    backgroundColor: "bg-gradient-to-br from-pink-500 to-pink-700",
    textColor: "text-white"
  },
  {
    id: 3,
    title: "حلوى البريبيوتيك والبروبيوتيك",
    subtitle: "Say Hello to Goli®",
    description: "تركيبتنا عالمية المستوى تجمع بين البريبيوتكس والبروبيوتكس والبوستبيوتكس للمساعدة في:",
    features: [
      "دعم صحة الجهاز الهضمي",
      "تحسين التوازن البكتيري",
      "تعزيز جهاز المناعة",
      "دعم الأداء العام"
    ],
    buttonText: "استكشف",
    image: "/muscular-athlete-holding-protein-supplement-bottle.jpg",
    backgroundColor: "bg-gradient-to-br from-teal-500 to-teal-700",
    textColor: "text-white"
  },
  {
    id: 4,
    title: "حلوى فيتامين سي",
    subtitle: "Say Hello to Goli®",
    description: "غنية بفيتامين سي والمواد المضادة للأكسدة للمساعدة في:",
    features: [
      "تعزيز المناعة",
      "تحسين صحة البشرة",
      "مكافحة الإجهاد التأكسدي",
      "دعم الصحة العامة"
    ],
    buttonText: "استكشف",
    image: "/arab-female-athlete.jpg",
    backgroundColor: "bg-gradient-to-br from-orange-500 to-orange-700",
    textColor: "text-white"
  },
  {
    id: 5,
    title: "حلوى أوميغا 3",
    subtitle: "Say Hello to Goli®",
    description: "مكمل غذائي يحتوي على أحماض أوميغا 3 الدهنية للمساعدة في:",
    features: [
      "دعم صحة القلب",
      "تحسين وظائف الدماغ",
      "تعزيز صحة العين",
      "تقليل الالتهابات"
    ],
    buttonText: "استكشف",
    image: "/arab-male-fitness-trainer.jpg",
    backgroundColor: "bg-gradient-to-br from-blue-500 to-blue-700",
    textColor: "text-white"
  }
]

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
  const getCardIndices = () => {
    return {
      left: (activeIndex - 1 + productCards.length) % productCards.length,
      active: activeIndex,
      right: (activeIndex + 1) % productCards.length
    }
  }

  const indices = getCardIndices()

  return (
    <section className="py-8 md:py-12 bg-white overflow-hidden w-full pt-0">
      <div className="w-full px-3 md:px-6 max-w-[90rem] mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-4 md:mb-8">اكتشف منتجاتنا</h2>
        
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
                className={`${productCards[indices.left].backgroundColor} rounded-2xl overflow-hidden shadow-xl cursor-pointer h-[220px] sm:h-[250px] md:h-[270px] w-[260px] sm:w-[320px] md:w-[380px] lg:w-[420px] flex flex-row items-stretch`}
              >
                <div className="flex flex-col justify-center w-2/3 p-3 gap-2">
                  <h3 className="text-white text-base font-bold text-right w-full">{productCards[indices.left].title}</h3>
                  <p className="text-white/90 text-xs text-right w-full line-clamp-2">{productCards[indices.left].description}</p>
                  <Button
                    className="bg-black/80 hover:bg-black text-white px-3 py-1 text-xs rounded-full w-2/3 mt-2 self-start cursor-pointer"
                    onClick={() => {
                      window.location.href = `/products/${productCards[indices.left].id}?color=${encodeURIComponent(productCards[indices.left].backgroundColor)}&image=${encodeURIComponent(productCards[indices.left].image)}&title=${encodeURIComponent(productCards[indices.left].title)}&description=${encodeURIComponent(productCards[indices.left].description)}`
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
                className={`${productCards[indices.active].backgroundColor} rounded-2xl overflow-hidden shadow-2xl h-[250px] sm:h-[290px] md:h-[320px] w-[300px] sm:w-[400px] md:w-[520px] lg:w-[600px] flex flex-row items-stretch transition-all duration-300`}
              >
                <div className="flex flex-col justify-center w-2/3 p-6 gap-3">
                  <h3 className="text-white text-lg md:text-2xl font-bold text-right w-full">{productCards[indices.active].title}</h3>
                  <p className="text-white/90 text-sm md:text-base text-right w-full line-clamp-3">{productCards[indices.active].description}</p>
                  <Button
                    className="bg-black/80 hover:bg-black text-white px-4 py-2 text-sm md:text-base font-medium rounded-full w-2/3 mt-3 group self-start cursor-pointer"
                    onClick={() => {
                      window.location.href = `/products/${productCards[indices.active].id}?color=${encodeURIComponent(productCards[indices.active].backgroundColor)}&image=${encodeURIComponent(productCards[indices.active].image)}&title=${encodeURIComponent(productCards[indices.active].title)}&description=${encodeURIComponent(productCards[indices.active].description)}`
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
                className={`${productCards[indices.right].backgroundColor} rounded-2xl overflow-hidden shadow-xl cursor-pointer h-[220px] sm:h-[250px] md:h-[270px] w-[260px] sm:w-[320px] md:w-[380px] lg:w-[420px] flex flex-row items-stretch`}
              >
                <div className="flex flex-col justify-center w-2/3 p-3 gap-2">
                  <h3 className="text-white text-base font-bold text-right w-full">{productCards[indices.right].title}</h3>
                  <p className="text-white/90 text-xs text-right w-full line-clamp-2">{productCards[indices.right].description}</p>
                  <Button
                    className="bg-black/80 hover:bg-black text-white px-3 py-1 text-xs rounded-full w-2/3 mt-2 self-start cursor-pointer"
                    onClick={() => {
                      window.location.href = `/products/${productCards[indices.right].id}?color=${encodeURIComponent(productCards[indices.right].backgroundColor)}&image=${encodeURIComponent(productCards[indices.right].image)}&title=${encodeURIComponent(productCards[indices.right].title)}&description=${encodeURIComponent(productCards[indices.right].description)}`
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