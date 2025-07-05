import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

interface AdPopupProps {
  isOpen: boolean
  onClose: () => void
}

export function AdPopup({ isOpen, onClose }: AdPopupProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Special Offer!</DialogTitle>
          <DialogDescription>Enjoy unlimited downloads with our premium plan!</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <p>Get access to high-quality downloads without restrictions.</p>
          <Button onClick={onClose}>Soon</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
