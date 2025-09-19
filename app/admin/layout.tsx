"use client"

import type React from "react"
import { usePathname } from "next/navigation"
import { requireAuth, type AdminUser } from "@/lib/auth"
import AdminSidebar from "@/components/admin/admin-sidebar"
import AdminHeader from "@/components/admin/admin-header"
import { useEffect, useState } from "react"

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const [admin, setAdmin] = useState<AdminUser | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  
  useEffect(() => {
    // Only require auth if not on login page
    if (pathname !== '/admin/login') {
      requireAuth().then((adminData) => {
        setAdmin(adminData)
        setIsLoading(false)
      }).catch(() => {
        setIsLoading(false)
      })
    } else {
      setIsLoading(false)
    }
  }, [pathname])
  
  // If it's the login page, render without admin layout
  if (pathname === '/admin/login') {
    return <>{children}</>
  }

  // Show loading state while checking auth
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">جاري التحميل...</p>
        </div>
      </div>
    )
  }

  // If no admin data, redirect to login
  if (!admin) {
    return <>{children}</>
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="flex">
        <AdminSidebar />
        <div className="flex-1 lg:mr-64">
          <AdminHeader admin={admin} />
          <main className="p-6">{children}</main>
        </div>
      </div>
    </div>
  )
}
