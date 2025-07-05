import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export function AdSensePlaceholder() {
  return (
    <Card className="bg-secondary mt-8 max-w-4xl mx-auto">
      <CardContent className="p-8 bg-green-600 text-white rounded-lg">
        <div className="text-center">
          <h3 className="text-2xl font-bold mb-2">WAme.NOW</h3>
          <p className="text-lg mb-4">Generate your custom WhatsApp Link in seconds</p>
          <Button asChild className="bg-white text-green-600 hover:bg-green-100">
            <a href="https://wame.now" target="_blank" rel="noopener noreferrer">
              Create Your Link
            </a>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
