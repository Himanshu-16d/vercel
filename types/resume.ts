export interface PersonalInfo {
  name: string
  email: string
  phone: string
  location: string
  linkedin: string
  website: string
}

export interface Experience {
  title: string
  company: string
  location: string
  startDate: string
  endDate: string
  description: string
  achievements: string[]
}

export interface Education {
  degree: string
  institution: string
  location: string
  graduationDate: string
  gpa: string
  achievements: string[]
}

export interface Project {
  name: string
  description: string
  technologies: string[]
  link: string
}

export interface ResumeData {
  personalInfo: PersonalInfo
  summary: string
  experience: Experience[]
  education: Education[]
  skills: string[]
  projects: Project[]
}

export interface JobTarget {
  title: string
  description: string
  company: string
  industry: string
}

export interface ResumeEnhancementResult {
  enhancedResume: ResumeData
  feedback: string
  score: number
}

// Job-related types
export interface JobListing {
  id: string
  title: string
  company: string
  location: string
  description: string
  url: string
  postedDate: string
  salary?: string
  skills: string[]
  matchScore: number
  source: "linkedin" | "indeed" | "other"
}

export interface JobSearchParams {
  title: string
  location: string
  keywords: string
  remote: boolean
  useResume: boolean
}

export interface LinkedInProfile {
  id: string
  name: string
  headline: string
  profileUrl: string
  connections: number
}
