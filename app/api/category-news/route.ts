import { NextResponse } from "next/server"
import type { NewsArticle } from "@/lib/news-api"

// Cache to store API responses and reduce API calls
const newsCache: Record<string, { data: NewsArticle[]; timestamp: number }> = {}
const CACHE_DURATION = 60 * 60 * 1000 // 1 hour in milliseconds

// Add cache control headers to reduce unnecessary API calls
export const revalidate = 3600 // Revalidate this route once per hour

// More specific search queries for each category
const categoryQueries: Record<string, { query: string; domains?: string }> = {
  government: {
    query:
      '("government services" OR "government assistance" OR "public benefits" OR "social security" OR "government programs" OR "federal benefits" OR "state benefits" OR "local government services" OR "government resources" OR "public assistance")',
    domains: "usa.gov,benefits.gov,ssa.gov,medicare.gov,medicaid.gov,va.gov,irs.gov,studentaid.gov",
  },
  healthcare: {
    query:
      '("healthcare services" OR "medical assistance" OR "health insurance" OR "medicare" OR "medicaid" OR "affordable care" OR "health resources" OR "medical care" OR "health programs" OR "patient assistance")',
    domains: "healthcare.gov,nih.gov,cdc.gov,medlineplus.gov,mayoclinic.org,webmd.com,kff.org",
  },
  community: {
    query:
      '("community services" OR "community resources" OR "local community" OR "community programs" OR "community events" OR "community support" OR "neighborhood services" OR "community assistance" OR "community center" OR "local services")',
    domains: "nationalservice.gov,volunteermatch.org,unitedway.org,ymca.org,aarp.org",
  },
  education: {
    query:
      '("adult education" OR "continuing education" OR "education resources" OR "learning opportunities" OR "education programs" OR "training programs" OR "skill development" OR "educational assistance" OR "online learning" OR "education services")',
    domains: "ed.gov,edx.org,coursera.org,khanacademy.org,udemy.com",
  },
  housing: {
    query:
      '("affordable housing" OR "housing assistance" OR "rental assistance" OR "housing programs" OR "housing resources" OR "housing services" OR "home assistance" OR "housing support" OR "housing options" OR "housing help")',
    domains: "hud.gov,nlihc.org,habitat.org,enterprisecommunity.org",
  },
  transportation: {
    query:
      '("transportation services" OR "public transportation" OR "transportation assistance" OR "transit services" OR "mobility services" OR "transportation options" OR "transportation programs" OR "senior transportation" OR "accessible transportation" OR "transportation resources")',
    domains: "transportation.gov,transit.dot.gov,apta.com,ctaa.org",
  },
}

// Function to create fallback articles if needed
function createFallbackArticles(category: string): NewsArticle[] {
  const topics: Record<string, Array<{ title: string; source: string }>> = {
    government: [
      { title: "New Government Assistance Programs Launched for Seniors", source: "USA.gov" },
      { title: "Social Security Benefits to Increase Next Year", source: "SSA News" },
      { title: "Federal Government Expands Online Services for Citizens", source: "Digital Gov" },
    ],
    healthcare: [
      { title: "Medicare Open Enrollment Period Begins Next Month", source: "Medicare.gov" },
      { title: "New Healthcare Resources Available for Low-Income Families", source: "Health Services" },
      { title: "Free Health Screenings Offered at Community Centers Nationwide", source: "Community Health" },
    ],
    community: [
      { title: "Community Centers Expand Programs for Seniors", source: "Community News" },
      { title: "Volunteer Opportunities Available in Local Communities", source: "Volunteer Match" },
      { title: "New Community Resource Directory Launched Online", source: "Local Services" },
    ],
    education: [
      { title: "Free Online Courses Available for Adult Learners", source: "Education Today" },
      { title: "Adult Education Programs Receive Additional Funding", source: "Learning News" },
      { title: "Digital Literacy Classes Offered at Local Libraries", source: "Library Services" },
    ],
    housing: [
      { title: "Affordable Housing Programs Expanded in Multiple States", source: "Housing News" },
      { title: "New Rental Assistance Options for Seniors and Families", source: "Housing Services" },
      { title: "Home Modification Grants Available for Accessibility Improvements", source: "Accessible Housing" },
    ],
    transportation: [
      { title: "Senior Transportation Services Expanded in Rural Areas", source: "Transit News" },
      { title: "New Accessible Transportation Options Available", source: "Mobility Services" },
      { title: "Transportation Voucher Program Launched for Medical Appointments", source: "Health Transit" },
    ],
  }

  return (topics[category] || []).map((item, index) => ({
    id: `fallback-${category}-${index}`,
    title: item.title,
    description:
      "This is a placeholder article to ensure content is available for this category. Please check back later for updated news and information.",
    source: item.source || "Digital Access Hub",
    date: new Date().toLocaleDateString(),
    time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    imageUrl: "/placeholder.svg?height=200&width=300",
    externalUrl: "#",
    relevanceScore: 50,
  }))
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get("category")?.toLowerCase() || ""
    const limit = Number.parseInt(searchParams.get("limit") || "3", 10)

    if (!category) {
      return NextResponse.json({ error: "Category parameter is required" }, { status: 400 })
    }

    console.log(`API request for category news: ${category}, limit: ${limit}`)

    // Check cache first
    const cacheKey = `category-${category}-${limit}`
    const cachedData = newsCache[cacheKey]
    if (cachedData && Date.now() - cachedData.timestamp < CACHE_DURATION) {
      console.log(`Using cached news data for ${category}`)
      return NextResponse.json(cachedData.data, {
        headers: {
          "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=7200",
        },
      })
    }

    // Get category configuration
    const categoryConfig = categoryQueries[category]
    if (!categoryConfig) {
      console.log(`No configuration found for category: ${category}, using fallback`)
      const fallbackArticles = createFallbackArticles(category).slice(0, limit)

      // Cache the results
      newsCache[cacheKey] = {
        data: fallbackArticles,
        timestamp: Date.now(),
      }

      return NextResponse.json(fallbackArticles, {
        headers: {
          "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=7200",
        },
      })
    }

    // Prepare the API URL
    const apiKey = process.env.NEWS_API_KEY
    if (!apiKey) {
      console.error("NEWS_API_KEY environment variable is not set")
      throw new Error("API key is missing")
    }

    // Try multiple approaches to ensure we get results
    let articles: NewsArticle[] = []

    // Approach 1: Use specific query with domains
    if (articles.length === 0) {
      try {
        console.log(`Trying approach 1 for ${category}: Using query with specific domains`)

        // Get date for last 30 days (NewsAPI free tier limitation)
        const today = new Date()
        const thirtyDaysAgo = new Date()
        thirtyDaysAgo.setDate(today.getDate() - 30)
        const fromDate = thirtyDaysAgo.toISOString().split("T")[0]
        const toDate = today.toISOString().split("T")[0]

        const url = new URL("https://newsapi.org/v2/everything")
        url.searchParams.append("q", categoryConfig.query)
        if (categoryConfig.domains) {
          url.searchParams.append("domains", categoryConfig.domains)
        }
        url.searchParams.append("language", "en")
        url.searchParams.append("sortBy", "relevancy")
        url.searchParams.append("pageSize", "10")
        url.searchParams.append("from", fromDate)
        url.searchParams.append("to", toDate)

        const response = await fetch(url.toString(), {
          headers: {
            "X-Api-Key": apiKey,
          },
          next: { revalidate: 3600 },
        })

        if (!response.ok) {
          const errorData = await response.json()
          throw new Error(`NewsAPI error: ${response.status} ${errorData.message || "Unknown error"}`)
        }

        const data = await response.json()

        if (data.articles && data.articles.length > 0) {
          articles = data.articles.map((article: any, index: number) => ({
            id: `article-${category}-${index}-${Date.now()}`,
            title: article.title || "No title available",
            description: article.description || "No description available",
            source: article.source?.name || "Unknown Source",
            date: new Date(article.publishedAt).toLocaleDateString() || "Unknown date",
            time: new Date(article.publishedAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
            imageUrl: article.urlToImage || "/placeholder.svg?height=200&width=300",
            externalUrl: article.url || "#",
            relevanceScore: 100 - index, // Simple relevance score based on order
          }))

          console.log(`Approach 1 successful: Found ${articles.length} articles for ${category}`)
        }
      } catch (error) {
        console.error(`Approach 1 failed for ${category}:`, error)
      }
    }

    // Approach 2: Use simple category name with top news sources
    if (articles.length === 0) {
      try {
        console.log(`Trying approach 2 for ${category}: Using simple category name with top news sources`)

        const url = new URL("https://newsapi.org/v2/everything")
        url.searchParams.append("q", category)
        url.searchParams.append(
          "sources",
          "associated-press,reuters,bbc-news,cnn,the-washington-post,the-wall-street-journal",
        )
        url.searchParams.append("language", "en")
        url.searchParams.append("sortBy", "publishedAt")
        url.searchParams.append("pageSize", "10")

        const response = await fetch(url.toString(), {
          headers: {
            "X-Api-Key": apiKey,
          },
          next: { revalidate: 3600 },
        })

        if (!response.ok) {
          const errorData = await response.json()
          throw new Error(`NewsAPI error: ${response.status} ${errorData.message || "Unknown error"}`)
        }

        const data = await response.json()

        if (data.articles && data.articles.length > 0) {
          articles = data.articles.map((article: any, index: number) => ({
            id: `article-${category}-${index}-${Date.now()}`,
            title: article.title || "No title available",
            description: article.description || "No description available",
            source: article.source?.name || "Unknown Source",
            date: new Date(article.publishedAt).toLocaleDateString() || "Unknown date",
            time: new Date(article.publishedAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
            imageUrl: article.urlToImage || "/placeholder.svg?height=200&width=300",
            externalUrl: article.url || "#",
            relevanceScore: 100 - index, // Simple relevance score based on order
          }))

          console.log(`Approach 2 successful: Found ${articles.length} articles for ${category}`)
        }
      } catch (error) {
        console.error(`Approach 2 failed for ${category}:`, error)
      }
    }

    // Approach 3: Use top headlines for US with category as query
    if (articles.length === 0) {
      try {
        console.log(`Trying approach 3 for ${category}: Using top headlines with category as query`)

        const url = new URL("https://newsapi.org/v2/top-headlines")
        url.searchParams.append("country", "us")
        url.searchParams.append("q", category)
        url.searchParams.append("pageSize", "10")

        const response = await fetch(url.toString(), {
          headers: {
            "X-Api-Key": apiKey,
          },
          next: { revalidate: 3600 },
        })

        if (!response.ok) {
          const errorData = await response.json()
          throw new Error(`NewsAPI error: ${response.status} ${errorData.message || "Unknown error"}`)
        }

        const data = await response.json()

        if (data.articles && data.articles.length > 0) {
          articles = data.articles.map((article: any, index: number) => ({
            id: `article-${category}-${index}-${Date.now()}`,
            title: article.title || "No title available",
            description: article.description || "No description available",
            source: article.source?.name || "Unknown Source",
            date: new Date(article.publishedAt).toLocaleDateString() || "Unknown date",
            time: new Date(article.publishedAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
            imageUrl: article.urlToImage || "/placeholder.svg?height=200&width=300",
            externalUrl: article.url || "#",
            relevanceScore: 100 - index, // Simple relevance score based on order
          }))

          console.log(`Approach 3 successful: Found ${articles.length} articles for ${category}`)
        }
      } catch (error) {
        console.error(`Approach 3 failed for ${category}:`, error)
      }
    }

    // If we still don't have any articles, use fallback content
    if (articles.length === 0) {
      console.log(`No articles found for ${category} after trying all approaches, using fallback content`)
      articles = createFallbackArticles(category)
    }

    // Limit the number of articles
    const limitedArticles = articles.slice(0, limit)

    // Cache the results
    newsCache[cacheKey] = {
      data: limitedArticles,
      timestamp: Date.now(),
    }

    return NextResponse.json(limitedArticles, {
      headers: {
        "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=7200",
      },
    })
  } catch (error) {
    console.error("Error in category news API route:", error)

    // Return a more specific error message if possible
    const errorMessage = error instanceof Error ? error.message : "Failed to fetch news articles"

    return NextResponse.json(
      { error: errorMessage },
      {
        status: 500,
        headers: {
          // Don't cache errors
          "Cache-Control": "no-cache, no-store, must-revalidate",
        },
      },
    )
  }
}
