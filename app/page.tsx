import Link from "next/link"
import SearchBar from "@/components/search-bar"
import CategorySection from "@/components/category-section"
import FeaturedWebsites from "@/components/featured-websites"
import SiteHeader from "@/components/site-header"

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <SiteHeader />

      {/* Hero Section */}
      <section className="bg-teal-50 py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-gray-800 mb-6">Connecting You to Essential Resources</h2>
          <p className="text-xl text-gray-700 mb-8 max-w-3xl mx-auto">
            We help seniors and families easily access government services, healthcare resources, and community events.
          </p>
          <SearchBar />
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              href="/resources/government"
              className="bg-teal-600 text-white px-6 py-3 rounded-lg text-lg font-medium hover:bg-teal-700 transition-colors"
            >
              Government Services
            </Link>
            <Link
              href="/resources/healthcare"
              className="bg-teal-600 text-white px-6 py-3 rounded-lg text-lg font-medium hover:bg-teal-700 transition-colors"
            >
              Healthcare Resources
            </Link>
            <Link
              href="/resources/community"
              className="bg-teal-600 text-white px-6 py-3 rounded-lg text-lg font-medium hover:bg-teal-700 transition-colors"
            >
              Community Events
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Websites */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Featured Websites</h2>
          <FeaturedWebsites />
          <div className="text-center mt-10">
            <Link
              href="/websites"
              className="bg-teal-600 text-white px-6 py-3 rounded-lg text-lg font-medium hover:bg-teal-700 transition-colors"
            >
              View All Websites
            </Link>
          </div>
        </div>
      </section>

      {/* Categories - Keep this section with NewsAPI integration */}
      <CategorySection />

      {/* Help Section */}
      <section className="py-16 bg-teal-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Need Help?</h2>
          <p className="text-xl text-gray-700 mb-8 max-w-3xl mx-auto">
            Our trained volunteers can assist you in person or over the phone.
          </p>
          <div className="bg-white p-8 rounded-lg shadow-md max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Contact Us</h3>
            <p className="text-xl mb-4">
              <strong>Phone:</strong> (555) 123-4567
            </p>
            <p className="text-xl mb-4">
              <strong>Email:</strong> help@digitalaccesshub.org
            </p>
            <p className="text-xl mb-6">
              <strong>In Person:</strong> Community Center, 123 Main St.
            </p>
            <Link
              href="/help"
              className="bg-teal-600 text-white px-6 py-3 rounded-lg text-lg font-medium hover:bg-teal-700 transition-colors"
            >
              Schedule Assistance
            </Link>
          </div>
        </div>
      </section>

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
