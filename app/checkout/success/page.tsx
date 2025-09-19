import { Suspense } from "react"
import OrderSuccess from "@/components/client/order-success"
import Header from "@/components/client/header"
import Footer from "@/components/client/footer"

export default function CheckoutSuccessPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-20">
        <Suspense fallback={<div>جاري التحميل...</div>}>
          <OrderSuccess />
        </Suspense>
      </main>
      <Footer />
    </div>
  )
}
