import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import DashboardNav from "@/components/dashboard-nav"
import { AuthProvider } from "@/components/auth-provider"
import Script from "next/script"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "HireSense AI - Smart Resume Builder & Job Finder",
  description: "Build professional resumes and find matching jobs with AI-powered tools",
  generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <Script
          src="https://platform.linkedin.com/in.js"
          strategy="beforeInteractive"
        >
          {`
            api_key: ${process.env.NEXT_PUBLIC_LINKEDIN_CLIENT_ID}
            authorize: true
          `}
        </Script>
      </head>
      <body className={inter.className}>
        <AuthProvider>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
            <div className="min-h-screen flex flex-col">
              <DashboardNav />
              <div className="flex-1">{children}</div>
            </div>
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  )
}
