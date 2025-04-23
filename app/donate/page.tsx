"use client"

import { useState } from "react"
import Link from "next/link"
import { Copy, CheckCircle, DollarSign, Gift, Heart, Users, ExternalLink } from "lucide-react"
import SuccessDialog from "@/components/success-dialog"
import SiteHeader from "@/components/site-header"

export default function DonatePage() {
  const [copiedText, setCopiedText] = useState<string | null>(null)
  const [showSuccessDialog, setShowSuccessDialog] = useState(false)

  const handleCopy = async (text: string, label: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopiedText(label)
      setTimeout(() => setCopiedText(null), 2000)
    } catch (err) {
      console.error("Failed to copy text: ", err)
    }
  }

  const donationImpacts = [
    {
      amount: "$25",
      impact: "Provides 1 hour of one-on-one digital literacy training for a senior",
      color: "bg-teal-600",
    },
    {
      amount: "$50",
      impact: "Helps maintain our computer lab for one day",
      color: "bg-teal-700",
    },
    {
      amount: "$100",
      impact: "Sponsors a community workshop on essential online services",
      color: "bg-teal-800",
    },
    {
      amount: "$250",
      impact: "Provides a refurbished computer to a family in need",
      color: "bg-teal-900",
    },
  ]

  return (
    <div className="min-h-screen bg-white">
    <SiteHeader />

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center">Support Our Work</h1>

        {/* Impact Section */}
        <section className="max-w-4xl mx-auto mb-12">
          <p className="text-xl text-gray-700 mb-6">
            Your donation helps us provide essential digital access services to seniors and low-income families in our
            community. With your support, we can:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8"   >
            <div className="bg-teal-50 p-6 rounded-lg flex">
              <div className="mr-4 bg-teal-600 p-3 rounded-full text-white self-start">
                <Gift size={24} />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">Provide Technology</h3>
                <p className="text-gray-700">
                  Purchase computers, tablets, and internet hotspots for community members without access.
                </p>
              </div>
            </div>
            <div className="bg-teal-50 p-6 rounded-lg flex">
              <div className="mr-4 bg-teal-600 p-3 rounded-full text-white self-start">
                <Users size={24} />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">Expand Classes</h3>
                <p className="text-gray-700">Offer more digital literacy classes and one-on-one assistance sessions.</p>
              </div>
            </div>
            <div className="bg-teal-50 p-6 rounded-lg flex">
              <div className="mr-4 bg-teal-600 p-3 rounded-full text-white self-start">
                <Heart size={24} />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">Support Volunteers</h3>
                <p className="text-gray-700">
                  Train and equip our dedicated volunteers with resources to better serve the community.
                </p>
              </div>
            </div>
            <div className="bg-teal-50 p-6 rounded-lg flex">
              <div className="mr-4 bg-teal-600 p-3 rounded-full text-white self-start">
                <DollarSign size={24} />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">Sustain Operations</h3>
                <p className="text-gray-700">
                  Keep our community center open and accessible to those who need our services most.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Donation Methods Section */}
        <section className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Bank Transfer Section */}
            <div className="bg-gray-50 p-8 rounded-xl">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Make a Direct Bank Transfer</h2>

              <div className="flex flex-col items-center mb-8">
                <div className="bg-white p-4 rounded-lg shadow-md mb-4">
                  <img
                    src="/qrcode.jpg?height=300&width=200"
                    alt="Bank transfer QR code"
                    className="w-48 h-58 mx-auto"
                  />
                </div>
                <p className="text-gray-600 text-center">
                  Scan this QR code with your banking app to make a direct transfer
                </p>
              </div>

              <div className="space-y-4">
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-sm text-gray-500">Account Name</p>
                      <p className="font-medium">Digital Access Hub Foundation</p>
                    </div>
                    <button
                      onClick={() => handleCopy("Digital Access Hub Foundation", "Account Name")}
                      className="text-teal-600 hover:text-teal-700 p-2 rounded-full hover:bg-teal-50"
                      aria-label="Copy account name"
                    >
                      {copiedText === "Account Name" ? <CheckCircle size={20} /> : <Copy size={20} />}
                    </button>
                  </div>
                </div>

                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-sm text-gray-500">Account Number</p>
                      <p className="font-medium">1234567890</p>
                    </div>
                    <button
                      onClick={() => handleCopy("1234567890", "Account Number")}
                      className="text-teal-600 hover:text-teal-700 p-2 rounded-full hover:bg-teal-50"
                      aria-label="Copy account number"
                    >
                      {copiedText === "Account Number" ? <CheckCircle size={20} /> : <Copy size={20} />}
                    </button>
                  </div>
                </div>

                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-sm text-gray-500">Bank Name</p>
                      <p className="font-medium">Community First Bank</p>
                    </div>
                    <button
                      onClick={() => handleCopy("Community First Bank", "Bank Name")}
                      className="text-teal-600 hover:text-teal-700 p-2 rounded-full hover:bg-teal-50"
                      aria-label="Copy bank name"
                    >
                      {copiedText === "Bank Name" ? <CheckCircle size={20} /> : <Copy size={20} />}
                    </button>
                  </div>
                </div>
              </div>

              <div className="mt-6 p-4 bg-teal-50 border border-teal-100 rounded-lg">
                <p className="text-gray-700">
                  <strong>Note:</strong> Please include your name and email address in the transfer memo so we can send
                  you a receipt for tax purposes.
                </p>
              </div>

              <div className="mt-6">
                <button
                  onClick={() => setShowSuccessDialog(true)}
                  className="bg-teal-600 text-white px-6 py-3 rounded-lg text-lg font-medium hover:bg-teal-700 transition-colors w-full"
                >
                  I've Made a Donation
                </button>
              </div>
            </div>

            {/* Suggested Donations Section */}
            <div className="mt-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Suggested Donations</h2>
              <p className="text-gray-700 mb-6">Here's how your donation can make a difference:</p>

              <div className="space-y-4 mb-8">
                {donationImpacts.map((item, index) => (
                  <div key={index} className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm">
                    <div className={`${item.color} h-2`}></div>
                    <div className="p-4 flex items-center">
                      <div
                        className={`${item.color} text-white font-bold text-xl rounded-full w-16 h-16 flex items-center justify-center flex-shrink-0`}
                      >
                        {item.amount}
                      </div>
                      <p className="ml-4 text-gray-700">{item.impact}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Other Ways to Give */}
        <section className="max-w-4xl mx-auto mt-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Other Ways to Support Us</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-xl font-bold text-gray-800 mb-3">Mail a Check</h3>
              <p className="text-gray-700">
                Please make checks payable to "Digital Access Hub" and mail to:
                <br />
                Digital Access Hub
                <br />
                1/2 Jalan Taman Bunga Raya,
                <br />
                53300 Setapak, Kuala Lumpur
              </p>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-xl font-bold text-gray-800 mb-3">Corporate Matching</h3>
              <p className="text-gray-700">
                Many employers match charitable contributions made by their employees. Check with your HR department to
                see if your company has a matching gift program.
              </p>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-xl font-bold text-gray-800 mb-3">Donate Equipment</h3>
              <p className="text-gray-700">
                We accept donations of gently used computers, tablets, and smartphones. Please contact us at
                donations@digitalaccesshub.org to arrange a drop-off.
              </p>
            </div>
          </div>
        </section>
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
        title="Thank You for Your Donation!"
        message="Your generous contribution will help bridge the digital divide in our community."
        contactMethod="email"
        actionLink={{ text: "Return to Home", href: "/" }}
      />
    </div>
  )
}
