import { Stethoscope } from "lucide-react"
import ResourceDetailTemplate from "@/components/resource-detail-template"

export default function HealthScreeningsPage() {
  return (
    <ResourceDetailTemplate
      title="Free Health Screenings"
      category="Healthcare"
      description="Information about free and low-cost health screenings in your community. Preventive screenings can detect health issues early when they're easier to treat. Resources include community health fairs, mobile screening units, federally qualified health centers, and hospital outreach programs offering services like blood pressure checks, cholesterol testing, diabetes screening, and more."
      icon={<Stethoscope size={24} />}
      apiTopic="health-screenings"
      externalLink={{
        url: "https://findahealthcenter.hrsa.gov/",
        text: "Find a Health Center",
      }}
    />
  )
}
