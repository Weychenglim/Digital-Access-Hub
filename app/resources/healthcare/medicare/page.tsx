import Link from "next/link"
import { ArrowLeft, ExternalLink } from "lucide-react"
import NewsGrid from "@/components/news-grid"

export default function MedicareResourcePage() {
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
        <div className="mb-8">
          <Link href="/resources" className="flex items-center text-teal-600 hover:text-teal-700 transition-colors">
            <ArrowLeft className="mr-2 h-5 w-5" />
            <span>Back to Resources</span>
          </Link>
        </div>

        <div className="mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Medicare Enrollment Assistance</h1>
          <div className="bg-teal-50 p-6 rounded-xl">
            <p className="text-xl text-gray-700 mb-4">
              Medicare is the federal health insurance program for people who are 65 or older, certain younger people
              with disabilities, and people with End-Stage Renal Disease. Understanding your Medicare options and
              enrolling in the right plan can be complex.
            </p>
            <p className="text-xl text-gray-700 mb-4">
              Below you'll find the latest news and resources to help you navigate Medicare enrollment. For personalized
              assistance, visit our community center or call our helpline at (555) 123-4567.
            </p>
            <div className="mt-4 flex flex-wrap gap-4">
              <Link
                href="/help"
                className="bg-teal-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-teal-700 transition-colors"
              >
                Schedule Assistance
              </Link>
              <a
                href="https://www.medicare.gov/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center bg-white text-teal-600 border-2 border-teal-600 px-4 py-2 rounded-lg font-medium hover:bg-teal-50 transition-colors"
              >
                Official Medicare Website
                <ExternalLink className="ml-2 h-4 w-4" />
              </a>
            </div>
          </div>
        </div>

        <h2 className="text-3xl font-bold text-gray-800 mb-8">Latest Medicare News & Resources</h2>

        {/* Dynamic news grid component with improved topic specificity */}
        <NewsGrid topic="medicare" title="Medicare Enrollment Assistance" />
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
