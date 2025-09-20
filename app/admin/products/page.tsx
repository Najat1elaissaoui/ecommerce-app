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
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Plus, Search, Edit, Trash2, AlertTriangle, Package } from "lucide-react"
import { Product } from "@/lib/types"
import { useToast } from "@/hooks/use-toast"
import IngredientsManager from "@/components/admin/ingredients-manager"
import AddProductSteps from "@/components/admin/add-product-steps-simple"

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [productsPerPage] = useState(10)
  const [activeTab, setActiveTab] = useState<"products" | "ingredients">("products")
  const [ingredients, setIngredients] = useState([
    { id: 1, name: "بروتين واي", description: "بروتين مصل اللبن عالي الجودة", image: "whey-protein.jpg" },
    { id: 2, name: "كرياتين مونوهيدرات", description: "مكمل لزيادة القوة والأداء الرياضي", image: "creatine.jpg" },
    { id: 3, name: "فيتامين د3", description: "فيتامين أساسي لصحة العظام والمناعة" }
  ])
  const { toast } = useToast()

  // Form state - simplifié pour l'ancien système
  const [formData, setFormData] = useState({
    name_ar: "",
    price: "",
    quantity: "",
    description_ar: "",
    low_stock_threshold: "10",
    images: [] as string[]
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
        quantity: 5,
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
        quantity: 0,
        description_ar: "مكمل فيتامين د للعظام والمناعة",
        images: [],
        low_stock_threshold: 10,
        is_active: true,
        created_at: "2024-01-15T10:00:00Z",
        updated_at: "2024-01-15T10:00:00Z"
      }
    ]
    setProducts(mockProducts)
    setFilteredProducts(mockProducts)
  }, [])

  // Filter products based on search query
  useEffect(() => {
    const filtered = products.filter(product =>
      product.name_ar.toLowerCase().includes(searchQuery.toLowerCase())
    )
    setFilteredProducts(filtered)
    setCurrentPage(1)
  }, [searchQuery, products])

  // Pagination
  const indexOfLastProduct = currentPage * productsPerPage
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct)
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage)

  const getStockStatus = (product: Product) => {
    if (product.quantity === 0) {
      return { status: "نفاد", color: "destructive" as const }
    } else if (product.quantity <= product.low_stock_threshold) {
      return { status: "قليل", color: "warning" as const }
    }
    return { status: "متوفر", color: "default" as const }
  }

  const openDialog = (product?: Product) => {
    if (product) {
      setEditingProduct(product)
    } else {
      setEditingProduct(null)
    }
    setIsDialogOpen(true)
  }

  const closeDialog = () => {
    setIsDialogOpen(false)
    setEditingProduct(null)
  }

  const handleSaveProduct = (productData: any) => {
    try {
      if (editingProduct) {
        // Update existing product
        const updatedProduct = { 
          ...editingProduct, 
          name_ar: productData.name,
          price: productData.price,
          quantity: productData.quantity,
          description_ar: productData.productDescription,
          updated_at: new Date().toISOString()
        }
        setProducts(prev => prev.map(p => p.id === editingProduct.id ? updatedProduct : p))
        toast({
          title: "تم تحديث المنتج بنجاح",
          description: "تم حفظ التغييرات"
        })
      } else {
        // Add new product
        const newProduct: Product = {
          id: Date.now(),
          name_ar: productData.name,
          price: productData.price,
          quantity: productData.quantity,
          description_ar: productData.productDescription,
          images: [productData.productImage].filter(Boolean),
          low_stock_threshold: 10,
          is_active: true,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        }
        setProducts(prev => [...prev, newProduct])
        toast({
          title: "تم إضافة المنتج بنجاح",
          description: "تم إنشاء منتج جديد بكل تفاصيله"
        })
      }
      closeDialog()
    } catch (error) {
      toast({
        title: "خطأ",
        description: "حدث خطأ أثناء حفظ المنتج",
        variant: "destructive"
      })
    }
  }

  const handleDelete = (productId: number) => {
    if (confirm("هل أنت متأكد من حذف هذا المنتج؟")) {
      setProducts(prev => prev.filter(p => p.id !== productId))
      toast({
        title: "تم حذف المنتج",
        description: "تم حذف المنتج بنجاح"
      })
    }
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header with Tabs */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">إدارة المنتجات والمكونات</h1>
          <p className="text-muted-foreground">إدارة وتحرير منتجات المتجر والمكونات</p>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="border-b">
        <nav className="-mb-px flex space-x-8" aria-label="Tabs">
          <button
            onClick={() => setActiveTab("products")}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === "products"
                ? "border-primary text-primary"
                : "border-transparent text-muted-foreground hover:text-foreground hover:border-gray-300"
            }`}
          >
            المنتجات
          </button>
          <button
            onClick={() => setActiveTab("ingredients")}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === "ingredients"
                ? "border-primary text-primary"
                : "border-transparent text-muted-foreground hover:text-foreground hover:border-gray-300"
            }`}
          >
            المكونات
          </button>
        </nav>
      </div>

      {/* Tab Content */}
      {activeTab === "products" ? (
        <>
          {/* Products Tab Content */}
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold">إدارة المنتجات</h2>
              <p className="text-muted-foreground">إدارة وتحرير منتجات المتجر</p>
            </div>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button onClick={() => openDialog()} className="gap-2">
                  <Plus className="w-4 h-4" />
                  إضافة منتج جديد
                </Button>
              </DialogTrigger>
            </Dialog>
          </div>

          {/* Search and Stats Cards */}
          <div className="flex gap-4">
            <Card className="flex-1">
              <CardContent className="pt-6">
                <div className="flex items-center gap-2">
                  <Search className="w-4 h-4 text-muted-foreground" />
                  <Input
                    placeholder="بحث في المنتجات..."
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
                  <Package className="w-4 h-4 text-blue-500" />
                  <div>
                    <p className="text-sm text-muted-foreground">إجمالي المنتجات</p>
                    <p className="text-2xl font-bold">{products.length}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
           
          </div>

          {/* Products Table */}
          <Card>
            <CardHeader>
              <CardTitle>قائمة المنتجات</CardTitle>
              <CardDescription>
                عرض {currentProducts.length} من أصل {filteredProducts.length} منتج
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-right">اسم المنتج</TableHead>
                    <TableHead className="text-right">السعر</TableHead>
                    <TableHead className="text-right">الكمية</TableHead>
                    
                    <TableHead className="text-right">الإجراءات</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {currentProducts.map((product) => {
                    const stockStatus = getStockStatus(product)
                    return (
                      <TableRow key={product.id}>
                        <TableCell className="font-medium">
                          <div>
                            <p>{product.name_ar}</p>
                            {product.description_ar && (
                              <p className="text-sm text-muted-foreground truncate max-w-xs">
                                {product.description_ar}
                              </p>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>{product.price.toFixed(2)} DHS</TableCell>
                        <TableCell>{product.quantity}</TableCell>
                        
                        <TableCell>
                          <div className="flex gap-2">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => openDialog(product)}
                            >
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button
                              size="sm"
                              variant="destructive"
                              onClick={() => handleDelete(product.id)}
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
        </>
      ) : (
        <>
          {/* Ingredients Tab Content */}
          <IngredientsManager />
        </>
      )}

      {/* Add Product Steps Modal */}
      <AddProductSteps
        isOpen={isDialogOpen}
        onClose={closeDialog}
        onSave={handleSaveProduct}
        product={editingProduct}
        ingredients={ingredients}
      />
    </div>
  )
}