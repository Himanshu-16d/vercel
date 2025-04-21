"use client"

import type React from "react"

import { useSession } from "next-auth/react"
import { useRouter, usePathname } from "next/navigation"
import { useEffect, useState } from "react"
import { Loader2 } from "lucide-react"

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession()
  const router = useRouter()
  const pathname = usePathname()
  const [isRedirecting, setIsRedirecting] = useState(false)

  useEffect(() => {
    if (status === "loading") return

    if (!session) {
      setIsRedirecting(true)
      const encodedCallbackUrl = encodeURIComponent(pathname || "/")
      router.push(`/login?callbackUrl=${encodedCallbackUrl}`)
    }
  }, [session, status, router, pathname])

  if (status === "loading" || isRedirecting) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-4rem)]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  if (!session) {
    return null
  }

  return <>{children}</>
}
