import { Building2, HeartPulse, Users, GraduationCap, Home, Bus } from "lucide-react"
import GuaranteedCategoryNews from "@/components/guaranteed-category-news"

const categories = [
  {
    name: "Government Services",
    icon: <Building2 size={48} className="text-teal-600 mb-4" />,
    description: "Access information about benefits, assistance programs, and public services.",
    link: "/resources/government",
    apiTopic: "government", // API topic key
  },
  {
    name: "Healthcare",
    icon: <HeartPulse size={48} className="text-teal-600 mb-4" />,
    description: "Find healthcare providers, insurance information, and wellness resources.",
    link: "/resources/healthcare",
    apiTopic: "healthcare", // API topic key
  },
  {
    name: "Community Events",
    icon: <Users size={48} className="text-teal-600 mb-4" />,
    description: "Discover local events, workshops, and social gatherings in your area.",
    link: "/resources/community",
    apiTopic: "community", // API topic key
  },
  {
    name: "Education",
    icon: <GraduationCap size={48} className="text-teal-600 mb-4" />,
    description: "Learn about educational opportunities, classes, and training programs.",
    link: "/resources/education",
    apiTopic: "education", // API topic key
  },
  {
    name: "Housing",
    icon: <Home size={48} className="text-teal-600 mb-4" />,
    description: "Find information about affordable housing, rental assistance, and home services.",
    link: "/resources/housing",
    apiTopic: "housing", // API topic key
  },
  {
    name: "Transportation",
    icon: <Bus size={48} className="text-teal-600 mb-4" />,
    description: "Access transportation services, discounts, and assistance programs.",
    link: "/resources/transportation",
    apiTopic: "transportation", // API topic key
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
              {/* Removed the "View Resources" button as requested */}

              {/* Add news preview for each category using the API topic key */}
              <div className="mt-6 pt-6 border-t border-gray-200">
                <GuaranteedCategoryNews category={category.apiTopic} limit={1} showTitle={false} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
