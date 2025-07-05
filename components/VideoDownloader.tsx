"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { getVideoDownloadLink } from "../services/videoDownloader"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import {
  Youtube,
  Facebook,
  Twitter,
  Instagram,
  Music,
  Download,
  Loader2,
  HelpCircle,
  RefreshCw,
  AlertTriangle,
  ExternalLink,
} from "lucide-react"
import Link from "next/link"
import { Smooch_Sans } from "next/font/google"
import { WAmeBanner } from "./WAmeBanner"
import { VideoPreview } from "./VideoPreview"
import { WAmePopup } from "./WAmePopup"
import { Navigation } from "./Navigation"

const smoochSans = Smooch_Sans({ subsets: ["latin"] })

const WHITELIST_IPS = ["your-ip-address", "180.244.166.85"]

interface VideoInfo {
  success: boolean
  title: string
  thumbnail: string
  links: {
    [key: string]: string
  }
  channel?: string
  channelUrl?: string
}

interface Platform {
  id: string
  name: string
  icon: React.ElementType
  color: string
}

// Mock function to get IP address (replace with actual implementation)
const getIpAddress = async (): Promise<string> => {
  // In a real implementation, you would make an API call to get the IP address
  return "127.0.0.1"
}

const isValidUrl = (url: string) => {
  try {
    new URL(url)
    return true
  } catch (e) {
    return false
  }
}

// Function to generate a proper filename from video info
const generateFilename = (title: string, quality: string): string => {
  // Clean the title to make it filename-safe
  const cleanTitle = title
    .replace(/[^\w\s-]/g, "") // Remove special characters except spaces and hyphens
    .replace(/\s+/g, "_") // Replace spaces with underscores
    .substring(0, 50) // Limit length
    .trim()

  // Clean the quality string
  const cleanQuality = quality.replace(/[^\w]/g, "_")

  return `${cleanTitle}_${cleanQuality}.mp4`
}

export default function VideoDownloader() {
  const [url, setUrl] = useState("")
  const [videoInfo, setVideoInfo] = useState<VideoInfo | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [selectedPlatform, setSelectedPlatform] = useState<string | null>(null)
  const [downloadCount, setDownloadCount] = useState(0)
  const [showWAmePopup, setShowWAmePopup] = useState(false)
  const [retryCount, setRetryCount] = useState(0)
  const [usingFallback, setUsingFallback] = useState(false)
  const [apiStatus, setApiStatus] = useState<string>("ready")

  const platforms: Platform[] = [
    { id: "facebook", name: "Facebook", icon: Facebook, color: "#1877F2" },
    { id: "twitter", name: "Twitter", icon: Twitter, color: "#1DA1F2" },
    { id: "youtube", name: "YouTube", icon: Youtube, color: "#FF0000" },
    { id: "instagram", name: "Instagram", icon: Instagram, color: "#E4405F" },
    { id: "tiktok", name: "TikTok", icon: Music, color: "#000000" },
  ]

  useEffect(() => {
    const initDownloadCount = async () => {
      const ip = await getIpAddress()
      const count = localStorage.getItem(`downloadCount_${ip}`)
      if (count) {
        setDownloadCount(Number.parseInt(count, 10))
      }
    }
    initDownloadCount()
  }, [])

  const handleDownload = async () => {
    setLoading(true)
    setError(null)
    setVideoInfo(null)
    setUsingFallback(false)
    setApiStatus("processing")

    try {
      if (!url.trim()) {
        throw new Error("Oops! The URL field is empty. Please paste a video link and try again.")
      }

      if (!isValidUrl(url)) {
        throw new Error("Hmm, that doesn't look like a valid URL. Make sure you've copied the entire video link!")
      }

      const ip = await getIpAddress()

      if (!WHITELIST_IPS.includes(ip)) {
        const newDownloadCount = downloadCount + 1
        setDownloadCount(newDownloadCount)
        localStorage.setItem(`downloadCount_${ip}`, newDownloadCount.toString())

        if (newDownloadCount === 2) {
          setShowWAmePopup(true)
        }
      }

      console.log("Starting download for URL:", url)
      const result = await getVideoDownloadLink(url)
      console.log("Download result:", result)

      if (!result) {
        throw new Error("We couldn't process your request. The server returned an empty response.")
      }

      if (!result.success) {
        throw new Error(
          result.error || "We encountered an issue while fetching your video. Please check the URL and try again.",
        )
      }

      if (!result.links || Object.keys(result.links).length === 0) {
        throw new Error(
          "We couldn't find any download links for this video. The video might be private or unavailable.",
        )
      }

      // Check if we're using a fallback response
      if (result.thumbnail.includes("placeholder.com") || Object.keys(result.links)[0] === "Visit Source") {
        setUsingFallback(true)
        setApiStatus("fallback")
      } else {
        setApiStatus("success")
      }

      setVideoInfo(result)
      setRetryCount(0) // Reset retry count on success
    } catch (err) {
      console.error("Download error:", err)
      setApiStatus("error")
      if (err instanceof Error) {
        console.error("Error message:", err.message)
        console.error("Error stack:", err.stack)
        setError(err.message)
      } else {
        console.error("Unknown error type:", err)
        setError(
          "Uh-oh! Something unexpected happened. Could you try again? If the problem persists, the video might be unavailable.",
        )
      }
    } finally {
      setLoading(false)
    }
  }

  const handleRetry = () => {
    setRetryCount(retryCount + 1)
    handleDownload()
  }

  const detectPlatform = (inputUrl: string) => {
    setUrl(inputUrl)
    const matchedPlatform = platforms.find((p) => inputUrl.includes(p.id))
    if (matchedPlatform) {
      setSelectedPlatform(matchedPlatform.id)
      console.log(`Detected ${matchedPlatform.name} URL`)
    } else {
      setSelectedPlatform(null)
    }
  }

  const handleVideoDownload = async (downloadUrl: string, quality: string) => {
    // If we're using a fallback or it's a "Visit Source" link, just open the URL in a new tab
    if (usingFallback || quality === "Visit Source") {
      window.open(downloadUrl, "_blank")
      return
    }

    // Generate a proper filename
    const filename = generateFilename(videoInfo?.title || "video", quality)

    try {
      // Fetch the video file as a blob
      const response = await fetch(downloadUrl, {
        method: "GET",
        headers: {
          Accept: "video/*,*/*",
        },
      })

      if (!response.ok) {
        throw new Error(`Failed to fetch video: ${response.status}`)
      }

      // Get the video as a blob
      const blob = await response.blob()

      // Create a blob URL
      const blobUrl = URL.createObjectURL(blob)

      // Create a temporary anchor element to trigger download
      const a = document.createElement("a")
      a.href = blobUrl
      a.download = filename
      a.style.display = "none"
      document.body.appendChild(a)
      a.click()

      // Clean up
      document.body.removeChild(a)
      URL.revokeObjectURL(blobUrl)
    } catch (error) {
      console.error("Download failed:", error)
      // Fallback to direct link if blob download fails
      const a = document.createElement("a")
      a.href = downloadUrl
      a.download = filename
      a.target = "_blank"
      a.rel = "noopener noreferrer"
      a.style.display = "none"
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1a1a2e] via-[#1a2e2e] to-[#1a1a2e] text-white">
      <Navigation />
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center space-y-4 text-center">
            <div className="mb-8">
              <h1 className={`text-4xl font-bold text-yellow-400 animate-bounce ${smoochSans.className}`}>
                DOWNLOADV.COM
              </h1>
            </div>
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                Social Media Video Downloader
              </h1>
              <p className="mx-auto max-w-[700px] text-zinc-200 md:text-xl">
                Download videos from your favorite social media platforms with ease.
              </p>
              <Button asChild variant="link" className="text-blue-400 hover:text-blue-300">
                <Link href="/how-to-download">
                  <HelpCircle className="w-4 h-4 mr-2" />
                  How to download videos
                </Link>
              </Button>
            </div>
            <div className="w-full max-w-full space-y-2">
              <div className="flex flex-wrap justify-center gap-2 mb-4">
                {platforms.map((platform) => (
                  <Button
                    key={platform.id}
                    variant="outline"
                    size="sm"
                    className={`transition-all ${
                      selectedPlatform === platform.id
                        ? "bg-white/20 text-white"
                        : "bg-white/10 text-white/70 hover:bg-white/20 hover:text-white"
                    }`}
                    onClick={() => setSelectedPlatform(platform.id)}
                  >
                    <platform.icon className="w-4 h-4 mr-2" />
                    <span className="hidden sm:inline">{platform.name}</span>
                  </Button>
                ))}
              </div>
              <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
                <Input
                  className="flex-grow w-full sm:w-3/4 md:w-4/5 lg:w-5/6 bg-white/10 text-white placeholder-white/50"
                  placeholder="Enter video URL"
                  type="url"
                  value={url}
                  onChange={(e) => detectPlatform(e.target.value)}
                />
                <Button
                  onClick={handleDownload}
                  disabled={loading || !url.trim()}
                  className={`bg-blue-600 hover:bg-blue-700 text-white ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
                >
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Processing
                    </>
                  ) : (
                    <>
                      <Download className="mr-2 h-4 w-4" />
                      Download
                    </>
                  )}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="container px-4 md:px-6 py-6">
        {apiStatus === "processing" && (
          <Alert className="mb-6 bg-blue-900/50 border-blue-700/50 text-white">
            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
            <AlertDescription>
              Processing your request... We're trying to get the best download links for your video.
            </AlertDescription>
          </Alert>
        )}

        {error && (
          <Alert variant="destructive" className="mb-6 bg-red-900/50 border-red-700/50 text-white">
            <AlertTitle className="text-lg font-semibold">Oops! We hit a snag</AlertTitle>
            <AlertDescription className="text-base">
              {error}
              <div className="mt-3">
                <Button
                  variant="outline"
                  className="bg-white/10 hover:bg-white/20 text-white"
                  onClick={handleRetry}
                  disabled={loading}
                >
                  <RefreshCw className="mr-2 h-4 w-4" />
                  Try Again {retryCount > 0 ? `(${retryCount})` : ""}
                </Button>
              </div>
            </AlertDescription>
          </Alert>
        )}

        {videoInfo && (
          <Card className="bg-white/10 text-white border-white/20">
            <CardContent className="p-6">
              {usingFallback && (
                <Alert className="mb-4 bg-yellow-600/50 border-yellow-500/50 text-white">
                  <AlertTriangle className="h-4 w-4 mr-2" />
                  <AlertDescription>
                    Our download service is currently experiencing issues. We'll redirect you to the source page where
                    you can download the video manually.
                  </AlertDescription>
                </Alert>
              )}
              <h3 className="font-semibold text-xl sm:text-2xl mb-4">
                {videoInfo.title?.length > 100 ? `${videoInfo.title.substring(0, 100)}...` : videoInfo.title}
              </h3>
              {videoInfo.channel && (
                <p className="text-zinc-200 mb-4 text-sm sm:text-base">
                  Channel:{" "}
                  {videoInfo.channelUrl ? (
                    <a
                      href={videoInfo.channelUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-400 hover:underline"
                    >
                      {videoInfo.channel}
                    </a>
                  ) : (
                    videoInfo.channel
                  )}
                </p>
              )}
              <div className="mb-6">
                <VideoPreview
                  title={videoInfo.title}
                  thumbnail={videoInfo.thumbnail}
                  videoUrl={Object.values(videoInfo.links)[0]}
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {Object.entries(videoInfo.links).map(([quality, link]) => (
                  <Button
                    key={quality}
                    variant="secondary"
                    className="w-full py-2 text-sm bg-white/20 hover:bg-white/30 text-white"
                    onClick={() => handleVideoDownload(link, quality)}
                  >
                    {quality === "Visit Source" ? (
                      <>
                        <ExternalLink className="mr-2 h-4 w-4" />
                        {quality}
                      </>
                    ) : (
                      <>
                        <Download className="mr-2 h-4 w-4" />
                        Download {quality}
                      </>
                    )}
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        <WAmeBanner />
      </div>

      <WAmePopup isOpen={showWAmePopup} onClose={() => setShowWAmePopup(false)} />
    </div>
  )
}
