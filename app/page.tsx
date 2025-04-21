import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowRight, Shield } from "lucide-react"
import Link from "next/link"

export default function Dashboard() {
  return (
    <main className="container py-10 px-4">
      <div className="flex flex-col gap-6">
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold tracking-tight">Welcome to HireSense AI</h1>
          <p className="text-xl text-muted-foreground mt-4">
            Your all-in-one platform for resume building and job searching powered by AI
          </p>
          <p className="mt-2 text-muted-foreground flex items-center justify-center gap-1">
            <Shield className="h-4 w-4" />
            Sign in required to access all features
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 max-w-4xl mx-auto mt-6">
          <Card className="relative overflow-hidden border-primary/20">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full -translate-y-1/2 translate-x-1/2" />
            <CardHeader>
              <CardTitle className="text-2xl">Resume Builder</CardTitle>
              <CardDescription>Create and optimize your resume with AI-powered suggestions</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
              <p>
                Our AI-powered resume builder helps you create professional resumes tailored to your target jobs. Get
                real-time feedback and suggestions to improve your chances of landing interviews.
              </p>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center">
                  <span className="bg-primary/10 p-1 rounded-full mr-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-primary"
                    >
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  </span>
                  AI-powered content enhancement
                </li>
                <li className="flex items-center">
                  <span className="bg-primary/10 p-1 rounded-full mr-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-primary"
                    >
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  </span>
                  Real-time resume scoring
                </li>
                <li className="flex items-center">
                  <span className="bg-primary/10 p-1 rounded-full mr-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-primary"
                    >
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  </span>
                  Tailored to specific job descriptions
                </li>
              </ul>
              <div className="mt-2">
                <Button asChild>
                  <Link href="/resume-builder" className="w-full justify-between">
                    Build Your Resume
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
          <Card className="relative overflow-hidden border-primary/20">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full -translate-y-1/2 translate-x-1/2" />
            <CardHeader>
              <CardTitle className="text-2xl">Job Finder</CardTitle>
              <CardDescription>Find jobs that match your skills and experience</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
              <p>
                Our AI-powered job finder analyzes your resume and finds jobs that match your skills and experience.
                Connect with LinkedIn to expand your job search and get personalized recommendations.
              </p>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center">
                  <span className="bg-primary/10 p-1 rounded-full mr-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-primary"
                    >
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  </span>
                  AI-powered job matching
                </li>
                <li className="flex items-center">
                  <span className="bg-primary/10 p-1 rounded-full mr-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-primary"
                    >
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  </span>
                  Skills gap analysis
                </li>
                <li className="flex items-center">
                  <span className="bg-primary/10 p-1 rounded-full mr-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-primary"
                    >
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  </span>
                  LinkedIn integration
                </li>
              </ul>
              <div className="mt-2">
                <Button asChild>
                  <Link href="/job-finder" className="w-full justify-between">
                    Find Jobs
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="mt-12 text-center">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold">Create an account to get started</h2>
            <p className="text-muted-foreground mt-2">
              Sign in to access the resume builder and job finder, save your resumes, track your job applications, and
              get personalized recommendations.
            </p>
            <div className="mt-6">
              <Button asChild variant="outline" className="mx-2">
                <Link href="/login">Sign In</Link>
              </Button>
              <Button asChild className="mx-2">
                <Link href="/register">Create Account</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
