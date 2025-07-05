"use client"

import { useEffect } from "react"
import Script from "next/script"

export function AdSenseIklan() {
  useEffect(() => {
    try {
      ;(window.adsbygoogle = window.adsbygoogle || []).push({})
    } catch (err) {
      console.error("Error initializing AdSense:", err)
    }
  }, [])

  return (
    <div className="my-8">
      <Script
        async
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4689587968961600"
        crossOrigin="anonymous"
        strategy="afterInteractive"
      />
      <ins
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client="ca-pub-4689587968961600"
        data-ad-slot="7750696223"
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  )
}
