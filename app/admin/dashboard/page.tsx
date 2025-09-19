"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import DashboardStats from "@/components/admin/dashboard-stats"
import RecentOrders from "@/components/admin/recent-orders"
import OrdersChart from "@/components/admin/orders-chart"
import QuickActions from "@/components/admin/quick-actions"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { 
  ShoppingCart, 
  Package, 
  AlertTriangle, 
  TrendingUp,
  Users,
  DollarSign,
  Bell,
  Eye,
  Plus,
  LogOut,
  Power
} from "lucide-react"

export default function AdminDashboardPage() {
  const router = useRouter()
  const [isLoggingOut, setIsLoggingOut] = useState(false)
  const [stats, setStats] = useState({
    totalRevenue: 0,
    totalOrders: 0,
    totalProducts: 0,
    totalCustomers: 0,
    pendingOrders: 0,
    lowStockProducts: 0,
    revenueGrowth: 0
  })

  const [recentActivity, setRecentActivity] = useState([
    {
      id: 1,
      type: 'order',
      title: 'طلب جديد من أحمد محمد',
      time: 'منذ 5 دقائق',
      status: 'pending'
    },
    {
      id: 2,
      type: 'stock',
      title: 'مخزون منخفض: بروتين واي',
      time: 'منذ 15 دقيقة',
      status: 'warning'
    },
    {
      id: 3,
      type: 'order',
      title: 'تم تأكيد طلب #1001',
      time: 'منذ 30 دقيقة',
      status: 'success'
    }
  ])

  // Logout function
    const handleLogout = async () => {
    setIsLoggingOut(true)
    
    try {
      // Call server-side logout API
      const response = await fetch('/api/admin/logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      
      if (response.ok) {
        // Clear client-side session data
        localStorage.clear()
        sessionStorage.clear()
        
        // Clear any remaining cookies
        document.cookie.split(";").forEach((c) => {
          const eqPos = c.indexOf("=")
          const name = eqPos > -1 ? c.substr(0, eqPos) : c
          document.cookie = `${name.trim()}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/`
        })
        
        // Redirect to login page
        router.push('/admin/login')
      } else {
        console.error('Logout failed')
      }
    } catch (error) {
      console.error('Logout error:', error)
      // Still redirect even if API call fails
      router.push('/admin/login')
    } finally {
      setIsLoggingOut(false)
    }
  }

  useEffect(() => {
    // Simulate loading stats
    setStats({
      totalRevenue: 125000,
      totalOrders: 1250,
      totalProducts: 156,
      totalCustomers: 890,
      pendingOrders: 12,
      lowStockProducts: 8,
      revenueGrowth: 12.5
    })
  }, [])

  return (
    <div className="space-y-8 p-6">
      <motion.div 
        className="flex items-center justify-between"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div>
          <h1 className="text-3xl font-bold text-blue-600 mb-2">مرحباً، مدير النظام</h1>
          <p className="text-gray-600">إليك نظرة عامة على أداء متجرك اليوم</p>
        </div>
        <div className="flex gap-2 items-center">
          <Link href="/admin/notifications">
            <Button variant="outline" size="sm">
              <Bell className="w-4 h-4 mr-1" />
              الإشعارات
              {stats.pendingOrders > 0 && (
                <Badge variant="destructive" className="mr-1 px-1.5 py-0.5 text-xs">
                  {stats.pendingOrders}
                </Badge>
              )}
            </Button>
          </Link>
          <Link href="/admin/products">
            <Button size="sm">
              <Plus className="w-4 h-4 mr-1" />
              إضافة منتج
            </Button>
          </Link>
          
          {/* Logout Button */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button
              variant="destructive"
              size="sm"
              onClick={handleLogout}
              disabled={isLoggingOut}
              className="relative overflow-hidden bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white"
            >
              {isLoggingOut ? (
                <>
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="w-4 h-4 border-2 border-white border-t-transparent rounded-full mr-1"
                  />
                  جاري الخروج...
                </>
              ) : (
                <>
                  <motion.div
                    animate={{ x: [0, 2, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <LogOut className="w-4 h-4 mr-1" />
                  </motion.div>
                  تسجيل الخروج
                </>
              )}
              
              {/* Animated background effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-red-600/50 to-red-700/50 opacity-0"
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              />
            </Button>
          </motion.div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6 }}
      >
        <DashboardStats stats={stats} />
      </motion.div>

      {/* Quick Overview Cards */}
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.6 }}
      >
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-red-500" />
              تحتاج انتباه
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm">طلبات في الانتظار</span>
                <Badge variant="secondary">{stats.pendingOrders}</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">مخزون منخفض</span>
                <Badge variant="outline">{stats.lowStockProducts}</Badge>
              </div>
              <Link href="/admin/orders">
                <Button variant="link" size="sm" className="p-0 h-auto">
                  <Eye className="w-3 h-3 mr-1" />
                  عرض التفاصيل
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-green-500" />
              الأداء اليوم
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm">مبيعات اليوم</span>
                <span className="font-medium">8,450 DH</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">طلبات جديدة</span>
                <span className="font-medium">23</span>
              </div>
              <div className="flex items-center gap-1 text-xs text-green-600">
                <TrendingUp className="w-3 h-3" />
                +{stats.revenueGrowth}% من الأمس
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Bell className="w-4 h-4 text-blue-500" />
              النشاط الحديث
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {recentActivity.slice(0, 3).map((activity) => (
                <div key={activity.id} className="text-xs">
                  <p className="font-medium truncate">{activity.title}</p>
                  <p className="text-muted-foreground">{activity.time}</p>
                </div>
              ))}
              <Link href="/admin/notifications">
                <Button variant="link" size="sm" className="p-0 h-auto">
                  <Eye className="w-3 h-3 mr-1" />
                  عرض كل النشاط
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div 
        className="grid grid-cols-1 lg:grid-cols-2 gap-8"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.6 }}
      >
        <OrdersChart />
        <RecentOrders />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.6 }}
      >
        <QuickActions />
      </motion.div>
    </div>
  )
}
