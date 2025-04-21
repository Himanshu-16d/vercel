"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import ResumeForm from "@/components/resume-form"
import ResumePreview from "@/components/resume-preview"
import JobTargeting from "@/components/job-targeting"
import type { ResumeData, JobTarget } from "@/types/resume"
import { enhanceResume } from "@/actions/resume-actions"
import { Loader2 } from "lucide-react"

export default function ResumeBuilder() {
  const [resumeData, setResumeData] = useState<ResumeData>({
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

  const [jobTarget, setJobTarget] = useState<JobTarget>({
    title: "",
    description: "",
    company: "",
    industry: "",
  })

  const [enhancedResume, setEnhancedResume] = useState<ResumeData | null>(null)
  const [feedback, setFeedback] = useState<string>("")
  const [score, setScore] = useState<number | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [activeTab, setActiveTab] = useState("edit")

  const handleResumeChange = (newData: ResumeData) => {
    setResumeData(newData)
  }

  const handleJobTargetChange = (newTarget: JobTarget) => {
    setJobTarget(newTarget)
  }

  const handleEnhanceResume = async () => {
    setIsLoading(true)
    try {
      const result = await enhanceResume(resumeData, jobTarget)
      setEnhancedResume(result.enhancedResume)
      setFeedback(result.feedback)
      setScore(result.score)
      setActiveTab("preview")
    } catch (error) {
      console.error("Error enhancing resume:", error)
      // Show error in the UI
      setFeedback("We encountered an error while enhancing your resume. Please try again later.")
      setScore(0)
      // Still show preview with original resume
      setEnhancedResume(resumeData)
      setActiveTab("preview")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="edit">Edit Resume</TabsTrigger>
          <TabsTrigger value="preview" disabled={!enhancedResume}>
            Preview
          </TabsTrigger>
        </TabsList>

        <TabsContent value="edit" className="space-y-6">
          <JobTargeting jobTarget={jobTarget} onChange={handleJobTargetChange} />

          <ResumeForm resumeData={resumeData} onChange={handleResumeChange} />

          <div className="flex justify-end">
            <Button onClick={handleEnhanceResume} disabled={isLoading} size="lg">
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Enhancing Resume...
                </>
              ) : (
                "Enhance Resume with AI"
              )}
            </Button>
          </div>
        </TabsContent>

        <TabsContent value="preview">
          {enhancedResume && (
            <ResumePreview resumeData={enhancedResume} feedback={feedback} score={score} jobTarget={jobTarget} />
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
