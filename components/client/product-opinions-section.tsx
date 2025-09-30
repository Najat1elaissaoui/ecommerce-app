"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Star } from "lucide-react"

interface Opinion {
  customerName: string
  rating: number
  comment: string
  date: string
}

interface ProductOpinionsSectionProps {
  opinions: Opinion[]
}

export default function ProductOpinionsSection({ opinions }: ProductOpinionsSectionProps) {
  return (
    <section className="w-full py-20 bg-gradient-to-br from-slate-50 via-white to-blue-50">
      <div className="container mx-auto px-4">
        
        {/* Header */}
        <div className="text-center mb-16" dir="rtl">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            آراء العملاء
          </h2>
        </div>

        {/* Opinions Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto" dir="rtl">
          {opinions.map((opinion, index) => (
            <Card 
              key={index}
              className="bg-white border border-gray-100 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <CardContent className="p-6">
                {/* Rating Stars */}
                <div className="flex items-center justify-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      size={20}
                      className={i < opinion.rating ? "text-yellow-400 fill-current" : "text-gray-300"}
                    />
                  ))}
                </div>
                {/* Opinion Message */}
                <p className="text-gray-700 leading-relaxed text-center text-lg font-bold">
                  "{opinion.comment}"
                </p>
                <div className="mt-4 text-sm text-gray-500 text-center">
                  <span>— {opinion.customerName}</span>
                  <span className="mx-2">|</span>
                  <span>{opinion.date}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}