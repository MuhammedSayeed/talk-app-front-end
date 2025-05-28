import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import QueryProvider from "@/providers/QueryProvider";
import { toastStyle } from "@/styles/toast";
import NextAuthSessionProvider from "@/providers/SessionProvider";
import { ChatProvider } from "@/context/chat/ChatProvider";
import { AuthProvider } from "@/context/auth/AuthProvider";
import AnimatedGradientBackground from "@/components/animatedBackground/AnimatedBackground";
import TopProgressBar from "@/components/ui/TopProgressBar";
import NetworkStatus from "@/components/NetworkStatus";
import { Suspense } from "react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Talk App - Real-time Chat Application",
    template: "%s | Talk App",
  },
  description: "Connect and chat with friends in real-time. A modern, secure messaging platform built with Next.js.",
  keywords: ["chat app", "messaging", "real-time chat", "communication", "instant messaging", "secure chat"],
  authors: [{ name: "Talk App Team" }],
  creator: "Talk App",
  publisher: "Talk App",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(process.env.APP_URL || "https://talk-chat.vercel.app"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    title: "Talk App - Real-time Chat Application",
    description: "Connect and chat with friends in real-time. A modern, secure messaging platform.",
    siteName: "Talk App",
    images: [
      {
        url: process.env.OG_IMAGE_URL || "",
        width: 1200,
        height: 630,
        alt: "Talk App - Real-time Chat Application",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Talk App - Real-time Chat Application",
    description: "Connect and chat with friends in real-time. A modern, secure messaging platform.",
    images: [process.env.OG_IMAGE_URL || ""],
    creator: "@talkapp",
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
  icons: {
    icon: [
      {
        url: process.env.FAVICON_16_URL || "/favicon-16x16.png",
        sizes: "16x16",
        type: "image/png",
      },
      {
        url: process.env.FAVICON_32_URL || "/favicon-32x32.png",
        sizes: "32x32",
        type: "image/png",
      },
    ],
    apple: [
      {
        url: process.env.APPLE_TOUCH_ICON_URL || "/apple-touch-icon.png",
        sizes: "180x180",
        type: "image/png",
      },
    ],
    other: [
      {
        rel: "mask-icon",
        url: "/safari-pinned-tab.svg",
        color: "#000000",
      },
    ],
  },
  manifest: "/site.webmanifest",
  category: "technology",
  classification: "Chat Application",
  referrer: "origin-when-cross-origin",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Talk App",
  },
  applicationName: "Talk App",
  generator: "Next.js",
  abstract: "A modern real-time chat application for seamless communication.",
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  colorScheme: "dark light",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#000000" },
  ],
}


export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="dark">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased `} suppressHydrationWarning>
        <NextAuthSessionProvider>
          <QueryProvider>
            <AuthProvider>
              <ChatProvider>
                <Suspense fallback={null}>
                  <TopProgressBar />
                </Suspense>
                <NetworkStatus />
                <Toaster toastOptions={toastStyle} />
                <AnimatedGradientBackground />
                {children}
              </ChatProvider>
            </AuthProvider>
          </QueryProvider>
        </NextAuthSessionProvider>
      </body>
    </html>
  );
}
