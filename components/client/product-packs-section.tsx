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

interface ProductPackSectionProps {
  packs: Array<{ id: number; name: string; price: number; quantity: number; image: string }>;
  productName: string;
  productColor: { main: string; light: string; contrastText?: string };
}

export default function ProductPacksSection({ packs, productName, productColor }: ProductPackSectionProps) {
  const [selectedPack, setSelectedPack] = useState(packs[0]?.id || 0);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [isSubmittingForm, setIsSubmittingForm] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: ""
  });
  const [showFixedButton, setShowFixedButton] = useState(true);
  const formRef = useRef<HTMLDivElement>(null);
  const { addItem } = useCart();
  const { toast } = useToast();

  useEffect(() => {
    if (!formRef.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => setShowFixedButton(!entry.isIntersecting),
      { threshold: 0.1 }
    );
    observer.observe(formRef.current);
    return () => observer.disconnect();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleAddToCart = (product: Product) => {
    addItem({
      id: product.id,
      name_ar: product.name_ar,
      price: product.price,
      type: "product",
      image: product.images?.[0],
    });
    toast({
      title: "تم إضافة المنتج للسلة",
      description: `تم إضافة ${product.name_ar} إلى سلة التسوق`,
    });
  };

  const handleCheckout = () => {
    // Implement checkout logic here
    toast({
      title: "تم إضافة الباقة للسلة",
  description: `تم إضافة ${productName} - ${packs.find((p: {id: number; name: string}) => p.id === selectedPack)?.name} إلى سلة التسوق`,
    });
  };

  const handleDirectOrder = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmittingForm(true);
    setTimeout(() => {
      setIsSubmittingForm(false);
      toast({
        title: "تم إرسال الطلب",
        description: "سيتم التواصل معك قريبًا لتأكيد الطلب.",
      });
    }, 2000);
  };
  // Remove stray bracket and ensure hooks are at the top
  const selectedPackData = packs.find((p: {id: number}) => p.id === selectedPack);

  return (
    <section className="w-full py-20 pt-4" id="product-packs" style={{
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
            {/* Image du pack - same size as card */}
            <div className="w-1/2 flex items-center justify-center">
              <Image
                src={selectedPackData?.image || packs[0].image}
                alt={`${productName} - ${selectedPackData?.name || packs[0].name}`}
                width={140}
                height={140}
                className="object-contain h-32 w-32"
              />
            </div>
            {/* Info significative */}
            <div className="w-1/2 rounded-lg p-3 flex flex-col items-center justify-center text-center" dir="rtl" style={{
              backgroundColor: productColor.main,
              color: 'white',
              minHeight: '128px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center'
            }}>
              <div className="text-lg font-bold mb-1 w-full">{selectedPackData?.name}</div>
              <div className="text-2xl font-extrabold w-full">{((selectedPackData?.price || 0)).toFixed(2)} د.م.</div>
            </div>
          </div>
          
          {/* Pack selection buttons - mobile, show pack name, scrollable if needed */}
          <div className="flex flex-row flex-wrap items-center justify-start mt-3 gap-2 overflow-x-auto md:overflow-x-visible" dir="rtl" style={{ WebkitOverflowScrolling: 'touch', scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
            {packs.map((pack) => (
              <Button
                key={pack.id}
                variant={selectedPack === pack.id ? "default" : "outline"}
                onClick={() => setSelectedPack(pack.id)}
                  className="px-4 py-2 text-xs rounded-md min-w-[100px] text-center transition-all duration-300 font-bold whitespace-nowrap cursor-pointer flex-shrink-0"
                style={{
                  backgroundColor: selectedPack === pack.id ? productColor.main : 'white',
                  borderColor: productColor.main,
                  color: selectedPack === pack.id ? 'white' : productColor.main
                }}
              >
                {pack.name}
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
                     className="py-2 px-5 flex-1 text-center transition-all duration-300 cursor-pointer"
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
  <div className="max-w-6xl mx-auto mt-10" id="order-form-section" ref={formRef}>
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
                    onInvalid={e => e.currentTarget.setCustomValidity('يرجى إدخال الاسم الكامل')}
                    onInput={e => e.currentTarget.setCustomValidity('')}
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
                    onInvalid={e => e.currentTarget.setCustomValidity('يرجى إدخال رقم الهاتف')}
                    onInput={e => e.currentTarget.setCustomValidity('')}
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
                    onInvalid={e => e.currentTarget.setCustomValidity('يرجى إدخال عنوان التوصيل')}
                    onInput={e => e.currentTarget.setCustomValidity('')}
                  />
                </div>

                <div className="pt-4">
                  <div className="flex flex-row gap-2 w-full">
                    <Button
                      type="submit"
                      size="lg"
                      className="flex-1 py-4 text-lg font-bold rounded text-white transition-all duration-300 shadow-lg min-w-0 cursor-pointer"
                      style={{
                        backgroundColor: productColor.main,
                        minHeight: '3.5rem',
                        borderRadius: '0.5rem'
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
                      className="flex items-center justify-center gap-2 rounded bg-black text-white hover:bg-gray-900 transition-colors min-w-0 ml-2 px-4 py-2 cursor-pointer"
                      title="Checkout"
                      style={{ minWidth: '3.5rem', minHeight: '3.5rem', height: '3.5rem', borderRadius: '0.5rem' }}
                    >
                      <ShoppingCart className="w-6 h-6" />
                      <span className="text-sm font-bold hidden md:inline">اضف الى السلة</span>
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
              className="w-full py-4 text-lg font-bold rounded text-white transition-all duration-300 shadow-md cursor-pointer"
              style={{
                backgroundColor: productColor.main,
                color: productColor.contrastText,
                borderRadius: '0.5rem'
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
