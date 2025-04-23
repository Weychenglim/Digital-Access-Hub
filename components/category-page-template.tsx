import type React from "react"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import SiteHeader from "@/components/site-header"
import GuaranteedNewsGrid from "@/components/guaranteed-news-grid"

interface CategoryPageTemplateProps {
  category: string
  title: string
  description: string
  icon: React.ReactNode
  apiTopic?: string // Optional API topic key if different from category
}

export default function CategoryPageTemplate({
  category,
  title,
  description,
  icon,
  apiTopic,
}: CategoryPageTemplateProps) {
  // Use the provided apiTopic or default to the category name
  const topicForApi = apiTopic || category.toLowerCase()

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <SiteHeader />

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        <div className="mb-8">
          <Link href="/" className="flex items-center text-teal-600 hover:text-teal-700 transition-colors">
            <ArrowLeft className="mr-2 h-5 w-5" />
            <span>Back to Home</span>
          </Link>
        </div>

        <div className="mb-12">
          <div className="flex items-center mb-4">
            <div className="bg-teal-600 p-3 rounded-full text-white mr-4">{icon}</div>
            <h1 className="text-4xl font-bold text-gray-800">{title}</h1>
          </div>
          <div className="bg-teal-50 p-6 rounded-xl">
            <p className="text-xl text-gray-700 mb-4">{description}</p>
            <div className="mt-4">
              <Link
                href="/help"
                className="bg-teal-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-teal-700 transition-colors"
              >
                Get Assistance
              </Link>
            </div>
          </div>
        </div>

        <h2 className="text-3xl font-bold text-gray-800 mb-8">Latest {title} News & Resources</h2>

        {/* Dynamic news grid component for the category using the specific API topic */}
        <GuaranteedNewsGrid topic={topicForApi} />
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-10 mt-16">
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
                  <Link href="/websites" className="text-gray-300 hover:text-white">
                    All Websites
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
