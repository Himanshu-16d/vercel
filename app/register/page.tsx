"use client"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"
import { signIn, useSession } from "next-auth/react"
import { useRouter, useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"
import { Loader2, AlertCircle } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

export default function RegisterPage() {
  const router = useRouter()
  const { data: session, status } = useSession()
  const searchParams = useSearchParams()
  const callbackUrl = searchParams?.get("callbackUrl") || "/"
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  })

  useEffect(() => {
    if (searchParams) {
      const errorParam = searchParams.get("error")
      if (errorParam) {
        setError("An error occurred during registration. Please try again.")
      }
    }
  }, [searchParams])

  useEffect(() => {
    if (status === "authenticated") {
      router.push(callbackUrl)
    }
  }, [status, router, callbackUrl])

  const handleGoogleSignIn = async () => {
    try {
      setIsLoading(true)
      await signIn("google", { callbackUrl })
    } catch (error) {
      console.error("Error signing in with Google:", error)
      setError("Failed to sign in with Google. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match")
      return
    }
    // Handle registration logic here
  }

  if (status === "loading") {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-4rem)]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  return (
    <main className="container flex items-center justify-center min-h-[calc(100vh-4rem)] py-10 px-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">Create an account</CardTitle>
          <CardDescription className="text-center">
            Enter your information to create an account and save your progress
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">First name</Label>
                <Input
                  id="firstName"
                  placeholder="John"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Last name</Label>
                <Input
                  id="lastName"
                  placeholder="Doe"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="name@example.com"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={formData.password}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm password</Label>
              <Input
                id="confirmPassword"
                type="password"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                required
              />
            </div>
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creating account...
                </>
              ) : (
                "Create Account"
              )}
            </Button>
          </form>
          <div className="text-center text-sm">
            <span className="text-muted-foreground">Already have an account?</span>{" "}
            <Link href="/login" className="text-primary hover:underline">
              Sign in
            </Link>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col">
          <div className="relative w-full">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
            </div>
          </div>
          <div className="mt-4 grid grid-cols-1 gap-4">
            <Button variant="outline" onClick={handleGoogleSignIn} disabled={isLoading}>
              <span className="mr-2">G</span>
              Sign up with Google
            </Button>
          </div>
        </CardFooter>
      </Card>
    </main>
  )
}
