// This file handles fetching news from an external API

// Define the structure of a news article
export interface NewsArticle {
  id: string
  title: string
  description: string
  source: string
  date: string
  time: string
  imageUrl: string
  externalUrl: string
  relevanceScore?: number // Score to determine how relevant the article is
}

// Cache to store API responses and reduce API calls
const newsCache: Record<string, { data: NewsArticle[]; timestamp: number }> = {}
const CACHE_DURATION = 30 * 60 * 1000 // 30 minutes in milliseconds

// Authoritative domains for each category to prioritize quality sources
const authoritativeDomains: Record<string, string[]> = {
  government: [
    "usa.gov",
    "medicare.gov",
    "ssa.gov",
    "benefits.gov",
    "healthcare.gov",
    "acf.hhs.gov",
    "fns.usda.gov",
    "hud.gov",
    "irs.gov",
    "dol.gov",
  ],
  healthcare: [
    "nih.gov",
    "cdc.gov",
    "who.int",
    "mayoclinic.org",
    "medlineplus.gov",
    "healthline.com",
    "webmd.com",
    "medicalnewstoday.com",
    "health.harvard.edu",
  ],
  community: [
    "meetup.com",
    "eventbrite.com",
    "volunteermatch.org",
    "nationalservice.gov",
    "ymca.org",
    "aarp.org",
    "redcross.org",
    "unitedway.org",
  ],
  education: [
    "ed.gov",
    "edx.org",
    "coursera.org",
    "khanacademy.org",
    "udemy.com",
    "collegeboard.org",
    "studentaid.gov",
    "chronicle.com",
    "edweek.org",
  ],
  housing: [
    "hud.gov",
    "zillow.com",
    "realtor.com",
    "apartments.com",
    "habitat.org",
    "enterprisecommunity.org",
    "nlihc.org",
    "housingwire.com",
  ],
  transportation: [
    "transportation.gov",
    "transit.dot.gov",
    "apta.com",
    "aar.org",
    "faa.gov",
    "nhtsa.gov",
    "amtrak.com",
    "citylab.com",
    "smartgrowthamerica.org",
  ],
}

// Highly specific keywords for each category to improve relevance
const topicKeywords: Record<string, string[]> = {
  // Specific resource topics
  medicare: [
    "medicare enrollment",
    "medicare signup",
    "medicare application",
    "medicare benefits",
    "medicare assistance",
    "medicare part",
    "medicare advantage",
    "medicare eligibility",
    "senior health insurance",
    "medicare deadline",
    "medicare coverage",
    "medicare plan",
    "medicare supplement",
    "medicare card",
    "medicare provider",
  ],
  food: [
    "food assistance program",
    "snap benefits",
    "food stamps",
    "food bank",
    "meal program",
    "food pantry",
    "wic program",
    "free meals",
    "food insecurity",
    "nutrition assistance",
    "hunger relief",
    "community meals",
    "senior meals",
    "emergency food assistance",
    "food distribution",
    "meal delivery",
  ],
  computer: [
    "computer class",
    "digital literacy",
    "technology training",
    "computer skills",
    "computer basics",
    "senior technology",
    "free computer training",
    "digital skills",
    "computer workshop",
    "tech education",
    "computer learning",
    "internet basics",
    "online safety",
    "digital inclusion",
    "technology assistance",
  ],

  // Broader category topics with more specific terms
  government: [
    "government assistance program",
    "public benefits",
    "social security benefits",
    "government services for seniors",
    "disability benefits",
    "veteran benefits",
    "government financial assistance",
    "low income assistance programs",
    "government healthcare programs",
    "public assistance application",
    "government aid eligibility",
    "senior government benefits",
    "apply for government benefits",
    "government support services",
    "federal assistance programs",
    "state benefit programs",
  ],
  healthcare: [
    "healthcare access programs",
    "affordable healthcare options",
    "medical assistance programs",
    "health insurance for seniors",
    "low-cost health clinics",
    "preventive healthcare services",
    "patient assistance programs",
    "prescription assistance",
    "mental health resources",
    "healthcare navigation services",
    "medical transportation services",
    "telehealth services",
    "senior health programs",
    "community health centers",
    "healthcare screening programs",
    "chronic disease management",
    "health education resources",
  ],
  community: [
    "community events for seniors",
    "local senior activities",
    "community support programs",
    "senior social events",
    "community workshops",
    "neighborhood assistance programs",
    "community volunteer opportunities",
    "senior community centers",
    "local support groups",
    "community resource fairs",
    "senior recreation programs",
    "intergenerational programs",
    "community education events",
    "senior fitness classes",
    "community meal programs",
  ],
  education: [
    "adult education programs",
    "senior learning opportunities",
    "continuing education classes",
    "lifelong learning programs",
    "GED preparation",
    "vocational training programs",
    "computer literacy classes",
    "educational workshops for seniors",
    "skill development courses",
    "free online courses",
    "educational resources for adults",
    "senior education grants",
    "literacy programs",
    "educational assistance",
    "certificate programs for adults",
  ],
  housing: [
    "affordable housing programs",
    "senior housing options",
    "housing assistance for low income",
    "rental assistance programs",
    "home repair assistance",
    "housing vouchers",
    "subsidized housing",
    "senior living communities",
    "home modification programs",
    "emergency housing assistance",
    "property tax relief for seniors",
    "housing counseling services",
    "home weatherization programs",
    "accessible housing options",
    "homelessness prevention",
  ],
  transportation: [
    "senior transportation services",
    "accessible transportation options",
    "medical transportation assistance",
    "transportation vouchers",
    "reduced fare programs",
    "paratransit services",
    "volunteer driver programs",
    "senior shuttle services",
    "transportation assistance programs",
    "mobility management",
    "door-to-door transportation",
    "public transit for seniors",
    "transportation subsidies",
    "ride-sharing for seniors",
    "non-emergency medical transportation",
  ],

  // Specific resource topics from All Resources page
  "affordable-housing": [
    "affordable housing options",
    "low-income housing",
    "rental assistance",
    "housing vouchers",
    "section 8 housing",
    "public housing",
    "affordable apartments",
    "housing subsidies",
    "income-restricted housing",
    "affordable homes",
    "housing assistance programs",
    "low-income apartments",
    "affordable rental units",
    "housing for seniors",
    "housing for disabled",
  ],
  "senior-transportation": [
    "senior transportation services",
    "elderly transportation",
    "transportation for seniors",
    "senior shuttle",
    "medical transportation for elderly",
    "reduced fare transportation",
    "senior ride programs",
    "paratransit services",
    "door-to-door transportation",
    "senior mobility",
    "transportation assistance for elderly",
    "senior transportation vouchers",
    "accessible transportation",
    "senior ride share",
    "non-emergency medical transportation",
  ],
  "adult-education": [
    "adult education programs",
    "GED classes",
    "vocational training",
    "continuing education",
    "adult learning",
    "career training",
    "adult literacy",
    "skill development",
    "adult degree programs",
    "workforce development",
    "adult education courses",
    "professional certification",
    "adult learning centers",
    "job training programs",
    "adult education resources",
  ],
  "utility-assistance": [
    "utility bill assistance",
    "energy assistance",
    "help paying utilities",
    "LIHEAP program",
    "utility payment help",
    "water bill assistance",
    "electric bill help",
    "heating assistance",
    "utility assistance programs",
    "energy bill relief",
    "utility payment programs",
    "assistance with utilities",
    "low-income utility assistance",
    "utility discount programs",
    "weatherization assistance",
  ],
  "health-screenings": [
    "free health screenings",
    "preventive health screenings",
    "community health screenings",
    "medical screening programs",
    "health check-ups",
    "free medical tests",
    "preventive care screenings",
    "health fairs",
    "blood pressure screening",
    "cholesterol screening",
    "diabetes screening",
    "cancer screening programs",
    "wellness screenings",
    "community health clinics",
    "mobile health screenings",
  ],
  "community-garden": [
    "community garden program",
    "neighborhood gardens",
    "urban gardening",
    "community growing spaces",
    "shared gardens",
    "community agriculture",
    "garden plots",
    "community farming",
    "local food production",
    "community garden benefits",
    "garden education",
    "community garden grants",
    "garden volunteering",
    "sustainable gardening",
    "food growing programs",
  ],
}

// Exclusion terms to filter out irrelevant content
const exclusionTerms: Record<string, string[]> = {
  government: ["conspiracy", "scandal", "protest against", "corruption"],
  healthcare: ["stock", "shares", "investment", "lawsuit", "scandal", "celebrity"],
  community: ["crime", "arrest", "scandal", "controversy"],
  education: ["scandal", "protest", "strike", "lawsuit"],
  housing: ["luxury", "mansion", "celebrity home", "real estate investment"],
  transportation: ["accident", "crash", "recall", "traffic jam"],

  // Specific resource exclusions
  "affordable-housing": ["luxury", "high-end", "premium", "investment property"],
  "senior-transportation": ["accident", "crash", "traffic", "delay"],
  "adult-education": ["school district", "K-12", "elementary", "high school"],
  "utility-assistance": ["rate hike", "outage", "protest", "lawsuit"],
  "health-screenings": ["stock", "profit", "earnings", "investment"],
  "community-garden": ["dispute", "vandalism", "theft", "controversy"],
}

// Map resource slugs to their parent categories
const resourceCategoryMap: Record<string, string> = {
  "affordable-housing": "housing",
  "senior-transportation": "transportation",
  "adult-education": "education",
  "utility-assistance": "government",
  "health-screenings": "healthcare",
  "community-garden": "community",
  medicare: "healthcare",
  "food-assistance": "government",
  "computer-classes": "community",
}

// Function to fetch news from NewsAPI.org based on a search query
export async function fetchNewsArticles(
  topic: string,
  specificTitle?: string,
  category?: string,
): Promise<NewsArticle[]> {
  try {
    // Create a cache key based on the topic and category
    const cacheKey = `${topic}-${specificTitle || ""}-${category || ""}`

    // Check if we have cached data that's still valid
    const cachedData = newsCache[cacheKey]
    if (cachedData && Date.now() - cachedData.timestamp < CACHE_DURATION) {
      console.log("Using cached news data")
      return cachedData.data
    }

    // Prepare the API URL
    const apiKey = process.env.NEWS_API_KEY
    if (!apiKey) {
      console.error("NEWS_API_KEY environment variable is not set")
      throw new Error("API key is missing")
    }

    // Determine the parent category for domain filtering
    const parentCategory = resourceCategoryMap[topic] || topic

    // Get topic-specific keywords
    const keywords = topicKeywords[topic] || []

    // Get exclusion terms for this topic
    const exclusions = exclusionTerms[topic] || exclusionTerms[parentCategory] || []

    // Get authoritative domains for the parent category
    const domains = authoritativeDomains[parentCategory] || []

    // Create a more precise search query
    let searchQuery = ""

    if (specificTitle) {
      // For specific resources, use the title with exact phrase matching
      searchQuery = `"${specificTitle}"`

      // Add top keywords as exact phrases with OR
      if (keywords.length > 0) {
        const exactPhrases = keywords
          .slice(0, 5)
          .map((kw) => `"${kw}"`)
          .join(" OR ")
        searchQuery = `(${searchQuery}) AND (${exactPhrases})`
      }
    } else {
      // For resource pages, use a combination of exact phrases for better relevance
      // Take the top 3 most specific keywords and require at least one of them
      const primaryKeywords = keywords
        .slice(0, 3)
        .map((kw) => `"${kw}"`)
        .join(" OR ")

      // Add secondary keywords with less weight
      const secondaryKeywords = keywords
        .slice(3, 8)
        .map((kw) => `"${kw}"`)
        .join(" OR ")

      searchQuery = `(${primaryKeywords})${secondaryKeywords ? ` OR (${secondaryKeywords})` : ""}`

      // Add the topic name as a required term (replace hyphens with spaces)
      const topicName = topic.replace(/-/g, " ")
      searchQuery = `(${topicName}) AND (${searchQuery})`
    }

    // Add exclusion terms to filter out irrelevant content
    const exclusionQuery = exclusions.map((term) => `-"${term}"`).join(" ")

    // Build the NewsAPI URL with appropriate parameters
    let apiUrl = `https://newsapi.org/v2/everything?q=${encodeURIComponent(searchQuery + " " + exclusionQuery)}&apiKey=${apiKey}`

    // Add additional parameters
    apiUrl += "&language=en" // English articles only
    apiUrl += "&pageSize=20" // Fetch more articles than needed for better filtering

    // For specific resources, sort by relevancy
    // For broader categories, sort by recent articles
    if (specificTitle) {
      apiUrl += "&sortBy=relevancy"
    } else {
      apiUrl += "&sortBy=publishedAt" // Sort by publication date for category pages
    }

    // If we have authoritative domains, prioritize them
    if (domains.length > 0) {
      // Take up to 5 domains to avoid making the URL too long
      const domainQuery = domains.slice(0, 5).join(",")
      apiUrl += `&domains=${domainQuery}`
    }

    // Make the API request
    console.log(`Fetching news data for query: ${searchQuery}`)
    const response = await fetch(apiUrl, { next: { revalidate: 3600 } }) // Revalidate once per hour

    if (!response.ok) {
      const errorData = await response.json()
      console.error("NewsAPI error:", errorData)
      throw new Error(`NewsAPI error: ${response.status} ${errorData.message || "Unknown error"}`)
    }

    const data = await response.json()

    // Parse and enhance the API response with relevance scoring
    let articles = parseAndScoreNewsAPIResponse(data, specificTitle || topic.replace(/-/g, " "), keywords)

    // Apply additional filtering to ensure high relevance
    // Use a higher threshold for category pages to ensure better relevance
    const relevanceThreshold = specificTitle ? 10 : 20
    articles = filterByRelevance(articles, specificTitle || topic.replace(/-/g, " "), topic, relevanceThreshold)

    // If we don't have enough articles after filtering, try a fallback approach
    if (articles.length < 3) {
      console.log("Not enough relevant articles found, trying fallback approach")

      // Simplify the query to get more results
      let fallbackQuery = topic.replace(/-/g, " ")

      // Add a couple of the most important keywords
      if (keywords.length > 0) {
        fallbackQuery += ` AND ("${keywords[0]}" OR "${keywords[1]}")`
      }

      const fallbackUrl = `https://newsapi.org/v2/everything?q=${encodeURIComponent(fallbackQuery)}&apiKey=${apiKey}&language=en&pageSize=10&sortBy=publishedAt`

      const fallbackResponse = await fetch(fallbackUrl, { next: { revalidate: 3600 } })

      if (fallbackResponse.ok) {
        const fallbackData = await fallbackResponse.json()
        const fallbackArticles = parseAndScoreNewsAPIResponse(fallbackData, topic.replace(/-/g, " "), keywords)

        // Add fallback articles to our results
        articles = [...articles, ...fallbackArticles]
      }
    }

    // Limit to top articles
    const limit = specificTitle ? 9 : 6 // Show fewer articles for category pages
    articles = articles.slice(0, limit)

    // Cache the results
    newsCache[cacheKey] = {
      data: articles,
      timestamp: Date.now(),
    }

    return articles
  } catch (error) {
    console.error("Error fetching news articles:", error)

    // If the API fails, return an empty array
    // In a production app, you might want to implement a fallback strategy
    return []
  }
}

// Parse the NewsAPI response and score articles for relevance
function parseAndScoreNewsAPIResponse(apiResponse: any, searchTerm: string, keywords: string[]): NewsArticle[] {
  if (!apiResponse.articles || !Array.isArray(apiResponse.articles)) {
    return []
  }

  return apiResponse.articles.map((article: any, index: number) => {
    const title = article.title || ""
    const description = article.description || ""
    const content = article.content || ""
    const url = article.url || ""

    // Calculate relevance score based on keyword matches
    let relevanceScore = 0

    // Check for exact search term match (highest relevance)
    if (title.toLowerCase().includes(searchTerm.toLowerCase())) {
      relevanceScore += 50
    }

    if (description.toLowerCase().includes(searchTerm.toLowerCase())) {
      relevanceScore += 30
    }

    // Check for keyword matches in title (high relevance)
    keywords.forEach((keyword) => {
      // Exact phrase matching in title (highest value)
      if (title.toLowerCase().includes(keyword.toLowerCase())) {
        relevanceScore += 25
      }

      // Partial keyword matching in title
      const keywordParts = keyword.split(" ")
      if (keywordParts.length > 1) {
        const matchCount = keywordParts.filter((part) => title.toLowerCase().includes(part.toLowerCase())).length

        if (matchCount === keywordParts.length) {
          relevanceScore += 15 // All parts found, but not as an exact phrase
        } else if (matchCount > 0) {
          relevanceScore += 5 * matchCount // Some parts found
        }
      }
    })

    // Check for keyword matches in description (medium relevance)
    keywords.forEach((keyword) => {
      if (description.toLowerCase().includes(keyword.toLowerCase())) {
        relevanceScore += 15
      }
    })

    // Check for keyword matches in content (lower relevance)
    keywords.forEach((keyword) => {
      if (content.toLowerCase().includes(keyword.toLowerCase())) {
        relevanceScore += 5
      }
    })

    // Boost score for authoritative domains
    const domain = extractDomain(url)
    const parentCategory = Object.entries(resourceCategoryMap).find(([key]) =>
      searchTerm.toLowerCase().includes(key.replace(/-/g, " ")),
    )?.[1]

    const authDomains = parentCategory ? authoritativeDomains[parentCategory] || [] : []
    if (authDomains.some((authDomain) => domain.includes(authDomain))) {
      relevanceScore += 30 // Significant boost for authoritative sources
    }

    // Penalize for exclusion terms
    const exclusions =
      Object.entries(exclusionTerms).find(([key]) => searchTerm.toLowerCase().includes(key.replace(/-/g, " ")))?.[1] ||
      []

    exclusions.forEach((term) => {
      if (title.toLowerCase().includes(term.toLowerCase())) {
        relevanceScore -= 40 // Heavy penalty for exclusion terms in title
      }
      if (description.toLowerCase().includes(term.toLowerCase())) {
        relevanceScore -= 20 // Medium penalty for exclusion terms in description
      }
    })

    return {
      id: `article-${index}-${Date.now()}`,
      title: title || "No title available",
      description: description || "No description available",
      source: article.source?.name || "Unknown Source",
      date: new Date(article.publishedAt).toLocaleDateString() || "Unknown date",
      time: new Date(article.publishedAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      imageUrl: article.urlToImage || "/placeholder.svg?height=200&width=300",
      externalUrl: url,
      relevanceScore: relevanceScore,
    }
  })
}

// Extract domain from URL
function extractDomain(url: string): string {
  try {
    const domain = new URL(url).hostname
    return domain
  } catch (e) {
    return url
  }
}

// Filter articles by relevance and ensure they're on-topic
function filterByRelevance(
  articles: NewsArticle[],
  searchTerm: string,
  topic: string,
  minRelevanceScore = 10,
): NewsArticle[] {
  // First, sort by relevance score
  const sortedArticles = [...articles].sort((a, b) => (b.relevanceScore || 0) - (a.relevanceScore || 0))

  // Filter out articles with low relevance scores
  const relevantArticles = sortedArticles.filter((article) => (article.relevanceScore || 0) >= minRelevanceScore)

  // If we have enough relevant articles, return them
  if (relevantArticles.length >= 3) {
    return relevantArticles
  }

  // Otherwise, return the top sorted articles
  return sortedArticles
}

// Fallback function to use if the API is unavailable or rate limited
export async function getFallbackNewsArticles(topic: string, specificTitle?: string): Promise<NewsArticle[]> {
  console.log("Using fallback news data for topic:", topic)

  // Return a simple fallback article
  return [
    {
      id: "fallback-1",
      title: `Unable to load latest ${specificTitle || topic.replace(/-/g, " ")} news at this time`,
      description: "Please check back later for the latest updates on this topic.",
      source: "Digital Access Hub",
      date: new Date().toLocaleDateString(),
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      imageUrl: "/placeholder.svg?height=200&width=300",
      externalUrl: "#",
    },
  ]
}
