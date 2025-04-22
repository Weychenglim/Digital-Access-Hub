import { NextResponse } from "next/server"
import { fetchNewsArticles, getFallbackNewsArticles } from "@/lib/news-api"

// Add cache control headers to reduce unnecessary API calls
export const revalidate = 3600 // Revalidate this route once per hour

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const topic = searchParams.get("topic") || ""
    const specificTitle = searchParams.get("title") || undefined
    const category = searchParams.get("category") || undefined

    if (!topic) {
      return NextResponse.json({ error: "Topic parameter is required" }, { status: 400 })
    }

    console.log(`API request for topic: ${topic}, title: ${specificTitle || "none"}, category: ${category || "none"}`)

    // Fetch news articles based on the topic and specific title (if provided)
    let articles = await fetchNewsArticles(topic, specificTitle, category)

    // Log the number of articles found
    console.log(`Found ${articles.length} articles for ${topic}`)

    // If no articles were found and it's not due to filtering, try fallback
    if (articles.length === 0 && !category) {
      console.log(`No articles found, using fallback for ${topic}`)
      articles = await getFallbackNewsArticles(topic, specificTitle)
    }

    return NextResponse.json(articles, {
      headers: {
        "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=7200",
      },
    })
  } catch (error) {
    console.error("Error in news API route:", error)

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
