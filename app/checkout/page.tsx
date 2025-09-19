import CheckoutForm from "@/components/client/checkout-form"
import Header from "@/components/client/header"
import Footer from "@/components/client/footer"

export default function CheckoutPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-20">
        <CheckoutForm />
      </main>
      <Footer />
    </div>
  )
}
