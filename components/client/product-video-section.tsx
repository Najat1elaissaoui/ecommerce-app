"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Film, Pause, Play, Volume2, VolumeX } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

interface ProductVideoSectionProps {
  video?: {
    url: string;
    thumbnail: string;
    title: string;
  };
  productColor?: string;
}

export default function ProductVideoSection({
  video,
  productColor = "#7C3AED",
}: ProductVideoSectionProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
    console.log(isPlaying ? "Pause video" : "Play video");
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
    console.log(isMuted ? "Unmute video" : "Mute video");
  };

  if (!video) return null;

  return (
    <section className="w-full py-12 lg:py-16 relative overflow-hidden">
      {/* Dynamic gradient background */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(circle at 25% 30%, ${productColor}08 0%, transparent 50%),
            radial-gradient(circle at 75% 70%, ${productColor}05 0%, transparent 50%),
            linear-gradient(to bottom, white 0%, ${productColor}03 100%)
          `,
        }}
      />

      {/* Animated decorative orbs */}
      <div className="absolute inset-0 opacity-30">
        <div
          className="absolute top-20 left-10 w-72 h-72 rounded-full blur-3xl opacity-0 animate-float"
          style={{ background: `${productColor}20` }}
        />
        <div
          className="absolute bottom-20 right-10 w-96 h-96 rounded-full blur-3xl opacity-0 animate-float-delayed"
          style={{ background: `${productColor}15` }}
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div
          className="text-center mb-10 lg:mb-12 opacity-0 animate-fade-in"
          dir="rtl"
        >
          <div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-4 backdrop-blur-sm"
            style={{
              background: `${productColor}10`,
              border: `1px solid ${productColor}30`,
            }}
          >
            <Film className="w-4 h-4" style={{ color: productColor }} />
            <span className="text-sm font-bold" style={{ color: productColor }}>
              شاهد الفيديو
            </span>
          </div>

          <h2 className="text-3xl lg:text-5xl font-black mb-3 bg-gradient-to-br from-gray-900 to-gray-600 bg-clip-text text-transparent">
            {video.title}
          </h2>
          <p
            className="text-base lg:text-lg text-gray-600 max-w-2xl mx-auto"
            dir="rtl"
          >
            اكتشف المزيد عن منتجنا من خلال هذا الفيديو
          </p>
        </div>

        {/* Video Player */}
        <div
          className="max-w-5xl mx-auto opacity-0 animate-fade-in-up"
          style={{ animationDelay: "200ms" }}
        >
          <Card
            className="overflow-hidden border-2 shadow-2xl hover:shadow-3xl transition-all duration-500 rounded-3xl"
            style={{ borderColor: `${productColor}30` }}
          >
            <CardContent className="p-0 relative">
              <div
                className="relative aspect-video group cursor-pointer overflow-hidden"
                onClick={togglePlay}
              >
                {/* Video thumbnail */}
                <div className="absolute inset-0 transition-transform duration-700 group-hover:scale-105">
                  <Image
                    src={video.thumbnail}
                    alt={video.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent group-hover:from-black/50 transition-all duration-300" />
                </div>

                {/* Play button overlay */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="relative">
                    {/* Pulsing rings */}
                    {!isPlaying && (
                      <>
                        <div
                          className="absolute inset-0 rounded-full animate-ping-slow opacity-75"
                          style={{ background: productColor }}
                        />
                        <div
                          className="absolute inset-0 rounded-full animate-pulse opacity-50"
                          style={{ background: productColor }}
                        />
                      </>
                    )}

                    {/* Main play button */}
                    <Button
                      size="lg"
                      className="relative w-20 h-20 lg:w-24 lg:h-24 rounded-full bg-white hover:bg-white shadow-2xl transition-all duration-300 hover:scale-110 group-hover:scale-110"
                      style={{
                        color: productColor,
                        boxShadow: `0 20px 60px ${productColor}40`,
                      }}
                    >
                      {isPlaying ? (
                        <Pause className="w-8 h-8 lg:w-10 lg:h-10" />
                      ) : (
                        <Play className="w-8 h-8 lg:w-10 lg:h-10 ml-1" />
                      )}
                    </Button>
                  </div>
                </div>

                {/* Video controls overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-4 lg:p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="flex items-center justify-between backdrop-blur-md bg-black/30 rounded-xl p-3 lg:p-4">
                    {/* Left side controls */}
                    <div className="flex items-center gap-2 lg:gap-3">
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleMute();
                        }}
                        className="w-9 h-9 lg:w-10 lg:h-10 rounded-full bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 border-0 transition-all duration-300 hover:scale-110"
                      >
                        {isMuted ? (
                          <VolumeX className="w-4 h-4 lg:w-5 lg:h-5" />
                        ) : (
                          <Volume2 className="w-4 h-4 lg:w-5 lg:h-5" />
                        )}
                      </Button>

                      {isPlaying && (
                        <span className="text-white text-xs lg:text-sm font-medium">
                          00:45 / 02:30
                        </span>
                      )}
                    </div>

                    {/* Right side - Quality badge */}
                    <div className="flex items-center gap-2">
                      <div className="px-3 py-1 rounded-full bg-white/20 backdrop-blur-sm">
                        <span className="text-white text-xs font-bold">HD</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Progress bar */}
                <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-white/20">
                  <div
                    className="h-full transition-all duration-300"
                    style={{
                      width: isPlaying ? "45%" : "0%",
                      background: `linear-gradient(90deg, ${productColor}, ${productColor}cc)`,
                    }}
                  />
                </div>

                {/* Decorative corner accents */}
                <div
                  className="absolute top-4 left-4 w-12 h-12 border-t-2 border-l-2 rounded-tl-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ borderColor: "white" }}
                />
                <div
                  className="absolute top-4 right-4 w-12 h-12 border-t-2 border-r-2 rounded-tr-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ borderColor: "white" }}
                />
                <div
                  className="absolute bottom-4 left-4 w-12 h-12 border-b-2 border-l-2 rounded-bl-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ borderColor: "white" }}
                />
                <div
                  className="absolute bottom-4 right-4 w-12 h-12 border-b-2 border-r-2 rounded-br-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ borderColor: "white" }}
                />
              </div>
            </CardContent>
          </Card>

          {/* Video info below */}
          <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4 px-2">
            <div className="flex items-center gap-3" dir="rtl">
              <div
                className="w-2 h-2 rounded-full animate-pulse"
                style={{ background: productColor }}
              />
              <p className="text-sm text-gray-600 font-medium">
                شاهد كيف يمكن أن يغير منتجنا حياتك
              </p>
            </div>

            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-gray-100">
                <Play className="w-3 h-3 text-gray-600" />
                <span className="text-xs font-bold text-gray-600">
                  2.5K مشاهدة
                </span>
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
        @keyframes ping-slow {
          0% {
            transform: scale(1);
            opacity: 1;
          }
          75%,
          100% {
            transform: scale(2);
            opacity: 0;
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
        .animate-ping-slow {
          animation: ping-slow 2s cubic-bezier(0, 0, 0.2, 1) infinite;
        }
      `}</style>
    </section>
  );
}
