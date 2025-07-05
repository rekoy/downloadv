"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Shuffle, MessageCircle, Rocket, Zap } from "lucide-react"

interface Banner {
  id: string
  title: string
  description: string
  buttonText: string
  url: string
  bgColorFrom: string
  bgColorTo: string
  icon: React.ElementType
}

const banners: Banner[] = [
  {
    id: "wame",
    title: "WAme.NOW",
    description: "Generate your custom WhatsApp Link in seconds",
    buttonText: "Create Your Link",
    url: "https://wame.now",
    bgColorFrom: "from-green-500",
    bgColorTo: "to-green-600",
    icon: MessageCircle,
  },
  {
    id: "fun",
    title: "Fun.id",
    description: "Dive Into the Fun World!",
    buttonText: "Start Creating",
    url: "https://fun.id",
    bgColorFrom: "from-purple-500",
    bgColorTo: "to-pink-500",
    icon: Rocket,
  },
  {
    id: "jet",
    title: "Jet.id",
    description: "Don't know what to buy right now?",
    buttonText: "Transfer Now",
    url: "https://jet.id",
    bgColorFrom: "from-blue-500",
    bgColorTo: "to-cyan-500",
    icon: Zap,
  },
]

export function WAmeBanner() {
  const [currentBanner, setCurrentBanner] = useState<Banner>(banners[0])

  const shuffleBanner = () => {
    const remainingBanners = banners.filter((banner) => banner.id !== currentBanner.id)
    const randomIndex = Math.floor(Math.random() * remainingBanners.length)
    setCurrentBanner(remainingBanners[randomIndex])
  }

  useEffect(() => {
    const intervalId = setInterval(shuffleBanner, 10000) // Shuffle every 10 seconds
    return () => clearInterval(intervalId)
  }, [currentBanner])

  return (
    <div
      className={`w-full bg-gradient-to-r ${currentBanner.bgColorFrom} ${currentBanner.bgColorTo} py-6 px-4 mt-8 relative`}
    >
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="bg-white/20 p-2 rounded-lg">
            <currentBanner.icon className="h-6 w-6 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white">{currentBanner.title}</h2>
            <p className="text-white/90">{currentBanner.description}</p>
          </div>
        </div>
        <Button
          asChild
          className="bg-white hover:bg-white/90 font-semibold px-6 text-black"
          style={{
            background: "white",
            transition: "all 0.3s ease",
          }}
        >
          <a href={currentBanner.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
            {currentBanner.buttonText}
            <currentBanner.icon className="h-4 w-4" />
          </a>
        </Button>
      </div>
      <Button
        size="icon"
        variant="ghost"
        className="absolute top-2 right-2 text-white hover:bg-white/20"
        onClick={shuffleBanner}
      >
        <Shuffle className="h-4 w-4" />
        <span className="sr-only">Shuffle banner</span>
      </Button>
    </div>
  )
}
