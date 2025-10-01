"use client";

import { Leaf, Sparkles } from "lucide-react";
import Image from "next/image";

interface Ingredient {
  name: string;
  image: string;
  description: string;
}

interface ProductIngredientsSectionProps {
  ingredients: Ingredient[];
  productColor: string;
}

export default function ProductIngredientsSection({
  ingredients,
  productColor = "#7C3AED",
}: ProductIngredientsSectionProps) {
  return (
    <section className="w-full py-12 lg:py-16 relative overflow-hidden">
      {/* Subtle gradient background */}
      <div
        className="absolute inset-0 opacity-40"
        style={{
          background: `radial-gradient(circle at 30% 20%, ${productColor}08 0%, transparent 50%),
                       radial-gradient(circle at 70% 80%, ${productColor}05 0%, transparent 50%)`,
        }}
      />

      {/* Decorative elements */}
      <div
        className="absolute top-10 left-10 w-64 h-64 rounded-full blur-3xl opacity-20"
        style={{ background: productColor }}
      />
      <div
        className="absolute bottom-10 right-10 w-80 h-80 rounded-full blur-3xl opacity-15"
        style={{ background: productColor }}
      />

      <div className="container mx-auto px-4 relative z-10">
        {/* Header Section */}
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
            <Leaf className="w-4 h-4" style={{ color: productColor }} />
            <span className="text-sm font-bold" style={{ color: productColor }}>
              مكونات طبيعية 100%
            </span>
          </div>

          <h2 className="text-3xl lg:text-5xl font-black mb-3 bg-gradient-to-br from-gray-900 to-gray-600 bg-clip-text text-transparent">
            مكونات يمكنك نطقها بسهولة
          </h2>
          <p className="text-base lg:text-lg text-gray-600 max-w-2xl mx-auto">
            اكتشف قوة الطبيعة في كل مكون
          </p>
        </div>

        {/* Ingredients Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {ingredients.map((ingredient: Ingredient, idx: number) => (
            <div
              key={idx}
              className="opacity-0 animate-fade-in-up group"
              style={{ animationDelay: `${idx * 100}ms` }}
            >
              <div className="relative h-full bg-white rounded-2xl border-2 border-gray-100 shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden cursor-pointer hover:scale-105">
                {/* Gradient accent on hover */}
                <div
                  className="absolute top-0 left-0 right-0 h-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{
                    background: `linear-gradient(90deg, ${productColor}, ${productColor}cc)`,
                  }}
                />

                <div className="p-6 flex flex-col items-center text-center h-full">
                  {/* Image container with decorative circle */}
                  <div className="relative mb-5">
                    <div
                      className="absolute inset-0 rounded-full blur-xl opacity-0 group-hover:opacity-30 transition-opacity duration-500"
                      style={{ background: productColor }}
                    />
                    <div
                      className="relative w-28 h-28 rounded-full flex items-center justify-center p-1 transition-transform duration-500 group-hover:scale-110"
                      style={{
                        background: `linear-gradient(135deg, ${productColor}15, ${productColor}05)`,
                        border: `2px solid ${productColor}20`,
                      }}
                    >
                      <div className="w-full h-full rounded-full bg-white flex items-center justify-center p-3">
                        <Image
                          src={ingredient.image}
                          alt={ingredient.name}
                          width={96}
                          height={96}
                          className="object-contain w-full h-full"
                        />
                      </div>
                    </div>

                    {/* Sparkle icon on hover */}
                    <div
                      className="absolute -top-2 -right-2 w-8 h-8 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:rotate-12"
                      style={{ background: productColor }}
                    >
                      <Sparkles className="w-4 h-4 text-white" />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1 flex flex-col">
                    <h3
                      className="text-lg lg:text-xl font-bold mb-3 transition-colors duration-300"
                      style={{ color: "inherit" }}
                      dir="rtl"
                    >
                      {ingredient.name}
                    </h3>
                    <p
                      className="text-sm lg:text-base text-gray-600 leading-relaxed flex-1"
                      dir="rtl"
                    >
                      {ingredient.description}
                    </p>

                    {/* Learn more indicator */}
                    <div
                      className="mt-4 text-xs font-bold uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-1"
                      style={{ color: productColor }}
                      dir="rtl"
                    >
                      <span>مكون طبيعي</span>
                      <div
                        className="w-1 h-1 rounded-full"
                        style={{ background: productColor }}
                      />
                    </div>
                  </div>
                </div>

                {/* Subtle shine effect */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                  <div
                    className="absolute inset-0"
                    style={{
                      background: `linear-gradient(135deg, transparent 0%, ${productColor}03 50%, transparent 100%)`,
                    }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom statement */}
        <div
          className="text-center mt-12 opacity-0 animate-fade-in"
          style={{ animationDelay: "600ms" }}
        >
          <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-gradient-to-r from-gray-50 to-white border border-gray-200 shadow-md">
            <Leaf className="w-5 h-5" style={{ color: productColor }} />
            <p className="text-sm font-bold text-gray-700" dir="rtl">
              جميع المكونات طبيعية ومعتمدة من هيئة الغذاء والدواء
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
        .animate-fade-in {
          animation: fade-in 0.8s ease-out forwards;
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.6s ease-out forwards;
        }
      `}</style>
    </section>
  );
}
