import { HeartPulse } from "lucide-react"
import CategoryPageTemplate from "@/components/category-page-template"

export default function HealthcarePage() {
  return (
    <CategoryPageTemplate
      category="healthcare"
      title="Healthcare Resources"
      description="Find healthcare providers, insurance information, and wellness resources. Healthcare resources include information about medical services, health insurance options, preventive care, mental health services, and more. These resources are designed to help you maintain your health and access the care you need."
      icon={<HeartPulse size={24} />}
    />
  )
}