"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Zap, Target, TrendingUp, Heart, Brain, Shield } from "lucide-react"

export default function Benefits() {
  const benefits = [
    {
      icon: Zap,
      title: "زيادة الطاقة",
      description: "احصل على طاقة أكبر لتمارينك اليومية",
    },
    {
      icon: Target,
      title: "تحقيق الأهداف",
      description: "وصل لأهدافك اللياقية بشكل أسرع",
    },
    {
      icon: TrendingUp,
      title: "تحسين الأداء",
      description: "عزز من أدائك الرياضي والبدني",
    },
    {
      icon: Heart,
      title: "صحة القلب",
      description: "دعم صحة القلب والأوعية الدموية",
    },
    {
      icon: Brain,
      title: "تركيز أفضل",
      description: "تحسين التركيز والوضوح الذهني",
    },
    {
      icon: Shield,
      title: "تقوية المناعة",
      description: "دعم جهاز المناعة الطبيعي",
    },
  ]

  return (
    <section className="py-20 bg-gradient-to-br from-primary/5 to-accent/5">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 animate-slide-in-right">
            الفوائد التي ستحصل عليها
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-pretty animate-slide-in-left">
            مكملاتنا الغذائية مصممة لتمنحك أفضل النتائج في رحلتك نحو الصحة واللياقة
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <Card
              key={benefit.title}
              className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg bg-card/80 backdrop-blur-sm animate-slide-in-left"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <CardContent className="p-8 text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <benefit.icon className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-4">{benefit.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{benefit.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
