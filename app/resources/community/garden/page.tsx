import { Flower2 } from "lucide-react"
import ResourceDetailTemplate from "@/components/resource-detail-template"

export default function CommunityGardenPage() {
  return (
    <ResourceDetailTemplate
      title="Community Garden Program"
      category="Community"
      description="Join a local community garden to grow your own fresh produce and connect with neighbors. Community gardens provide space for people to grow food, learn gardening skills, and build community connections. Benefits include access to fresh produce, physical activity, education opportunities, and strengthened neighborhood bonds."
      icon={<Flower2 size={24} />}
      apiTopic="community-garden"
      externalLink={{
        url: "https://www.communitygarden.org/garden",
        text: "Find a Community Garden",
      }}
    />
  )
}
