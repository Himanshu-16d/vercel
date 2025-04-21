import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  // Skip middleware for NextAuth API routes
  if (request.nextUrl.pathname.startsWith("/api/auth")) {
    return NextResponse.next()
  }

  // For other routes, add the x-url header
  const requestHeaders = new Headers(request.headers)
  requestHeaders.set("x-url", request.url)

  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  })
}
