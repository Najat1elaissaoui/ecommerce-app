"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Shield, Truck, Award, HeadphonesIcon, CreditCard, RefreshCw } from "lucide-react"

export default function WhyUs() {
  const features = [
    {
      icon: Shield,
      title: "جودة مضمونة",
      description: "جميع منتجاتنا أصلية ومعتمدة من الجهات المختصة",
      color: "text-green-600",
      bgColor: "bg-green-50",
    },
    {
      icon: Truck,
      title: "شحن سريع",
      description: "توصيل مجاني لجميع أنحاء المملكة خلال 24-48 ساعة",
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      icon: Award,
      title: "أفضل الأسعار",
      description: "أسعار تنافسية مع عروض وخصومات حصرية",
      color: "text-purple-600",
      bgColor: "bg-purple-50",
    },
    {
      icon: HeadphonesIcon,
      title: "دعم 24/7",
      description: "فريق دعم العملاء متاح على مدار الساعة لمساعدتك",
      color: "text-orange-600",
      bgColor: "bg-orange-50",
    },
    {
      icon: CreditCard,
      title: "دفع آمن",
      description: "طرق دفع متعددة وآمنة لراحتك وأمانك",
      color: "text-indigo-600",
      bgColor: "bg-indigo-50",
    },
    {
      icon: RefreshCw,
      title: "ضمان الاستبدال",
      description: "إمكانية الاستبدال خلال 14 يوم من تاريخ الشراء",
      color: "text-red-600",
      bgColor: "bg-red-50",
    },
  ]

  return (
    <section id="why-us" className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 animate-slide-in-right">لماذا تختارنا؟</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-pretty animate-slide-in-left">
            نحن نقدم أكثر من مجرد منتجات، نقدم تجربة شراء متكاملة تضمن رضاك التام
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card
              key={feature.title}
              className="hover:shadow-xl transition-all duration-300 border-0 shadow-lg animate-slide-in-left"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <CardHeader className="text-center">
                <div
                  className={`w-16 h-16 ${feature.bgColor} rounded-full flex items-center justify-center mx-auto mb-4`}
                >
                  <feature.icon className={`w-8 h-8 ${feature.color}`} />
                </div>
                <CardTitle className="text-xl text-foreground">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-center leading-relaxed">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
