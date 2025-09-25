"use client"

import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"

interface Ingredient {
  name: string
  image: string
  description: string
}

interface ProductIngredientsSectionProps {
  ingredients: Ingredient[];
  productColor?: {
    main: string;
    light: string;
    dark: string;
    contrastText: string;
  };
}

export default function ProductIngredientsSection({
  ingredients,
  productColor = {
    main: "#7C3AED",
    light: "#9F67FF",
    dark: "#5B21B6",
    contrastText: "#FFFFFF"
  }
}: ProductIngredientsSectionProps) {
  return (
    <section className="w-full py-16" dir="rtl" lang="ar">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-2">مكونات يمكنك نطقها بسهولة</h2>
          <p className="text-gray-600 text-base md:text-lg">اكتشف قوة الطبيعة في كل مكون</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {ingredients.map((ingredient: Ingredient, idx: number) => (
            <div key={idx} className="flex flex-col items-center text-center p-6 rounded-xl border border-gray-100 bg-white shadow-sm h-full">
              <div className="w-32 h-32 mb-4 flex items-center justify-center">
                <Image
                  src={ingredient.image}
                  alt={ingredient.name}
                  width={128}
                  height={128}
                  className="object-contain w-full h-full rounded"
                />
              </div>
              <h3 className="text-lg font-bold mb-2">{ingredient.name}</h3>
              <p className="text-gray-600 text-sm">{ingredient.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}