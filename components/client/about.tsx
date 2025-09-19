"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Award, Users, Clock, Heart } from "lucide-react"

export default function About() {
  const stats = [
    { icon: Users, value: "10,000+", label: "عميل راضي" },
    { icon: Award, value: "5", label: "سنوات خبرة" },
    { icon: Clock, value: "24/7", label: "دعم العملاء" },
    { icon: Heart, value: "100%", label: "رضا العملاء" },
  ]

  return (
    <section id="about" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 animate-slide-in-right">من نحن؟</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-pretty animate-slide-in-left">
            نحن متجر متخصص في توفير أفضل المكملات الغذائية عالية الجودة لمساعدتك في تحقيق أهدافك الصحية واللياقية
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
          <div className="animate-slide-in-right">
            <img
              src="/modern-supplement-store-interior-with-products.jpg"
              alt="متجر المكملات الغذائية"
              className="w-full rounded-2xl shadow-lg"
            />
          </div>

          <div className="space-y-6 animate-slide-in-left">
            <h3 className="text-2xl font-bold text-foreground">رسالتنا</h3>
            <p className="text-muted-foreground text-lg leading-relaxed">
              نؤمن بأن كل شخص يستحق الوصول إلى منتجات عالية الجودة تساعده في تحقيق أهدافه الصحية. لذلك نحرص على انتقاء
              أفضل المكملات الغذائية من أشهر العلامات التجارية العالمية.
            </p>
            <p className="text-muted-foreground text-lg leading-relaxed">
              فريقنا من الخبراء يعمل على مدار الساعة لضمان حصولك على أفضل المنتجات بأفضل الأسعار، مع خدمة عملاء متميزة
              وتوصيل سريع إلى جميع أنحاء المملكة.
            </p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <Card
              key={stat.label}
              className="text-center animate-slide-in-left border-0 shadow-lg"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <CardContent className="p-6">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="w-8 h-8 text-primary" />
                </div>
                <div className="text-3xl font-bold text-foreground mb-2">{stat.value}</div>
                <div className="text-muted-foreground">{stat.label}</div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
