"use client"

import SlidingAnnouncements from "@/components/client/sliding-announcements"
import { usePathname } from "next/navigation"

export default function AnnouncementsWrapper() {
  const pathname = usePathname();
  if (pathname && pathname.startsWith("/admin")) return null;
  return <SlidingAnnouncements />;
}
