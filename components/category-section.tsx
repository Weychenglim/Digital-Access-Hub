import Link from "next/link"
import { Building2, HeartPulse, Users, GraduationCap, Home, Bus } from "lucide-react"

const categories = [
  {
    name: "Government Services",
    icon: <Building2 size={48} className="text-teal-600 mb-4" />,
    description: "Access information about benefits, assistance programs, and public services.",
    link: "/resources/government",
  },
  {
    name: "Healthcare",
    icon: <HeartPulse size={48} className="text-teal-600 mb-4" />,
    description: "Find healthcare providers, insurance information, and wellness resources.",
    link: "/resources/healthcare",
  },
  {
    name: "Community Events",
    icon: <Users size={48} className="text-teal-600 mb-4" />,
    description: "Discover local events, workshops, and social gatherings in your area.",
    link: "/resources/community",
  },
  {
    name: "Education",
    icon: <GraduationCap size={48} className="text-teal-600 mb-4" />,
    description: "Learn about educational opportunities, classes, and training programs.",
    link: "/resources/education",
  },
  {
    name: "Housing",
    icon: <Home size={48} className="text-teal-600 mb-4" />,
    description: "Find information about affordable housing, rental assistance, and home services.",
    link: "/resources/housing",
  },
  {
    name: "Transportation",
    icon: <Bus size={48} className="text-teal-600 mb-4" />,
    description: "Access transportation services, discounts, and assistance programs.",
    link: "/resources/transportation",
  },
]

export default function CategorySection() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-gray-800 mb-12 text-center">Resource Categories</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((category, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-xl shadow-md text-center hover:shadow-lg transition-shadow"
            >
              <div className="flex justify-center">{category.icon}</div>
              <h3 className="text-2xl font-bold text-gray-800 mb-3">{category.name}</h3>
              <p className="text-gray-600 mb-6">{category.description}</p>
              <Link
                href={category.link}
                className="inline-block bg-teal-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-teal-700 transition-colors"
              >
                View Resources
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
