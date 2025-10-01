import { Badge } from "@/components/ui/badge";
import { Sparkles } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface ProductHeroSectionProps {
  name: string;
  image: string;
  description: string;
  category: string;
  price?: number;
  productColor?: string;
}

export default function ProductHeroSection({
  name,
  image,
  description,
  category,
  productColor = "#7C3AED",
}: ProductHeroSectionProps) {
  // Generate lighter and darker shades for gradient
  const lighterShade = productColor + "15";
  const darkerShade = productColor + "90";

  return (
    <section className="w-full relative overflow-hidden min-h-screen flex items-center">
      {/* Animated background gradient */}
      <div
        className="absolute inset-0 opacity-90"
        style={{
          background: `radial-gradient(circle at 20% 50%, ${lighterShade} 0%, transparent 50%),
                       radial-gradient(circle at 80% 80%, ${productColor}40 0%, transparent 50%),
                       linear-gradient(135deg, ${productColor} 0%, ${darkerShade} 100%)`,
        }}
      />

      {/* Floating orbs for depth */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-white/5 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-white/5 rounded-full blur-3xl animate-pulse delay-700" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          {/* Left side - Product Info */}
          <div className="text-white space-y-6 lg:space-y-8 pt-8 lg:pt-0">
            {/* Category badge with glow effect */}
            <div className="flex items-center gap-3 animate-fade-in">
              <Badge
                className="px-5 py-2.5 text-xs font-bold text-white border-0 rounded-full backdrop-blur-sm shadow-2xl hover:scale-105 transition-transform duration-300"
                style={{
                  background: `linear-gradient(135deg, ${productColor}, ${darkerShade})`,
                  boxShadow: `0 10px 40px ${productColor}60`,
                }}
              >
                <Sparkles className="w-3 h-3 mr-1.5 inline" />
                {category.toUpperCase()}
              </Badge>
            </div>

            {/* Main title with gradient text */}
            <div className="space-y-4 animate-slide-up">
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black leading-tight tracking-tight">
                <span className="block bg-gradient-to-r from-white via-white to-white/80 bg-clip-text text-transparent drop-shadow-2xl">
                  {name}
                </span>
              </h1>
            </div>

            {/* Description with better typography */}
            <p className="text-lg sm:text-xl text-white/90 leading-relaxed max-w-xl font-light animate-fade-in-delay">
              {description}
            </p>

            {/* CTA Button - Enhanced design */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4 animate-fade-in-delay-2">
              <Link href="#product-packs" scroll={false} className="group">
                <button
                  className="relative bg-white hover:bg-gray-50 text-black text-sm font-bold uppercase tracking-wider px-10 py-4 rounded-full shadow-2xl overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-3xl w-full sm:w-auto"
                  style={{
                    boxShadow: `0 20px 60px rgba(0,0,0,0.3)`,
                  }}
                >
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    تسوق الآن
                    <svg
                      className="w-4 h-4 group-hover:translate-x-1 transition-transform"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={3}
                        d="M13 7l5 5m0 0l-5 5m5-5H6"
                      />
                    </svg>
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                </button>
              </Link>
            </div>

            {/* Product features - Redesigned with icons */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 lg:gap-6 pt-8 animate-fade-in-delay-3">
              {[
                { icon: "/h1.png", label: "Vegan", color: "#10b981" },
                { icon: "/h2.png", label: "Gluten-Free", color: "#f59e0b" },
                { icon: "/h3.png", label: "Non-GMO", color: "#3b82f6" },
                { icon: "/h4.png", label: "Gelatin-Free", color: "#ec4899" },
              ].map((feature, idx) => (
                <div
                  key={idx}
                  className="flex flex-col items-center text-center p-4 rounded-2xl bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-all duration-300 hover:scale-105 hover:-translate-y-1 group"
                  style={{
                    boxShadow: "0 8px 32px rgba(0,0,0,0.1)",
                  }}
                >
                  <div className="w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center mb-2 rounded-full bg-white/20 group-hover:bg-white/30 transition-colors duration-300">
                    <Image
                      src={feature.icon}
                      alt={feature.label}
                      width={32}
                      height={32}
                      className="group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                  <span className="text-xs sm:text-sm font-semibold text-white">
                    {feature.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Right side - Product Image with 3D effect */}
          <div className="relative flex justify-center items-center lg:justify-end animate-float">
            <div className="relative max-w-md lg:max-w-lg xl:max-w-xl">
              {/* Glow effect behind product */}
              <div
                className="absolute inset-0 blur-3xl opacity-60 scale-110"
                style={{
                  background: `radial-gradient(circle, ${productColor}80 0%, transparent 70%)`,
                }}
              />

              {/* Product image container */}
              <div className="relative hover:scale-105 transition-transform duration-500 cursor-pointer">
                <Image
                  src={image}
                  alt={name}
                  width={600}
                  height={700}
                  className="w-full h-auto object-contain drop-shadow-2xl relative z-10"
                  priority
                />
              </div>

              {/* Decorative elements */}
              <div className="absolute -top-8 -right-8 w-24 h-24 border-4 border-white/20 rounded-full animate-spin-slow" />
              <div className="absolute -bottom-8 -left-8 w-32 h-32 border-4 border-white/10 rounded-full animate-spin-slower" />
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 hidden lg:flex flex-col items-center gap-2 animate-bounce">
        <span className="text-white/60 text-xs font-semibold uppercase tracking-wider">
          Scroll
        </span>
        <div className="w-6 h-10 border-2 border-white/40 rounded-full flex items-start justify-center p-2">
          <div className="w-1.5 h-1.5 bg-white/60 rounded-full animate-scroll-down" />
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
        }
        @keyframes fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        @keyframes slide-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes scroll-down {
          0% {
            transform: translateY(0);
            opacity: 1;
          }
          100% {
            transform: translateY(16px);
            opacity: 0;
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
        @keyframes spin-slower {
          from {
            transform: rotate(360deg);
          }
          to {
            transform: rotate(0deg);
          }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        .animate-fade-in {
          animation: fade-in 0.8s ease-out;
        }
        .animate-fade-in-delay {
          animation: fade-in 0.8s ease-out 0.2s both;
        }
        .animate-fade-in-delay-2 {
          animation: fade-in 0.8s ease-out 0.4s both;
        }
        .animate-fade-in-delay-3 {
          animation: fade-in 0.8s ease-out 0.6s both;
        }
        .animate-slide-up {
          animation: slide-up 0.8s ease-out 0.1s both;
        }
        .animate-scroll-down {
          animation: scroll-down 2s ease-in-out infinite;
        }
        .animate-spin-slow {
          animation: spin-slow 20s linear infinite;
        }
        .animate-spin-slower {
          animation: spin-slower 30s linear infinite;
        }
        .delay-700 {
          animation-delay: 0.7s;
        }
      `}</style>
    </section>
  );
}
