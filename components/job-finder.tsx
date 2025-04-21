"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Loader2, Search, Linkedin, FileText, Upload } from "lucide-react"
import { findJobs, connectLinkedIn } from "@/actions/job-actions"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { ScrollArea } from "@/components/ui/scroll-area"
import type { JobListing, JobSearchParams, ResumeData } from "@/types/resume"
import JobListingCard from "@/components/job-listing-card"
import ResumeUpload from "@/components/resume-upload"

export default function JobFinder() {
  const [searchParams, setSearchParams] = useState<JobSearchParams>({
    title: "",
    location: "",
    keywords: "",
    remote: false,
    useResume: true,
  })
  const [resumeData, setResumeData] = useState<ResumeData | null>(null)
  const [jobListings, setJobListings] = useState<JobListing[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [isLinkedInConnected, setIsLinkedInConnected] = useState(false)
  const [activeTab, setActiveTab] = useState("search")
  const [resumeEntryMethod, setResumeEntryMethod] = useState<"upload" | "manual">("upload")

  const handleSearchParamChange = (key: keyof JobSearchParams, value: string | boolean) => {
    setSearchParams((prev) => ({
      ...prev,
      [key]: value,
    }))
  }

  const handleResumeUpload = (data: ResumeData) => {
    setResumeData(data)
  }

  const handleManualResumeChange = (field: string, value: string) => {
    if (!resumeData) {
      // Initialize with default data if null
      setResumeData({
        personalInfo: {
          name: "",
          email: "",
          phone: "",
          location: "",
          linkedin: "",
          website: "",
        },
        summary: "",
        experience: [
          {
            title: "",
            company: "",
            location: "",
            startDate: "",
            endDate: "",
            description: "",
            achievements: [""],
          },
        ],
        education: [
          {
            degree: "",
            institution: "",
            location: "",
            graduationDate: "",
            gpa: "",
            achievements: [""],
          },
        ],
        skills: [""],
        projects: [
          {
            name: "",
            description: "",
            technologies: [""],
            link: "",
          },
        ],
      })
      return
    }

    // Handle nested fields
    if (field.includes(".")) {
      const [parent, child] = field.split(".")
      setResumeData({
        ...resumeData,
        personalInfo: {
          ...resumeData.personalInfo,
          [child]: value,
        },
      })
    } else if (field === "skills") {
      setResumeData({
        ...resumeData,
        skills: value.split(",").map((skill) => skill.trim()),
      })
    } else {
      setResumeData({
        ...resumeData,
        [field]: value,
      })
    }
  }

  const handleSearch = async () => {
    setIsLoading(true)
    try {
      const results = await findJobs(searchParams, resumeData)
      // Ensure we always set an array, even if results is undefined or null
      setJobListings(results || [])
      setActiveTab("results")
    } catch (error) {
      console.error("Error finding jobs:", error)
      // Set empty array on error
      setJobListings([])
    } finally {
      setIsLoading(false)
    }
  }

  const handleConnectLinkedIn = async () => {
    try {
      const result = await connectLinkedIn()
      if (result.success) {
        setIsLinkedInConnected(true)
      }
    } catch (error) {
      console.error("Error connecting to LinkedIn:", error)
    }
  }

  return (
    <div className="space-y-6">
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="search">Search</TabsTrigger>
          <TabsTrigger value="results" disabled={jobListings.length === 0}>
            Results
          </TabsTrigger>
        </TabsList>

        <TabsContent value="search" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Job Search</CardTitle>
                  <CardDescription>Enter your job search criteria</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="job-title">Job Title</Label>
                      <Input
                        id="job-title"
                        placeholder="Software Engineer, Product Manager, etc."
                        value={searchParams.title}
                        onChange={(e) => handleSearchParamChange("title", e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="location">Location</Label>
                      <Input
                        id="location"
                        placeholder="New York, Remote, etc."
                        value={searchParams.location}
                        onChange={(e) => handleSearchParamChange("location", e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="keywords">Keywords</Label>
                    <Textarea
                      id="keywords"
                      placeholder="React, JavaScript, Product Management, etc."
                      value={searchParams.keywords}
                      onChange={(e) => handleSearchParamChange("keywords", e.target.value)}
                    />
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="remote"
                      checked={searchParams.remote}
                      onCheckedChange={(checked) => handleSearchParamChange("remote", !!checked)}
                    />
                    <Label htmlFor="remote">Remote only</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="use-resume"
                      checked={searchParams.useResume}
                      onCheckedChange={(checked) => handleSearchParamChange("useResume", !!checked)}
                    />
                    <Label htmlFor="use-resume">Use my resume to find matching jobs</Label>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" onClick={handleConnectLinkedIn} disabled={isLinkedInConnected}>
                    <Linkedin className="mr-2 h-4 w-4" />
                    {isLinkedInConnected ? "LinkedIn Connected" : "Connect LinkedIn"}
                  </Button>
                  <Button onClick={handleSearch} disabled={isLoading}>
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Searching...
                      </>
                    ) : (
                      <>
                        <Search className="mr-2 h-4 w-4" />
                        Find Jobs
                      </>
                    )}
                  </Button>
                </CardFooter>
              </Card>
            </div>

            <div>
              <Card>
                <CardHeader>
                  <CardTitle>Resume</CardTitle>
                  <CardDescription>Upload or enter your resume information</CardDescription>
                </CardHeader>
                <CardContent>
                  <Tabs
                    value={resumeEntryMethod}
                    onValueChange={(value) => setResumeEntryMethod(value as "upload" | "manual")}
                  >
                    <TabsList className="grid w-full grid-cols-2 mb-4">
                      <TabsTrigger value="upload">
                        <Upload className="h-4 w-4 mr-2" />
                        Upload
                      </TabsTrigger>
                      <TabsTrigger value="manual">
                        <FileText className="h-4 w-4 mr-2" />
                        Manual Entry
                      </TabsTrigger>
                    </TabsList>

                    <TabsContent value="upload">
                      <ResumeUpload onUpload={handleResumeUpload} />
                    </TabsContent>

                    <TabsContent value="manual">
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="skills">Key Skills (comma separated)</Label>
                          <Textarea
                            id="skills"
                            placeholder="JavaScript, React, Node.js, Project Management"
                            value={resumeData?.skills?.join(", ") || ""}
                            onChange={(e) => handleManualResumeChange("skills", e.target.value)}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="summary">Professional Summary</Label>
                          <Textarea
                            id="summary"
                            placeholder="Brief overview of your experience and expertise"
                            value={resumeData?.summary || ""}
                            onChange={(e) => handleManualResumeChange("summary", e.target.value)}
                            rows={3}
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                          <div className="space-y-2">
                            <Label htmlFor="job-title">Current/Recent Job Title</Label>
                            <Input
                              id="job-title"
                              placeholder="Software Engineer"
                              value={resumeData?.experience?.[0]?.title || ""}
                              onChange={(e) => handleManualResumeChange("experience[0].title", e.target.value)}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="company">Company</Label>
                            <Input
                              id="company"
                              placeholder="Acme Inc."
                              value={resumeData?.experience?.[0]?.company || ""}
                              onChange={(e) => handleManualResumeChange("experience[0].company", e.target.value)}
                            />
                          </div>
                        </div>
                      </div>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="results">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Job Results</CardTitle>
                  <CardDescription>Found {jobListings.length} jobs matching your criteria</CardDescription>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="h-[600px] pr-4">
                    <div className="space-y-4">
                      {jobListings.map((job) => (
                        <JobListingCard key={job.id} job={job} />
                      ))}
                    </div>
                  </ScrollArea>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" onClick={() => setActiveTab("search")} className="w-full">
                    Refine Search
                  </Button>
                </CardFooter>
              </Card>
            </div>

            <div>
              <Card>
                <CardHeader>
                  <CardTitle>Job Match Analysis</CardTitle>
                  <CardDescription>AI-powered insights</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium">Skills Match</span>
                      <span className="text-sm font-medium">75%</span>
                    </div>
                    <Progress value={75} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium">Experience Match</span>
                      <span className="text-sm font-medium">82%</span>
                    </div>
                    <Progress value={82} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium">Education Match</span>
                      <span className="text-sm font-medium">90%</span>
                    </div>
                    <Progress value={90} className="h-2" />
                  </div>

                  <Separator />

                  <div>
                    <h4 className="font-medium mb-2">Top Missing Skills</h4>
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="outline">Docker</Badge>
                      <Badge variant="outline">Kubernetes</Badge>
                      <Badge variant="outline">AWS</Badge>
                      <Badge variant="outline">GraphQL</Badge>
                    </div>
                  </div>

                  <Alert>
                    <AlertDescription>
                      Based on your resume, consider highlighting your experience with React and Node.js when applying
                      to these positions.
                    </AlertDescription>
                  </Alert>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
