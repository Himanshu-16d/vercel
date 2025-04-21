"use client"

import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import type { JobTarget } from "@/types/resume"

interface JobTargetingProps {
  jobTarget: JobTarget
  onChange: (data: JobTarget) => void
}

export default function JobTargeting({ jobTarget, onChange }: JobTargetingProps) {
  const updateField = (field: keyof JobTarget, value: string) => {
    onChange({
      ...jobTarget,
      [field]: value,
    })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Target Job Information</CardTitle>
        <CardDescription>Provide details about the job you're applying for to optimize your resume</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label htmlFor="job-title" className="text-sm font-medium">
              Job Title
            </label>
            <Input
              id="job-title"
              value={jobTarget.title}
              onChange={(e) => updateField("title", e.target.value)}
              placeholder="Software Engineer"
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="company" className="text-sm font-medium">
              Company (optional)
            </label>
            <Input
              id="company"
              value={jobTarget.company}
              onChange={(e) => updateField("company", e.target.value)}
              placeholder="Tech Company Inc."
            />
          </div>
        </div>
        <div className="space-y-2">
          <label htmlFor="industry" className="text-sm font-medium">
            Industry
          </label>
          <Input
            id="industry"
            value={jobTarget.industry}
            onChange={(e) => updateField("industry", e.target.value)}
            placeholder="Technology, Finance, Healthcare, etc."
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="job-description" className="text-sm font-medium">
            Job Description
          </label>
          <Textarea
            id="job-description"
            value={jobTarget.description}
            onChange={(e) => updateField("description", e.target.value)}
            placeholder="Paste the job description here or describe the key requirements..."
            rows={5}
          />
        </div>
      </CardContent>
    </Card>
  )
}
