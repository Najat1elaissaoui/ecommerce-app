"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { LayoutDashboard, Package, ShoppingCart, BarChart3, Settings, Users, Menu, X, Package2, User, Bell } from "lucide-react"

const sidebarItems = [
  {
    title: "لوحة التحكم",
    href: "/admin/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "المنتجات",
    href: "/admin/products",
    icon: Package,
  },
  {
    title: "الحزم والعروض",
    href: "/admin/packs",
    icon: Package2,
  },
  {
    title: "الطلبات",
    href: "/admin/orders",
    icon: ShoppingCart,
  },
  {
    title: "الإحصائيات",
    href: "/admin/statistics",
    icon: BarChart3,
  },
  {
    title: "الإشعارات",
    href: "/admin/notifications",
    icon: Bell,
  },
  {
    title: "الملف الشخصي",
    href: "/admin/profile",
    icon: User,
  },
  
]

export default function AdminSidebar() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

  return (
    <>
      {/* Mobile menu button */}
      <Button
        variant="ghost"
        size="sm"
        className="fixed top-4 right-4 z-50 lg:hidden"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </Button>

      {/* Sidebar */}
      <div
        className={cn(
          "fixed right-0 top-0 z-40 h-full w-64 bg-card border-l border-border transform transition-transform duration-300 ease-in-out lg:translate-x-0",
          isOpen ? "translate-x-0" : "translate-x-full",
        )}
      >
        <div className="p-6">
          <h2 className="text-2xl font-bold text-primary mb-8">لوحة التحكم</h2>

          <nav className="space-y-2">
            {sidebarItems.map((item) => (
              <Link key={item.href} href={item.href}>
                <Button
                  variant={pathname === item.href ? "default" : "ghost"}
                  className={cn(
                    "w-full justify-start gap-3 text-right",
                    pathname === item.href && "bg-primary text-primary-foreground",
                  )}
                  onClick={() => setIsOpen(false)}
                >
                  <item.icon className="w-5 h-5" />
                  {item.title}
                </Button>
              </Link>
            ))}
          </nav>
        </div>
      </div>

      {/* Overlay for mobile */}
      {isOpen && <div className="fixed inset-0 bg-black/50 z-30 lg:hidden" onClick={() => setIsOpen(false)} />}
    </>
  )
}
