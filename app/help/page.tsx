"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Phone, Mail, MapPin, Calendar, Clock, Users } from "lucide-react"
import SuccessDialog from "@/components/success-dialog"
import { submitAssistanceRequest, type AssistanceRequestData } from "@/app/actions/help-actions"
import SiteHeader from "@/components/site-header"

export default function HelpPage() {
  const [formData, setFormData] = useState<AssistanceRequestData>({
    name: "",
    email: "",
    phone: "",
    helpType: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [showSuccessDialog, setShowSuccessDialog] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)

    try {
      // Call the server action to submit the form
      const result = await submitAssistanceRequest(formData)
      if (result.success) {
        setShowSuccessDialog(true)
        setFormData({
          name: "",
          email: "",
          phone: "",
          helpType: "",
          message: "",
        })
      } else {
        setError(result.message)
      }
    } catch (err) {
      setError("An unexpected error occurred. Please try again.")
      console.error("Error submitting form:", err)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <SiteHeader />

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center">Get Help</h1>

        <div className="max-w-5xl mx-auto">
          <div className="bg-teal-50 p-8 rounded-xl mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">How We Can Help You</h2>
            <p className="text-xl text-gray-700 mb-6">Our trained volunteers can assist you with:</p>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 text-lg">
              <li className="flex items-start">
                <div className="bg-teal-600 p-2 rounded-full text-white mr-3 mt-1">
                  <Users size={20} />
                </div>
                <span>Finding and applying for government benefits</span>
              </li>
              <li className="flex items-start">
                <div className="bg-teal-600 p-2 rounded-full text-white mr-3 mt-1">
                  <Users size={20} />
                </div>
                <span>Navigating healthcare websites and portals</span>
              </li>
              <li className="flex items-start">
                <div className="bg-teal-600 p-2 rounded-full text-white mr-3 mt-1">
                  <Users size={20} />
                </div>
                <span>Setting up email accounts and basic computer skills</span>
              </li>
              <li className="flex items-start">
                <div className="bg-teal-600 p-2 rounded-full text-white mr-3 mt-1">
                  <Users size={20} />
                </div>
                <span>Finding community resources and events</span>
              </li>
              <li className="flex items-start">
                <div className="bg-teal-600 p-2 rounded-full text-white mr-3 mt-1">
                  <Users size={20} />
                </div>
                <span>Printing and scanning important documents</span>
              </li>
              <li className="flex items-start">
                <div className="bg-teal-600 p-2 rounded-full text-white mr-3 mt-1">
                  <Users size={20} />
                </div>
                <span>Learning to use smartphones and tablets</span>
              </li>
            </ul>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Contact Information</h2>
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="bg-teal-600 p-3 rounded-full text-white mr-4">
                    <Phone size={24} />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-1">Phone Support</h3>
                    <p className="text-lg text-gray-700">012-3456789</p>
                    <p className="text-gray-600">Monday-Friday, 9am-5pm</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-teal-600 p-3 rounded-full text-white mr-4">
                    <Mail size={24} />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-1">Email Support</h3>
                    <p className="text-lg text-gray-700">help@digitalaccesshub.org</p>
                    <p className="text-gray-600">We respond within 24 hours</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-teal-600 p-3 rounded-full text-white mr-4">
                    <MapPin size={24} />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-1">In-Person Help</h3>
                    <p className="text-gray-600">1/2 Jalan Taman Bunga Raya, 53300 Setapak, Kuala Lumpur</p>
                    <p className="text-gray-600">Monday-Saturday, 10am-4pm</p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Schedule Assistance</h2>
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
                  <p>{error}</p>
                </div>
                )}
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-lg font-medium text-gray-700 mb-2">
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 text-lg border-2 border-gray-300 rounded-lg focus:outline-none focus:border-teal-500"
                    required
                    disabled={isSubmitting}
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-lg font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                   name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 text-lg border-2 border-gray-300 rounded-lg focus:outline-none focus:border-teal-500"
                    required
                    disabled={isSubmitting}
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-lg font-medium text-gray-700 mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 text-lg border-2 border-gray-300 rounded-lg focus:outline-none focus:border-teal-500"
                    required
                    disabled={isSubmitting}
                  />
                </div>
                <div>
                  <label htmlFor="helpType" className="block text-lg font-medium text-gray-700 mb-2">
                    What do you need help with?
                  </label>
                  <select
                    id="helpType"
                    name="helpType"
                    value={formData.helpType}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 text-lg border-2 border-gray-300 rounded-lg focus:outline-none focus:border-teal-500"
                    required
                    disabled={isSubmitting}
                  >
                    <option value="">Please select...</option>
                    <option value="government">Government Benefits</option>
                    <option value="healthcare">Healthcare Resources</option>
                    <option value="computer">Computer Skills</option>
                    <option value="smartphone">Smartphone/Tablet Help</option>
                    <option value="documents">Document Assistance</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="message" className="block text-lg font-medium text-gray-700 mb-2">
                    Additional Information
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={4}
                    className="w-full px-4 py-3 text-lg border-2 border-gray-300 rounded-lg focus:outline-none focus:border-teal-500"
                    disabled={isSubmitting}
                  ></textarea>
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`bg-teal-600 text-white px-6 py-3 rounded-lg text-lg font-medium hover:bg-teal-700 transition-colors ${
                    isSubmitting ? "opacity-70 cursor-not-allowed" : ""
                  }`}
                >
                  {isSubmitting ? "Submitting..." : "Request Assistance"}
                </button>
              </form>
            </div>
          </div>

          <div className="bg-gray-100 p-8 rounded-xl">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Upcoming Help Sessions</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex items-center mb-4">
                  <Calendar size={24} className="text-teal-600 mr-3" />
                  <h3 className="text-xl font-semibold">Computer Basics Workshop</h3>
                </div>
                <p className="text-gray-700 mb-3">
                  Learn essential computer skills including email, web browsing, and word processing.
                </p>
                <div className="flex items-center text-gray-600 mb-2">
                  <Clock size={18} className="mr-2" />
                  <span>Every Tuesday, 10:00 AM - 12:00 PM</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <MapPin size={18} className="mr-2" />
                  <span>Room 101, Jalan Taman Bunga Raya, Setapak</span>
                </div>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex items-center mb-4">
                  <Calendar size={24} className="text-teal-600 mr-3" />
                  <h3 className="text-xl font-semibold">Benefits Application Assistance</h3>
                </div>
                <p className="text-gray-700 mb-3">
                  Get help applying for government benefits including Medicare, SNAP, and housing assistance.
                </p>
                <div className="flex items-center text-gray-600 mb-2">
                  <Clock size={18} className="mr-2" />
                  <span>Every Thursday, 1:00 PM - 4:00 PM</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <MapPin size={18} className="mr-2" />
                  <span>Room 101, Jalan Taman Bunga Raya, Setapak</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-10 mt-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">Digital Access Hub</h3>
              <p className="text-gray-300">
                Helping seniors and low-income families access essential online resources.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/" className="text-gray-300 hover:text-white">
                    Home
                  </Link>
                </li>
                <li>
                  <Link href="/resources" className="text-gray-300 hover:text-white">
                    Resources
                  </Link>
                </li>
                <li>
                  <Link href="/help" className="text-gray-300 hover:text-white">
                    Get Help
                  </Link>
                </li>
                <li>
                  <Link href="/about" className="text-gray-300 hover:text-white">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="text-gray-300 hover:text-white">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">Contact Us</h3>
              <p className="text-gray-300 mb-2">1/2 Jalan Taman Bunga Raya,</p>
              <p className="text-gray-300 mb-2">53300 Setapak, Kuala Lumpur</p>
              <p className="text-gray-300 mb-2">012-3456789</p>
              <p className="text-gray-300">help@digitalaccesshub.org</p>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center">
            <p className="text-gray-300">© 2025 Digital Access Hub. All rights reserved.</p>
          </div>
        </div>
      </footer>
      <SuccessDialog
        isOpen={showSuccessDialog}
        onClose={() => setShowSuccessDialog(false)}
        title="Assistance Request Received!"
        message="Thank you for reaching out. We've received your request for assistance."
        contactMethod="email or phone"
        actionLink={{ text: "Return to Home", href: "/" }}
      />
    </div>
  )
}
