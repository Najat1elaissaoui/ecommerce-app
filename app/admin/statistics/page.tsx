"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from 'recharts'
import { 
  TrendingUp, 
  TrendingDown, 
  ShoppingCart, 
  Package, 
  Users, 
  DollarSign,
  Calendar,
  AlertTriangle,
  CheckCircle,
  Clock
} from "lucide-react"

interface DashboardStats {
  totalProducts: number
  lowStockProducts: number
  totalOrdersThisMonth: number
  pendingOrders: number
  totalRevenue: number
  revenueGrowth: number
}

interface ChartData {
  date: string
  orders: number
  revenue: number
}

interface StatusData {
  status: string
  count: number
  color: string
}

export default function StatisticsPage() {
  const [timeRange, setTimeRange] = useState<'day' | 'week' | 'month' | 'custom'>('week')
  const [stats, setStats] = useState<DashboardStats>({
    totalProducts: 0,
    lowStockProducts: 0,
    totalOrdersThisMonth: 0,
    pendingOrders: 0,
    totalRevenue: 0,
    revenueGrowth: 0
  })
  const [chartData, setChartData] = useState<ChartData[]>([])
  const [statusData, setStatusData] = useState<StatusData[]>([])

  // Mock data generation
  useEffect(() => {
    const generateMockData = () => {
      // Generate chart data based on time range
      const generateChartData = () => {
        const data: ChartData[] = []
        const days = timeRange === 'day' ? 24 : timeRange === 'week' ? 7 : 30
        
        for (let i = days - 1; i >= 0; i--) {
          const date = new Date()
          if (timeRange === 'day') {
            date.setHours(date.getHours() - i)
          } else {
            date.setDate(date.getDate() - i)
          }
          
          data.push({
            date: timeRange === 'day' 
              ? date.getHours().toString().padStart(2, '0') + ':00'
              : date.toLocaleDateString('ar-SA', { month: 'short', day: 'numeric' }),
            orders: Math.floor(Math.random() * 10) + 1,
            revenue: Math.floor(Math.random() * 1000) + 200
          })
        }
        return data
      }

      setStats({
        totalProducts: 156,
        lowStockProducts: 8,
        totalOrdersThisMonth: 342,
        pendingOrders: 12,
        totalRevenue: 45680.50,
        revenueGrowth: 12.5
      })

      setChartData(generateChartData())

      setStatusData([
        { status: 'في الانتظار', count: 12, color: '#f59e0b' },
        { status: 'مؤكدة', count: 28, color: '#10b981' },
        { status: 'مُرسلة', count: 45, color: '#3b82f6' },
        { status: 'ملغية', count: 3, color: '#ef4444' }
      ])
    }

    generateMockData()
  }, [timeRange])

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('ar-SA', {
      style: 'currency',
      currency: 'SAR'
    }).format(value)
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">الإحصائيات والتقارير</h1>
          <p className="text-muted-foreground">نظرة شاملة على أداء المتجر</p>
        </div>
        <div className="flex items-center gap-4">
          <Select value={timeRange} onValueChange={(value) => setTimeRange(value as any)}>
            <SelectTrigger className="w-48">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="day">آخر 24 ساعة</SelectItem>
              <SelectItem value="week">آخر أسبوع</SelectItem>
              <SelectItem value="month">آخر شهر</SelectItem>
              <SelectItem value="custom">فترة مخصصة</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Key Performance Indicators */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">إجمالي المنتجات</p>
                <p className="text-2xl font-bold">{stats.totalProducts}</p>
              </div>
              <Package className="w-8 h-8 text-blue-500" />
            </div>
            <div className="mt-4 flex items-center">
              <span className="text-xs text-muted-foreground">منتجات نشطة</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">مخزون منخفض</p>
                <p className="text-2xl font-bold text-red-500">{stats.lowStockProducts}</p>
              </div>
              <AlertTriangle className="w-8 h-8 text-red-500" />
            </div>
            <div className="mt-4 flex items-center">
              <span className="text-xs text-muted-foreground">يحتاج إعادة تموين</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">طلبات هذا الشهر</p>
                <p className="text-2xl font-bold">{stats.totalOrdersThisMonth}</p>
              </div>
              <ShoppingCart className="w-8 h-8 text-green-500" />
            </div>
            <div className="mt-4 flex items-center">
              <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
              <span className="text-sm font-medium text-green-600">+15% من الشهر السابق</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">الإيرادات الإجمالية</p>
                <p className="text-2xl font-bold">{formatCurrency(stats.totalRevenue)}</p>
              </div>
              <DollarSign className="w-8 h-8 text-purple-500" />
            </div>
            <div className="mt-4 flex items-center">
              <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
              <span className="text-sm font-medium text-green-600">+{stats.revenueGrowth}%</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Orders and Revenue Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>عدد الطلبات</CardTitle>
            <CardDescription>
              {timeRange === 'day' ? 'الطلبات خلال آخر 24 ساعة' : 
               timeRange === 'week' ? 'الطلبات خلال آخر أسبوع' : 'الطلبات خلال آخر شهر'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip 
                  labelFormatter={(label) => `التاريخ: ${label}`}
                  formatter={(value) => [`${value} طلب`, 'عدد الطلبات']}
                />
                <Area type="monotone" dataKey="orders" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.2} />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>الإيرادات</CardTitle>
            <CardDescription>
              {timeRange === 'day' ? 'الإيرادات خلال آخر 24 ساعة' : 
               timeRange === 'week' ? 'الإيرادات خلال آخر أسبوع' : 'الإيرادات خلال آخر شهر'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip 
                  labelFormatter={(label) => `التاريخ: ${label}`}
                  formatter={(value) => [`${formatCurrency(value as number)}`, 'الإيرادات']}
                />
                <Line type="monotone" dataKey="revenue" stroke="#10b981" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Order Status Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>توزيع حالات الطلبات</CardTitle>
            <CardDescription>نسبة كل حالة من إجمالي الطلبات</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={statusData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="count"
                >
                  {statusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => [`${value} طلب`]} />
                {/* <Legend 
                  formatter={(value, entry) => `${value}: ${entry.payload?.count} طلب`}
                /> */}
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>ملخص الحالات</CardTitle>
            <CardDescription>عدد الطلبات في كل حالة</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {statusData.map((item, index) => {
                const Icon = item.status === 'في الانتظار' ? Clock :
                           item.status === 'مؤكدة' ? CheckCircle :
                           item.status === 'مُرسلة' ? ShoppingCart : AlertTriangle
                
                return (
                  <div key={index} className="flex items-center justify-between p-4 rounded-lg border">
                    <div className="flex items-center gap-3">
                      <Icon className="w-5 h-5" style={{ color: item.color }} />
                      <span className="font-medium">{item.status}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-2xl font-bold">{item.count}</span>
                      <span className="text-sm text-muted-foreground">طلب</span>
                    </div>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Additional Stats */}
      <Card>
        <CardHeader>
          <CardTitle>معدلات الأداء</CardTitle>
          <CardDescription>مؤشرات أداء رئيسية للمتجر</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-6 border rounded-lg">
              <div className="text-3xl font-bold text-blue-600 mb-2">95.2%</div>
              <p className="text-sm text-muted-foreground">معدل إتمام الطلبات</p>
              <div className="mt-2 flex items-center justify-center">
                <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                <span className="text-sm text-green-600">+2.1%</span>
              </div>
            </div>
            
            <div className="text-center p-6 border rounded-lg">
              <div className="text-3xl font-bold text-green-600 mb-2">₽128.50</div>
              <p className="text-sm text-muted-foreground">متوسط قيمة الطلب</p>
              <div className="mt-2 flex items-center justify-center">
                <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                <span className="text-sm text-green-600">+8.3%</span>
              </div>
            </div>
            
            <div className="text-center p-6 border rounded-lg">
              <div className="text-3xl font-bold text-purple-600 mb-2">2.3</div>
              <p className="text-sm text-muted-foreground">متوسط المنتجات لكل طلب</p>
              <div className="mt-2 flex items-center justify-center">
                <TrendingDown className="w-4 h-4 text-red-500 mr-1" />
                <span className="text-sm text-red-600">-1.2%</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}