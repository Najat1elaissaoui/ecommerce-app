"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Search, Eye, Filter, Calendar, User, MapPin, Clock, CheckCircle, XCircle, Truck } from "lucide-react"
import { Order, OrderItem } from "@/lib/types"
import { useToast } from "@/hooks/use-toast"

const statusColors = {
  en_attente: "secondary",
  validee: "default",
  expediee: "default",
  annulee: "destructive"
} as const

const statusLabels = {
  en_attente: "في الانتظار",
  validee: "مؤكدة",
  expediee: "مُرسلة",
  annulee: "ملغية"
}

const statusIcons = {
  en_attente: Clock,
  validee: CheckCircle,
  expediee: Truck,
  annulee: XCircle
}

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([])
  const [filteredOrders, setFilteredOrders] = useState<Order[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [dateFilter, setDateFilter] = useState("")
  const [cityFilter, setCityFilter] = useState("")
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)
  const [isDetailOpen, setIsDetailOpen] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [ordersPerPage] = useState(10)
  const [newNote, setNewNote] = useState("")
  const { toast } = useToast()

  // Mock data - replace with API calls
  useEffect(() => {
    const mockOrders: Order[] = [
      {
        id: 1,
        client_name: "أحمد محمد",
        client_phone: "+966501234567",
        client_city: "الرياض",
        comment: "توصيل سريع من فضلكم",
        total_amount: 180.00,
        status: "en_attente",
        admin_note: "",
        created_at: "2024-01-15T10:00:00Z",
        updated_at: "2024-01-15T10:00:00Z",
        items: [
          {
            id: 1,
            order_id: 1,
            product_id: 1,
            pack_id: undefined,
            quantity: 1,
            unit_price: 120.00,
            item_name_ar: "بروتين واي"
          },
          {
            id: 2,
            order_id: 1,
            product_id: undefined,
            pack_id: 1,
            quantity: 1,
            unit_price: 60.00,
            item_name_ar: "حزمة القوة"
          }
        ]
      },
      {
        id: 2,
        client_name: "فاطمة علي",
        client_phone: "+966507654321",
        client_city: "جدة",
        comment: "",
        total_amount: 95.00,
        status: "validee",
        admin_note: "تم التأكيد - جاهز للإرسال",
        created_at: "2024-01-14T15:30:00Z",
        updated_at: "2024-01-15T09:00:00Z",
        items: [
          {
            id: 3,
            order_id: 2,
            product_id: 2,
            pack_id: undefined,
            quantity: 1,
            unit_price: 80.00,
            item_name_ar: "كرياتين مونوهيدرات"
          },
          {
            id: 4,
            order_id: 2,
            product_id: 3,
            pack_id: undefined,
            quantity: 1,
            unit_price: 15.00,
            item_name_ar: "فيتامين سي"
          }
        ]
      },
      {
        id: 3,
        client_name: "محمد الأحمد",
        client_phone: "+966512345678",
        client_city: "الدمام",
        comment: "",
        total_amount: 200.00,
        status: "expediee",
        admin_note: "تم الإرسال مع شركة أرامكس",
        created_at: "2024-01-13T08:00:00Z",
        updated_at: "2024-01-14T14:00:00Z",
        items: [
          {
            id: 5,
            order_id: 3,
            product_id: 1,
            pack_id: undefined,
            quantity: 2,
            unit_price: 100.00,
            item_name_ar: "بروتين واي - حجم كبير"
          }
        ]
      }
    ]

    setOrders(mockOrders)
    setFilteredOrders(mockOrders)
  }, [])

  // Apply filters
  useEffect(() => {
    let filtered = orders

    // Text search
    if (searchQuery) {
      filtered = filtered.filter(order =>
        order.client_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        order.client_phone.includes(searchQuery) ||
        order.id.toString().includes(searchQuery)
      )
    }

    // Status filter
    if (statusFilter && statusFilter !== "all") {
      filtered = filtered.filter(order => order.status === statusFilter)
    }

    // City filter
    if (cityFilter) {
      filtered = filtered.filter(order =>
        order.client_city.toLowerCase().includes(cityFilter.toLowerCase())
      )
    }

    // Date filter (simple implementation)
    if (dateFilter) {
      const filterDate = new Date(dateFilter)
      filtered = filtered.filter(order => {
        const orderDate = new Date(order.created_at)
        return orderDate.toDateString() === filterDate.toDateString()
      })
    }

    setFilteredOrders(filtered)
    setCurrentPage(1)
  }, [searchQuery, statusFilter, cityFilter, dateFilter, orders])

  // Pagination
  const indexOfLastOrder = currentPage * ordersPerPage
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage
  const currentOrders = filteredOrders.slice(indexOfFirstOrder, indexOfLastOrder)
  const totalPages = Math.ceil(filteredOrders.length / ordersPerPage)

  const updateOrderStatus = (orderId: number, newStatus: Order['status']) => {
    setOrders(prev => prev.map(order =>
      order.id === orderId
        ? { ...order, status: newStatus, updated_at: new Date().toISOString() }
        : order
    ))
    
    if (selectedOrder && selectedOrder.id === orderId) {
      setSelectedOrder(prev => prev ? { ...prev, status: newStatus } : null)
    }

    toast({
      title: "تم تحديث حالة الطلب",
      description: `تم تغيير حالة الطلب إلى ${statusLabels[newStatus]}`
    })
  }

  const addNote = (orderId: number, note: string) => {
    setOrders(prev => prev.map(order =>
      order.id === orderId
        ? { ...order, admin_note: note, updated_at: new Date().toISOString() }
        : order
    ))
    
    if (selectedOrder && selectedOrder.id === orderId) {
      setSelectedOrder(prev => prev ? { ...prev, admin_note: note } : null)
    }

    setNewNote("")
    toast({
      title: "تم إضافة الملاحظة",
      description: "تم حفظ الملاحظة الإدارية"
    })
  }

  const clearFilters = () => {
    setSearchQuery("")
    setStatusFilter("all")
    setCityFilter("")
    setDateFilter("")
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('ar-SA', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">إدارة الطلبات</h1>
          <p className="text-muted-foreground">عرض وإدارة جميع طلبات العملاء</p>
        </div>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="w-5 h-5" />
            تصفية الطلبات
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="space-y-2">
              <Label>البحث</Label>
              <div className="relative">
                <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="اسم العميل، الهاتف، أو رقم الطلب"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pr-10"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label>الحالة</Label>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">جميع الحالات</SelectItem>
                  <SelectItem value="en_attente">في الانتظار</SelectItem>
                  <SelectItem value="validee">مؤكدة</SelectItem>
                  <SelectItem value="expediee">مُرسلة</SelectItem>
                  <SelectItem value="annulee">ملغية</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>المدينة</Label>
              <div className="relative">
                <MapPin className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="اسم المدينة"
                  value={cityFilter}
                  onChange={(e) => setCityFilter(e.target.value)}
                  className="pr-10"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>التاريخ</Label>
              <div className="relative">
                <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  type="date"
                  value={dateFilter}
                  onChange={(e) => setDateFilter(e.target.value)}
                  className="pr-10"
                />
              </div>
            </div>
          </div>
          
          {(searchQuery || statusFilter !== "all" || cityFilter || dateFilter) && (
            <div className="mt-4">
              <Button variant="outline" size="sm" onClick={clearFilters}>
                مسح جميع الفلاتر
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-yellow-500" />
              <div>
                <p className="text-sm text-muted-foreground">في الانتظار</p>
                <p className="text-2xl font-bold">
                  {orders.filter(o => o.status === "en_attente").length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-500" />
              <div>
                <p className="text-sm text-muted-foreground">مؤكدة</p>
                <p className="text-2xl font-bold">
                  {orders.filter(o => o.status === "validee").length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-2">
              <Truck className="w-4 h-4 text-blue-500" />
              <div>
                <p className="text-sm text-muted-foreground">مُرسلة</p>
                <p className="text-2xl font-bold">
                  {orders.filter(o => o.status === "expediee").length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-2">
              <User className="w-4 h-4 text-purple-500" />
              <div>
                <p className="text-sm text-muted-foreground">إجمالي الطلبات</p>
                <p className="text-2xl font-bold">{orders.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Orders Table */}
      <Card>
        <CardHeader>
          <CardTitle>قائمة الطلبات</CardTitle>
          <CardDescription>
            عرض {currentOrders.length} من أصل {filteredOrders.length} طلب
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-right">رقم الطلب</TableHead>
                <TableHead className="text-right">العميل</TableHead>
                <TableHead className="text-right">المدينة</TableHead>
                <TableHead className="text-right">المبلغ</TableHead>
                <TableHead className="text-right">الحالة</TableHead>
                <TableHead className="text-right">التاريخ</TableHead>
                <TableHead className="text-right">الإجراءات</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentOrders.map((order) => {
                const StatusIcon = statusIcons[order.status]
                return (
                  <TableRow key={order.id}>
                    <TableCell className="font-bold">#{order.id}</TableCell>
                    <TableCell>
                      <div>
                        <p className="font-medium">{order.client_name}</p>
                        <p className="text-sm text-muted-foreground">{order.client_phone}</p>
                      </div>
                    </TableCell>
                    <TableCell>{order.client_city}</TableCell>
                    <TableCell className="font-medium">{order.total_amount.toFixed(2)} ر.س</TableCell>
                    <TableCell>
                      <Badge variant={statusColors[order.status]} className="gap-1">
                        <StatusIcon className="w-3 h-3" />
                        {statusLabels[order.status]}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-sm">
                      {formatDate(order.created_at)}
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Dialog open={isDetailOpen && selectedOrder?.id === order.id} onOpenChange={(open) => {
                          setIsDetailOpen(open)
                          if (open) setSelectedOrder(order)
                        }}>
                          <DialogTrigger asChild>
                            <Button size="sm" variant="outline">
                              <Eye className="w-4 h-4" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                            <DialogHeader>
                              <DialogTitle>تفاصيل الطلب #{order.id}</DialogTitle>
                              <DialogDescription>
                                معلومات تفصيلية عن الطلب وإمكانية التحديث
                              </DialogDescription>
                            </DialogHeader>
                            
                            {selectedOrder && (
                              <div className="space-y-6">
                                {/* Order Info */}
                                <div className="grid grid-cols-2 gap-4">
                                  <div className="space-y-2">
                                    <Label className="text-sm font-medium">معلومات العميل</Label>
                                    <div className="space-y-1">
                                      <p><strong>الاسم:</strong> {selectedOrder.client_name}</p>
                                      <p><strong>الهاتف:</strong> {selectedOrder.client_phone}</p>
                                      <p><strong>المدينة:</strong> {selectedOrder.client_city}</p>
                                    </div>
                                  </div>
                                  <div className="space-y-2">
                                    <Label className="text-sm font-medium">معلومات الطلب</Label>
                                    <div className="space-y-1">
                                      <p><strong>التاريخ:</strong> {formatDate(selectedOrder.created_at)}</p>
                                      <p><strong>المبلغ:</strong> {selectedOrder.total_amount.toFixed(2)} ر.س</p>
                                      <p><strong>الحالة:</strong> {statusLabels[selectedOrder.status]}</p>
                                    </div>
                                  </div>
                                </div>

                                {/* Order Items */}
                                <div className="space-y-2">
                                  <Label className="text-sm font-medium">المنتجات المطلوبة</Label>
                                  <div className="border rounded-lg">
                                    <Table>
                                      <TableHeader>
                                        <TableRow>
                                          <TableHead className="text-right">المنتج</TableHead>
                                          <TableHead className="text-right">الكمية</TableHead>
                                          <TableHead className="text-right">السعر</TableHead>
                                          <TableHead className="text-right">المجموع</TableHead>
                                        </TableRow>
                                      </TableHeader>
                                      <TableBody>
                                        {selectedOrder.items?.map((item) => (
                                          <TableRow key={item.id}>
                                            <TableCell>{item.item_name_ar}</TableCell>
                                            <TableCell>{item.quantity}</TableCell>
                                            <TableCell>{item.unit_price.toFixed(2)} ر.س</TableCell>
                                            <TableCell>{(item.unit_price * item.quantity).toFixed(2)} ر.س</TableCell>
                                          </TableRow>
                                        ))}
                                      </TableBody>
                                    </Table>
                                  </div>
                                </div>

                                {/* Customer Comment */}
                                {selectedOrder.comment && (
                                  <div className="space-y-2">
                                    <Label className="text-sm font-medium">تعليق العميل</Label>
                                    <p className="text-sm bg-muted p-3 rounded-lg">{selectedOrder.comment}</p>
                                  </div>
                                )}

                                {/* Status Update */}
                                <div className="space-y-2">
                                  <Label className="text-sm font-medium">تحديث حالة الطلب</Label>
                                  <div className="flex gap-2">
                                    <Button
                                      size="sm"
                                      variant="outline"
                                      onClick={() => updateOrderStatus(selectedOrder.id, "validee")}
                                      disabled={selectedOrder.status === "validee"}
                                    >
                                      <CheckCircle className="w-4 h-4 mr-1" />
                                      تأكيد
                                    </Button>
                                    <Button
                                      size="sm"
                                      variant="outline"
                                      onClick={() => updateOrderStatus(selectedOrder.id, "expediee")}
                                      disabled={selectedOrder.status === "expediee"}
                                    >
                                      <Truck className="w-4 h-4 mr-1" />
                                      إرسال
                                    </Button>
                                    <Button
                                      size="sm"
                                      variant="destructive"
                                      onClick={() => updateOrderStatus(selectedOrder.id, "annulee")}
                                      disabled={selectedOrder.status === "annulee"}
                                    >
                                      <XCircle className="w-4 h-4 mr-1" />
                                      إلغاء
                                    </Button>
                                  </div>
                                </div>

                                {/* Admin Note */}
                                <div className="space-y-2">
                                  <Label className="text-sm font-medium">الملاحظات الإدارية</Label>
                                  {selectedOrder.admin_note && (
                                    <p className="text-sm bg-blue-50 p-3 rounded-lg mb-2">{selectedOrder.admin_note}</p>
                                  )}
                                  <div className="flex gap-2">
                                    <Textarea
                                      placeholder="إضافة ملاحظة..."
                                      value={newNote}
                                      onChange={(e) => setNewNote(e.target.value)}
                                      rows={2}
                                      className="flex-1"
                                    />
                                    <Button
                                      onClick={() => addNote(selectedOrder.id, newNote)}
                                      disabled={!newNote.trim()}
                                    >
                                      إضافة
                                    </Button>
                                  </div>
                                </div>
                              </div>
                            )}
                          </DialogContent>
                        </Dialog>
                      </div>
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between mt-4">
              <p className="text-sm text-muted-foreground">
                الصفحة {currentPage} من {totalPages}
              </p>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                  disabled={currentPage === 1}
                >
                  السابق
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                  disabled={currentPage === totalPages}
                >
                  التالي
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}