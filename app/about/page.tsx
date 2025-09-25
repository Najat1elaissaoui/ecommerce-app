import React from "react";
import Image from "next/image";
import { Metadata } from "next";
import { ArrowLeft, Users, Clock, Award, CheckCircle, ChevronLeft } from "lucide-react";
import Link from "next/link";
import Header from "@/components/client/header";
import Footer from "@/components/client/footer";

export const metadata: Metadata = {
  title: "من نحن | Tafoukt",
  description: "تعرف على فريق تافوكت وقصة نجاحنا في مجال المكملات الغذائية والمنتجات الرياضية",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background" dir="rtl" lang="ar">
      <Header />
      <main className="pt-32 pb-16 overflow-x-hidden">
        {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <Link 
            href="/" 
            className="inline-flex items-center mb-6 text-primary hover:text-primary/80 transition-colors"
          >
            <ChevronLeft className="w-4 h-4 ml-1" />
            <span>الرئيسية</span>
          </Link>
          
          <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
            <div className="w-full lg:w-1/2 order-2 lg:order-1 animate-[fadeInRight_0.8s_0.2s_both]">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-right leading-tight">
                <span className="text-primary">من نحن</span> - شغفنا لصحتك ولياقتك
              </h1>
              
              <p className="text-gray-700 text-lg mb-8 text-right leading-relaxed">
                نحن في تافوكت نؤمن بأن الصحة والعافية حق للجميع. منذ عام 2015، ونحن ملتزمون بتقديم منتجات عالية الجودة تساعد الرياضيين وكل من يسعى إلى تحسين صحته في تحقيق أهدافهم.
              </p>
              
              <div className="flex flex-wrap justify-end gap-6 mb-8">
                <div className="flex items-center gap-3">
                  <div>
                    <p className="font-medium text-right">سنوات الخبرة</p>
                    <p className="text-primary text-right"><span className="text-2xl font-bold">+8</span> سنوات</p>
                  </div>
                  <div className="bg-blue-100 p-2 rounded-full">
                    <Clock className="w-6 h-6 text-blue-600" />
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <div>
                    <p className="font-medium text-right">العملاء السعداء</p>
                    <p className="text-primary text-right"><span className="text-2xl font-bold">+10K</span> عميل</p>
                  </div>
                  <div className="bg-green-100 p-2 rounded-full">
                    <Users className="w-6 h-6 text-green-600" />
                  </div>
                </div>
              </div>
            </div>
            
            <div className="w-full lg:w-1/2 order-1 lg:order-2 animate-[fadeInLeft_0.8s_0.2s_both]">
              <div className="relative h-64 md:h-96 lg:h-[500px] rounded-2xl overflow-hidden shadow-xl">
                <Image 
                  src="/modern-supplement-store-interior-with-products.jpg"
                  alt="متجر تافوكت" 
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-700"
                />
              </div>
            </div>
          </div>
        </div>
        
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white to-transparent"></div>
      </section>
      
      {/* Our Story Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto mb-12 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">قصتنا</h2>
            <p className="text-gray-700">
              رحلتنا بدأت من شغف بسيط لمساعدة الناس على تحقيق أهدافهم في اللياقة البدنية والصحة
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-16 items-center">
            <div className="relative">
              <div className="relative h-80 md:h-96 rounded-xl overflow-hidden shadow-lg">
                <Image
                  src="/arab-male-bodybuilder.jpg"
                  alt="قصة تافوكت"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-black/10"></div>
              </div>
              <div className="absolute -bottom-6 -left-6 w-36 h-36 md:w-48 md:h-48 bg-blue-50 border border-blue-200 shadow-lg rounded-lg p-4 flex flex-col justify-center items-center">
                <p className="text-lg font-bold text-primary">منذ عام</p>
                <p className="text-4xl font-bold text-primary">2015</p>
              </div>
            </div>
            
            <div>
              <h3 className="text-2xl font-bold mb-4 text-right">كيف بدأنا</h3>
              <p className="text-gray-700 mb-6 text-right leading-relaxed">
                بدأت قصة تافوكت عندما لاحظ مؤسسنا، أحمد، وجود نقص في المنتجات الغذائية عالية الجودة للرياضيين في السوق المحلية. كرياضي متحمس، واجه صعوبة في العثور على مكملات غذائية موثوقة وفعالة.
              </p>
              <p className="text-gray-700 mb-6 text-right leading-relaxed">
                بدأنا كشركة صغيرة مع رؤية كبيرة - توفير منتجات صحية عالية الجودة للرياضيين والأشخاص النشطين. بدأنا بمتجر صغير في الرباط وسرعان ما اكتسبنا سمعة طيبة بفضل التزامنا بالجودة والخدمة الممتازة.
              </p>
              <p className="text-gray-700 text-right leading-relaxed">
                اليوم، أصبحت تافوكت اسماً موثوقاً به في مجال المكملات الغذائية في المغرب والعالم العربي، ونفخر بمساعدة آلاف العملاء في رحلتهم نحو حياة أكثر صحة ونشاطاً.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Our Values Section */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto mb-12 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">قيمنا الأساسية</h2>
            <p className="text-gray-700">
              مبادئنا الأساسية التي توجه كل ما نقوم به في تافوكت
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "الجودة العالية",
                description: "نلتزم فقط بالمنتجات ذات الجودة العالية والمكونات الآمنة المثبتة علميًا",
                icon: <Award className="w-10 h-10 text-blue-600" />,
                color: "blue"
              },
              {
                title: "الشفافية",
                description: "نؤمن بالصراحة التامة حول منتجاتنا، مكوناتها، وفوائدها الحقيقية",
                icon: <CheckCircle className="w-10 h-10 text-green-600" />,
                color: "green"
              },
              {
                title: "التطوير المستمر",
                description: "نسعى دائماً للابتكار وتحسين منتجاتنا وخدماتنا لتلبية احتياجات عملائنا",
                icon: <Users className="w-10 h-10 text-purple-600" />,
                color: "purple"
              },
            ].map((value, index) => (
              <div 
                key={index} 
                className="bg-white rounded-xl p-8 shadow-lg border border-gray-100 hover:scale-105 transition-transform duration-300"
                style={{
                  animationName: "fadeInUp",
                  animationDuration: "0.8s",
                  animationDelay: `${0.2 + index * 0.1}s`,
                  animationFillMode: "both"
                }}
              >
                <div className={`bg-${value.color}-100 p-3 rounded-full w-16 h-16 flex items-center justify-center mb-6`}>
                  {value.icon}
                </div>
                <h3 className="text-xl font-bold mb-3 text-right">{value.title}</h3>
                <p className="text-gray-700 text-right">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Our Team Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto mb-12 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">فريقنا</h2>
            <p className="text-gray-700">
              تعرف على الأشخاص المتحمسين الذين يعملون بجد لتقديم أفضل المنتجات لك
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                name: "أحمد الشرقاوي",
                title: "المؤسس والرئيس التنفيذي",
                bio: "خبير في مجال التغذية والمكملات الغذائية مع خبرة تزيد عن 10 سنوات",
                image: "/arab-male-fitness-trainer.jpg"
              },
              {
                name: "سارة المنصوري",
                title: "مديرة المنتجات",
                bio: "متخصصة في تطوير المنتجات الصحية وحاصلة على شهادة في علوم التغذية",
                image: "/arab-female-athlete.jpg"
              },
              {
                name: "كريم العلوي",
                title: "مدير التسويق",
                bio: "خبير في التسويق الرقمي مع شغف كبير للرياضة والحياة الصحية",
                image: "/placeholder-user.jpg"
              },
            ].map((member, index) => (
              <div 
                key={index} 
                className="bg-white rounded-xl overflow-hidden shadow-lg border border-gray-100 hover:translate-y-[-5px] transition-transform duration-300"
                style={{
                  animationName: "fadeInUp",
                  animationDuration: "0.8s",
                  animationDelay: `${0.2 + index * 0.1}s`,
                  animationFillMode: "both"
                }}
              >
                <div className="relative h-64">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-1 text-right">{member.name}</h3>
                  <p className="text-primary mb-3 text-right">{member.title}</p>
                  <p className="text-gray-700 text-right">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 md:py-20 bg-gradient-to-br from-primary/90 to-purple-700/90 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">انضم إلى عائلة تافوكت</h2>
            <p className="text-lg mb-8 text-white/90">
              ابدأ رحلتك نحو حياة أكثر صحة ونشاطًا مع منتجاتنا عالية الجودة
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link 
                href="/products" 
                className="bg-white text-primary hover:bg-white/90 py-3 px-8 rounded-full font-medium transition-colors"
              >
                تصفح منتجاتنا
              </Link>
              <Link 
                href="/#contact" 
                className="bg-transparent border-2 border-white hover:bg-white/10 py-3 px-8 rounded-full font-medium transition-colors"
              >
                تواصل معنا
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
    <Footer />
    </div>
  );
}