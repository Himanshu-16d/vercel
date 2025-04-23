"use client"

import { useState } from "react"
import { signIn, useSession } from "next-auth/react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Loader2, Linkedin } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import type { LinkedInProfile } from "@/types/resume"

interface LinkedInIntegrationProps {
  onProfileImport: (profile: LinkedInProfile) => void
}

export default function LinkedInIntegration({ onProfileImport }: LinkedInIntegrationProps) {
  const { data: session } = useSession()
  const [isConnecting, setIsConnecting] = useState(false)
  const { toast } = useToast()

  const handleConnect = async () => {
    setIsConnecting(true)
    try {
      const result = await signIn("linkedin", {
        redirect: false,
        callbackUrl: "/job-finder"
      })

      if (result?.error) {
        throw new Error(result.error)
      }

      if (session?.user) {
        const profile: LinkedInProfile = {
          id: session.user.id,
          name: session.user.name || "",
          headline: "",
          profileUrl: "",
          connections: 0
        }
        
        onProfileImport(profile)
        
        toast({
          title: "Success",
          description: "Successfully connected with LinkedIn",
        })
      }
    } catch (error) {
      console.error("LinkedIn connection error:", error)
      toast({
        title: "Error",
        description: "Failed to connect with LinkedIn. Please try again.",
        variant: "destructive"
      })
    } finally {
      setIsConnecting(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>LinkedIn Integration</CardTitle>
        <CardDescription>Connect your LinkedIn profile to import your professional data and get better job matches</CardDescription>
      </CardHeader>
      <CardContent>
        <Button 
          onClick={handleConnect} 
          disabled={isConnecting || !!session?.user}
          className="w-full"
        >
          {isConnecting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Connecting...
            </>
          ) : session?.user ? (
            <>
              <Linkedin className="mr-2 h-4 w-4" />
              Connected as {session.user.name}
            </>
          ) : (
            <>
              <Linkedin className="mr-2 h-4 w-4" />
              Connect with LinkedIn
            </>
          )}
        </Button>
      </CardContent>
    </Card>
  )
}