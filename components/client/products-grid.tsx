"use client";

import { useToast } from "@/hooks/use-toast";
import { useCart } from "@/lib/cart-context";
import { Package, ShoppingCart, Sparkles } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

interface Pack {
  id: number;
  name: string;
  image: string;
  price: number;
  originalPrice?: number;
  productId: number;
  popular?: boolean;
  productName: string;
  productColor?: string;
}

// Packs globaux (extrait de product/[id]/page.tsx)
const globalPacks: Pack[] = [
  // Produit 1
  {
    id: 1,
    name: "عبوة واحدة",
    image: "/pack1.png",
    price: 19.32,
    originalPrice: 26.0,
    productId: 1,
    productName: "علكة خل التفاح",
    productColor: "#AE3131",
  },
  {
    id: 2,
    name: "3 عبوات",
    image: "/pack3.png",
    price: 17.39,
    originalPrice: 25.0,
    productId: 1,
    productName: "علكة خل التفاح",
    productColor: "#AE3131",
  },
  {
    id: 3,
    name: "5 عبوات",
    image: "/pack5.png",
    price: 15.99,
    originalPrice: 23.0,
    productId: 1,
    productName: "علكة خل التفاح",
    productColor: "#AE3131",
  },
  // Produit 2
  {
    id: 4,
    name: "عبوة واحدة",
    image: "/pack21.png",
    price: 19.32,
    originalPrice: 26.0,
    productId: 2,
    productName: "بروتين مصل اللبن المميز",
    productColor: "#0088CC",
  },
  {
    id: 5,
    name: "3 عبوات",
    image: "/pack23.png",
    price: 17.39,
    originalPrice: 25.0,
    productId: 2,
    productName: "بروتين مصل اللبن المميز",
    productColor: "#0088CC",
  },
  {
    id: 6,
    name: "5 عبوات",
    image: "/pack25.png",
    price: 15.99,
    originalPrice: 23.0,
    productId: 2,
    productName: "بروتين مصل اللبن المميز",
    productColor: "#0088CC",
  },
  // Produit 3
  {
    id: 7,
    name: "عبوة واحدة",
    image: "/pack31.png",
    price: 19.32,
    originalPrice: 26.0,
    productId: 3,
    productName: "بروتيبن EXTRA-STRENGTH SLEEP",
    productColor: "#7a30cf",
  },
  {
    id: 8,
    name: "3 عبوات",
    image: "/pack33.png",
    price: 17.39,
    originalPrice: 25.0,
    productId: 3,
    productName: "بروتيبن EXTRA-STRENGTH SLEEP",
    productColor: "#7a30cf",
  },
  {
    id: 9,
    name: "5 عبوات",
    image: "/pack35.png",
    price: 15.99,
    originalPrice: 23.0,
    productId: 3,
    productName: "بروتيبن EXTRA-STRENGTH SLEEP",
    productColor: "#7a30cf",
  },
  // Produit 4
  {
    id: 10,
    name: "عبوة واحدة",
    image: "/pack1.png",
    price: 19.32,
    originalPrice: 26.0,
    productId: 4,
    productName: "علكة خل التفاح",
    productColor: "#AE3131",
  },
  {
    id: 11,
    name: "3 عبوات",
    image: "/pack3.png",
    price: 17.39,
    originalPrice: 25.0,
    productId: 4,
    productName: "علكة خل التفاح",
    productColor: "#AE3131",
  },
  {
    id: 12,
    name: "5 عبوات",
    image: "/pack5.png",
    price: 15.99,
    originalPrice: 23.0,
    productId: 4,
    productName: "علكة خل التفاح",
    productColor: "#AE3131",
  },
];

export default function ProductsGrid() {
  const { addItem } = useCart();
  const { toast } = useToast();

  // Group packs by product
  const products = Array.from(
    globalPacks.reduce((map, pack) => {
      if (!map.has(pack.productId)) map.set(pack.productId, []);
      map.get(pack.productId).push(pack);
      return map;
    }, new Map())
  );

  // State: selected pack per product
  const [selectedPackByProduct, setSelectedPackByProduct] = useState<
    Record<string, number>
  >(() => {
    const obj: Record<string, number> = {};
    products.forEach(([productName, packs]) => {
      obj[productName] = packs.find((p: Pack) => p.popular)?.id || packs[0].id;
    });
    return obj;
  });

  const handleSwitchPack = (productName: any, packId: number) => {
    setSelectedPackByProduct((prev) => ({ ...prev, [productName]: packId }));
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {products.map(([productName, packs]) => (
        <ModernProductCard
          key={productName}
          packs={packs}
          onAddToCart={(pack) => {
            // addItem(pack);
            toast({
              title: "تم إضافة الباقة للسلة",
              description: `تمإضافة ${productName} - ${pack.name} إلى سلة التسوق`,
            });
          }}
        />
      ))}
    </div>
  );
}

interface ModernProductCardProps {
  packs: Pack[];
  onAddToCart?: (pack: Pack) => void;
}

export function ModernProductCard({
  packs,
  onAddToCart,
}: ModernProductCardProps) {
  const [selectedPack, setSelectedPack] = useState(
    packs.find((p) => p.popular)?.id || packs[0]?.id
  );

  const selected = packs.find((p) => p.id === selectedPack) || packs[0];

  if (!selected) return null;

  const calculateDiscount = (price: number, originalPrice?: number) => {
    if (!originalPrice || originalPrice <= price) return null;
    const discount = Math.round(
      ((originalPrice - price) / originalPrice) * 100
    );
    return `وفّر ${discount}%`;
  };

  // Generate color variants from the base color
  const hexToRgb = (hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
      ? {
          r: parseInt(result[1], 16),
          g: parseInt(result[2], 16),
          b: parseInt(result[3], 16),
        }
      : { r: 239, g: 68, b: 68 };
  };

  const lightenColor = (hex: string, percent: number) => {
    const rgb = hexToRgb(hex);
    const r = Math.min(255, Math.floor(rgb.r + (255 - rgb.r) * percent));
    const g = Math.min(255, Math.floor(rgb.g + (255 - rgb.g) * percent));
    const b = Math.min(255, Math.floor(rgb.b + (255 - rgb.b) * percent));
    return `rgb(${r}, ${g}, ${b})`;
  };

  const darkenColor = (hex: string, percent: number) => {
    const rgb = hexToRgb(hex);
    const r = Math.floor(rgb.r * (1 - percent));
    const g = Math.floor(rgb.g * (1 - percent));
    const b = Math.floor(rgb.b * (1 - percent));
    return `rgb(${r}, ${g}, ${b})`;
  };

  const baseColor = selected.productColor || "#EF4444";
  const mainColor = baseColor;
  const lightColor = lightenColor(baseColor, 0.3);
  const veryLightColor = lightenColor(baseColor, 0.7);
  const darkColor = darkenColor(baseColor, 0.2);

  const discount = calculateDiscount(selected.price, selected.originalPrice);

  return (
    <div className="w-full max-w-md mx-auto h-full flex">
      {/* Main Card */}
      <div
        className="bg-white rounded-3xl shadow-2xl overflow-hidden backdrop-blur-lg border flex flex-col w-full"
        style={{ borderColor: lightColor + "40" }}
      >
        {/* Header Section with Gradient */}
        <div
          className="relative p-8 pb-24 flex-shrink-0"
          style={{
            background: `linear-gradient(135deg, ${mainColor} 0%, ${darkColor} 100%)`,
          }}
        >
          <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-md px-3 py-1 rounded-full">
            <span className="text-white text-sm font-semibold flex items-center gap-1">
              <Sparkles size={14} />
              الأكثر مبيعاً
            </span>
          </div>

          {/* Product Image */}
          <div className="flex justify-center mt-4">
            <div className="relative">
              <div className="absolute inset-0 bg-white/20 rounded-full blur-3xl"></div>
              <img
                src={selected.image}
                alt={selected.productName}
                className="relative w-48 h-48 object-contain drop-shadow-2xl transform hover:scale-105 transition-transform duration-300"
              />
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="px-6 -mt-16 relative z-10 flex-1 flex flex-col pb-6">
          {/* Product Title Card */}
          <div className="bg-white rounded-2xl shadow-xl p-6 mb-6 flex-shrink-0">
            <Link href={`/products/${selected.productId}`} className="w-full">
              <h2 className="text-2xl font-black text-gray-800 text-center mb-2">
                {selected.productName}
              </h2>
            </Link>
            <p className="text-sm text-gray-500 text-center">
              مكمل غذائي طبيعي للصحة والعافية
            </p>

            {/* Price Display */}
            <div className="mt-4 flex items-center justify-center gap-3">
              <div className="text-4xl font-black" style={{ color: mainColor }}>
                {selected.price.toFixed(2)}
                <span className="text-lg mr-1">درهم</span>
              </div>
              {selected.originalPrice && (
                <div className="text-right">
                  <div className="text-sm text-gray-400 line-through">
                    {selected.originalPrice.toFixed(2)} درهم
                  </div>
                  {discount && (
                    <div className="text-xs font-semibold text-green-600 bg-green-50 px-2 py-0.5 rounded-full inline-block">
                      {discount}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Spacer to push content to bottom */}
          <div className="flex-1"></div>

          {/* Pack Selection */}
          <div className="mb-6 flex-shrink-0">
            <div className="flex items-center gap-2 mb-3">
              <Package size={18} className="text-gray-600" />
              <label className="text-sm font-bold text-gray-700">
                اختر الباقة
              </label>
            </div>

            <div
              className={`grid gap-3 ${
                packs.length === 3
                  ? "grid-cols-3"
                  : packs.length === 2
                  ? "grid-cols-2"
                  : "grid-cols-1"
              }`}
            >
              {packs.map((pack) => {
                const isSelected = selectedPack === pack.id;
                const packDiscount = calculateDiscount(
                  pack.price,
                  pack.originalPrice
                );
                return (
                  <button
                    key={pack.id}
                    onClick={() => setSelectedPack(pack.id)}
                    className={`
                        relative p-4 rounded-xl border-2 transition-all duration-200
                        ${
                          isSelected
                            ? "shadow-lg scale-105"
                            : "border-gray-200 bg-white hover:border-gray-300"
                        }
                      `}
                    style={{
                      borderColor: isSelected ? mainColor : undefined,
                      background: isSelected
                        ? `linear-gradient(135deg, ${lightColor}20 0%, ${lightColor}40 100%)`
                        : undefined,
                    }}
                  >
                    {pack.popular && (
                      <div
                        className="absolute -top-2 left-1/2 -translate-x-1/2 text-white text-xs font-bold px-2 py-0.5 rounded-full shadow-md"
                        style={{
                          background: `linear-gradient(90deg, #F59E0B 0%, #F97316 100%)`,
                        }}
                      >
                        شائع
                      </div>
                    )}

                    <div
                      className={`text-lg font-black mb-1 text-center`}
                      style={{ color: isSelected ? mainColor : "#374151" }}
                    >
                      {pack.name}
                    </div>
                    <div className="text-xs font-bold text-gray-700 text-center">
                      {pack.price.toFixed(2)} د
                    </div>
                    {packDiscount && (
                      <div className="text-xs font-semibold text-green-600 text-center mt-1">
                        {packDiscount}
                      </div>
                    )}

                    {isSelected && (
                      <div
                        className="absolute top-2 right-2 w-5 h-5 rounded-full flex items-center justify-center"
                        style={{ backgroundColor: mainColor }}
                      >
                        <svg
                          className="w-3 h-3 text-white"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Add to Cart Button */}
          <button
            onClick={() => onAddToCart?.(selected)}
            className="cursor-pointer w-full text-white font-bold py-4 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center gap-2 group flex-shrink-0"
            style={{
              background: `linear-gradient(90deg, ${mainColor} 0%, ${darkColor} 100%)`,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-2px)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
            }}
          >
            <ShoppingCart
              className="group-hover:scale-110 transition-transform"
              size={20}
            />
            <span className="text-lg">أضف إلى السلة</span>
          </button>
        </div>
      </div>
    </div>
  );
}
