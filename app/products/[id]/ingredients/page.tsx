"use client"
import { useState, useEffect } from "react"
import { notFound } from 'next/navigation'
import Header from '@/components/client/header'
import Footer from '@/components/client/footer'
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowLeft, ChevronRight, Search, Leaf } from "lucide-react"

// Type pour les données produit
interface ProductData {
  id: number
  name: string
  productColor?: {
    main: string   
    light: string  
    dark: string   
    contrastText: string
  }
  ingredients: Array<{
    name: string
    image: string
    description: string
  }>
  // Autres champs nécessaires
  basicInfo: {
    category: string
  }
}

// Données pour plusieurs produits - même structure que dans le fichier page.tsx principal
const sampleProductData: ProductData = {
  id: 1,
  name: "Apple Cider Vinegar Gummies",
  productColor: {
    main: "#AE3131",
    light: "#D15858",
    dark: "#8C1E1E",
    contrastText: "#FFFFFF"
  },
  basicInfo: {
    category: "Wellness",
  },
  ingredients: [
    {
      name: "Apple Cider Vinegar",
      image: "/creatine-supplement.jpg",
      description: "Fresh, real apples are crushed and juiced to produce what is called a cider. The apple cider undergoes a unique fermentation process to create Apple Cider Vinegar."
    },
    {
      name: "Beetroot", 
      image: "/creatine-supplement.jpg",
      description: "The vibrant color and distinctive flavor of beetroots enhance the appearance and flavor profile of delicious Goli ACV Gummies."
    },
    {
      name: "Pomegranate",
      image: "/creatine-supplement.jpg", 
      description: "The rich color and unique flavor of pomegranate help give Goli ACV Gummies their signature red appearance and delicious taste."
    }
  ],
}

const productsData: Record<string, ProductData> = {
  "1": sampleProductData,
  "2": {
    ...sampleProductData,
    id: 2,
    name: "Whey Protein Powder",
    productColor: {
      main: "#0088CC",
      light: "#4AAFDF",
      dark: "#006699",
      contrastText: "#FFFFFF"
    },
    basicInfo: {
      category: "Protein",
    },
  },
  "3": {
    ...sampleProductData,
    id: 3,
    name: "Creatine Monohydrate",
    productColor: {
      main: "#7851A9",
      light: "#9B7AC5",
      dark: "#5A3D81",
      contrastText: "#FFFFFF"
    },
    basicInfo: {
      category: "Performance",
    },
  },
  "4": {
    ...sampleProductData,
    id: 4,
    name: "Multi-Vitamin Complex",
    productColor: {
      main: "#FF8C00",
      light: "#FFAA42",
      dark: "#D97700",
      contrastText: "#FFFFFF"
    },
    basicInfo: {
      category: "Wellness",
    },
  },
  "5": {
    ...sampleProductData,
    id: 5,
    name: "Omega-3 Fish Oil",
    productColor: {
      main: "#00A86B",
      light: "#35C992",
      dark: "#008554",
      contrastText: "#FFFFFF"
    },
    basicInfo: {
      category: "Wellness",
    },
  }
}

async function getProductData(id: string): Promise<ProductData | null> {
  // Simulation d'une requête API
  return productsData[id] || null
}

interface Props {
  params: { id: string }
}

export default async function ProductIngredientsPage({ params }: Props) {
  const product = await getProductData(params.id)
  
  if (!product) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        {/* En-tête de la page avec navigation */}
        <ProductIngredientsHeader 
          product={product}
        />
        
        {/* Contenu principal */}
        <ProductIngredientsContent 
          product={product}
        />

        {/* Section des bénéfices des ingrédients */}
        <ProductIngredientsBenefits 
          product={product}
        />
      </main>
      <Footer />
    </div>
  )
}

// Composant pour l'en-tête de la page avec navigation
function ProductIngredientsHeader({ product }: { product: ProductData }) {
  const productColor = product.productColor || {
    main: "#7C3AED",
    light: "#9F67FF",
    dark: "#5B21B6",
    contrastText: "#FFFFFF"
  }

  return (
    <section className="relative py-12" style={{
      background: `linear-gradient(to bottom, ${productColor.main}, ${productColor.dark})`
    }}>
      <div className="container mx-auto px-4">
        {/* Breadcrumb et retour */}
        <div className="flex justify-between items-center mb-6">
          <Link href={`/products/${product.id}`} className="flex items-center text-white/90 hover:text-white transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" />
            <span>Retour au produit</span>
          </Link>
          <div className="text-white/90 text-sm flex items-center">
            <Link href="/" className="hover:text-white">Accueil</Link>
            <ChevronRight className="w-3 h-3 mx-1" />
            <Link href="/products" className="hover:text-white">Produits</Link>
            <ChevronRight className="w-3 h-3 mx-1" />
            <Link href={`/products/${product.id}`} className="hover:text-white">{product.name}</Link>
            <ChevronRight className="w-3 h-3 mx-1" />
            <span>Ingrédients</span>
          </div>
        </div>
        
        {/* Titre et sous-titre */}
        <div className="text-center my-12 text-white">
          <motion.h1 
            className="text-4xl md:text-5xl font-bold mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Ingrédients de {product.name}
          </motion.h1>
          <motion.p 
            className="text-lg md:text-xl max-w-2xl mx-auto text-white/90"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Découvrez les ingrédients premium qui font la qualité de nos produits
          </motion.p>
        </div>

        {/* Recherche d'ingrédients (décoratif) */}
        <motion.div 
          className="max-w-xl mx-auto relative mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="relative">
            <input 
              type="text"
              placeholder="Rechercher un ingrédient..."
              className="w-full py-3 px-6 pr-12 rounded-full text-gray-900 shadow-lg focus:outline-none focus:ring-2"
              style={{ outline: `2px solid ${productColor.light}` }}
            />
            <Search className="absolute top-1/2 right-4 transform -translate-y-1/2 text-gray-400" />
          </div>
        </motion.div>

        {/* Décorations */}
        <div className="absolute top-12 right-12 w-32 h-32 rounded-full blur-3xl" style={{ 
          backgroundColor: `${productColor.light}33`,
          animation: 'pulse 4s infinite' 
        }} />
        <div className="absolute bottom-8 left-16 w-16 h-16 rounded-full blur-2xl" style={{ 
          backgroundColor: `${productColor.light}33`,
          animation: 'pulse 6s infinite' 
        }} />
      </div>
    </section>
  )
}

// Composant principal pour les ingrédients détaillés
function ProductIngredientsContent({ product }: { product: ProductData }) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const [selectedIndex, setSelectedIndex] = useState<number>(0)
  const [isAnimated, setIsAnimated] = useState<boolean>(false)

  const productColor = product.productColor || {
    main: "#7C3AED",
    light: "#9F67FF",
    dark: "#5B21B6",
    contrastText: "#FFFFFF"
  }
  
  // Animation au chargement initial de la page
  useEffect(() => {
    setIsAnimated(true);
  }, []);

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
    <section className="py-20" style={{
      background: `linear-gradient(to bottom right, #f9fafb, white, ${productColor.light}0D)`
    }}>
      <div className="container mx-auto px-4">
        {/* Header section */}
        <div className="text-center mb-16">
          <motion.span 
            className="inline-block text-sm font-medium px-4 py-2 rounded-full mb-4" 
            style={{ 
              color: productColor.main,
              backgroundColor: `${productColor.light}15`
            }}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Leaf className="inline w-4 h-4 mr-1" />
            100% Ingrédients Naturels
          </motion.span>
          <motion.h2 
            className="text-3xl md:text-4xl font-bold mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Composition Détaillée
          </motion.h2>
          <motion.p 
            className="text-gray-600 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Chaque ingrédient est soigneusement sélectionné pour sa pureté exceptionnelle et son efficacité prouvée scientifiquement. Découvrez ci-dessous tous les ingrédients qui composent {product.name}.
          </motion.p>
        </div>

        {/* Grid des ingrédients - Format avancé et détaillé */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start max-w-6xl mx-auto">
          {/* Liste des ingrédients (côté gauche) */}
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-6"
          >
            {product.ingredients.map((ingredient, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ x: 5 }}
                className={`group cursor-pointer p-6 rounded-2xl transition-all duration-300 ${
                  selectedIndex === index 
                    ? 'bg-white shadow-xl border border-gray-100' 
                    : 'hover:bg-white/50'
                }`}
                onClick={() => setSelectedIndex(index)}
              >
                <div className="flex items-center">
                  <motion.div 
                    className="w-16 h-16 rounded-full flex-shrink-0 overflow-hidden flex items-center justify-center"
                    style={{ 
                      backgroundColor: `${productColor.light}20`
                    }}
                    whileHover={{ scale: 1.1 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    <Image
                      src={ingredient.image}
                      alt={ingredient.name}
                      width={40}
                      height={40}
                      className="object-contain"
                    />
                  </motion.div>
                  <div className="ml-6 flex-grow">
                    <h3 
                      className="text-xl font-semibold transition-colors duration-300" 
                      style={{ 
                        color: selectedIndex === index ? productColor.main : 'inherit'
                      }}
                    >
                      {ingredient.name}
                    </h3>
                    <p className="text-sm text-gray-500 line-clamp-1">
                      {ingredient.description}
                    </p>
                  </div>
                  <motion.div 
                    className="w-3 h-3 rounded-full ml-4"
                    animate={{ 
                      scale: selectedIndex === index ? 1 : 0,
                      backgroundColor: productColor.main
                    }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Ingrédient sélectionné en détail (côté droit) */}
          <motion.div
            className="sticky top-24"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Card className="border-0 shadow-xl rounded-3xl overflow-hidden">
              <CardContent className="p-0">
                {/* Image section */}
                <div className="h-64 relative overflow-hidden">
                  <div className="absolute inset-0" style={{ 
                    backgroundColor: `${productColor.light}20`
                  }} />
                  <div className="absolute inset-0 flex items-center justify-center p-8">
                    <motion.div
                      initial={{ scale: 0.9, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      key={selectedIndex} // Pour déclencher l'animation à chaque changement
                      transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    >
                      <Image
                        src={product.ingredients[selectedIndex].image}
                        alt={product.ingredients[selectedIndex].name}
                        width={200}
                        height={200}
                        className="object-contain max-h-48 drop-shadow-xl"
                      />
                    </motion.div>
                  </div>
                  
                  {/* Éléments décoratifs */}
                  <div className="absolute top-4 right-4 w-12 h-12 rounded-full opacity-60" style={{ 
                    background: `linear-gradient(to right, ${productColor.light}33, ${productColor.main}33)` 
                  }} />
                  <div className="absolute bottom-4 left-4 w-8 h-8 rounded-full opacity-60" style={{ 
                    background: `linear-gradient(to right, ${productColor.main}33, ${productColor.dark}33)` 
                  }} />
                </div>
                
                {/* Content section */}
                <div className="p-8">
                  <h3 
                    className="text-2xl font-bold mb-4"
                    style={{ color: productColor.main }}
                  >
                    {product.ingredients[selectedIndex].name}
                  </h3>
                  
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    {product.ingredients[selectedIndex].description}
                  </p>
                  
                  {/* Bénéfices de l'ingrédient (fictifs pour l'exemple) */}
                  <div className="mb-6">
                    <h4 className="font-semibold mb-2 text-gray-900">Bénéfices principaux:</h4>
                    <ul className="space-y-2">
                      <li className="flex items-center">
                        <div className="w-2 h-2 rounded-full mr-3" style={{ backgroundColor: productColor.main }} />
                        <span className="text-gray-600">Soutien du système immunitaire</span>
                      </li>
                      <li className="flex items-center">
                        <div className="w-2 h-2 rounded-full mr-3" style={{ backgroundColor: productColor.main }} />
                        <span className="text-gray-600">Propriétés antioxydantes</span>
                      </li>
                      <li className="flex items-center">
                        <div className="w-2 h-2 rounded-full mr-3" style={{ backgroundColor: productColor.main }} />
                        <span className="text-gray-600">Aide à la digestion naturelle</span>
                      </li>
                    </ul>
                  </div>
                  
                  {/* Étiquettes */}
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1 text-xs rounded-full bg-green-50 text-green-700 border border-green-100">
                      Sans OGM
                    </span>
                    <span className="px-3 py-1 text-xs rounded-full bg-blue-50 text-blue-700 border border-blue-100">
                      Naturel
                    </span>
                    <span className="px-3 py-1 text-xs rounded-full bg-purple-50 text-purple-700 border border-purple-100">
                      Testé en laboratoire
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

// Composant pour les bénéfices des ingrédients
function ProductIngredientsBenefits({ product }: { product: ProductData }) {
  const productColor = product.productColor || {
    main: "#7C3AED",
    light: "#9F67FF",
    dark: "#5B21B6",
    contrastText: "#FFFFFF"
  }

  return (
    <section className="py-20" style={{
      background: `linear-gradient(to top, ${productColor.main}05, ${productColor.light}15)`
    }}>
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <motion.h2 
              className="text-3xl md:text-4xl font-bold mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              Notre Engagement Qualité
            </motion.h2>
            <motion.p 
              className="text-gray-600"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Nous sélectionnons rigoureusement chaque ingrédient pour garantir la plus haute qualité
            </motion.p>
          </div>

          {/* Points qualité */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div 
              className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div 
                className="w-12 h-12 rounded-full mb-4 flex items-center justify-center"
                style={{ backgroundColor: `${productColor.light}20` }}
              >
                <svg className="w-6 h-6" style={{ color: productColor.main }} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">Transparence Totale</h3>
              <p className="text-gray-600">
                Nous vous donnons accès à toutes les informations sur nos ingrédients, leur origine et leur méthode de production pour une transparence absolue.
              </p>
            </motion.div>

            <motion.div 
              className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div 
                className="w-12 h-12 rounded-full mb-4 flex items-center justify-center"
                style={{ backgroundColor: `${productColor.light}20` }}
              >
                <svg className="w-6 h-6" style={{ color: productColor.main }} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">Tests Rigoureux</h3>
              <p className="text-gray-600">
                Chaque lot d'ingrédients est soumis à des analyses complètes en laboratoire pour garantir la pureté, la sécurité et l'efficacité.
              </p>
            </motion.div>

            <motion.div 
              className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <div 
                className="w-12 h-12 rounded-full mb-4 flex items-center justify-center"
                style={{ backgroundColor: `${productColor.light}20` }}
              >
                <svg className="w-6 h-6" style={{ color: productColor.main }} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">Origine Durable</h3>
              <p className="text-gray-600">
                Nos ingrédients sont sourcés de manière responsable et éthique, en soutenant les pratiques agricoles durables et le commerce équitable.
              </p>
            </motion.div>

            <motion.div 
              className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <div 
                className="w-12 h-12 rounded-full mb-4 flex items-center justify-center"
                style={{ backgroundColor: `${productColor.light}20` }}
              >
                <svg className="w-6 h-6" style={{ color: productColor.main }} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">Efficacité Prouvée</h3>
              <p className="text-gray-600">
                Nous ne sélectionnons que des ingrédients dont l'efficacité est soutenue par des études scientifiques pour des résultats optimaux.
              </p>
            </motion.div>
          </div>
          
          {/* Call to action */}
          <motion.div 
            className="text-center mt-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <Link href={`/products/${product.id}`}>
              <Button 
                className="px-8 py-6 rounded-xl text-white shadow-lg transition-transform duration-300 hover:scale-105" 
                style={{ 
                  backgroundColor: productColor.main,
                  boxShadow: `0 10px 15px -3px ${productColor.main}33`
                }}
              >
                Découvrir le produit complet
              </Button>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  )
}