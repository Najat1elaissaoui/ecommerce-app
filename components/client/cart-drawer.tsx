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
      <SheetContent side="left" className="w-full sm:max-w-lg px-2 md:px-6 py-2 md:py-4 transition-none duration-0 !ease-linear flex flex-col">
        <SheetHeader className="space-y-4">
          <div className="flex items-center justify-between">
            <SheetTitle className="text-xl font-bold">سلة التسوق</SheetTitle>
            <Badge variant="secondary" className="bg-primary/10 text-primary">
              {itemCount} عنصر
            </Badge>
          </div>
        </SheetHeader>

        <div className="flex-1 flex flex-col min-h-0">
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
              {/* Cart Items (scrollable) */}
              <div className="flex-1 overflow-y-auto hide-scrollbar py-6 space-y-4">
                {items.map((item) => (
                  <div key={`${item.id}-${item.type}`} className="flex gap-4 p-4 md:p-5 bg-muted/30 rounded-xl md:rounded-2xl shadow-sm items-center">
                    <img
                      src={item.image || "/placeholder.svg"}
                      alt={item.name_ar}
                      className="w-16 h-16 md:w-20 md:h-20 object-cover rounded-lg border border-border/40 bg-white"
                    />

                    <div className="flex-1 space-y-2">
                      <div className="flex items-start justify-between gap-2">
                        <h4 className="font-semibold text-sm md:text-base line-clamp-2 pr-1 md:pr-2">{item.name_ar}</h4>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeItem(item.id)}
                          className="text-red-500 hover:text-red-700 h-auto p-1"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>

                      <div className="flex items-center justify-between gap-2">
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

                        <div className="text-left min-w-[70px] md:min-w-[90px]">
                          <p className="font-bold text-primary text-xs md:text-base">
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

              {/* Cart Summary and Fixed Buttons */}
              <div className="border-t border-border pt-6 space-y-4 bg-white sticky bottom-0 left-0 right-0 z-10">
                <div className="space-y-2">
                  <div className="flex justify-between text-lg font-bold">
                    <span>المجموع الكلي</span>
                    <span className="text-primary">{total.toLocaleString("fr-FR")} د.م.</span>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex flex-col items-center gap-2 w-full">
                    <Button className="w-full max-w-xs block mx-auto h-10 text-base bg-primary hover:bg-primary/90 text-primary-foreground" asChild>
                      <Link href="/checkout" onClick={onClose} className="w-full flex justify-center">
                        إتمام الطلب
                      </Link>
                    </Button>
                    <Button variant="outline" className="w-full max-w-xs block mx-auto h-10 text-base bg-transparent justify-center" onClick={onClose} asChild>
                      <Link href="/products" className="w-full flex justify-center">متابعة التسوق</Link>
                    </Button>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  )
}
