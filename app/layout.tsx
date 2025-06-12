import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/Providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Bits & Bytes",
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
  ],
  description: "A tech blogging platform for developers",
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
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
