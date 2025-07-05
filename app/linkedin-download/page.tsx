"use client"

import type React from "react"

import { useState } from "react"
import { Navigation } from "@/components/Navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Download, Loader2, Clock } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface VideoQuality {
  url: string
  quality: string
  bitrate: number
  extension: string
  type: string
}

interface LinkedInVideoData {
  url: string
  source: string
  author: string
  title: string
  thumbnail: string
  duration: number
  type: string
  error: boolean
  message?: string // Added message property
  videos: VideoQuality[]
}

async function getLinkedInVideoData(url: string): Promise<LinkedInVideoData> {
  return new Promise((resolve, reject) => {
    const data = null
    const xhr = new XMLHttpRequest()
    xhr.withCredentials = true

    xhr.addEventListener("readystatechange", function () {
      if (this.readyState === this.DONE) {
        if (this.status >= 200 && this.status < 300) {
          try {
            const response = JSON.parse(this.responseText)
            console.log("API Response:", response)
            if (response.error) {
              reject(new Error(response.message || "Failed to fetch video data"))
            } else {
              resolve(response)
            }
          } catch (error) {
            console.error("Failed to parse API response:", error)
            reject(new Error("Failed to parse API response"))
          }
        } else {
          console.error("HTTP error:", this.status, this.statusText)
          reject(new Error(`HTTP error! status: ${this.status}`))
        }
      }
    })

    xhr.addEventListener("error", (e) => {
      console.error("XHR error:", e)
      reject(new Error("Network error occurred"))
    })

    xhr.open("GET", `https://linkedin-downloader.p.rapidapi.com/download?url=${encodeURIComponent(url)}`)
    xhr.setRequestHeader("x-rapidapi-key", "b6b90be852msh3f00f26aa5cf0bfp1f1b8ajsn5b2a8f08a124")
    xhr.setRequestHeader("x-rapidapi-host", "linkedin-downloader.p.rapidapi.com")

    xhr.send(data)
  })
}

function formatDuration(seconds: number): string {
  const minutes = Math.floor(seconds / 60)
  const remainingSeconds = seconds % 60
  return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`
}

export default function LinkedInDownload() {
  const [url, setUrl] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [videoData, setVideoData] = useState<LinkedInVideoData | null>(null)
  const [selectedQuality, setSelectedQuality] = useState<string>("")

  const handleDownload = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    setVideoData(null)
    setSelectedQuality("")

    try {
      if (!url.trim()) {
        throw new Error("Please enter a LinkedIn video URL.")
      }

      if (!url.includes("linkedin.com")) {
        throw new Error("Please enter a valid LinkedIn URL.")
      }

      const data = await getLinkedInVideoData(url)
      console.log("API response data:", data)

      if (data.error) {
        throw new Error("Failed to fetch video data")
      }

      setVideoData(data)
      if (data.videos && data.videos.length > 0) {
        setSelectedQuality(data.videos[0].quality)
      }
    } catch (err) {
      console.error("Error fetching LinkedIn video:", err)
      setError(
        err instanceof Error
          ? err.message
          : "An unexpected error occurred while fetching the video. Please try again later.",
      )
    } finally {
      setLoading(false)
    }
  }

  const getSelectedVideoUrl = () => {
    if (!videoData || !selectedQuality) return ""
    const selectedVideo = videoData.videos.find((v) => v.quality === selectedQuality)
    return selectedVideo ? selectedVideo.url : ""
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1a1a2e] via-[#1a2e2e] to-[#1a1a2e] text-white">
      <Navigation />
      <main className="container mx-auto px-4 py-8">
        <Card className="bg-white/10 border-white/20 text-white">
          <CardHeader>
            <CardTitle className="text-2xl font-bold">LinkedIn Video Downloader</CardTitle>
            <CardDescription className="text-zinc-400">
              Download videos from LinkedIn posts in your preferred quality
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleDownload} className="space-y-4">
              <div>
                <label htmlFor="linkedin-url" className="block text-sm font-medium mb-2">
                  LinkedIn Video URL
                </label>
                <Input
                  id="linkedin-url"
                  type="url"
                  placeholder="https://www.linkedin.com/posts/..."
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  className="w-full bg-white/10 text-white placeholder-white/50"
                />
              </div>
              <Button
                type="submit"
                disabled={loading}
                className={`w-full bg-blue-600 hover:bg-blue-700 text-white ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Processing
                  </>
                ) : (
                  <>
                    <Download className="mr-2 h-4 w-4" />
                    Download LinkedIn Video
                  </>
                )}
              </Button>
            </form>

            {error && (
              <Alert variant="destructive" className="mt-4 bg-red-900/50 border-red-700/50 text-white">
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            {videoData && (
              <Card className="mt-4 bg-white/20 border-white/30 text-white">
                <CardHeader>
                  <CardTitle className="text-xl">{videoData.title}</CardTitle>
                  <CardDescription className="text-zinc-300">
                    By {videoData.author} • <Clock className="inline h-4 w-4" /> {formatDuration(videoData.duration)}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <img src={videoData.thumbnail} alt={videoData.title} className="w-full rounded-lg shadow-lg" />
                  <div className="space-y-4">
                    <div className="flex flex-col sm:flex-row gap-4">
                      <Select value={selectedQuality} onValueChange={setSelectedQuality}>
                        <SelectTrigger className="w-full sm:w-[200px] bg-white/10">
                          <SelectValue placeholder="Select quality" />
                        </SelectTrigger>
                        <SelectContent>
                          {videoData.videos.map((video) => (
                            <SelectItem key={video.quality} value={video.quality}>
                              {video.quality} ({Math.round(video.bitrate / 1024)} Kbps)
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <Button
                        className="bg-green-600 hover:bg-green-700 text-white flex-1"
                        disabled={!selectedQuality}
                        onClick={() => {
                          const formWidget = document.querySelector("form-widget")
                          if (formWidget) {
                            ;(formWidget as any).setAttribute("open", "true")
                          } else {
                            console.error("Form widget not found")
                          }
                        }}
                      >
                        <Download className="mr-2 h-4 w-4" />
                        Download Video
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </CardContent>
        </Card>
      </main>
      <form-widget mode="popup" ucid="WY0EyOkhEzfEzAuHbACBWw7A5q4"></form-widget>
    </div>
  )
}
