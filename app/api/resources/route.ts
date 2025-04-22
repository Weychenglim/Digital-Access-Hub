import { NextResponse } from "next/server"

// This would typically come from a database
const resources = [
  {
    id: 1,
    title: "Medicare Enrollment Assistance",
    category: "Healthcare",
    description: "Get help signing up for Medicare benefits and understanding your coverage options.",
    link: "/resources/healthcare/medicare",
  },
  {
    id: 2,
    title: "Food Assistance Programs",
    category: "Government",
    description: "Information about SNAP benefits, food banks, and meal delivery services in your area.",
    link: "/resources/government/food-assistance",
  },
  {
    id: 3,
    title: "Free Computer Classes",
    category: "Community",
    description: "Weekly classes at the community center to help you learn basic computer skills.",
    link: "/resources/community/computer-classes",
  },
  {
    id: 4,
    title: "Affordable Housing Options",
    category: "Housing",
    description: "Find information about low-income housing, rental assistance, and housing vouchers.",
    link: "/resources/housing/affordable-options",
  },
  {
    id: 5,
    title: "Senior Transportation Services",
    category: "Transportation",
    description: "Free and reduced-cost transportation options for seniors and disabled individuals.",
    link: "/resources/transportation/senior-services",
  },
  {
    id: 6,
    title: "Adult Education Programs",
    category: "Education",
    description: "GED classes, vocational training, and continuing education opportunities.",
    link: "/resources/education/adult-programs",
  },
  {
    id: 7,
    title: "Utility Bill Assistance",
    category: "Government",
    description: "Programs to help with electricity, water, and heating costs for low-income households.",
    link: "/resources/government/utility-assistance",
  },
  {
    id: 8,
    title: "Free Health Screenings",
    category: "Healthcare",
    description: "Information about free and low-cost health screenings in your community.",
    link: "/resources/healthcare/screenings",
  },
  {
    id: 9,
    title: "Community Garden Program",
    category: "Community",
    description: "Join a local community garden to grow your own fresh produce and connect with neighbors.",
    link: "/resources/community/garden",
  },
]

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const category = searchParams.get("category")
  const query = searchParams.get("q")

  let filteredResources = [...resources]

  // Filter by category if provided
  if (category) {
    filteredResources = filteredResources.filter(
      (resource) => resource.category.toLowerCase() === category.toLowerCase(),
    )
  }

  // Filter by search query if provided
  if (query) {
    const searchTerms = query.toLowerCase().split(" ")
    filteredResources = filteredResources.filter((resource) => {
      const resourceText = `${resource.title} ${resource.description} ${resource.category}`.toLowerCase()
      return searchTerms.some((term) => resourceText.includes(term))
    })
  }

  return NextResponse.json(filteredResources)
}

export async function POST(request: Request) {
  try {
    const data = await request.json()

    // In a real application, this would validate and save to a database
    // For now, we'll just return a success message

    return NextResponse.json({
      success: true,
      message: "Resource request received",
    })
  } catch (error) {
    return NextResponse.json({ success: false, message: "Invalid request data" }, { status: 400 })
  }
}
