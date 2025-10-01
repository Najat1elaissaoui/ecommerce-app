"use client";

import { ChevronLeft, ChevronRight, Sparkles } from "lucide-react";
import { useEffect, useState } from "react";

// Sample products data with simplified structure
const productsData = [
  {
    id: 1,
    name: "علكة خل التفاح",
    productColor: "#AE3131",
    homeImage1: "/goli1.png",
    basicInfo: {
      description: "أول علكة خل تفاح في العالم بطعم لذيذ وفوائد صحية متعددة.",
      category: "مكمل غذائي",
      price: 17.39,
    },
  },
  {
    id: 2,
    name: "بروتين مصل اللبن المميز",
    productColor: "#0088CC",
    homeImage1: "/goli2.png",
    basicInfo: {
      description:
        "بروتين عالي الجودة يساعد في بناء العضلات وتحسين الأداء الرياضي.",
      category: "بروتين",
      price: 25.99,
    },
  },
  {
    id: 3,
    name: "بروتين EXTRA-STRENGTH SLEEP",
    productColor: "#7a30cfff",
    homeImage1: "/goli3.png",
    basicInfo: {
      description: "تركيبة متقدمة لتحسين جودة النوم والاسترخاء العميق.",
      category: "نوم",
      price: 19.99,
    },
  },
];

// Helper function to lighten a hex color
function lightenColor(hex: string, percent: number) {
  const num = parseInt(hex.replace("#", ""), 16);
  const amt = Math.round(2.55 * percent);
  const R = (num >> 16) + amt;
  const G = ((num >> 8) & 0x00ff) + amt;
  const B = (num & 0x0000ff) + amt;
  return (
    "#" +
    (
      0x1000000 +
      (R < 255 ? (R < 1 ? 0 : R) : 255) * 0x10000 +
      (G < 255 ? (G < 1 ? 0 : G) : 255) * 0x100 +
      (B < 255 ? (B < 1 ? 0 : B) : 255)
    )
      .toString(16)
      .slice(1)
  );
}

export default function ModernProductCarousel() {
  const [activeIndex, setActiveIndex] = useState(1);
  const [transitioning, setTransitioning] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  const changeSlide = (direction: "prev" | "next") => {
    if (transitioning) return;

    setTransitioning(true);

    const newIndex =
      direction === "next"
        ? (activeIndex + 1) % productsData.length
        : (activeIndex - 1 + productsData.length) % productsData.length;

    setTimeout(() => {
      setActiveIndex(newIndex);
      setTimeout(() => setTransitioning(false), 400);
    }, 150);
  };

  const nextSlide = () => changeSlide("next");
  const prevSlide = () => changeSlide("prev");

  // Auto-scroll
  useEffect(() => {
    if (transitioning || isHovering) return;
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, [activeIndex, transitioning, isHovering]);

  // Get indices for left, center, right cards
  const getCardIndices = () => {
    return {
      left: (activeIndex - 1 + productsData.length) % productsData.length,
      center: activeIndex,
      right: (activeIndex + 1) % productsData.length,
    };
  };

  const indices = getCardIndices();
  const centerProduct = productsData[indices.center];
  const leftProduct = productsData[indices.left];
  const rightProduct = productsData[indices.right];

  return (
    <section className="py-12 md:py-20 bg-gradient-to-b from-gray-50 to-white overflow-hidden w-full">
      <div className="w-full px-4 md:px-6 mx-auto">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 mb-3 flex items-center justify-center gap-3">
            <Sparkles className="w-8 h-8 md:w-10 md:h-10 text-yellow-500 animate-pulse" />
            <span>اكتشف</span>
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              منتجاتنا
            </span>
          </h2>
          <p className="text-gray-600 text-sm md:text-base">
            أفضل المنتجات الصحية لحياة أفضل
          </p>
        </div>

        {/* Main Carousel Container */}
        <div
          className="relative"
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        >
          {/* Background Glow Effect */}
          <div
            className="absolute inset-0 -z-10 opacity-20 blur-3xl transition-all duration-700"
            style={{
              background: `radial-gradient(circle at 50% 50%, ${centerProduct.productColor}60, transparent 70%)`,
            }}
          />

          {/* Cards Container */}
          <div className="relative flex items-center justify-center gap-3 md:gap-4 lg:gap-6 px-4 md:px-8 lg:px-12">
            {/* Left Card - Smaller */}
            <div
              className="hidden md:block cursor-pointer transform transition-all duration-500 hover:scale-105 flex-1 max-w-xs"
              onClick={() => !transitioning && setActiveIndex(indices.left)}
            >
              <div
                className="w-full h-72 rounded-2xl p-5 shadow-lg hover:shadow-xl transition-all duration-500 opacity-60 hover:opacity-80"
                style={{
                  background: `linear-gradient(135deg, ${
                    leftProduct.productColor
                  }, ${lightenColor(leftProduct.productColor, 8)})`,
                }}
              >
                <div className="flex flex-col h-full justify-between text-right">
                  <div>
                    <span className="inline-block px-3 py-1 rounded-full bg-white/25 text-white text-xs font-semibold mb-2">
                      {leftProduct.basicInfo.category}
                    </span>
                    <h3 className="text-base font-bold text-white mb-1 line-clamp-2">
                      {leftProduct.name}
                    </h3>
                  </div>
                  <div className="flex items-center justify-center flex-1">
                    <img
                      src={leftProduct.homeImage1}
                      alt={leftProduct.name}
                      className="w-28 h-28 object-contain drop-shadow-xl"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Center Card - Larger (Active) */}
            <div className="relative z-20 transform transition-all duration-700 scale-100 flex-1 max-w-3xl">
              <div
                className="w-full rounded-3xl overflow-hidden shadow-2xl transition-all duration-700"
                style={{
                  background: `linear-gradient(135deg, ${
                    centerProduct.productColor
                  } 0%, ${lightenColor(centerProduct.productColor, 10)} 100%)`,
                }}
              >
                {/* Animated Background Pattern */}
                <div className="absolute inset-0 opacity-10">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-white rounded-full blur-3xl animate-pulse" />
                  <div
                    className="absolute bottom-0 left-0 w-48 h-48 bg-white rounded-full blur-2xl animate-pulse"
                    style={{ animationDelay: "1s" }}
                  />
                </div>

                {/* Content */}
                <div className="relative z-10 p-6 md:p-8 lg:p-10 grid md:grid-cols-2 gap-6 items-center min-h-[380px] md:min-h-[420px]">
                  {/* Left Side - Text Content */}
                  <div className="text-right space-y-3 md:space-y-4 order-2 md:order-1">
                    {/* Category Badge */}
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/25 backdrop-blur-sm border border-white/30">
                      <span className="text-xs font-bold text-white">
                        {centerProduct.basicInfo.category}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="text-xl md:text-2xl lg:text-3xl font-black text-white leading-tight">
                      {centerProduct.name}
                    </h3>

                    {/* Description */}
                    <p className="text-sm md:text-base text-white/90 leading-relaxed line-clamp-3">
                      {centerProduct.basicInfo.description}
                    </p>

                    {/* Price */}
                    <div className="flex items-center justify-end gap-2 pt-2">
                      <span className="text-2xl md:text-3xl font-black text-white">
                        {centerProduct.basicInfo.price} DH
                      </span>
                    </div>

                    {/* CTA Button */}
                    <div className="flex justify-end pt-2">
                      <button
                        className="group relative px-6 py-3 bg-white/95 hover:bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
                        style={{ color: centerProduct.productColor }}
                        onClick={() =>
                          (window.location.href = `/products/${centerProduct.id}`)
                        }
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />

                        <span className="relative flex items-center justify-center gap-2 text-sm md:text-base font-bold">
                          <span>عرض التفاصيل</span>
                          <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </span>
                      </button>
                    </div>
                  </div>

                  {/* Right Side - Product Image */}
                  <div className="relative flex items-center justify-center order-1 md:order-2">
                    {/* Decorative circles */}
                    <div className="absolute w-40 h-40 md:w-48 md:h-48 rounded-full bg-white/20 blur-2xl animate-pulse" />
                    <div
                      className="absolute w-32 h-32 md:w-40 md:h-40 rounded-full bg-white/15 blur-xl animate-pulse"
                      style={{ animationDelay: "0.5s" }}
                    />

                    <img
                      src={centerProduct.homeImage1}
                      alt={centerProduct.name}
                      className="relative z-10 w-40 h-40 md:w-48 md:h-48 lg:w-52 lg:h-52 object-contain drop-shadow-2xl transform transition-transform duration-700 hover:scale-110"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Right Card - Smaller */}
            <div
              className="hidden md:block cursor-pointer transform transition-all duration-500 hover:scale-105 flex-1 max-w-xs"
              onClick={() => !transitioning && setActiveIndex(indices.right)}
            >
              <div
                className="w-full h-72 rounded-2xl p-5 shadow-lg hover:shadow-xl transition-all duration-500 opacity-60 hover:opacity-80"
                style={{
                  background: `linear-gradient(135deg, ${
                    rightProduct.productColor
                  }, ${lightenColor(rightProduct.productColor, 8)})`,
                }}
              >
                <div className="flex flex-col h-full justify-between text-right">
                  <div>
                    <span className="inline-block px-3 py-1 rounded-full bg-white/25 text-white text-xs font-semibold mb-2">
                      {rightProduct.basicInfo.category}
                    </span>
                    <h3 className="text-base font-bold text-white mb-1 line-clamp-2">
                      {rightProduct.name}
                    </h3>
                  </div>
                  <div className="flex items-center justify-center flex-1">
                    <img
                      src={rightProduct.homeImage1}
                      alt={rightProduct.name}
                      className="w-28 h-28 object-contain drop-shadow-xl"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Arrows */}
          <div className="hidden md:flex absolute top-1/2 -translate-y-1/2 left-0 right-0 justify-between pointer-events-none px-4">
            <button
              onClick={prevSlide}
              disabled={transitioning}
              className="pointer-events-auto w-12 h-12 rounded-full bg-white shadow-xl hover:shadow-2xl transition-all duration-300 flex items-center justify-center disabled:opacity-50 hover:scale-110 active:scale-95"
              style={{
                color: centerProduct.productColor,
                border: `2px solid ${centerProduct.productColor}40`,
              }}
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            <button
              onClick={nextSlide}
              disabled={transitioning}
              className="pointer-events-auto w-12 h-12 rounded-full bg-white shadow-xl hover:shadow-2xl transition-all duration-300 flex items-center justify-center disabled:opacity-50 hover:scale-110 active:scale-95"
              style={{
                color: centerProduct.productColor,
                border: `2px solid ${centerProduct.productColor}40`,
              }}
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
          </div>

          {/* Mobile Navigation Arrows */}
          <div className="flex md:hidden justify-between mt-6 px-4">
            <button
              onClick={prevSlide}
              disabled={transitioning}
              className="w-12 h-12 rounded-full bg-white shadow-lg transition-all duration-300 flex items-center justify-center disabled:opacity-50"
              style={{
                color: centerProduct.productColor,
                border: `2px solid ${centerProduct.productColor}40`,
              }}
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            <button
              onClick={nextSlide}
              disabled={transitioning}
              className="w-12 h-12 rounded-full bg-white shadow-lg transition-all duration-300 flex items-center justify-center disabled:opacity-50"
              style={{
                color: centerProduct.productColor,
                border: `2px solid ${centerProduct.productColor}40`,
              }}
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Indicators */}
        <div className="flex justify-center items-center gap-3 mt-8 md:mt-12">
          {productsData.map((product, idx) => (
            <button
              key={idx}
              onClick={() => !transitioning && setActiveIndex(idx)}
              disabled={transitioning}
              className="group transition-all duration-300 disabled:opacity-50"
            >
              <div
                className={`transition-all duration-500 rounded-full ${
                  idx === activeIndex
                    ? "w-12 h-3 shadow-lg"
                    : "w-3 h-3 opacity-50 group-hover:opacity-75 group-hover:scale-125"
                }`}
                style={{
                  backgroundColor:
                    idx === activeIndex
                      ? centerProduct.productColor
                      : "#9CA3AF",
                }}
              />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
