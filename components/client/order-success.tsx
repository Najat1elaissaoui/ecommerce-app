"use client"

import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, Package, Truck, Phone, Home, ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function OrderSuccess() {
  const searchParams = useSearchParams()
  const orderId = searchParams.get("orderId")
  const [showConfetti, setShowConfetti] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setShowConfetti(false), 3000)
    return () => clearTimeout(timer)
  }, [])

  const orderSteps = [
    {
      icon: CheckCircle,
      title: "تم استلام الطلب",
      description: "تم تأكيد طلبك بنجاح",
      status: "completed",
    },
    {
      icon: Package,
      title: "جاري التحضير",
      description: "نقوم بتحضير طلبك للشحن",
      status: "current",
    },
    {
      icon: Truck,
      title: "في الطريق",
      description: "سيتم شحن طلبك قريباً",
      status: "upcoming",
    },
    {
      icon: Home,
      title: "تم التسليم",
      description: "سيصل طلبك خلال 24-48 ساعة",
      status: "upcoming",
    },
  ]

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-4xl mx-auto">
        {/* Success Header */}
        <div className="text-center mb-12">
          <div className="relative">
            <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce">
              <CheckCircle className="w-12 h-12 text-green-600" />
            </div>
            {showConfetti && (
              <div className="absolute inset-0 pointer-events-none">
                {[...Array(20)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute w-2 h-2 bg-primary rounded-full animate-ping"
                    style={{
                      left: `${Math.random() * 100}%`,
                      top: `${Math.random() * 100}%`,
                      animationDelay: `${Math.random() * 2}s`,
                    }}
                  />
                ))}
              </div>
            )}
          </div>

          <h1 className="text-4xl font-bold text-foreground mb-4">تم تأكيد طلبك بنجاح!</h1>
          <p className="text-xl text-muted-foreground mb-2">شكراً لك على ثقتك في متجرنا</p>
          {orderId && (
            <p className="text-lg">
              رقم الطلب: <span className="font-bold text-primary">#{orderId}</span>
            </p>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Order Status */}
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle>حالة الطلب</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {orderSteps.map((step, index) => (
                  <div key={index} className="flex items-center gap-4">
                    <div
                      className={`w-12 h-12 rounded-full flex items-center justify-center ${
                        step.status === "completed"
                          ? "bg-green-100 text-green-600"
                          : step.status === "current"
                            ? "bg-primary/10 text-primary"
                            : "bg-muted text-muted-foreground"
                      }`}
                    >
                      <step.icon className="w-6 h-6" />
                    </div>
                    <div className="flex-1">
                      <h3
                        className={`font-semibold ${
                          step.status === "completed" || step.status === "current"
                            ? "text-foreground"
                            : "text-muted-foreground"
                        }`}
                      >
                        {step.title}
                      </h3>
                      <p className="text-sm text-muted-foreground">{step.description}</p>
                    </div>
                    {step.status === "completed" && <CheckCircle className="w-5 h-5 text-green-600" />}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Next Steps */}
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle>ماذا بعد؟</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Phone className="w-4 h-4 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">سنتواصل معك قريباً</h4>
                    <p className="text-sm text-muted-foreground">
                      سيتصل بك فريقنا خلال ساعة لتأكيد الطلب وتفاصيل التسليم
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Package className="w-4 h-4 text-green-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">تحضير الطلب</h4>
                    <p className="text-sm text-muted-foreground">سنقوم بتحضير طلبك بعناية فائقة لضمان الجودة</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Truck className="w-4 h-4 text-purple-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">التسليم السريع</h4>
                    <p className="text-sm text-muted-foreground">سيصل طلبك خلال 24-48 ساعة مع الشحن المجاني</p>
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t border-border">
                <h4 className="font-semibold text-foreground mb-3">معلومات مهمة</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• احتفظ برقم الطلب للمراجعة</li>
                  <li>• تأكد من توفرك لاستلام الطلب</li>
                  <li>• يمكنك الدفع نقداً عند الاستلام</li>
                  <li>• لأي استفسار اتصل على: 966501234567+</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-12">
          <Button size="lg" asChild>
            <Link href="/products" className="gap-2">
              <ArrowLeft className="w-5 h-5" />
              متابعة التسوق
            </Link>
          </Button>
          <Button size="lg" variant="outline" asChild>
            <Link href="/" className="bg-transparent">
              العودة للرئيسية
            </Link>
          </Button>
        </div>

        {/* Contact Support */}
        <div className="text-center mt-12 p-6 bg-muted/30 rounded-lg">
          <h3 className="font-semibold text-foreground mb-2">هل تحتاج مساعدة؟</h3>
          <p className="text-muted-foreground mb-4">فريق خدمة العملاء متاح على مدار الساعة لمساعدتك</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="outline" className="bg-transparent">
              <Phone className="w-4 h-4 ml-2" />
              اتصل بنا: 966501234567+
            </Button>
            <Button variant="outline" className="bg-transparent">
              واتساب: 966501234567+
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
