"use client"

import React, { useState, useEffect } from "react"
import Image from "next/image"
import { Bell, MessageSquare, Sun, Moon } from "lucide-react"
import { Button } from "@/components/ui/button/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar/avatar"

export function NavigationBar() {
  const [darkMode, setDarkMode] = useState(false)

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
  }, [darkMode])

  return (
    <nav className="bg-background shadow-md transition-colors duration-300 fixed top-0 left-0 right-0 z-50">
      <div className="container mx-auto py-4 px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <Image
              src="https://static.wixstatic.com/media/b1862a_35fbcec63649428480d78371e08d8972~mv2.png/v1/fill/w_168,h_40,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/keygleelogo_2x.png"
              alt="Keyglee Logo"
              width={168}
              height={40}
              className="h-8 w-auto"
            />
          </div>

          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon" className="text-primary hover:bg-primary/10">
              <Bell className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="text-primary hover:bg-primary/10">
              <MessageSquare className="h-5 w-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="text-primary hover:bg-primary/10"
              onClick={() => setDarkMode(!darkMode)}
              aria-label="Toggle Dark Mode"
            >
              {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>
            <Avatar>
              <AvatarImage src="/placeholder-user.jpg" alt="Realtor" />
              <AvatarFallback>KG</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </div>
    </nav>
  )
}
