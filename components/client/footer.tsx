"use client"

import Link from "next/link"
import { Facebook, Twitter, Instagram, Youtube, Phone, Mail, MapPin } from "lucide-react"

export default function Footer() {
  const footerLinks = {
    company: [
      { name: "من نحن", href: "#about" },
      { name: "رسالتنا", href: "#mission" },
      { name: "فريق العمل", href: "#team" },
      { name: "الوظائف", href: "#careers" },
    ],
    products: [
      { name: "البروتينات", href: "/products/proteins" },
      { name: "الفيتامينات", href: "/products/vitamins" },
      { name: "المعادن", href: "/products/minerals" },
      { name: "الأحماض الأمينية", href: "/products/amino-acids" },
    ],
    support: [
      { name: "تواصل معنا", href: "#contact" },
      { name: "الأسئلة الشائعة", href: "/faq" },
      { name: "سياسة الإرجاع", href: "/returns" },
      { name: "الشحن والتوصيل", href: "/shipping" },
    ],
    legal: [
      { name: "الشروط والأحكام", href: "/terms" },
      { name: "سياسة الخصوصية", href: "/privacy" },
      { name: "سياسة الكوكيز", href: "/cookies" },
      { name: "إخلاء المسؤولية", href: "/disclaimer" },
    ],
  }

  const socialLinks = [
    { icon: Facebook, href: "#", label: "فيسبوك" },
    { icon: Twitter, href: "#", label: "تويتر" },
    { icon: Instagram, href: "#", label: "إنستغرام" },
    { icon: Youtube, href: "#", label: "يوتيوب" },
  ]

  return (
    <footer className="bg-gradient-to-b from-neutral-900 to-neutral-950 text-neutral-200 border-t border-neutral-800">
      <div className="container mx-auto px-6 py-14">
        {/* GRID SECTIONS */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-10">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-white font-extrabold text-2xl">م</span>
              </div>
              <span className="text-2xl font-bold text-white">متجر المكملات</span>
            </div>
            <p className="text-neutral-400 mb-6 leading-relaxed">
              متجرك الموثوق للحصول على أفضل المكملات الغذائية عالية الجودة. نساعدك في تحقيق أهدافك الصحية واللياقية بأمان وفعالية.
            </p>

            <div className="space-y-3 text-neutral-400">
              <div className="flex items-center gap-3 hover:text-white transition">
                <Phone className="w-4 h-4" />
                <span>+212 12345678</span>
              </div>
              <div className="flex items-center gap-3 hover:text-white transition">
                <Mail className="w-4 h-4" />
                <span>info@gmail.com</span>
              </div>
              <div className="flex items-center gap-3 hover:text-white transition">
                <MapPin className="w-4 h-4" />
                <span>الرباط، المغرب</span>
              </div>
            </div>
          </div>

          {/* Links sections */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h3 className="font-semibold text-white text-lg mb-4">{title === "company" ? "الشركة" : title === "products" ? "المنتجات" : title === "support" ? "الدعم" : "قانوني"}</h3>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-neutral-400 hover:text-primary transition-colors duration-200"
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
                className="w-11 h-11 rounded-full bg-neutral-800 hover:bg-primary flex items-center justify-center transition transform hover:scale-110 shadow-md"
                aria-label={social.label}
              >
                <social.icon className="w-5 h-5 text-neutral-200 hover:text-white" />
              </Link>
            ))}
          </div>
          <p className="text-neutral-500 text-sm text-center">
            © 2025 متجر المكملات. جميع الحقوق محفوظة.
          </p>
        </div>
      </div>
    </footer>
  )
}
