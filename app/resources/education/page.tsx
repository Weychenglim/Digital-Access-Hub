import { GraduationCap } from "lucide-react"
import CategoryPageTemplate from "@/components/category-page-template"

export default function EducationPage() {
  return (
    <CategoryPageTemplate
      category="education"
      title="Education Resources"
      description="Learn about educational opportunities, classes, and training programs. Education resources include information about adult education classes, GED programs, vocational training, college courses, and online learning opportunities. These resources are designed to help you develop new skills and advance your education."
      icon={<GraduationCap size={24} />}
    />
  )
}