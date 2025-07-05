"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Play } from "lucide-react"

interface VideoPreviewProps {
  title: string
  thumbnail: string
  videoUrl: string
}

export function VideoPreview({ title, thumbnail, videoUrl }: VideoPreviewProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <Button
        variant="outline"
        className="w-full h-auto aspect-video relative overflow-hidden group"
        onClick={() => setIsOpen(true)}
      >
        <img
          src={thumbnail}
          alt={title}
          className="absolute inset-0 w-full h-full object-cover transition-transform group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
          <Play className="w-16 h-16 text-white opacity-80 group-hover:opacity-100 transition-opacity" />
        </div>
      </Button>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-[800px] bg-gray-900 text-white">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold">{title}</DialogTitle>
            <DialogDescription className="text-gray-400">Preview the video before downloading</DialogDescription>
          </DialogHeader>
          <div className="mt-4 aspect-video">
            <video src={videoUrl} controls className="w-full h-full object-contain" poster={thumbnail}>
              Your browser does not support the video tag.
            </video>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
