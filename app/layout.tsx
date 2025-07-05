import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import Script from "next/script"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  metadataBase: new URL("https://downloadv.com"),
  title: "DownloadV: Fast and Free Online Video Downloader",
  description:
    "DownloadV is your ultimate tool for downloading videos from multiple platforms. Enjoy fast, free, and secure downloads in high-quality formats. Start saving your favorite videos today!",
  keywords:
    "video downloader, download videos, Facebook downloader, Instagram downloader, Twitter video downloader, TikTok downloader, social media downloader",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://downloadv.com/",
    siteName: "DownloadV",
    title: "DownloadV: Fast and Free Online Video Downloader",
    description:
      "Download videos from Facebook, Instagram, Twitter, TikTok, and more with DownloadV. Fast, free, and secure!",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "DownloadV - Fast and Free Online Video Downloader",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@downloadv",
    creator: "@downloadv",
    title: "DownloadV: Fast and Free Online Video Downloader",
    description:
      "Download videos from Facebook, Instagram, Twitter, TikTok, and more with DownloadV. Fast, free, and secure!",
    images: ["/twitter-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
  },
  themeColor: "#1a1a2e",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-96x96.png", sizes: "96x96", type: "image/png" },
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
    other: [
      {
        rel: "mask-icon",
        url: "/favicon.svg",
        color: "#1a1a2e",
      },
    ],
  },
  manifest: "/manifest.json",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <Script src={`https://www.googletagmanager.com/gtag/js?id=G-V4628X7E9S`} strategy="afterInteractive" />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-V4628X7E9S', {
              page_path: window.location.pathname,
              cookie_domain: 'downloadv.com'
            });
          `}
        </Script>
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4689587968961600"
          crossOrigin="anonymous"
        ></script>

        {/* Schema.org JSON-LD */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebApplication",
              name: "DownloadV",
              url: "https://downloadv.com",
              description: "Fast and free online video downloader for multiple social media platforms",
              applicationCategory: "Multimedia",
              operatingSystem: "Any",
              offers: {
                "@type": "Offer",
                price: "0",
                priceCurrency: "USD",
              },
              creator: {
                "@type": "Organization",
                name: "DownloadV Team",
                url: "https://downloadv.com",
              },
            }),
          }}
        />
      </head>
      <body className={`${inter.className} bg-primary`}>
        {children}
        <Script
          src="https://app.viral-loops.com/widgetsV2/core/loader.js"
          data-campaign-id="WY0EyOkhEzfEzAuHbACBWw7A5q4"
          id="viral-loops-loader"
          strategy="afterInteractive"
        />
        <Script
          src="https://app.viral-loops.com/widgetsV2/core/loader.js"
          data-campaign-id="WY0EyOkhEzfEzAuHbACBWw7A5q4"
          id="viral-loops-loader"
          strategy="afterInteractive"
        />
      </body>
    </html>
  )
}
