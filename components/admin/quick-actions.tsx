"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus, Package, ShoppingCart, BarChart3, Settings, Users } from "lucide-react"

export default function QuickActions() {
  const actions = [
    {
      title: "إضافة منتج جديد",
      description: "أضف منتج جديد إلى المتجر",
      icon: Plus,
      color: "bg-blue-600 hover:bg-blue-700",
    },
    {
      title: "إدارة المنتجات",
      description: "عرض وتعديل المنتجات الموجودة",
      icon: Package,
      color: "bg-green-600 hover:bg-green-700",
    },
    {
      title: "إدارة الطلبات",
      description: "متابعة وإدارة طلبات العملاء",
      icon: ShoppingCart,
      color: "bg-orange-600 hover:bg-orange-700",
    },
    {
      title: "التقارير والإحصائيات",
      description: "عرض تقارير مفصلة عن الأداء",
      icon: BarChart3,
      color: "bg-purple-600 hover:bg-purple-700",
    },
    {
      title: "إعدادات النظام",
      description: "تخصيص إعدادات المتجر",
      icon: Settings,
      color: "bg-gray-600 hover:bg-gray-700",
    },
    {
      title: "إدارة المدراء",
      description: "إضافة وإدارة حسابات المدراء",
      icon: Users,
      color: "bg-red-600 hover:bg-red-700",
    },
  ]

  return (
    <Card className="shadow-lg border">
      <CardHeader>
        <CardTitle className="text-blue-600">الإجراءات السريعة</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {actions.map((action, index) => (
            <Button
              key={action.title}
              variant="outline"
              className="w-full h-auto p-6 flex flex-col items-center gap-3 hover:shadow-lg transition-all duration-300 border bg-white hover:bg-gray-50"
              onClick={() => alert(`${action.title} - قريباً`)}
            >
              <div className={`p-3 rounded-full ${action.color} text-white`}>
                <action.icon className="w-6 h-6" />
              </div>
              <div className="text-center">
                <h3 className="font-semibold text-gray-900 mb-1">{action.title}</h3>
                <p className="text-xs text-gray-600">{action.description}</p>
              </div>
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
