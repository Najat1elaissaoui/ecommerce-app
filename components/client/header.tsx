"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ShoppingCart, Menu, X, Search, Star } from "lucide-react"
import { cn } from "@/lib/utils"
import { useCart } from "@/lib/cart-context"
import CartDrawer from "./cart-drawer"

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isCartOpen, setIsCartOpen] = useState(false)
  const { itemCount } = useCart()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navItems = [
    { name: "الرئيسية", href: "/" },
    { name: "المنتجات", href: "/products" },
    { name: "من نحن", href: "/about" },
    { name: "لماذا نحن", href: "/why-us" },
    { name: "تواصل معنا", href: "/#contact" },
  ]

  return (
    <>
      <header
        className={cn(
          "fixed right-0 left-0 z-40 transition-all duration-300",
          isScrolled 
            ? "bg-white/95 backdrop-blur-sm shadow-lg py-2" 
            : "bg-white/80 backdrop-blur-sm shadow-md py-3",
          "top-9" // 36px pour la bannière compacte
        )}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 opacity-0 animate-[fadeInRight_0.5s_0.1s_forwards]">
              <div className="w-20 h-10 flex items-center justify-center">
                <Image
                  src="/logo.png"
                  alt="Tafoukt Logo"
                  width={50}
                  height={40}
                  className="object-contain hover:scale-105 transition-transform"
                />
              </div>
              <span className="text-xl font-bold text-primary">Tafoukt</span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-8">
              {navItems.map((item, index) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-foreground hover:text-primary transition-all font-medium opacity-0 hover:scale-105"
                  style={{ 
                    animation: `fadeInLeft 0.5s ${0.1 + index * 0.1}s forwards`
                  }}
                >
                  {item.name}
                </Link>
              ))}
            </nav>

            {/* Actions */}
            <div className="flex items-center gap-4 opacity-0 animate-[fadeInLeft_0.5s_0.4s_forwards]">
            

              <Button 
                variant="ghost" 
                size="sm" 
                className="relative hover:bg-primary/10 hover:scale-105 transition-all" 
                onClick={() => setIsCartOpen(true)}
              >
                <ShoppingCart className="w-4 h-4" />
                {itemCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#d32f2f] text-white rounded-full text-xs flex items-center justify-center animate-pulse-slow">
                    {itemCount}
                  </span>
                )}
              </Button>

              {/* Mobile menu button */}
              <Button
                variant="ghost"
                size="sm"
                className="md:hidden hover:bg-primary/10"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </Button>
            </div>
          </div>

          {/* Mobile Navigation - Design amélioré */}
          {isMobileMenuOpen && (
            <div className="md:hidden bg-white/95 backdrop-blur-md border-t border-border rounded-b-2xl shadow-lg overflow-hidden">
              <nav className="py-3">
                {navItems.map((item, index) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="block px-6 py-3 text-foreground hover:text-primary hover:bg-primary/5 transition-all border-b border-border/50 last:border-b-0"
                    onClick={() => setIsMobileMenuOpen(false)}
                    style={{ 
                      opacity: 0, 
                      animation: `fadeInUp 0.3s ${index * 0.05}s forwards`
                    }}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-medium">{item.name}</span>
                      <span className="text-sm">›</span>
                    </div>
                  </Link>
                ))}
              </nav>
              
              {/* Quick actions pour mobile */}
              <div className="p-4 bg-primary/5 flex items-center justify-around border-t border-border/50">
                <Button variant="ghost" size="sm" onClick={() => setIsMobileMenuOpen(false)} className="flex flex-col items-center gap-1 h-auto p-2">
                  <Search className="w-5 h-5 text-primary" />
                  <span className="text-xs">بحث</span>
                </Button>
                
                <Button variant="ghost" size="sm" onClick={() => {
                  setIsMobileMenuOpen(false);
                  setIsCartOpen(true);
                }} className="flex flex-col items-center gap-1 h-auto p-2">
                  <ShoppingCart className="w-5 h-5 text-primary" />
                  <span className="text-xs">السلة</span>
                </Button>
                
                <Link href="/products" className="flex flex-col items-center gap-1 h-auto p-2">
                  <Star className="w-5 h-5 text-primary" />
                  <span className="text-xs">منتجاتنا</span>
                </Link>
              </div>
            </div>
          )}
        </div>
      </header>

      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  )
}
