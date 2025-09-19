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
import { Plus, Search, Edit, Trash2, Package2 } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import AddIngredientModal from "./add-ingredient-modal"

interface Ingredient {
  id: number
  name: string
  image?: string
  description?: string
  created_at: string
  updated_at: string
}

export default function IngredientsManager() {
  const [ingredients, setIngredients] = useState<Ingredient[]>([])
  const [filteredIngredients, setFilteredIngredients] = useState<Ingredient[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingIngredient, setEditingIngredient] = useState<Ingredient | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [ingredientsPerPage] = useState(8)
  const { toast } = useToast()

  // Mock data - replace with API calls
  useEffect(() => {
    const mockIngredients: Ingredient[] = [
      {
        id: 1,
        name: "بروتين واي",
        image: "whey-protein.jpg",
        description: "بروتين مصل اللبن عالي الجودة",
        created_at: "2024-01-15T10:00:00Z",
        updated_at: "2024-01-15T10:00:00Z"
      },
      {
        id: 2,
        name: "كرياتين مونوهيدرات",
        image: "creatine.jpg",
        description: "مكمل لزيادة القوة والأداء الرياضي",
        created_at: "2024-01-15T10:00:00Z",
        updated_at: "2024-01-15T10:00:00Z"
      },
      {
        id: 3,
        name: "فيتامين د3",
        description: "فيتامين أساسي لصحة العظام والمناعة",
        created_at: "2024-01-15T10:00:00Z",
        updated_at: "2024-01-15T10:00:00Z"
      }
    ]
    setIngredients(mockIngredients)
    setFilteredIngredients(mockIngredients)
  }, [])

  // Filter ingredients based on search query
  useEffect(() => {
    const filtered = ingredients.filter(ingredient =>
      ingredient.name.toLowerCase().includes(searchQuery.toLowerCase())
    )
    setFilteredIngredients(filtered)
    setCurrentPage(1)
  }, [searchQuery, ingredients])

  // Pagination
  const indexOfLastIngredient = currentPage * ingredientsPerPage
  const indexOfFirstIngredient = indexOfLastIngredient - ingredientsPerPage
  const currentIngredients = filteredIngredients.slice(indexOfFirstIngredient, indexOfLastIngredient)
  const totalPages = Math.ceil(filteredIngredients.length / ingredientsPerPage)

  const openModal = (ingredient?: Ingredient) => {
    setEditingIngredient(ingredient || null)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setEditingIngredient(null)
  }

  const handleSaveIngredient = (ingredientData: Omit<Ingredient, "id" | "created_at" | "updated_at">) => {
    try {
      if (editingIngredient) {
        // Update existing ingredient
        const updatedIngredient = {
          ...editingIngredient,
          ...ingredientData,
          updated_at: new Date().toISOString()
        }
        setIngredients(prev => prev.map(i => i.id === editingIngredient.id ? updatedIngredient : i))
        toast({
          title: "تم تحديث المكون بنجاح",
          description: "تم حفظ التغييرات"
        })
      } else {
        // Add new ingredient
        const newIngredient: Ingredient = {
          id: Date.now(),
          ...ingredientData,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        }
        setIngredients(prev => [...prev, newIngredient])
        toast({
          title: "تم إضافة المكون بنجاح",
          description: "تم إنشاء مكون جديد"
        })
      }
      closeModal()
    } catch (error) {
      toast({
        title: "خطأ",
        description: "حدث خطأ أثناء حفظ المكون",
        variant: "destructive"
      })
    }
  }

  const handleDelete = (ingredientId: number) => {
    if (confirm("هل أنت متأكد من حذف هذا المكون؟")) {
      setIngredients(prev => prev.filter(i => i.id !== ingredientId))
      toast({
        title: "تم حذف المكون",
        description: "تم حذف المكون بنجاح"
      })
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">إدارة المكونات</h2>
          <p className="text-muted-foreground">إدارة وتحرير مكونات المنتجات</p>
        </div>
        <Button onClick={() => openModal()} className="gap-2">
          <Plus className="w-4 h-4" />
          إضافة مكون جديد
        </Button>
      </div>

      {/* Search and Stats */}
      <div className="flex gap-4">
        <Card className="flex-1">
          <CardContent className="pt-6">
            <div className="flex items-center gap-2">
              <Search className="w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="بحث في المكونات..."
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
              <Package2 className="w-4 h-4 text-green-500" />
              <div>
                <p className="text-sm text-muted-foreground">إجمالي المكونات</p>
                <p className="text-2xl font-bold">{ingredients.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Ingredients Table */}
      <Card>
        <CardHeader>
          <CardTitle>قائمة المكونات</CardTitle>
          <CardDescription>
            عرض {currentIngredients.length} من أصل {filteredIngredients.length} مكون
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-right">اسم المكون</TableHead>
                <TableHead className="text-right">الصورة</TableHead>
                <TableHead className="text-right">الوصف</TableHead>
                <TableHead className="text-right">الإجراءات</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentIngredients.map((ingredient) => (
                <TableRow key={ingredient.id}>
                  <TableCell className="font-medium">
                    {ingredient.name}
                  </TableCell>
                  <TableCell>
                    {ingredient.image ? (
                      <Badge variant="secondary">متوفرة</Badge>
                    ) : (
                      <Badge variant="outline">غير متوفرة</Badge>
                    )}
                  </TableCell>
                  <TableCell>
                    {ingredient.description ? (
                      <p className="text-sm text-muted-foreground truncate max-w-xs">
                        {ingredient.description}
                      </p>
                    ) : (
                      <span className="text-muted-foreground">-</span>
                    )}
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => openModal(ingredient)}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => handleDelete(ingredient.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
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

      {/* Add/Edit Modal */}
      <AddIngredientModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onSave={handleSaveIngredient}
        ingredient={editingIngredient}
      />
    </div>
  )
}