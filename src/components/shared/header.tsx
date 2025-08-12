"use client"

import { Button } from "@/components/ui/button"
import { HelpCircleIcon, PlaneIcon, MenuIcon } from "lucide-react"
import { useState } from "react"

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  return (
    <header className="bg-white/95 backdrop-blur-sm border-b border-gray-100 sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="p-2 bg-teal-600 rounded-xl shadow-sm">
              <PlaneIcon className="h-6 w-6 text-white" />
            </div>
            <span className="text-2xl font-bold text-teal-600 tracking-tight">SkyPlan</span>
          </div>

          {/* Navigation - Desktop */}
          <nav className="hidden md:flex items-center gap-8">
            <button className="flex items-center gap-2 text-gray-700 hover:text-teal-600 transition-all duration-200 hover:scale-105">
              <HelpCircleIcon className="h-5 w-5" />
              <span className="font-medium">Help</span>
            </button>
            <button className="flex items-center gap-2 text-gray-700 hover:text-teal-600 transition-all duration-200 hover:scale-105">
              <PlaneIcon className="h-5 w-5" />
              <span className="font-medium">My Trips</span>
            </button>
          </nav>

          {/* Auth Buttons - Desktop */}
          <div className="hidden md:flex items-center gap-3">
            <Button
              variant="outline"
              className="border-gray-300 text-gray-700 hover:bg-gray-50 bg-transparent hover:border-teal-300 transition-all duration-200"
            >
              Sign Up
            </Button>
            <Button className=" text-white  shadow-sm hover:shadow-md transition-all duration-200">
              Log In
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-gray-700 hover:text-teal-600 transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <MenuIcon className="h-6 w-6" />
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 pt-4 border-t border-gray-100">
            <nav className="flex flex-col gap-4 mb-4">
              <button className="flex items-center gap-2 text-gray-700 hover:text-teal-600 transition-colors text-left">
                <HelpCircleIcon className="h-5 w-5" />
                <span className="font-medium">Help</span>
              </button>
              <button className="flex items-center gap-2 text-gray-700 hover:text-teal-600 transition-colors text-left">
                <PlaneIcon className="h-5 w-5" />
                <span className="font-medium">My Trips</span>
              </button>
            </nav>
            <div className="flex flex-col gap-3">
              <Button
                variant="outline"
                className="border-gray-300 text-gray-700 hover:bg-gray-50 bg-transparent w-full"
              >
                Sign Up
              </Button>
              <Button className="bg-black text-white hover:bg-gray-800 w-full">Log In</Button>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
