"use client"

import { motion } from "framer-motion"
import { Phone, Mail, MapPin, Send, Clock, MessageCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useState } from "react"

export default function ContactSection() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: ""
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false)
      setFormData({ name: "", email: "", phone: "", message: "" })
      // You can add success message here
    }, 2000)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  const contactInfo = [
    {
      icon: Phone,
      title: "اتصل بنا",
      info: "+212 12345678",
      description: "متاح 24/7 للاستفسارات"
    },
    {
      icon: Mail,
      title: "البريد الإلكتروني",
      info: "info@gmail.com",
      description: "نرد خلال 24 ساعة"
    },
    
    
  ]

  return (
    <section id="contact" className="py-10 md:py-20 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-3 sm:px-4">
        
        {/* Section Header */}
        <motion.div 
          className="text-center mb-8 md:mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="inline-flex items-center bg-gradient-to-r from-blue-100 to-purple-100 text-blue-600 px-4 sm:px-6 py-2 sm:py-3 rounded-full text-xs sm:text-sm font-semibold mb-4 md:mb-6">
            <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
            تواصل معنا
          </div>
          
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 mb-4 md:mb-6" dir="rtl">
            نحن هنا
            <span className="block bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
              لمساعدتك
            </span>
          </h2>
          
          <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed" dir="rtl">
            لديك سؤال حول منتجاتنا؟ تحتاج مشورة في اختيار المكمل المناسب؟ فريقنا من الخبراء جاهز لمساعدتك في تحقيق أهدافك الرياضية.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 md:gap-12">
          
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="order-2 lg:order-1"
          >
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2 md:mb-4" dir="rtl">
                  معلومات الاتصال
                </h3>
                <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-8" dir="rtl">
                  تواصل معنا عبر أي من الطرق التالية، ونحن نضمن لك الرد السريع والخدمة المميزة.
                </p>
              </div>

              <div className="grid gap-6">
                {contactInfo.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <Card className="border-0 shadow-md sm:shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group">
                      <CardContent className="p-4 sm:p-6">
                        <div className="flex items-start gap-3 sm:gap-4" dir="rtl">
                          <div className="flex-shrink-0">
                            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg sm:rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                              <item.icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                            </div>
                          </div>
                          <div className="flex-1">
                            <h4 className="font-bold text-base sm:text-lg text-gray-900 mb-0.5 sm:mb-1">
                              {item.title}
                            </h4>
                            <p className="text-blue-600 text-sm sm:text-base font-semibold mb-0.5 sm:mb-1">
                              {item.info}
                            </p>
                            <p className="text-xs sm:text-sm text-gray-600">
                              {item.description}
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>

              {/* Quick Contact Buttons */}
              <div className="flex gap-3 sm:gap-4 pt-4">
                <Button 
                  size="default" 
                  className="flex-1 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white text-xs sm:text-sm h-10 sm:h-12 px-2 sm:px-4"
                  onClick={() => window.open('https://wa.me/971501234567', '_blank')}
                >
                  <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5 mr-1 sm:mr-2" />
                  واتساب
                </Button>
                <Button 
                  size="default" 
                  variant="outline"
                  className="flex-1 border-2 border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white text-xs sm:text-sm h-10 sm:h-12 px-2 sm:px-4"
                  onClick={() => window.open('tel:+971501234567', '_blank')}
                >
                  <Phone className="w-4 h-4 sm:w-5 sm:h-5 mr-1 sm:mr-2" />
                  اتصال
                </Button>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="order-1 lg:order-2"
          >
            <Card className="border-0 shadow-lg md:shadow-xl">
              <CardContent className="p-5 sm:p-6 md:p-8">
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6 text-center" dir="rtl">
                  أرسل رسالة
                </h3>
                
                <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2" dir="rtl">
                        الاسم الكامل *
                      </label>
                      <Input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="أدخل اسمك الكامل"
                        required
                        className="w-full h-9 sm:h-10 text-sm"
                        dir="rtl"
                      />
                    </div>
                    <div>
                      <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2" dir="rtl">
                        رقم الهاتف *
                      </label>
                      <Input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="05xxxxxxxx"
                        required
                        className="w-full h-9 sm:h-10 text-sm"
                        dir="rtl"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2" dir="rtl">
                      البريد الإلكتروني *
                    </label>
                    <Input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="example@email.com"
                      required
                      className="w-full h-9 sm:h-10 text-sm"
                      dir="rtl"
                    />
                  </div>

                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2" dir="rtl">
                      الرسالة *
                    </label>
                    <Textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder="اكتب رسالتك هنا... مثل نوع المكمل المطلوب، أهدافك الرياضية، أو أي استفسار آخر"
                      required
                      className="w-full min-h-[100px] sm:min-h-[120px] text-sm"
                      dir="rtl"
                    />
                  </div>

                  <Button
                    type="submit"
                    size="default"
                    className="w-full h-10 sm:h-12 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white text-xs sm:text-sm"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <div className="flex items-center justify-center gap-2">
                        <div className="w-3 h-3 sm:w-4 sm:h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        <span>جاري الإرسال...</span>
                      </div>
                    ) : (
                      <div className="flex items-center justify-center gap-2">
                        <Send className="w-4 h-4 sm:w-5 sm:h-5" />
                        <span>إرسال الرسالة</span>
                      </div>
                    )}
                  </Button>
                </form>

                
              </CardContent>
            </Card>
          </motion.div>
        </div>

       
        
      </div>
    </section>
  )
}