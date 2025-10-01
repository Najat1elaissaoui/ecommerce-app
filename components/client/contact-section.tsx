"use client";

import {
  CheckCircle,
  Clock,
  Mail,
  MessageCircle,
  Phone,
  Send,
  Sparkles,
  X,
} from "lucide-react";
import { useEffect, useState } from "react";

export default function ContactSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [focusedField, setFocusedField] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setShowSuccess(true);
      setFormData({ name: "", email: "", phone: "", message: "" });

      setTimeout(() => {
        setShowSuccess(false);
      }, 5000);
    }, 2000);
  };

  const handleInputChange = (e: any) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const contactInfo = [
    {
      icon: Phone,
      title: "اتصل بنا",
      info: "+212 123 456 789",
      description: "متاح 24/7 للاستفسارات",
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: Mail,
      title: "البريد الإلكتروني",
      info: "info@tafoukt.com",
      description: "نرد خلال 24 ساعة",
      color: "from-purple-500 to-pink-500",
    },
    {
      icon: Clock,
      title: "ساعات العمل",
      info: "السبت - الخميس",
      description: "9:00 صباحاً - 6:00 مساءً",
      color: "from-orange-500 to-red-500",
    },
  ];

  return (
    <section
      className="relative py-24 overflow-hidden bg-gradient-to-br from-slate-50 via-white to-blue-50"
      dir="rtl"
    >
      {/* Animated Background Pattern */}
      <div className="absolute inset-0 opacity-30">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(circle at 2px 2px, rgba(99, 102, 241, 0.15) 1px, transparent 0)",
            backgroundSize: "40px 40px",
          }}
        ></div>
      </div>

      {/* Floating Shapes */}
      <div className="absolute top-20 left-10 w-64 h-64 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
      <div className="absolute top-40 right-10 w-64 h-64 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
      <div className="absolute bottom-20 left-1/2 w-64 h-64 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div
          className={`text-center mb-16 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          } transition-all duration-700`}
        >
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-100 to-purple-100 text-blue-600 px-6 py-3 rounded-full text-sm font-bold mb-6 shadow-lg">
            <MessageCircle className="w-5 h-5" />
            <span>تواصل معنا</span>
            <Sparkles className="w-4 h-4 animate-pulse" />
          </div>

          <h2 className="text-5xl md:text-6xl lg:text-7xl font-black text-gray-900 mb-6">
            نحن هنا
            <span className="block bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mt-2">
              لمساعدتك
            </span>
          </h2>

          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            لديك سؤال حول منتجاتنا؟ تحتاج مشورة في اختيار المكمل المناسب؟ فريقنا
            من الخبراء جاهز لمساعدتك.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start max-w-7xl mx-auto">
          {/* Contact Information */}
          <div
            className={`space-y-8 ${
              isVisible
                ? "opacity-100 translate-x-0"
                : "opacity-0 translate-x-10"
            } transition-all duration-700 delay-200`}
          >
            <div>
              <h3 className="text-3xl font-bold text-gray-900 mb-3">
                معلومات الاتصال
              </h3>
              <p className="text-gray-600 leading-relaxed">
                تواصل معنا عبر أي من الطرق التالية، ونحن نضمن لك الرد السريع
                والخدمة المميزة.
              </p>
            </div>

            <div className="space-y-4">
              {contactInfo.map((item, index) => {
                const Icon = item.icon;
                return (
                  <div
                    key={index}
                    className="group relative bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-transparent overflow-hidden"
                    style={{
                      transitionDelay: `${300 + index * 100}ms`,
                    }}
                  >
                    <div
                      className={`absolute inset-0 bg-gradient-to-r ${item.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}
                    ></div>

                    <div className="relative flex items-start gap-4">
                      <div
                        className={`flex-shrink-0 w-14 h-14 bg-gradient-to-br ${item.color} rounded-xl flex items-center justify-center shadow-lg transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-300`}
                      >
                        <Icon className="w-7 h-7 text-white" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-bold text-lg text-gray-900 mb-1 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:bg-clip-text group-hover:from-blue-600 group-hover:to-purple-600 transition-all">
                          {item.title}
                        </h4>
                        <p className="text-blue-600 font-semibold mb-1">
                          {item.info}
                        </p>
                        <p className="text-sm text-gray-600">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Quick Contact Buttons */}
            <div className="grid grid-cols-2 gap-4">
              <button
                className="group relative bg-gradient-to-r from-green-500 to-emerald-500 text-white font-bold py-4 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden transform hover:scale-105"
                onClick={() =>
                  window.open("https://wa.me/212123456789", "_blank")
                }
              >
                <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-emerald-400 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="relative flex items-center justify-center gap-2">
                  <MessageCircle className="w-5 h-5" />
                  <span>واتساب</span>
                </div>
              </button>

              <button
                className="group relative border-2 border-blue-500 text-blue-600 font-bold py-4 px-6 rounded-xl hover:bg-blue-500 hover:text-white transition-all duration-300 transform hover:scale-105"
                onClick={() => window.open("tel:+212123456789", "_blank")}
              >
                <div className="flex items-center justify-center gap-2">
                  <Phone className="w-5 h-5" />
                  <span>اتصال</span>
                </div>
              </button>
            </div>
          </div>

          {/* Contact Form */}
          <div
            className={`relative ${
              isVisible
                ? "opacity-100 translate-x-0"
                : "opacity-0 -translate-x-10"
            } transition-all duration-700 delay-300`}
          >
            <div className="relative bg-white rounded-3xl p-8 shadow-2xl border border-gray-100">
              {/* Decorative Corner Elements */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-bl-full"></div>
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-pink-500/10 to-orange-500/10 rounded-tr-full"></div>

              <div className="relative">
                <h3 className="text-3xl font-bold text-gray-900 mb-2 text-center">
                  أرسل رسالة
                </h3>
                <p className="text-gray-600 text-center mb-8">
                  املأ النموذج وسنتواصل معك قريباً
                </p>

                <div className="space-y-6" onSubmit={handleSubmit}>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="relative">
                      <label className="block text-sm font-bold text-gray-700 mb-2">
                        الاسم الكامل *
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        onFocus={() => setFocusedField("name")}
                        onBlur={() => setFocusedField("")}
                        placeholder="أدخل اسمك"
                        required
                        className={`w-full px-4 py-3 border-2 rounded-xl outline-none transition-all duration-300 ${
                          focusedField === "name"
                            ? "border-blue-500 shadow-lg shadow-blue-500/20"
                            : "border-gray-200 hover:border-gray-300"
                        }`}
                      />
                    </div>

                    <div className="relative">
                      <label className="block text-sm font-bold text-gray-700 mb-2">
                        رقم الهاتف *
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        onFocus={() => setFocusedField("phone")}
                        onBlur={() => setFocusedField("")}
                        placeholder="06XXXXXXXX"
                        required
                        className={`w-full px-4 py-3 border-2 rounded-xl outline-none transition-all duration-300 ${
                          focusedField === "phone"
                            ? "border-purple-500 shadow-lg shadow-purple-500/20"
                            : "border-gray-200 hover:border-gray-300"
                        }`}
                      />
                    </div>
                  </div>

                  <div className="relative">
                    <label className="block text-sm font-bold text-gray-700 mb-2">
                      البريد الإلكتروني *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      onFocus={() => setFocusedField("email")}
                      onBlur={() => setFocusedField("")}
                      placeholder="example@email.com"
                      required
                      className={`w-full px-4 py-3 border-2 rounded-xl outline-none transition-all duration-300 ${
                        focusedField === "email"
                          ? "border-pink-500 shadow-lg shadow-pink-500/20"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                    />
                  </div>

                  <div className="relative">
                    <label className="block text-sm font-bold text-gray-700 mb-2">
                      الرسالة *
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      onFocus={() => setFocusedField("message")}
                      onBlur={() => setFocusedField("")}
                      placeholder="اكتب رسالتك هنا..."
                      required
                      rows={5}
                      className={`w-full px-4 py-3 border-2 rounded-xl outline-none transition-all duration-300 resize-none ${
                        focusedField === "message"
                          ? "border-orange-500 shadow-lg shadow-orange-500/20"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                    />
                  </div>

                  <button
                    type="button"
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                    className="group relative w-full bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white font-bold py-4 px-8 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden transform hover:scale-[1.02] disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity"></div>

                    {isSubmitting ? (
                      <div className="relative flex items-center justify-center gap-3">
                        <div className="w-5 h-5 border-3 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span className="text-lg">جاري الإرسال...</span>
                      </div>
                    ) : (
                      <div className="relative flex items-center justify-center gap-3">
                        <Send className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" />
                        <span className="text-lg">إرسال الرسالة</span>
                      </div>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Success Modal */}
      {showSuccess && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-3xl p-8 max-w-md mx-4 shadow-2xl transform animate-scale-in relative">
            <button
              onClick={() => setShowSuccess(false)}
              className="absolute top-4 left-4 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="text-center">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full mb-6 animate-bounce-once">
                <CheckCircle className="w-12 h-12 text-white" />
              </div>

              <h3 className="text-3xl font-bold text-gray-900 mb-3">
                تم الإرسال بنجاح!
              </h3>

              <p className="text-gray-600 text-lg mb-6">
                شكراً لتواصلك معنا. سنرد عليك في أقرب وقت ممكن.
              </p>

              <button
                onClick={() => setShowSuccess(false)}
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold py-3 px-8 rounded-xl hover:shadow-lg transition-all duration-300"
              >
                حسناً
              </button>
            </div>
          </div>
        </div>
      )}

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

        @keyframes fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes scale-in {
          from {
            transform: scale(0.9);
            opacity: 0;
          }
          to {
            transform: scale(1);
            opacity: 1;
          }
        }

        @keyframes bounce-once {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-20px);
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

        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }

        .animate-scale-in {
          animation: scale-in 0.3s ease-out;
        }

        .animate-bounce-once {
          animation: bounce-once 0.6s ease-out;
        }
      `}</style>
    </section>
  );
}
