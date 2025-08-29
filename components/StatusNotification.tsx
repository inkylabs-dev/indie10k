"use client"

import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"

export default function StatusNotification() {
  const searchParams = useSearchParams()
  const [statusMessage, setStatusMessage] = useState("")

  useEffect(() => {
    const status = searchParams.get('status')
    if (status === 'confirmed') {
      setStatusMessage("🎉 Email confirmed! Welcome to the waitlist.")
    } else if (status === 'invalid') {
      setStatusMessage("❌ Invalid confirmation link. Please try signing up again.")
    }
  }, [searchParams])

  if (!statusMessage) {
    return null
  }

  return (
    <div className={`fixed top-20 left-1/2 transform -translate-x-1/2 z-50 px-6 py-3 rounded-lg shadow-lg ${
      statusMessage.includes('🎉') ? 'bg-green-50 text-green-800 border border-green-200' : 'bg-red-50 text-red-800 border border-red-200'
    }`}>
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium">{statusMessage}</span>
        <button 
          onClick={() => setStatusMessage("")}
          className="ml-4 text-gray-400 hover:text-gray-600"
          aria-label="Close notification"
        >
          ×
        </button>
      </div>
    </div>
  )
}