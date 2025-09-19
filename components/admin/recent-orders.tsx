"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Eye, Phone, MapPin } from "lucide-react"

const recentOrders = [
  {
    id: 1,
    clientName: "أحمد محمد",
    phone: "0123456789",
    city: "الرياض",
    total: 299.99,
    status: "en_attente",
    createdAt: "منذ 5 دقائق",
  },
  {
    id: 2,
    clientName: "فاطمة علي",
    phone: "0987654321",
    city: "جدة",
    total: 399.99,
    status: "validee",
    createdAt: "منذ 15 دقيقة",
  },
  {
    id: 3,
    clientName: "محمد سالم",
    phone: "0555123456",
    city: "الدمام",
    total: 149.99,
    status: "expediee",
    createdAt: "منذ ساعة",
  },
]

const statusColors = {
  en_attente: "bg-yellow-100 text-yellow-800",
  validee: "bg-green-100 text-green-800",
  annulee: "bg-red-100 text-red-800",
  expediee: "bg-blue-100 text-blue-800",
}

const statusLabels = {
  en_attente: "في الانتظار",
  validee: "مؤكد",
  annulee: "ملغي",
  expediee: "مُرسل",
}

export default function RecentOrders() {
  return (
    <Card className="animate-slide-in-right shadow-lg border-0">
      <CardHeader>
        <CardTitle className="text-primary">الطلبات الأخيرة</CardTitle>
        <CardDescription>آخر الطلبات المستلمة في النظام</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {recentOrders.map((order, index) => (
            <div
              key={order.id}
              className="flex items-center justify-between p-4 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors animate-slide-in-left"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h4 className="font-semibold text-foreground">{order.clientName}</h4>
                  <Badge className={statusColors[order.status as keyof typeof statusColors]}>
                    {statusLabels[order.status as keyof typeof statusLabels]}
                  </Badge>
                </div>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Phone className="w-3 h-3" />
                    {order.phone}
                  </div>
                  <div className="flex items-center gap-1">
                    <MapPin className="w-3 h-3" />
                    {order.city}
                  </div>
                  <span>{order.createdAt}</span>
                </div>
              </div>
              <div className="text-left">
                <div className="text-lg font-bold text-primary mb-2">{order.total.toLocaleString("ar-SA")} ر.س</div>
                <Button size="sm" variant="outline" className="gap-1 bg-transparent">
                  <Eye className="w-3 h-3" />
                  عرض
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
