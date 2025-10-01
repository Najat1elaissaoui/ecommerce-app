"use client";

import Footer from "@/components/client/footer";
import Header from "@/components/client/header";
import {
  Award,
  CheckCircle,
  ChevronLeft,
  Clock,
  Heart,
  Sparkles,
  Target,
  TrendingUp,
  Users,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function AboutPage() {
  const stats = [
    { value: "+8", label: "سنوات الخبرة", icon: Clock, color: "#3b82f6" },
    { value: "+10K", label: "عميل سعيد", icon: Users, color: "#10b981" },
    { value: "+500", label: "منتج عالي الجودة", icon: Award, color: "#f59e0b" },
    {
      value: "100%",
      label: "ضمان الجودة",
      icon: CheckCircle,
      color: "#8b5cf6",
    },
  ];

  const values = [
    {
      title: "الجودة العالية",
      description:
        "نلتزم فقط بالمنتجات ذات الجودة العالية والمكونات الآمنة المثبتة علميًا",
      icon: Award,
      color: "#3b82f6",
    },
    {
      title: "الشفافية",
      description:
        "نؤمن بالصراحة التامة حول منتجاتنا، مكوناتها، وفوائدها الحقيقية",
      icon: CheckCircle,
      color: "#10b981",
    },
    {
      title: "التطوير المستمر",
      description:
        "نسعى دائماً للابتكار وتحسين منتجاتنا وخدماتنا لتلبية احتياجات عملائنا",
      icon: TrendingUp,
      color: "#8b5cf6",
    },
    {
      title: "شغف الرياضة",
      description:
        "نعيش ونتنفس الرياضة واللياقة، ونفهم احتياجات الرياضيين بعمق",
      icon: Heart,
      color: "#ef4444",
    },
  ];

  const team = [
    {
      name: "أحمد الشرقاوي",
      title: "المؤسس والرئيس التنفيذي",
      bio: "خبير في مجال التغذية والمكملات الغذائية مع خبرة تزيد عن 10 سنوات",
      image: "/arab-male-fitness-trainer.jpg",
    },
    {
      name: "سارة المنصوري",
      title: "مديرة المنتجات",
      bio: "متخصصة في تطوير المنتجات الصحية وحاصلة على شهادة في علوم التغذية",
      image: "/arab-female-athlete.jpg",
    },
    {
      name: "كريم العلوي",
      title: "مدير التسويق",
      bio: "خبير في التسويق الرقمي مع شغف كبير للرياضة والحياة الصحية",
      image: "/placeholder-user.jpg",
    },
  ];

  return (
    <div className="min-h-screen bg-white" dir="rtl" lang="ar">
      <Header />
      <main className="pt-20">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
          <div className="absolute inset-0 opacity-30">
            <div className="absolute top-20 left-20 w-96 h-96 bg-blue-400 rounded-full blur-3xl opacity-0 animate-float" />
            <div className="absolute bottom-20 right-20 w-[500px] h-[500px] bg-purple-400 rounded-full blur-3xl opacity-0 animate-float-delayed" />
          </div>

          <div className="container mx-auto px-4 py-16 lg:py-24 relative z-10">
            <Link
              href="/"
              className="inline-flex items-center mb-8 text-blue-600 hover:text-blue-700 transition-colors font-medium opacity-0 animate-fade-in"
            >
              <ChevronLeft className="w-4 h-4 ml-1" />
              <span>العودة للرئيسية</span>
            </Link>

            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              <div
                className="opacity-0 animate-fade-in-up"
                style={{ animationDelay: "200ms" }}
              >
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6 bg-blue-100 border border-blue-200">
                  <Sparkles className="w-4 h-4 text-blue-600" />
                  <span className="text-sm font-bold text-blue-600">
                    من نحن
                  </span>
                </div>

                <h1 className="text-4xl lg:text-6xl font-black mb-6 leading-tight bg-gradient-to-br from-gray-900 to-gray-600 bg-clip-text text-transparent">
                  شغفنا لصحتك ولياقتك
                </h1>

                <p className="text-lg text-gray-700 mb-8 leading-relaxed">
                  نحن في تافوكت نؤمن بأن الصحة والعافية حق للجميع. منذ عام 2015،
                  ونحن ملتزمون بتقديم منتجات عالية الجودة تساعد الرياضيين وكل من
                  يسعى إلى تحسين صحته في تحقيق أهدافهم.
                </p>

                <div className="grid grid-cols-2 gap-4 mb-8">
                  {stats.slice(0, 2).map((stat, idx) => (
                    <div
                      key={idx}
                      className="bg-white rounded-2xl p-5 shadow-lg border-2 border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                    >
                      <div className="flex items-center gap-3 mb-2">
                        <div
                          className="w-10 h-10 rounded-full flex items-center justify-center"
                          style={{ background: `${stat.color}15` }}
                        >
                          <stat.icon
                            className="w-5 h-5"
                            style={{ color: stat.color }}
                          />
                        </div>
                        <span
                          className="text-3xl font-black"
                          style={{ color: stat.color }}
                        >
                          {stat.value}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 font-medium">
                        {stat.label}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div
                className="opacity-0 animate-fade-in-up"
                style={{ animationDelay: "400ms" }}
              >
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-purple-400 rounded-3xl blur-2xl opacity-20" />
                  <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
                    <Image
                      src="/modern-supplement-store-interior-with-products.jpg"
                      alt="متجر تافوكت"
                      width={600}
                      height={700}
                      className="w-full h-auto object-cover hover:scale-105 transition-transform duration-700"
                    />
                  </div>
                  <div className="absolute -bottom-6 -right-6 bg-white rounded-2xl p-6 shadow-2xl border-2 border-gray-100">
                    <p className="text-sm font-bold text-gray-600 mb-1">
                      منذ عام
                    </p>
                    <p className="text-4xl font-black bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                      2015
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Bar */}
        <section className="py-12 bg-white border-y border-gray-100">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              {stats.map((stat, idx) => (
                <div
                  key={idx}
                  className="text-center opacity-0 animate-fade-in-up"
                  style={{ animationDelay: `${idx * 100}ms` }}
                >
                  <div
                    className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-3"
                    style={{ background: `${stat.color}15` }}
                  >
                    <stat.icon
                      className="w-8 h-8"
                      style={{ color: stat.color }}
                    />
                  </div>
                  <div
                    className="text-3xl lg:text-4xl font-black mb-1"
                    style={{ color: stat.color }}
                  >
                    {stat.value}
                  </div>
                  <div className="text-sm text-gray-600 font-medium">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Our Story Section */}
        <section className="py-16 lg:py-24">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto mb-12 text-center opacity-0 animate-fade-in">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-4 bg-purple-100 border border-purple-200">
                <Target className="w-4 h-4 text-purple-600" />
                <span className="text-sm font-bold text-purple-600">قصتنا</span>
              </div>
              <h2 className="text-3xl lg:text-5xl font-black mb-4 bg-gradient-to-br from-gray-900 to-gray-600 bg-clip-text text-transparent">
                رحلتنا نحو النجاح
              </h2>
              <p className="text-lg text-gray-600">
                من شغف بسيط إلى علامة تجارية رائدة في المكملات الغذائية
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div
                className="opacity-0 animate-fade-in-up"
                style={{ animationDelay: "200ms" }}
              >
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-green-400 rounded-3xl blur-xl opacity-20" />
                  <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                    <Image
                      src="/arab-male-bodybuilder.jpg"
                      alt="قصة تافوكت"
                      width={600}
                      height={700}
                      className="w-full h-auto object-cover"
                    />
                  </div>
                </div>
              </div>

              <div
                className="space-y-6 opacity-0 animate-fade-in-up"
                style={{ animationDelay: "400ms" }}
              >
                <h3 className="text-2xl lg:text-3xl font-bold">كيف بدأنا</h3>

                <div className="space-y-4">
                  <p className="text-gray-700 leading-relaxed">
                    بدأت قصة تافوكت عندما لاحظ مؤسسنا، أحمد، وجود نقص في
                    المنتجات الغذائية عالية الجودة للرياضيين في السوق المحلية.
                    كرياضي متحمس، واجه صعوبة في العثور على مكملات غذائية موثوقة
                    وفعالة.
                  </p>
                  <p className="text-gray-700 leading-relaxed">
                    بدأنا كشركة صغيرة مع رؤية كبيرة - توفير منتجات صحية عالية
                    الجودة للرياضيين والأشخاص النشطين. بدأنا بمتجر صغير في
                    الرباط وسرعان ما اكتسبنا سمعة طيبة بفضل التزامنا بالجودة
                    والخدمة الممتازة.
                  </p>
                  <p className="text-gray-700 leading-relaxed">
                    اليوم، أصبحت تافوكت اسماً موثوقاً به في مجال المكملات
                    الغذائية في المغرب والعالم العربي، ونفخر بمساعدة آلاف
                    العملاء في رحلتهم نحو حياة أكثر صحة ونشاطاً.
                  </p>
                </div>

                <div className="flex gap-4 pt-4">
                  <div className="flex-1 bg-blue-50 rounded-xl p-4 border border-blue-100">
                    <div className="text-2xl font-black text-blue-600 mb-1">
                      2015
                    </div>
                    <div className="text-sm text-gray-600">سنة التأسيس</div>
                  </div>
                  <div className="flex-1 bg-green-50 rounded-xl p-4 border border-green-100">
                    <div className="text-2xl font-black text-green-600 mb-1">
                      +10K
                    </div>
                    <div className="text-sm text-gray-600">عميل راضٍ</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Our Values Section */}
        <section className="py-16 lg:py-24 bg-gradient-to-br from-gray-50 to-blue-50">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto mb-12 text-center opacity-0 animate-fade-in">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-4 bg-green-100 border border-green-200">
                <Heart className="w-4 h-4 text-green-600" />
                <span className="text-sm font-bold text-green-600">قيمنا</span>
              </div>
              <h2 className="text-3xl lg:text-5xl font-black mb-4 bg-gradient-to-br from-gray-900 to-gray-600 bg-clip-text text-transparent">
                ما نؤمن به
              </h2>
              <p className="text-lg text-gray-600">
                مبادئنا الأساسية التي توجه كل ما نقوم به
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((value, index) => (
                <div
                  key={index}
                  className="bg-white rounded-2xl p-6 shadow-lg border-2 border-gray-100 hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 opacity-0 animate-fade-in-up group"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div
                    className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5 transition-all duration-300 group-hover:scale-110 group-hover:rotate-6"
                    style={{ background: `${value.color}15` }}
                  >
                    <value.icon
                      className="w-7 h-7"
                      style={{ color: value.color }}
                    />
                  </div>
                  <h3 className="text-lg font-bold mb-3">{value.title}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {value.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Our Team Section */}
        <section className="py-16 lg:py-24">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto mb-12 text-center opacity-0 animate-fade-in">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-4 bg-purple-100 border border-purple-200">
                <Users className="w-4 h-4 text-purple-600" />
                <span className="text-sm font-bold text-purple-600">
                  فريق العمل
                </span>
              </div>
              <h2 className="text-3xl lg:text-5xl font-black mb-4 bg-gradient-to-br from-gray-900 to-gray-600 bg-clip-text text-transparent">
                تعرف على فريقنا
              </h2>
              <p className="text-lg text-gray-600">
                الأشخاص المتحمسون الذين يعملون بجد لخدمتك
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {team.map((member, index) => (
                <div
                  key={index}
                  className="bg-white rounded-2xl overflow-hidden shadow-lg border-2 border-gray-100 hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 opacity-0 animate-fade-in-up group"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="relative h-72 overflow-hidden">
                    <Image
                      src={member.image}
                      alt={member.name}
                      width={400}
                      height={500}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-1">{member.name}</h3>
                    <p className="text-blue-600 font-medium mb-3 text-sm">
                      {member.title}
                    </p>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      {member.bio}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 lg:py-24 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600" />
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-20 left-20 w-96 h-96 bg-white rounded-full blur-3xl animate-pulse" />
            <div
              className="absolute bottom-20 right-20 w-[500px] h-[500px] bg-white rounded-full blur-3xl animate-pulse"
              style={{ animationDelay: "1s" }}
            />
          </div>

          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-3xl mx-auto text-center text-white">
              <h2 className="text-3xl lg:text-5xl font-black mb-6">
                انضم إلى عائلة تافوكت
              </h2>
              <p className="text-lg lg:text-xl mb-10 text-white/90">
                ابدأ رحلتك نحو حياة أكثر صحة ونشاطًا مع منتجاتنا عالية الجودة
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link
                  href="/products"
                  className="bg-white text-blue-600 hover:bg-gray-50 py-4 px-10 rounded-full font-bold transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-105"
                >
                  تصفح منتجاتنا
                </Link>
                <Link
                  href="/#contact"
                  className="bg-white/10 backdrop-blur-sm border-2 border-white hover:bg-white/20 py-4 px-10 rounded-full font-bold transition-all duration-300"
                >
                  تواصل معنا
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes float {
          0%,
          100% {
            opacity: 1;
            transform: translateY(0px) translateX(0px);
          }
          50% {
            opacity: 1;
            transform: translateY(-20px) translateX(10px);
          }
        }
        @keyframes float-delayed {
          0%,
          100% {
            opacity: 1;
            transform: translateY(0px) translateX(0px);
          }
          50% {
            opacity: 1;
            transform: translateY(20px) translateX(-10px);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.8s ease-out forwards;
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.6s ease-out forwards;
        }
        .animate-float {
          animation: float 8s ease-in-out infinite;
        }
        .animate-float-delayed {
          animation: float-delayed 10s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
