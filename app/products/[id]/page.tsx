"use client"

import { notFound } from 'next/navigation'
import ProductHeroSection from '@/components/client/product-hero-section'
import ProductPacksSection from '@/components/client/product-packs-section'
import ProductBenefitsSection from '@/components/client/product-benefits-section'
import ProductIngredientsSection from '@/components/client/product-ingredients-section'
import ProductVideoSection from '@/components/client/product-video-section'
import ProductServingSection from '@/components/client/product-serving-section'
import ProductOpinionsSection from '@/components/client/product-opinions-section'
import Header from '@/components/client/header'
import Footer from '@/components/client/footer'

// Type pour les données produit (basé sur le système admin à 10 étapes)
interface ProductData {
  id: number
  name: string
  
  // Étape 1 - Informations de base
  homeImage1: string
  homeImage2: string
  basicInfo: {
    description: string
    category: string
    price: number
  }
  
  // Étape 2 - Description détaillée  
  detailedDescription: string
  productImage: string
  
  // Étape 3 - Bénéfices
  benefits: {
    title?: string
    items: Array<{
      name: string
      description?: string
      image?: string
    }>
  }
  
  // Étape 4 - Ingrédients
  ingredients: Array<{
    name: string
    image: string
    description: string
  }>
  
  // Étape 5 - Vidéo (optionnel)
  video?: {
    url: string
    thumbnail: string
    title: string
  }
  
  // Étape 6 - Informations nutritionnelles
  serving: {
    servingInfo: Array<{
      component: string
      quantity: string
    }>
    suggestedUse: string
    doesNotContain: string[]
  }
  
  // Étape 7 - Packs
  packs: Array<{
    id: number
    name: string
    image: string
    price: number
    originalPrice?: number
    quantity: number
    discount?: string
    popular?: boolean
  }>
  
  // Étape 8 - Opinions
  opinions?: Array<{
    customerName: string
    rating: number
    comment: string
    date: string
  }>
  
  // Étapes 9-10 - Sections personnalisées (optionnelles)
  customSections?: Array<{
    title: string
    content: string
    image?: string
    type: 'text' | 'image-text' | 'list'
  }>
}

// Données d'exemple (normalement récupérées depuis une API/base de données)
const sampleProductData: ProductData = {
  id: 1,
  name: "Apple Cider Vinegar Gummies",
  
  homeImage1: "/protein-powder-assortment.png",
  homeImage2: "/creatine-supplement.jpg", 
  basicInfo: {
    description: "World's first Apple Cider Vinegar Gummies with delicious flavor profile",
    category: "Wellness",
    price: 17.39
  },
  
  detailedDescription: "WORLD'S FIRST Apple Cider Vinegar Gummies. Infused with a delicious flavor profile. Source of quality vitamins & nutrients for many health benefits. Taste the Apple. Not the Vinegar.",
  productImage: "/creatine-supplement.jpg",
  
  benefits: {
    title: "Health Benefits",
    items: [
      { 
        name: "Cellular Energy Production", 
        description: "Goli ACV Gummies contain Vitamin B12 which helps convert the food you eat into cellular energy.",
        image: "/placeholder.jpg"
      },
      { name: "Healthy Immune Function" },
      { name: "Heart Health" },
      { name: "Healthy Nutrient Metabolism" },
      { name: "Added Antioxidant Support" },
      { name: "Overall Good Health" }
    ]
  },
  
  ingredients: [
    {
      name: "Apple Cider Vinegar",
      image: "/placeholder.jpg",
      description: "Fresh, real apples are crushed and juiced to produce what is called a cider. The apple cider undergoes a unique fermentation process to create Apple Cider Vinegar."
    },
    {
      name: "Beetroot", 
      image: "/placeholder.jpg",
      description: "The vibrant color and distinctive flavor of beetroots enhance the appearance and flavor profile of delicious Goli ACV Gummies."
    },
    {
      name: "Pomegranate",
      image: "/placeholder.jpg", 
      description: "The rich color and unique flavor of pomegranate help give Goli ACV Gummies their signature red appearance and delicious taste."
    }
  ],
  
  video: {
    url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    thumbnail: "/placeholder.jpg",
    title: "How Apple Cider Vinegar Gummies Work"
  },
  
  serving: {
    servingInfo: [
      { component: "Total Carbohydrate", quantity: "3.5 g" },
      { component: "Total Sugars", quantity: "2 g" },
      { component: "Apple Cider Vinegar", quantity: "500 mg" },
      { component: "Beetroot", quantity: "40 mcg" },
      { component: "Pomegranate", quantity: "40 mcg" },
      { component: "Vitamin B12 (50% Daily Value)", quantity: "1.2 mcg" }
    ],
    suggestedUse: "1-2 gummies, 3 times daily",
    doesNotContain: ["Yeast", "wheat", "milk", "eggs", "gluten", "soy", "gelatin", "peanuts", "shellfish", "dairy", "synthetic colors", "agave", "or salicylates"]
  },
  
  packs: [
    {
      id: 1,
      name: "1-PACK",
      image: "/creatine-supplement.jpg",
      price: 19.32,
      originalPrice: 26.00,
      quantity: 1,
      discount: "42% OFF"
    },
    {
      id: 2,
      name: "3-PACK", 
      image: "/creatine-supplement.jpg",
      price: 17.39,
      originalPrice: 25.00,
      quantity: 3,
      discount: "42% OFF",
      popular: true
    },
    {
      id: 3,
      name: "5-PACK",
      image: "/creatine-supplement.jpg", 
      price: 15.99,
      originalPrice: 23.00,
      quantity: 5,
      discount: "42% OFF"
    }
  ],
  
  opinions: [
    {
      customerName: "Sarah M.",
      rating: 5,
      comment: "Amazing taste and really effective! I've been taking these for 2 months and feel great.",
      date: "2024-01-15"
    },
    {
      customerName: "Ahmed K.",
      rating: 4,
      comment: "Good product, helps with digestion. Recommend it!",
      date: "2024-01-10"
    }
  ]
}

// Données pour plusieurs produits
const productsData: Record<string, ProductData> = {
  "1": sampleProductData,
  "2": {
    ...sampleProductData,
    id: 2,
    name: "Whey Protein Powder",
    basicInfo: {
      description: "Premium whey protein for muscle building and recovery",
      category: "Protein",
      price: 24.99
    },
    detailedDescription: "Premium whey protein isolate with superior absorption. Perfect for post-workout recovery and muscle building. Contains all essential amino acids."
  },
  "3": {
    ...sampleProductData,
    id: 3,
    name: "Creatine Monohydrate",
    basicInfo: {
      description: "Pure creatine monohydrate for strength and power",
      category: "Performance",
      price: 19.99
    },
    detailedDescription: "100% pure creatine monohydrate. Clinically proven to increase strength, power, and muscle mass. Unflavored and easily mixable.",
    productImage: "/creatine-supplement.jpg"
  },
  "4": {
    ...sampleProductData,
    id: 4,
    name: "Multi-Vitamin Complex",
    basicInfo: {
      description: "Complete daily vitamin and mineral support",
      category: "Wellness",
      price: 14.99
    },
    detailedDescription: "Comprehensive multi-vitamin formula with essential vitamins and minerals. Supports overall health and fills nutritional gaps in your diet."
  },
  "5": {
    ...sampleProductData,
    id: 5,
    name: "Omega-3 Fish Oil",
    basicInfo: {
      description: "High-quality omega-3 fatty acids for heart and brain health",
      category: "Wellness", 
      price: 22.99
    },
    detailedDescription: "Premium omega-3 fish oil with EPA and DHA. Supports cardiovascular health, brain function, and reduces inflammation."
  }
}

async function getProductData(id: string): Promise<ProductData | null> {
  // Simulation d'une requête API
  // En production, ceci ferait appel à votre API/base de données
  return productsData[id] || null
}

interface Props {
  params: { id: string }
}

export default async function ProductDetailPage({ params }: Props) {
  const product = await getProductData(params.id)
  
  if (!product) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        {/* Section 1: Hero avec image produit + description (Étape 2 admin) */}
        <ProductHeroSection 
          name={product.name}
          image={product.productImage}
          description={product.detailedDescription}
          category={product.basicInfo.category}
          price={product.basicInfo.price}
        />

        {/* Section 2: Packs et prix (Étape 7 admin) */}
        <ProductPacksSection 
          packs={product.packs}
          productName={product.name}
        />

        {/* Section 3: Bénéfices (Étape 3 admin) */}
        <ProductBenefitsSection 
          benefits={product.benefits}
          image={product.homeImage2}
        />

        {/* Section 4: Ingrédients (Étape 4 admin) */}
        <ProductIngredientsSection 
          ingredients={product.ingredients}
        />

        {/* Section 5: Vidéo (Étape 5 admin - optionnel) */}
        {product.video && (
          <ProductVideoSection 
            video={product.video}
          />
        )}

        {/* Section 6: Composition et usage (Étape 6 admin) */}
        <ProductServingSection 
          serving={product.serving}
        />

        {/* Section 7: Opinions clients (Étape 8 admin - optionnel) */}
        {product.opinions && product.opinions.length > 0 && (
          <ProductOpinionsSection 
            opinions={product.opinions}
          />
        )}

        {/* Sections personnalisées (Étapes 9-10 admin - optionnelles) */}
        {product.customSections && product.customSections.map((section, index) => (
          <section key={index} className="py-16 bg-white">
            <div className="container mx-auto px-4">
              <h2 className="text-3xl font-bold text-center mb-8">{section.title}</h2>
              {/* Contenu personnalisé selon le type */}
              <div className="max-w-4xl mx-auto">
                {section.type === 'text' && (
                  <p className="text-lg text-gray-600 leading-relaxed">{section.content}</p>
                )}
                {section.type === 'image-text' && section.image && (
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                    <div>
                      <img src={section.image} alt={section.title} className="rounded-lg w-full" />
                    </div>
                    <div>
                      <p className="text-lg text-gray-600 leading-relaxed">{section.content}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </section>
        ))}
      </main>
      <Footer />
    </div>
  )
}
