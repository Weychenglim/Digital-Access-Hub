import { Home } from "lucide-react"
import CategoryPageTemplate from "@/components/category-page-template"

export default function HousingPage() {
  return (
    <CategoryPageTemplate
      category="housing"
      title="Housing Resources"
      description="Find information about affordable housing, rental assistance, and home services. Housing resources include information about affordable housing options, rental assistance programs, home repair services, utility assistance, and homelessness prevention. These resources are designed to help you find and maintain safe, affordable housing."
      icon={<Home size={24} />}
    />
  )
}