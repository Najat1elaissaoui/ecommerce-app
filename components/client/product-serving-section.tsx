"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { colors } from "@/lib/colors"
import Image from "next/image"
import { Info, AlertCircle, Check } from "lucide-react"

interface ServingInfo {
  component: string
  quantity: string
}

interface Serving {
  servingInfo: ServingInfo[]
  suggestedUse: string
  doesNotContain: string[]
}

interface ProductColor {
  main: string
  light: string
  dark: string
  contrastText: string
}

interface ProductServingSectionProps {
  serving: Serving;
  productColor?: ProductColor;
  image?: string;
}

export default function ProductServingSection({ serving, productColor, image }: ProductServingSectionProps) {
  // Couleurs par défaut si aucune n'est fournie
  const colors = productColor || {
    main: "#DC2626",
    light: "#EF4444",
    dark: "#991B1B",
    contrastText: "#FFFFFF"
  };
  const imageSrc = image || "/creatine-supplement.jpg";

  return (
    <section 
      className="w-full py-20 relative overflow-hidden"
      style={{ background: `linear-gradient(135deg, ${colors.light} 0%, ${colors.main} 50%, ${colors.dark} 100%)` }}
    >
      {/* Background decoration */}
      <div className="absolute inset-0">
        <div className="absolute top-20 right-20 w-48 h-48 bg-white/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-20 w-64 h-64 bg-white/10 rounded-full blur-2xl"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Left side - Product image comme dans l'image 5 */}
          <div className="relative">
            <div className="relative z-10">
              <Image
                src={imageSrc}
                alt="Product nutrition"
                width={500}
                height={600}
                className="w-full max-w-md mx-auto object-contain drop-shadow-2xl"
              />
              
              {/* Logo overlay comme dans l'image 5 */}
              <div className="absolute bottom-10 left-8 bg-white/20 backdrop-blur-sm rounded-2xl p-4">
                <div className="text-6xl font-bold text-white/90">
                  goli
                </div>
              </div>
            </div>

            {/* Decorative elements */}
            <div className="absolute top-10 right-10 w-20 h-20 bg-white/10 rounded-full blur-xl"></div>
            <div className="absolute bottom-20 right-20 w-16 h-16 bg-white/15 rounded-full blur-lg"></div>
          </div>

          {/* Right side - Nutritional information */}
          <div className="space-y-8">
            
            {/* Each Serving Contains - Style de l'image 5 */}
            <Card className="bg-white/95 backdrop-blur-sm border-0 rounded-3xl shadow-2xl overflow-hidden">
              <CardContent className="p-0">
                {/* Header avec background coloré */}
                <div 
                  className="px-6 py-4 text-center"
                  style={{ backgroundColor: colors.light + "20" }}
                >
                  <h3 className="text-2xl font-bold" style={{ color: colors.main }}>
                    كل علكة تحتوي على:
                  </h3>
                </div>

                {/* Liste des composants */}
                <div className="p-6 space-y-3">
                  {serving.servingInfo.map((item, index) => (
                    <div 
                      key={index}
                      className="flex justify-between items-center py-2 border-b border-gray-100 last:border-b-0"
                    >
                      <span className="text-gray-700 font-medium">
                        {item.component}
                      </span>
                      <span className="font-bold text-gray-900">
                        {item.quantity}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            

            {/* Suggested Use */}
            <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-6 shadow-xl">
              <h4 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Check className="w-5 h-5 text-green-600" />
                طريقة الاستخدام المقترحة
              </h4>
              <p className="text-lg text-gray-700 font-medium">
                {serving.suggestedUse}
              </p>
            </div>

            {/* Our Gummies DO NOT Contain - Style de l'image 5 */}
            <div 
              className="rounded-2xl p-6 shadow-xl text-white"
              style={{ background: `linear-gradient(to right, ${colors.main}, ${colors.dark})` }}
            >
              <h4 className="font-bold mb-4 flex items-center gap-2">
                <AlertCircle className="w-5 h-5" />
                لا تحتوي علكاتنا على:
              </h4>
              <p className="text-sm leading-relaxed">
                {serving.doesNotContain.join(', ')}
              </p>
            </div>

           
          </div>
        </div>

        {/* Bottom disclaimer */}
        {/* <div className="mt-16 text-center">
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 max-w-4xl mx-auto">
            <p className="text-white/90 text-sm leading-relaxed">
              <strong>Disclaimer:</strong> Ces déclarations n'ont pas été évaluées par la Food and Drug Administration. 
              Ce produit n'est pas destiné à diagnostiquer, traiter, guérir ou prévenir une maladie. 
              Les résultats individuels peuvent varier. Consultez votre médecin avant utilisation si vous êtes enceinte, 
              allaitez ou avez des problèmes de santé.
            </p>
          </div>
        </div> */}
      </div>
    </section>
  )
}