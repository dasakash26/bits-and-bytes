import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/Providers";
import { StructuredData } from "@/components/StructuredData";

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
    default: "Bits & Bytes - Tech Blog for Developers",
    template: "%s | Bits & Bytes",
  },
  description:
    "A comprehensive tech blogging platform for developers. Discover the latest in web development, programming tutorials, software engineering insights, and cutting-edge technology trends.",
  keywords: [
    "Next.js",
    "React",
    "Tailwind CSS",
    "Geist UI",
    "Blog",
    "Tech Blog",
    "Developer Blog",
    "Programming",
    "Software Development",
    "Web Development",
    "Frontend Development",
    "Backend Development",
    "Full Stack Development",
    "JavaScript",
    "TypeScript",
    "CSS",
    "HTML",
    "Web Design",
    "Web Performance",
    "Web Accessibility",
    "Web Standards",
    "Web Technologies",
    "Coding Tutorials",
    "Programming Tips",
    "Software Engineering",
    "DevOps",
    "Cloud Computing",
    "API Development",
    "Database Design",
    "UI/UX Design",
  ],
  authors: [{ name: "Bits & Bytes Team" }],
  creator: "Bits & Bytes",
  publisher: "Bits & Bytes",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://bits-and-bytes-rho.vercel.app"),
  alternates: {
    canonical: "/",
    languages: {
      "en-US": "/en-US",
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://bits-and-bytes-rho.vercel.app",
    title: "Bits & Bytes - Tech Blog for Developers",
    description:
      "A comprehensive tech blogging platform for developers. Discover the latest in web development, programming tutorials, and software engineering insights.",
    siteName: "Bits & Bytes",
    images: [
      {
        url: "/logo.webp",
        width: 1200,
        height: 630,
        alt: "Bits & Bytes - Tech Blog for Developers",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Bits & Bytes - Tech Blog for Developers",
    description:
      "A comprehensive tech blogging platform for developers. Discover the latest in web development, programming tutorials, and software engineering insights.",
    images: ["/logo.webp"],
    creator: "@bitsandbytes",
    site: "@bitsandbytes",
  },
  robots: {
    index: true,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: false,
      noimageindex: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/favicon.ico",
    other: {
      rel: "apple-touch-icon-precomposed",
      url: "/favicon.ico",
    },
  },
  manifest: "/manifest.json",
  category: "technology",
  classification: "Blog",
  referrer: "origin-when-cross-origin",
  colorScheme: "dark light",
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
  },
  verification: {
    google: "your-google-site-verification-code",
    yandex: "your-yandex-verification-code",
    yahoo: "your-yahoo-verification-code",
  },
  appleWebApp: {
    title: "Bits & Bytes",
    statusBarStyle: "black-translucent",
    capable: true,
  },
  applicationName: "Bits & Bytes",
  generator: "Next.js",
  abstract: "Tech blog and programming tutorials for developers",
  archives: ["/sitemap.xml"],
  assets: ["/assets"],
  bookmarks: ["/bookmarks"],
  other: {
    "theme-color": "#000000",
    "color-scheme": "dark light",
    "mobile-web-app-capable": "yes",
    "apple-mobile-web-app-capable": "yes",
    "apple-mobile-web-app-status-bar-style": "black-translucent",
    "msapplication-TileColor": "#000000",
    "msapplication-config": "/browserconfig.xml",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <StructuredData type="website" />
        <StructuredData type="organization" />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
