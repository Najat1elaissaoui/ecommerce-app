"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Star, Quote } from "lucide-react"

export default function Testimonials() {
  const testimonials = [
    {
      name: "أحمد محمد",
      role: "مدرب شخصي",
      content: "منتجات عالية الجودة وخدمة ممتازة. لاحظت تحسن كبير في أدائي الرياضي بعد استخدام مكملاتهم.",
      rating: 5,
      avatar: "/arab-male-fitness-trainer.jpg",
    },
    {
      name: "فاطمة علي",
      role: "رياضية",
      content: "أفضل متجر للمكملات الغذائية في المملكة. المنتجات أصلية والأسعار معقولة جداً.",
      rating: 5,
      avatar: "/arab-female-athlete.jpg",
    },
    {
      name: "محمد سالم",
      role: "لاعب كمال أجسام",
      content: "التوصيل سريع والمنتجات تأتي بتغليف ممتاز. أنصح الجميع بالتسوق من هنا.",
      rating: 5,
      avatar: "/arab-male-bodybuilder.jpg",
    },
  ]

  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 animate-slide-in-right">
            ماذا يقول عملاؤنا؟
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-pretty animate-slide-in-left">
            آراء حقيقية من عملائنا الذين جربوا منتجاتنا وحققوا نتائج مذهلة
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card
              key={testimonial.name}
              className="hover:shadow-xl transition-all duration-300 border-0 shadow-lg animate-slide-in-left"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <CardContent className="p-8">
                <Quote className="w-8 h-8 text-primary mb-4" />

                <p className="text-muted-foreground leading-relaxed mb-6 text-pretty">"{testimonial.content}"</p>

                <div className="flex items-center gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>

                <div className="flex items-center gap-4">
                  <img
                    src={testimonial.avatar || "/placeholder.svg"}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <h4 className="font-semibold text-foreground">{testimonial.name}</h4>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
