"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ShoppingCart, Menu, X, Search } from "lucide-react"
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
    { name: "من نحن", href: "#about" },
    { name: "لماذا نحن", href: "#why-us" },
    { name: "تواصل معنا", href: "#contact" },
  ]

  return (
    <>
      <header
        className={cn(
          "fixed right-0 left-0 z-40 transition-all duration-300",
          "bg-white shadow-lg", // Toujours en blanc avec une ombre
          // Ajustement pour la bannière défilante
          "top-9" // 36px pour la bannière compacte
        )}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 animate-slide-in-right">
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">م</span>
              </div>
              <span className="text-xl font-bold text-primary">متجر المكملات</span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-8">
              {navItems.map((item, index) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-foreground hover:text-primary transition-colors font-medium animate-slide-in-left"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  {item.name}
                </Link>
              ))}
            </nav>

            {/* Actions */}
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm" className="hidden md:flex">
                <Search className="w-4 h-4" />
              </Button>

              <Button variant="ghost" size="sm" className="relative" onClick={() => setIsCartOpen(true)}>
                <ShoppingCart className="w-4 h-4" />
                {itemCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-accent text-accent-foreground rounded-full text-xs flex items-center justify-center animate-glow">
                    {itemCount}
                  </span>
                )}
              </Button>

              {/* Mobile menu button */}
              <Button
                variant="ghost"
                size="sm"
                className="md:hidden"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </Button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMobileMenuOpen && (
            <div className="md:hidden bg-background border-t border-border animate-slide-in-left">
              <nav className="py-4 space-y-2">
                {navItems.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="block px-4 py-2 text-foreground hover:text-primary hover:bg-muted rounded-lg transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
              </nav>
            </div>
          )}
        </div>
      </header>

      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  )
}
