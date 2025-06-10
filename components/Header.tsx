"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useTheme } from "next-themes";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Search, Moon, Sun, Code } from "lucide-react";

export function Header({ children }: { children: React.ReactNode }) {
  const navItems = [
    { name: "Home", link: "/feed" },
    { name: "Categories", link: "/categories" },
    { name: "Contact", link: "/contact" },
  ];

  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setIsSearchOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Ensure component is mounted before rendering theme toggle
  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="relative w-full">
      {/* Header */}
      <header
        className={`sticky top-2 z-50 w-full transition-all duration-500 ${
          isScrolled ? "mx-auto max-w-3xl px-4" : "mx-auto max-w-[90vw] px-8"
        }`}
      >
        <div
          className={`bg-background/60 backdrop-blur-sm border border-border/50 rounded-3xl shadow-sm transition-all duration-500 ${
            isScrolled ? "bg-background/80 backdrop-blur-md shadow-md" : ""
          }`}
        >
          <div
            className={`transition-all duration-500 ${
              isScrolled ? "px-4 sm:px-6" : "px-6 sm:px-8 lg:px-12"
            }`}
          >
            <div
              className={`flex items-center justify-between transition-all duration-500 ${
                isScrolled ? "h-12" : "h-16"
              }`}
            >
              {/* Logo */}
              <Link
                href="/"
                className="flex items-center space-x-2 hover:scale-105 transition-transform duration-300"
              >
                <Code
                  className={`text-primary transition-all duration-500 ${
                    isScrolled ? "h-6 w-6" : "h-8 w-8"
                  }`}
                />
                <span
                  className={`font-bold text-foreground transition-all duration-500 ${
                    isScrolled ? "text-base" : "text-xl"
                  }`}
                >
                  Bits & Bytes
                </span>
              </Link>

              {/* Desktop Navigation with enhanced hover effects */}
              <nav className="hidden md:flex items-center space-x-2">
                {navItems.map((item) => (
                  <Link
                    key={item.name}
                    href={item.link}
                    className={`relative text-sm font-medium text-muted-foreground hover:text-foreground transition-all duration-300 rounded-xl group ${
                      isScrolled ? "px-3 py-1.5" : "px-4 py-2"
                    }`}
                  >
                    <span className="relative z-10">{item.name}</span>
                    <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-primary/5 rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-300 scale-95 group-hover:scale-100" />
                    <div className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-primary group-hover:w-3/4 transition-all duration-300 transform -translate-x-1/2" />
                  </Link>
                ))}
              </nav>

              {/* Search & Theme Toggle */}
              <div className="hidden md:flex items-center space-x-2">
                <button
                  className={`flex items-center space-x-2 text-sm text-muted-foreground bg-muted/50 hover:bg-muted/70 rounded-2xl transition-all duration-300 hover:scale-105 ${
                    isScrolled ? "px-2.5 py-1" : "px-3 py-1.5"
                  }`}
                  onClick={() => setIsSearchOpen(true)}
                >
                  <Search
                    className={`transition-all duration-500 ${
                      isScrolled ? "h-3 w-3" : "h-3.5 w-3.5"
                    }`}
                  />
                  {!isScrolled && <span>Search...</span>}
                  <kbd
                    className={`pointer-events-none inline-flex select-none items-center gap-1 rounded border border-border/50 bg-muted/50 font-mono font-medium text-muted-foreground transition-all duration-500 ${
                      isScrolled
                        ? "h-3 px-0.5 text-[8px]"
                        : "h-4 px-1 text-[9px]"
                    }`}
                  >
                    <span className="text-xs">⌘</span>K
                  </kbd>
                </button>
                {mounted && (
                  <button
                    onClick={() =>
                      setTheme(theme === "dark" ? "light" : "dark")
                    }
                    className={`rounded-2xl hover:bg-muted/50 transition-all duration-300 hover:scale-110 group ${
                      isScrolled ? "p-1.5" : "p-2"
                    }`}
                    aria-label="Toggle theme"
                  >
                    {theme === "dark" ? (
                      <Sun
                        className={`text-muted-foreground group-hover:text-yellow-500 group-hover:rotate-180 transition-all duration-500 ${
                          isScrolled ? "h-3.5 w-3.5" : "h-4 w-4"
                        }`}
                      />
                    ) : (
                      <Moon
                        className={`text-muted-foreground group-hover:text-blue-500 group-hover:-rotate-12 transition-all duration-300 ${
                          isScrolled ? "h-3.5 w-3.5" : "h-4 w-4"
                        }`}
                      />
                    )}
                  </button>
                )}
              </div>

              {/* Mobile Search, Theme & Menu */}
              <div className="md:hidden flex items-center space-x-1">
                <button
                  className={`rounded-2xl hover:bg-muted/50 transition-all duration-300 hover:scale-110 ${
                    isScrolled ? "p-1" : "p-1.5"
                  }`}
                  onClick={() => setIsSearchOpen(true)}
                  aria-label="Search"
                >
                  <Search
                    className={`text-muted-foreground transition-all duration-500 ${
                      isScrolled ? "h-3.5 w-3.5" : "h-4 w-4"
                    }`}
                  />
                </button>
                {mounted && (
                  <button
                    onClick={() =>
                      setTheme(theme === "dark" ? "light" : "dark")
                    }
                    className={`rounded-2xl hover:bg-muted/50 transition-all duration-300 hover:scale-110 group ${
                      isScrolled ? "p-1" : "p-1.5"
                    }`}
                    aria-label="Toggle theme"
                  >
                    {theme === "dark" ? (
                      <Sun
                        className={`text-muted-foreground group-hover:text-yellow-500 group-hover:rotate-180 transition-all duration-500 ${
                          isScrolled ? "h-3.5 w-3.5" : "h-4 w-4"
                        }`}
                      />
                    ) : (
                      <Moon
                        className={`text-muted-foreground group-hover:text-blue-500 group-hover:-rotate-12 transition-all duration-300 ${
                          isScrolled ? "h-3.5 w-3.5" : "h-4 w-4"
                        }`}
                      />
                    )}
                  </button>
                )}
                <button
                  className={`rounded-2xl hover:bg-muted/50 transition-all duration-300 hover:scale-110 group ${
                    isScrolled ? "p-1" : "p-1.5"
                  }`}
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  aria-label="Toggle menu"
                >
                  <svg
                    className={`text-muted-foreground group-hover:text-foreground transition-colors duration-300 ${
                      isScrolled ? "h-4 w-4" : "h-5 w-5"
                    }`}
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    {isMobileMenuOpen ? (
                      <path
                        d="M6 18L18 6M6 6l12 12"
                        className="group-hover:stroke-red-500 transition-colors duration-300"
                      />
                    ) : (
                      <path d="M4 6h16M4 12h16M4 18h16" />
                    )}
                  </svg>
                </button>
              </div>
            </div>

            {/* Mobile Navigation with enhanced hover effects */}
            {isMobileMenuOpen && (
              <div className="md:hidden border-t border-border/50 py-3">
                <nav className="flex flex-col space-y-2">
                  {navItems.map((item, index) => (
                    <Link
                      key={item.name}
                      href={item.link}
                      className="relative px-4 py-3 text-sm font-medium text-muted-foreground hover:text-foreground transition-all duration-300 rounded-xl hover:bg-gradient-to-r hover:from-muted/50 hover:to-muted/30 hover:scale-105 group"
                      onClick={() => setIsMobileMenuOpen(false)}
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <span className="relative z-10">{item.name}</span>
                      <div className="absolute left-0 top-1/2 w-0 h-0.5 bg-primary group-hover:w-8 transition-all duration-300 transform -translate-y-1/2" />
                    </Link>
                  ))}
                </nav>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Command Dialog for Search */}
      <CommandDialog open={isSearchOpen} onOpenChange={setIsSearchOpen}>
        <CommandInput placeholder="Search articles, categories..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Navigation">
            {navItems.map((item) => (
              <CommandItem
                key={item.name}
                onSelect={() => {
                  setIsSearchOpen(false);
                  // Navigate to item.link
                }}
                className="hover:bg-primary/10 transition-colors duration-200"
              >
                {item.name}
              </CommandItem>
            ))}
          </CommandGroup>
          <CommandGroup heading="Recent Articles">
            <CommandItem className="hover:bg-primary/10 transition-colors duration-200">
              Understanding React Server Components
            </CommandItem>
            <CommandItem className="hover:bg-primary/10 transition-colors duration-200">
              The Future of TypeScript
            </CommandItem>
            <CommandItem className="hover:bg-primary/10 transition-colors duration-200">
              Building Scalable APIs with Node.js
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>

      {/* Main Content */}
      <main className="pt-4">{children}</main>
    </div>
  );
}
