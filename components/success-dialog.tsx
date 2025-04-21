"use client"

import { useState, useEffect } from "react"
import { CheckCircle, X } from "lucide-react"
import Link from "next/link"

interface SuccessDialogProps {
  isOpen: boolean
  onClose: () => void
  title: string
  message: string
  contactMethod?: string
  actionLink?: {
    text: string
    href: string
  }
}

export default function SuccessDialog({
  isOpen,
  onClose,
  title,
  message,
  contactMethod = "email",
  actionLink,
}: SuccessDialogProps) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true)
      // Prevent scrolling when dialog is open
      document.body.style.overflow = "hidden"
    } else {
      // Allow scrolling when dialog is closed
      document.body.style.overflow = "auto"
    }

    return () => {
      document.body.style.overflow = "auto"
    }
  }, [isOpen])

  if (!isOpen) return null

  const handleClose = () => {
    setIsVisible(false)
    setTimeout(() => {
      onClose()
    }, 300) // Match transition duration
  }

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50 transition-opacity duration-300 ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
      onClick={handleClose}
      aria-modal="true"
      role="dialog"
    >
      <div
        className={`bg-white rounded-xl shadow-2xl max-w-md w-full p-6 transform transition-all duration-300 ${
          isVisible ? "scale-100" : "scale-95"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="absolute top-4 right-4">
          <button
            onClick={handleClose}
            className="text-gray-500 hover:text-gray-700 transition-colors"
            aria-label="Close dialog"
          >
            <X size={24} />
          </button>
        </div>

        <div className="flex flex-col items-center text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6">
            <CheckCircle size={40} className="text-green-600" />
          </div>

          <h2 className="text-2xl font-bold text-gray-800 mb-3">{title}</h2>

          <p className="text-gray-700 mb-4">{message}</p>

          <div className="bg-teal-50 border border-teal-200 rounded-lg p-4 mb-6 w-full">
            <p className="text-teal-800">We'll contact you soon via {contactMethod} with more information.</p>
          </div>

          {actionLink && (
            <Link
              href={actionLink.href}
              className="bg-teal-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-teal-700 transition-colors"
            >
              {actionLink.text}
            </Link>
          )}
        </div>
      </div>
    </div>
  )
}
    