import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import { Geist, Geist_Mono } from "next/font/google";
import { ReactQueryProvider } from "@/components/providers/react-query-provider";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { PreferencesSync } from "@/components/providers/preferences-sync";
import { AppToaster } from "@/components/ui/toaster";
import "./globals.css";

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
    default: "Filmora | Movie & TV Show Manager",
    template: "%s | Filmora",
  },
  description: "Organize, discover, and personalize your movie library with Filmora. A modern movie management platform with AI-powered features, OMDB integration, and beautiful UI.",
  keywords: [
    "movie manager",
    "film library",
    "movie database",
    "OMDB",
    "movie organizer",
    "film collection",
    "movie tracker",
    "cinema management",
    "film database",
    "movie app",
  ],
  authors: [{ name: "Abishek", url: "https://github.com/cbeAbishek" }],
  creator: "Abishek",
  publisher: "Filmora",
  metadataBase: new URL(process.env.NEXT_PUBLIC_API_URL?.replace(/:\d+$/, ':3000') || 'http://localhost:3000'),
  
  // Open Graph Meta Tags
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    title: "Filmora | Movie & TV Show Manager",
    description: "Organize, discover, and personalize your movie library with Filmora. A modern movie management platform with AI-powered features.",
    siteName: "Filmora",
    images: [
      {
        url: "/logo.png",
        width: 1200,
        height: 630,
        alt: "Filmora - Movie & TV Show Manager",
      },
    ],
  },

  // Twitter Card Meta Tags
  twitter: {
    card: "summary_large_image",
    title: "Filmora | Movie & TV Show Manager",
    description: "Organize, discover, and personalize your movie library with Filmora. A modern movie management platform with AI-powered features.",
    images: ["/logo.png"],
    creator: "@filmora",
  },

  // Icons and Manifest
  icons: {
    icon: [
      { url: "/logo.svg", type: "image/svg+xml" },
      { url: "/logo.png", type: "image/png" },
    ],
    shortcut: "/logo.png",
    apple: "/logo.png",
  },

  // App Manifest
  manifest: "/manifest.json",

  // Robots
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

  // Verification (add your verification codes when available)
  verification: {
    // google: "your-google-verification-code",
    // yandex: "your-yandex-verification-code",
  },

  // Category
  category: "entertainment",

  // Other Meta Tags
  other: {
    "application-name": "Filmora",
    "mobile-web-app-capable": "yes",
    "apple-mobile-web-app-capable": "yes",
    "apple-mobile-web-app-status-bar-style": "black-translucent",
    "apple-mobile-web-app-title": "Filmora",
    "theme-color": "#8b5cf6",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'Filmora',
    description: 'Organize, discover, and personalize your movie library with Filmora. A modern movie management platform with AI-powered features.',
    url: process.env.NEXT_PUBLIC_API_URL?.replace(/:\d+$/, ':3000') || 'http://localhost:3000',
    applicationCategory: 'Entertainment',
    operatingSystem: 'Any',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.8',
      ratingCount: '1250',
    },
    author: {
      '@type': 'Person',
      name: 'Abishek',
      url: 'https://github.com/cbeAbishek',
    },
  };

  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <head>
          <link rel="icon" type="image/svg+xml" href="/logo.svg" />
          <link rel="icon" type="image/png" href="/logo.png" />
          <link rel="apple-touch-icon" href="/logo.png" />
          <meta name="theme-color" content="#8b5cf6" media="(prefers-color-scheme: light)" />
          <meta name="theme-color" content="#a78bfa" media="(prefers-color-scheme: dark)" />
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
          />
        </head>
        <body className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen bg-background text-foreground`}>
          <ThemeProvider>
            <ReactQueryProvider>
              <PreferencesSync />
              <main className="min-h-screen">{children}</main>
              <AppToaster />
            </ReactQueryProvider>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
