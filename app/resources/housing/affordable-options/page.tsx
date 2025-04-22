import { Home } from "lucide-react"
import ResourceDetailTemplate from "@/components/resource-detail-template"

export default function AffordableHousingPage() {
  return (
    <ResourceDetailTemplate
      title="Affordable Housing Options"
      category="Housing"
      description="Find information about low-income housing, rental assistance, and housing vouchers. These programs help individuals and families with limited income find safe and affordable places to live. Resources include Section 8 vouchers, public housing, subsidized apartments, and other housing assistance programs."
      icon={<Home size={24} />}
      apiTopic="affordable-housing"
      externalLink={{
        url: "https://www.hud.gov/topics/rental_assistance",
        text: "HUD Rental Assistance",
      }}
    />
  )
}
