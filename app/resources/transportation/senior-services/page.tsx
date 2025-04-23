import { Bus } from "lucide-react"
import ResourceDetailTemplate from "@/components/resource-detail-template"

export default function SeniorTransportationPage() {
  return (
    <ResourceDetailTemplate
      title="Senior Transportation Services"
      category="Transportation"
      description="Free and reduced-cost transportation options for seniors and disabled individuals. These services help seniors maintain independence and access essential services like medical appointments, grocery shopping, and social activities. Options include paratransit services, volunteer driver programs, senior shuttles, and transportation vouchers."
      icon={<Bus size={24} />}
      apiTopic="senior-transportation"
      externalLink={{
        url: "https://eldercare.acl.gov/Public/Index.aspx",
        text: "Eldercare Locator",
      }}
    />
  )
}
