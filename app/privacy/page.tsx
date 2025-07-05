import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft } from "lucide-react"

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1a1a2e] via-[#1a2e2e] to-[#1a1a2e] text-white">
      <div className="container mx-auto px-4 py-8">
        <Button asChild variant="ghost" className="text-white hover:text-white/80 mb-6">
          <Link href="/" className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Link>
        </Button>

        <Card className="bg-white/10 border-white/20 text-white">
          <CardHeader>
            <CardTitle className="text-3xl font-bold">Privacy Policy</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <section className="space-y-4">
              <h2 className="text-2xl font-semibold">1. Information We Collect</h2>
              <div className="space-y-2">
                <h3 className="text-xl font-medium">1.1 Information you provide</h3>
                <p>When using DownloadV, we may collect:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>URLs of videos you wish to download</li>
                  <li>IP address for service optimization</li>
                  <li>Browser type and version</li>
                  <li>Device information</li>
                </ul>
              </div>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold">2. How We Use Your Information</h2>
              <p>We use the collected information to:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Process your video download requests</li>
                <li>Improve our service quality</li>
                <li>Analyze usage patterns</li>
                <li>Prevent abuse of our service</li>
                <li>Comply with legal obligations</li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold">3. Data Storage and Security</h2>
              <p>We implement appropriate security measures to protect your information:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>All data is encrypted in transit using SSL/TLS encryption</li>
                <li>We do not store downloaded video content</li>
                <li>Access to systems is strictly controlled</li>
                <li>Regular security audits are performed</li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold">4. Cookies and Tracking</h2>
              <p>We use cookies and similar tracking technologies to:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Remember your preferences</li>
                <li>Analyze site traffic and usage</li>
                <li>Improve user experience</li>
              </ul>
              <p>You can control cookie settings through your browser preferences.</p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold">5. Third-Party Services</h2>
              <p>We may use third-party services for:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Analytics (Google Analytics)</li>
                <li>Advertising</li>
                <li>Video processing</li>
              </ul>
              <p>These services have their own privacy policies and data collection practices.</p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold">6. Your Rights</h2>
              <p>You have the right to:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Access your personal data</li>
                <li>Request data deletion</li>
                <li>Object to data processing</li>
                <li>Request data portability</li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold">7. Changes to Privacy Policy</h2>
              <p>
                We may update this privacy policy from time to time. We will notify you of any changes by posting the
                new policy on this page.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold">8. Contact Us</h2>
              <p>If you have any questions about this Privacy Policy, please contact us at:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Email: privacy@downloadv.com</li>
                <li>Website: https://downloadv.com/contact</li>
              </ul>
            </section>

            <div className="mt-8 text-sm text-white/70">
              <p>Last updated: {new Date().toLocaleDateString()}</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
