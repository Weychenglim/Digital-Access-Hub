"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { ExternalLink, Loader2, RefreshCw, AlertCircle } from "lucide-react"
import type { NewsArticle } from "@/lib/news-api"

interface CategoryNewsProps {
  category: string
  limit?: number
  showTitle?: boolean
}

export default function CategoryNews({ category, limit = 3, showTitle = true }: CategoryNewsProps) {
  const [articles, setArticles] = useState<NewsArticle[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isRefreshing, setIsRefreshing] = useState(false)

  // Normalize category name for API call
  const normalizedCategory = category.toLowerCase().replace(/\s+/g, "")

  const fetchNews = async () => {
    try {
      setLoading(true)
      setError(null)

      // Build the API URL with query parameters
      const apiUrl = new URL("/api/news", window.location.origin)
      apiUrl.searchParams.append("topic", normalizedCategory)

      console.log(`Fetching news for category: ${normalizedCategory}`)
      const response = await fetch(apiUrl.toString())

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || `Failed to fetch news: ${response.status}`)
      }

      const data = await response.json()
      console.log(`Received ${data.length} articles for ${normalizedCategory}`)
      setArticles(data.slice(0, limit)) // Limit the number of articles
    } catch (err) {
      console.error("Error fetching news:", err)
      setError(err instanceof Error ? err.message : "Failed to load news articles. Please try again later.")
    } finally {
      setLoading(false)
      setIsRefreshing(false)
    }
  }

  useEffect(() => {
    fetchNews()
  }, [normalizedCategory, limit])

  const handleRefresh = () => {
    setIsRefreshing(true)
    fetchNews()
  }

  if (loading && !isRefreshing) {
    return (
      <div className="flex justify-center items-center py-8">
        <Loader2 size={36} className="animate-spin text-teal-600" />
      </div>
    )
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
        <div className="flex items-center mb-1">
          <AlertCircle className="h-4 w-4 mr-2" />
          <h3 className="font-semibold">Error loading news</h3>
        </div>
        <p>{error}</p>
      </div>
    )
  }

  if (articles.length === 0) {
    return (
      <div className="bg-yellow-50 border border-yellow-200 text-yellow-700 px-4 py-3 rounded-lg text-sm">
        <p>No news articles found for this category.</p>
      </div>
    )
  }

  return (
    <div>
      {showTitle && (
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold text-gray-800">Latest {category} News</h3>
          {isRefreshing ? (
            <span className="flex items-center text-gray-500 text-sm">
              <Loader2 className="h-3 w-3 mr-1 animate-spin" />
              Refreshing...
            </span>
          ) : (
            <button
              onClick={handleRefresh}
              className="flex items-center text-gray-500 hover:text-gray-700 transition-colors text-sm"
            >
              <RefreshCw className="h-3 w-3 mr-1" />
              Refresh
            </button>
          )}
        </div>
      )}

      <div className="grid grid-cols-1 gap-4">
        {articles.map((article) => (
          <a
            key={article.id}
            href={article.externalUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="block bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex flex-col md:flex-row">
              <div className="relative h-48 md:h-auto md:w-1/3 overflow-hidden">
                <Image
                  src={article.imageUrl || "/placeholder.svg?height=200&width=300"}
                  alt={article.title}
                  fill
                  className="object-cover"
                  onError={(e) => {
                    // If image fails to load, replace with placeholder
                    const target = e.target as HTMLImageElement
                    target.src = "/placeholder.svg?height=200&width=300"
                  }}
                />
              </div>
              <div className="p-4 md:w-2/3">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs text-gray-500">{article.source}</span>
                  <span className="text-xs text-gray-500">{article.date}</span>
                </div>
                <h3 className="text-lg font-bold text-gray-800 mb-2 line-clamp-2">{article.title}</h3>
                <p className="text-gray-600 mb-3 text-sm line-clamp-2">{article.description}</p>
                <div className="flex items-center text-teal-600 text-sm font-medium">
                  Read More <ExternalLink className="ml-1 h-3 w-3" />
                </div>
              </div>
            </div>
          </a>
        ))}
      </div>

      <div className="mt-4 text-center">
        <Link
          href={`/resources/${normalizedCategory}`}
          className="inline-block text-teal-600 hover:text-teal-700 font-medium text-sm"
        >
          View All {category} News
        </Link>
      </div>
    </div>
  )
}
