"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { ExternalLink, Filter, Loader2, Search } from "lucide-react"
import SiteHeader from "@/components/site-header"

interface Website {
  Category: string
  Website: string
  Description: string
}

export default function WebsitesPage() {
  const [websites, setWebsites] = useState<Website[]>([])
  const [filteredWebsites, setFilteredWebsites] = useState<Website[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [activeCategory, setActiveCategory] = useState<string | null>(null)
  const [categories, setCategories] = useState<string[]>([])

  useEffect(() => {
    async function fetchWebsites() {
      try {
        setLoading(true)
        const response = await fetch("/api/websites")

        if (!response.ok) {
          throw new Error("Failed to fetch websites")
        }

        const data = await response.json()
        setWebsites(data)
        setFilteredWebsites(data)

        // Extract unique categories
        const uniqueCategories = Array.from(new Set(data.map((site: Website) => site.Category)))
        setCategories(uniqueCategories as string[])
      } catch (err) {
        console.error("Error fetching websites:", err)
        setError("Failed to load websites. Please try again later.")
      } finally {
        setLoading(false)
      }
    }

    fetchWebsites()
  }, [])

  // Filter websites based on search query and active category
  useEffect(() => {
    let result = [...websites]

    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      result = result.filter(
        (website) =>
          website.Website.toLowerCase().includes(query) ||
          website.Description.toLowerCase().includes(query) ||
          website.Category.toLowerCase().includes(query),
      )
    }

    if (activeCategory) {
      result = result.filter((website) => website.Category === activeCategory)
    }

    setFilteredWebsites(result)
  }, [searchQuery, activeCategory, websites])

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value)
  }

  const handleCategoryFilter = (category: string | null) => {
    setActiveCategory(category === activeCategory ? null : category)
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <SiteHeader />

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center">All Websites</h1>

        {/* Search and Filter */}
        <div className="mb-12">
          <div className="max-w-3xl mx-auto relative">
            <input
              type="text"
              placeholder="Search websites by name, description, or category..."
              className="w-full px-6 py-4 text-lg border-2 border-gray-300 rounded-full focus:outline-none focus:border-teal-500 pl-14"
              value={searchQuery}
              onChange={handleSearch}
            />
            <Search className="absolute left-5 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          </div>

          <div className="mt-6 flex flex-wrap justify-center gap-4">
            <button
              className={`flex items-center gap-2 px-4 py-2 rounded-full transition-colors ${
                !activeCategory
                  ? "bg-teal-600 text-white hover:bg-teal-700"
                  : "bg-gray-100 hover:bg-gray-200 text-gray-800"
              }`}
              onClick={() => handleCategoryFilter(null)}
            >
              <Filter size={18} />
              <span>All Categories</span>
            </button>
            {categories.map((category) => (
              <button
                key={category}
                className={`px-4 py-2 rounded-full transition-colors ${
                  activeCategory === category
                    ? "bg-teal-600 text-white hover:bg-teal-700"
                    : "bg-gray-100 hover:bg-gray-200 text-gray-800"
                }`}
                onClick={() => handleCategoryFilter(category)}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Websites Grid */}
        {loading ? (
          <div className="flex justify-center items-center py-12">
            <Loader2 size={48} className="animate-spin text-teal-600" />
          </div>
        ) : error ? (
          <div className="bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-lg max-w-3xl mx-auto">
            <p className="text-lg">{error}</p>
          </div>
        ) : filteredWebsites.length === 0 ? (
          <div className="text-center py-12">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">No websites found</h2>
            <p className="text-xl text-gray-600 mb-8">
              Try adjusting your search or filter criteria to find what you're looking for.
            </p>
            <button
              onClick={() => {
                setSearchQuery("")
                setActiveCategory(null)
              }}
              className="bg-teal-600 text-white px-6 py-3 rounded-lg text-lg font-medium hover:bg-teal-700 transition-colors"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredWebsites.map((website, index) => (
              <div
                key={index}
                className="bg-white border-2 border-gray-200 rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow"
              >
                <div className="p-6">
                  <div className="inline-block px-3 py-1 text-sm font-semibold text-teal-700 bg-teal-100 rounded-full mb-3">
                    {website.Category}
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-3">{formatWebsiteUrl(website.Website)}</h3>
                  <p className="text-gray-600 text-lg mb-4">{website.Description}</p>
                  <a
                    href={ensureHttps(website.Website)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center bg-teal-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-teal-700 transition-colors"
                  >
                    Visit Website
                    <ExternalLink className="ml-2 h-4 w-4" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}
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

// Helper function to format website URLs for display
function formatWebsiteUrl(url: string): string {
  // Remove http:// or https:// for display purposes
  return url.replace(/^https?:\/\//, "")
}

// Helper function to ensure URLs have https:// prefix
function ensureHttps(url: string): string {
  if (!url.startsWith("http://") && !url.startsWith("https://")) {
    return `https://${url}`
  }
  return url
}
