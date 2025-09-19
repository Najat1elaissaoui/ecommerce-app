import CartPage from "@/components/client/cart-page"
import Header from "@/components/client/header"
import Footer from "@/components/client/footer"

export default function Cart() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-20">
        <CartPage />
      </main>
      <Footer />
    </div>
  )
}
