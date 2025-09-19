"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const chartData = [
  { day: "السبت", orders: 12, revenue: 3200 },
  { day: "الأحد", orders: 19, revenue: 4800 },
  { day: "الاثنين", orders: 15, revenue: 3900 },
  { day: "الثلاثاء", orders: 25, revenue: 6200 },
  { day: "الأربعاء", orders: 22, revenue: 5500 },
  { day: "الخميس", orders: 30, revenue: 7800 },
  { day: "الجمعة", orders: 28, revenue: 7200 },
]

export default function OrdersChart() {
  return (
    <Card className="shadow-lg border">
      <CardHeader>
        <CardTitle className="text-blue-600">إحصائيات الطلبات</CardTitle>
        <CardDescription>عدد الطلبات والإيرادات خلال الأسبوع الماضي</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] flex items-end justify-between gap-2 p-4">
          {chartData.map((data, index) => (
            <div key={data.day} className="flex flex-col items-center gap-2">
              <div className="text-xs text-gray-600">{data.orders}</div>
              <div className="bg-blue-500 w-8 rounded-t" style={{ height: `${(data.orders / 30) * 200}px` }} />
              <div className="text-xs text-gray-600 text-center">{data.day}</div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
