interface ApiResponse {
  error: boolean
  hosting: string
  shortcode: string
  caption?: string
  title?: string
  type?: string
  download_url?: string
  thumb?: string
  channel?: string
  channel_url?: string
  formats?: { format: string; download_url: string }[]
}

interface VideoInfo {
  success: boolean
  title: string
  thumbnail: string
  links: Record<string, string>
  channel?: string
  channelUrl?: string
  warning?: string
}

// Function to extract video ID or create a meaningful filename from URL
function extractVideoIdentifier(url: string): string {
  try {
    const urlObj = new URL(url)

    // Instagram
    if (url.includes("instagram.com")) {
      const match = url.match(/\/p\/([^/]+)|\/reel\/([^/]+)|\/tv\/([^/]+)/)
      if (match) {
        return `instagram_${match[1] || match[2] || match[3]}`
      }
    }

    // YouTube
    if (url.includes("youtube.com") || url.includes("youtu.be")) {
      const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\n?#]+)/)
      if (match) {
        return `youtube_${match[1]}`
      }
    }

    // TikTok
    if (url.includes("tiktok.com")) {
      const match = url.match(/\/video\/(\d+)/)
      if (match) {
        return `tiktok_${match[1]}`
      }
    }

    // Twitter/X
    if (url.includes("twitter.com") || url.includes("x.com")) {
      const match = url.match(/\/status\/(\d+)/)
      if (match) {
        return `twitter_${match[1]}`
      }
    }

    // Facebook
    if (url.includes("facebook.com")) {
      const match = url.match(/\/videos\/(\d+)/)
      if (match) {
        return `facebook_${match[1]}`
      }
    }

    // Fallback: use domain and timestamp
    return `${urlObj.hostname.replace("www.", "")}_${Date.now()}`
  } catch (error) {
    // If URL parsing fails, create a generic filename
    return `video_${Date.now()}`
  }
}

// Function to create a mock response based on the URL
function createMockResponse(url: string): VideoInfo {
  // Extract platform from URL
  let platform = "Video"
  if (url.includes("instagram")) platform = "Instagram"
  if (url.includes("facebook")) platform = "Facebook"
  if (url.includes("twitter") || url.includes("x.com")) platform = "Twitter"
  if (url.includes("youtube") || url.includes("youtu.be")) platform = "YouTube"
  if (url.includes("tiktok")) platform = "TikTok"

  // Create a meaningful identifier for the video
  const videoId = extractVideoIdentifier(url)

  // Create a title based on the platform and video ID
  const title = `${platform} Video - ${videoId}`

  // Generate a thumbnail URL based on the platform
  let thumbnail = "https://via.placeholder.com/640x360.png?text=Video+Preview"
  if (platform === "Instagram") thumbnail = "https://via.placeholder.com/640x640.png?text=Instagram+Video"
  if (platform === "YouTube") thumbnail = "https://via.placeholder.com/640x360.png?text=YouTube+Video"
  if (platform === "TikTok") thumbnail = "https://via.placeholder.com/540x960.png?text=TikTok+Video"

  // Instead of using the original URL, provide a message that the video needs to be accessed directly
  const links: Record<string, string> = {
    "Visit Source": url, // This will open the original page
  }

  return {
    success: true,
    title,
    thumbnail,
    links,
    channel: `${platform} Channel`,
    channelUrl: "",
    warning: "Downloader unavailable. Showing source link instead.",
  }
}

export async function getVideoDownloadLink(url: string): Promise<VideoInfo> {
  if (!url) throw new Error("URL is required")

  try {
    const res = await fetch("/api/video", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url }),
    })

    // Our route always returns 200 with either real links or a safe fallback.
    // If the route itself errors (non-200), bubble up a readable error.
    if (!res.ok) {
      const text = await res.text().catch(() => "")
      throw new Error(text || `Server error: ${res.status}`)
    }

    const data = (await res.json()) as VideoInfo
    // Validate minimal structure
    if (!data || !data.success || !data.links || Object.keys(data.links).length === 0) {
      throw new Error("Failed to get downloadable links from server.")
    }
    return data
  } catch (err) {
    console.error("getVideoDownloadLink failed:", err)
    // Final fallback on unexpected client-side failure
    return createMockResponse(url)
  }
}
