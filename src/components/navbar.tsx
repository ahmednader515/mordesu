"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "./ui/button"
import { Menu, X, ChevronDown } from "lucide-react"

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const dropdownRef = useRef<HTMLDivElement>(null)

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const toggleMenu = useCallback(() => {
    setIsMenuOpen(prev => !prev)
  }, [])

  const handleDropdownToggle = useCallback((dropdown: string) => {
    setActiveDropdown(prev => prev === dropdown ? null : dropdown)
  }, [])

  const handleDropdownClose = useCallback(() => {
    setActiveDropdown(null)
  }, [])

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        handleDropdownClose()
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [handleDropdownClose])

  const gamesLinks = [
    { href: "#featured-games", label: "الألعاب المميزة" },
    { href: "https://store.steampowered.com/search/?developer=MordeSu%20studio", label: "Steam" },
    { href: "https://play.google.com/store/apps/dev?id=7189528374457116405", label: "Google Play" }
  ]

  return (
    <>
      <nav 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled 
            ? "bg-background/80 backdrop-blur-md border-b border-white/10 shadow-lg" 
            : "bg-transparent"
        }`}
      >
        <div className="container px-4 mx-auto">
          <div className="flex items-center justify-between h-20">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="relative overflow-hidden rounded-lg">
                <Image
                  src="/logo.png"
                  alt="Mordesu Studio Logo"
                  width={70}
                  height={32}
                  className="object-contain transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            </Link>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-6">
              <div className="relative" ref={dropdownRef}>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="text-white/90 hover:text-white hover:bg-white/10 flex items-center gap-1"
                  onClick={() => handleDropdownToggle("games")}
                >
                  الألعاب
                  <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${activeDropdown === "games" ? "rotate-180" : ""}`} />
                </Button>
                {activeDropdown === "games" && (
                  <div className="absolute top-full right-0 w-48 bg-background/90 backdrop-blur-md rounded-lg shadow-lg border border-white/10 py-2 mt-1 z-50">
                    {gamesLinks.map((link, index) => (
                      <Link 
                        key={index}
                        href={link.href}
                        className="block px-4 py-2 text-sm text-white/80 hover:text-white hover:bg-white/10 transition-colors"
                        onClick={handleDropdownClose}
                      >
                        {link.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
              
              <Button 
                variant="ghost" 
                size="sm" 
                className="text-white/90 hover:text-white hover:bg-white/10 relative group"
                asChild
              >
                <Link href="#team">
                  <span>عن الاستوديو</span>
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300"></span>
                </Link>
              </Button>
              
              <Button 
                variant="ghost" 
                size="sm" 
                className="text-white/90 hover:text-white hover:bg-white/10 relative group"
                asChild
              >
                <Link href="#social-networks">
                  <span>تواصل معنا</span>
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300"></span>
                </Link>
              </Button>
              
              <Button 
                variant="outline" 
                size="sm" 
                className="ml-2 border-primary/30 text-primary hover:bg-primary/10 hover:text-primary transition-all duration-300"
                asChild
              >
                <Link href="#achievements">
                  انجازاتنا
                </Link>
              </Button>
            </div>
            
            {/* Mobile Menu Button */}
            <button 
              className="md:hidden text-white/90 hover:text-white transition-colors"
              onClick={toggleMenu}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Sidebar */}
      <div 
        className={`fixed top-0 left-0 w-64 h-screen bg-background/90 backdrop-blur-md transform transition-transform duration-300 ease-in-out z-50 ${
          isMenuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="p-4">
          <div className="flex justify-start mb-4">
            <button 
              className="text-white/90 hover:text-white transition-colors"
              onClick={toggleMenu}
              aria-label="Close menu"
            >
              <X size={24} />
            </button>
          </div>
          <div className="flex flex-col gap-4">
            <div className="relative" ref={dropdownRef}>
              <Button 
                variant="ghost" 
                size="sm" 
                className="text-white/90 hover:text-white hover:bg-white/10 justify-start w-full"
                onClick={() => handleDropdownToggle("games-mobile")}
              >
                <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${activeDropdown === "games-mobile" ? "rotate-180" : ""}`} />
                <span className="flex-1 text-right">الألعاب</span>
              </Button>
              {activeDropdown === "games-mobile" && (
                <div className="w-full bg-background/90 backdrop-blur-md rounded-lg shadow-lg border border-white/10 py-2 mt-1">
                  {gamesLinks.map((link, index) => (
                    <Link 
                      key={index}
                      href={link.href}
                      className="block px-4 py-2 text-sm text-white/80 hover:text-white hover:bg-white/10 transition-colors text-right"
                      onClick={() => {
                        handleDropdownClose()
                        toggleMenu()
                      }}
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
            <Button 
              variant="ghost" 
              size="sm" 
              className="text-white/90 hover:text-white hover:bg-white/10 justify-start"
              asChild
            >
              <Link href="#team" onClick={toggleMenu} className="text-right w-full">
                عن الاستوديو
              </Link>
            </Button>
            <Button 
              variant="ghost" 
              size="sm" 
              className="text-white/90 hover:text-white hover:bg-white/10 justify-start"
              asChild
            >
              <Link href="#social-networks" onClick={toggleMenu} className="text-right w-full">
                تواصل معنا
              </Link>
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              className="mt-2 border-primary/30 text-primary hover:bg-primary/10 hover:text-primary"
              asChild
            >
              <Link href="#achievements" onClick={toggleMenu} className="text-right w-full">
                انجازاتنا
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </>
  )
} 