"use client"

import type React from "react"

import { submitVolunteerApplication, type VolunteerFormData } from "@/app/actions/volunteer-actions"
import SuccessDialog from "@/components/success-dialog"
import Link from "next/link"
import { useState } from "react"

export default function VolunteerPage() {
    const [formData, setFormData] = useState<VolunteerFormData>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    interests: [],
    availability: [],
    experience: "",
    message: "",
  })

  const [showSuccessDialog, setShowSuccessDialog] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, checked } = e.target
    setFormData((prev) => {
      if (checked) {
        return { ...prev, [name]: [...(prev[name as keyof typeof prev] as string[]), value] }
      } else {
        return {
          ...prev,
          [name]: (prev[name as keyof typeof prev] as string[]).filter((item) => item !== value),
        }
      }
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    setIsSubmitting(true)
    setError(null)

    try {
      // Call the server action to submit the form
      const result = await submitVolunteerApplication(formData)

      if (result.success) {
        setShowSuccessDialog(true)
        setFormData({
            firstName: "",
            lastName: "",
            email: "",
            phone: "",
            interests: [],
            availability: [],
            experience: "",
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
      <header className="bg-teal-600 text-white py-4 shadow-md">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <h1 className="text-3xl font-bold mb-4 md:mb-0">Digital Access Hub</h1>
            <nav>
              <ul className="flex space-x-6 text-lg">
                <li>
                  <Link href="/" className="hover:underline font-medium">
                    Home
                  </Link>
                </li>
                <li>
                  <Link href="/websites" className="hover:underline font-medium">
                    All Websites
                  </Link>
                </li>
                <li>
                  <Link href="/help" className="hover:underline font-medium">
                    Get Help
                  </Link>
                </li>
                <li>
                  <Link href="/about" className="hover:underline font-medium">
                    About Us
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center">Become a Volunteer</h1>
          <>
            {/* Intro Section */}
            <section className="max-w-4xl mx-auto mb-12">
              <p className="text-xl text-gray-700 mb-6">
                Our volunteers are the heart of Digital Access Hub. By sharing your time and skills, you can make a
                meaningful difference in the lives of seniors and low-income families in our community.
              </p>
              <p className="text-xl text-gray-700 mb-6">
                No technical expertise? No problem! We provide training for all volunteers and have roles that match a
                variety of skills and interests.
              </p>
            </section>

            {/* Volunteer Opportunities */}
            <section className="bg-teal-50 rounded-xl p-8 mb-12 max-w-4xl mx-auto">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Volunteer Opportunities</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <h3 className="text-xl font-bold text-gray-800 mb-3">Digital Navigator</h3>
                  <p className="text-gray-700 mb-2">
                    Help community members find and use online resources, apply for benefits, and navigate websites.
                  </p>
                  <p className="text-gray-600 italic">Time commitment: 3-4 hours/week</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <h3 className="text-xl font-bold text-gray-800 mb-3">Computer Skills Instructor</h3>
                  <p className="text-gray-700 mb-2">
                    Teach basic computer skills, email setup, internet safety, and more in small group settings.
                  </p>
                  <p className="text-gray-600 italic">Time commitment: 2-6 hours/week</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <h3 className="text-xl font-bold text-gray-800 mb-3">Tech Support Helper</h3>
                  <p className="text-gray-700 mb-2">
                    Assist with device setup, troubleshooting, and maintenance for community members.
                  </p>
                  <p className="text-gray-600 italic">Time commitment: 2-4 hours/week</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <h3 className="text-xl font-bold text-gray-800 mb-3">Outreach Volunteer</h3>
                  <p className="text-gray-700 mb-2">
                    Help spread the word about our services at community events and local organizations.
                  </p>
                  <p className="text-gray-600 italic">Time commitment: 2-8 hours/month</p>
                </div>
              </div>
            </section>

            {/* Volunteer Form */}
            <section className="max-w-3xl mx-auto">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Volunteer Application</h2>
              {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
              <p>{error}</p>
            </div>
          )}
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="firstName" className="block text-lg font-medium text-gray-700 mb-2">
                      First Name*
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 text-lg border-2 border-gray-300 rounded-lg focus:outline-none focus:border-teal-500"
                      required
                      disabled={isSubmitting}
                    />
                  </div>
                  <div>
                    <label htmlFor="lastName" className="block text-lg font-medium text-gray-700 mb-2">
                      Last Name*
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 text-lg border-2 border-gray-300 rounded-lg focus:outline-none focus:border-teal-500"
                      required
                      disabled={isSubmitting}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="email" className="block text-lg font-medium text-gray-700 mb-2">
                      Email Address*
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
                      Phone Number*
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
                </div>

                <div>
                  <fieldset disabled={isSubmitting}>
                    <legend className="block text-lg font-medium text-gray-700 mb-2">
                      I'm interested in volunteering as a: (select all that apply)*
                    </legend>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div className="flex items-start">
                        <input
                          type="checkbox"
                          id="interest-navigator"
                          name="interests"
                          value="Digital Navigator"
                          onChange={handleCheckboxChange}
                          className="mt-1 h-4 w-4 text-teal-600 border-gray-300 rounded"
                        />
                        <label htmlFor="interest-navigator" className="ml-2 block text-gray-700">
                          Digital Navigator
                        </label>
                      </div>
                      <div className="flex items-start">
                        <input
                          type="checkbox"
                          id="interest-instructor"
                          name="interests"
                          value="Computer Skills Instructor"
                          onChange={handleCheckboxChange}
                          className="mt-1 h-4 w-4 text-teal-600 border-gray-300 rounded"
                        />
                        <label htmlFor="interest-instructor" className="ml-2 block text-gray-700">
                          Computer Skills Instructor
                        </label>
                      </div>
                      <div className="flex items-start">
                        <input
                          type="checkbox"
                          id="interest-tech"
                          name="interests"
                          value="Tech Support Helper"
                          onChange={handleCheckboxChange}
                          className="mt-1 h-4 w-4 text-teal-600 border-gray-300 rounded"
                        />
                        <label htmlFor="interest-tech" className="ml-2 block text-gray-700">
                          Tech Support Helper
                        </label>
                      </div>
                      <div className="flex items-start">
                        <input
                          type="checkbox"
                          id="interest-outreach"
                          name="interests"
                          value="Outreach Volunteer"
                          onChange={handleCheckboxChange}
                          className="mt-1 h-4 w-4 text-teal-600 border-gray-300 rounded"
                        />
                        <label htmlFor="interest-outreach" className="ml-2 block text-gray-700">
                          Outreach Volunteer
                        </label>
                      </div>
                    </div>
                  </fieldset>
                </div>

                <div>
                  <fieldset disabled={isSubmitting}>
                    <legend className="block text-lg font-medium text-gray-700 mb-2">
                      Availability: (select all that apply)*
                    </legend>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                      <div className="flex items-start">
                        <input
                          type="checkbox"
                          id="avail-weekday-morning"
                          name="availability"
                          value="Weekday mornings"
                          onChange={handleCheckboxChange}
                          className="mt-1 h-4 w-4 text-teal-600 border-gray-300 rounded"
                        />
                        <label htmlFor="avail-weekday-morning" className="ml-2 block text-gray-700">
                          Weekday mornings
                        </label>
                      </div>
                      <div className="flex items-start">
                        <input
                          type="checkbox"
                          id="avail-weekday-afternoon"
                          name="availability"
                          value="Weekday afternoons"
                          onChange={handleCheckboxChange}
                          className="mt-1 h-4 w-4 text-teal-600 border-gray-300 rounded"
                        />
                        <label htmlFor="avail-weekday-afternoon" className="ml-2 block text-gray-700">
                          Weekday afternoons
                        </label>
                      </div>
                      <div className="flex items-start">
                        <input
                          type="checkbox"
                          id="avail-weekday-evening"
                          name="availability"
                          value="Weekday evenings"
                          onChange={handleCheckboxChange}
                          className="mt-1 h-4 w-4 text-teal-600 border-gray-300 rounded"
                        />
                        <label htmlFor="avail-weekday-evening" className="ml-2 block text-gray-700">
                          Weekday evenings
                        </label>
                      </div>
                      <div className="flex items-start">
                        <input
                          type="checkbox"
                          id="avail-weekend-morning"
                          name="availability"
                          value="Weekend mornings"
                          onChange={handleCheckboxChange}
                          className="mt-1 h-4 w-4 text-teal-600 border-gray-300 rounded"
                        />
                        <label htmlFor="avail-weekend-morning" className="ml-2 block text-gray-700">
                          Weekend mornings
                        </label>
                      </div>
                      <div className="flex items-start">
                        <input
                          type="checkbox"
                          id="avail-weekend-afternoon"
                          name="availability"
                          value="Weekend afternoons"
                          onChange={handleCheckboxChange}
                          className="mt-1 h-4 w-4 text-teal-600 border-gray-300 rounded"
                        />
                        <label htmlFor="avail-weekend-afternoon" className="ml-2 block text-gray-700">
                          Weekend afternoons
                        </label>
                      </div>
                    </div>
                  </fieldset>
                </div>

                <div>
                  <label htmlFor="experience" className="block text-lg font-medium text-gray-700 mb-2">
                    Relevant Experience
                  </label>
                  <select
                    id="experience"
                    name="experience"
                    value={formData.experience}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 text-lg border-2 border-gray-300 rounded-lg focus:outline-none focus:border-teal-500"
                    disabled={isSubmitting}
                  >
                    <option value="">Select your experience level</option>
                    <option value="No experience">No experience (and that's okay!)</option>
                    <option value="Some experience">Some experience</option>
                    <option value="Experienced">Experienced</option>
                    <option value="Professional">Professional in the field</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-lg font-medium text-gray-700 mb-2">
                    Why are you interested in volunteering with us?
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

                <div className="pt-4">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                className={`bg-teal-600 text-white px-8 py-3 rounded-lg text-lg font-medium hover:bg-teal-700 transition-colors ${
                  isSubmitting ? "opacity-70 cursor-not-allowed" : ""
                }`}
                  >
                    {isSubmitting ? "Submitting..." : "Submit Application"}
                  </button>
                </div>
              </form>
            </section>
          </>
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
                  <Link href="/websites" className="text-gray-300 hover:text-white">
                    All Websites
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
        title="Volunteer Application Submitted!"
        message="Thank you for your interest in volunteering with Digital Access Hub."
        contactMethod="email"
        actionLink={{ text: "Explore Websites", href: "/websites" }}
      />
    </div>
  )
}
