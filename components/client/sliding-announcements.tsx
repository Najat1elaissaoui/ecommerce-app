"use client"

import { Megaphone } from "lucide-react"

export default function SlidingAnnouncements() {
  return (
    <div className="bg-gradient-to-r from-red-600 to-red-800 text-white py-2.5 fixed top-0 left-0 right-0 z-50 shadow-lg">
      <div className="flex items-center justify-center">
        {/* Icon section on the right */}
        <div className="hidden md:flex items-center justify-center px-4">
          <Megaphone className="w-5 h-5 text-white" />
        </div>

        {/* Fixed announcement */}
        <div className="py-1">
          <p className="text-center text-sm font-medium px-4">
            التوصيل بالمجان و الدفع عند الإستلام
          </p>
        </div>
      </div>
    </div>
  )
}