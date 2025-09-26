"use client"

import { notFound } from 'next/navigation'
import Link from 'next/link'
import ProductHeroSection from '@/components/client/product-hero-section'
import ProductPacksSection from '@/components/client/product-packs-section'
import ProductBenefitsSection from '@/components/client/product-benefits-section'
import ProductIngredientsSection from '@/components/client/product-ingredients-section'
import ProductVideoSection from '@/components/client/product-video-section'
import ProductServingSection from '@/components/client/product-serving-section'
import GoldenHabitsSection from '@/components/client/golden-habits-section'
import ProductOpinionsSection from '@/components/client/product-opinions-section'
import Header from '@/components/client/header'
import Footer from '@/components/client/footer'
import { Button } from '@/components/ui/button'

// Type pour les données produit (basé sur le système admin à 10 étapes)
interface ProductData {
  id: number
  name: string
  
  // Couleurs du produit pour le thème visuel
  productColor?: {
    main: string   // Couleur principale du produit
    light: string  // Version plus claire
    dark: string   // Version plus foncée
    contrastText: string // Texte contrasté qui se lit bien sur la couleur principale
  }
  
  // Étape 1 - Informations de base
  homeImage1: string
  homeImage2: string
  basicInfo: {
    description: string
    category: string
    price: number
  }
  
  // Étape 2 - Description détaillée  
  detailedDescription: string
  productImage: string
  
  // Étape 3 - Bénéfices
  benefits: {
    title?: string
    items: Array<{
      name: string
      description?: string
      image?: string
    }>
  }
  
  // Étape 4 - Ingrédients
  ingredients: Array<{
    name: string
    image: string
    description: string
  }>
  
  // Étape 5 - Vidéo (optionnel)
  video?: {
    url: string
    thumbnail: string
    title: string
  }
  
  // Étape 6 - Informations nutritionnelles
  serving: {
    servingInfo: Array<{
      component: string
      quantity: string
    }>
    suggestedUse: string
    doesNotContain: string[]
  }
  
  // Étape 7 - Packs
  packs: Array<{
    id: number
    name: string
    image: string
    price: number
    originalPrice?: number
    quantity: number
    discount?: string
    popular?: boolean
  }>
  
  // Étape 8 - Opinions
  opinions?: Array<{
    customerName: string
    rating: number
    comment: string
    date: string
  }>
  
  // Étapes 9-10 - Sections personnalisées (optionnelles)
  customSections?: Array<{
    title: string
    content: string
    image?: string
    type: 'text' | 'image-text' | 'list'
  }>
}

// Données d'exemple (normalement récupérées depuis une API/base de données)
const sampleProductData: ProductData = {
  id: 1,
  name: "علكة خل التفاح",
  productColor: {
    main: "#AE3131",
    light: "#D15858",
    dark: "#8C1E1E",
    contrastText: "#FFFFFF"
  },
  homeImage1: "/protein-powder-assortment.png",
  homeImage2: "/creatine-supplement.jpg",
  basicInfo: {
    description: "أول علكة خل تفاح في العالم بطعم لذيذ وفوائد صحية متعددة.",
    category: "مكمل غذائي",
    price: 17.39
  },
  detailedDescription: "علكة خل التفاح الأولى عالميًا. غنية بالفيتامينات والعناصر الغذائية لدعم الصحة العامة. استمتع بطعم التفاح بدون طعم الخل القوي!",
  productImage: "/creatine-supplement.jpg",
  benefits: {
    title: "فوائد صحية",
    items: [
      { name: "تعزيز الطاقة الخلوية", description: "علكة Goli ACV تحتوي على فيتامين B12 الذي يساعد في تحويل الطعام إلى طاقة." },
      { name: "دعم المناعة الصحية", description: "تدعم جهاز المناعة بفضل مضادات الأكسدة الطبيعية." },
      { name: "صحة القلب", description: "تساهم في تحسين صحة القلب والأوعية الدموية." },
      { name: "تحسين التمثيل الغذائي", description: "تساعد في تنظيم عمليات الأيض وحرق الدهون." },
      { name: "مضادات أكسدة إضافية", description: "تحتوي على مكونات غنية بمضادات الأكسدة لمحاربة الجذور الحرة." },
      { name: "صحة عامة أفضل", description: "تدعم الصحة العامة والشعور بالنشاط والحيوية." },
      { name: "دعم صحة الجهاز الهضمي", description: "تسهل عملية الهضم وتحسن صحة الأمعاء." },
      { name: "تقوية العظام", description: "تحتوي على عناصر تدعم قوة العظام والأسنان." },
      { name: "تحسين صحة البشرة", description: "تمنح البشرة إشراقة طبيعية وتقلل من ظهور العيوب." },
      { name: "تعزيز صحة الشعر", description: "تساعد في تقوية الشعر ومنع تساقطه." },
      { name: "توازن مستويات السكر في الدم", description: "تساهم في الحفاظ على مستويات سكر طبيعية." },
      { name: "تقليل الشعور بالتعب", description: "تمد الجسم بالطاقة وتقلل من الإرهاق." },
      { name: "دعم صحة الكبد", description: "تساعد في إزالة السموم من الكبد وتعزيز وظائفه." },
      { name: "تحسين المزاج", description: "تحتوي على مكونات تساهم في تحسين المزاج والشعور بالسعادة." },
      { name: "تعزيز صحة الجهاز العصبي", description: "تدعم صحة الأعصاب والتركيز الذهني." },
      { name: "مناسبة للنباتيين", description: "خالية من الجيلاتين والمنتجات الحيوانية." },
      { name: "خالية من الجلوتين", description: "مناسبة لمن يعانون من حساسية الجلوتين." },
      { name: "خالية من الألوان الصناعية", description: "مصنوعة من مكونات طبيعية فقط." },
      { name: "خالية من المواد الحافظة", description: "لا تحتوي على أي مواد حافظة صناعية." },
      { name: "طعم لذيذ", description: "نكهة التفاح الطبيعية تجعلها سهلة الاستهلاك يومياً." }
    ]
  },
  ingredients: [
    {
      name: "فيتامين B12",
      image: "/ing2.png",
      description: "فيتامين B12 هو فيتامين قابل للذوبان في الماء يلعب دورًا في دعم صحة القلب، الطاقة الخلوية، الجهاز المناعي وتكوين خلايا الدم الحمراء."
    },
    {
      name: "CoQ10 (مساعد الإنزيم Q10)",
      image: "/ing1.png",
      description: "مساعد الإنزيم Q10 هو مضاد أكسدة يوجد في العديد من خلايا الجسم ويساعد في محاربة الجذور الحرة. يلعب دورًا حيويًا داخل جزء الخلية المسؤول عن إنتاج الطاقة الخلوية - الميتوكوندريا."
    }
  ],
  video: {
    url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    thumbnail: "/placeholder.jpg",
    title: "كيف تعمل علكة خل التفاح؟"
  },
  serving: {
    servingInfo: [
      { component: "الكربوهيدرات الكلية", quantity: "3.5 جم" },
      { component: "السكريات الكلية", quantity: "2 جم" },
      { component: "خل التفاح", quantity: "500 ملجم" },
      { component: "الشمندر", quantity: "40 ميكروجم" },
      { component: "الرمان", quantity: "40 ميكروجم" },
      { component: "فيتامين B12 (50% من الاحتياج اليومي)", quantity: "1.2 ميكروجم" }
    ],
    suggestedUse: "1-2 علكة، 3 مرات يوميًا",
    doesNotContain: ["خميرة", "قمح", "حليب", "بيض", "جلوتين", "صويا", "جيلاتين", "فول سوداني", "محار", "ألبان", "ألوان صناعية", "أغاف", "ساليسيلات"]
  },
  packs: [
    {
      id: 1,
      name: "عبوة واحدة",
      image: "/creatine-supplement.jpg",
      price: 19.32,
      originalPrice: 26.00,
      quantity: 1,
      discount: "خصم 42%"
    },
    {
      id: 2,
      name: "3 عبوات",
      image: "/creatine-supplement.jpg",
      price: 17.39,
      originalPrice: 25.00,
      quantity: 3,
      discount: "خصم 42%",
      popular: true
    },
    {
      id: 3,
      name: "5 عبوات",
      image: "/creatine-supplement.jpg",
      price: 15.99,
      originalPrice: 23.00,
      quantity: 5,
      discount: "خصم 42%"
    }
  ],
  opinions: [
    {
      customerName: "سارة م.",
      rating: 5,
      comment: "الطعم رائع والنتيجة مذهلة! أستخدمها منذ شهرين وأشعر بتحسن كبير.",
      date: "2024-01-15"
    },
    {
      customerName: "أحمد ك.",
      rating: 4,
      comment: "منتج ممتاز، ساعدني في الهضم. أنصح به!",
      date: "2024-01-10"
    },
    {
      customerName: "أحمد ك.",
      rating: 4,
      comment: "منتج ممتاز، ساعدني في الهضم. أنصح به!",
      date: "2024-01-10"
    }
  ]
}

// Données pour plusieurs produits
const productsData: Record<string, ProductData> = {
  "1": sampleProductData,
  "2": {
    ...sampleProductData,
    id: 2,
    name: "بروتين مصل اللبن المميز",
    productColor: {
      main: "#0088CC",
      light: "#4AAFDF",
      dark: "#006699",
      contrastText: "#FFFFFF"
    },
    basicInfo: {
      description: "بروتين مصل اللبن عالي الجودة لبناء العضلات والتعافي بعد التمارين.",
      category: "مكمل غذائي",
      price: 24.99
    },
    detailedDescription: "بروتين مصل اللبن المعزول الممتاز مع امتصاص فائق. مثالي للتعافي بعد التمارين وبناء العضلات. يحتوي على جميع الأحماض الأمينية الأساسية."
  },
  "3": {
    ...sampleProductData,
    id: 3,
    name: "كرياتين مونوهيدرات نقي",
    productColor: {
      main: "#7851A9",
      light: "#9B7AC5",
      dark: "#5A3D81",
      contrastText: "#FFFFFF"
    },
    basicInfo: {
      description: "كرياتين مونوهيدرات نقي لزيادة القوة والطاقة.",
      category: "مكمل غذائي",
      price: 19.99
    },
    detailedDescription: "كرياتين مونوهيدرات نقي 100%. مثبت سريريًا لزيادة القوة والطاقة وكتلة العضلات. بدون نكهة وسهل الخلط.",
    productImage: "/creatine-supplement.jpg"
  },
  "4": {
    ...sampleProductData,
    id: 4,
    name: "مجمع الفيتامينات المتكامل",
    productColor: {
      main: "#FF8C00",
      light: "#FFAA42",
      dark: "#D97700",
      contrastText: "#FFFFFF"
    },
    basicInfo: {
      description: "تركيبة شاملة من الفيتامينات والمعادن لدعم الصحة العامة.",
      category: "مكمل غذائي",
      price: 14.99
    },
    detailedDescription: "تركيبة متعددة الفيتامينات شاملة مع الفيتامينات والمعادن الأساسية. تدعم الصحة العامة وتسد الفجوات الغذائية في نظامك الغذائي."
  },
  "5": {
    ...sampleProductData,
    id: 5,
    name: "زيت السمك أوميغا-3 عالي الجودة",
    productColor: {
      main: "#00A86B",
      light: "#35C992",
      dark: "#008554",
      contrastText: "#FFFFFF"
    },
    basicInfo: {
      description: "أحماض أوميغا-3 الدهنية عالية الجودة لصحة القلب والدماغ.",
      category: "مكمل غذائي",
      price: 22.99
    },
    detailedDescription: "زيت السمك أوميغا-3 الممتاز مع EPA وDHA. يدعم صحة القلب والدماغ ويقلل الالتهابات."
  }
}

async function getProductData(id: string): Promise<ProductData | null> {
  // Simulation d'une requête API
  // En production, ceci ferait appel à votre API/base de données
  return productsData[id] || null
}

interface Props {
  params: { id: string }
}

export default async function ProductDetailPage({ params }: Props) {
  const product = await getProductData(params.id)
  
  if (!product) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-background pt-16">
      <Header />
      <main>
        {/* Section 1: Hero avec image produit + description (Étape 2 admin) */}
        <ProductHeroSection 
          name={product.name}
          image={product.productImage}
          description={product.detailedDescription}
          category={product.basicInfo.category}
          price={product.basicInfo.price}
          productColor={product.productColor}
        />

        {/* Section 2: Packs et prix (Étape 7 admin) */}
        <ProductPacksSection 
          packs={product.packs}
          productName={product.name}
          productColor={product.productColor}
        />

        {/* Section 3: Bénéfices (Étape 3 admin) */}
        <ProductBenefitsSection 
          benefits={product.benefits}
          image={product.homeImage2}
          productColor={product.productColor}
        />

        {/* Section 4: Ingrédients (Étape 4 admin) */}
        <div className="relative">
          <ProductIngredientsSection 
            ingredients={product.ingredients}
            productColor={product.productColor}
          />
          
         
        </div>

        {/* Section 5: Vidéo (Étape 5 admin - optionnel) */}
        {product.video && (
          <>
            <ProductVideoSection 
              video={product.video}
            />
            {/* Data Golden Habits centralisée pour backend */}
            {(() => {
              const goldenHabitsData = [
                {
                  icon: "/creatine-supplement.jpg",
                  title: "محطة الترطيب",
                  description: "الماء وبشرتك يسيران جنبًا إلى جنب! عدم شرب كمية كافية من الماء يمكن أن يؤدي إلى بشرة أقل إشراقًا. إذا كنت تجد صعوبة في شرب الماء، جرب إضافة شرائح الليمون للحصول على دفعة من فيتامين C ولإعطاء براعم التذوق شيئًا جديدًا!"
                },
                {
                  icon: "/creatine-supplement.jpg",
                  title: "واقي الشمس هو صديقك المفضل",
                  description: "الفتيات يرغبن في الشمس... لكن ماذا عن بشرتك؟ تأكدي من وضع واقي الشمس طوال العام، في المطر أو الشمس، لحماية بشرتك من الأشعة فوق البنفسجية. كوني آمنة تحت أشعة الشمس!"
                },
                {
                  icon: "/creatine-supplement.jpg",
                  title: "الترطيب من الصباح حتى المساء",
                  description: "لكن أولاً، رطبي! مرطب جيد وخالٍ من العطور هو مفتاح روتين العناية بالبشرة المتوازن. أفضل أوقات الترطيب هي بعد الاستحمام مباشرة وقبل النوم. نظفي، رطبي، نامي، وكرري!"
                },
                {
                  icon: "/creatine-supplement.jpg",
                  title: "تناولي مكونات تعزز الكولاجين",
                  description: "البشرة الجميلة تتطلب دمج مكونات تعزز الكولاجين في نظامك الغذائي. جربي علكة Goli® Superfruits الغنية بفيتامين C وسيليكا الخيزران، مكونان يساعدان في تعزيز تكوين الكولاجين في البشرة! تألقي دائمًا!"
                }
              ];
              return (
                <GoldenHabitsSection
                  sectionTitle="٤ عادات ذهبية لأشخاص ذوي بشرة رائعة"
                  habits={goldenHabitsData}
                  colors={product.productColor}
                />
              );
            })()}
          </>
        )}

        {/* Section 6: Composition et usage (Étape 6 admin) */}
        <ProductServingSection 
          serving={product.serving}
          productColor={product.productColor}
         />

        {/* Section 7: Opinions clients (Étape 8 admin - optionnel) */}
        {product.opinions && product.opinions.length > 0 && (
          <ProductOpinionsSection 
            opinions={product.opinions}
          />
        )}

        {/* Sections personnalisées (Étapes 9-10 admin - optionnelles) */}
        {product.customSections && product.customSections.map((section, index) => (
          <section key={index} className="py-16 bg-white">
            <div className="container mx-auto px-4">
              <h2 className="text-3xl font-bold text-center mb-8">{section.title}</h2>
              {/* Contenu personnalisé selon le type */}
              <div className="max-w-4xl mx-auto">
                {section.type === 'text' && (
                  <p className="text-lg text-gray-600 leading-relaxed">{section.content}</p>
                )}
                {section.type === 'image-text' && section.image && (
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                    <div>
                      <img src={section.image} alt={section.title} className="rounded-lg w-full" />
                    </div>
                    <div>
                      <p className="text-lg text-gray-600 leading-relaxed">{section.content}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </section>
        ))}
      </main>
      <Footer />
    </div>
  )
}
