"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { keyframes, css } from "@emotion/react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Download, Menu } from "lucide-react"

export function Navigation() {
  const pathname = usePathname()
  const router = useRouter()
  const [isOpen, setIsOpen] = React.useState(false)

  const routes = [
    {
      href: "/",
      label: "Home",
    },
    {
      href: "/how-to-download",
      label: "How to Download",
    },
    {
      href: "/privacy",
      label: "Privacy Policy",
    },
    {
      href: "/linkedin-download",
      label: "LinkedIn Download",
    },
  ]

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-black/50 backdrop-blur-xl">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link href="/" className="flex items-center space-x-2">
            <Download className="h-6 w-6 text-yellow-400" />
            <span className="text-lg font-bold text-yellow-400">DownloadV</span>
          </Link>
        </div>
        <nav className="hidden md:flex items-center space-x-4">
          {routes.map((route) => (
            <Button
              key={route.href}
              onClick={() => router.push(route.href)}
              variant={route.href === "/linkedin-download" ? "default" : "ghost"}
              className={cn(
                "text-sm font-medium transition-colors relative overflow-hidden",
                route.href === "/linkedin-download"
                  ? "bg-yellow-400 hover:bg-yellow-500 text-black"
                  : "hover:text-white text-white/60",
              )}
            >
              {route.href === "/linkedin-download" && (
                <span className="absolute top-0 right-0 bg-red-500 text-white text-xs px-1 py-0.5 rounded-bl animate-blink">
                  NEW
                </span>
              )}
              {route.label}
            </Button>
          ))}
        </nav>
        <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
          <DropdownMenuTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-[200px] bg-black/90 text-white">
            {routes.map((route) => (
              <DropdownMenuItem key={route.href} asChild>
                <button
                  onClick={() => {
                    setIsOpen(false)
                    router.push(route.href)
                  }}
                  className={cn("w-full text-left", pathname === route.href && "font-bold text-yellow-400")}
                >
                  {route.label}
                </button>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      {/* <form-widget mode='popup' ucid='WY0EyOkhEzfEzAuHbACBWw7A5q4'></form-widget> */}
    </header>
  )
}

const blinkAnimation = keyframes`
  0%, 100% { opacity: 1; }
  50% { opacity: 0; }
`

const animateBlink = css`
  animation: ${blinkAnimation} 1s linear infinite;
`
