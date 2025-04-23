import { GraduationCap } from "lucide-react"
import ResourceDetailTemplate from "@/components/resource-detail-template"

export default function AdultEducationPage() {
  return (
    <ResourceDetailTemplate
      title="Adult Education Programs"
      category="Education"
      description="GED classes, vocational training, and continuing education opportunities. These programs help adults improve their skills, earn credentials, and advance their careers. Options include high school equivalency preparation, career training, literacy programs, and college courses designed for adult learners."
      icon={<GraduationCap size={24} />}
      apiTopic="adult-education"
      externalLink={{
        url: "https://www.ed.gov/adult-education",
        text: "Adult Education Resources",
      }}
    />
  )
}
