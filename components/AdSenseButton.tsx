"use client"

import { useEffect, useState } from "react"
import Script from "next/script"

export function AdSenseButton() {
  const [debugInfo, setDebugInfo] = useState<string>("Initializing...")
  const [adStatus, setAdStatus] = useState<string>("Not checked")
  const [showAds, setShowAds] = useState(false)

  useEffect(() => {
    try {
      if (typeof window !== "undefined") {
        if (!window.adsbygoogle) {
          setDebugInfo("AdSense not detected. Script may not have loaded.")
        } else {
          ;(window.adsbygoogle = window.adsbygoogle || []).push({})
          setDebugInfo("AdSense push completed. Waiting for ad to load...")
          // Check if ad loaded after a delay
          setTimeout(() => {
            const adIns = document.querySelector(".adsbygoogle")
            if (adIns && adIns.innerHTML.trim() !== "") {
              setDebugInfo("Ad content detected.")
              setAdStatus("Loaded")
            } else {
              setDebugInfo("No ad content detected after 2 seconds.")
              setAdStatus("Not Loaded")
            }
          }, 2000)
        }
      }
    } catch (err) {
      setDebugInfo(`Error initializing AdSense: ${err}`)
      console.error("Error initializing AdSense:", err)
    }
  }, [])

  return (
    <div className="bg-white/10 p-4 rounded-lg my-4">
      {showAds && (
        <>
          <Script
            async
            src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4689587968961600"
            crossOrigin="anonymous"
            strategy="afterInteractive"
            onLoad={() => setDebugInfo("AdSense script loaded.")}
            onError={() => setDebugInfo("Error loading AdSense script.")}
          />
          <ins
            className="adsbygoogle"
            style={{
              display: "block",
              minHeight: "100px",
              background: "rgba(255,255,255,0.1)",
              border: "2px dashed rgba(255,255,255,0.3)",
              padding: "10px",
              textAlign: "center",
              color: "white",
            }}
            data-ad-client="ca-pub-4689587968961600"
            data-ad-slot="8443996644"
            data-ad-format="auto"
            data-full-width-responsive="true"
          >
            Ad space - If you see this message, ads may not be loading correctly
          </ins>
        </>
      )}
      {!showAds && <div className="text-sm text-white">Ads are currently hidden.</div>}
      <div className="text-sm text-white mb-2">Debug: {debugInfo}</div>
      <div className="text-sm text-white mt-2">Ad Status: {adStatus}</div>
    </div>
  )
}
