"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import Image from "next/image"
import { Button } from "./ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"

const achievements = [
  {
    id: 1,
    title: "عمان TV",
    number: "",
    description: "اللقاء التلفزيوني لمورديكاي علي قناة عمان TV",
    image: "/ass3.png",
    link: "https://drive.google.com/file/d/16j2pmQijILS3wygyAWzJn0UEvdSQFNIT/view "
  },
  {
    id: 2,
    title: "نبض الوطن",
    number: "",
    description: "مقال نبض الوطن عن اول لعبة تصدر من الاستوديو",
    image: "/ass.png",
    link: "https://www.nabd-elwatan.com/archives/191346"
  },
  {
    id: 3,
    title: "نبض الوطن",
    number: "",
    description: "مقال نبض الوطن عن مورديكاي",
    image: "/ass2.png",
    link: "https://www.nabd-elwatan.com/archives/190736"
  },
  {
    id: 4,
    title: "صناع",
    number: "",
    description: "تعاون مع منصة صناع العربية",
    image: "/ass4.png",
    link: "https://creators.nafezly.com/u/mordecal"
  },
  {
    id: 5,
    title: "ساعد",
    number: "",
    description: "تعاون منصة ساعد معنا للأستفادة من خدماتنا",
    image: "/ass5.png",
    link: "https://www.sa3idd.com/office/mordesu"
  }
]

export function AchievementCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const timerRef = useRef<NodeJS.Timeout | null>(null)
  
  const nextSlide = useCallback(() => {
    if (isTransitioning) return
    setIsTransitioning(true)
    setCurrentIndex((prevIndex) => (prevIndex + 1) % achievements.length)
  }, [isTransitioning])
  
  const prevSlide = () => {
    if (isTransitioning) return
    setIsTransitioning(true)
    setCurrentIndex((prevIndex) => (prevIndex - 1 + achievements.length) % achievements.length)
  }
  
  // Auto-rotate every 5 seconds
  useEffect(() => {
    const startTimer = () => {
      if (timerRef.current) clearInterval(timerRef.current)
      
      if (!isPaused) {
        timerRef.current = setInterval(() => {
          nextSlide()
        }, 5000)
      }
    }
    
    startTimer()
    
    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
    }
  }, [isPaused, nextSlide])
  
  // Reset transition state after animation completes
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsTransitioning(false)
    }, 500) // Match this with the CSS transition duration
    
    return () => clearTimeout(timer)
  }, [currentIndex])
  
  const handleMouseEnter = () => {
    setIsPaused(true)
  }
  
  const handleMouseLeave = () => {
    setIsPaused(false)
  }
  
  const currentAchievement = achievements[currentIndex]
  
  return (
    <div 
      className="relative w-full overflow-hidden"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="w-[90%] mx-auto bg-card/50 backdrop-blur-sm rounded-lg overflow-hidden border border-muted-foreground/10 shadow-lg">
        <div className="flex flex-col md:flex-row">
          {/* Image Side */}
          <div className="w-full md:w-1/2 h-64 md:h-auto relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-transparent z-10" />
            <div 
              className={`relative w-full h-full transition-transform duration-500 ease-in-out ${
                isTransitioning 
                  ? 'translate-x-[-100%]' 
                  : 'translate-x-0'
              }`}
            >
              <Image
                src={currentAchievement.image}
                alt={currentAchievement.title}
                fill
                className="object-cover"
              />
            </div>
          </div>
          
          {/* Content Side */}
          <div className="w-full md:w-1/2 p-6 flex flex-col justify-center">
            <div 
              className={`transition-transform duration-500 ease-in-out ${
                isTransitioning 
                  ? 'translate-x-[-100%]' 
                  : 'translate-x-0'
              }`}
            >
              <div className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/60 mb-2">
                {currentAchievement.number}
              </div>
              <h3 className="text-2xl font-semibold mb-2">{currentAchievement.title}</h3>
              <p className="text-muted-foreground mb-6">{currentAchievement.description}</p>
              <Button asChild className="w-fit">
                <a href={currentAchievement.link}>زيارة الصفحة</a>
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Navigation Buttons */}
      <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 flex justify-between px-4 pointer-events-none">
        <Button 
          variant="ghost" 
          size="icon" 
          className="rounded-full bg-background/50 backdrop-blur-sm hover:bg-background/80 pointer-events-auto"
          onClick={prevSlide}
        >
          <ChevronRight className="h-6 w-6" />
        </Button>
        <Button 
          variant="ghost" 
          size="icon" 
          className="rounded-full bg-background/50 backdrop-blur-sm hover:bg-background/80 pointer-events-auto"
          onClick={nextSlide}
        >
          <ChevronLeft className="h-6 w-6" />
        </Button>
      </div>
    </div>
  )
} 