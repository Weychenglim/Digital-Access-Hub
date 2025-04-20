import Link from "next/link"

interface ResourceCardProps {
  title: string
  category: string
  description: string
  link: string
}

export default function ResourceCard({ title, category, description, link }: ResourceCardProps) {
  return (
    <div className="bg-white border-2 border-gray-200 rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <div className="p-6">
        <div className="inline-block px-3 py-1 text-sm font-semibold text-teal-700 bg-teal-100 rounded-full mb-3">
          {category}
        </div>
        <h3 className="text-2xl font-bold text-gray-800 mb-3">{title}</h3>
        <p className="text-gray-600 text-lg mb-4">{description}</p>
        <Link
          href={link}
          className="inline-block bg-teal-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-teal-700 transition-colors"
        >
          Learn More
        </Link>
      </div>
    </div>
  )
}
