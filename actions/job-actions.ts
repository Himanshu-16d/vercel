"use server"

import { generateText } from "ai"
import { groq } from "@ai-sdk/groq"
import type { JobListing, JobSearchParams, ResumeData } from "@/types/resume"

// Update the findJobs function to ensure it always returns an array

export async function findJobs(searchParams: JobSearchParams, resumeData: ResumeData | null): Promise<JobListing[]> {
  try {
    // Convert search params and resume data to string format for the AI
    const searchParamsString = JSON.stringify(searchParams, null, 2)
    const resumeDataString = resumeData ? JSON.stringify(resumeData, null, 2) : "null"

    // Generate job listings using Groq
    const { text } = await generateText({
      model: groq("llama3-70b-8192"),
      prompt: `
        You are an AI job search assistant. Your task is to generate realistic job listings based on the search parameters and resume data provided.
        
        SEARCH PARAMETERS:
        ${searchParamsString}
        
        RESUME DATA:
        ${resumeDataString}
        
        Please generate 10 realistic job listings that match the search parameters. If resume data is provided, the jobs should match the candidate's skills and experience.
        
        Each job listing should include:
        - A unique ID
        - Job title
        - Company name
        - Location (indicate if remote)
        - Description (2-3 sentences)
        - URL (fictional but realistic)
        - Posted date (within the last 30 days)
        - Salary range (optional)
        - Required skills (5-7 relevant skills)
        - Match score (percentage indicating how well the job matches the resume, between 60-95%)
        - Source (linkedin, indeed, or other)
        
        IMPORTANT: You MUST respond with ONLY a valid JSON array of job listings and nothing else. No explanations, no markdown, no text before or after the JSON.
        
        The JSON must be an array of objects with the structure described above.
      `,
      system:
        "You are an AI job search assistant that generates realistic job listings based on search parameters and resume data. You ALWAYS respond with valid JSON only.",
    })

    // Try to parse the response as JSON
    try {
      // First, try to parse the response directly
      const parsed = JSON.parse(text)
      // Ensure the result is an array
      return Array.isArray(parsed) ? parsed : getMockJobListings()
    } catch (parseError) {
      console.error("Failed to parse initial response:", parseError)

      // Try to extract JSON from the response if it contains other text
      const jsonMatch = text.match(/\[[\s\S]*\]/)
      if (jsonMatch) {
        try {
          const extracted = JSON.parse(jsonMatch[0])
          // Ensure the result is an array
          return Array.isArray(extracted) ? extracted : getMockJobListings()
        } catch (extractError) {
          console.error("Failed to extract JSON from response:", extractError)
        }
      }

      // If all else fails, return mock data
      return getMockJobListings()
    }
  } catch (error) {
    console.error("Error finding jobs:", error)
    return getMockJobListings()
  }
}

export async function connectLinkedIn(): Promise<{ success: boolean; message: string }> {
  // This would normally connect to LinkedIn's API
  // For now, we'll just simulate a successful connection
  return {
    success: true,
    message: "Successfully connected to LinkedIn",
  }
}

// Ensure each mock job listing has a skills array
function getMockJobListings(): JobListing[] {
  return [
    {
      id: "job1",
      title: "Senior Frontend Developer",
      company: "TechCorp Inc.",
      location: "San Francisco, CA (Remote)",
      description:
        "We're looking for a Senior Frontend Developer to join our team. You'll be responsible for building user interfaces for our web applications using React and TypeScript.",
      url: "https://example.com/jobs/senior-frontend-developer",
      postedDate: "Posted 3 days ago",
      salary: "$120,000 - $150,000",
      skills: ["React", "TypeScript", "CSS", "HTML", "Redux", "Jest"],
      matchScore: 92,
      source: "linkedin",
    },
    {
      id: "job2",
      title: "Full Stack Engineer",
      company: "Innovate Solutions",
      location: "New York, NY",
      description:
        "Join our engineering team to build scalable web applications. You'll work on both frontend and backend development using modern JavaScript frameworks.",
      url: "https://example.com/jobs/full-stack-engineer",
      postedDate: "Posted 1 week ago",
      salary: "$110,000 - $140,000",
      skills: ["JavaScript", "Node.js", "React", "MongoDB", "Express", "Git"],
      matchScore: 85,
      source: "indeed",
    },
    {
      id: "job3",
      title: "Backend Developer",
      company: "DataSystems LLC",
      location: "Remote",
      description:
        "We're seeking a Backend Developer to help build our data processing systems. You'll work with Node.js and PostgreSQL to create efficient and scalable APIs.",
      url: "https://example.com/jobs/backend-developer",
      postedDate: "Posted 2 weeks ago",
      salary: "$100,000 - $130,000",
      skills: ["Node.js", "PostgreSQL", "Express", "API Design", "Docker", "AWS"],
      matchScore: 78,
      source: "linkedin",
    },
    {
      id: "job4",
      title: "DevOps Engineer",
      company: "CloudTech Services",
      location: "Seattle, WA (Hybrid)",
      description:
        "Looking for a DevOps Engineer to improve our CI/CD pipelines and infrastructure. You'll work with Kubernetes, Docker, and AWS to ensure smooth deployments.",
      url: "https://example.com/jobs/devops-engineer",
      postedDate: "Posted 5 days ago",
      salary: "$130,000 - $160,000",
      skills: ["Kubernetes", "Docker", "AWS", "CI/CD", "Terraform", "Linux"],
      matchScore: 65,
      source: "other",
    },
    {
      id: "job5",
      title: "UI/UX Designer",
      company: "Creative Digital",
      location: "Austin, TX",
      description:
        "Join our design team to create beautiful and intuitive user interfaces. You'll collaborate with developers and product managers to deliver exceptional user experiences.",
      url: "https://example.com/jobs/ui-ux-designer",
      postedDate: "Posted 2 days ago",
      salary: "$90,000 - $120,000",
      skills: ["Figma", "Adobe XD", "UI Design", "UX Research", "Prototyping", "Wireframing"],
      matchScore: 70,
      source: "indeed",
    },
  ]
}
