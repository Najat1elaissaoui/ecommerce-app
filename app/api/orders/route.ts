import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const orderData = await request.json()

    // Validate required fields
    const requiredFields = ["client_name", "client_phone", "client_city", "client_address", "total_amount", "items"]
    for (const field of requiredFields) {
      if (!orderData[field]) {
        return NextResponse.json({ error: `الحقل ${field} مطلوب` }, { status: 400 })
      }
    }

    // Validate phone number format
    if (!/^[0-9+\-\s()]+$/.test(orderData.client_phone)) {
      return NextResponse.json({ error: "رقم الهاتف غير صحيح" }, { status: 400 })
    }

    // Mock order creation - replace with actual database insertion
    const order = {
      id: Math.floor(Math.random() * 10000) + 1000,
      ...orderData,
      status: "en_attente",
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    }

    // In a real application, you would:
    // 1. Insert the order into the database
    // 2. Send notification to admin
    // 3. Send confirmation email to customer
    // 4. Update product quantities

    console.log("New order created:", order)

    return NextResponse.json(order, { status: 201 })
  } catch (error) {
    console.error("Order creation error:", error)
    return NextResponse.json({ error: "حدث خطأ في إنشاء الطلب" }, { status: 500 })
  }
}
