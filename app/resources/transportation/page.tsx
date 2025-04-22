import { Bus } from "lucide-react"
import CategoryPageTemplate from "@/components/category-page-template"

export default function TransportationPage() {
  return (
    <CategoryPageTemplate
      category="transportation"
      title="Transportation Services"
      description="Access transportation services, discounts, and assistance programs. Transportation services include information about public transit, paratransit services, ride-sharing programs, transportation vouchers, and driver safety programs. These services are designed to help you get where you need to go safely and affordably."
      icon={<Bus size={24} />}
    />
  )
}
