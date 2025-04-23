"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { ExternalLink, Loader2, RefreshCw, AlertCircle } from "lucide-react"
import type { NewsArticle } from "@/lib/news-api"

interface NewsGridProps {
  topic: string
  title?: string
  category?: string
}

export default function NewsGrid({ topic, title, category }: NewsGridProps) {
  const [articles, setArticles] = useState<NewsArticle[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isRefreshing, setIsRefreshing] = useState(false)

  const fetchNews = async () => {
    try {
      setLoading(true)
      setError(null)

      // Build the API URL with query parameters
      const apiUrl = new URL("/api/news", window.location.origin)
      apiUrl.searchParams.append("topic", topic)
      if (title) {
        apiUrl.searchParams.append("title", title)
      }
      if (category) {
        apiUrl.searchParams.append("category", category)
      }

      console.log(`Fetching news for topic: ${topic}, title: ${title || "none"}`)
      const response = await fetch(apiUrl.toString())

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || `Failed to fetch news: ${response.status}`)
      }

      const data = await response.json()
      console.log(`Received ${data.length} articles for ${topic}`)
      setArticles(data)
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
  }, [topic, title, category])

  const handleRefresh = () => {
    setIsRefreshing(true)
    fetchNews()
  }

  if (loading && !isRefreshing) {
    return (
      <div className="flex justify-center items-center py-12">
        <Loader2 size={48} className="animate-spin text-teal-600" />
      </div>
    )
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-lg">
        <div className="flex items-center mb-2">
          <AlertCircle className="h-5 w-5 mr-2" />
          <h3 className="font-semibold">Error loading news</h3>
        </div>
        <p className="text-lg mb-4">{error}</p>
        <button
          onClick={handleRefresh}
          className="flex items-center bg-red-100 hover:bg-red-200 text-red-700 px-4 py-2 rounded-lg transition-colors"
        >
          <RefreshCw className="h-4 w-4 mr-2" />
          Try Again
        </button>
      </div>
    )
  }

  if (articles.length === 0) {
    return (
      <div className="bg-yellow-50 border border-yellow-200 text-yellow-700 px-6 py-4 rounded-lg">
        <p className="text-lg mb-4">No news articles found for this topic. Please try again later.</p>
        <button
          onClick={handleRefresh}
          className="flex items-center bg-yellow-100 hover:bg-yellow-200 text-yellow-700 px-4 py-2 rounded-lg transition-colors"
        >
          <RefreshCw className="h-4 w-4 mr-2" />
          Refresh
        </button>
      </div>
    )
  }

  return (
    <div>
      <div className="flex justify-end mb-4">
        {isRefreshing ? (
          <span className="flex items-center text-gray-500">
            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
            Refreshing...
          </span>
        ) : (
          <button
            onClick={handleRefresh}
            className="flex items-center text-gray-500 hover:text-gray-700 transition-colors"
          >
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh News
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {articles.map((article) => (
          <a
            key={article.id}
            href={article.externalUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="block bg-white border border-gray-200 rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow"
          >
            <div className="relative h-48 w-full overflow-hidden">
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
            <div className="p-6">
              <div className="flex justify-between items-center mb-3">
                <span className="text-sm text-gray-500">{article.source}</span>
                <span className="text-sm text-gray-500">{article.date}</span>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3 line-clamp-2">{article.title}</h3>
              <p className="text-gray-600 mb-4 line-clamp-3">{article.description}</p>
              <div className="flex items-center text-teal-600 font-medium">
                Read More <ExternalLink className="ml-2 h-4 w-4" />
              </div>
            </div>
          </a>
        ))}
      </div>
    </div>
  )
}
