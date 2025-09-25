"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Facebook, Twitter, Instagram, Youtube, Phone, Mail, MapPin, ChevronDown, ChevronUp, ArrowRight } from "lucide-react"

export default function Footer() {
  // État pour les accordéons sur mobile
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({})

  const toggleSection = (section: string) => {
    setOpenSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }))
  }

  const footerLinks = {
    company: [
      { name: "من نحن", href: "#about" },
      { name: "رسالتنا", href: "#mission" },
      { name: "فريق العمل", href: "#team" },
      { name: "الوظائف", href: "#careers" }
    ],
    products: [
      { name: "البروتينات", href: "/products/proteins" },
      { name: "الفيتامينات", href: "/products/vitamins" },
      { name: "المعادن", href: "/products/minerals" },
      { name: "الأحماض الأمينية", href: "/products/amino-acids" }
    ],
    support: [
      { name: "تواصل معنا", href: "#contact" },
      { name: "الأسئلة الشائعة", href: "/faq" },
      { name: "سياسة الإرجاع", href: "/returns" },
      { name: "الشحن والتوصيل", href: "/shipping" }
    ],
    legal: [
      { name: "الشروط والأحكام", href: "/terms" },
      { name: "سياسة الخصوصية", href: "/privacy" },
      { name: "سياسة الكوكيز", href: "/cookies" },
      { name: "إخلاء المسؤولية", href: "/disclaimer" }
    ]
  }

  const socialLinks = [
    { icon: Facebook, href: "#", label: "فيسبوك" },
    { icon: Twitter, href: "#", label: "تويتر" },
    { icon: Instagram, href: "#", label: "إنستغرام" },
    { icon: Youtube, href: "#", label: "يوتيوب" },
  ]

  return (
    <footer className="bg-gradient-to-b from-neutral-900 to-neutral-950 text-neutral-200 border-t border-neutral-800 overflow-hidden">
      {/* Vague de séparation au haut du footer */}
      <div className="w-full">
        <svg viewBox="0 0 1200 50" preserveAspectRatio="none" className="w-full h-12 fill-neutral-950 -mb-1">
          <path d="M0,50 Q300,0 600,30 T1200,10 V50 H0 Z" />
        </svg>
      </div>

      {/* Newsletter section */}
      <div className="container mx-auto px-6 py-10">
        <div className="bg-gradient-to-br from-neutral-800/50 to-neutral-900/50 backdrop-blur-sm rounded-2xl p-6 md:p-10 shadow-2xl border border-neutral-800/50 mb-14">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">اشترك في نشرتنا الإخبارية</h3>
              <p className="text-neutral-400">احصل على آخر العروض والمنتجات الجديدة مباشرة إلى بريدك الإلكتروني</p>
            </div>
            <div>
              <div className="flex flex-col sm:flex-row gap-3">
                <Input 
                  placeholder="أدخل بريدك الإلكتروني" 
                  className="bg-neutral-800/50 border-neutral-700 text-white placeholder:text-neutral-500 h-12" 
                />
                <Button className="h-12 px-6 bg-primary hover:bg-primary/90 transition-all">
                  اشترك الآن <ArrowRight className="w-4 h-4 mr-2" />
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* GRID SECTIONS - Responsive avec accordéon sur mobile */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10">
          {/* Company Info */}
          <div className="lg:col-span-4">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                <Image
                  src="/logo.png"
                  width={30}
                  height={30}
                  alt="Logo"
                  className="object-contain"
                />
              </div>
              <span className="text-2xl font-bold text-white">Tafoukt</span>
            </div>
            <p className="text-neutral-400 mb-6 leading-relaxed">
              متجرك الموثوق للحصول على أفضل المكملات الغذائية عالية الجودة. نساعدك في تحقيق أهدافك الصحية واللياقية بأمان وفعالية.
            </p>

            <div className="space-y-3 text-neutral-400">
              <div className="flex items-center gap-3 hover:text-white transition">
                <Phone className="w-4 h-4 text-blue-400" />
                <span>+212 12345678</span>
              </div>
              <div className="flex items-center gap-3 hover:text-white transition">
                <Mail className="w-4 h-4 text-blue-400" />
                <span>info@gmail.com</span>
              </div>
              <div className="flex items-center gap-3 hover:text-white transition">
                <MapPin className="w-4 h-4 text-blue-400" />
                <span>الرباط، المغرب</span>
              </div>
            </div>
          </div>

          {/* Links sections - Accordéon sur mobile */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title} className="lg:col-span-2">
              {/* Titre avec bouton accordéon pour mobile */}
              <div 
                className="flex items-center justify-between cursor-pointer md:cursor-default mb-4 pb-2 border-b md:border-b-0 border-neutral-800"
                onClick={() => toggleSection(title)}
              >
                <h3 className="font-semibold text-white text-lg">
                  {title === "company" ? "الشركة" : title === "products" ? "المنتجات" : title === "support" ? "الدعم" : "قانوني"}
                </h3>
                <button className="md:hidden">
                  {openSections[title] ? (
                    <ChevronUp className="w-5 h-5 text-neutral-500" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-neutral-500" />
                  )}
                </button>
              </div>
              
              {/* Liens avec animation sur mobile */}
              <ul 
                className={`space-y-2 transition-all duration-300 ease-in-out overflow-hidden ${openSections[title] ? 'max-h-80 opacity-100' : 'max-h-0 opacity-0 md:max-h-80 md:opacity-100'}`}
              >
                {links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-neutral-400 hover:text-blue-400 transition-colors duration-200 block py-1"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Social & Copyright */}
        <div className="border-t border-neutral-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-4">
            {socialLinks.map((social) => (
              <Link
                key={social.label}
                href={social.href}
                className="w-10 h-10 rounded-full bg-neutral-800/80 hover:bg-blue-500 flex items-center justify-center transition-all transform hover:scale-110 shadow-md hover:shadow-blue-500/20"
                aria-label={social.label}
              >
                <social.icon className="w-4 h-4 text-neutral-200" />
              </Link>
            ))}
          </div>
          <p className="text-neutral-500 text-sm text-center">
            © 2025 Tafoukt. جميع الحقوق محفوظة.
          </p>
        </div>
      </div>
    </footer>
  )
}
