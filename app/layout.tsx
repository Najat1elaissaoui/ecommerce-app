import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Suspense } from "react"
import { CartProvider } from "@/lib/cart-context"
import "./globals.css"
import SlidingAnnouncements from "@/components/client/sliding-announcements"

export const metadata: Metadata = {
  title: "متجر المكملات الغذائية",
  description: "أفضل المكملات الغذائية عالية الجودة",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ar" dir="rtl">
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable}`}>
        <CartProvider>
          <SlidingAnnouncements />
          <Suspense fallback={null}>{children}</Suspense>
        </CartProvider>
        {/* Analytics component removed */}
      </body>
    </html>
  )
}
