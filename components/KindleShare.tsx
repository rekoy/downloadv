"use client"
import { useState } from "react"

interface KindleShareProps {
  title?: string
  url: string
}

export function KindleShare({ title, url }: KindleShareProps) {
  const [email, setEmail] = useState("")

  const handleSendToKindle = () => {
    // Format the email subject and body
    const subject = encodeURIComponent(title || "Shared content for Kindle")
    const body = encodeURIComponent(`Content URL: ${url}\n\nSent via DownloadV`)

    // Open default email client with pre-filled content
    window.location.href = `mailto:${email}@kindle.com?subject=${subject}&body=${body}`
  }

  return null
}
