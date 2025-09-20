"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Eye, Phone, MapPin } from "lucide-react"
import { formatDhs } from "@/lib/utils"

const recentOrders = [
  {
    id: 1,
    clientName: "يوسف بنعيسى",
    phone: "0612345678",
    city: "الدار البيضاء",
    total: 329.99,
    status: "en_attente",
    createdAt: "قبل 5 دقائق",
  },
  {
    id: 2,
    clientName: "فاطمة الزهراء",
    phone: "0676543210",
    city: "الرباط",
    total: 459.99,
    status: "validee",
    createdAt: "قبل 12 دقيقة",
  },
  {
    id: 3,
    clientName: "سارة العلمي",
    phone: "0655123456",
    city: "مراكش",
    total: 189.5,
    status: "expediee",
    createdAt: "قبل ساعة",
  },
]

const statusColors = {
  en_attente: "bg-yellow-100 text-yellow-800",
  validee: "bg-green-100 text-green-800",
  annulee: "bg-red-100 text-red-800",
  expediee: "bg-blue-100 text-blue-800",
}

const statusLabels = {
  en_attente: "قيد المعالجة",
  validee: "مؤكدة",
  annulee: "ملغاة",
  expediee: "مُرسلة",
}

export default function RecentOrders() {
  return (
    <Card className="animate-slide-in-right shadow-lg border-0">
      <CardHeader>
        <CardTitle className="text-primary">أحدث الطلبات</CardTitle>
        <CardDescription>آخر الطلبات المسجلة في المنصة</CardDescription>
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
                <div className="text-lg font-bold text-primary mb-2">{formatDhs(order.total)}</div>
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
