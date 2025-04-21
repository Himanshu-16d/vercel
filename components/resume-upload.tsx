"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Upload, FileText, Check, AlertCircle } from "lucide-react"
import type { ResumeData } from "@/types/resume"
import { parseResume } from "@/actions/resume-actions"
import { Alert, AlertDescription } from "@/components/ui/alert"

interface ResumeUploadProps {
  onUpload: (resumeData: ResumeData) => void
}

export default function ResumeUpload({ onUpload }: ResumeUploadProps) {
  const [isUploading, setIsUploading] = useState(false)
  const [isUploaded, setIsUploaded] = useState(false)
  const [fileName, setFileName] = useState("")
  const [error, setError] = useState<string | null>(null)

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setIsUploading(true)
    setFileName(file.name)
    setError(null)

    try {
      // Check file size - limit to 1MB to avoid token issues
      if (file.size > 1024 * 1024) {
        throw new Error(
          "File size exceeds 1MB. Please upload a smaller file or manually enter your resume information.",
        )
      }

      // Convert file to text
      const text = await file.text()

      // Check text length
      if (text.length > 10000) {
        throw new Error("Resume text is too long. Please upload a shorter resume or manually enter your information.")
      }

      // Parse resume using AI
      const resumeData = await parseResume(text)

      // Call the onUpload callback with the parsed resume data
      onUpload(resumeData)

      setIsUploaded(true)
    } catch (error) {
      console.error("Error parsing resume:", error)
      setError(error.message || "Failed to parse resume. Please try again or manually enter your information.")
    } finally {
      setIsUploading(false)
    }
  }

  return (
    <div className="space-y-4">
      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <div className="flex flex-col items-center justify-center">
        <label
          htmlFor="resume-upload"
          className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-background hover:bg-muted/50"
        >
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            {isUploaded ? (
              <>
                <Check className="w-8 h-8 text-green-500 mb-2" />
                <p className="text-sm text-muted-foreground">Resume uploaded</p>
              </>
            ) : (
              <>
                <Upload className="w-8 h-8 text-muted-foreground mb-2" />
                <p className="text-sm text-muted-foreground">
                  <span className="font-semibold">Click to upload</span> or drag and drop
                </p>
                <p className="text-xs text-muted-foreground">PDF, DOCX, or TXT (max 1MB)</p>
              </>
            )}
          </div>
          <input
            id="resume-upload"
            type="file"
            className="hidden"
            accept=".pdf,.docx,.txt"
            onChange={handleFileChange}
            disabled={isUploading}
          />
        </label>
      </div>

      {fileName && (
        <div className="flex items-center justify-between p-2 border rounded-lg">
          <div className="flex items-center">
            <FileText className="h-4 w-4 mr-2 text-muted-foreground" />
            <span className="text-sm truncate max-w-[150px]">{fileName}</span>
          </div>
          {isUploaded && <Check className="h-4 w-4 text-green-500" />}
        </div>
      )}

      <div className="text-center">
        <Button variant="link" size="sm" className="text-xs">
          Use resume from builder
        </Button>
      </div>
    </div>
  )
}
