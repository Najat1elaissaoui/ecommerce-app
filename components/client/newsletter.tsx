"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Mail, Gift } from "lucide-react"

export default function Newsletter() {
  const [email, setEmail] = useState("")
  const [isSubscribed, setIsSubscribed] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle newsletter subscription
    setIsSubscribed(true)
    setEmail("")
  }

  return (
    <section className="py-20 bg-gradient-to-br from-primary to-accent">
      <div className="container mx-auto px-4">
        <Card className="max-w-4xl mx-auto border-0 shadow-2xl bg-card/95 backdrop-blur-sm">
          <CardContent className="p-12 text-center">
            <div className="w-20 h-20 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <Gift className="w-10 h-10 text-accent" />
            </div>

            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 animate-slide-in-right">
              احصل على خصم 15%
            </h2>
            <p className="text-xl text-muted-foreground mb-8 text-pretty animate-slide-in-left">
              اشترك في نشرتنا البريدية واحصل على خصم فوري على طلبك الأول، بالإضافة إلى آخر العروض والمنتجات الجديدة
            </p>

            {!isSubscribed ? (
              <form
                onSubmit={handleSubmit}
                className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto animate-slide-in-right"
              >
                <div className="relative flex-1">
                  <Mail className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    type="email"
                    placeholder="أدخل بريدك الإلكتروني"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="pr-10 text-right"
                  />
                </div>
                <Button type="submit" className="bg-accent hover:bg-accent/90 text-accent-foreground">
                  اشترك الآن
                </Button>
              </form>
            ) : (
              <div className="animate-slide-in-left">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-green-600 text-2xl">✓</span>
                </div>
                <p className="text-green-600 font-semibold">شكراً لك! تم الاشتراك بنجاح</p>
                <p className="text-muted-foreground text-sm mt-2">ستصلك رسالة تأكيد قريباً</p>
              </div>
            )}

            <p className="text-xs text-muted-foreground mt-6">نحترم خصوصيتك ولن نشارك بياناتك مع أي طرف ثالث</p>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
