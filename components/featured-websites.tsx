"use client"

import { useState, useEffect } from "react"
import { ExternalLink, Loader2 } from "lucide-react"

interface Website {
  Category: string
  Website: string
  Description: string
}

export default function FeaturedWebsites() {
  const [websites, setWebsites] = useState<Website[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

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
      } catch (err) {
        console.error("Error fetching websites:", err)
        setError("Failed to load featured websites. Please try again later.")
      } finally {
        setLoading(false)
      }
    }

    fetchWebsites()
  }, [])

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <Loader2 size={36} className="animate-spin text-teal-600" />
      </div>
    )
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-lg">
        <p>{error}</p>
      </div>
    )
  }

  // Display up to 3 featured websites
  const featuredWebsites = websites.slice(0, 3)

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {featuredWebsites.map((website, index) => (
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
