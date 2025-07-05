import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

interface WAmePopupProps {
  isOpen: boolean
  onClose: () => void
}

export function WAmePopup({ isOpen, onClose }: WAmePopupProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] bg-white text-gray-900">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-green-600">Try WAme.NOW!</DialogTitle>
          <DialogDescription className="text-lg text-gray-700">
            Generate your custom WhatsApp Link in seconds
          </DialogDescription>
        </DialogHeader>
        <div className="mt-6 space-y-4">
          <p className="text-gray-600">Create personalized WhatsApp links for easy communication with your audience.</p>
          <Button
            className="w-full bg-green-600 hover:bg-green-700 text-white"
            onClick={() => window.open("https://wame.now", "_blank")}
          >
            Visit WAme.NOW
          </Button>
          <Button variant="outline" className="w-full" onClick={onClose}>
            Maybe Later
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
