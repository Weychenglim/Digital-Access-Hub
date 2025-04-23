import { NextResponse } from "next/server"
import Papa from "papaparse"

export async function GET() {
  try {
    // Fetch the CSV file from the provided URL
    const csvUrl =
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Website_Categories_and_Descriptions-eBsFv6T0heTlSzWTaTXwuYIHN0TSac.csv"
    const response = await fetch(csvUrl)

    if (!response.ok) {
      throw new Error(`Failed to fetch CSV: ${response.status}`)
    }

    const csvText = await response.text()

    // Parse the CSV data
    const { data, errors } = Papa.parse(csvText, {
      header: true,
      skipEmptyLines: true,
    })

    if (errors.length > 0) {
      console.error("CSV parsing errors:", errors)
    }

    return NextResponse.json(data)
  } catch (error) {
    console.error("Error in websites API route:", error)
    return NextResponse.json({ error: "Failed to fetch website data" }, { status: 500 })
  }
}
