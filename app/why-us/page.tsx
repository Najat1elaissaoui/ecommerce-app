"use client";

import Footer from "@/components/client/footer";
import Header from "@/components/client/header";
import {
  ArrowRight,
  Award,
  Check,
  ChevronLeft,
  Clock,
  Heart,
  Microscope,
  Shield,
  Sparkles,
  Star,
} from "lucide-react";
import { useEffect, useState } from "react";

export default function WhyUsPage() {
  const [isVisible, setIsVisible] = useState(false);
  const [activeCard, setActiveCard] = useState(0);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const benefits = [
    {
      title: "جودة لا مثيل لها",
      description:
        "نختار فقط أفضل المكونات ونتبع أعلى معايير الجودة في تصنيع منتجاتنا",
      icon: Award,
      color: "from-blue-500 to-cyan-500",
      bgColor: "bg-blue-50",
    },
    {
      title: "مدعومة علميًا",
      description:
        "كل منتج من منتجاتنا مدعوم بالأبحاث العلمية وتم اختباره للتأكد من فعاليته",
      icon: Microscope,
      color: "from-purple-500 to-pink-500",
      bgColor: "bg-purple-50",
    },
    {
      title: "صحتك أولويتنا",
      description: "نضع صحتك وأهدافك في المقام الأول، ونقدم منتجات آمنة وفعالة",
      icon: Heart,
      color: "from-red-500 to-orange-500",
      bgColor: "bg-red-50",
    },
  ];

  const features = [
    {
      title: "منتجات خالية من المواد الضارة",
      description:
        "جميع منتجاتنا خالية من المواد الحافظة الضارة والمكونات الاصطناعية",
    },
    {
      title: "اختبار صارم للجودة",
      description: "تخضع جميع منتجاتنا لاختبارات جودة صارمة قبل وصولها إليك",
    },
    {
      title: "مكونات طبيعية عالية الجودة",
      description: "نستخدم فقط أفضل المكونات الطبيعية ذات الجودة العالية",
    },
    {
      title: "فعالية مثبتة علمياً",
      description:
        "تعتمد تركيباتنا على الأبحاث العلمية وتم اختبارها للتأكد من فعاليتها",
    },
  ];

  const testimonials = [
    {
      name: "محمد العربي",
      role: "رياضي محترف",
      comment:
        "بعد تجربة العديد من الماركات، تافوكت هي الأفضل من حيث الجودة والفعالية. نتائج ملحوظة خلال فترة قصيرة.",
      rating: 5,
      color: "from-blue-500 to-cyan-500",
    },
    {
      name: "لينا المغربي",
      role: "مدربة لياقة",
      comment:
        "أوصي دائمًا طلابي بمنتجات تافوكت. جودة استثنائية، مكونات نظيفة، ونتائج رائعة.",
      rating: 5,
      color: "from-purple-500 to-pink-500",
    },
    {
      name: "كريم الحسني",
      role: "لاعب كمال أجسام",
      comment:
        "منتجات تافوكت ساعدتني في تحقيق أهدافي بشكل أسرع. أفضل مكملات غذائية جربتها على الإطلاق.",
      rating: 5,
      color: "from-orange-500 to-red-500",
    },
  ];

  const guarantees = [
    {
      title: "ضمان الجودة",
      description: "نضمن لك أعلى مستوى من الجودة في جميع منتجاتنا",
      icon: Shield,
      color: "text-blue-600",
      gradient: "from-blue-500 to-cyan-500",
    },
    {
      title: "ضمان استرداد الأموال",
      description:
        "إذا لم تكن راضيًا عن منتجاتنا، نضمن لك استرداد أموالك خلال 30 يومًا",
      icon: Award,
      color: "text-green-600",
      gradient: "from-green-500 to-emerald-500",
    },
    {
      title: "توصيل سريع",
      description: "نضمن وصول منتجاتك في أسرع وقت ممكن وبحالة ممتازة",
      icon: Clock,
      color: "text-purple-600",
      gradient: "from-purple-500 to-pink-500",
    },
    {
      title: "دعم متميز",
      description: "فريق دعم متخصص للإجابة على جميع استفساراتك وتقديم النصائح",
      icon: Heart,
      color: "text-red-600",
      gradient: "from-red-500 to-orange-500",
    },
  ];

  const faqs = [
    {
      question: "هل منتجات تافوكت حلال؟",
      answer: "نعم، جميع منتجاتنا حلال ومعتمدة من الجهات المختصة.",
    },
    {
      question: "هل يمكنني استخدام منتجاتكم إذا كنت مبتدئًا؟",
      answer:
        "بالتأكيد! لدينا منتجات مناسبة لجميع المستويات، من المبتدئين إلى المحترفين. نوصي بقراءة التعليمات أو استشارة فريق الدعم لدينا للحصول على أفضل النتائج.",
    },
    {
      question: "كم من الوقت يستغرق التوصيل؟",
      answer:
        "عادة ما يستغرق التوصيل من 2-5 أيام عمل داخل المملكة المغربية، وقد يختلف ذلك حسب موقعك. نسعى دائمًا لضمان وصول منتجاتك في أسرع وقت ممكن.",
    },
    {
      question: "هل منتجاتكم آمنة للاستخدام اليومي؟",
      answer:
        "نعم، منتجاتنا مصممة للاستخدام اليومي وآمنة تمامًا عند استخدامها وفقًا للتعليمات. نستخدم فقط مكونات عالية الجودة ونتبع أعلى معايير السلامة.",
    },
  ];

  return (
    <div
      className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50"
      dir="rtl"
    >
      <Header />

      {/* Floating Shapes Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-10 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute top-40 left-10 w-72 h-72 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-20 right-1/3 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      <main className="relative pt-24 pb-16">
        {/* Hero Section */}
        <section className="relative px-4 py-20">
          <div className="container mx-auto max-w-6xl">
            <button
              className={`inline-flex items-center mb-8 text-purple-600 hover:text-purple-700 transition-all hover:gap-3 gap-2 group ${
                isVisible
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 translate-x-10"
              } transition-all duration-700`}
            >
              <ChevronLeft className="w-5 h-5 transition-transform group-hover:-translate-x-1" />
              <span className="font-medium">الرئيسية</span>
            </button>

            <div className="text-center max-w-4xl mx-auto">
              <div
                className={`inline-flex items-center gap-2 px-4 py-2 bg-purple-100 text-purple-700 rounded-full mb-6 ${
                  isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"
                } transition-all duration-700 delay-100`}
              >
                <Sparkles className="w-4 h-4" />
                <span className="text-sm font-medium">التميز في كل منتج</span>
              </div>

              <h1
                className={`text-5xl md:text-7xl font-bold mb-6 ${
                  isVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-10"
                } transition-all duration-700 delay-200`}
              >
                <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  لماذا
                </span>{" "}
                تختار{" "}
                <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                  تافوكت
                </span>
                ؟
              </h1>

              <p
                className={`text-gray-600 text-xl leading-relaxed max-w-3xl mx-auto ${
                  isVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-10"
                } transition-all duration-700 delay-300`}
              >
                نحن لا نبيع مجرد منتجات، بل نقدم حلولًا متكاملة تساعدك في تحقيق
                أهدافك الصحية والرياضية.
              </p>
            </div>
          </div>
        </section>

        {/* Benefits Cards */}
        <section className="px-4 py-20">
          <div className="container mx-auto max-w-6xl">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {benefits.map((benefit, index) => {
                const Icon = benefit.icon;
                return (
                  <div
                    key={index}
                    className={`group relative bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer ${
                      isVisible
                        ? "opacity-100 translate-y-0"
                        : "opacity-0 translate-y-10"
                    }`}
                    style={{ transitionDelay: `${400 + index * 100}ms` }}
                    onMouseEnter={() => setActiveCard(index)}
                    onMouseLeave={() => setActiveCard(index)}
                  >
                    {/* Gradient Border Effect */}
                    <div
                      className={`absolute inset-0 rounded-3xl bg-gradient-to-r ${benefit.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl`}
                    ></div>

                    <div className="relative">
                      <div
                        className={`inline-flex p-4 rounded-2xl bg-gradient-to-r ${benefit.color} mb-6 transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-500`}
                      >
                        <Icon className="w-8 h-8 text-white" />
                      </div>

                      <h3 className="text-2xl font-bold mb-3 text-right group-hover:text-purple-600 transition-colors duration-300">
                        {benefit.title}
                      </h3>

                      <p className="text-gray-600 text-right leading-relaxed">
                        {benefit.description}
                      </p>

                      <div className="mt-6 flex justify-end opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-4 group-hover:translate-x-0">
                        <ArrowRight className="w-5 h-5 text-purple-600" />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="px-4 py-20 bg-gradient-to-br from-purple-50 via-white to-pink-50">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                ما يميزنا عن الآخرين
              </h2>
              <p className="text-gray-600 text-lg">
                عندما تختار تافوكت، فأنت تختار التميز والجودة والالتزام
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="group bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-purple-200"
                >
                  <div className="flex gap-4 items-start">
                    <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center transform group-hover:scale-110 group-hover:rotate-12 transition-all duration-300">
                      <Check className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold mb-2 text-right group-hover:text-purple-600 transition-colors">
                        {feature.title}
                      </h3>
                      <p className="text-gray-600 text-right leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="px-4 py-20">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                ماذا يقول عملاؤنا
              </h2>
              <p className="text-gray-600 text-lg">
                آلاف العملاء السعداء يثقون بمنتجات تافوكت
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <div
                  key={index}
                  className="group bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 hover:border-transparent relative overflow-hidden"
                >
                  <div
                    className={`absolute inset-0 bg-gradient-to-r ${testimonial.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}
                  ></div>

                  <div className="relative">
                    <div className="flex justify-end mb-4 gap-1">
                      {Array(testimonial.rating)
                        .fill(0)
                        .map((_, i) => (
                          <Star
                            key={i}
                            className="w-5 h-5 text-yellow-400 fill-yellow-400 transform group-hover:scale-110 transition-transform duration-300"
                            style={{ transitionDelay: `${i * 50}ms` }}
                          />
                        ))}
                    </div>

                    <p className="text-gray-700 mb-6 text-right leading-relaxed italic">
                      "{testimonial.comment}"
                    </p>

                    <div className="flex items-center justify-end gap-4">
                      <div className="text-right">
                        <p className="font-bold text-lg">{testimonial.name}</p>
                        <p className="text-sm text-gray-500">
                          {testimonial.role}
                        </p>
                      </div>
                      <div
                        className={`w-14 h-14 rounded-full bg-gradient-to-r ${testimonial.color} flex items-center justify-center text-white text-xl font-bold shadow-lg transform group-hover:scale-110 transition-transform duration-300`}
                      >
                        {testimonial.name[0]}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Guarantees */}
        <section className="px-4 py-20 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-4">ضماناتنا</h2>
              <p className="text-gray-600 text-lg">
                نضمن لك الرضا التام عن منتجاتنا وخدماتنا
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {guarantees.map((guarantee, index) => {
                const Icon = guarantee.icon;
                return (
                  <div
                    key={index}
                    className="group bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300 text-center"
                  >
                    <div
                      className={`inline-flex p-4 rounded-2xl bg-gradient-to-r ${guarantee.gradient} mb-4 transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-300`}
                    >
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-lg font-bold mb-2 group-hover:text-purple-600 transition-colors">
                      {guarantee.title}
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {guarantee.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="px-4 py-20">
          <div className="container mx-auto max-w-3xl">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                الأسئلة الشائعة
              </h2>
              <p className="text-gray-600 text-lg">
                إليك إجابات على بعض الأسئلة الأكثر شيوعًا
              </p>
            </div>

            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div
                  key={index}
                  className="group bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-purple-200"
                >
                  <h3 className="text-xl font-bold mb-3 text-right group-hover:text-purple-600 transition-colors flex items-center justify-end gap-2">
                    <span>{faq.question}</span>
                    <div className="w-2 h-2 rounded-full bg-purple-500 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  </h3>
                  <p className="text-gray-600 text-right leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="px-4 py-20">
          <div className="container mx-auto max-w-4xl">
            <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 p-12 text-center text-white shadow-2xl">
              {/* Animated Background Pattern */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.8),transparent_50%)] animate-pulse"></div>
              </div>

              <div className="relative">
                <h2 className="text-4xl md:text-5xl font-bold mb-6">
                  جاهز لتجربة الفرق مع تافوكت؟
                </h2>
                <p className="text-xl mb-10 text-white/90 max-w-2xl mx-auto">
                  انضم إلى آلاف العملاء الراضين واختبر جودة منتجاتنا الاستثنائية
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                  <button className="group bg-white text-purple-600 hover:bg-gray-50 py-4 px-8 rounded-full font-bold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 flex items-center gap-2">
                    <span>تصفح منتجاتنا</span>
                    <ArrowRight className="w-5 h-5 transform group-hover:-translate-x-1 transition-transform" />
                  </button>
                  <button className="bg-transparent border-2 border-white hover:bg-white/10 py-4 px-8 rounded-full font-bold transition-all duration-300 transform hover:-translate-y-1">
                    تواصل معنا
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />

      <style jsx>{`
        @keyframes blob {
          0%,
          100% {
            transform: translate(0, 0) scale(1);
          }
          25% {
            transform: translate(20px, -50px) scale(1.1);
          }
          50% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          75% {
            transform: translate(50px, 50px) scale(1.05);
          }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
}
