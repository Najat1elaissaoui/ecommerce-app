import type React from "react"

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // Login page layout without sidebar or admin header
  return (
    <div className="min-h-screen">
      {children}
    </div>
  )
}