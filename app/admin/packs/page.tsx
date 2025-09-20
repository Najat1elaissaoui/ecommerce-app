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
import { Plus, Search, Edit, Trash2, Package2, Minus, ShoppingCart } from "lucide-react"
import { Pack, Product, PackProduct } from "@/lib/types"
import { useToast } from "@/hooks/use-toast"

export default function PacksPage() {
  const [packs, setPacks] = useState<Pack[]>([])
  const [products, setProducts] = useState<Product[]>([])
  const [filteredPacks, setFilteredPacks] = useState<Pack[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingPack, setEditingPack] = useState<Pack | null>(null)
  const [loading, setLoading] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [packsPerPage] = useState(10)
  const { toast } = useToast()

  // Form state
  const [formData, setFormData] = useState({
    name_ar: "",
    description_ar: "",
    pack_price: "",
    selectedProducts: [] as { productId: number; quantity: number }[]
  })

  // Mock data - replace with API calls
  useEffect(() => {
    const mockProducts: Product[] = [
      {
        id: 1,
        name_ar: "بروتين واي",
        price: 120.00,
        quantity: 50,
        description_ar: "مكمل بروتين عالي الجودة",
        images: ["protein.jpg"],
        low_stock_threshold: 10,
        is_active: true,
        created_at: "2024-01-15T10:00:00Z",
        updated_at: "2024-01-15T10:00:00Z"
      },
      {
        id: 2,
        name_ar: "كرياتين مونوهيدرات",
        price: 80.00,
        quantity: 25,
        description_ar: "مكمل غذائي لزيادة القوة والطاقة",
        images: ["creatine.jpg"],
        low_stock_threshold: 10,
        is_active: true,
        created_at: "2024-01-15T10:00:00Z",
        updated_at: "2024-01-15T10:00:00Z"
      },
      {
        id: 3,
        name_ar: "فيتامين د3",
        price: 45.00,
        quantity: 30,
        description_ar: "مكمل فيتامين د للعظام والمناعة",
        images: [],
        low_stock_threshold: 10,
        is_active: true,
        created_at: "2024-01-15T10:00:00Z",
        updated_at: "2024-01-15T10:00:00Z"
      }
    ]

    const mockPacks: Pack[] = [
      {
        id: 1,
        name_ar: "حزمة القوة والبناء",
        description_ar: "مجموعة مثالية لبناء العضلات وزيادة القوة",
        pack_price: 180.00,
        is_active: true,
        created_at: "2024-01-15T10:00:00Z",
        updated_at: "2024-01-15T10:00:00Z",
        products: [
          { id: 1, pack_id: 1, product_id: 1, quantity: 1, product: mockProducts[0] },
          { id: 2, pack_id: 1, product_id: 2, quantity: 1, product: mockProducts[1] }
        ]
      }
    ]

    setProducts(mockProducts)
    setPacks(mockPacks)
    setFilteredPacks(mockPacks)
  }, [])

  // Filter packs based on search query
  useEffect(() => {
    const filtered = packs.filter(pack =>
      pack.name_ar.toLowerCase().includes(searchQuery.toLowerCase())
    )
    setFilteredPacks(filtered)
    setCurrentPage(1)
  }, [searchQuery, packs])

  // Pagination
  const indexOfLastPack = currentPage * packsPerPage
  const indexOfFirstPack = indexOfLastPack - packsPerPage
  const currentPacks = filteredPacks.slice(indexOfFirstPack, indexOfLastPack)
  const totalPages = Math.ceil(filteredPacks.length / packsPerPage)

  const calculateOriginalPrice = (selectedProducts: { productId: number; quantity: number }[]) => {
    return selectedProducts.reduce((total, item) => {
      const product = products.find(p => p.id === item.productId)
      return total + (product ? product.price * item.quantity : 0)
    }, 0)
  }

  const resetForm = () => {
    setFormData({
      name_ar: "",
      description_ar: "",
      pack_price: "",
      selectedProducts: []
    })
    setEditingPack(null)
  }

  const openDialog = (pack?: Pack) => {
    if (pack) {
      setEditingPack(pack)
      setFormData({
        name_ar: pack.name_ar,
        description_ar: pack.description_ar || "",
        pack_price: pack.pack_price.toString(),
        selectedProducts: pack.products?.map(p => ({
          productId: p.product_id,
          quantity: p.quantity
        })) || []
      })
    } else {
      resetForm()
    }
    setIsDialogOpen(true)
  }

  const closeDialog = () => {
    setIsDialogOpen(false)
    resetForm()
  }

  const addProduct = () => {
    setFormData(prev => ({
      ...prev,
      selectedProducts: [...prev.selectedProducts, { productId: 0, quantity: 1 }]
    }))
  }

  const removeProduct = (index: number) => {
    setFormData(prev => ({
      ...prev,
      selectedProducts: prev.selectedProducts.filter((_, i) => i !== index)
    }))
  }

  const updateSelectedProduct = (index: number, field: 'productId' | 'quantity', value: number) => {
    setFormData(prev => ({
      ...prev,
      selectedProducts: prev.selectedProducts.map((item, i) =>
        i === index ? { ...item, [field]: value } : item
      )
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (formData.selectedProducts.length === 0) {
      toast({
        title: "خطأ",
        description: "يجب إضافة منتج واحد على الأقل للحزمة",
        variant: "destructive"
      })
      return
    }

    setLoading(true)

    try {
      const packData = {
        name_ar: formData.name_ar,
        description_ar: formData.description_ar,
        pack_price: parseFloat(formData.pack_price),
        is_active: true,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        products: formData.selectedProducts.map((item, index) => ({
          id: index + 1,
          pack_id: editingPack?.id || Date.now(),
          product_id: item.productId,
          quantity: item.quantity,
          product: products.find(p => p.id === item.productId)
        }))
      }

      if (editingPack) {
        // Update existing pack
        const updatedPack = { ...editingPack, ...packData }
        setPacks(prev => prev.map(p => p.id === editingPack.id ? updatedPack : p))
        toast({
          title: "تم تحديث الحزمة بنجاح",
          description: "تم حفظ التغييرات"
        })
      } else {
        // Add new pack
        const newPack: Pack = {
          id: Date.now(),
          ...packData
        }
        setPacks(prev => [...prev, newPack])
        toast({
          title: "تم إضافة الحزمة بنجاح",
          description: "تم إنشاء حزمة جديدة"
        })
      }

      closeDialog()
    } catch (error) {
      toast({
        title: "خطأ",
        description: "حدث خطأ أثناء حفظ الحزمة",
        variant: "destructive"
      })
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = (packId: number) => {
    if (confirm("هل أنت متأكد من حذف هذه الحزمة؟")) {
      setPacks(prev => prev.filter(p => p.id !== packId))
      toast({
        title: "تم حذف الحزمة",
        description: "تم حذف الحزمة بنجاح"
      })
    }
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">إدارة الحزم والعروض</h1>
          <p className="text-muted-foreground">إنشاء وإدارة حزم المنتجات مع أسعار خاصة</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => openDialog()} className="gap-2">
              <Plus className="w-4 h-4" />
              إضافة حزمة جديدة
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {editingPack ? "تعديل الحزمة" : "إضافة حزمة جديدة"}
              </DialogTitle>
              <DialogDescription>
                {editingPack ? "تحديث بيانات الحزمة" : "إنشاء حزمة جديدة من المنتجات المتاحة"}
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name_ar">اسم الحزمة (عربي)</Label>
                <Input
                  id="name_ar"
                  value={formData.name_ar}
                  onChange={(e) => setFormData(prev => ({...prev, name_ar: e.target.value}))}
                  placeholder="أدخل اسم الحزمة"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="description_ar">وصف الحزمة (اختياري)</Label>
                <Textarea
                  id="description_ar"
                  value={formData.description_ar}
                  onChange={(e) => setFormData(prev => ({...prev, description_ar: e.target.value}))}
                  placeholder="وصف الحزمة ومميزاتها"
                  rows={3}
                />
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label>المنتجات في الحزمة</Label>
                  <Button type="button" size="sm" onClick={addProduct}>
                    <Plus className="w-4 h-4" />
                    إضافة منتج
                  </Button>
                </div>
                
                {formData.selectedProducts.map((item, index) => (
                  <div key={index} className="flex items-center gap-2 p-4 border rounded-lg">
                    <Select
                      value={item.productId.toString()}
                      onValueChange={(value) => updateSelectedProduct(index, 'productId', parseInt(value))}
                    >
                      <SelectTrigger className="flex-1">
                        <SelectValue placeholder="اختر منتج" />
                      </SelectTrigger>
                      <SelectContent>
                        {products.map(product => (
                          <SelectItem key={product.id} value={product.id.toString()}>
                            {product.name_ar} - {product.price} DHS
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <Input
                      type="number"
                      min="1"
                      value={item.quantity}
                      onChange={(e) => updateSelectedProduct(index, 'quantity', parseInt(e.target.value))}
                      placeholder="الكمية"
                      className="w-20"
                    />
                    <Button
                      type="button"
                      size="sm"
                      variant="outline"
                      onClick={() => removeProduct(index)}
                    >
                      <Minus className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </div>

              {formData.selectedProducts.length > 0 && (
                <div className="bg-muted p-4 rounded-lg space-y-2">
                  <p className="text-sm font-medium">ملخص السعر:</p>
                  {/* <p className="text-sm">
                    السعر الأصلي: {calculateOriginalPrice(formData.selectedProducts).toFixed(2)} ر.س
                  </p> */}
                  <div className="space-y-2">
                    <Label htmlFor="pack_price">سعر الحزمة</Label>
                    <Input
                      id="pack_price"
                      type="number"
                      step="0.01"
                      value={formData.pack_price}
                      onChange={(e) => setFormData(prev => ({...prev, pack_price: e.target.value}))}
                      placeholder="0.00"
                      required
                    />
                    {formData.pack_price && (
                      <p className="text-sm text-green-600">
                        توفير: {(calculateOriginalPrice(formData.selectedProducts) - parseFloat(formData.pack_price)).toFixed(2)} ر.س
                        ({((1 - parseFloat(formData.pack_price) / calculateOriginalPrice(formData.selectedProducts)) * 100).toFixed(1)}% خصم)
                      </p>
                    )}
                  </div>
                </div>
              )}

              <div className="flex gap-2 justify-end">
                <Button type="button" variant="outline" onClick={closeDialog}>
                  إلغاء
                </Button>
                <Button type="submit" disabled={loading}>
                  {loading ? "جاري الحفظ..." : editingPack ? "تحديث" : "إضافة"}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Search and Stats */}
      <div className="flex gap-4">
        <Card className="flex-1">
          <CardContent className="pt-6">
            <div className="flex items-center gap-2">
              <Search className="w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="بحث في الحزم..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="border-0 p-0 focus-visible:ring-0"
              />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-2">
              <Package2 className="w-4 h-4 text-blue-500" />
              <div>
                <p className="text-sm text-muted-foreground">إجمالي الحزم</p>
                <p className="text-2xl font-bold">{packs.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Packs Table */}
      <Card>
        <CardHeader>
          <CardTitle>قائمة الحزم</CardTitle>
          <CardDescription>
            عرض {currentPacks.length} من أصل {filteredPacks.length} حزمة
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-right">اسم الحزمة</TableHead>
                <TableHead className="text-right">المنتجات</TableHead>
                {/* <TableHead className="text-right">السعر الأصلي</TableHead> */}
                <TableHead className="text-right">سعر الحزمة</TableHead>
                
                <TableHead className="text-right">الإجراءات</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentPacks.map((pack) => {
                const originalPrice = pack.products?.reduce((total, item) => 
                  total + (item.product ? item.product.price * item.quantity : 0), 0
                ) || 0
                const savings = originalPrice - pack.pack_price
                const discountPercent = originalPrice > 0 ? (savings / originalPrice * 100) : 0

                return (
                  <TableRow key={pack.id}>
                    <TableCell className="font-medium">
                      <div>
                        <p>{pack.name_ar}</p>
                        {pack.description_ar && (
                          <p className="text-sm text-muted-foreground truncate max-w-xs">
                            {pack.description_ar}
                          </p>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        {pack.products?.map((item, index) => (
                          <div key={index} className="text-sm">
                            {item.product?.name_ar} × {item.quantity}
                          </div>
                        ))}
                      </div>
                    </TableCell>
                    {/* <TableCell>{originalPrice.toFixed(2)} DHS</TableCell> */}
                    <TableCell className="font-bold text-green-600">
                      {pack.pack_price.toFixed(2)} DHS
                    </TableCell>
                    {/* <TableCell>
                      <div className="space-y-1">
                        <Badge variant="secondary" className="bg-green-100 text-green-800">
                          {savings.toFixed(2)} DHS
                        </Badge>
                        <p className="text-xs text-muted-foreground">
                          {discountPercent.toFixed(1)}% خصم
                        </p>
                      </div>
                    </TableCell> */}
                    <TableCell>
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => openDialog(pack)}
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => handleDelete(pack.id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
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