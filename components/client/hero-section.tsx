"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"
import Link from "next/link"
import { motion, useScroll, useTransform } from "framer-motion"
import { ShoppingCart, Star, Sparkles, Zap, Award, TrendingUp } from "lucide-react"
import { useState, useEffect } from "react"

export default function HeroSection() {
  return (
    <section className="w-full min-h-[400px] md:min-h-[720px] relative overflow-hidden">
      {/* Desktop layout: colored blocks and overlapping images */}
      <div className="hidden md:flex absolute inset-0 w-full h-full z-0">
        <div className="flex-1 bg-[#2ec4c8]" />
        <div className="flex-1 bg-[#3ed6e0]" />
        <div className="flex-2 bg-[#d32f2f]" />
        <div className="flex-1 bg-[#b71c1c]" />
        <div className="flex-1 bg-[#8d153a]" />
      </div>

      {/* Images centered between color blocks */}
      {/* <img
        src="/placeholder-user.jpg"
        alt="Product 1"
        className="hidden md:block absolute top-1/2 left-[15%] -translate-x-1/2 -translate-y-1/2 z-10 w-68 h-72 object-cover  shadow-lg"
        style={{ maxHeight: '80%' }}
      />
      <img
        src="/arab-female-athlete.jpg"
        alt="Product 2"
        className="hidden md:block absolute top-1/2 left-[35%] -translate-x-1/2 -translate-y-1/2 z-10 w-68 h-72 object-cover shadow-lg"
        style={{ maxHeight: '80%' }}
      /> */}
      {/* <img
        src="/arab-male-fitness-trainer.jpg"
        alt="Product 3"
        className="hidden md:block absolute top-1/2 left-[65%] -translate-x-1/2 -translate-y-1/2 z-10 w-68 h-72 object-cover  shadow-lg"
        style={{ maxHeight: '90%' }}
      />
      <img
        src="/arab-male-bodybuilder.jpg"
        alt="Product 4"
        className="hidden md:block absolute top-1/2 left-[85%] -translate-x-1/2 -translate-y-1/2 z-10 w-68 h-72 object-cover "
        style={{ maxHeight: '90%' }}
      /> */}

      {/* Centered text and button */}
      <div className="hidden md:flex absolute inset-0 flex-col items-center justify-center z-20 text-center">
        <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-4 mt-8 md:mt-0 text-white">
          تذوق<br className="hidden md:block" />أهدافك
        </h1>
        <a
          href="/products"
          className="inline-flex items-center justify-center bg-black text-white text-lg font-semibold rounded px-10 py-4 mt-4 shadow-lg hover:bg-gray-900 transition-colors focus:outline-none focus:ring-2 focus:ring-white"
        >
          تسوق الآن <span className="mr-2 text-2xl">&#8592;</span>
        </a>
      </div>

      {/* Mobile layout (unchanged) */}
      <div className="flex md:hidden flex-col w-full">
        <div className="flex flex-row w-full h-40">
          <div className="flex-1 bg-[#2ec4c8] flex items-center justify-center relative">
            {/* <img
              src="/placeholder-user.jpg"
              alt="Product 1"
              className="object-contain h-28 w-auto mx-auto rounded-b-xl shadow-lg"
            />
            <img
              src="/protein-powder-assortment.png"
              alt="Goli Pre+Probiotic"
              className="absolute left-1/2 -translate-x-1/2 bottom-2 w-16 h-16 object-contain z-10"
            /> */}
          </div>
          <div className="flex-1 bg-[#3ed6e0] flex items-center justify-center relative">
            {/* <img
              src="/arab-female-athlete.jpg"
              alt="Product 2"
              className="object-contain h-28 w-auto mx-auto rounded-b-xl shadow-lg"
            />
            <div className="absolute left-2 bottom-10 bg-white rounded-full border-2 border-[#3ed6e0] w-12 h-12 flex flex-col items-center justify-center text-center shadow-lg z-20">
              <span className="text-[#00b4d8] text-lg font-bold leading-none">#1</span>
              <span className="text-[8px] font-semibold text-[#00b4d8]">Ashwagandha<br/>Vitamin</span>
            </div>
            <img
              src="/creatine-supplement.jpg"
              alt="Goli Ashwagandha"
              className="absolute left-1/2 -translate-x-1/2 bottom-2 w-10 h-10 object-contain z-10"
            /> */}
          </div>
        </div>

        <div className="bg-[#d32f2f] text-white text-center py-8 px-2 relative">
          <h1 className="text-2xl font-bold tracking-tight mb-2">تذوق أهدافك</h1>
          <a href="#products" className="inline-flex items-center justify-center bg-black text-white text-base font-semibold rounded px-6 py-3 mt-2 shadow-lg hover:bg-gray-900 transition-colors focus:outline-none focus:ring-2 focus:ring-white">
            تسوق الآن <span className="mr-2 text-xl">&#8592;</span>
          </a>
          <div className="absolute top-2 left-2 bg-white rounded-full border-2 border-[#d32f2f] w-16 h-16 flex flex-col items-center justify-center text-center shadow-lg z-30">
            <span className="text-[#d32f2f] text-xl font-bold leading-none">#1</span>
            <span className="text-[8px] font-semibold text-[#d32f2f]">فيتامين ACV</span>
          </div>
        </div>

        <div className="flex flex-row w-full h-40">
          <div className="flex-1 bg-[#b71c1c] flex items-center justify-center relative">
           
          </div>
        </div>
      </div>
    </section>
  );
}
