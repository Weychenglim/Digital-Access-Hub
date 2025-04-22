"use client"

import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { Search, Loader2 } from "lucide-react"
import ResourceCard from "@/components/resource-card"

interface Resource {
  id: number
  title: string
  category: string
  description: string
  link: string
}

export default function SearchPage() {
  const searchParams = useSearchParams()
  const query = searchParams.get("q") || ""

  const [resources, setResources] = useState<Resource[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    const fetchResources = async () => {
      if (!query) {
        setResources([])
        setLoading(false)
        return
      }

      try {
        setLoading(true)
        const response = await fetch(`/api/resources?q=${encodeURIComponent(query)}`)

        if (!response.ok) {
          throw new Error("Failed to fetch resources")
        }

        const data = await response.json()
        setResources(data)
        setError("")
      } catch (err) {
        setError("An error occurred while searching for resources. Please try again.")
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchResources()
  }, [query])

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
        <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center">Search Results</h1>

        {/* Search Form */}
        <form className="max-w-3xl mx-auto mb-12">
          <div className="relative flex items-center">
            <input
              type="text"
              placeholder="Search for resources"
              defaultValue={query}
              className="w-full px-6 py-4 text-lg border-2 border-gray-300 rounded-full focus:outline-none focus:border-teal-500"
              aria-label="Search for resources"
            />
            <button
              type="submit"
              className="absolute right-3 bg-teal-600 text-white p-3 rounded-full hover:bg-teal-700 transition-colors"
              aria-label="Search"
            >
              <Search size={24} />
            </button>
          </div>
        </form>

        {/* Search Results */}
        <div className="max-w-5xl mx-auto">
          {loading ? (
            <div className="flex justify-center items-center py-12">
              <Loader2 size={48} className="animate-spin text-teal-600" />
            </div>
          ) : error ? (
            <div className="bg-red-100 border border-red-400 text-red-700 px-6 py-4 rounded-lg mb-6">
              <p className="text-lg">{error}</p>
            </div>
          ) : resources.length === 0 ? (
            <div className="text-center py-12">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">No results found for "{query}"</h2>
              <p className="text-xl text-gray-600 mb-8">
                Try using different keywords or browse our resource categories.
              </p>
              <Link
                href="/resources"
                className="bg-teal-600 text-white px-6 py-3 rounded-lg text-lg font-medium hover:bg-teal-700 transition-colors"
              >
                Browse All Resources
              </Link>
            </div>
          ) : (
            <>
              <h2 className="text-2xl font-bold text-gray-800 mb-6">
                Found {resources.length} result{resources.length !== 1 ? "s" : ""} for "{query}"
              </h2>
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
            </>
          )}
        </div>
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
