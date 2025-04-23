import { Users } from "lucide-react"
import CategoryPageTemplate from "@/components/category-page-template"

export default function CommunityEventsPage() {
  return (
    <CategoryPageTemplate
      category="community"
      title="Community Events"
      description="Discover local events, workshops, and social gatherings in your area. Community events include activities like classes, workshops, support groups, social gatherings, and volunteer opportunities. These events are designed to help you connect with others, learn new skills, and engage with your community."
      icon={<Users size={24} />}
    />
  )
}
