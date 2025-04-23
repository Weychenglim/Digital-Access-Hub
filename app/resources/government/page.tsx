import { Building2 } from "lucide-react"
import CategoryPageTemplate from "@/components/category-page-template"

export default function GovernmentServicesPage() {
  return (
    <CategoryPageTemplate
      category="government"
      title="Government Services"
      description="Access information about benefits, assistance programs, and public services. Government services include programs like Social Security, Medicare, Medicaid, SNAP (food stamps), housing assistance, and more. These programs are designed to help individuals and families meet their basic needs and improve their quality of life."
      icon={<Building2 size={24} />}
      apiTopic="government"
    />
  )
}