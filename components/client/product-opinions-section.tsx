"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Quote, Star, ThumbsUp } from "lucide-react";

interface Opinion {
  customerName: string;
  rating: number;
  comment: string;
  date: string;
}

interface ProductOpinionsSectionProps {
  opinions: Opinion[];
  productColor?: string;
}

export default function ProductOpinionsSection({
  opinions,
  productColor = "#7C3AED",
}: ProductOpinionsSectionProps) {
  const averageRating =
    opinions.length > 0
      ? (
          opinions.reduce((sum, op) => sum + op.rating, 0) / opinions.length
        ).toFixed(1)
      : "0.0";

  return (
    <section className="w-full py-12 lg:py-16 relative overflow-hidden">
      {/* Background gradient */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(circle at 25% 25%, ${productColor}05 0%, transparent 50%),
            radial-gradient(circle at 75% 75%, ${productColor}03 0%, transparent 50%),
            linear-gradient(to bottom, white 0%, ${productColor}02 50%, white 100%)
          `,
        }}
      />

      {/* Decorative elements */}
      <div className="absolute inset-0 opacity-20">
        <div
          className="absolute top-20 left-20 w-72 h-72 rounded-full blur-3xl opacity-0 animate-float"
          style={{ background: productColor }}
        />
        <div
          className="absolute bottom-20 right-20 w-96 h-96 rounded-full blur-3xl opacity-0 animate-float-delayed"
          style={{ background: productColor }}
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header with stats */}
        <div
          className="text-center mb-10 lg:mb-14 opacity-0 animate-fade-in"
          dir="rtl"
        >
          <div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-4 backdrop-blur-sm"
            style={{
              background: `${productColor}10`,
              border: `1px solid ${productColor}30`,
            }}
          >
            <ThumbsUp className="w-4 h-4" style={{ color: productColor }} />
            <span className="text-sm font-bold" style={{ color: productColor }}>
              تقييمات العملاء
            </span>
          </div>

          <h2 className="text-3xl lg:text-5xl font-black mb-4 bg-gradient-to-br from-gray-900 to-gray-600 bg-clip-text text-transparent">
            آراء عملائنا السعداء
          </h2>

          {/* Rating summary */}
          <div className="flex items-center justify-center gap-4 mt-6">
            <div className="flex items-center gap-2">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-6 h-6"
                    style={{
                      color:
                        i < Math.floor(parseFloat(averageRating))
                          ? productColor
                          : "#d1d5db",
                      fill:
                        i < Math.floor(parseFloat(averageRating))
                          ? productColor
                          : "none",
                    }}
                  />
                ))}
              </div>
              <span className="text-2xl font-black text-gray-900">
                {averageRating}
              </span>
            </div>
            <div className="h-8 w-px bg-gray-300" />
            <span className="text-gray-600 font-medium">
              {opinions.length} تقييم
            </span>
          </div>
        </div>

        {/* Opinions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6 max-w-7xl mx-auto">
          {opinions.map((opinion, index) => (
            <div
              key={index}
              className="opacity-0 animate-fade-in-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <Card className="bg-white border-2 border-gray-100 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden group h-full hover:-translate-y-1">
                {/* Top accent bar */}
                <div
                  className="h-1.5 w-full transition-all duration-300 group-hover:h-2"
                  style={{
                    background: `linear-gradient(90deg, ${productColor}, ${productColor}cc)`,
                  }}
                />

                <CardContent className="p-5 lg:p-6">
                  {/* Quote icon */}
                  <div className="flex justify-center mb-4">
                    <div
                      className="w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 group-hover:scale-110"
                      style={{ background: `${productColor}15` }}
                    >
                      <Quote
                        className="w-6 h-6"
                        style={{ color: productColor }}
                      />
                    </div>
                  </div>

                  {/* Rating Stars */}
                  <div className="flex items-center justify-center gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-5 h-5 transition-transform duration-300 group-hover:scale-110"
                        style={{
                          color: i < opinion.rating ? "#FCD34D" : "#e5e7eb",
                          fill: i < opinion.rating ? "#FCD34D" : "none",
                          transitionDelay: `${i * 50}ms`,
                        }}
                      />
                    ))}
                  </div>

                  {/* Comment */}
                  <div className="relative mb-5">
                    <p
                      className="text-sm lg:text-base text-gray-700 leading-relaxed text-center font-medium"
                      dir="rtl"
                    >
                      "{opinion.comment}"
                    </p>
                  </div>

                  {/* Customer info */}
                  <div className="pt-4 border-t border-gray-100">
                    <div className="flex items-center justify-center gap-3">
                      <div
                        className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-white text-sm shadow-md"
                        style={{
                          background: `linear-gradient(135deg, ${productColor}, ${productColor}dd)`,
                        }}
                      >
                        {opinion.customerName.charAt(0)}
                      </div>
                      <div className="text-right" dir="rtl">
                        <div className="text-sm font-bold text-gray-900">
                          {opinion.customerName}
                        </div>
                        <div className="text-xs text-gray-500">
                          {opinion.date}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Verified badge */}
                  <div className="mt-4 flex justify-center">
                    <div
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold"
                      style={{
                        background: `${productColor}10`,
                        color: productColor,
                      }}
                    >
                      <div
                        className="w-1.5 h-1.5 rounded-full animate-pulse"
                        style={{ background: productColor }}
                      />
                      عميل معتمد
                    </div>
                  </div>
                </CardContent>

                {/* Shine effect */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none">
                  <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/10 to-transparent transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                </div>
              </Card>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div
          className="text-center mt-10 lg:mt-14 opacity-0 animate-fade-in"
          style={{ animationDelay: `${opinions.length * 100 + 200}ms` }}
        >
          <div className="inline-flex items-center gap-3 px-6 lg:px-8 py-3 lg:py-4 rounded-full bg-gradient-to-r from-white via-gray-50 to-white border-2 border-gray-200 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center"
              style={{ background: `${productColor}15` }}
            >
              <Star className="w-5 h-5" style={{ color: productColor }} />
            </div>
            <p className="text-xs lg:text-sm font-bold text-gray-800" dir="rtl">
              انضم إلى آلاف العملاء الراضين عن منتجاتنا
            </p>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes float {
          0%,
          100% {
            opacity: 1;
            transform: translateY(0px) translateX(0px);
          }
          50% {
            opacity: 1;
            transform: translateY(-20px) translateX(10px);
          }
        }
        @keyframes float-delayed {
          0%,
          100% {
            opacity: 1;
            transform: translateY(0px) translateX(0px);
          }
          50% {
            opacity: 1;
            transform: translateY(20px) translateX(-10px);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.8s ease-out forwards;
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.6s ease-out forwards;
        }
        .animate-float {
          animation: float 8s ease-in-out infinite;
        }
        .animate-float-delayed {
          animation: float-delayed 10s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
}
