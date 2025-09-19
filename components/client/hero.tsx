"use client"

import { Button } from "@/components/ui/button"
import { ArrowLeft, Star, Shield, Truck } from "lucide-react"
import Link from "next/link"

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-primary/5 via-background to-accent/5">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 right-20 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-float" />
        <div
          className="absolute bottom-20 left-20 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-float"
          style={{ animationDelay: "1s" }}
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="text-center lg:text-right animate-slide-in-right">
            <div className="inline-flex items-center gap-2 bg-accent/10 text-accent px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Star className="w-4 h-4 fill-current" />
              أفضل المكملات الغذائية في المملكة
            </div>

            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6 text-balance">
              اكتشف قوتك الحقيقية مع
              <span className="text-transparent bg-gradient-to-l from-primary to-accent bg-clip-text">
                {" "}
                أفضل المكملات
              </span>
            </h1>

            <p className="text-xl text-muted-foreground mb-8 text-pretty max-w-2xl mx-auto lg:mx-0">
              نقدم لك مجموعة متنوعة من المكملات الغذائية عالية الجودة لتحقيق أهدافك الصحية واللياقية بأمان وفعالية
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-12">
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground animate-glow">
                <Link href="/products" className="flex items-center gap-2">
                  تسوق الآن
                  <ArrowLeft className="w-4 h-4" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-primary text-primary hover:bg-primary/10 bg-transparent"
              >
                تعرف على المزيد
              </Button>
            </div>

            {/* Trust indicators */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-8 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-green-600" />
                منتجات معتمدة
              </div>
              <div className="flex items-center gap-2">
                <Truck className="w-5 h-5 text-blue-600" />
                شحن مجاني
              </div>
              <div className="flex items-center gap-2">
                <Star className="w-5 h-5 text-yellow-600" />
                تقييم 4.9/5
              </div>
            </div>
          </div>

          {/* Hero Image */}
          <div className="relative animate-slide-in-left">
            <div className="relative">
              <img
                src="/muscular-athlete-holding-protein-supplement-bottle.jpg"
                alt="رياضي يحمل مكمل غذائي"
                className="w-full max-w-lg mx-auto rounded-2xl shadow-2xl animate-float"
              />

              {/* Floating cards */}
              <div
                className="absolute -top-4 -right-4 bg-card border border-border rounded-xl p-4 shadow-lg animate-slide-in-right"
                style={{ animationDelay: "0.5s" }}
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                    <span className="text-green-600 font-bold">✓</span>
                  </div>
                  <div>
                    <p className="font-semibold text-sm">جودة مضمونة</p>
                    <p className="text-xs text-muted-foreground">100% أصلي</p>
                  </div>
                </div>
              </div>

              <div
                className="absolute -bottom-4 -left-4 bg-card border border-border rounded-xl p-4 shadow-lg animate-slide-in-left"
                style={{ animationDelay: "0.7s" }}
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <Truck className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-sm">توصيل سريع</p>
                    <p className="text-xs text-muted-foreground">خلال 24 ساعة</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
