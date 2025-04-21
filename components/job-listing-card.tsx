import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Building, MapPin, Calendar, ExternalLink } from "lucide-react"
import type { JobListing } from "@/types/resume"

interface JobListingCardProps {
  job: JobListing
}

export default function JobListingCard({ job }: JobListingCardProps) {
  // Add a null check to ensure job exists
  if (!job) {
    return null
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-start justify-between">
          <div>
            <CardTitle>{job.title}</CardTitle>
            <CardDescription className="flex items-center mt-1">
              <Building className="h-4 w-4 mr-1" />
              {job.company}
            </CardDescription>
          </div>
          <Badge variant={job.matchScore >= 80 ? "default" : "outline"}>{job.matchScore}% Match</Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-wrap gap-2 text-sm text-muted-foreground">
          <div className="flex items-center">
            <MapPin className="h-4 w-4 mr-1" />
            {job.location}
          </div>
          <div className="flex items-center">
            <Calendar className="h-4 w-4 mr-1" />
            {job.postedDate}
          </div>
          {job.salary && (
            <div className="flex items-center">
              <span className="font-medium">{job.salary}</span>
            </div>
          )}
        </div>

        <p className="text-sm line-clamp-3">{job.description}</p>

        <div className="flex flex-wrap gap-2">
          {/* Add a check to ensure job.skills exists and is an array before mapping */}
          {job.skills &&
            Array.isArray(job.skills) &&
            job.skills.map((skill) => (
              <Badge key={skill} variant="secondary">
                {skill}
              </Badge>
            ))}
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" size="sm">
          Save
        </Button>
        <Button size="sm" asChild>
          <a href={job.url} target="_blank" rel="noopener noreferrer">
            Apply <ExternalLink className="h-3.5 w-3.5 ml-1" />
          </a>
        </Button>
      </CardFooter>
    </Card>
  )
}
