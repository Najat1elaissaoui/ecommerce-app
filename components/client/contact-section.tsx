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
    <section id="contact" className="py-20 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4">
        
        {/* Section Header */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="inline-flex items-center bg-gradient-to-r from-blue-100 to-purple-100 text-blue-600 px-6 py-3 rounded-full text-sm font-semibold mb-6">
            <MessageCircle className="w-5 h-5 mr-2" />
            تواصل معنا
          </div>
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 mb-6" dir="rtl">
            نحن هنا
            <span className="block bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
              لمساعدتك
            </span>
          </h2>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed" dir="rtl">
            لديك سؤال حول منتجاتنا؟ تحتاج مشورة في اختيار المكمل المناسب؟ فريقنا من الخبراء جاهز لمساعدتك في تحقيق أهدافك الرياضية.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="space-y-8">
              <div>
                <h3 className="text-3xl font-bold text-gray-900 mb-4" dir="rtl">
                  معلومات الاتصال
                </h3>
                <p className="text-gray-600 mb-8" dir="rtl">
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
                    <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group">
                      <CardContent className="p-6">
                        <div className="flex items-start gap-4" dir="rtl">
                          <div className="flex-shrink-0">
                            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                              <item.icon className="w-6 h-6 text-white" />
                            </div>
                          </div>
                          <div className="flex-1">
                            <h4 className="font-bold text-lg text-gray-900 mb-1">
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
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>

              {/* Quick Contact Buttons */}
              <div className="flex gap-4 pt-4">
                <Button 
                  size="lg" 
                  className="flex-1 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white"
                  onClick={() => window.open('https://wa.me/971501234567', '_blank')}
                >
                  <MessageCircle className="w-5 h-5 mr-2" />
                  واتساب
                </Button>
                <Button 
                  size="lg" 
                  variant="outline"
                  className="flex-1 border-2 border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white"
                  onClick={() => window.open('tel:+971501234567', '_blank')}
                >
                  <Phone className="w-5 h-5 mr-2" />
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
          >
            <Card className="border-0 shadow-xl">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center" dir="rtl">
                  أرسل رسالة
                </h3>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2" dir="rtl">
                        الاسم الكامل *
                      </label>
                      <Input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="أدخل اسمك الكامل"
                        required
                        className="w-full"
                        dir="rtl"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2" dir="rtl">
                        رقم الهاتف *
                      </label>
                      <Input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="05xxxxxxxx"
                        required
                        className="w-full"
                        dir="rtl"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2" dir="rtl">
                      البريد الإلكتروني *
                    </label>
                    <Input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="example@email.com"
                      required
                      className="w-full"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2" dir="rtl">
                      الرسالة *
                    </label>
                    <Textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder="اكتب رسالتك هنا... مثل نوع المكمل المطلوب، أهدافك الرياضية، أو أي استفسار آخر"
                      required
                      className="w-full min-h-[120px]"
                      dir="rtl"
                    />
                  </div>

                  <Button
                    type="submit"
                    size="lg"
                    className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        جاري الإرسال...
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <Send className="w-5 h-5" />
                        إرسال الرسالة
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