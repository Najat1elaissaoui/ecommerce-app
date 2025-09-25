"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { colors } from "@/lib/colors"
import Image from "next/image"
import { Check, ShoppingCart, Send, MessageCircle } from "lucide-react"
import { useState } from "react"
import { useCart } from "@/lib/cart-context"
import { useToast } from "../ui/use-toast"
import { Product } from "@/lib/types"

interface Pack {
  id: number
  name: string
  image: string
  price: number
  originalPrice?: number
  quantity: number
  discount?: string
  popular?: boolean
}

interface ProductPacksSectionProps {
  packs: Pack[]
  productName: string
  productColor?: {
    main: string   // Couleur principale du produit
    light: string  // Version plus claire
    dark: string   // Version plus foncée
    contrastText: string // Texte contrasté qui se lit bien sur la couleur principale
  }
}

export default function ProductPacksSection({ 
  packs, 
  productName,
  productColor = {
    main: "#AE3131",      // Rouge par défaut
    light: "#D15858",     // Version plus claire
    dark: "#8C1E1E",      // Version plus foncée
    contrastText: "#FFFFFF" // Texte blanc pour contraste
  }
}: ProductPacksSectionProps) {
  const [selectedPack, setSelectedPack] = useState<number>(packs.find(p => p.popular)?.id || packs[0]?.id)
  const [isAddingToCart, setIsAddingToCart] = useState(false)
  const [isSubmittingForm, setIsSubmittingForm] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: ""
  })

  const handleCheckout = () => {
    const pack = packs.find(p => p.id === selectedPack)
    if (!pack) return;
    addItem({
      id: pack.id,
      name_ar: productName + ' - ' + pack.name,
      price: pack.price,
      type: "pack",
      image: pack.image,
    });
    toast({
      title: "تم إضافة الباقة للسلة",
      description: `تم إضافة ${productName} - ${pack.name} إلى سلة التسوق`,
    });
  }
  
  const handleDirectOrder = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmittingForm(true)
    
    // Simulation d'une soumission de formulaire
    const pack = packs.find(p => p.id === selectedPack)
    console.log("Commande directe:", { pack, userData: formData })
    
    setTimeout(() => {
      setIsSubmittingForm(false)
      setFormData({ name: "", phone: "", address: "" })
      // Vous pouvez ajouter un message de succès ici
    }, 2000)
  }
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }
  const handleAddToCart = (product: Product) => {
    addItem({
      id: product.id,
      name_ar: product.name_ar,
      price: product.price,
      type: "product",
      image: product.images?.[0],
    })
    toast({
      title: "تم إضافة المنتج للسلة",
      description: `تم إضافة ${product.name_ar} إلى سلة التسوق`,
    })
  }
  const { addItem } = useCart()
  const { toast } = useToast()

  const selectedPackData = packs.find(p => p.id === selectedPack)

  return (
    <section className="w-full py-20" id="product-packs" style={{
      background: `linear-gradient(to bottom right, ${productColor.light}20, white, ${productColor.light}20)`
    }}>
      <div className="container mx-auto px-4">
        
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl lg:text-5xl font-bold mb-4" dir="rtl" style={{ color: colors.text.primary }}>
            اختر الباقة المناسبة
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto" dir="rtl">
            احصل على أفضل العروض مع باقتنا المميزة
          </p>
        </div>
        
        {/* Badge de réduction */}
        {/* <div className="relative max-w-6xl mx-auto">
          <div className="absolute -top-6 -right-6 z-20 lg:block hidden">
            <div className="text-white rounded-full w-24 h-24 flex flex-col items-center justify-center font-bold shadow-2xl transform rotate-12" style={{
              backgroundColor: productColor.main
            }}>
              <span className="text-2xl">42%</span>
              <span className="text-xs">خصم</span>
            </div>
          </div>
        </div> */}
        
        {/* Mobile layout - Like image reference */}
        <div className="md:hidden max-w-6xl mx-auto mb-8">
          <div className="flex flex-row items-center gap-4 rounded-lg p-4">
            {/* Image du pack */}
            <div className="w-1/3 relative">
              <Image
                src={selectedPackData?.image || packs[0].image}
                alt={`${productName} - ${selectedPackData?.name || packs[0].name}`}
                width={100}
                height={100}
                className="object-contain h-24 w-full"
              />
              <div className="absolute -top-2 -right-2">
                <div className="text-white rounded-full w-12 h-12 flex flex-col items-center justify-center font-bold text-xs" style={{
                  backgroundColor: productColor.main
                }}>
                  <span>42%</span>
                  <span>خصم</span>
                </div>
              </div>
            </div>
            
            {/* Price info - single card in Arabic */}
            <div className="w-2/3 text-right rounded-lg p-3" dir="rtl" style={{
              backgroundColor: productColor.main,
              color: 'white'
            }}>
              <div className="mb-1">
                <div className="text-white text-xs font-bold px-2 py-1 rounded-sm inline-block mb-1" style={{ 
                  backgroundColor: productColor.dark
                }}>
                  خصم 10% وإلغاء في أي وقت
                </div>
              </div>
              <div className="mb-1">
                <span className="text-sm font-medium">شراء لمرة واحدة</span>
              </div>
              <div className="text-xl font-bold">
                {((selectedPackData?.price || 0)).toFixed(2)} د.م.
              </div>
              <div className="flex gap-1 items-center justify-end">
                <span className="text-xs line-through opacity-70">
                  {((selectedPackData?.price || 0) * 1.2).toFixed(2)} د.م.
                </span>
                <span className="text-xs">المجموع:</span>
              </div>
            </div>
          </div>
          
          {/* Pack selection buttons - mobile */}
          <div className="flex flex-row items-center justify-between mt-3 gap-2" dir="rtl">
            {packs.map((pack) => (
              <Button
                key={pack.id}
                variant={selectedPack === pack.id ? "default" : "outline"}
                onClick={() => setSelectedPack(pack.id)}
                className="px-3 py-1 text-xs rounded-md flex-1 text-center transition-all duration-300"
                style={{
                  backgroundColor: selectedPack === pack.id ? productColor.main : 'white',
                  borderColor: productColor.main,
                  color: selectedPack === pack.id ? 'white' : productColor.main
                }}
              >
                {`PACK-${pack.quantity}`}
              </Button>
            ))}
          </div>
        </div>

        {/* Desktop layout - Buttons directly below card */}
        <div className="hidden md:block max-w-6xl mx-auto">
          <div className="flex flex-row gap-8">
            {/* Left side - Card with pricing info and buttons */}
            <div className="w-1/2">
              <div className="rounded-lg p-6 text-white" style={{
                backgroundColor: productColor.main
              }}>
                <div className="flex justify-between items-center mb-2" dir="rtl">
                  <div className="text-white text-xs font-bold px-2 py-1 rounded-sm" style={{ 
                    backgroundColor: productColor.dark 
                  }}>
                    خصم 10% وإلغاء في أي وقت
                  </div>
                </div>
                <div className="text-right" dir="rtl">
                  <h3 className="text-xl font-bold mb-1">شراء لمرة واحدة</h3>
                  <div className="flex items-baseline gap-2 justify-end">
                    <span>للوحدة</span>
                    <span className="text-5xl font-bold">
                      {((selectedPackData?.price || 0)).toFixed(2)} د.م.
                    </span>
                  </div>
                  <div className="flex items-center mt-1 justify-end">
                    <span className="text-sm text-white opacity-70 line-through">
                      {((selectedPackData?.price || 0) * 1.2).toFixed(2)} د.م.
                    </span>
                    <span className="text-sm mr-1">:المجموع</span>
                  </div>
                </div>
              </div>
              
              {/* Pack selection buttons directly below card */}
              <div className="flex flex-row items-center justify-between gap-3 mt-3" dir="rtl">
                {packs.map((pack) => (
                  <Button
                    key={pack.id}
                    variant={selectedPack === pack.id ? "default" : "outline"}
                    onClick={() => setSelectedPack(pack.id)}
                    className="py-2 px-5 flex-1 text-center transition-all duration-300"
                    style={{
                      backgroundColor: selectedPack === pack.id ? productColor.main : 'white',
                      borderColor: productColor.main,
                      color: selectedPack === pack.id ? 'white' : productColor.main
                    }}
                  >
                    {`PACK-${pack.quantity}`}
                  </Button>
                ))}
              </div>
            </div>
            
            {/* Right side - Product image without background */}
            <div className="w-1/2">
              <div className="relative">
                <div className="absolute -top-6 -right-6 z-20">
                  <div className="text-white rounded-full w-24 h-24 flex flex-col items-center justify-center font-bold shadow-lg" style={{
                    backgroundColor: productColor.main
                  }}>
                    <span className="text-2xl">42%</span>
                    <span className="text-xs">خصم</span>
                  </div>
                </div>
                <div className="relative z-10 flex justify-center">
                  <Image
                    src={selectedPackData?.image || packs[0].image}
                    alt={`${productName} - ${selectedPackData?.name || packs[0].name}`}
                    width={300}
                    height={300}
                    className="object-contain h-72 w-auto"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Form at the bottom for all views */}
        <div className="max-w-6xl mx-auto mt-10 mb-20" id="order-form-section">
          <Card className="border-2 shadow-xl rounded-2xl overflow-hidden" style={{
            borderColor: `${productColor.light}33`
          }}>
            <CardContent className="p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4 text-center" dir="rtl">
                الطلب المباشر
              </h3>
              
              <form onSubmit={handleDirectOrder} className="space-y-4" dir="rtl">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    * الاسم الكامل
                  </label>
                  <Input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="الاسم الكامل"
                    required
                    className="w-full text-right"
                    dir="rtl"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    * رقم الهاتف
                  </label>
                  <Input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="0XXXXXXXXX"
                    required
                    className="w-full text-right"
                    dir="rtl"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    * عنوان التوصيل
                  </label>
                  <Input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    placeholder="العنوان الكامل"
                    required
                    className="w-full text-right"
                    dir="rtl"
                  />
                </div>

                <div className="pt-4">
                  <div className="flex flex-row gap-2 w-full">
                    <Button
                      type="submit"
                      size="lg"
                      className="flex-1 py-4 text-lg font-bold rounded-xl text-white transition-all duration-300 shadow-lg min-w-0"
                      style={{
                        backgroundColor: productColor.main
                      }}
                      disabled={isSubmittingForm}
                    >
                      {isSubmittingForm ? (
                        <div className="flex items-center justify-center gap-2" dir="rtl">
                          <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full"></div>
                          جاري المعالجة...
                        </div>
                      ) : (
                        <div className="flex items-center justify-center gap-2" dir="rtl">
                          <Send className="w-5 h-5" />
                          اطلب الآن
                        </div>
                      )}
                    </Button>
                    <button
                      type="button"
                      onClick={handleCheckout}
                      className="flex items-center justify-center p-0 w-14 h-9 rounded-xl bg-black text-white hover:bg-gray-900 transition-colors min-w-0"
                      title="Checkout"
                      style={{ minWidth: '3.5rem', minHeight: '2rem' }}
                    >
                      <ShoppingCart className="w-6 h-6" />
                    </button>
                  </div>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
        
        {/* Fixed bottom button for "Add to Cart" that stays visible when scrolling */}
        <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-200 shadow-lg z-50">
          <Button
            size="lg"
            onClick={() => {
              const formSection = document.getElementById('order-form-section');
              if (formSection) {
                formSection.scrollIntoView({ behavior: 'smooth' });
              }
            }}
            className="w-full py-4 text-lg font-bold rounded-xl text-white transition-all duration-300 shadow-md"
            style={{
              backgroundColor: productColor.main,
              color: productColor.contrastText
            }}
          >
            <div className="flex items-center justify-center gap-2" dir="rtl">
              <ShoppingCart className="w-5 h-5" />
              إضافة إلى السلة
            </div>
          </Button>
        </div>
      </div>
    </section>
  )
}