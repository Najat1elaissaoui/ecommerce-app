"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { colors, getProductCardColor } from "@/lib/colors"
import Image from "next/image"
import Link from "next/link"

// Exemple de données de produits (en attendant l'intégration avec les vrais produits)
const sampleProducts = [
  {
    id: 1,
   
    homeImage1: "/creatine-supplement.jpg",
  },
  {
    id: 2,
   
    homeImage1: "/protein-powder-assortment.png",
  },
  {
    id: 3,
   
    homeImage1: "/muscular-athlete-holding-protein-supplement-bottle.jpg",
  },
  {
    id: 4,name: "Pre-Workout Blast",
    homeImage1: "/placeholder.jpg",
  }
]

export default function ProductCardsSection() {
  return (
    <section className="w-full py-16 bg-white">
      <div className="container mx-auto px-4">
        
        {/* Section header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl lg:text-5xl font-bold mb-4" style={{ color: colors.text.primary }}>
            Nos Produits
            <span className="block text-2xl font-normal mt-2" style={{ color: colors.text.secondary }}>
              Découvrez notre gamme premium
            </span>
          </h2>
        </div>

        {/* Products grid - Simplifié selon vos specs */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {sampleProducts.map((product, index) => {
            
            return (
              <Card 
                key={product.id}
                className="group relative overflow-hidden rounded-2xl border border-gray-200 bg-white hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
              >
                
                <CardContent className="p-6 h-full flex flex-col">
                  {/* Product image */}
                  <div className="relative mb-4 h-48 overflow-hidden rounded-xl">
                    <Image
                      src={product.homeImage1}
                      alt=""
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                  </div>

                 
                 

                  {/* Discover button - Redirige vers la page de détails */}
                  <div className="text-center">
                    <Link href={`/products/${product.id}`}>
                      <Button
                        className="bg-black text-white hover:bg-gray-800 transition-all duration-300 px-6 py-2 rounded-lg font-semibold w-full"
                      >
                        DISCOVER
                      </Button>
                    </Link>
                  </div>

                 
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* View all products button */}
        <div className="text-center mt-12">
          <Link href="/products">
            <Button
              size="lg"
              className="px-8 py-4 text-lg font-semibold rounded-lg transition-all duration-300"
              style={{
                background: colors.primary.orangeGradient,
                color: "white"
              }}
            >
              Voir Tous Les Produits
              <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}