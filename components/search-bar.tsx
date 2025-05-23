"use client"

import type React from "react"

import { Search } from "lucide-react"
import { useRouter } from "next/navigation"
import { useState } from "react"

export default function SearchBar() {
  const [searchQuery, setSearchQuery] = useState("")
  const router = useRouter()

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/websites?search=${encodeURIComponent(searchQuery)}`)
    }
  }

  return (
    <form onSubmit={handleSearch} className="max-w-3xl mx-auto w-full">
      <div className="relative flex items-center">
        <input
          type="text"
          placeholder="Search for websites (e.g., 'government services', 'healthcare')"
          className="w-full px-6 py-4 text-lg border-2 border-gray-300 rounded-full focus:outline-none focus:border-teal-500"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          aria-label="Search for websites"
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
  )
}
