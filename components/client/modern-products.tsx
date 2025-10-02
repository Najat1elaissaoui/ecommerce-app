"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { useCart } from "@/lib/cart-context";
import type { Product } from "@/lib/types";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const sampleProducts: Product[] = [
  {
    id: 1,
    name_ar: "علكة خل التفاح",
    price: 2999,
    quantity: 50,
    description_ar:
      "علكة خل التفاح الأولى عالميًا. غنية بالفيتامينات والعناصر الغذائية لدعم الصحة العامة.",
    images: ["/goli1.png"],
    low_stock_threshold: 5,
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    productColor: "#AE3131",
  },
  {
    id: 2,
    name_ar: "بروتين مصل اللبن المميز",
    price: 3499,
    quantity: 30,
    description_ar: "بروتين عالي الجودة لبناء العضلات وزيادة القوة",

    images: ["/goli2.png"],
    low_stock_threshold: 5,
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    productColor: "#0088CC",
  },
  {
    id: 3,
    name_ar: "بروتيبن EXTRA-STRENGTH SLEEP",
    price: 3499,
    quantity: 30,
    description_ar: "بروتين عالي الجودة لبناء العضلات وزيادة القوة",

    images: ["/goli3.png"],
    low_stock_threshold: 5,
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    productColor: "#7a30cf",
  },
  {
    id: 1,
    name_ar: "علكة خل التفاح",
    price: 2999,
    quantity: 50,
    description_ar:
      "علكة خل التفاح الأولى عالميًا. غنية بالفيتامينات والعناصر الغذائية لدعم الصحة العامة.",
    images: ["/goli1.png"],
    low_stock_threshold: 5,
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    productColor: "#AE3131",
  },
  {
    id: 2,
    name_ar: "بروتين مصل اللبن المميز",
    price: 3499,
    quantity: 30,
    description_ar: "بروتين عالي الجودة لبناء العضلات وزيادة القوة",

    images: ["/goli2.png"],
    low_stock_threshold: 5,
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    productColor: "#0088CC",
  },
  {
    id: 3,
    name_ar: "بروتيبن EXTRA-STRENGTH SLEEP",
    price: 3499,
    quantity: 30,
    description_ar: "بروتين عالي الجودة لبناء العضلات وزيادة القوة",

    images: ["/goli3.png"],
    low_stock_threshold: 5,
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    productColor: "#7a30cf",
  },
  {
    id: 2,
    name_ar: "بروتين مصل اللبن المميز",
    price: 3499,
    quantity: 30,
    description_ar: "بروتين عالي الجودة لبناء العضلات وزيادة القوة",

    images: ["/goli2.png"],
    low_stock_threshold: 5,
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    productColor: "#0088CC",
  },
  {
    id: 3,
    name_ar: "بروتيبن EXTRA-STRENGTH SLEEP",
    price: 3499,
    quantity: 30,
    description_ar: "بروتين عالي الجودة لبناء العضلات وزيادة القوة",

    images: ["/goli3.png"],
    low_stock_threshold: 5,
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    productColor: "#7a30cf",
  },
];

export default function ModernProductsSection() {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const { addItem } = useCart();
  const { toast } = useToast();

  const handleAddToCart = (product: Product) => {
    addItem({
      id: product.id,
      name_ar: product.name_ar,
      price: product.price,
      type: "product",
      image: product.images?.[0],
    });
    toast({
      title: "تم إضافة المنتج للسلة",
      description: `تم إضافة ${product.name_ar} إلى سلة التسوق`,
    });
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const cardVariants = {
    hidden: {
      opacity: 0,
      y: 50,
      scale: 0.9,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring" as const,
        stiffness: 100,
        damping: 15,
      },
    },
  };

  return (
    <section className="py-0 md:py-0 bg-white overflow-hidden pt-0 mt-0">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-4 md:mb-6 opacity-0 animate-[fadeInUp_0.8s_0.2s_forwards]">
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-black text-gray-900 mb-4 md:mb-6 flex flex-wrap items-center justify-center gap-2">
            <span>اشعل</span>
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              تحولك
            </span>
          </h2>

          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
            مكملات غذائية فاخرة مصممة من قبل الخبراء، موثوقة من قبل الأبطال
          </p>
        </div>

        {/* Products Grid - Improved responsive layout */}
        {
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {sampleProducts.map((product, index) => {
              const productColor = product.productColor || "#6366f1";

              return (
                <div
                  key={`${product.id}-${index}`}
                  className="opacity-0 animate-[fadeInUp_0.8s_forwards]"
                  style={{ animationDelay: `${0.3 + index * 0.1}s` }}
                >
                  <Card
                    className="group relative overflow-hidden bg-white rounded-2xl border-2 transition-all duration-500 transform-gpu hover:-translate-y-3 hover:scale-[1.02] active:translate-y-0 active:scale-100 min-h-[380px] md:min-h-[420px] flex flex-col h-full shadow-lg hover:shadow-2xl"
                    style={{ borderColor: `${productColor}20` }}
                  >
                    {/* Dynamic color gradient border on hover */}
                    <div
                      className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 p-[2px]"
                      style={{
                        background: `linear-gradient(135deg, ${productColor}, ${productColor}aa)`,
                      }}
                    >
                      <div className="absolute inset-[2px] bg-white rounded-2xl" />
                    </div>

                    {/* Spotlight effect with product color */}
                    <div
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"
                      style={{
                        background: `linear-gradient(135deg, ${productColor}15, transparent 60%)`,
                      }}
                    />

                    <CardContent className="relative p-0 z-10 flex flex-col h-full">
                      {/* Product Image Container with modern design */}
                      <div className="relative w-full h-48 md:h-56 flex items-center justify-center overflow-hidden rounded-t-2xl bg-gradient-to-br from-gray-100 to-white group-hover:from-blue-50 group-hover:to-purple-50 transition-all duration-500">
                        {/* Decorative circles */}
                        <div className="absolute top-4 right-4 w-20 h-20 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700" />
                        <div className="absolute bottom-4 left-4 w-16 h-16 bg-gradient-to-br from-pink-400/20 to-orange-400/20 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700" />

                        <div className="flex items-center justify-center w-full h-full overflow-hidden relative z-10">
                          <Image
                            src={
                              product.images?.[0] ||
                              "/protein-powder-assortment.png"
                            }
                            alt={product.name_ar}
                            width={140}
                            height={140}
                            className="object-contain mx-auto my-auto block group-hover:scale-110 transition-transform duration-500 filter drop-shadow-lg"
                            style={{ maxHeight: "140px", maxWidth: "140px" }}
                          />
                        </div>
                      </div>

                      {/* Product Info */}
                      <div className="flex-1 flex flex-col items-center justify-center text-center w-full p-4 md:p-5 bg-white relative">
                        <h3 className="text-base md:text-lg font-bold text-gray-900 mb-2 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:via-purple-600 group-hover:to-pink-600 group-hover:bg-clip-text transition-all duration-300 leading-tight line-clamp-2">
                          {product.name_ar}
                        </h3>
                      </div>

                      {/* CTA Button */}
                      <div className="w-full px-4 pb-4 md:px-5 md:pb-5">
                        <Link
                          href={`/products/${product.id}`}
                          className="w-full block"
                        >
                          <Button className="w-full bg-gradient-to-r from-gray-900 to-gray-800 hover:from-blue-600 hover:to-purple-600 text-white font-bold py-3 rounded-xl relative overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer group/btn">
                            {/* Shimmer effect */}
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover/btn:translate-x-full transition-transform duration-1000" />

                            <span className="relative z-10 flex items-center justify-center text-sm">
                              <span>عرض التفاصيل</span>
                              <ArrowRight className="w-4 h-4 mr-2 group-hover/btn:translate-x-1 transition-transform" />
                            </span>
                          </Button>
                        </Link>
                      </div>
                    </CardContent>

                    {/* Mobile touch ripple effect */}
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 opacity-0 active:opacity-100 md:active:opacity-0 transition-opacity duration-200 rounded-2xl pointer-events-none" />
                  </Card>
                </div>
              );
            })}
            ;
          </div>
        }

        {/* View All Products Button */}
        <div className="text-center mt-4 md:mt-8 opacity-0 animate-[fadeInUp_0.8s_0.7s_forwards]">
          <Link href="/products">
            <Button
              size="lg"
              className="bg-gradient-to-r from-gray-900 to-gray-700 hover:from-gray-800 hover:to-gray-600 text-white px-8 md:px-12 py-3 md:py-4 text-base md:text-lg font-semibold rounded-xl group relative overflow-hidden cursor-pointer"
            >
              <span className="relative z-10 flex items-center">
                عرض جميع المنتجات
                <ArrowRight className="mr-3 w-5 h-5 group-hover:translate-x-2 transition-transform duration-300" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
