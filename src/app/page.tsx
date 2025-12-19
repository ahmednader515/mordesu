import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { SectionHeading } from "@/components/ui/section-heading"
import { LazySplineContainer } from "@/components/lazy-spline-container"
import { Navbar } from "@/components/navbar"
import { AchievementCarousel } from "@/components/achievement-carousel"
import { SteamIcon } from "@/components/icons/steam"
import Image from "next/image"
import { ScrollArrow } from "@/components/scroll-arrow"
import { GiftIcon } from "@/components/gift-icon"

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <section id="home" className="relative h-screen flex items-center justify-center bg-background overflow-hidden">
        {/* Grid Background */}
        <div className="absolute inset-0 bg-grid-white/[0.02] bg-grid-pattern" />
        
        {/* Spline 3D Scene - All Devices */}
        <div className="absolute inset-0 w-full h-full">
          <LazySplineContainer 
            sceneUrl="https://prod.spline.design/ek0uvHF8rgKJI-NK/scene.splinecode"
            className="w-full h-full [filter:saturate(1.5)_contrast(1.1)]"
            fullHeight={true}
          />
        </div>
        
        {/* Video Background - Removed in favor of 3D model */}
        
        <ScrollArrow />
        
        {/* Bottom Color Bar */}
        <div className="absolute bottom-0 left-0 w-full h-15 bg-[#0C1227] z-10">
          <div 
            className="absolute inset-0 z-20"
            style={{
              backgroundImage: `radial-gradient(#3b82f6 1.3px, transparent 1.3px), radial-gradient(#3b82f6 1.3px, #0C1227 1.3px)`,
              backgroundSize: '52px 52px',
              backgroundPosition: '0 0, 26px 26px',
              opacity: 0.15
            }}
          />
        </div>
      </section>
      
      {/* Gift Icon - Appears when ScrollArrow disappears */}
      <GiftIcon />

      {/* Featured Games Section */}
      <section id="featured-games" className="relative py-16 overflow-hidden bg-[#0C1227]">
        <div 
          className="absolute inset-0 z-[5]"
          style={{
            backgroundImage: `radial-gradient(#3b82f6 1.3px, transparent 1.3px), radial-gradient(#3b82f6 1.3px, #0C1227 1.3px)`,
            backgroundSize: '52px 52px',
            backgroundPosition: '0 0, 26px 26px',
            opacity: 0.15
          }}
        />
        <div className="container mx-auto px-4 relative z-10">
          <SectionHeading 
            title="اشهر الالعاب" 
            subtitle="اكتشف اشهر الالعاب التي قمنا بتطويرها"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8 max-w-6xl mx-auto">
            {/* First Game Card with Main_Capsule3.png */}
            <Card className="overflow-hidden border-muted-foreground/10 hover:border-primary/20 transition-colors flex flex-col h-full">
              <div className="aspect-video relative">
                <Image
                  src="/Main_Capsule3.png"
                  alt="Featured Game"
                  fill
                  className="object-cover"
                />
              </div>
              <CardHeader>
                <CardTitle>انتم السابقون</CardTitle>
                <CardDescription>ستجد نفسك محاصرًا في عالم مظلم حيث يتعين على اللاعبين حل الألغاز للنجاة، بينما يسعى الوحش للقضاء عليهم جميعًا. كل قرار تتخذه قد يكون الفارق بين الحياة والموت</CardDescription>
              </CardHeader>
              <CardContent className="mt-auto">
                <Button asChild variant="outline" className="w-full border-primary/20 hover:bg-primary/10 flex items-center justify-center gap-2">
                  <a href="https://www.antumalsabiqon.com/" target="_blank" rel="noopener noreferrer">
                    <span>موقع اللعبة</span>
                  </a>
                </Button>
              </CardContent>
            </Card>
            
            {/* Second Game Card with dark-honor.png */}
            <Card className="overflow-hidden border-muted-foreground/10 hover:border-primary/20 transition-colors flex flex-col h-full">
              <div className="aspect-video relative">
                <Image
                  src="/dark-honor.png"
                  alt="Dark Honor Game"
                  fill
                  className="object-cover"
                />
              </div>
              <CardHeader>
                <CardTitle>دارك أونور</CardTitle>
                <CardDescription> لعبة مغامرات وحركة تدور أحداثها في عالم فانتازي مظلم، حيث يتقمص اللاعبون دور محارب وحيد يسعى للانتقام من قبيلة الساموراي القاسية</CardDescription>
              </CardHeader>
              <CardContent className="mt-auto">
                <Button asChild variant="outline" className="w-full border-primary/20 hover:bg-primary/10 flex items-center justify-center gap-2">
                  <a href="https://store.steampowered.com/app/3331610/Dark_Honor/" target="_blank" rel="noopener noreferrer">
                    <span>صفحة اللعبة</span>
                    <SteamIcon className="h-4 w-4" />
                  </a>
                </Button>
              </CardContent>
            </Card>
            
            {/* Third Game Card with multi.png */}
            <Card className="overflow-hidden border-muted-foreground/10 hover:border-primary/20 transition-colors flex flex-col h-full">
              <div className="aspect-video relative">
                <Image
                  src="/multi.png"
                  alt="Multiplayer Game"
                  fill
                  className="object-cover"
                />
              </div>
              <CardHeader>
                <CardTitle>مالتي ورلد</CardTitle>
                <CardDescription>ستواجه خللًا مرعبًا يؤثر على بيئات العوالم المختلفة. مهمتك كبطل هي حل هذه المشكلة من خلال مواجهة مجموعة من الألغاز والتحديات </CardDescription>
              </CardHeader>
              <CardContent className="mt-auto">
                <Button asChild variant="outline" className="w-full border-primary/20 hover:bg-primary/10 flex items-center justify-center gap-2">
                  <a href="https://store.steampowered.com/app/2706560/Multiworlds/" target="_blank" rel="noopener noreferrer">
                    <span>صفحة اللعبة</span>
                    <SteamIcon className="h-4 w-4" />
                  </a>
                </Button>
              </CardContent>
            </Card>
            
            {/* Fourth Game Card with supernova.PNG */}
            <Card className="overflow-hidden border-muted-foreground/10 hover:border-primary/20 transition-colors flex flex-col h-full">
              <div className="aspect-video relative">
                <Image
                  src="/supernova.PNG"
                  alt="Supernova Game"
                  fill
                  className="object-cover"
                />
              </div>
              <CardHeader>
                <CardTitle>Super Nova</CardTitle>
                <CardDescription>Super Nova هي لعبة أكشن وخيال علمي تعاونية، يتحد فيها اللاعبون كأبطال يمتلكون قوى خارقة لمواجهة موجات من الأعداء الآليين المتطورين، وخوض معارك زعماء ضخمة للدفاع عن كوكب الأرض ضد غزو فضائي.</CardDescription>
              </CardHeader>
              <CardContent className="mt-auto">
                <Button asChild variant="outline" className="w-full border-primary/20 hover:bg-primary/10 flex items-center justify-center gap-2">
                  <a href="https://www.supernova-game.com/" target="_blank" rel="noopener noreferrer">
                    <span>موقع اللعبة</span>
                  </a>
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Platform Cards - Full Width */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12 max-w-4xl mx-auto">
            {/* Steam Games Collection Card */}
            <Card className="overflow-hidden border-muted-foreground/10 hover:border-primary/20 transition-colors bg-gradient-to-br from-blue-950 via-blue-900 to-blue-800 h-full flex flex-col">
              <CardHeader className="text-center space-y-4">
                <div className="flex justify-center">
                  <SteamIcon className="h-16 w-16 text-white/90" />
                </div>
                <div className="space-y-2">
                  <CardTitle className="text-white text-2xl">ألعابنا على Steam</CardTitle>
                  <CardDescription className="text-white/80 text-base">اكتشف المزيد من ألعابنا على منصة Steam</CardDescription>
                </div>
              </CardHeader>
              <CardContent className="pt-6 mt-auto">
                <Button asChild variant="outline" className="w-full bg-white/10 hover:bg-white/20 text-white border-white/20 flex items-center justify-center gap-2 font-semibold">
                  <a href="https://store.steampowered.com/search/?developer=MordeSu%20studio" target="_blank" rel="noopener noreferrer">
                    <span>زيارة صفحتنا</span>
                    <SteamIcon className="h-4 w-4" />
                  </a>
                </Button>
              </CardContent>
            </Card>

            {/* Google Play Games Collection Card */}
            <Card className="overflow-hidden border-muted-foreground/10 hover:border-primary/20 transition-colors bg-gradient-to-br from-[#01875f] to-[#00bfa5] h-full flex flex-col">
              <CardHeader className="text-center space-y-4">
                <div className="flex justify-center">
                  <svg className="h-16 w-16 text-white/90" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.5,12.92 20.16,13.19L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z" />
                  </svg>
                </div>
                <div className="space-y-2">
                  <CardTitle className="text-white text-2xl">ألعابنا على Google Play</CardTitle>
                  <CardDescription className="text-white/80 text-base">استمتع بألعابنا المتنقلة على متجر Google Play</CardDescription>
                </div>
              </CardHeader>
              <CardContent className="mt-auto">
                <Button asChild className="w-full bg-white text-[#01875f] hover:bg-white/90 border-none flex items-center justify-center gap-2 font-semibold">
                  <a href="https://play.google.com/store/apps/dev?id=7189528374457116405" target="_blank" rel="noopener noreferrer">
                    <span>زيارة صفحتنا</span>
                    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.5,12.92 20.16,13.19L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z" />
                    </svg>
                  </a>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

        {/* Social Networks Section */}
        <section id="social-networks" className="py-20">
          <div className="container px-4 mx-auto">
            <SectionHeading 
              title="حساباتنا في السوشيال ميديا" 
              subtitle="تابعنا على منصات التواصل الاجتماعي"
            />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
              {/* Instagram Card */}
              <Card className="overflow-hidden border-muted-foreground/10 hover:border-primary/20 transition-colors bg-gradient-to-br from-[#E4405F] to-[#C13584] h-full flex flex-col">
                <CardHeader className="text-center space-y-4">
                  <div className="flex justify-center">
                    <svg className="h-16 w-16 text-white/90" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 0C8.74 0 8.333.015 7.053.072c-1.905.16-3.263.848-4.548 2.133C.848 4.49.16 5.847.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.16 1.905.848 3.263 2.133 4.548 1.905 1.905 3.263 2.133 4.548 2.133 1.28.06 1.687.072 4.947.072s3.667-.015 4.947-.072c1.905-.16 3.263-.848 4.548-2.133 1.905-1.905 2.133-3.263 2.133-4.548.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.16-1.905-.848-3.263-2.133-4.548C19.51.848 18.153.16 16.947.072 15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.1 1.805.585 2.219 1.005.42.42.905 1.05 1.005 2.22.055 1.265.07 1.645.07 4.85s-.015 3.585-.074 4.85c-.1 1.17-.585 1.805-1.005 2.219-.42.42-1.05.905-2.22 1.005-1.265.055-1.645.07-4.85.07s-3.585-.015-4.85-.074c-1.17-.1-1.805-.585-2.219-1.005-.42-.42-.905-1.05-1.005-2.22-.055-1.265-.07-1.645-.07-4.85s.015-3.585.072-4.85c.1-1.17.586-1.805 1.006-2.219.42-.42 1.05-.905 2.22-1.005 1.266-.055 1.646-.07 4.851-.07zm0 3.5c-4.418 0-8 3.582-8 8s3.582 8 8 8 8-3.582 8-8-3.582-8-8-8zm0 13.2c-2.87 0-5.2-2.33-5.2-5.2s2.33-5.2 5.2-5.2 5.2 2.33 5.2 5.2-2.33 5.2-5.2 5.2zm6.4-8.4c0 1.767-1.433 3.2-3.2 3.2s-3.2-1.433-3.2-3.2 1.433-3.2 3.2-3.2 3.2 1.433 3.2 3.2z"/>
                    </svg>
                  </div>
                  <div className="space-y-2">
                    <CardTitle className="text-white text-2xl">Instagram</CardTitle>
                    <CardDescription className="text-white/80 text-base">تابعنا على Instagram</CardDescription>
                  </div>
                </CardHeader>
                <CardContent className="mt-auto">
                  <Button asChild className="w-full bg-white text-[#E4405F] hover:bg-white/90 border-none flex items-center justify-center gap-2 font-semibold">
                    <a href="https://www.instagram.com/mordecailll/" target="_blank" rel="noopener noreferrer">
                      <span>تابعنا</span>
                      <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 0C8.74 0 8.333.015 7.053.072c-1.905.16-3.263.848-4.548 2.133C.848 4.49.16 5.847.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.16 1.905.848 3.263 2.133 4.548 1.905 1.905 3.263 2.133 4.548 2.133 1.28.06 1.687.072 4.947.072s3.667-.015 4.947-.072c1.905-.16 3.263-.848 4.548-2.133 1.905-1.905 2.133-3.263 2.133-4.548.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.16-1.905-.848-3.263-2.133-4.548C19.51.848 18.153.16 16.947.072 15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.1 1.805.585 2.219 1.005.42.42.905 1.05 1.005 2.22.055 1.265.07 1.645.07 4.85s-.015 3.585-.074 4.85c-.1 1.17-.585 1.805-1.005 2.219-.42.42-1.05.905-2.22 1.005-1.265.055-1.645.07-4.85.07s-3.585-.015-4.85-.074c-1.17-.1-1.805-.585-2.219-1.005-.42-.42-.905-1.05-1.005-2.22-.055-1.265-.07-1.645-.07-4.85s.015-3.585.072-4.85c.1-1.17.586-1.805 1.006-2.219.42-.42 1.05-.905 2.22-1.005 1.266-.055 1.646-.07 4.851-.07zm0 3.5c-4.418 0-8 3.582-8 8s3.582 8 8 8 8-3.582 8-8-3.582-8-8-8zm0 13.2c-2.87 0-5.2-2.33-5.2-5.2s2.33-5.2 5.2-5.2 5.2 2.33 5.2 5.2-2.33 5.2-5.2 5.2zm6.4-8.4c0 1.767-1.433 3.2-3.2 3.2s-3.2-1.433-3.2-3.2 1.433-3.2 3.2-3.2 3.2 1.433 3.2 3.2z"/>
                      </svg>
                    </a>
                  </Button>
                </CardContent>
              </Card>

              {/* WhatsApp Card */}
              <Card className="overflow-hidden border-muted-foreground/10 hover:border-primary/20 transition-colors bg-gradient-to-br from-[#25D366] to-[#128C7E] h-full flex flex-col">
                <CardHeader className="text-center space-y-4">
                  <div className="flex justify-center">
                    <svg className="h-16 w-16 text-white/90" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                    </svg>
                  </div>
                  <div className="space-y-2">
                    <CardTitle className="text-white text-2xl">WhatsApp</CardTitle>
                    <CardDescription className="text-white/80 text-base">تواصل معنا على WhatsApp</CardDescription>
                  </div>
                </CardHeader>
                <CardContent className="mt-auto">
                  <Button asChild className="w-full bg-white text-[#25D366] hover:bg-white/90 border-none flex items-center justify-center gap-2 font-semibold">
                    <a href="https://wa.me/01023005622" target="_blank" rel="noopener noreferrer">
                      <span>تواصل معنا</span>
                      <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                      </svg>
                    </a>
                  </Button>
                </CardContent>
              </Card>

              {/* TikTok Card */}
              <Card className="overflow-hidden border-muted-foreground/10 hover:border-primary/20 transition-colors bg-gradient-to-br from-[#000000] via-[#1a1a1a] to-[#25F4EE]/20 h-full flex flex-col">
                <CardHeader className="text-center space-y-4">
                  <div className="flex justify-center">
                    <svg className="h-16 w-16 text-white" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12.53.02C13.84 0 15.14.01 16.44 0c.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
                    </svg>
                  </div>
                  <div className="space-y-2">
                    <CardTitle className="text-white text-2xl">TikTok</CardTitle>
                    <CardDescription className="text-white/80 text-base">تابعنا على TikTok</CardDescription>
                  </div>
                </CardHeader>
                <CardContent className="mt-auto">
                  <Button asChild className="w-full bg-white text-black hover:bg-white/90 border-none flex items-center justify-center gap-2 font-semibold">
                    <a href="https://www.tiktok.com/@1_mordecai_1" target="_blank" rel="noopener noreferrer">
                      <span>تابعنا</span>
                      <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12.53.02C13.84 0 15.14.01 16.44 0c.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
                      </svg>
                    </a>
                  </Button>
                </CardContent>
              </Card>

              {/* Twitch Card */}
              <Card className="overflow-hidden border-muted-foreground/10 hover:border-primary/20 transition-colors bg-gradient-to-br from-[#9146FF] to-[#7B2CBF] h-full flex flex-col">
                <CardHeader className="text-center space-y-4">
                  <div className="flex justify-center">
                    <svg className="h-16 w-16 text-white/90" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M11.571 4.714h1.715v5.143H11.57zm4.715 0H18v5.143h-1.714zM6 0L1.714 4.286v15.428h5.143V24l4.286-4.286h3.428L22.286 12V0zm14.571 11.143l-3.428 3.428h-3.429l-3 3v-3H6.857V1.714h13.714Z"/>
                    </svg>
                  </div>
                  <div className="space-y-2">
                    <CardTitle className="text-white text-2xl">Twitch</CardTitle>
                    <CardDescription className="text-white/80 text-base">تابعنا على Twitch</CardDescription>
                  </div>
                </CardHeader>
                <CardContent className="mt-auto">
                  <Button asChild className="w-full bg-white text-[#9146FF] hover:bg-white/90 border-none flex items-center justify-center gap-2 font-semibold">
                    <a href="https://www.twitch.tv/m0rdecaia" target="_blank" rel="noopener noreferrer">
                      <span>تابعنا</span>
                      <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M11.571 4.714h1.715v5.143H11.57zm4.715 0H18v5.143h-1.714zM6 0L1.714 4.286v15.428h5.143V24l4.286-4.286h3.428L22.286 12V0zm14.571 11.143l-3.428 3.428h-3.429l-3 3v-3H6.857V1.714h13.714Z"/>
                      </svg>
                    </a>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Achievements Section */}
        <section id="achievements" className="py-20 bg-muted/30 relative overflow-hidden">
          <div 
            className="absolute inset-0"
            style={{
              background: `radial-gradient(circle, transparent 20%, #0C1227 20%, #0C1227 80%, transparent 80%, transparent), 
                          radial-gradient(circle, transparent 20%, #0C1227 20%, #0C1227 80%, transparent 80%, transparent) 32.5px 32.5px, 
                          linear-gradient(#3b82f6 1.3px, transparent 1.3px) 0 -0.65px, 
                          linear-gradient(90deg, #3b82f6 1.3px, #0C1227 1.3px) -0.65px 0`,
              backgroundSize: '65px 65px, 65px 65px, 32.5px 32.5px, 32.5px 32.5px',
              opacity: 0.15
            }}
          />
          <div className="container px-4 mx-auto relative z-10">
            <SectionHeading 
              title="انجازاتنا" 
              subtitle="أهم انجازات مورديسو استوديو في هذا العام"
            />
            <div className="mt-12">
              <AchievementCarousel />
            </div>
          </div>
        </section>

      {/* Team Section */}
      <section id="team" className="py-20 relative overflow-hidden">
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at center center, #3b82f6, #0C1227), repeating-radial-gradient(circle at center center, #3b82f6, #3b82f6, 26px, transparent 52px, transparent 26px)`,
            backgroundBlendMode: 'multiply',
            opacity: 0.15
          }}
        />
        <div className="container px-4 mx-auto relative z-10">
          <SectionHeading 
            title="فريقنا" 
            subtitle="أهم مبدعين اعضاء مورديسو استوديو"
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { name: "مورديكاي", role: "مطور الألعاب و مؤسس الأستوديو", image: "/kaka.png" },
              { name: "عمر شولح", role: "مطور التطبيقات", image: "/kaka2.png" },
              { name: "احمد نادر", role: "مطور مواقع الويب", image: "/kaka3.png" },
              { name: "مصطفي عصام", role: "خدمة العملاء", image: "/male.png" },
              { name: "نور الدين", role: "جرافيك ديزاينر", image: "/kaka4.png" },
              { name: "نرمين مجدي", role: "ادارة اعمال الأستوديو", image: "/female.png" },
            ].map((member, i) => (
              <Card key={i} className="text-center border-muted-foreground/10 hover:border-primary/20 transition-colors">
                <CardHeader>
                  <div className="flex justify-center mb-4">
                    <Avatar className="h-32 w-32 border-2 border-primary/20">
                      {member.name === "مصطفي عصام" ? (
                        <div className="relative w-full h-full">
                          <AvatarImage 
                            src={member.image} 
                            alt={member.name}
                            className="object-cover translate-y-5"
                          />
                          <AvatarFallback className="bg-primary/10 text-primary text-2xl">?</AvatarFallback>
                        </div>
                      ) : (
                        <>
                          <AvatarImage 
                            src={member.image} 
                            alt={member.name}
                            className={`object-cover ${member.name === "احمد نادر" ? 'object-[center_0%]' : ''}`}
                          />
                          <AvatarFallback className="bg-primary/10 text-primary text-2xl">?</AvatarFallback>
                        </>
                      )}
                    </Avatar>
                  </div>
                  <CardTitle>{member.name}</CardTitle>
                  <CardDescription>{member.role}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
