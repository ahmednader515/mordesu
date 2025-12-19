"use client"

import { useEffect, useState } from "react"
import { Gift } from "lucide-react"
import { Button } from "./ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

// Add keyframes for rainbow border animation
const rainbowBorderKeyframes = `
  @keyframes rainbow-border {
    0% {
      border-image: linear-gradient(0deg, #ff0000, #ff8000, #ffff00, #00ff00, #0000ff, #4b0082, #8f00ff) 1;
    }
    25% {
      border-image: linear-gradient(90deg, #ff0000, #ff8000, #ffff00, #00ff00, #0000ff, #4b0082, #8f00ff) 1;
    }
    50% {
      border-image: linear-gradient(180deg, #ff0000, #ff8000, #ffff00, #00ff00, #0000ff, #4b0082, #8f00ff) 1;
    }
    75% {
      border-image: linear-gradient(270deg, #ff0000, #ff8000, #ffff00, #00ff00, #0000ff, #4b0082, #8f00ff) 1;
    }
    100% {
      border-image: linear-gradient(360deg, #ff0000, #ff8000, #ffff00, #00ff00, #0000ff, #4b0082, #8f00ff) 1;
    }
  }
`

export function GiftIcon() {
  const [isVisible, setIsVisible] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [firstGameInput, setFirstGameInput] = useState("")
  const [secondGameInput, setSecondGameInput] = useState("")
  const [copyStatus, setCopyStatus] = useState({ first: false, second: false })

  useEffect(() => {
    const getSequentialCode = (codes: string[]) => {
      // Get the current week number (0-100)
      const startDate = new Date('2025-04-26'); // You can adjust this start date
      const currentDate = new Date();
      const weeks = Math.floor((currentDate.getTime() - startDate.getTime()) / (7 * 24 * 60 * 60 * 1000));
      // Use the week number to get the next code in sequence
      return codes[Math.min(weeks, codes.length - 1)];
    };

    const fetchCodes = async () => {
      try {
        const [response1, response2] = await Promise.all([
          fetch('/txt1.txt'),
          fetch('/txt2.txt')
        ]);
        
        const text1 = await response1.text();
        const text2 = await response2.text();
        
        const codes1 = text1.split('\n').filter(code => code.trim());
        const codes2 = text2.split('\n').filter(code => code.trim());
        
        setFirstGameInput(getSequentialCode(codes1));
        setSecondGameInput(getSequentialCode(codes2));
      } catch (error) {
        console.error('Error loading codes:', error);
      }
    };

    fetchCodes();
  }, []);

  useEffect(() => {
    const toggleVisibility = () => {
      // Show the gift icon when we're not in the hero section (top of page)
      if (window.pageYOffset > 100) {
        if (!isVisible) {
          setIsVisible(true)
        }
      } else {
        // Hide the gift icon when we're in the hero section
        if (isVisible) {
          setIsVisible(false)
        }
      }
    }

    window.addEventListener("scroll", toggleVisibility)
    return () => window.removeEventListener("scroll", toggleVisibility)
  }, [isVisible])

  const handleClick = () => {
    setIsDialogOpen(true)
  }

  const handleCopy = async (text: string, game: 'first' | 'second') => {
    try {
      await navigator.clipboard.writeText(text)
      setCopyStatus(prev => ({ ...prev, [game]: true }))
      setTimeout(() => {
        setCopyStatus(prev => ({ ...prev, [game]: false }))
      }, 2000)
    } catch (err) {
      console.error('Failed to copy text: ', err)
    }
  }

  if (!isVisible) return null

  return (
    <>
      <style>{rainbowBorderKeyframes}</style>
      <div className="fixed bottom-8 right-8 z-50">
        <Button
          variant="default"
          size="icon"
          className={`rounded-full bg-zinc-900 hover:bg-zinc-800 transition-all duration-300 ${
            isHovered ? 'scale-160' : 'scale-150'
          }`}
          onClick={handleClick}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          aria-label="Show games"
        >
          <Gift className="h-8 w-8 text-white" />
        </Button>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[800px] animate-in fade-in-0 zoom-in-95 duration-200 border-2 border-zinc-200 dark:border-zinc-800 rounded-2xl">
          <DialogHeader>
            <DialogTitle className="text-center text-2xl">هدية</DialogTitle>
          </DialogHeader>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-4">
            {/* First Game Section */}
            <div className="space-y-4">
              <div className="bg-zinc-900 rounded-xl p-6 text-white text-center transform transition-all duration-300 hover:scale-105">
                <h3 className="text-2xl font-semibold mb-2">انتم السابقون</h3>
                <p className="text-zinc-400 text-sm">Steam Game Key</p>
              </div>
              <div className="relative select-none">
                <input
                  type="text"
                  value={firstGameInput}
                  readOnly
                  autoFocus={false}
                  placeholder="أدخل الأرقام من 1-9"
                  className="w-full p-4 border rounded-xl text-right pr-28 select-none focus:outline-none focus:ring-0 cursor-default bg-white/5 backdrop-blur-sm [user-select:none] [-webkit-user-select:none] [-moz-user-select:none] [-ms-user-select:none] [&::selection]:bg-transparent [&::selection]:text-inherit text-lg"
                />
                <button
                  onClick={() => handleCopy(firstGameInput, 'first')}
                  className="absolute right-2 top-1/2 -translate-y-1/2 px-4 py-1.5 bg-zinc-900 text-white rounded-xl hover:bg-zinc-800 transition-colors text-sm"
                >
                  {copyStatus.first ? 'تم النسخ!' : 'نسخ'}
                </button>
              </div>
            </div>

            {/* Second Game Section */}
            <div className="space-y-4">
              <div className="bg-zinc-900 rounded-xl p-6 text-white text-center transform transition-all duration-300 hover:scale-105">
                <h3 className="text-2xl font-semibold mb-2">دارك اونور</h3>
                <p className="text-zinc-400 text-sm">Steam Game Key</p>
              </div>
              <div className="relative select-none">
                <input
                  type="text"
                  value={secondGameInput}
                  readOnly
                  autoFocus={false}
                  placeholder="أدخل الأرقام من 1-9"
                  className="w-full p-4 border rounded-xl text-right pr-28 select-none focus:outline-none focus:ring-0 cursor-default bg-white/5 backdrop-blur-sm [user-select:none] [-webkit-user-select:none] [-moz-user-select:none] [-ms-user-select:none] [&::selection]:bg-transparent [&::selection]:text-inherit text-lg"
                />
                <button
                  onClick={() => handleCopy(secondGameInput, 'second')}
                  className="absolute right-2 top-1/2 -translate-y-1/2 px-4 py-1.5 bg-zinc-900 text-white rounded-xl hover:bg-zinc-800 transition-colors text-sm"
                >
                  {copyStatus.second ? 'تم النسخ!' : 'نسخ'}
                </button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
} 