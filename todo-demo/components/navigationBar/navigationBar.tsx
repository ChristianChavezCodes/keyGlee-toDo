"use client"

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Menu, X, Bell, MessageSquare } from 'lucide-react'
import { Button } from "@/components/ui/button/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar/avatar"

export function NavigationBar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 bg-background transition-all duration-300 shadow-md`} style={{ boxShadow: '0.00px 5.00px 10px 0px rgba(0, 0, 0, 0.34)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0">
              <Image
                src="https://static.wixstatic.com/media/b1862a_35fbcec63649428480d78371e08d8972~mv2.png/v1/fill/w_168,h_40,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/keygleelogo_2x.png"
                alt="Keyglee Logo"
                width={168}
                height={40}
                className="h-8 w-auto"
              />
            </Link>
          </div>
          <div className="hidden md:flex items-center space-x-4">
            <Button variant="ghost" size="icon" className="text-primary hover:bg-primary/10">
              <Bell className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="text-primary hover:bg-primary/10">
              <MessageSquare className="h-5 w-5" />
            </Button>
            <Avatar>
              <AvatarImage src="/placeholder-user.jpg" alt="Realtor" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
          </div>
          <div className="flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-primary hover:text-primary/80 hover:bg-primary/10 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>
      <div className={`md:hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-screen' : 'max-h-0 overflow-hidden'}`}>
        <div className="px-2 pt-2 pb-3 space-y-1">
          <Button variant="ghost" size="sm" className="w-full justify-start text-primary hover:bg-primary/10">
            <Bell className="h-5 w-5 mr-2" />
            Notifications
          </Button>
          <Button variant="ghost" size="sm" className="w-full justify-start text-primary hover:bg-primary/10">
            <MessageSquare className="h-5 w-5 mr-2" />
            Messages
          </Button>
        </div>
      </div>
    </nav>
  )
}

