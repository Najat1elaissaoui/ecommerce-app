"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { colors } from "@/lib/colors"
import Image from "next/image"
import { ChevronDown, ChevronUp, Heart, Shield, Zap, Activity, Users, Star } from "lucide-react"
import { useState } from "react"

interface Benefit {
  name: string
  description?: string
  image?: string
}

interface Benefits {
  title?: string
  items: Benefit[]
}

interface ProductBenefitsSectionProps {
  benefits: Benefits
  image: string
}

export default function ProductBenefitsSection({ benefits, image }: ProductBenefitsSectionProps) {
  const [expandedBenefit, setExpandedBenefit] = useState<number | null>(null)

  const toggleBenefit = (index: number) => {
    setExpandedBenefit(expandedBenefit === index ? null : index)
  }

  // Icônes pour les différents bénéfices
  const getBenefitIcon = (benefitName: string) => {
    const name = benefitName.toLowerCase()
    if (name.includes('energy') || name.includes('cellular')) return <Zap className="w-6 h-6" />
    if (name.includes('immune') || name.includes('immunity')) return <Shield className="w-6 h-6" />
    if (name.includes('heart') || name.includes('cardiovascular')) return <Heart className="w-6 h-6" />
    if (name.includes('metabolism') || name.includes('nutrient')) return <Activity className="w-6 h-6" />
    if (name.includes('antioxidant') || name.includes('support')) return <Star className="w-6 h-6" />
    if (name.includes('health') || name.includes('overall')) return <Users className="w-6 h-6" />
    return <Zap className="w-6 h-6" />
  }

  return (
    <section 
      className="w-full py-20 relative overflow-hidden"
      style={{ background: "linear-gradient(135deg, #DC2626 0%, #B91C1C 50%, #991B1B 100%)" }}
    >
      {/* Background decoration */}
      <div className="absolute inset-0">
        <div className="absolute top-20 right-20 w-64 h-64 bg-white/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-20 w-48 h-48 bg-white/10 rounded-full blur-2xl"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        
        {/* Header inspiré de l'image 3 */}
        <div className="text-center mb-16 text-white">
         

          {/* Titre principal */}
          <h2 className="text-4xl lg:text-5xl font-bold mb-8">
            {benefits.title || "Health Benefits"}
          </h2>
          
          <p className="text-xl text-white/90 max-w-3xl mx-auto leading-relaxed">
            Our patented formula is made with Vitamin B12 to help support:
          </p>
        </div>

        {/* Grid des bénéfices - Style de l'image 3 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {benefits.items.map((benefit, index) => (
            <Card 
              key={index}
              className="bg-white/95 backdrop-blur-sm border-0 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden group cursor-pointer"
              onClick={() => benefit.description && toggleBenefit(index)}
            >
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div 
                      className="p-3 rounded-full flex-shrink-0"
                      style={{ backgroundColor: colors.primary.orange + "20" }}
                    >
                      <div style={{ color: colors.primary.orange }}>
                        {getBenefitIcon(benefit.name)}
                      </div>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 group-hover:text-red-600 transition-colors">
                        {benefit.name}
                        {benefit.name.includes('Production') && (
                          <sup className="text-sm text-red-600">†</sup>
                        )}
                        {benefit.name.includes('Function') && (
                          <sup className="text-sm text-red-600">†</sup>
                        )}
                        {benefit.name.includes('Health') && (
                          <sup className="text-sm text-red-600">†</sup>
                        )}
                        {benefit.name.includes('Metabolism') && (
                          <sup className="text-sm text-red-600">†</sup>
                        )}
                        {benefit.name.includes('Support') && (
                          <sup className="text-sm text-red-600">†</sup>
                        )}
                      </h3>
                    </div>
                  </div>
                  
                  {/* Flèche d'expansion si description disponible */}
                  {benefit.description && (
                    <div 
                      className="p-2 rounded-full transition-transform duration-300"
                      style={{ 
                        backgroundColor: expandedBenefit === index ? colors.primary.orange + "20" : "transparent",
                        transform: expandedBenefit === index ? 'rotate(180deg)' : 'rotate(0deg)'
                      }}
                    >
                      <ChevronDown 
                        className="w-5 h-5"
                        style={{ color: colors.primary.orange }}
                      />
                    </div>
                  )}
                </div>

                {/* Description expandable avec animation */}
                {benefit.description && expandedBenefit === index && (
                  <div className="mt-6 pt-6 border-t border-gray-200 animate-in slide-in-from-top duration-300">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
                      <div>
                        <p className="text-gray-700 leading-relaxed">
                          {benefit.description}
                        </p>
                      </div>
                      {benefit.image && (
                        <div className="rounded-lg overflow-hidden">
                          <Image
                            src={benefit.image}
                            alt={benefit.name}
                            width={200}
                            height={150}
                            className="w-full h-32 object-cover"
                          />
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Style spécial pour le premier bénéfice avec description visible */}
                {index === 0 && benefit.description && !expandedBenefit && (
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {benefit.description}
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Note en bas */}
       
      </div>
    </section>
  )
}