"use client"

import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Plus, Minus, ShoppingBag, Trash2 } from "lucide-react"
import { useCart } from "@/lib/cart-context"
import Link from "next/link"

interface CartDrawerProps {
  isOpen: boolean
  onClose: () => void
}

export default function CartDrawer({ isOpen, onClose }: CartDrawerProps) {
  const { items, total, itemCount, updateQuantity, removeItem, clearCart } = useCart()

  const handleQuantityChange = (id: number, currentQuantity: number, change: number) => {
    const newQuantity = currentQuantity + change
    if (newQuantity > 0) {
      updateQuantity(id, newQuantity)
    }
  }

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent side="left" className="w-full sm:max-w-lg">
        <SheetHeader className="space-y-4">
          <div className="flex items-center justify-between">
            <SheetTitle className="text-xl font-bold">سلة التسوق</SheetTitle>
            <Badge variant="secondary" className="bg-primary/10 text-primary">
              {itemCount} عنصر
            </Badge>
          </div>
        </SheetHeader>

        <div className="flex flex-col h-full">
          {items.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center text-center space-y-4">
              <ShoppingBag className="w-16 h-16 text-muted-foreground" />
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-2">سلة التسوق فارغة</h3>
                <p className="text-muted-foreground mb-6">أضف بعض المنتجات لتبدأ التسوق</p>
                <Button onClick={onClose} asChild>
                  <Link href="/products">تصفح المنتجات</Link>
                </Button>
              </div>
            </div>
          ) : (
            <>
              {/* Cart Items */}
              <div className="flex-1 overflow-y-auto py-6 space-y-4">
                {items.map((item) => (
                  <div key={`${item.id}-${item.type}`} className="flex gap-4 p-4 bg-muted/30 rounded-lg">
                    <img
                      src={item.image || "/placeholder.svg"}
                      alt={item.name_ar}
                      className="w-16 h-16 object-cover rounded-lg"
                    />

                    <div className="flex-1 space-y-2">
                      <div className="flex items-start justify-between">
                        <h4 className="font-semibold text-sm line-clamp-2">{item.name_ar}</h4>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeItem(item.id)}
                          className="text-red-500 hover:text-red-700 h-auto p-1"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleQuantityChange(item.id, item.quantity, -1)}
                            className="w-8 h-8 p-0"
                          >
                            <Minus className="w-3 h-3" />
                          </Button>
                          <span className="w-8 text-center font-medium">{item.quantity}</span>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleQuantityChange(item.id, item.quantity, 1)}
                            className="w-8 h-8 p-0"
                          >
                            <Plus className="w-3 h-3" />
                          </Button>
                        </div>

                        <div className="text-left">
                          <p className="font-bold text-primary">
                            {(item.price * item.quantity).toLocaleString("fr-FR")} د.م.
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {item.price.toLocaleString("fr-FR")} د.م. للقطعة
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Cart Summary */}
              <div className="border-t border-border pt-6 space-y-4">
                <div className="flex items-center justify-between">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={clearCart}
                    className="text-red-500 border-red-200 bg-transparent"
                  >
                    <Trash2 className="w-4 h-4 ml-2" />
                    مسح السلة
                  </Button>
                </div>

                <Separator />

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>المجموع الفرعي</span>
                    <span>{total.toLocaleString("fr-FR")} د.م.</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>الشحن</span>
                    <span className="text-green-600">مجاني</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between text-lg font-bold">
                    <span>المجموع الكلي</span>
                    <span className="text-primary">{total.toLocaleString("fr-FR")} د.م.</span>
                  </div>
                </div>

                <div className="space-y-3">
                  <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground" asChild>
                    <Link href="/checkout" onClick={onClose}>
                      إتمام الطلب
                    </Link>
                  </Button>
                  <Button variant="outline" className="w-full bg-transparent" onClick={onClose} asChild>
                    <Link href="/products">متابعة التسوق</Link>
                  </Button>
                </div>
              </div>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  )
}
