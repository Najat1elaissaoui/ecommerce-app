"use client";

import { Button } from "@/components/ui/button";
import { useCart } from "@/lib/cart-context";
import { cn } from "@/lib/utils";
import {
  ChevronRight,
  Menu,
  Search,
  ShoppingCart,
  Star,
  X,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { memo, useCallback, useEffect, useState } from "react";
import CartDrawer from "./cart-drawer";

const NAV_ITEMS = [
  { name: "الرئيسية", href: "/" },
  { name: "المنتجات", href: "/products" },
  { name: "من نحن", href: "/about" },
  { name: "لماذا نحن", href: "/why-us" },
  { name: "تواصل معنا", href: "/#contact" },
] as const;

// Memoized Logo Component
export const Logo = memo(() => (
  <Link href="/" className="flex items-center gap-2 group">
    <div className="flex items-center justify-center relative">
      <Image
        src="/logo.png"
        alt="Tafoukt Logo"
        width={80}
        height={80}
        className="object-contain transition-transform duration-300 group-hover:scale-110"
        priority
      />
    </div>
  </Link>
));
// Memoized Logo Component
export const LogoWhite = memo(() => (
  <Link href="/" className="flex items-center gap-2 group">
    <div className="flex items-center justify-center relative">
      <Image
        src="/logo_white.png"
        alt="Tafoukt Logo"
        width={100}
        height={100}
        className="object-contain transition-transform duration-300 group-hover:scale-110"
        priority
      />
    </div>
  </Link>
));

Logo.displayName = "Logo";

// Memoized Navigation Item
const NavItem = memo(
  ({
    item,
    index,
    onClick,
  }: {
    item: (typeof NAV_ITEMS)[number];
    index: number;
    onClick?: () => void;
  }) => (
    <Link
      href={item.href}
      onClick={onClick}
      className="relative text-foreground font-medium transition-all duration-300 hover:text-primary group"
    >
      <span className="relative z-10">{item.name}</span>
      <span className="absolute inset-x-0 -bottom-1 h-0.5 bg-primary scale-x-0 transition-transform duration-300 group-hover:scale-x-100" />
    </Link>
  )
);

NavItem.displayName = "NavItem";

// Memoized Mobile Nav Item
const MobileNavItem = memo(
  ({
    item,
    index,
    onClick,
  }: {
    item: (typeof NAV_ITEMS)[number];
    index: number;
    onClick: () => void;
  }) => (
    <Link
      href={item.href}
      onClick={onClick}
      className="block px-6 py-4 text-foreground hover:text-primary hover:bg-primary/5 transition-all duration-200 border-b border-border/30 last:border-b-0 group"
    >
      <div className="flex items-center justify-between">
        <span className="font-medium text-base">{item.name}</span>
        <ChevronRight className="w-4 h-4 text-muted-foreground transition-transform duration-200 group-hover:translate-x-1" />
      </div>
    </Link>
  )
);

MobileNavItem.displayName = "MobileNavItem";

// Memoized Cart Badge
const CartBadge = memo(({ count }: { count: number }) =>
  count > 0 ? (
    <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-600 text-white rounded-full text-xs flex items-center justify-center font-bold shadow-lg animate-bounce">
      {count > 9 ? "9+" : count}
    </span>
  ) : null
);

CartBadge.displayName = "CartBadge";

export default function ModernOptimizedHeader() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { itemCount } = useCart();

  // Optimized scroll handler with throttling
  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setIsScrolled(window.scrollY > 50);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  const handleMobileMenuToggle = useCallback(() => {
    setIsMobileMenuOpen((prev) => !prev);
  }, []);

  const closeMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(false);
  }, []);

  const openCart = useCallback(() => {
    setIsCartOpen(true);
    setIsMobileMenuOpen(false);
  }, []);

  const closeCart = useCallback(() => {
    setIsCartOpen(false);
  }, []);

  return (
    <>
      <header
        className={cn(
          "fixed right-0 left-0 z-50 transition-all duration-500 ease-in-out top-9",
          isScrolled
            ? "bg-white/95 backdrop-blur-xl shadow-2xl shadow-black/5 py-2"
            : "bg-white/90 backdrop-blur-md shadow-lg py-3"
        )}
      >
        <div className="container mx-auto px-4 lg:px-6">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Logo />

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-8 lg:gap-10">
              {NAV_ITEMS.map((item, index) => (
                <NavItem key={item.name} item={item} index={index} />
              ))}
            </nav>

            {/* Actions */}
            <div className="flex items-center gap-3">
              {/* Search Button - Desktop Only */}
              <Button
                variant="ghost"
                size="sm"
                className="hidden lg:flex hover:bg-primary/10 hover:scale-105 transition-all duration-200"
              >
                <Search className="w-4 h-4" />
              </Button>

              {/* Cart Button */}
              <Button
                variant="ghost"
                size="sm"
                className="relative hover:bg-primary/10 hover:scale-105 transition-all duration-200"
                onClick={openCart}
                aria-label="Open cart"
              >
                <ShoppingCart className="w-4 h-4" />
                <CartBadge count={itemCount} />
              </Button>

              {/* Mobile menu button */}
              <Button
                variant="ghost"
                size="sm"
                className="md:hidden hover:bg-primary/10 transition-all duration-200"
                onClick={handleMobileMenuToggle}
                aria-label="Toggle menu"
              >
                {isMobileMenuOpen ? (
                  <X className="w-5 h-5" />
                ) : (
                  <Menu className="w-5 h-5" />
                )}
              </Button>
            </div>
          </div>

          {/* Mobile Navigation with Slide Animation */}
          <div
            className={cn(
              "md:hidden overflow-hidden transition-all duration-300 ease-in-out",
              isMobileMenuOpen
                ? "max-h-[calc(100vh-8rem)] opacity-100"
                : "max-h-0 opacity-0"
            )}
          >
            <div className="bg-white/98 backdrop-blur-xl border-t border-border rounded-b-3xl shadow-2xl overflow-hidden">
              <nav className="py-2">
                {NAV_ITEMS.map((item, index) => (
                  <MobileNavItem
                    key={item.name}
                    item={item}
                    index={index}
                    onClick={closeMobileMenu}
                  />
                ))}
              </nav>

              {/* Quick actions for mobile */}
              <div className="p-5 bg-gradient-to-br from-primary/5 to-primary/10 flex items-center justify-around border-t border-border/30 gap-4">
                <button
                  onClick={closeMobileMenu}
                  className="flex flex-col items-center gap-2 p-3 rounded-xl hover:bg-white/50 transition-all duration-200 active:scale-95"
                >
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                    <Search className="w-5 h-5 text-primary" />
                  </div>
                  <span className="text-xs font-medium">بحث</span>
                </button>

                <button
                  onClick={openCart}
                  className="flex flex-col items-center gap-2 p-3 rounded-xl hover:bg-white/50 transition-all duration-200 active:scale-95 relative"
                >
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center relative">
                    <ShoppingCart className="w-5 h-5 text-primary" />
                    <CartBadge count={itemCount} />
                  </div>
                  <span className="text-xs font-medium">السلة</span>
                </button>

                <Link
                  href="/products"
                  onClick={closeMobileMenu}
                  className="flex flex-col items-center gap-2 p-3 rounded-xl hover:bg-white/50 transition-all duration-200 active:scale-95"
                >
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                    <Star className="w-5 h-5 text-primary" />
                  </div>
                  <span className="text-xs font-medium">منتجاتنا</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </header>

      <CartDrawer isOpen={isCartOpen} onClose={closeCart} />

      {/* Overlay for mobile menu */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden transition-opacity duration-300"
          onClick={closeMobileMenu}
        />
      )}
    </>
  );
}
