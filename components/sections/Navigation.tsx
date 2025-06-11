"use client";
import { ModeToggle } from "@/components/ui/theme-toggler";
import LoginButton from "@/components/LoginButton";
import { Button } from "@/components/ui/button";
import { Code, Menu, X, Search, Sparkles } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export function Navigation() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { href: "#articles", label: "Articles" },
    { href: "#newsletter", label: "Newsletter" },
    { href: "#stats", label: "Stats" },
    { href: "/feed", label: "Feed" },
    { href: "#footer", label: "About" },
  ];

  return (
    <nav className="fixed top-0 w-full z-50 p-4 lg:p-6">
      <div className="container mx-auto">
        <div className="bg-background/95 backdrop-blur-xl border border-border/60 shadow-xl rounded-2xl px-4 lg:px-6">
          <div className="flex items-center justify-between h-16 lg:h-18">
            {/* Logo Section */}
            <Link
              href="/"
              className="flex items-center space-x-3 hover:scale-105 transition-all duration-300 group"
            >
              <div className="relative">
                <Code className="w-8 h-8 lg:w-9 lg:h-9 text-primary group-hover:rotate-12 transition-transform duration-300" />
                <div className="w-2 h-2 bg-primary rounded-full absolute -top-0.5 -right-0.5 animate-pulse" />
              </div>
              <div className="flex flex-col">
                <span className="text-lg lg:text-xl font-bold bg-gradient-to-r from-primary via-purple-600 to-pink-600 bg-clip-text text-transparent">
                  Bits & Bytes
                </span>
                <span className="text-[10px] lg:text-xs text-muted-foreground/80 font-semibold tracking-wider uppercase">
                  Tech Blog
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center">
              <div className="flex items-center space-x-1 bg-muted/50 rounded-2xl p-1.5 border border-border/50 shadow-sm">
                {navItems.map((item, index) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="relative px-4 py-2.5 rounded-xl text-sm font-semibold text-foreground/70 hover:text-foreground hover:bg-background shadow-sm transition-all duration-200 group"
                  >
                    <span className="relative z-10">{item.label}</span>
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-primary/15 to-purple-500/15 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                  </Link>
                ))}
              </div>
            </div>

            {/* Desktop Actions */}
            <div className="hidden lg:flex items-center space-x-4 mr-10">
              <ModeToggle />
              <LoginButton />
            </div>

            {/* Mobile Menu Button */}
            <div className="lg:hidden flex items-center space-x-2">
              <Button
                variant="ghost"
                size="sm"
                className="p-2 hover:bg-muted/60 rounded-xl shadow-sm"
              >
                <Search className="w-5 h-5" />
              </Button>
              <ModeToggle />
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 relative hover:bg-muted/60 rounded-xl shadow-sm"
              >
                <div className="relative w-6 h-6">
                  <Menu
                    className={`w-6 h-6 absolute transition-all duration-300 ${
                      isMobileMenuOpen
                        ? "rotate-90 opacity-0"
                        : "rotate-0 opacity-100"
                    }`}
                  />
                  <X
                    className={`w-6 h-6 absolute transition-all duration-300 ${
                      isMobileMenuOpen
                        ? "rotate-0 opacity-100"
                        : "-rotate-90 opacity-0"
                    }`}
                  />
                </div>
              </Button>
            </div>
          </div>

          {/* Mobile Navigation */}
          <div
            className={`lg:hidden overflow-hidden transition-all duration-300 ease-in-out ${
              isMobileMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
            }`}
          >
            <div className="py-6 space-y-2">
              {navItems.map((item, index) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="block px-4 py-3 rounded-xl text-foreground/70 hover:text-foreground hover:bg-muted/50 transition-all duration-200 font-semibold shadow-sm"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}

              <div className="pt-4 mt-4 border-t border-border/60">
                <div className="px-4">
                  <LoginButton />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
