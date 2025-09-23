"use client"

import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"
import { motion } from "framer-motion"
import { useState } from "react"

interface Ingredient {
  name: string
  image: string
  description: string
}

interface ProductIngredientsSectionProps {
  ingredients: Ingredient[]
  productColor?: {
    main: string   // Couleur principale du produit
    light: string  // Version plus claire
    dark: string   // Version plus foncée
    contrastText: string // Texte contrasté qui se lit bien sur la couleur principale
  }
}

export default function ProductIngredientsSection({ 
  ingredients,
  productColor = {
    main: "#7C3AED",      // Violet par défaut
    light: "#9F67FF",     // Version plus claire
    dark: "#5B21B6",      // Version plus foncée
    contrastText: "#FFFFFF" // Texte blanc pour contraste
  }
}: ProductIngredientsSectionProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { y: 60, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { duration: 0.8 }
    }
  }

  return (
    <section className="w-full py-24" style={{
      background: `linear-gradient(to bottom right, #f9fafb, white, ${productColor.light}0D)`
    }}>
      <div className="container mx-auto px-4">
        
        {/* Header minimaliste */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <motion.h2 
            className="text-5xl lg:text-6xl font-light text-gray-900 mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Pure
            <span className="font-bold bg-clip-text text-transparent" style={{ 
              backgroundImage: `linear-gradient(to right, ${productColor.main}, ${productColor.light})` 
            }}> Ingredients</span>
          </motion.h2>
          <motion.p 
            className="text-xl text-gray-500 max-w-2xl mx-auto font-light"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Découvrez la puissance de la nature dans chaque composant
          </motion.p>
        </motion.div>

        {/* Grid des ingrédients - Design ultra-moderne */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto"
        >
          {ingredients.map((ingredient, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ y: -10 }}
              onHoverStart={() => setHoveredIndex(index)}
              onHoverEnd={() => setHoveredIndex(null)}
              className="group relative"
            >
              <Card className="relative overflow-hidden border-0 bg-white/70 backdrop-blur-sm shadow-xl hover:shadow-2xl transition-all duration-700 rounded-3xl">
                {/* Gradient background animé */}
                <motion.div 
                  className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${
                    `bg-gradient-to-br from-${productColor.light}33 to-${productColor.main}33`
                  }`}
                  layoutId={`bg-${index}`}
                />

                <CardContent className="p-0 relative">
                  {/* Section image */}
                  <div className="relative h-64 flex items-center justify-center p-8 overflow-hidden">
                    {/* Cercles décoratifs */}
                    <motion.div 
                      className="absolute top-4 right-4 w-12 h-12 rounded-full opacity-60"
                      style={{ 
                        background: `linear-gradient(to right, ${productColor.light}33, ${productColor.main}33)` 
                      }}
                      animate={{ 
                        scale: hoveredIndex === index ? [1, 1.2, 1] : 1,
                        rotate: hoveredIndex === index ? 360 : 0
                      }}
                      transition={{ duration: 2, repeat: hoveredIndex === index ? Infinity : 0 }}
                    />
                    <motion.div 
                      className="absolute bottom-4 left-4 w-8 h-8 rounded-full opacity-60"
                      style={{ 
                        background: `linear-gradient(to right, ${productColor.main}33, ${productColor.dark}33)` 
                      }}
                      animate={{ 
                        scale: hoveredIndex === index ? [1, 1.3, 1] : 1
                      }}
                      transition={{ duration: 1.5, repeat: hoveredIndex === index ? Infinity : 0 }}
                    />

                    {/* Image de l'ingrédient */}
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ type: "spring", stiffness: 300, damping: 20 }}
                      className="relative z-10"
                    >
                      <Image
                        src={ingredient.image}
                        alt={ingredient.name}
                        width={200}
                        height={160}
                        className="object-contain w-full h-32 drop-shadow-2xl"
                      />
                    </motion.div>

                    {/* Effet de glow au hover */}
                    <motion.div 
                      className="absolute inset-0 blur-2xl opacity-0 group-hover:opacity-30 transition-opacity duration-500"
                      style={{ backgroundColor: productColor.light }}
                      animate={{
                        scale: hoveredIndex === index ? [1, 1.2, 1] : 1
                      }}
                      transition={{ duration: 2, repeat: hoveredIndex === index ? Infinity : 0 }}
                    />
                  </div>

                  {/* Contenu textuel */}
                  <div className="px-8 pb-8">
                    <motion.h3 
                      className="text-2xl font-bold text-gray-900 mb-4 text-center"
                      whileHover={{ scale: 1.05 }}
                      transition={{ type: "spring", stiffness: 400 }}
                    >
                      {ingredient.name}
                    </motion.h3>
                    
                    <motion.p 
                      className="text-gray-600 leading-relaxed text-center text-sm"
                      initial={{ opacity: 0.8 }}
                      whileHover={{ opacity: 1 }}
                    >
                      {ingredient.description}
                    </motion.p>
                  </div>

                  {/* Ligne d'accent en bas */}
                  <motion.div 
                    className="absolute bottom-0 left-0 right-0 h-1"
                    style={{ 
                      background: `linear-gradient(to right, ${productColor.main}, ${productColor.light})` 
                    }}
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: index * 0.2 }}
                  />
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

       
      </div>
    </section>
  )
}