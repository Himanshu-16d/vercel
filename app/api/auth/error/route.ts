import { NextResponse } from "next/server"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const error = searchParams.get("error") || "unknown_error"

  // Return a proper JSON response
  return NextResponse.json({
    error,
    message: "Authentication error occurred",
  })
}
