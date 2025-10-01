"use client";

import { Sparkles, Star } from "lucide-react";
import Image from "next/image";

interface GoldenHabit {
  icon: string;
  title: string;
  description: string;
  color?: string;
}

interface GoldenHabitsSectionProps {
  habits: GoldenHabit[];
  sectionTitle?: string;
  productColor?: string;
}

export default function GoldenHabitsSection({
  habits,
  sectionTitle = "العادات الذهبية",
  productColor = "#F97316",
}: GoldenHabitsSectionProps) {
  return (
    <section className="py-12 lg:py-16 relative overflow-hidden">
      {/* Dynamic background */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(circle at 20% 20%, ${productColor}08 0%, transparent 50%),
            radial-gradient(circle at 80% 80%, ${productColor}05 0%, transparent 50%),
            linear-gradient(to bottom, white 0%, ${productColor}03 50%, white 100%)
          `,
        }}
      />

      {/* Floating decorative elements */}
      <div className="absolute inset-0 opacity-20">
        <div
          className="absolute top-20 right-20 w-64 h-64 rounded-full blur-3xl opacity-0 animate-float"
          style={{ background: productColor }}
        />
        <div
          className="absolute bottom-20 left-20 w-80 h-80 rounded-full blur-3xl opacity-0 animate-float-delayed"
          style={{ background: productColor }}
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        {sectionTitle && (
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
              <Star className="w-4 h-4" style={{ color: productColor }} />
              <span
                className="text-sm font-bold"
                style={{ color: productColor }}
              >
                نصائح مهمة
              </span>
            </div>

            <h2 className="text-3xl lg:text-5xl font-black mb-3 bg-gradient-to-br from-gray-900 to-gray-600 bg-clip-text text-transparent">
              {sectionTitle}
            </h2>
            <p
              className="text-base lg:text-lg text-gray-600 max-w-2xl mx-auto"
              dir="rtl"
            >
              اتبع هذه النصائح للحصول على أفضل النتائج
            </p>
          </div>
        )}

        {/* Habits Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 max-w-6xl mx-auto">
          {habits.map((habit, idx) => {
            const habitColor = habit.color || productColor;

            return (
              <div
                key={idx}
                className="opacity-0 animate-fade-in-up group"
                style={{ animationDelay: `${idx * 150}ms` }}
              >
                <div className="relative h-full bg-white rounded-2xl border-2 border-gray-100 shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden p-6 lg:p-8 hover:-translate-y-1">
                  {/* Top gradient accent */}
                  <div
                    className="absolute top-0 left-0 right-0 h-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{
                      background: `linear-gradient(90deg, ${habitColor}, ${habitColor}cc)`,
                    }}
                  />

                  <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 lg:gap-6">
                    {/* Icon container */}
                    <div className="relative flex-shrink-0">
                      <div
                        className="absolute inset-0 rounded-full blur-xl opacity-0 group-hover:opacity-40 transition-opacity duration-500"
                        style={{ background: habitColor }}
                      />
                      <div
                        className="relative w-20 h-20 lg:w-24 lg:h-24 rounded-full flex items-center justify-center transition-all duration-500 group-hover:scale-110 group-hover:rotate-6"
                        style={{
                          background: `linear-gradient(135deg, ${habitColor}20, ${habitColor}08)`,
                          border: `3px solid ${habitColor}30`,
                        }}
                      >
                        <div className="w-full h-full rounded-full bg-white/50 backdrop-blur-sm flex items-center justify-center">
                          <Image
                            src={habit.icon}
                            alt={habit.title}
                            width={48}
                            height={48}
                            className="object-contain transition-transform duration-500 group-hover:scale-110"
                          />
                        </div>
                      </div>

                      {/* Sparkle badge */}
                      <div
                        className="absolute -top-1 -right-1 w-7 h-7 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 shadow-lg"
                        style={{
                          background: `linear-gradient(135deg, ${habitColor}, ${habitColor}dd)`,
                        }}
                      >
                        <Sparkles className="w-3.5 h-3.5 text-white" />
                      </div>

                      {/* Number badge */}
                      <div
                        className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full flex items-center justify-center font-bold text-white text-sm shadow-md"
                        style={{ background: habitColor }}
                      >
                        {idx + 1}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1 text-center sm:text-right" dir="rtl">
                      <div className="mb-3">
                        <span
                          className="inline-block px-4 py-2 rounded-xl font-bold text-sm shadow-md transition-all duration-300 group-hover:scale-105"
                          style={{
                            background: `linear-gradient(135deg, ${habitColor}, ${habitColor}dd)`,
                            color: "#fff",
                          }}
                        >
                          {habit.title}
                        </span>
                      </div>
                      <p className="text-sm lg:text-base text-gray-700 leading-relaxed">
                        {habit.description}
                      </p>

                      {/* Decorative line */}
                      <div className="mt-4 flex items-center justify-center sm:justify-start gap-2">
                        <div
                          className="h-0.5 w-12 opacity-0 group-hover:opacity-100 transition-all duration-500 group-hover:w-20"
                          style={{ background: habitColor }}
                        />
                        <div
                          className="w-1.5 h-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-pulse"
                          style={{ background: habitColor }}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Shine effect */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none">
                    <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/10 to-transparent transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div
          className="text-center mt-10 lg:mt-14 opacity-0 animate-fade-in"
          style={{ animationDelay: "800ms" }}
        >
          <div className="inline-flex items-center gap-3 px-6 lg:px-8 py-3 lg:py-4 rounded-full bg-gradient-to-r from-white via-gray-50 to-white border-2 border-gray-200 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center"
              style={{ background: `${productColor}15` }}
            >
              <Star className="w-5 h-5" style={{ color: productColor }} />
            </div>
            <p className="text-xs lg:text-sm font-bold text-gray-800" dir="rtl">
              اتبع هذه العادات يوميًا لنتائج مثالية
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
