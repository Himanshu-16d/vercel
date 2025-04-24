"use server"

import { generateText } from "ai"
import { groq } from "@ai-sdk/groq"
import type { ResumeData, JobTarget, ResumeEnhancementResult } from "@/types/resume"

// Initialize Groq client with API key
const groqClient = groq(process.env.GROQ_API_KEY!)

export async function enhanceResume(resumeData: ResumeData, jobTarget: JobTarget): Promise<ResumeEnhancementResult> {
  try {
    // Convert resume data to a string format for the AI
    const resumeString = JSON.stringify(resumeData, null, 2)
    const jobTargetString = JSON.stringify(jobTarget, null, 2)

    // Generate enhanced resume using Groq
    const { text } = await generateText({
      model: groqClient("deepseek-r1-distill-llama-70b"),
      prompt: `
        You are an expert resume writer and career coach. Your task is to enhance the following resume to make it more effective for the target job.
        
        RESUME DATA:
        ${resumeString}
        
        TARGET JOB:
        ${jobTargetString}
        
        Please analyze the resume and the target job, then:
        1. Enhance the resume content to better align with the target job
        2. Improve the wording and impact of bullet points
        3. Highlight relevant skills and experiences
        4. Provide specific feedback on how to improve the resume further
        5. Score the resume's match with the target job on a scale of 0-100
        
        IMPORTANT: You MUST respond with ONLY a valid JSON object and nothing else. No explanations, no markdown, no text before or after the JSON.
        
        The JSON must have the following structure:
        {
          "enhancedResume": {
            // Enhanced resume data with the same structure as the input
          },
          "feedback": "Detailed feedback with specific suggestions for improvement",
          "score": 75 // Score from 0-100
        }
      `,
      system:
        "You are an expert resume writer and career coach specializing in optimizing resumes for specific job targets. You provide detailed, actionable feedback and make strategic improvements to resumes. You ALWAYS respond with valid JSON only.",
    })

    // Try to parse the response as JSON
    try {
      // First, try to parse the response directly
      return JSON.parse(text) as ResumeEnhancementResult
    } catch (parseError) {
      console.error("Failed to parse initial response:", parseError)

      // Try to extract JSON from the response if it contains other text
      const jsonMatch = text.match(/\{[\s\S]*\}/)
      if (jsonMatch) {
        try {
          return JSON.parse(jsonMatch[0]) as ResumeEnhancementResult
        } catch (extractError) {
          console.error("Failed to extract JSON from response:", extractError)
        }
      }

      // If we still can't parse the JSON, make a second attempt with a more direct prompt
      const { text: retryText } = await generateText({
        model: groqClient("deepseek-r1-distill-llama-70b"),
        prompt: `
          Convert the following resume data to an enhanced version for the target job.
          
          RESUME DATA:
          ${resumeString}
          
          TARGET JOB:
          ${jobTargetString}
          
          RESPOND ONLY WITH A VALID JSON OBJECT IN THIS EXACT FORMAT:
          {
            "enhancedResume": ${resumeString},
            "feedback": "Brief feedback here",
            "score": 70
          }
          
          DO NOT include any text before or after the JSON. ONLY return the JSON object.
        `,
        system: "You are a JSON formatting assistant. You only respond with valid JSON objects and nothing else.",
      })

      try {
        return JSON.parse(retryText) as ResumeEnhancementResult
      } catch (retryError) {
        // If all else fails, return the original resume with generic feedback
        console.error("Failed to parse retry response:", retryError)
        return {
          enhancedResume: resumeData,
          feedback:
            "We encountered an issue enhancing your resume. Please try again or make manual improvements based on the job description.",
          score: 50,
        }
      }
    }
  } catch (error) {
    console.error("Error enhancing resume:", error)
    // Return the original resume with an error message
    return {
      enhancedResume: resumeData,
      feedback: "We encountered an error while processing your resume. Please try again later.",
      score: 0,
    }
  }
}

export async function scoreResume(
  resumeData: ResumeData,
  jobTarget: JobTarget,
): Promise<{ score: number; feedback: string }> {
  try {
    // Convert resume data to a string format for the AI
    const resumeString = JSON.stringify(resumeData, null, 2)
    const jobTargetString = JSON.stringify(jobTarget, null, 2)

    // Generate score and feedback using Groq
    const { text } = await generateText({
      model: groqClient("deepseek-r1-distill-llama-70b"),
      prompt: `
        You are an expert resume reviewer and ATS (Applicant Tracking System) specialist. Your task is to score the following resume for the target job and provide detailed feedback.
        
        RESUME DATA:
        ${resumeString}
        
        TARGET JOB:
        ${jobTargetString}
        
        Please analyze the resume and the target job, then:
        1. Score the resume's match with the target job on a scale of 0-100
        2. Provide detailed feedback on the resume's strengths and weaknesses
        3. Suggest specific improvements to increase the score
        
        IMPORTANT: You MUST respond with ONLY a valid JSON object and nothing else. No explanations, no markdown, no text before or after the JSON.
        
        The JSON must have the following structure:
        {
          "score": 75, // Score from 0-100
          "feedback": "Detailed feedback with specific suggestions for improvement"
        }
      `,
      system:
        "You are an expert resume reviewer and ATS specialist who provides accurate scoring and actionable feedback. You ALWAYS respond with valid JSON only.",
    })

    // Try to parse the response as JSON
    try {
      // First, try to parse the response directly
      return JSON.parse(text) as { score: number; feedback: string }
    } catch (parseError) {
      console.error("Failed to parse initial response:", parseError)

      // Try to extract JSON from the response if it contains other text
      const jsonMatch = text.match(/\{[\s\S]*\}/)
      if (jsonMatch) {
        try {
          return JSON.parse(jsonMatch[0]) as { score: number; feedback: string }
        } catch (extractError) {
          console.error("Failed to extract JSON from response:", extractError)
        }
      }

      // If all else fails, return a generic response
      return {
        score: 50,
        feedback:
          "We encountered an issue scoring your resume. Please try again or make manual improvements based on the job description.",
      }
    }
  } catch (error) {
    console.error("Error scoring resume:", error)
    return {
      score: 0,
      feedback: "We encountered an error while processing your resume. Please try again later.",
    }
  }
}

// Update the parseResume function to handle token limits
export async function parseResume(resumeText: string): Promise<ResumeData> {
  try {
    // Truncate the resume text to avoid token limit errors
    // Approximately 3000 tokens is around 4000-5000 characters for English text
    const truncatedText = truncateResumeText(resumeText, 4000)

    console.log(`Original resume length: ${resumeText.length}, Truncated length: ${truncatedText.length}`)

    // Generate parsed resume using Groq with a more concise prompt
    const { text } = await generateText({
      model: groqClient("deepseek-r1-distill-llama-70b"),
      prompt: `
        Extract structured information from this resume text and format it as JSON.
        
        RESUME TEXT:
        ${truncatedText}
        
        Return ONLY a JSON object with this structure:
        {
          "personalInfo": {
            "name": "",
            "email": "",
            "phone": "",
            "location": "",
            "linkedin": "",
            "website": ""
          },
          "summary": "",
          "experience": [
            {
              "title": "",
              "company": "",
              "location": "",
              "startDate": "",
              "endDate": "",
              "description": "",
              "achievements": [""]
            }
          ],
          "education": [
            {
              "degree": "",
              "institution": "",
              "location": "",
              "graduationDate": "",
              "gpa": "",
              "achievements": [""]
            }
          ],
          "skills": [""],
          "projects": [
            {
              "name": "",
              "description": "",
              "technologies": [""],
              "link": ""
            }
          ]
        }
      `,
      system:
        "You are a resume parser that extracts key information from resumes. Be concise and focus on the most important details.",
      maxTokens: 2000, // Limit the response size
    })

    // Try to parse the response as JSON
    try {
      // First, try to parse the response directly
      return JSON.parse(text) as ResumeData
    } catch (parseError) {
      console.error("Failed to parse initial response:", parseError)

      // Try to extract JSON from the response if it contains other text
      const jsonMatch = text.match(/\{[\s\S]*\}/)
      if (jsonMatch) {
        try {
          return JSON.parse(jsonMatch[0]) as ResumeData
        } catch (extractError) {
          console.error("Failed to extract JSON from response:", extractError)
        }
      }

      // If all else fails, try a simpler approach with just basic information
      return extractBasicResumeInfo(resumeText)
    }
  } catch (error) {
    console.error("Error parsing resume:", error)

    // If we hit a token limit error, try the basic extraction approach
    if (error.toString().includes("token") || error.toString().includes("too large")) {
      console.log("Token limit exceeded, falling back to basic extraction")
      return extractBasicResumeInfo(resumeText)
    }

    return getDefaultResumeData()
  }
}

// Helper function to truncate resume text intelligently
function truncateResumeText(text: string, maxLength: number): string {
  if (text.length <= maxLength) {
    return text
  }

  // Split the text into sections to prioritize important parts
  const sections = text.split(/\n\s*\n/)
  let result = ""

  // Always include the first section (usually contact info)
  if (sections.length > 0) {
    result += sections[0] + "\n\n"
  }

  // Try to include experience and education sections
  const experienceSectionIndex = findSectionIndex(sections, ["experience", "work", "employment"])
  const educationSectionIndex = findSectionIndex(sections, ["education", "academic", "university"])
  const skillsSectionIndex = findSectionIndex(sections, ["skills", "technologies", "competencies"])

  // Add experience section (most important)
  if (experienceSectionIndex >= 0) {
    result += sections[experienceSectionIndex] + "\n\n"
  }

  // Add education section
  if (educationSectionIndex >= 0 && result.length + sections[educationSectionIndex].length < maxLength) {
    result += sections[educationSectionIndex] + "\n\n"
  }

  // Add skills section
  if (skillsSectionIndex >= 0 && result.length + sections[skillsSectionIndex].length < maxLength) {
    result += sections[skillsSectionIndex] + "\n\n"
  }

  // If we still have room, add other sections
  for (let i = 0; i < sections.length; i++) {
    if (i !== 0 && i !== experienceSectionIndex && i !== educationSectionIndex && i !== skillsSectionIndex) {
      if (result.length + sections[i].length < maxLength) {
        result += sections[i] + "\n\n"
      }
    }
  }

  // Final truncation if still too long
  if (result.length > maxLength) {
    result = result.substring(0, maxLength)
  }

  return result
}

// Helper function to find section indices
function findSectionIndex(sections: string[], keywords: string[]): number {
  for (let i = 0; i < sections.length; i++) {
    const sectionLower = sections[i].toLowerCase()
    if (keywords.some((keyword) => sectionLower.includes(keyword))) {
      return i
    }
  }
  return -1
}

// Function to extract basic resume information without using AI
function extractBasicResumeInfo(resumeText: string): ResumeData {
  const lines = resumeText
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line.length > 0)
  const result = getDefaultResumeData()

  // Try to extract name (usually one of the first lines)
  if (lines.length > 0) {
    // Assume the first line that's not an email or phone is the name
    for (let i = 0; i < Math.min(5, lines.length); i++) {
      if (!lines[i].includes("@") && !lines[i].match(/\d{3}[-.\s]?\d{3}[-.\s]?\d{4}/)) {
        result.personalInfo.name = lines[i]
        break
      }
    }
  }

  // Try to extract email
  const emailMatch = resumeText.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/)
  if (emailMatch) {
    result.personalInfo.email = emailMatch[0]
  }

  // Try to extract phone
  const phoneMatch = resumeText.match(/(\+\d{1,3}[-.\s]?)?(\d{3}[-.\s]?\d{3}[-.\s]?\d{4})/)
  if (phoneMatch) {
    result.personalInfo.phone = phoneMatch[0]
  }

  // Try to extract LinkedIn
  const linkedinMatch = resumeText.match(/linkedin\.com\/in\/[a-zA-Z0-9_-]+/)
  if (linkedinMatch) {
    result.personalInfo.linkedin = linkedinMatch[0]
  }

  // Extract skills (look for common skill keywords)
  const skillKeywords = [
    "JavaScript",
    "Python",
    "Java",
    "C++",
    "React",
    "Angular",
    "Vue",
    "Node.js",
    "HTML",
    "CSS",
    "SQL",
    "NoSQL",
    "AWS",
    "Azure",
    "GCP",
    "Docker",
    "Kubernetes",
    "Git",
    "Agile",
    "Scrum",
    "Project Management",
    "Leadership",
    "Communication",
  ]

  const skills = skillKeywords.filter((skill) => resumeText.toLowerCase().includes(skill.toLowerCase()))

  if (skills.length > 0) {
    result.skills = skills
  }

  return result
}

// Helper function to get default resume data
function getDefaultResumeData(): ResumeData {
  return {
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
  }
}
