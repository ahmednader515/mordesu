import type { Metadata } from "next";
import { Inter, Cairo } from "next/font/google";
import "./globals.css";
import { Button } from "@/components/ui/button";
import { ThemeProvider } from "@/components/theme-provider";
import StructuredData from "./structured-data";
import Image from "next/image";
import { Analytics } from "@vercel/analytics/react"
import { SpeedInsights } from "@vercel/speed-insights/next"

const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-inter",
});

const cairo = Cairo({ 
  subsets: ["arabic", "latin"],
  variable: "--font-cairo",
});

export const metadata: Metadata = {
  title: "Mordesu Studio | استوديو مورديسيو",
  description: "Mordesu Studio (استوديو مورديسيو) is a leading Arabic game development studio based in Cairo, Egypt. We specialize in creating immersive gaming experiences and innovative game development solutions.",
  keywords: "Mordesu, Mordesu Studio, استوديو مورديسيو, مورديسيو, game development, game studio, مصر, Cairo, Arabic games, استوديو ألعاب, تطوير ألعاب",
  authors: [{ name: "Mordesu Studio" }],
  creator: "Mordesu Studio",
  publisher: "Mordesu Studio",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: "https://mordesu.com",
  },
  icons: {
    icon: '/logo.png',
    shortcut: '/logo.png',
    apple: '/logo.png',
    other: {
      rel: 'apple-touch-icon-precomposed',
      url: '/logo.png',
    },
  },
  openGraph: {
    title: "Mordesu Studio | استوديو مورديسيو",
    description: "Leading Arabic game development studio based in Cairo, Egypt. Specializing in immersive gaming experiences and innovative game development.",
    url: "https://mordesu.com",
    siteName: "Mordesu Studio",
    locale: "ar_EG",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mordesu Studio | استوديو مورديسيو",
    description: "Leading Arabic game development studio based in Cairo, Egypt.",
    creator: "@mordesu",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code", // You'll need to replace this with your actual Google verification code
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html dir="rtl" lang="ar" suppressHydrationWarning>
      <head>
        <StructuredData />
      </head>
      <body className={`${inter.variable} ${cairo.variable} font-cairo antialiased`}>
        <ThemeProvider>
          {children}
          <Analytics />
          <SpeedInsights />
          <footer className="bg-muted/50 border-t">
            <div className="container mx-auto px-4 py-16">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
                {/* Studio Info */}
                <div className="space-y-4">
                  <h3 className="text-2xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">Mordesu Studio</h3>
                  <p className="text-muted-foreground">ستوديو عربي متخصص في تطوير الألعاب و تقديم الخدمات المختلفة</p>
                  <div className="flex items-center gap-4 pt-4">
                    <div className="flex gap-6 rtl:space-x-reverse">
                      <a href="https://www.instagram.com/mordecailll/" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                        <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M12 0C8.74 0 8.333.015 7.053.072c-1.905.16-3.263.848-4.548 2.133C.848 4.49.16 5.847.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.16 1.905.848 3.263 2.133 4.548 1.905 1.905 3.263 2.133 4.548 2.133 1.28.06 1.687.072 4.947.072s3.667-.015 4.947-.072c1.905-.16 3.263-.848 4.548-2.133 1.905-1.905 2.133-3.263 2.133-4.548.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.16-1.905-.848-3.263-2.133-4.548C19.51.848 18.153.16 16.947.072 15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.1 1.805.585 2.219 1.005.42.42.905 1.05 1.005 2.22.055 1.265.07 1.645.07 4.85s-.015 3.585-.074 4.85c-.1 1.17-.585 1.805-1.005 2.219-.42.42-1.05.905-2.22 1.005-1.265.055-1.645.07-4.85.07s-3.585-.015-4.85-.074c-1.17-.1-1.805-.585-2.219-1.005-.42-.42-.905-1.05-1.005-2.22-.055-1.265-.07-1.645-.07-4.85s.015-3.585.072-4.85c.1-1.17.586-1.805 1.006-2.219.42-.42 1.05-.905 2.22-1.005 1.266-.055 1.646-.07 4.851-.07zm0 3.5c-4.418 0-8 3.582-8 8s3.582 8 8 8 8-3.582 8-8-3.582-8-8-8zm0 13.2c-2.87 0-5.2-2.33-5.2-5.2s2.33-5.2 5.2-5.2 5.2 2.33 5.2 5.2-2.33 5.2-5.2 5.2zm6.4-8.4c0 1.767-1.433 3.2-3.2 3.2s-3.2-1.433-3.2-3.2 1.433-3.2 3.2-3.2 3.2 1.433 3.2 3.2z"/>
                        </svg>
                      </a>
                      <a href="https://wa.me/01023005622" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                        <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                        </svg>
                      </a>
                      <a href="https://www.tiktok.com/@1_mordecai_1" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                        <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M12.53.02C13.84 0 15.14.01 16.44 0c.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
                        </svg>
                      </a>
                      <a href="https://www.twitch.tv/m0rdecaia" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                        <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M11.571 4.714h1.715v5.143H11.57zm4.715 0H18v5.143h-1.714zM6 0L1.714 4.286v15.428h5.143V24l4.286-4.286h3.428L22.286 12V0zm14.571 11.143l-3.428 3.428h-3.429l-3 3v-3H6.857V1.714h13.714Z"/>
                        </svg>
                      </a>
                    </div>
                  </div>
                </div>

                {/* Our Games */}
                <div>
                  <h3 className="text-lg font-bold mb-6">ألعابنا</h3>
                  <ul className="space-y-4">
                    <li>
                      <Button variant="link" className="p-0 h-auto text-muted-foreground hover:text-primary">
                        <a href="https://store.steampowered.com/app/3666640/_/" target="_blank" rel="noopener noreferrer">انتم السابقون</a>
                      </Button>
                    </li>
                    <li>
                      <Button variant="link" className="p-0 h-auto text-muted-foreground hover:text-primary">
                        <a href="https://store.steampowered.com/app/3331610/Dark_Honor/" target="_blank" rel="noopener noreferrer">دارك أونور</a>
                      </Button>
                    </li>
                    <li>
                      <Button variant="link" className="p-0 h-auto text-muted-foreground hover:text-primary">
                        <a href="https://store.steampowered.com/app/2706560/Multiworlds/" target="_blank" rel="noopener noreferrer">مالتي ورلد</a>
                      </Button>
                    </li>
                  </ul>
                </div>

                {/* Contact Info */}
                <div>
                  <h3 className="text-lg font-bold mb-6">معلومات التواصل</h3>
                  <ul className="space-y-4">
                    <li className="flex items-center gap-3 text-muted-foreground">
                      <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                      </svg>
                      <span>201023005622+</span>
                    </li>
                    <li className="flex items-center gap-3 text-muted-foreground">
                      <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                        <circle cx="12" cy="10" r="3"/>
                      </svg>
                      <span>القاهرة، مصر</span>
                    </li>
                    <li className="flex items-center gap-3 text-muted-foreground">
                      <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                        <polyline points="22,6 12,13 2,6"/>
                      </svg>
                      <span>mordesu1studio@gmail.com</span>
                    </li>
                  </ul>
                </div>

                {/* Partners */}
                <div>
                  <h3 className="text-lg font-bold mb-6">شركاؤنا</h3>
                  <div className="grid grid-cols-2 gap-3">
                    <Image
                      src="/sna3.png"
                      alt="SNA3"
                      width={50}
                      height={50}
                      className="opacity-80 hover:opacity-100 transition-opacity"
                    />
                    <Image
                      src="/sa3id.png"
                      alt="SA3ID"
                      width={50}
                      height={50}
                      className="opacity-80 hover:opacity-100 transition-opacity"
                    />
                    <Image
                      src="/amman.png"
                      alt="Amman"
                      width={50}
                      height={50}
                      className="opacity-80 hover:opacity-100 transition-opacity"
                    />
                    <Image
                      src="/watan.png"
                      alt="Watan"
                      width={50}
                      height={50}
                      className="opacity-80 hover:opacity-100 transition-opacity"
                    />
                  </div>
                </div>
              </div>

              {/* Copyright */}
              <div className="border-t mt-12 pt-8 text-center text-muted-foreground">
                <p>© {new Date().getFullYear()} Mordesu Studio. جميع الحقوق محفوظة</p>
              </div>
            </div>
          </footer>
        </ThemeProvider>
      </body>
    </html>
  );
}
