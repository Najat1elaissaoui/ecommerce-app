"use client";

import { Play, Sparkles } from "lucide-react";
import { useState } from "react";

export default function ModernVideoSection() {
  const [isPlaying, setIsPlaying] = useState(false);

  const videoId = "HZhgKAdFkrw";

  const handlePlayClick = () => {
    setIsPlaying(true);
  };

  return (
    <section className="py-12 md:py-16 bg-gradient-to-b from-white to-gray-50 overflow-hidden w-full">
      <div className="container mx-auto px-4 md:px-6 max-w-6xl">
        {/* Section Header */}
        <div className="text-center mb-8 md:mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-red-100 to-pink-100 mb-4">
            <Sparkles className="w-4 h-4 text-red-500" />
            <span className="text-sm font-bold text-red-600">شاهد الآن</span>
          </div>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-gray-900 mb-3">
            <span className="bg-gradient-to-r from-red-500 to-pink-600 bg-clip-text text-transparent">
              منتجاتنا
            </span>{" "}
            أثناء الاستخدام
          </h2>

          <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto">
            اكتشف كيف تُحسّن مكملاتنا أداء الرياضيين
          </p>
        </div>

        {/* Video Container - Reduced Height */}
        <div className="relative group max-w-4xl mx-auto">
          {/* Main Video Card */}
          <div className="relative bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl overflow-hidden shadow-2xl">
            {/* Video Player with reduced aspect ratio */}
            <div className="relative aspect-[16/9] md:aspect-[21/9]">
              {!isPlaying ? (
                <div className="relative w-full h-full">
                  {/* YouTube Thumbnail */}
                  <img
                    src={`https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`}
                    alt="Video thumbnail"
                    className="w-full h-full object-cover"
                  />

                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent group-hover:from-black/40 transition-all duration-300" />

                  {/* Play Button */}
                  <button
                    className="absolute inset-0 flex items-center justify-center cursor-pointer"
                    onClick={handlePlayClick}
                  >
                    <div className="relative">
                      {/* Animated rings */}
                      <div className="absolute inset-0 bg-red-500/20 rounded-full animate-ping" />

                      {/* Play button */}
                      <div className="relative w-16 h-16 md:w-20 md:h-20 bg-gradient-to-r from-red-500 to-pink-600 rounded-full flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform duration-300">
                        <Play
                          className="w-8 h-8 md:w-10 md:h-10 text-white ml-1"
                          fill="white"
                        />
                      </div>
                    </div>
                  </button>
                </div>
              ) : (
                <iframe
                  src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
                  title="Product Video"
                  className="w-full h-full"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              )}
            </div>
          </div>

          {/* Decorative gradient blobs */}
          <div className="absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-br from-red-400/30 to-pink-500/30 rounded-full blur-3xl opacity-60 pointer-events-none" />
          <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-gradient-to-br from-purple-400/20 to-pink-500/20 rounded-full blur-3xl opacity-60 pointer-events-none" />
        </div>

        {/* CTA Section - Compact */}
        <div className="text-center mt-8 md:mt-12">
          <div className="inline-flex flex-col md:flex-row items-center gap-4 bg-gradient-to-r from-red-50 to-pink-50 rounded-2xl p-6 md:p-8 border border-red-100 shadow-lg max-w-3xl mx-auto">
            <div className="text-right flex-1">
              <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">
                هل أنت مستعد لبدء رحلتك؟
              </h3>
              <p className="text-sm md:text-base text-gray-600">
                انضم إلى آلاف الرياضيين الذين طوروا أداءهم
              </p>
            </div>
            <a
              href="/products"
              className="group relative px-6 py-3 bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
              <span className="relative flex items-center gap-2">
                <span>اكتشف المنتجات</span>
                <span className="group-hover:translate-x-1 transition-transform">
                  ←
                </span>
              </span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
