"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { useCart } from "@/lib/cart-context"
import { useToast } from "@/hooks/use-toast"
import Image from "next/image"

interface Pack {
  id: number
  name: string
  image: string
  price: number
  originalPrice?: number
  
  popular?: boolean
  productName: string
  productColor?: {
    main: string
    light: string
    dark: string
    contrastText: string
  }
}

  // Packs globaux (extrait de product/[id]/page.tsx)
  const globalPacks: Pack[] = [
    // Produit 1
    { id: 1, name: "عبوة واحدة", image: "/pack1.png", price: 19.32, originalPrice: 26.00, productName: "علكة خل التفاح", productColor: { main: "#AE3131", light: "#D15858", dark: "#8C1E1E", contrastText: "#FFFFFF" } },
    { id: 2, name: "3 عبوات", image: "/pack3.png", price: 17.39, originalPrice: 25.00, productName: "علكة خل التفاح", productColor: { main: "#AE3131", light: "#D15858", dark: "#8C1E1E", contrastText: "#FFFFFF" } },
    { id: 3, name: "5 عبوات", image: "/pack5.png", price: 15.99, originalPrice: 23.00, productName: "علكة خل التفاح", productColor: { main: "#AE3131", light: "#D15858", dark: "#8C1E1E", contrastText: "#FFFFFF" } },
    // Produit 2
    { id: 4, name: "عبوة واحدة", image: "/pack21.png", price: 19.32, originalPrice: 26.00, productName: "بروتين مصل اللبن المميز", productColor: { main: "#0088CC", light: "#4AAFDF", dark: "#006699", contrastText: "#FFFFFF" } },
    { id: 5, name: "3 عبوات", image: "/pack23.png", price: 17.39, originalPrice: 25.00, productName: "بروتين مصل اللبن المميز", productColor: { main: "#0088CC", light: "#4AAFDF", dark: "#006699", contrastText: "#FFFFFF" } },
    { id: 6, name: "5 عبوات", image: "/pack25.png", price: 15.99, originalPrice: 23.00, productName: "بروتين مصل اللبن المميز", productColor: { main: "#0088CC", light: "#4AAFDF", dark: "#006699", contrastText: "#FFFFFF" } },
    // Produit 3
    { id: 7, name: "عبوة واحدة", image: "/pack31.png", price: 19.32, originalPrice: 26.00, productName: "بروتيبن EXTRA-STRENGTH SLEEP", productColor: { main: "#7a30cf", light: "#52255b", dark: "#2a0d3e", contrastText: "#FFFFFF" } },
    { id: 8, name: "3 عبوات", image: "/pack33.png", price: 17.39, originalPrice: 25.00, productName: "بروتيبن EXTRA-STRENGTH SLEEP", productColor: { main: "#7a30cf", light: "#52255b", dark: "#2a0d3e", contrastText: "#FFFFFF" } },
    { id: 9, name: "5 عبوات", image: "/pack35.png", price: 15.99, originalPrice: 23.00, productName: "بروتيبن EXTRA-STRENGTH SLEEP", productColor: { main: "#7a30cf", light: "#52255b", dark: "#2a0d3e", contrastText: "#FFFFFF" } },
  ];

export default function ProductsGrid() {
  const { addItem } = useCart();
  const { toast } = useToast();

  // Group packs by product
  const products = Array.from(
    globalPacks.reduce((map, pack) => {
      if (!map.has(pack.productName)) map.set(pack.productName, []);
      map.get(pack.productName).push(pack);
      return map;
    }, new Map())
  );

  // State: selected pack per product
  const [selectedPackByProduct, setSelectedPackByProduct] = useState<Record<string, number>>(() => {
    const obj: Record<string, number> = {};
    products.forEach(([productName, packs]) => {
      obj[productName] = packs.find((p: Pack) => p.popular)?.id || packs[0].id;
    });
    return obj;
  });

  const handleSwitchPack = (productName: any, packId: number) => {
    setSelectedPackByProduct(prev => ({ ...prev, [productName]: packId }));
  };

  return (
    <div className="py-10 px-2">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
        {products.map(([productName, packs]) => {
          const selectedPack = packs.find((p: Pack) => p.id === selectedPackByProduct[productName]);
          return (
            <div key={productName} className="rounded-2xl shadow-xl border-2 overflow-hidden flex flex-col bg-white items-center justify-between" style={{ borderColor: selectedPack.productColor?.main + '33', minHeight: '400px', width: '420px', maxWidth: '100%' }}>
              <div className="flex flex-col items-center justify-center w-full flex-1 p-6" style={{ backgroundColor: selectedPack.productColor?.light + '20' }}>
                <Image src={selectedPack.image} alt={selectedPack.productName} width={140} height={140} className="object-contain h-32 w-32 mb-4" />
                <div className="text-xl font-bold mb-2 text-center w-full" style={{ color: selectedPack.productColor?.main }}>{selectedPack.productName}</div>
                <div className="text-2xl font-black mb-2 text-black text-center w-full">{selectedPack.price.toFixed(2)} درهم</div>
                <div className="flex flex-col w-full px-2 pb-2">
                  <div
                    className="flex flex-wrap md:flex-nowrap items-center justify-center gap-2 md:gap-4 w-full mb-4"
                  >
                    {packs.map((pack: Pack) => {
                      const isSelected = selectedPack.id === pack.id;
                      const mainColor = selectedPack.productColor?.main || '#00AEEA';
                      const lightColor = selectedPack.productColor?.light || '#BFD6E2';
                      return (
                        <button
                          key={pack.id}
                          type="button"
                          onClick={() => handleSwitchPack(productName, pack.id)}
                          className={
                            `px-4 py-2 text-base font-bold min-w-[90px] rounded-full border-4 transition-all duration-200 outline-none focus:ring-2 focus:ring-offset-2 cursor-pointer ` +
                            (isSelected
                              ? 'shadow-md text-white'
                              : 'text-[#222]')
                          }
                          style={{
                            background: isSelected ? mainColor : '#fff',
                            borderColor: mainColor,
                            color: isSelected ? '#fff' : mainColor,
                            boxShadow: isSelected ? `0 2px 8px 0 ${mainColor}33` : undefined,
                          }}
                          onMouseOver={e => {
                            if (!isSelected) {
                              e.currentTarget.style.background = lightColor + '33';
                              e.currentTarget.style.borderColor = mainColor;
                              e.currentTarget.style.color = mainColor;
                            }
                          }}
                          onMouseOut={e => {
                            if (!isSelected) {
                              e.currentTarget.style.background = '#fff';
                              e.currentTarget.style.borderColor = mainColor;
                              e.currentTarget.style.color = mainColor;
                            }
                          }}
                        >
                          {pack.name}
                        </button>
                      );
                    })}
                  </div>
                </div>
                  <Button
                  className="py-3 px-8 text-lg font-bold rounded-xl text-white transition-all duration-300 shadow-lg min-w-0 cursor-pointer"
                  style={{ backgroundColor: selectedPack.productColor?.main }}
                  onClick={() => {
                    addItem({
                      id: selectedPack.id,
                      name_ar: selectedPack.productName,
                      price: selectedPack.price,
                      type: "pack",
                      image: selectedPack.image,
                    });
                    toast({
                      title: "تم إضافة الباقة للسلة",
                      description: `تم إضافة ${selectedPack.productName} إلى سلة التسوق`,
                    });
                  }}
                >
                  أضف للسلة
                </Button>
              </div>
              {/* Pack switch buttons at the bottom, above add-to-cart */}
             
            </div>
          );
        })}
      </div>
    </div>
  );
}