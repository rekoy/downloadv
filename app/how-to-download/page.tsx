import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function HowToDownload() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1a1a2e] via-[#1a2e2e] to-[#1a1a2e] text-white">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8 text-center">How to Download Videos from Any Source</h1>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          <Card className="bg-white/10 border-white/20 text-white">
            <CardHeader>
              <CardTitle>YouTube</CardTitle>
            </CardHeader>
            <CardContent>
              <ol className="list-decimal list-inside space-y-2">
                <li>Copy the YouTube video URL</li>
                <li>Paste the URL into our downloader</li>
                <li>Select your preferred quality</li>
                <li>Click the download button</li>
              </ol>
            </CardContent>
          </Card>

          <Card className="bg-white/10 border-white/20 text-white">
            <CardHeader>
              <CardTitle>Facebook</CardTitle>
            </CardHeader>
            <CardContent>
              <ol className="list-decimal list-inside space-y-2">
                <li>Open the Facebook video you want to download</li>
                <li>Copy the video's URL from the address bar</li>
                <li>Paste the URL into our downloader</li>
                <li>Choose your desired quality and download</li>
              </ol>
            </CardContent>
          </Card>

          <Card className="bg-white/10 border-white/20 text-white">
            <CardHeader>
              <CardTitle>Instagram</CardTitle>
            </CardHeader>
            <CardContent>
              <ol className="list-decimal list-inside space-y-2">
                <li>Go to the Instagram post with the video</li>
                <li>Click on the three dots (...) and select "Copy Link"</li>
                <li>Paste the copied link into our downloader</li>
                <li>Select the download option</li>
              </ol>
            </CardContent>
          </Card>

          <Card className="bg-white/10 border-white/20 text-white">
            <CardHeader>
              <CardTitle>Twitter</CardTitle>
            </CardHeader>
            <CardContent>
              <ol className="list-decimal list-inside space-y-2">
                <li>Find the tweet containing the video</li>
                <li>Click on the share button and copy the tweet's link</li>
                <li>Paste the link into our downloader</li>
                <li>Choose your preferred quality and download</li>
              </ol>
            </CardContent>
          </Card>

          <Card className="bg-white/10 border-white/20 text-white">
            <CardHeader>
              <CardTitle>TikTok</CardTitle>
            </CardHeader>
            <CardContent>
              <ol className="list-decimal list-inside space-y-2">
                <li>Open the TikTok video you want to download</li>
                <li>Click "Share" and then "Copy link"</li>
                <li>Paste the copied link into our downloader</li>
                <li>Click the download button</li>
              </ol>
            </CardContent>
          </Card>

          <Card className="bg-white/10 border-white/20 text-white">
            <CardHeader>
              <CardTitle>General Tips</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc list-inside space-y-2">
                <li>Always ensure you have the right to download and use the video</li>
                <li>Use a reliable and secure downloader (like ours!)</li>
                <li>Be cautious of pop-ups or ads on other download sites</li>
                <li>Check the file size before downloading to ensure it's correct</li>
              </ul>
            </CardContent>
          </Card>
        </div>

        <div className="mt-8 text-center">
          <Button asChild className="bg-blue-600 hover:bg-blue-700 text-white">
            <Link href="/">Go Back to Downloader</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
