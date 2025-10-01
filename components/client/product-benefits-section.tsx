"use client";

import { Card, CardContent } from "@/components/ui/card";
import {
  Activity,
  ChevronDown,
  Heart,
  Shield,
  Sparkles,
  Star,
  Users,
  Zap,
} from "lucide-react";
import Image from "next/image";
import { useState } from "react";

interface Benefit {
  name: string;
  description?: string;
  image?: string;
}

interface Benefits {
  title?: string;
  items: Benefit[];
}

interface ProductBenefitsSectionProps {
  benefits: Benefits;
  image: string;
  productColor: string;
}

export default function ProductBenefitsSection({
  benefits,
  image,
  productColor = "#AE3131",
}: ProductBenefitsSectionProps) {
  const [expandedBenefit, setExpandedBenefit] = useState<number | null>(null);

  const toggleBenefit = (index: number) => {
    setExpandedBenefit(expandedBenefit === index ? null : index);
  };

  const getBenefitIcon = (benefitName: string) => {
    const name = benefitName.toLowerCase();
    if (name.includes("energy") || name.includes("cellular"))
      return <Zap className="w-5 h-5" />;
    if (name.includes("immune") || name.includes("immunity"))
      return <Shield className="w-5 h-5" />;
    if (name.includes("heart") || name.includes("cardiovascular"))
      return <Heart className="w-5 h-5" />;
    if (name.includes("metabolism") || name.includes("nutrient"))
      return <Activity className="w-5 h-5" />;
    if (name.includes("antioxidant") || name.includes("support"))
      return <Star className="w-5 h-5" />;
    if (name.includes("health") || name.includes("overall"))
      return <Users className="w-5 h-5" />;
    return <Zap className="w-5 h-5" />;
  };

  return (
    <section
      className="w-full py-12 lg:py-16 relative overflow-hidden"
      style={{ background: productColor }}
    >
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 right-10 w-72 h-72 bg-white rounded-full blur-3xl opacity-0 animate-float" />
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-white rounded-full blur-3xl opacity-0 animate-float-delayed" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-10 lg:mb-14 opacity-0 animate-fade-in">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-4 backdrop-blur-sm bg-white/20 border border-white/30">
            <Sparkles className="w-4 h-4 text-white" />
            <span className="text-sm font-bold text-white">الفوائد الصحية</span>
          </div>

          <h2
            className="text-3xl lg:text-5xl font-black mb-3 text-white"
            dir="rtl"
          >
            {benefits.title || "الفوائد الصحية"}
          </h2>
          <p
            className="text-base lg:text-lg text-white/90 max-w-2xl mx-auto"
            dir="rtl"
          >
            اكتشف الفوائد المذهلة لمنتجنا المميز
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4 lg:gap-5 max-w-5xl mx-auto">
          {benefits.items.map((benefit, index) => {
            const isExpanded = expandedBenefit === index;
            const hasDescription = !!benefit.description;

            return (
              <div
                key={index}
                className="opacity-0 animate-fade-in-up h-full"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <Card
                  className={`relative overflow-hidden border-2 transition-all duration-500 cursor-pointer group h-full flex flex-col ${
                    isExpanded ? "shadow-2xl" : "shadow-lg hover:shadow-xl"
                  }`}
                  style={{
                    borderColor: isExpanded ? "white" : "rgba(255,255,255,0.3)",
                    background: "white",
                    transform: isExpanded ? "scale(1.05)" : "scale(1)",
                  }}
                  onClick={() => hasDescription && toggleBenefit(index)}
                >
                  <div
                    className="absolute top-0 left-0 right-0 h-1 transition-all duration-500"
                    style={{ background: isExpanded ? "white" : "transparent" }}
                  />

                  <CardContent className="p-5 lg:p-6 flex-1 flex flex-col">
                    <div className="flex items-start gap-4 min-h-[80px]">
                      <div
                        className="flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300"
                        style={{
                          background: isExpanded
                            ? `linear-gradient(135deg, ${productColor}, ${productColor}dd)`
                            : `${productColor}15`,
                        }}
                      >
                        <div
                          style={{ color: isExpanded ? "white" : productColor }}
                        >
                          {getBenefitIcon(benefit.name)}
                        </div>
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2 mb-2">
                          <h3
                            className="text-base lg:text-lg font-bold text-gray-900 leading-tight"
                            dir="rtl"
                          >
                            {benefit.name}
                            {(benefit.name.includes("Production") ||
                              benefit.name.includes("Function") ||
                              benefit.name.includes("Health") ||
                              benefit.name.includes("Metabolism") ||
                              benefit.name.includes("Support")) && (
                              <sup
                                className="text-xs ml-1"
                                style={{ color: productColor }}
                              >
                                †
                              </sup>
                            )}
                          </h3>

                          {hasDescription && (
                            <div
                              className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300"
                              style={{
                                background: isExpanded
                                  ? `${productColor}20`
                                  : "transparent",
                                transform: isExpanded
                                  ? "rotate(180deg)"
                                  : "rotate(0deg)",
                              }}
                            >
                              <ChevronDown
                                className="w-4 h-4"
                                style={{ color: productColor }}
                              />
                            </div>
                          )}
                        </div>

                        {index === 0 && benefit.description && !isExpanded && (
                          <p
                            className="text-xs lg:text-sm text-gray-600 leading-relaxed overflow-hidden"
                            dir="rtl"
                            style={{
                              display: "-webkit-box",
                              WebkitLineClamp: 2,
                              WebkitBoxOrient: "vertical",
                            }}
                          >
                            {benefit.description}
                          </p>
                        )}
                      </div>
                    </div>

                    {hasDescription && isExpanded && (
                      <div className="mt-5 pt-5 border-t border-gray-200 animate-fade-in">
                        <div
                          className={`grid gap-4 ${
                            benefit.image ? "md:grid-cols-2" : "grid-cols-1"
                          } items-center`}
                        >
                          <div>
                            <p
                              className="text-sm lg:text-base text-gray-700 leading-relaxed"
                              dir="rtl"
                            >
                              {benefit.description}
                            </p>
                          </div>

                          {benefit.image && (
                            <div className="rounded-xl overflow-hidden shadow-md">
                              <Image
                                src={benefit.image}
                                alt={benefit.name}
                                width={300}
                                height={200}
                                className="w-full h-40 object-cover"
                              />
                            </div>
                          )}
                        </div>
                      </div>
                    )}

                    {hasDescription && !isExpanded && (
                      <div
                        className="mt-3 flex items-center gap-2 text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        dir="rtl"
                      >
                        <span style={{ color: productColor }}>
                          اضغط لمعرفة المزيد
                        </span>
                        <ChevronDown
                          className="w-3 h-3"
                          style={{ color: productColor }}
                        />
                      </div>
                    )}
                  </CardContent>

                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                    <div
                      className="absolute inset-0"
                      style={{
                        background: `linear-gradient(135deg, transparent 0%, ${productColor}05 50%, transparent 100%)`,
                      }}
                    />
                  </div>
                </Card>
              </div>
            );
          })}
        </div>

        <div
          className="text-center mt-10 lg:mt-12 opacity-0 animate-fade-in"
          style={{ animationDelay: "600ms" }}
        >
          <p
            className="text-xs lg:text-sm text-white/80 max-w-3xl mx-auto"
            dir="rtl"
          >
            <span className="font-bold text-white">†</span> هذه المعلومات
            للأغراض التعليمية فقط. استشر طبيبك قبل استخدام أي مكملات غذائية.
          </p>
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
            transform: translateY(20px);
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
