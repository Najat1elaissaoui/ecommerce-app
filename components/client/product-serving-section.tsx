"use client";

import { Card, CardContent } from "@/components/ui/card";
import { AlertCircle, Check, Info, Package } from "lucide-react";
import Image from "next/image";

interface ServingInfo {
  component: string;
  quantity: string;
}

interface Serving {
  servingInfo: ServingInfo[];
  suggestedUse: string;
  doesNotContain: string[];
}

interface ProductServingSectionProps {
  serving: Serving;
  productColor?: string;
  image?: string;
}

export default function ProductServingSection({
  serving,
  productColor = "#7C3AED",
  image = "/creatine-supplement.jpg",
}: ProductServingSectionProps) {
  return (
    <section
      className="w-full py-12 lg:py-16 relative overflow-hidden"
      style={{ background: productColor }}
    >
      {/* Floating orbs */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 right-20 w-72 h-72 bg-white rounded-full blur-3xl opacity-0 animate-float" />
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-white rounded-full blur-3xl opacity-0 animate-float-delayed" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left side - Product image */}
          <div className="relative opacity-0 animate-fade-in order-2 lg:order-1">
            <div className="relative z-10 flex justify-center items-center">
              <div className="relative">
                {/* Glow effect */}
                <div className="absolute inset-0 bg-white/20 rounded-full blur-3xl scale-110" />

                <Image
                  src={image}
                  alt="Product nutrition"
                  width={500}
                  height={600}
                  className="relative w-full max-w-md mx-auto object-contain drop-shadow-2xl transition-transform duration-700 hover:scale-105"
                />

                {/* Decorative badge */}
                <div
                  className="absolute bottom-8 left-8 bg-white/25 backdrop-blur-md rounded-2xl p-4 shadow-2xl border border-white/30 opacity-0 animate-fade-in"
                  style={{ animationDelay: "400ms" }}
                >
                  <div className="flex items-center gap-3">
                    <Package className="w-8 h-8 text-white" />
                    <div>
                      <div className="text-xs text-white/80 font-medium">
                        مكملات غذائية
                      </div>
                      <div className="text-lg font-bold text-white">
                        عالية الجودة
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Decorative floating elements */}
            <div className="absolute top-10 right-10 w-20 h-20 bg-white/10 rounded-full blur-xl animate-pulse" />
            <div
              className="absolute bottom-20 right-16 w-16 h-16 bg-white/15 rounded-full blur-lg animate-pulse"
              style={{ animationDelay: "1s" }}
            />
          </div>

          {/* Right side - Nutritional information */}
          <div className="space-y-5 lg:space-y-6 order-1 lg:order-2">
            {/* Each Serving Contains */}
            <div
              className="opacity-0 animate-fade-in-up"
              style={{ animationDelay: "200ms" }}
            >
              <Card className="bg-white border-2 border-white/30 rounded-3xl shadow-2xl overflow-hidden hover:shadow-3xl transition-shadow duration-500">
                <CardContent className="p-0">
                  {/* Header */}
                  <div
                    className="px-6 py-4 text-center relative overflow-hidden"
                    style={{
                      background: `linear-gradient(135deg, ${productColor}15, ${productColor}08)`,
                    }}
                  >
                    <div
                      className="absolute inset-0 opacity-10"
                      style={{
                        background: `repeating-linear-gradient(45deg, ${productColor}, ${productColor} 10px, transparent 10px, transparent 20px)`,
                      }}
                    />
                    <h3
                      className="text-xl lg:text-2xl font-black relative"
                      style={{ color: productColor }}
                      dir="rtl"
                    >
                      كل حصة تحتوي على:
                    </h3>
                  </div>

                  {/* Components list */}
                  <div className="p-5 lg:p-6">
                    <div className="space-y-3">
                      {serving.servingInfo.map((item, index) => (
                        <div
                          key={index}
                          className="flex justify-between items-center py-3 px-4 rounded-xl hover:bg-gray-50 transition-colors duration-300 group"
                          style={{
                            borderBottom:
                              index < serving.servingInfo.length - 1
                                ? "1px solid #f3f4f6"
                                : "none",
                          }}
                        >
                          <div className="flex items-center gap-3">
                            <div
                              className="w-2 h-2 rounded-full transition-all duration-300 group-hover:w-3 group-hover:h-3"
                              style={{ background: productColor }}
                            />
                            <span
                              className="text-sm lg:text-base text-gray-800 font-semibold"
                              dir="rtl"
                            >
                              {item.component}
                            </span>
                          </div>
                          <span
                            className="text-base lg:text-lg font-black"
                            style={{ color: productColor }}
                          >
                            {item.quantity}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Suggested Use */}
            <div
              className="opacity-0 animate-fade-in-up"
              style={{ animationDelay: "300ms" }}
            >
              <div className="bg-white rounded-2xl p-5 lg:p-6 shadow-xl hover:shadow-2xl transition-all duration-500 border-2 border-gray-100 hover:border-green-200 group">
                <h4
                  className="font-bold text-base lg:text-lg text-gray-900 mb-3 flex items-center gap-2"
                  dir="rtl"
                >
                  <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Check className="w-5 h-5 text-green-600" />
                  </div>
                  طريقة الاستخدام المقترحة
                </h4>
                <p
                  className="text-sm lg:text-base text-gray-700 leading-relaxed"
                  dir="rtl"
                >
                  {serving.suggestedUse}
                </p>
              </div>
            </div>

            {/* Does NOT Contain */}
            <div
              className="opacity-0 animate-fade-in-up"
              style={{ animationDelay: "400ms" }}
            >
              <div
                className="rounded-2xl p-5 lg:p-6 shadow-xl text-white relative overflow-hidden group hover:shadow-2xl transition-shadow duration-500"
                style={{
                  background: `linear-gradient(135deg, ${productColor}, ${productColor}dd)`,
                }}
              >
                {/* Decorative pattern */}
                <div className="absolute inset-0 opacity-10 group-hover:opacity-20 transition-opacity duration-500">
                  <div
                    className="absolute inset-0"
                    style={{
                      backgroundImage:
                        "radial-gradient(circle, white 1px, transparent 1px)",
                      backgroundSize: "20px 20px",
                    }}
                  />
                </div>

                <div className="relative">
                  <h4
                    className="font-bold text-base lg:text-lg mb-3 flex items-center gap-2"
                    dir="rtl"
                  >
                    <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                      <AlertCircle className="w-5 h-5" />
                    </div>
                    لا تحتوي على:
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {serving.doesNotContain.map((item, index) => (
                      <span
                        key={index}
                        className="inline-block px-3 py-1.5 rounded-full bg-white/20 backdrop-blur-sm text-xs lg:text-sm font-medium border border-white/30 hover:bg-white/30 transition-colors duration-300"
                        dir="rtl"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Info badge */}
            <div
              className="opacity-0 animate-fade-in"
              style={{ animationDelay: "500ms" }}
            >
              <div className="flex items-start gap-3 p-4 rounded-xl bg-white/20 backdrop-blur-sm border border-white/30">
                <Info className="w-5 h-5 text-white flex-shrink-0 mt-0.5" />
                <p
                  className="text-xs lg:text-sm text-white/90 leading-relaxed"
                  dir="rtl"
                >
                  استشر طبيبك قبل الاستخدام إذا كنت حاملاً أو مرضعة أو تعاني من
                  حالة طبية
                </p>
              </div>
            </div>
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
