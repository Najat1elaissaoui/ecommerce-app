"use client"

import { Megaphone } from "lucide-react"

interface Announcement {
  id: number
  text: string
  link?: string
}

export default function SlidingAnnouncements() {
  const announcements: Announcement[] = [
    { 
      id: 1, 
      text: "توصيل مجاني عند الطلب بأكثر من 500 درهم!", 
      link: "/products" 
    },
    { 
      id: 2, 
      text: "خصم 42% على كل المنتجات - عرض لفترة محدودة", 
      link: "/products" 
    },
    { 
      id: 3, 
      text: "ضمان استرجاع لمدة 30 يوم على جميع المنتجات", 
      link: "/products" 
    },
    { 
      id: 4, 
      text: "اشتري 2 واحصل على 1 مجاناً على منتجات مختارة!", 
      link: "/products" 
    },
  ]

  // Create a duplicate list of announcements for the continuous scrolling effect
  const duplicatedAnnouncements = [...announcements, ...announcements]

  return (
    <div className="bg-gradient-to-r from-red-600 to-red-800 text-white py-2.5 fixed top-0 left-0 right-0 z-50 shadow-lg overflow-hidden">
      <div className="flex items-center">
        {/* Icon section on the right */}
        <div className="hidden md:flex items-center justify-center px-4 border-l border-white/20">
          <Megaphone className="w-5 h-5 text-white" />
        </div>

        {/* Scrolling announcements */}
        <div className="flex-1 overflow-hidden relative whitespace-nowrap py-1">
          <div className="inline-block animate-marquee">
            <div className="flex items-center space-x-12" dir="rtl">
              {duplicatedAnnouncements.map((announcement, index) => (
                <div key={`${announcement.id}-${index}`} className="inline-flex items-center">
                  <span className="mx-2 w-1.5 h-1.5 bg-white rounded-full"></span>
                  {announcement.link ? (
                    <a 
                      href={announcement.link} 
                      className="text-sm font-medium hover:underline"
                    >
                      {announcement.text}
                    </a>
                  ) : (
                    <span className="text-sm font-medium">
                      {announcement.text}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
          
          {/* Duplicate for seamless loop */}
          <div className="inline-block animate-marquee" aria-hidden="true">
            <div className="flex items-center space-x-12" dir="rtl">
              {duplicatedAnnouncements.map((announcement, index) => (
                <div key={`dup-${announcement.id}-${index}`} className="inline-flex items-center">
                  <span className="mx-2 w-1.5 h-1.5 bg-white rounded-full"></span>
                  {announcement.link ? (
                    <a 
                      href={announcement.link} 
                      className="text-sm font-medium hover:underline"
                    >
                      {announcement.text}
                    </a>
                  ) : (
                    <span className="text-sm font-medium">
                      {announcement.text}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}