import React from "react";
import Image from "next/image";
import { Metadata } from "next";
import { ChevronLeft, Shield, Heart, Award, Microscope, Star, Clock, Check } from "lucide-react";
import Link from "next/link";
import Header from "@/components/client/header";
import Footer from "@/components/client/footer";

export const metadata: Metadata = {
  title: "لماذا نحن | Tafoukt",
  description: "اكتشف ما يميز تافوكت عن غيرها - جودة عالية، منتجات طبيعية، وخبرة متميزة في المكملات الغذائية",
};

export default function WhyUsPage() {
  return (
    <div className="min-h-screen bg-background" dir="rtl" lang="ar">
      <Header />
      <main className="pt-32 pb-16 overflow-x-hidden">
        {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-purple-50 to-blue-50">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <Link 
            href="/" 
            className="inline-flex items-center mb-6 text-primary hover:text-primary/80 transition-colors"
          >
            <ChevronLeft className="w-4 h-4 ml-1" />
            <span>الرئيسية</span>
          </Link>
          
          <div className="flex flex-col items-center max-w-4xl mx-auto text-center">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight animate-[fadeIn_0.8s_0.2s_both]">
              <span className="text-primary">لماذا</span> تختار <span className="text-primary">تافوكت</span>؟
            </h1>
            
            <p className="text-gray-700 text-lg mb-8 leading-relaxed max-w-3xl animate-[fadeIn_0.8s_0.3s_both]">
              نحن لا نبيع مجرد منتجات، بل نقدم حلولًا متكاملة تساعدك في تحقيق أهدافك الصحية والرياضية. نتميز بجودة استثنائية، ودعم علمي، والتزام دائم بصحتك ورضاك.
            </p>
          </div>
        </div>
        
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white to-transparent"></div>
      </section>

      {/* Main Benefits Cards */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "جودة لا مثيل لها",
                description: "نختار فقط أفضل المكونات ونتبع أعلى معايير الجودة في تصنيع منتجاتنا",
                icon: <Award className="w-12 h-12 text-blue-600" />,
                image: "/protein-powder-assortment.png"
              },
              {
                title: "مدعومة علميًا",
                description: "كل منتج من منتجاتنا مدعوم بالأبحاث العلمية وتم اختباره للتأكد من فعاليته",
                icon: <Microscope className="w-12 h-12 text-purple-600" />,
                image: "/creatine-supplement.jpg"
              },
              {
                title: "صحتك أولويتنا",
                description: "نضع صحتك وأهدافك في المقام الأول، ونقدم منتجات آمنة وفعالة",
                icon: <Heart className="w-12 h-12 text-red-600" />,
                image: "/muscular-athlete-holding-protein-supplement-bottle.jpg"
              },
            ].map((benefit, index) => (
              <div 
                key={index} 
                className="rounded-xl overflow-hidden shadow-lg border border-gray-100 bg-white group hover:shadow-2xl transition-all duration-300"
                style={{
                  animationName: "fadeInUp",
                  animationDuration: "0.8s",
                  animationDelay: `${0.3 + index * 0.1}s`,
                  animationFillMode: "both"
                }}
              >
                <div className="relative h-48">
                  <Image
                    src={benefit.image}
                    alt={benefit.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex items-end">
                    <div className="p-4 text-white">
                      <h3 className="text-xl font-bold text-right">{benefit.title}</h3>
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <div className="mb-4 w-16 h-16 rounded-full bg-blue-50 flex items-center justify-center mx-auto group-hover:scale-110 transition-transform">
                    {benefit.icon}
                  </div>
                  <p className="text-gray-700 text-right leading-relaxed">{benefit.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What Sets Us Apart */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto mb-12 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">ما يميزنا عن الآخرين</h2>
            <p className="text-gray-700">
              عندما تختار تافوكت، فأنت تختار التميز والجودة والالتزام
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <div className="space-y-6">
                {[
                  {
                    title: "منتجات خالية من المواد الضارة",
                    description: "جميع منتجاتنا خالية من المواد الحافظة الضارة والمكونات الاصطناعية"
                  },
                  {
                    title: "اختبار صارم للجودة",
                    description: "تخضع جميع منتجاتنا لاختبارات جودة صارمة قبل وصولها إليك"
                  },
                  {
                    title: "مكونات طبيعية عالية الجودة",
                    description: "نستخدم فقط أفضل المكونات الطبيعية ذات الجودة العالية"
                  },
                  {
                    title: "فعالية مثبتة علمياً",
                    description: "تعتمد تركيباتنا على الأبحاث العلمية وتم اختبارها للتأكد من فعاليتها"
                  },
                ].map((item, index) => (
                  <div 
                    key={index} 
                    className="flex gap-4 items-start p-4 rounded-xl hover:bg-white hover:shadow-md transition-all duration-300"
                    style={{
                      animationName: "fadeInRight",
                      animationDuration: "0.8s",
                      animationDelay: `${0.3 + index * 0.1}s`,
                      animationFillMode: "both"
                    }}
                  >
                    <div className="bg-primary/10 rounded-full p-2 mt-1">
                      <Check className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-2 text-right">{item.title}</h3>
                      <p className="text-gray-700 text-right">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="order-1 lg:order-2">
              <div className="relative h-96 lg:h-[600px] rounded-2xl overflow-hidden shadow-xl"
                style={{
                  animationName: "fadeInLeft",
                  animationDuration: "0.8s",
                  animationDelay: "0.3s",
                  animationFillMode: "both"
                }}
              >
                <Image 
                  src="/muscular-athlete-holding-protein-supplement-bottle.jpg"
                  alt="ما يميزنا" 
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end p-8">
                  <div className="bg-white/90 backdrop-blur-sm p-6 rounded-xl max-w-md ml-auto">
                    <h3 className="text-xl font-bold mb-2 text-right">الالتزام بالجودة</h3>
                    <p className="text-gray-700 text-right">
                      نلتزم بتقديم منتجات ذات جودة استثنائية تساعدك في تحقيق أهدافك الصحية والرياضية
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Testimonials */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto mb-12 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">ماذا يقول عملاؤنا</h2>
            <p className="text-gray-700">
              آلاف العملاء السعداء يثقون بمنتجات تافوكت ويحققون نتائج رائعة
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                name: "محمد العربي",
                role: "رياضي محترف",
                comment: "بعد تجربة العديد من الماركات، تافوكت هي الأفضل من حيث الجودة والفعالية. نتائج ملحوظة خلال فترة قصيرة.",
                rating: 5
              },
              {
                name: "لينا المغربي",
                role: "مدربة لياقة",
                comment: "أوصي دائمًا طلابي بمنتجات تافوكت. جودة استثنائية، مكونات نظيفة، ونتائج رائعة.",
                rating: 5
              },
              {
                name: "كريم الحسني",
                role: "لاعب كمال أجسام",
                comment: "منتجات تافوكت ساعدتني في تحقيق أهدافي بشكل أسرع. أفضل مكملات غذائية جربتها على الإطلاق.",
                rating: 5
              },
            ].map((testimonial, index) => (
              <div 
                key={index}
                className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300"
                style={{
                  animationName: "fadeInUp",
                  animationDuration: "0.8s",
                  animationDelay: `${0.3 + index * 0.1}s`,
                  animationFillMode: "both"
                }}
              >
                <div className="flex justify-end mb-3">
                  {Array(testimonial.rating).fill(0).map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-700 mb-4 text-right leading-relaxed">"{testimonial.comment}"</p>
                <div className="flex items-center justify-end gap-3">
                  <div>
                    <p className="font-bold text-right">{testimonial.name}</p>
                    <p className="text-sm text-gray-600 text-right">{testimonial.role}</p>
                  </div>
                  <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center text-xl font-bold text-primary">
                    {testimonial.name[0]}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Our Guarantees */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto mb-12 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">ضماناتنا</h2>
            <p className="text-gray-700">
              نضمن لك الرضا التام عن منتجاتنا وخدماتنا
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: "ضمان الجودة",
                description: "نضمن لك أعلى مستوى من الجودة في جميع منتجاتنا",
                icon: <Shield className="w-8 h-8 text-blue-600" />
              },
              {
                title: "ضمان استرداد الأموال",
                description: "إذا لم تكن راضيًا عن منتجاتنا، نضمن لك استرداد أموالك خلال 30 يومًا",
                icon: <Award className="w-8 h-8 text-green-600" />
              },
              {
                title: "توصيل سريع",
                description: "نضمن وصول منتجاتك في أسرع وقت ممكن وبحالة ممتازة",
                icon: <Clock className="w-8 h-8 text-purple-600" />
              },
              {
                title: "دعم متميز",
                description: "فريق دعم متخصص للإجابة على جميع استفساراتك وتقديم النصائح",
                icon: <Heart className="w-8 h-8 text-red-600" />
              },
            ].map((guarantee, index) => (
              <div 
                key={index} 
                className="bg-white p-6 rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition-all duration-300"
                style={{
                  animationName: "fadeIn",
                  animationDuration: "0.8s",
                  animationDelay: `${0.3 + index * 0.1}s`,
                  animationFillMode: "both"
                }}
              >
                <div className="bg-primary/10 p-4 rounded-full w-16 h-16 flex items-center justify-center mb-4 mx-auto">
                  {guarantee.icon}
                </div>
                <h3 className="text-lg font-bold mb-2 text-center">{guarantee.title}</h3>
                <p className="text-gray-700 text-center">{guarantee.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* FAQ */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto mb-12 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">الأسئلة الشائعة</h2>
            <p className="text-gray-700">
              إليك إجابات على بعض الأسئلة الأكثر شيوعًا عن منتجات تافوكت
            </p>
          </div>
          
          <div className="max-w-3xl mx-auto space-y-6">
            {[
              {
                question: "هل منتجات تافوكت حلال؟",
                answer: "نعم، جميع منتجاتنا حلال ومعتمدة من الجهات المختصة."
              },
              {
                question: "هل يمكنني استخدام منتجاتكم إذا كنت مبتدئًا؟",
                answer: "بالتأكيد! لدينا منتجات مناسبة لجميع المستويات، من المبتدئين إلى المحترفين. نوصي بقراءة التعليمات أو استشارة فريق الدعم لدينا للحصول على أفضل النتائج."
              },
              {
                question: "كم من الوقت يستغرق التوصيل؟",
                answer: "عادة ما يستغرق التوصيل من 2-5 أيام عمل داخل المملكة المغربية، وقد يختلف ذلك حسب موقعك. نسعى دائمًا لضمان وصول منتجاتك في أسرع وقت ممكن."
              },
              {
                question: "هل منتجاتكم آمنة للاستخدام اليومي؟",
                answer: "نعم، منتجاتنا مصممة للاستخدام اليومي وآمنة تمامًا عند استخدامها وفقًا للتعليمات. نستخدم فقط مكونات عالية الجودة ونتبع أعلى معايير السلامة."
              },
            ].map((faq, index) => (
              <div 
                key={index} 
                className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300"
                style={{
                  animationName: "fadeInUp",
                  animationDuration: "0.8s",
                  animationDelay: `${0.2 + index * 0.1}s`,
                  animationFillMode: "both"
                }}
              >
                <h3 className="text-xl font-bold mb-3 text-right">{faq.question}</h3>
                <p className="text-gray-700 text-right">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 md:py-20 bg-gradient-to-r from-primary to-purple-700 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">جاهز لتجربة الفرق مع تافوكت؟</h2>
            <p className="text-lg mb-8 text-white/90">
              انضم إلى آلاف العملاء الراضين واختبر جودة منتجاتنا الاستثنائية
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