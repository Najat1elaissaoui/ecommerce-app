"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { colors } from "@/lib/colors"
import Image from "next/image"
import { Check, ShoppingCart } from "lucide-react"
import { useState } from "react"

interface Pack {
  id: number
  name: string
  image: string
  price: number
  originalPrice?: number
  quantity: number
  discount?: string
  popular?: boolean
}

interface ProductPacksSectionProps {
  packs: Pack[]
  productName: string
}

export default function ProductPacksSection({ packs, productName }: ProductPacksSectionProps) {
  const [selectedPack, setSelectedPack] = useState<number>(packs.find(p => p.popular)?.id || packs[0]?.id)
  const [isAddingToCart, setIsAddingToCart] = useState(false)

  const handleCheckout = () => {
    setIsAddingToCart(true)
    setTimeout(() => setIsAddingToCart(false), 1000)
    
    // Ici on ajouterait la logique du panier
    const pack = packs.find(p => p.id === selectedPack)
    console.log("Pack sélectionné pour checkout:", pack)
  }

  const selectedPackData = packs.find(p => p.id === selectedPack)

  return (
    <section className="w-full py-20 bg-gradient-to-br from-pink-50 via-white to-pink-50">
      <div className="container mx-auto px-4">
        
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl lg:text-5xl font-bold mb-4" style={{ color: colors.text.primary }}>
            Choisissez Votre Pack
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Économisez plus avec nos packs multi-unités
          </p>
        </div>

        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Left side - Product image avec badge discount */}
          <div className="relative">
            {/* Badge de réduction - Style de l'image 2 */}
            <div className="absolute -top-6 -left-6 z-20">
              <div className="bg-black text-white rounded-full w-24 h-24 flex flex-col items-center justify-center font-bold shadow-2xl transform rotate-12">
                <span className="text-2xl">42%</span>
                <span className="text-xs">OFF</span>
              </div>
            </div>

            {/* Image du pack sélectionné */}
            <div className="bg-gradient-to-br from-gray-100 to-gray-200 rounded-3xl p-8 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-white/50 to-transparent"></div>
              <div className="relative z-10 flex justify-center">
                <Image
                  src={selectedPackData?.image || packs[0].image}
                  alt={`${productName} - ${selectedPackData?.name || packs[0].name}`}
                  width={400}
                  height={300}
                  className="object-contain h-80 w-auto drop-shadow-xl"
                />
              </div>
              
              {/* Decorative elements */}
              <div className="absolute bottom-4 right-4 w-16 h-16 bg-red-500/10 rounded-full"></div>
              <div className="absolute top-8 right-8 w-8 h-8 bg-red-500/20 rounded-full"></div>
            </div>
          </div>

          {/* Right side - Pack options et pricing */}
          <div className="space-y-8">
            
            {/* Pack selection buttons */}
            <div className="flex flex-wrap gap-4">
              {packs.map((pack) => (
                <Button
                  key={pack.id}
                  variant={selectedPack === pack.id ? "default" : "outline"}
                  onClick={() => setSelectedPack(pack.id)}
                  className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                    selectedPack === pack.id 
                      ? 'bg-red-600 hover:bg-red-700 text-white shadow-lg' 
                      : 'border-gray-300 hover:border-red-600 hover:text-red-600'
                  }`}
                >
                  {pack.name}
                </Button>
              ))}
            </div>

            {/* Pricing cards - Style de l'image 2 */}
            <div className="space-y-4">
              
              {/* Option Subscribe & Save */}
              {/* <Card className="border-2 border-gray-200 rounded-2xl overflow-hidden">
                <CardContent className="p-6">
                  <div className="flex justify-between items-center">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <Badge className="bg-blue-100 text-blue-800 px-3 py-1 text-sm font-semibold">
                          10% OFF & Cancel Anytime
                        </Badge>
                      </div>
                      <div className="flex items-baseline gap-2">
                        <span className="text-sm text-gray-600">Subscribe & Save</span>
                        <span className="text-3xl font-bold">${selectedPackData?.price}</span>
                        <span className="text-lg text-gray-600">each</span>
                        <span className="text-sm text-gray-500">
                          Total: ${((selectedPackData?.price || 0) * (selectedPackData?.quantity || 1)).toFixed(2)}
                        </span>
                        {selectedPackData?.originalPrice && (
                          <span className="text-sm text-gray-400 line-through ml-2">
                            ${selectedPackData.originalPrice}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card> */}

              {/* Option One-time Purchase - Style rouge de l'image 2 */}
              <Card className="border-2 border-red-600 rounded-2xl overflow-hidden bg-gradient-to-r from-red-600 to-red-700 text-white shadow-xl">
                <CardContent className="p-6">
                  <div className="flex justify-between items-center">
                    <div className="flex-1">
                      <div className="flex items-baseline gap-2 mb-2">
                        <span className="text-lg font-semibold">Prix</span>
                      </div>
                      <div className="flex items-baseline gap-2">
                        <span className="text-4xl font-bold">
                          dhs{((selectedPackData?.price || 0) * 1.1).toFixed(2)}
                        </span>
                        {/* <span className="text-lg">each</span>
                        <span className="text-sm opacity-90">
                          Total: dhs{(((selectedPackData?.price || 0) * 1.1) * (selectedPackData?.quantity || 1)).toFixed(2)}
                        </span>
                        {selectedPackData?.originalPrice && (
                          <span className="text-sm opacity-70 line-through ml-2">
                            dhs{(selectedPackData.originalPrice * 1.1).toFixed(2)}
                          </span>
                        )} */}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Discount badge et features */}
            {selectedPackData?.discount && (
              <div className="text-center py-4">
                <Badge 
                  className="bg-green-600 text-white px-4 py-2 text-lg font-bold rounded-full shadow-lg"
                >
                  {selectedPackData.discount}
                </Badge>
                <p className="text-sm text-gray-600 mt-2">
                  Économisez jusqu'à ${((selectedPackData.originalPrice || 0) - selectedPackData.price) * selectedPackData.quantity} avec ce pack
                </p>
              </div>
            )}

            {/* Checkout button - Style noir comme l'image 2 */}
            <div className="pt-4">
              <Button
                size="lg"
                onClick={handleCheckout}
                disabled={isAddingToCart}
                className="w-full py-6 text-xl font-bold rounded-2xl bg-black hover:bg-gray-800 text-white transition-all duration-300 shadow-xl"
              >
                {isAddingToCart ? (
                  <div className="flex items-center gap-3">
                    <div className="animate-spin w-5 h-5 border-2 border-white border-t-transparent rounded-full"></div>
                    AJOUT EN COURS...
                  </div>
                ) : (
                  <div className="flex items-center gap-3">
                    <ShoppingCart className="w-6 h-6" />
                    CHECKOUT NOW
                  </div>
                )}
              </Button>
              
              {/* Security badges */}
              <div className="flex items-center justify-center gap-4 mt-4 text-sm text-gray-600">
                {/* <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-green-600" />
                  <span>Paiement sécurisé</span>
                </div> */}
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-green-600" />
                  <span>Livraison gratuite</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-green-600" />
                  <span>Garantie 30j</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}