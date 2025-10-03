"use client";

import { Award, Check, Sparkles, Star, TrendingUp, Zap } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function FinalCTA() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const features = [
    {
      icon: Star,
      text: "جودة مميزة مضمونة",
      color: "from-yellow-400 to-orange-500",
    },
    {
      icon: Zap,
      text: "نتائج سريعة في 2-3 أسابيع",
      color: "from-blue-400 to-cyan-500",
    },
    {
      icon: Award,
      text: "مختبر معملياً ومعتمد من FDA",
      color: "from-purple-400 to-pink-500",
    },
    {
      icon: TrendingUp,
      text: "شحن مجاني للطلبات فوق 50dhs",
      color: "from-green-400 to-emerald-500",
    },
  ];

  const stats = [
    {
      value: "4.9★",
      label: "تقييم العملاء",
      color: "from-yellow-400 to-orange-500",
    },
    {
      value: "2 مليون+",
      label: "عميل سعيد",
      color: "from-blue-400 to-purple-500",
    },
    { value: "50+", label: "دولة", color: "from-pink-400 to-red-500" },
  ];

  return (
    <section
      className="relative py-24 overflow-hidden bg-gradient-to-br from-slate-950 via-blue-950 to-indigo-950"
      dir="rtl"
    >
      {/* Animated Grid Background */}
      <div className="absolute inset-0 opacity-20">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(rgba(59, 130, 246, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px)",
            backgroundSize: "50px 50px",
          }}
        ></div>
      </div>

      {/* Floating Particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${Math.random() * 10 + 10}s`,
              opacity: Math.random() * 0.5 + 0.2,
            }}
          />
        ))}
      </div>

      {/* Gradient Orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/30 rounded-full blur-3xl animate-pulse-slow"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/30 rounded-full blur-3xl animate-pulse-slow animation-delay-2000"></div>

      {/* Interactive Glow Effect */}
      <div
        className="absolute w-96 h-96 rounded-full blur-3xl transition-all duration-300 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(59, 130, 246, 0.15), transparent 70%)",
          left: `${mousePosition.x - 192}px`,
          top: `${mousePosition.y - 192}px`,
        }}
      />

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <div className="text-center lg:text-right">
            {/* Premium Badge */}
            <div
              className={`inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border border-yellow-500/30 backdrop-blur-sm mb-8 ${
                isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"
              } transition-all duration-700`}
            >
              <Award className="w-5 h-5 text-yellow-400" />
              <span className="text-yellow-300 font-bold text-sm">
                عرض لوقت محدود - خصم 25%
              </span>
              <Sparkles className="w-4 h-4 text-yellow-400 animate-pulse" />
            </div>

            {/* Main Title */}
            <h2
              className={`text-5xl md:text-6xl lg:text-7xl font-black text-white mb-6 leading-tight ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              } transition-all duration-700 delay-200`}
            >
              ابدأ رحلة
              <span className="block mt-2 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent animate-gradient">
                تحولك الآن
              </span>
            </h2>

            {/* Description */}
            <p
              className={`text-xl text-blue-100/90 mb-10 leading-relaxed max-w-lg mx-auto lg:mx-0 ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              } transition-all duration-700 delay-300`}
            >
              انضم لأكثر من{" "}
              <span className="text-white font-bold">2 مليون رياضي</span> يثقون
              بمكملاتنا المميزة في رحلتهم نحو اللياقة المثالية.
            </p>

            {/* Features Grid */}
            <div
              className={`grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10 ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              } transition-all duration-700 delay-400`}
            >
              {features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <div
                    key={index}
                    className="group flex items-center gap-3 p-4 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300 hover:scale-105"
                  >
                    <div
                      className={`flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center shadow-lg transform group-hover:rotate-12 transition-transform duration-300`}
                    >
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <span className="text-blue-50 font-medium text-sm text-right">
                      {feature.text}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Stats */}
            <div
              className={`flex flex-wrap justify-center lg:justify-end gap-8 ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              } transition-all duration-700 delay-600`}
            >
              {stats.map((stat, index) => (
                <div key={index} className="group text-center">
                  <div
                    className={`text-3xl font-black bg-gradient-to-r ${stat.color} bg-clip-text text-transparent mb-1 transform group-hover:scale-110 transition-transform duration-300`}
                  >
                    {stat.value}
                  </div>
                  <div className="text-xs text-blue-300 font-medium">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Content - Product Showcase */}
          <div
            className={`relative ${
              isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"
            } transition-all duration-1000 delay-300`}
          >
            {/* Main Product Container */}
            <div className="relative h-[600px] flex items-center justify-center">
              {/* Rotating Rings */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="absolute w-96 h-96 border-2 border-blue-500/20 rounded-full animate-spin-slow"></div>
                <div className="absolute w-80 h-80 border-2 border-purple-500/20 rounded-full animate-spin-reverse"></div>
                <div className="absolute w-64 h-64 border-2 border-pink-500/20 rounded-full animate-spin-slow"></div>
              </div>

              {/* Glowing Background */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-96 h-96 bg-gradient-to-r from-blue-500/30 via-purple-500/30 to-pink-500/30 rounded-full blur-3xl animate-pulse"></div>
              </div>

              {/* Product Image */}
              <div className="relative z-10 animate-float-slow">
                <div className="w-[400px] h-[500px] bg-gradient-to-br from-blue-600/20 to-purple-600/20 rounded-3xl backdrop-blur-sm border border-white/10 shadow-2xl flex items-center justify-center overflow-hidden">
                  <div className="text-white/50 text-6xl font-bold">
                    <Image
                      src="/goli1.png"
                      alt="Tafoukt Logo"
                      width={1000}
                      height={1000}
                      className="p-6 object-contain transition-transform duration-300 group-hover:scale-110"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                </div>
              </div>

              {/* Floating Discount Badge */}
              <div className="absolute -top-8 -right-8 z-20 animate-bounce-slow">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-red-500 to-pink-500 rounded-2xl blur-xl opacity-75"></div>
                  <div className="relative bg-gradient-to-r from-red-500 to-pink-500 text-white p-6 rounded-2xl shadow-2xl transform hover:scale-110 transition-transform duration-300">
                    <div className="text-center">
                      <div className="text-4xl font-black mb-1">25%</div>
                      <div className="text-sm font-bold">خصم</div>
                      <div className="text-xs opacity-90">الطلب الأول</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Free Shipping Badge */}
              <div className="absolute -bottom-8 -left-8 z-20 animate-float">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl blur-xl opacity-75"></div>
                  <div className="relative bg-gradient-to-r from-green-500 to-emerald-500 text-white p-5 rounded-2xl shadow-2xl transform hover:scale-110 transition-transform duration-300">
                    <div className="text-center">
                      <div className="flex items-center justify-center mb-1">
                        <Check className="w-6 h-6" />
                      </div>
                      <div className="text-lg font-bold">شحن مجاني</div>
                      <div className="text-xs opacity-90">+50 درهم</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quality Badge */}
              <div className="absolute top-1/2 -left-12 z-20">
                <div className="relative animate-pulse-slow">
                  <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full blur-lg opacity-75"></div>
                  <div className="relative bg-gradient-to-r from-yellow-400 to-orange-500 text-white p-4 rounded-full shadow-xl transform hover:scale-110 transition-transform duration-300">
                    <Star className="w-8 h-8 fill-white" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px) translateX(0px);
          }
          25% {
            transform: translateY(-20px) translateX(10px);
          }
          50% {
            transform: translateY(-10px) translateX(-10px);
          }
          75% {
            transform: translateY(-25px) translateX(5px);
          }
        }

        @keyframes float-slow {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-30px);
          }
        }

        @keyframes bounce-slow {
          0%,
          100% {
            transform: translateY(0px) scale(1);
          }
          50% {
            transform: translateY(-20px) scale(1.05);
          }
        }

        @keyframes pulse-slow {
          0%,
          100% {
            opacity: 1;
            transform: scale(1);
          }
          50% {
            opacity: 0.8;
            transform: scale(1.05);
          }
        }

        @keyframes spin-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        @keyframes spin-reverse {
          from {
            transform: rotate(360deg);
          }
          to {
            transform: rotate(0deg);
          }
        }

        @keyframes gradient {
          0%,
          100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }

        .animate-float {
          animation: float 15s ease-in-out infinite;
        }

        .animate-float-slow {
          animation: float-slow 4s ease-in-out infinite;
        }

        .animate-bounce-slow {
          animation: bounce-slow 3s ease-in-out infinite;
        }

        .animate-pulse-slow {
          animation: pulse-slow 3s ease-in-out infinite;
        }

        .animate-spin-slow {
          animation: spin-slow 20s linear infinite;
        }

        .animate-spin-reverse {
          animation: spin-reverse 15s linear infinite;
        }

        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 3s ease infinite;
        }

        .animation-delay-2000 {
          animation-delay: 2s;
        }
      `}</style>
    </section>
  );
}
