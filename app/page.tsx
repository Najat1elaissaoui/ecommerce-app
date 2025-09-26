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
    <div dir="rtl" lang="ar">
      <Header />
      <main className="overflow-x-hidden">
        {/* قسم البطل مع تصميم عصري */}
        <HeroSection />

        {/* قسم المنتجات المميزة */}
        <div className="my-4 md:my-8">
          <ModernProducts />
        </div>

        {/* قسم كاروسيل المنتجات المميز */}
        <div className="my-4 md:my-8">
          <ProductCarouselSection />
        </div>

        {/* قسم الفيديو من يوتيوب */}
        <div className="overflow-hidden my-4 md:my-8">
          <ModernVideoSection />
        </div>

        {/* قسم المزايا والجودة */}
        <div className="my-4 md:my-8">
          <ModernBenefits />
        </div>

        {/* قسم شهادات العملاء العصري */}
        <div className="my-4 md:my-8">
          <ModernTestimonials />
        </div>

        {/* قسم الدعوة النهائية للعمل */}
        <div className="my-4 md:my-8">
          <FinalCTA />
        </div>

        {/* قسم التواصل */}
        <div className="my-4 md:my-8">
          <ContactSection />
        </div>
      </main>
      <Footer />
    </div>
  )
}
