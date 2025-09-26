"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { colors } from "@/lib/colors"
import Image from "next/image"
import { Check, ShoppingCart, Send, MessageCircle } from "lucide-react"
import { useState, useEffect, useRef } from "react"
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
  });
  // Show/hide fixed button based on form visibility
  const [showFixedButton, setShowFixedButton] = useState(true);
  const formRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!formRef.current) return;
    const observer = new window.IntersectionObserver(
      ([entry]) => {
        setShowFixedButton(!entry.isIntersecting);
      },
      {
        root: null,
        threshold: 0.2,
      }
    );
    observer.observe(formRef.current);
    return () => observer.disconnect();
  }, []);

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
        
        {/* Mobile layout - Only significant info: pack name, quantity, price */}
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
            </div>
            {/* Info significative */}
            <div className="w-2/3 rounded-lg p-3 flex flex-col items-center justify-center text-center" dir="rtl" style={{
              backgroundColor: productColor.main,
              color: 'white'
            }}>
              <div className="text-lg font-bold mb-1 w-full">{selectedPackData?.name}</div>
              <div className="text-sm mb-1 w-full">الكمية: {selectedPackData?.quantity}</div>
              <div className="text-2xl font-extrabold w-full">{((selectedPackData?.price || 0)).toFixed(2)} د.م.</div>
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

        {/* Desktop layout - Only significant info: pack name, quantity, price */}
        <div className="hidden md:block max-w-6xl mx-auto">
          <div className="flex flex-row gap-8">
            {/* Left side - Card with pricing info and buttons */}
            <div className="w-1/2 flex flex-col justify-center">
              <div className="rounded-lg p-8 text-white flex flex-col items-center justify-center text-center min-h-[200px]" style={{
                backgroundColor: productColor.main
              }}>
                <div className="text-2xl font-extrabold mb-2 w-full">{selectedPackData?.name}</div>
                <div className="text-lg mb-2 w-full">الكمية: {selectedPackData?.quantity}</div>
                <div className="text-4xl font-black w-full">{((selectedPackData?.price || 0)).toFixed(2)} د.م.</div>
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
            {/* Right side - Product image */}
            <div className="w-1/2 flex items-center justify-center">
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
        
        {/* Form at the bottom for all views */}
  <div className="max-w-6xl mx-auto mt-10 mb-20" id="order-form-section" ref={formRef}>
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
                      className="flex items-center justify-center gap-2 p-0 w-auto h-9 rounded-xl bg-black text-white hover:bg-gray-900 transition-colors min-w-0 px-3"
                      title="Checkout"
                      style={{ minWidth: '3.5rem', minHeight: '2rem' }}
                    >
                      <ShoppingCart className="w-6 h-6" />
                      <span className="text-sm font-bold">اضف الى السلة</span>
                    </button>
                  </div>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
        
        {/* Fixed bottom button for "Add to Cart" that stays visible when scrolling, except when form is in view */}
        {showFixedButton && (
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
                  اطلب الآن
                </div>
            </Button>
          </div>
        )}
      </div>
    </section>
  )
}