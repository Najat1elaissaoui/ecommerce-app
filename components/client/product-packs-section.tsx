"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useCart } from "@/lib/cart-context";
import {
  Check,
  Package,
  Send,
  ShoppingCart,
  Sparkles,
  TrendingUp,
} from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useToast } from "../ui/use-toast";

interface ProductPackSectionProps {
  packs: Array<{
    id: number;
    name: string;
    price: number;
    quantity: number;
    image: string;
  }>;
  productName: string;
  productColor: string;
}

export default function ProductPacksSection({
  packs,
  productName,
  productColor,
}: ProductPackSectionProps) {
  const [selectedPack, setSelectedPack] = useState(packs[0]?.id || 0);
  const [isSubmittingForm, setIsSubmittingForm] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleCheckout = () => {
    toast({
      title: "تم إضافة الباقة للسلة",
      description: `تم إضافة ${productName} - ${
        packs.find((p) => p.id === selectedPack)?.name
      } إلى سلة التسوق`,
    });
  };

  const handleDirectOrder = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.address) {
      toast({
        title: "خطأ",
        description: "يرجى ملء جميع الحقول المطلوبة",
        variant: "destructive",
      });
      return;
    }
    setIsSubmittingForm(true);
    setTimeout(() => {
      setIsSubmittingForm(false);
      toast({
        title: "تم إرسال الطلب",
        description: "سيتم التواصل معك قريبًا لتأكيد الطلب.",
      });
      setFormData({ name: "", phone: "", address: "" });
    }, 2000);
  };

  const selectedPackData = packs.find((p) => p.id === selectedPack);
  const mostPopularIndex = Math.floor(packs.length / 2);

  return (
    <section
      className="w-full py-8 lg:py-12 relative overflow-hidden"
      id="product-packs"
    >
      <div className="absolute inset-0 opacity-30">
        <div
          className="absolute top-0 left-0 w-96 h-96 rounded-full blur-3xl"
          style={{ background: `${productColor}40` }}
        />
        <div
          className="absolute bottom-0 right-0 w-96 h-96 rounded-full blur-3xl"
          style={{ background: `${productColor}20` }}
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-8 lg:mb-10 opacity-0 animate-fade-in">
          <div
            className="inline-flex items-center justify-center w-12 h-12 rounded-full mb-3"
            style={{ background: `${productColor}20` }}
          >
            <Package className="w-6 h-6" style={{ color: productColor }} />
          </div>
          <h2
            className="text-3xl lg:text-5xl font-black mb-3 bg-gradient-to-br from-gray-900 to-gray-600 bg-clip-text text-transparent"
            dir="rtl"
          >
            اختر الباقة المناسبة
          </h2>
          <p
            className="text-base lg:text-lg text-gray-600 max-w-2xl mx-auto font-light"
            dir="rtl"
          >
            احصل على أفضل العروض مع باقتنا المميزة
          </p>
        </div>

        <div className="hidden lg:grid lg:grid-cols-3 gap-4 max-w-7xl mx-auto mb-10">
          {packs.map((pack, index) => {
            const isSelected = selectedPack === pack.id;
            const isPopular = index === mostPopularIndex;

            return (
              <div
                key={pack.id}
                className={`relative cursor-pointer transition-all duration-500 ${
                  isSelected ? "scale-105" : "hover:scale-102"
                }`}
                onClick={() => setSelectedPack(pack.id)}
              >
                {isPopular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
                    <div
                      className="px-4 py-1.5 rounded-full text-white text-xs font-bold shadow-lg flex items-center gap-1"
                      style={{ backgroundColor: productColor }}
                    >
                      <Sparkles className="w-3 h-3" />
                      الأكثر مبيعاً
                    </div>
                  </div>
                )}

                <Card
                  className={`relative overflow-hidden transition-all duration-500 border-2 ${
                    isSelected ? "shadow-2xl" : "shadow-lg hover:shadow-xl"
                  }`}
                  style={{
                    borderColor: isSelected ? productColor : "#e5e7eb",
                    transform: isSelected
                      ? "translateY(-8px)"
                      : "translateY(0)",
                  }}
                >
                  {isSelected && (
                    <div
                      className="absolute top-0 left-0 right-0 h-2"
                      style={{
                        background: `linear-gradient(90deg, ${productColor}, ${productColor}dd)`,
                      }}
                    />
                  )}

                  <CardContent className="p-4">
                    <div className="relative mb-4 flex items-center justify-center h-32">
                      <Image
                        src={pack.image}
                        alt={pack.name}
                        width={160}
                        height={160}
                        className="object-contain hover:scale-110 transition-transform duration-500"
                      />
                    </div>

                    <div className="text-center space-y-2" dir="rtl">
                      <h3 className="text-xl font-bold text-gray-900">
                        {pack.name}
                      </h3>

                      <div className="flex items-center justify-center gap-2 text-gray-600">
                        <Package className="w-3 h-3" />
                        <span className="text-xs font-medium">
                          {pack.quantity} قطعة
                        </span>
                      </div>

                      <div className="pt-2 pb-1">
                        <div
                          className="text-3xl font-black"
                          style={{ color: productColor }}
                        >
                          {pack.price.toFixed(2)}{" "}
                          <span className="text-xl">د.م.</span>
                        </div>
                        <div className="text-xs text-gray-500 mt-1">
                          {(pack.price / pack.quantity).toFixed(2)} د.م. للقطعة
                        </div>
                      </div>

                      <Button
                        className={`w-full py-4 rounded-xl font-bold transition-all duration-300 ${
                          isSelected ? "shadow-lg" : ""
                        }`}
                        style={{
                          backgroundColor: isSelected ? productColor : "white",
                          color: isSelected ? "white" : productColor,
                          border: `2px solid ${productColor}`,
                        }}
                      >
                        {isSelected ? (
                          <span className="flex items-center gap-2">
                            <Check className="w-5 h-5" />
                            تم الاختيار
                          </span>
                        ) : (
                          "اختر هذه الباقة"
                        )}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            );
          })}
        </div>

        <div className="lg:hidden max-w-2xl mx-auto mb-8">
          <Card
            className="border-2 shadow-xl mb-4 overflow-hidden"
            style={{ borderColor: productColor }}
          >
            <div
              className="h-1.5 w-full"
              style={{
                background: `linear-gradient(90deg, ${productColor}, ${productColor}dd)`,
              }}
            />
            <CardContent className="p-4">
              <div className="flex gap-4 items-center">
                <div className="w-24 h-24 flex-shrink-0">
                  <Image
                    src={selectedPackData?.image || packs[0].image}
                    alt={selectedPackData?.name || packs[0].name}
                    width={96}
                    height={96}
                    className="object-contain w-full h-full"
                  />
                </div>
                <div className="flex-1 text-right" dir="rtl">
                  <h3 className="text-lg font-bold text-gray-900 mb-1">
                    {selectedPackData?.name}
                  </h3>
                  <div className="flex items-center gap-2 text-gray-600 mb-2">
                    <Package className="w-3 h-3" />
                    <span className="text-xs">
                      {selectedPackData?.quantity} قطعة
                    </span>
                  </div>
                  <div
                    className="text-2xl font-black"
                    style={{ color: productColor }}
                  >
                    {(selectedPackData?.price || 0).toFixed(2)}{" "}
                    <span className="text-lg">د.م.</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-3 gap-2" dir="rtl">
            {packs.map((pack) => (
              <Button
                key={pack.id}
                onClick={() => setSelectedPack(pack.id)}
                className="relative py-6 rounded-xl font-bold transition-all duration-300"
                style={{
                  backgroundColor:
                    selectedPack === pack.id ? productColor : "white",
                  color: selectedPack === pack.id ? "white" : productColor,
                  border: `2px solid ${productColor}`,
                }}
              >
                {selectedPack === pack.id && (
                  <div
                    className="absolute -top-2 -right-2 w-6 h-6 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: productColor }}
                  >
                    <Check className="w-4 h-4 text-white" />
                  </div>
                )}
                <div className="text-center">
                  <div className="text-sm mb-1">{pack.name}</div>
                  <div className="text-xs opacity-75">{pack.quantity} قطعة</div>
                </div>
              </Button>
            ))}
          </div>
        </div>

        <div
          className="max-w-3xl mx-auto"
          id="order-form-section"
          ref={formRef}
        >
          <Card className="border-2 shadow-2xl rounded-3xl overflow-hidden backdrop-blur-sm bg-white/95">
            <div
              className="h-2 w-full"
              style={{
                background: `linear-gradient(90deg, ${productColor}, ${productColor}dd)`,
              }}
            />
            <CardContent className="p-6 lg:p-8">
              <div className="text-center mb-6">
                <div
                  className="inline-flex items-center justify-center w-12 h-12 rounded-full mb-3"
                  style={{ background: `${productColor}20` }}
                >
                  <Send className="w-6 h-6" style={{ color: productColor }} />
                </div>
                <h3
                  className="text-xl lg:text-2xl font-bold text-gray-900 mb-2"
                  dir="rtl"
                >
                  أكمل طلبك الآن
                </h3>
                <p className="text-sm text-gray-600" dir="rtl">
                  املأ البيانات وسنتواصل معك فوراً
                </p>
              </div>

              <div className="space-y-4" dir="rtl">
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-gray-700">
                    الاسم الكامل *
                  </label>
                  <Input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="أدخل اسمك الكامل"
                    required
                    className="w-full text-right py-5 text-sm rounded-xl border-2 focus:border-current transition-colors"
                    style={{ borderColor: "#e5e7eb" }}
                    dir="rtl"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-gray-700">
                    رقم الهاتف *
                  </label>
                  <Input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="06XXXXXXXX"
                    required
                    className="w-full text-right py-5 text-sm rounded-xl border-2 focus:border-current transition-colors"
                    style={{ borderColor: "#e5e7eb" }}
                    dir="rtl"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-gray-700">
                    عنوان التوصيل *
                  </label>
                  <Input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    placeholder="المدينة، الحي، الشارع..."
                    required
                    className="w-full text-right py-5 text-sm rounded-xl border-2 focus:border-current transition-colors"
                    style={{ borderColor: "#e5e7eb" }}
                    dir="rtl"
                  />
                </div>

                <div className="flex flex-col sm:flex-row gap-2 pt-2">
                  <Button
                    onClick={(e) => {
                      e.preventDefault();
                      handleDirectOrder(e as any);
                    }}
                    size="lg"
                    className="flex-1 py-5 text-base font-bold rounded-xl text-white transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
                    style={{ backgroundColor: productColor }}
                    disabled={isSubmittingForm}
                  >
                    {isSubmittingForm ? (
                      <div
                        className="flex items-center justify-center gap-3"
                        dir="rtl"
                      >
                        <div className="animate-spin w-5 h-5 border-2 border-white border-t-transparent rounded-full" />
                        جاري المعالجة...
                      </div>
                    ) : (
                      <div
                        className="flex items-center justify-center gap-3"
                        dir="rtl"
                      >
                        <Send className="w-5 h-5" />
                        اطلب الآن - توصيل مجاني
                      </div>
                    )}
                  </Button>

                  <Button
                    type="button"
                    onClick={handleCheckout}
                    size="lg"
                    className="sm:w-auto py-5 px-6 rounded-xl font-bold bg-gray-900 hover:bg-gray-800 text-white transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
                  >
                    <div className="flex items-center gap-2">
                      <ShoppingCart className="w-4 h-4" />
                      <span className="hidden sm:inline text-sm">
                        اضف للسلة
                      </span>
                    </div>
                  </Button>
                </div>

                <div
                  className="grid grid-cols-3 gap-3 pt-4 border-t border-gray-200"
                  dir="rtl"
                >
                  <div className="text-center">
                    <div
                      className="text-xl font-bold"
                      style={{ color: productColor }}
                    >
                      ✓
                    </div>
                    <div className="text-[10px] text-gray-600 mt-0.5">
                      توصيل سريع
                    </div>
                  </div>
                  <div className="text-center">
                    <div
                      className="text-xl font-bold"
                      style={{ color: productColor }}
                    >
                      ✓
                    </div>
                    <div className="text-[10px] text-gray-600 mt-0.5">
                      دفع عند الاستلام
                    </div>
                  </div>
                  <div className="text-center">
                    <div
                      className="text-xl font-bold"
                      style={{ color: productColor }}
                    >
                      ✓
                    </div>
                    <div className="text-[10px] text-gray-600 mt-0.5">
                      ضمان الجودة
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {showFixedButton && (
          <div className="fixed bottom-0 left-0 right-0 p-4 bg-white/95 backdrop-blur-md border-t border-gray-200 shadow-2xl z-[99999999] opacity-0 animate-slide-up">
            <div className="container mx-auto max-w-3xl">
              <Button
                size="lg"
                onClick={() => {
                  document
                    .getElementById("order-form-section")
                    ?.scrollIntoView({ behavior: "smooth", block: "center" });
                }}
                className="w-full py-6 text-lg font-bold rounded-xl text-white transition-all duration-300 shadow-lg hover:scale-105"
                style={{ backgroundColor: productColor }}
              >
                <div
                  className="flex items-center justify-center gap-3"
                  dir="rtl"
                >
                  <TrendingUp className="w-5 h-5" />
                  اطلب الآن - عرض خاص
                </div>
              </Button>
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes slide-up {
          from {
            opacity: 0;
            transform: translateY(100%);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.8s ease-out forwards;
        }
        .animate-slide-up {
          animation: slide-up 0.3s ease-out forwards;
        }
        .hover\\:scale-102:hover {
          transform: scale(1.02);
        }
      `}</style>
    </section>
  );
}
