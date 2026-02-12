import { NextResponse } from "next/server"

type ApiResponse = {
  error?: boolean
  hosting?: string
  shortcode?: string
  caption?: string
  title?: string
  type?: string
  download_url?: string
  thumb?: string
  channel?: string
  channel_url?: string
  formats?: { format: string; download_url: string }[]
  message?: string
}

type VideoInfo = {
  success: boolean
  title: string
  thumbnail: string
  links: Record<string, string>
  channel?: string
  channelUrl?: string
  warning?: string
}

function extractVideoIdentifier(url: string): string {
  try {
    const u = new URL(url)
    if (u.hostname.includes("instagram.com")) {
      const m = url.match(/\/p\/([^/]+)|\/reel\/([^/]+)|\/tv\/([^/]+)/)
      if (m) return `instagram_${m[1] || m[2] || m[3]}`
    }
    if (u.hostname.includes("youtube.com") || u.hostname.includes("youtu.be")) {
      const m = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\n?#]+)/)
      if (m) return `youtube_${m[1]}`
    }
    if (u.hostname.includes("tiktok.com")) {
      const m = url.match(/\/video\/(\d+)/)
      if (m) return `tiktok_${m[1]}`
    }
    if (u.hostname.includes("twitter.com") || u.hostname.includes("x.com")) {
      const m = url.match(/\/status\/(\d+)/)
      if (m) return `twitter_${m[1]}`
    }
    if (u.hostname.includes("facebook.com")) {
      const m = url.match(/\/videos\/(\d+)/)
      if (m) return `facebook_${m[1]}`
    }
    return `${u.hostname.replace(/^www\./, "")}_${Date.now()}`
  } catch {
    return `video_${Date.now()}`
  }
}

function toFallback(url: string, warning?: string): VideoInfo {
  const id = extractVideoIdentifier(url)
  const platform = url.includes("instagram")
    ? "Instagram"
    : url.includes("facebook")
      ? "Facebook"
      : url.includes("twitter") || url.includes("x.com")
        ? "Twitter"
        : url.includes("youtube") || url.includes("youtu.be")
          ? "YouTube"
          : url.includes("tiktok")
            ? "TikTok"
            : "Video"

  let thumbnail = "https://via.placeholder.com/640x360.png?text=Video+Preview"
  if (platform === "Instagram") thumbnail = "https://via.placeholder.com/640x640.png?text=Instagram+Video"
  if (platform === "YouTube") thumbnail = "https://via.placeholder.com/640x360.png?text=YouTube+Video"
  if (platform === "TikTok") thumbnail = "https://via.placeholder.com/540x960.png?text=TikTok+Video"

  return {
    success: true,
    title: `${platform} Video - ${id}`,
    thumbnail,
    links: { "Visit Source": url },
    channel: `${platform} Channel`,
    channelUrl: undefined,
    warning,
  }
}

export async function POST(req: Request) {
  try {
    const { url } = (await req.json()) as { url?: string }
    if (!url || typeof url !== "string") {
      return NextResponse.json({ error: "URL is required" }, { status: 400 })
    }

    // Use a server-side key if available. Note: For production, do NOT use a NEXT_PUBLIC_ key.
    const RAPIDAPI_KEY = process.env.NEXT_PUBLIC_VIDEO_API_KEY || process.env.VIDEO_API_KEY
    const RAPIDAPI_HOST = "instagram-downloader-download-instagram-videos-stories1.p.rapidapi.com"

    if (!RAPIDAPI_KEY) {
      // Not configured => return fallback with a gentle warning
      return NextResponse.json(toFallback(url, "Downloader not configured. Showing source link instead."), {
        status: 200,
      })
    }

    const apiUrl = `https://${RAPIDAPI_HOST}/get-info-rapidapi?url=${encodeURIComponent(url)}`
    const res = await fetch(apiUrl, {
      method: "GET",
      headers: {
        "x-rapidapi-key": RAPIDAPI_KEY,
        "x-rapidapi-host": RAPIDAPI_HOST,
      },
    })

    // If RapidAPI rejects (e.g., 403 not subscribed), return a graceful fallback
    if (!res.ok) {
      let msg = `Remote error ${res.status}`
      try {
        const t = await res.text()
        msg = t || msg
      } catch {}
      if (res.status === 403) {
        return NextResponse.json(
          toFallback(url, "Not subscribed to the downloader API. Showing source link instead."),
          { status: 200 },
        )
      }
      // Other errors => also fallback
      return NextResponse.json(toFallback(url, `Downloader error: ${msg}`), { status: 200 })
    }

    const data = (await res.json()) as ApiResponse

    // Validate and map provider response to VideoInfo
    const links: Record<string, string> = {}
    if (Array.isArray(data.formats) && data.formats.length > 0) {
      for (const f of data.formats) {
        if (f?.format && f?.download_url) links[f.format] = f.download_url
      }
    } else if (data.download_url) {
      links[data.type === "video" ? "Download Video" : "Download"] = data.download_url
    }

    if (Object.keys(links).length === 0) {
      return NextResponse.json(toFallback(url, "No downloadable links found. Showing source link instead."), {
        status: 200,
      })
    }

    const videoInfo: VideoInfo = {
      success: true,
      title: data.caption || data.title || `${data.hosting || "Video"}`,
      thumbnail: data.thumb || "https://via.placeholder.com/640x360.png?text=Video+Preview",
      links,
      channel: data.channel,
      channelUrl: data.channel_url,
    }

    return NextResponse.json(videoInfo, { status: 200 })
  } catch (err) {
    console.error("API error:", err)
    return NextResponse.json(toFallback("https://example.com", "Unexpected error. Showing source link instead."), {
      status: 200,
    })
  }
}
