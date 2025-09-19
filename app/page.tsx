import ModernHero from "@/components/client/modern-hero"
import ModernProducts from "@/components/client/modern-products"
import ModernVideoSection from "@/components/client/modern-video-section"
import ModernBenefits from "@/components/client/modern-benefits"
import ModernTestimonials from "@/components/client/modern-testimonials"
import PurposeSection from "@/components/client/purpose-section"
import FinalCTA from "@/components/client/final-cta"
import ContactSection from "@/components/client/contact-section"
import Footer from "@/components/client/footer"
import Header from "@/components/client/header"
import HeroSection from "@/components/client/hero-section"
import ProductCarouselSection from "@/components/client/product-carousel-section"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background" dir="rtl" lang="ar">
      <Header />
      <main className="overflow-x-hidden">
        {/* قسم البطل مع تصميم عصري */}
        <HeroSection />
        <ModernProducts />
        {/* قسم كاروسيل المنتجات المميز */}
        <ProductCarouselSection />
        
        {/* قسم المنتجات مع البطاقات المنسقة */}
        
        
        {/* قسم الفيديو من يوتيوب */}
        <ModernVideoSection />
        
        {/* قسم المزايا والجودة */}
        <ModernBenefits />
        
        {/* قسم شهادات العملاء العصري */}
        <ModernTestimonials />
        
        {/* قسم الهدف - تصميم مطابق للصورة */}
        {/* <PurposeSection /> */}
        
        {/* قسم الدعوة النهائية للعمل */}
        <FinalCTA />
        
        {/* قسم التواصل */}
        <ContactSection />
      </main>
      <Footer />
    </div>
  )
}
