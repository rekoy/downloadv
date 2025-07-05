import VideoDownloader from "@/components/VideoDownloader"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <main>
      <VideoDownloader />
      <div className="container mx-auto px-4 py-8 text-center">
        <Button asChild variant="outline">
          <Link href="/how-to-download">How to Download Videos</Link>
        </Button>
      </div>
    </main>
  )
}
