import Link from "next/link"
import { Filter } from "lucide-react"
import SearchBar from "@/components/search-bar"
import ResourceCard from "@/components/resource-card"

// This would typically come from a database
const resources = [
  {
    id: 1,
    title: "Medicare Enrollment Assistance",
    category: "Healthcare",
    description: "Get help signing up for Medicare benefits and understanding your coverage options.",
    link: "/resources/healthcare/medicare",
  },
  {
    id: 2,
    title: "Food Assistance Programs",
    category: "Government",
    description: "Information about SNAP benefits, food banks, and meal delivery services in your area.",
    link: "/resources/government/food-assistance",
  },
  {
    id: 3,
    title: "Free Computer Classes",
    category: "Community",
    description: "Weekly classes at the community center to help you learn basic computer skills.",
    link: "/resources/community/computer-classes",
  },
  {
    id: 4,
    title: "Affordable Housing Options",
    category: "Housing",
    description: "Find information about low-income housing, rental assistance, and housing vouchers.",
    link: "/resources/housing/affordable-options",
  },
  {
    id: 5,
    title: "Senior Transportation Services",
    category: "Transportation",
    description: "Free and reduced-cost transportation options for seniors and disabled individuals.",
    link: "/resources/transportation/senior-services",
  },
  {
    id: 6,
    title: "Adult Education Programs",
    category: "Education",
    description: "GED classes, vocational training, and continuing education opportunities.",
    link: "/resources/education/adult-programs",
  },
  {
    id: 7,
    title: "Utility Bill Assistance",
    category: "Government",
    description: "Programs to help with electricity, water, and heating costs for low-income households.",
    link: "/resources/government/utility-assistance",
  },
  {
    id: 8,
    title: "Free Health Screenings",
    category: "Healthcare",
    description: "Information about free and low-cost health screenings in your community.",
    link: "/resources/healthcare/screenings",
  },
  {
    id: 9,
    title: "Community Garden Program",
    category: "Community",
    description: "Join a local community garden to grow your own fresh produce and connect with neighbors.",
    link: "/resources/community/garden",
  },
]

export default function ResourcesPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-teal-600 text-white py-4 shadow-md">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <h1 className="text-3xl font-bold mb-4 md:mb-0">Digital Access Hub</h1>
            <nav>
              <ul className="flex space-x-6 text-lg">
                <li>
                  <Link href="/" className="hover:underline font-medium">
                    Home
                  </Link>
                </li>
                <li>
                  <Link href="/resources" className="hover:underline font-medium">
                    All Resources
                  </Link>
                </li>
                <li>
                  <Link href="/help" className="hover:underline font-medium">
                    Get Help
                  </Link>
                </li>
                <li>
                  <Link href="/about" className="hover:underline font-medium">
                    About Us
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center">All Resources</h1>

        {/* Search and Filter */}
        <div className="mb-12">
          <SearchBar />
          <div className="mt-6 flex flex-wrap justify-center gap-4">
            <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors">
              <Filter size={18} />
              <span>Filter by Category</span>
            </button>
            <Link
              href="/resources/government"
              className="px-4 py-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"
            >
              Government
            </Link>
            <Link
              href="/resources/healthcare"
              className="px-4 py-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"
            >
              Healthcare
            </Link>
            <Link
              href="/resources/community"
              className="px-4 py-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"
            >
              Community
            </Link>
            <Link
              href="/resources/education"
              className="px-4 py-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"
            >
              Education
            </Link>
            <Link
              href="/resources/housing"
              className="px-4 py-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"
            >
              Housing
            </Link>
            <Link
              href="/resources/transportation"
              className="px-4 py-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"
            >
              Transportation
            </Link>
          </div>
        </div>

        {/* Resources Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {resources.map((resource) => (
            <ResourceCard
              key={resource.id}
              title={resource.title}
              category={resource.category}
              description={resource.description}
              link={resource.link}
            />
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-10">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">Digital Access Hub</h3>
              <p className="text-gray-300">
                Helping seniors and low-income families access essential online resources.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/" className="text-gray-300 hover:text-white">
                    Home
                  </Link>
                </li>
                <li>
                  <Link href="/resources" className="text-gray-300 hover:text-white">
                    Resources
                  </Link>
                </li>
                <li>
                  <Link href="/help" className="text-gray-300 hover:text-white">
                    Get Help
                  </Link>
                </li>
                <li>
                  <Link href="/about" className="text-gray-300 hover:text-white">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="text-gray-300 hover:text-white">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">Contact Us</h3>
              <p className="text-gray-300 mb-2">123 Main Street</p>
              <p className="text-gray-300 mb-2">Anytown, USA 12345</p>
              <p className="text-gray-300 mb-2">(555) 123-4567</p>
              <p className="text-gray-300">help@digitalaccesshub.org</p>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center">
            <p className="text-gray-300">© 2025 Digital Access Hub. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
