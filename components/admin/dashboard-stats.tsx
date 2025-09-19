"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Package, AlertTriangle, ShoppingCart, Clock, TrendingUp } from "lucide-react"

interface DashboardStatsProps {
  stats: {
    totalRevenue: number
    totalOrders: number
    totalProducts: number
    totalCustomers: number
  }
}

export default function DashboardStats({ stats }: DashboardStatsProps) {
  const statCards = [
    {
      title: "إجمالي المنتجات",
      value: stats.totalProducts,
      icon: Package,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      change: "+12%",
    },
    {
      title: "منتجات قليلة المخزون",
      value: 8,
      icon: AlertTriangle,
      color: "text-orange-600",
      bgColor: "bg-orange-50",
      change: "-5%",
    },
    {
      title: "طلبات هذا الشهر",
      value: stats.totalOrders,
      icon: ShoppingCart,
      color: "text-green-600",
      bgColor: "bg-green-50",
      change: "+23%",
    },
    {
      title: "طلبات في الانتظار",
      value: 15,
      icon: Clock,
      color: "text-yellow-600",
      bgColor: "bg-yellow-50",
      change: "+8%",
    },
    {
      title: "إجمالي الإيرادات",
      value: `${stats.totalRevenue.toLocaleString("ar-SA")} ر.س`,
      icon: TrendingUp,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
      change: "+18%",
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
      {statCards.map((stat, index) => (
        <Card key={stat.title} className="hover:shadow-lg transition-all duration-300 border shadow-md">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">{stat.title}</CardTitle>
            <div className={`p-2 rounded-lg ${stat.bgColor}`}>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900 mb-1">
              {typeof stat.value === "number" ? stat.value.toLocaleString("ar-SA") : stat.value}
            </div>
            <p className="text-xs text-green-600 font-medium">{stat.change} من الشهر الماضي</p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
