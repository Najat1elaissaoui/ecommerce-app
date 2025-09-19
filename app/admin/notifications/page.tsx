"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { 
  Bell, 
  ShoppingCart, 
  Package, 
  AlertTriangle, 
  Check, 
  X, 
  Search,
  Filter,
  Settings,
  Volume2,
  VolumeX,
  Trash2
} from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface Notification {
  id: number
  type: 'order' | 'stock' | 'system'
  title: string
  message: string
  client_name?: string
  client_city?: string
  total_amount?: number
  order_id?: number
  product_name?: string
  stock_level?: number
  is_read: boolean
  created_at: string
}

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [filteredNotifications, setFilteredNotifications] = useState<Notification[]>([])
  const [filter, setFilter] = useState<'all' | 'unread' | 'order' | 'stock' | 'system'>('all')
  const [searchQuery, setSearchQuery] = useState("")
  const [soundEnabled, setSoundEnabled] = useState(true)
  const [autoRefresh, setAutoRefresh] = useState(true)
  const { toast } = useToast()

  // Mock data - replace with real-time data
  useEffect(() => {
    const mockNotifications: Notification[] = [
      {
        id: 1,
        type: 'order',
        title: 'طلب جديد',
        message: 'تم استلام طلب جديد',
        client_name: 'أحمد محمد',
        client_city: 'الرياض',
        total_amount: 250.00,
        order_id: 1001,
        is_read: false,
        created_at: new Date(Date.now() - 5 * 60 * 1000).toISOString()
      },
      {
        id: 2,
        type: 'stock',
        title: 'تنبيه مخزون',
        message: 'مستوى المخزون منخفض',
        product_name: 'بروتين واي',
        stock_level: 3,
        is_read: false,
        created_at: new Date(Date.now() - 15 * 60 * 1000).toISOString()
      },
      {
        id: 3,
        type: 'order',
        title: 'طلب مؤكد',
        message: 'تم تأكيد الطلب من قبل العميل',
        client_name: 'فاطمة أحمد',
        client_city: 'جدة',
        total_amount: 180.50,
        order_id: 1000,
        is_read: true,
        created_at: new Date(Date.now() - 30 * 60 * 1000).toISOString()
      },
      {
        id: 4,
        type: 'stock',
        title: 'نفاد مخزون',
        message: 'نفد مخزون المنتج بالكامل',
        product_name: 'فيتامين د3',
        stock_level: 0,
        is_read: true,
        created_at: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString()
      },
      {
        id: 5,
        type: 'system',
        title: 'تحديث النظام',
        message: 'تم تحديث النظام إلى الإصدار الجديد',
        is_read: true,
        created_at: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString()
      }
    ]

    setNotifications(mockNotifications)
    setFilteredNotifications(mockNotifications)
  }, [])

  // Filter notifications
  useEffect(() => {
    let filtered = notifications

    if (filter !== 'all') {
      if (filter === 'unread') {
        filtered = filtered.filter(n => !n.is_read)
      } else {
        filtered = filtered.filter(n => n.type === filter)
      }
    }

    if (searchQuery) {
      filtered = filtered.filter(n => 
        n.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        n.message.toLowerCase().includes(searchQuery.toLowerCase()) ||
        n.client_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        n.product_name?.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }

    setFilteredNotifications(filtered)
  }, [notifications, filter, searchQuery])

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'order':
        return <ShoppingCart className="w-5 h-5 text-blue-500" />
      case 'stock':
        return <Package className="w-5 h-5 text-orange-500" />
      case 'system':
        return <Settings className="w-5 h-5 text-gray-500" />
      default:
        return <Bell className="w-5 h-5" />
    }
  }

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'order':
        return 'طلب'
      case 'stock':
        return 'مخزون'
      case 'system':
        return 'نظام'
      default:
        return type
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'order':
        return 'default'
      case 'stock':
        return 'secondary'
      case 'system':
        return 'outline'
      default:
        return 'default'
    }
  }

  const markAsRead = (notificationId: number) => {
    setNotifications(prev =>
      prev.map(n =>
        n.id === notificationId ? { ...n, is_read: true } : n
      )
    )
  }

  const markAllAsRead = () => {
    setNotifications(prev =>
      prev.map(n => ({ ...n, is_read: true }))
    )
    toast({
      title: "تم وضع علامة قراءة",
      description: "تم وضع علامة قراءة على جميع الإشعارات"
    })
  }

  const deleteNotification = (notificationId: number) => {
    setNotifications(prev =>
      prev.filter(n => n.id !== notificationId)
    )
    toast({
      title: "تم حذف الإشعار",
      description: "تم حذف الإشعار بنجاح"
    })
  }

  const deleteAllRead = () => {
    setNotifications(prev =>
      prev.filter(n => !n.is_read)
    )
    toast({
      title: "تم حذف الإشعارات",
      description: "تم حذف جميع الإشعارات المقروءة"
    })
  }

  const formatTime = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60))
    
    if (diffInMinutes < 1) {
      return 'الآن'
    } else if (diffInMinutes < 60) {
      return `منذ ${diffInMinutes} دقيقة`
    } else if (diffInMinutes < 1440) {
      const hours = Math.floor(diffInMinutes / 60)
      return `منذ ${hours} ساعة`
    } else {
      const days = Math.floor(diffInMinutes / 1440)
      return `منذ ${days} يوم`
    }
  }

  const unreadCount = notifications.filter(n => !n.is_read).length

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Bell className="w-8 h-8 text-blue-500" />
          <div>
            <h1 className="text-3xl font-bold">الإشعارات</h1>
            <p className="text-muted-foreground">
              إدارة إشعارات المتجر والطلبات الجديدة
              {unreadCount > 0 && (
                <Badge variant="destructive" className="mr-2">
                  {unreadCount} غير مقروء
                </Badge>
              )}
            </p>
          </div>
        </div>
      </div>

      {/* Controls */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="w-5 h-5" />
            تصفية وإعدادات
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Search and Filter */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="البحث في الإشعارات..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pr-10"
                />
              </div>
            </div>
            <Select value={filter} onValueChange={(value) => setFilter(value as any)}>
              <SelectTrigger className="w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">جميع الإشعارات</SelectItem>
                <SelectItem value="unread">غير مقروءة</SelectItem>
                <SelectItem value="order">طلبات</SelectItem>
                <SelectItem value="stock">مخزون</SelectItem>
                <SelectItem value="system">نظام</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Settings */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex items-center space-x-2 space-x-reverse">
              <Switch
                id="sound"
                checked={soundEnabled}
                onCheckedChange={setSoundEnabled}
              />
              <Label htmlFor="sound" className="flex items-center gap-2">
                {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
                تفعيل الأصوات
              </Label>
            </div>
            <div className="flex items-center space-x-2 space-x-reverse">
              <Switch
                id="auto-refresh"
                checked={autoRefresh}
                onCheckedChange={setAutoRefresh}
              />
              <Label htmlFor="auto-refresh">التحديث التلقائي</Label>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-2">
            {unreadCount > 0 && (
              <Button variant="outline" size="sm" onClick={markAllAsRead}>
                <Check className="w-4 h-4 mr-1" />
                قراءة الكل
              </Button>
            )}
            <Button variant="outline" size="sm" onClick={deleteAllRead}>
              <Trash2 className="w-4 h-4 mr-1" />
              حذف المقروءة
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Notifications List */}
      <Card>
        <CardHeader>
          <CardTitle>قائمة الإشعارات</CardTitle>
          <CardDescription>
            عرض {filteredNotifications.length} إشعار
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-1">
          {filteredNotifications.length === 0 ? (
            <div className="text-center py-8">
              <Bell className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium mb-2">لا توجد إشعارات</h3>
              <p className="text-muted-foreground">
                {filter === 'all' ? 'لم يتم استلام أي إشعارات بعد' : 'لا توجد إشعارات تطابق الفلتر المحدد'}
              </p>
            </div>
          ) : (
            filteredNotifications.map((notification, index) => (
              <div key={notification.id}>
                <div
                  className={`p-4 rounded-lg border cursor-pointer transition-colors hover:bg-muted/50 ${
                    !notification.is_read ? 'bg-blue-50 border-blue-200' : ''
                  }`}
                  onClick={() => !notification.is_read && markAsRead(notification.id)}
                >
                  <div className="flex items-start gap-3">
                    <div className="mt-1">
                      {getNotificationIcon(notification.type)}
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className={`font-medium ${!notification.is_read ? 'font-semibold' : ''}`}>
                              {notification.title}
                            </h4>
                            <Badge variant={getTypeColor(notification.type)} className="text-xs">
                              {getTypeLabel(notification.type)}
                            </Badge>
                            {!notification.is_read && (
                              <div className="w-2 h-2 bg-blue-500 rounded-full" />
                            )}
                          </div>
                          
                          <p className="text-sm text-muted-foreground mb-2">
                            {notification.message}
                          </p>

                          {/* Notification Details */}
                          {notification.type === 'order' && (
                            <div className="text-sm space-y-1">
                              {notification.client_name && (
                                <p><strong>العميل:</strong> {notification.client_name}</p>
                              )}
                              {notification.client_city && (
                                <p><strong>المدينة:</strong> {notification.client_city}</p>
                              )}
                              {notification.total_amount && (
                                <p><strong>المبلغ:</strong> {notification.total_amount.toFixed(2)} ر.س</p>
                              )}
                              {notification.order_id && (
                                <p><strong>رقم الطلب:</strong> #{notification.order_id}</p>
                              )}
                            </div>
                          )}

                          {notification.type === 'stock' && (
                            <div className="text-sm space-y-1">
                              {notification.product_name && (
                                <p><strong>المنتج:</strong> {notification.product_name}</p>
                              )}
                              {notification.stock_level !== undefined && (
                                <p>
                                  <strong>المستوى الحالي:</strong> 
                                  <span className={notification.stock_level === 0 ? 'text-red-600 font-medium' : 'text-orange-600'}>
                                    {notification.stock_level} قطعة
                                  </span>
                                </p>
                              )}
                            </div>
                          )}
                        </div>

                        <div className="flex items-center gap-2">
                          <span className="text-xs text-muted-foreground whitespace-nowrap">
                            {formatTime(notification.created_at)}
                          </span>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={(e) => {
                              e.stopPropagation()
                              deleteNotification(notification.id)
                            }}
                          >
                            <X className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {index < filteredNotifications.length - 1 && <Separator className="my-1" />}
              </div>
            ))
          )}
        </CardContent>
      </Card>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-2">
              <ShoppingCart className="w-4 h-4 text-blue-500" />
              <div>
                <p className="text-sm text-muted-foreground">إشعارات الطلبات</p>
                <p className="text-2xl font-bold">
                  {notifications.filter(n => n.type === 'order').length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-orange-500" />
              <div>
                <p className="text-sm text-muted-foreground">تنبيهات المخزون</p>
                <p className="text-2xl font-bold">
                  {notifications.filter(n => n.type === 'stock').length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-2">
              <Bell className="w-4 h-4 text-red-500" />
              <div>
                <p className="text-sm text-muted-foreground">غير مقروءة</p>
                <p className="text-2xl font-bold text-red-500">{unreadCount}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}