"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { colors } from "@/lib/colors"
import Image from "next/image"
import { Check, ShoppingCart, Send, MessageCircle } from "lucide-react"
import { useState } from "react"

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
    email: "",
    phone: "",
    address: "",
    message: ""
  })

  const handleCheckout = () => {
    setIsAddingToCart(true)
    setTimeout(() => setIsAddingToCart(false), 1000)
    
    // Ici on ajouterait la logique du panier
    const pack = packs.find(p => p.id === selectedPack)
    console.log("Pack sélectionné pour checkout:", pack)
  }
  
  const handleDirectOrder = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmittingForm(true)
    
    // Simulation d'une soumission de formulaire
    const pack = packs.find(p => p.id === selectedPack)
    console.log("Commande directe:", { pack, userData: formData })
    
    setTimeout(() => {
      setIsSubmittingForm(false)
      setFormData({ name: "", email: "", phone: "", address: "", message: "" })
      // Vous pouvez ajouter un message de succès ici
    }, 2000)
  }
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  const selectedPackData = packs.find(p => p.id === selectedPack)

  return (
    <section className="w-full py-20" style={{
      background: `linear-gradient(to bottom right, ${productColor.light}20, white, ${productColor.light}20)`
    }}>
      <div className="container mx-auto px-4">
        
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl lg:text-5xl font-bold mb-4" dir="rtl" style={{ color: colors.text.primary }}>
            اختر الباقة المناسبة
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto" dir="rtl">
            وفّر أكثر مع عروض الباقات المتعددة
          </p>
        </div>

        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-4 items-start">
          
          {/* Left side - Pack options et pricing */}
          <div className="relative lg:col-span-1 order-2 lg:order-1">
            {/* Badge de réduction - Style de l'image 2 */}
            <div className="absolute -top-6 -right-6 z-20">
              <div className="bg-black text-white rounded-full w-24 h-24 flex flex-col items-center justify-center font-bold shadow-2xl transform rotate-12">
                <span className="text-2xl">42%</span>
                <span className="text-xs">خصم</span>
              </div>
            </div>

            {/* Direct order form */}
            <Card className="border-2 shadow-xl rounded-2xl overflow-hidden h-full" style={{
              borderColor: `${productColor.light}33`
            }}>
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-4 text-center" dir="rtl">
                  الطلب المباشر
                </h3>
                <p className="text-gray-600 mb-6 text-center" dir="rtl">
                  املأ هذا النموذج للطلب بدون سلة التسوق
                </p>
                
                <form onSubmit={handleDirectOrder} className="space-y-5" dir="rtl">
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

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        * البريد الإلكتروني
                      </label>
                      <Input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="your@email.com"
                        required
                        className="w-full text-left"
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
                    <Button
                      type="submit"
                      size="lg"
                      className="w-full py-6 text-xl font-bold rounded-2xl text-white transition-all duration-300 shadow-xl"
                      style={{
                        backgroundColor: productColor.main
                      }}
                      disabled={isSubmittingForm}
                    >
                      {isSubmittingForm ? (
                        <div className="flex items-center justify-center gap-3">
                          <div className="animate-spin w-5 h-5 border-2 border-white border-t-transparent rounded-full"></div>
                          جاري المعالجة...
                        </div>
                      ) : (
                        <div className="flex items-center justify-center gap-3">
                          <Send className="w-6 h-6" />
                          اطلب الآن
                        </div>
                      )}
                    </Button>
                    
                    {/* Security & Guarantee Info */}
                    <div className="flex items-center justify-center gap-4 mt-4 text-sm text-gray-600">
                      <div className="flex items-center gap-2">
                        <span>ضمان 30 يوم</span>
                        <Check className="w-4 h-4 text-green-600" />
                      </div>
                      <div className="flex items-center gap-2">
                        <span>توصيل مجاني</span>
                        <Check className="w-4 h-4 text-green-600" />
                      </div>
                    </div>
                    
                    {/* WhatsApp Support */}
                    <div className="mt-6 text-center">
                      <p className="text-sm text-gray-600 mb-3">
                        تحتاج مساعدة في طلبك؟
                      </p>
                      <Button 
                        type="button"
                        className="bg-green-500 hover:bg-green-600 text-white rounded-full py-2 px-5 text-sm flex items-center gap-2 mx-auto"
                        onClick={() => window.open('https://wa.me/212XXXXXXXX', '_blank')}
                      >
                        <MessageCircle className="w-4 h-4" />
                        تواصل معنا عبر واتساب
                      </Button>
                    </div>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Right side - Pack image et pricing */}
          <div className="space-y-8 lg:col-span-1 order-1 lg:order-2">
            
            {/* Image du pack sélectionné */}
            <div className="bg-gradient-to-br from-gray-100 to-gray-200 rounded-3xl p-8 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-white/50 to-transparent"></div>
              <div className="relative z-10 flex justify-center">
                <Image
                  src={selectedPackData?.image || packs[0].image}
                  alt={`${productName} - ${selectedPackData?.name || packs[0].name}`}
                  width={400}
                  height={300}
                  className="object-contain h-80 w-auto drop-shadow-xl"
                />
              </div>
              
              {/* Decorative elements */}
              <div className="absolute bottom-4 right-4 w-16 h-16 rounded-full" style={{ backgroundColor: `${productColor.main}1A` }}></div>
              <div className="absolute top-8 right-8 w-8 h-8 rounded-full" style={{ backgroundColor: `${productColor.main}33` }}></div>
            </div>

            {/* Pack selection buttons */}
            <div className="flex flex-wrap gap-4 mt-8 justify-center" dir="rtl">
              {packs.map((pack) => (
                <Button
                  key={pack.id}
                  variant={selectedPack === pack.id ? "default" : "outline"}
                  onClick={() => setSelectedPack(pack.id)}
                  className="px-6 py-3 rounded-full font-semibold transition-all duration-300"
                  style={{
                    backgroundColor: selectedPack === pack.id ? productColor.main : 'transparent',
                    borderColor: selectedPack === pack.id ? 'transparent' : '#d1d5db',
                    color: selectedPack === pack.id ? 'white' : '#374151',
                    boxShadow: selectedPack === pack.id ? '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)' : 'none'
                  }}
                >
                  {pack.name}
                </Button>
              ))}
            </div>

            {/* Pricing cards - Style de l'image 2 */}
            <div className="space-y-4" dir="rtl">
              {/* Option One-time Purchase - Style rouge de l'image 2 */}
              <Card className="border-2 rounded-2xl overflow-hidden text-white shadow-xl" style={{
                borderColor: productColor.main,
                background: `linear-gradient(to right, ${productColor.main}, ${productColor.dark})`
              }}>
                <CardContent className="p-1">
                  <div className="flex justify-between items-center">
                    <div className="flex-1 text-center">
                      <div className="flex justify-center items-baseline gap-2 mb-2">
                        <span className="text-lg font-semibold">السعر</span>
                      </div>
                      <div className="flex justify-center items-baseline gap-2">
                        <span className="text-4xl font-bold">
                          {((selectedPackData?.price || 0) * 1.1).toFixed(2)} د.م.
                        </span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Discount badge et features
            <div className="text-center py-4" dir="rtl">
              <Badge 
                className="bg-green-600 text-white px-4 py-2 text-lg font-bold rounded-full shadow-lg"
              >
                خصم 42%
              </Badge>
              <p className="text-sm text-gray-600 mt-2">
                وفر حتى 22.83 درهم مع هذه الباقة
              </p>
            </div> */}

            {/* Checkout button - Style noir comme l'image 2 */}
            <div className="pt-1">
              <Button
                size="default"
                onClick={handleCheckout}
                disabled={isAddingToCart}
                className="w-full py-1 text-lg font-bold rounded-2xl bg-black hover:bg-gray-800 text-white transition-all duration-300 shadow-xl h-10"
              >
                {isAddingToCart ? (
                  <div className="flex items-center gap-1">
                    <div className="animate-spin w-3 h-4 border-2 border-white border-t-transparent rounded-full"></div>
                    جاري الإضافة...
                  </div>
                ) : (
                  <div className="flex items-center justify-center gap-2">
                    <ShoppingCart className="w-2 h-1" />
                    إضافة إلى السلة
                  </div>
                )}
              </Button>
              
              {/* Security badges */}
              <div className="flex items-center justify-center gap-4 mt-3 text-xs text-gray-600">
                <div className="flex items-center gap-2">
                  <span>ضمان 30 يوم</span>
                  <Check className="w-4 h-4 text-green-600" />
                </div>
                <div className="flex items-center gap-2">
                  <span>توصيل مجاني</span>
                  <Check className="w-4 h-4 text-green-600" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}