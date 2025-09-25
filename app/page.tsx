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
// Removed SlidingAnnouncement import as it's now in layout.tsx

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background" dir="rtl" lang="ar">
      <Header />
      <main className="overflow-x-hidden pt-20 md:pt-28">
        {/* قسم البطل مع تصميم عصري */}
        <HeroSection />
        
        {/* قسم المنتجات المميزة */}
        <div className="mt-4 mb-8 md:my-10">
          <ModernProducts />
        </div>
        
        {/* قسم كاروسيل المنتجات المميز */}
        <div className="py-4 md:py-10">
          <ProductCarouselSection />
        </div>
        
        {/* قسم الفيديو من يوتيوب */}
        <div className="py-4 md:py-10 overflow-hidden">
          <ModernVideoSection />
        </div>
        
        {/* قسم المزايا والجودة */}
        <div className="py-6 md:py-14">
          <ModernBenefits />
        </div>
        
        {/* قسم شهادات العملاء العصري */}
        <div className="py-6 md:py-14">
          <ModernTestimonials />
        </div>
        
        {/* قسم الدعوة النهائية للعمل */}
        <div className="my-6 md:my-16">
          <FinalCTA />
        </div>
        
        {/* قسم التواصل */}
        <div className="mt-6 md:mt-12">
          <ContactSection />
        </div>
      </main>
      <Footer />
    </div>
  )
}
