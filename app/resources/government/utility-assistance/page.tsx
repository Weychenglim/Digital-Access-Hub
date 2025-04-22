import { Lightbulb } from "lucide-react"
import ResourceDetailTemplate from "@/components/resource-detail-template"

export default function UtilityAssistancePage() {
  return (
    <ResourceDetailTemplate
      title="Utility Bill Assistance"
      category="Government"
      description="Programs to help with electricity, water, and heating costs for low-income households. These assistance programs help ensure that families can maintain essential utilities even when facing financial hardship. Resources include LIHEAP (Low Income Home Energy Assistance Program), weatherization assistance, utility company discount programs, and emergency utility payment assistance."
      icon={<Lightbulb size={24} />}
      apiTopic="utility-assistance"
      externalLink={{
        url: "https://www.benefits.gov/benefit/623",
        text: "LIHEAP Program",
      }}
    />
  )
}
