import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { FileQuestion, Home, Search, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-accent/10 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl bg-card/80 backdrop-blur-sm border-border shadow-xl">
        <CardContent className="p-8 text-center space-y-6">
          {/* 404 Icon */}
          <div className="mx-auto w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center">
            <FileQuestion className="w-10 h-10 text-primary" />
          </div>

          {/* 404 Message */}
          <div className="space-y-3">
            <h1 className="text-6xl font-bold text-primary">404</h1>
            <h2 className="text-3xl font-bold text-foreground">
              Page Not Found
            </h2>
            <p className="text-muted-foreground text-lg max-w-md mx-auto">
              The page you're looking for doesn't exist or has been moved to a
              different location.
            </p>
          </div>

          {/* Suggestions */}
          <Card className="bg-muted/50 border-border/50">
            <CardContent className="p-4">
              <h3 className="font-semibold text-foreground mb-3">
                Here's what you can do:
              </h3>
              <ul className="text-sm text-muted-foreground space-y-2 text-left">
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                  Check the URL for any typos
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                  Use the search function to find what you're looking for
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                  Browse our categories to discover new content
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                  Return to the homepage and start fresh
                </li>
              </ul>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button
              asChild
              className="flex items-center gap-2 hover:scale-105 transition-transform"
            >
              <Link href="/">
                <Home className="w-4 h-4" />
                Go home
              </Link>
            </Button>

            <Button
              variant="outline"
              asChild
              className="flex items-center gap-2 hover:scale-105 transition-transform"
            >
              <Link href="/categories">
                <Search className="w-4 h-4" />
                Browse categories
              </Link>
            </Button>

            <Button
              variant="ghost"
              onClick={() => window.history.back()}
              className="flex items-center gap-2 hover:scale-105 transition-transform"
            >
              <ArrowLeft className="w-4 h-4" />
              Go back
            </Button>
          </div>

          {/* Popular Links */}
          <div className="pt-6 border-t border-border/50">
            <p className="text-sm text-muted-foreground mb-3">
              Popular destinations:
            </p>
            <div className="flex flex-wrap gap-2 justify-center">
              <Link
                href="/feed"
                className="text-xs bg-muted/50 hover:bg-muted px-3 py-1 rounded-full text-muted-foreground hover:text-foreground transition-colors"
              >
                Latest Posts
              </Link>
              <Link
                href="/categories/react"
                className="text-xs bg-muted/50 hover:bg-muted px-3 py-1 rounded-full text-muted-foreground hover:text-foreground transition-colors"
              >
                React Articles
              </Link>
              <Link
                href="/categories/javascript"
                className="text-xs bg-muted/50 hover:bg-muted px-3 py-1 rounded-full text-muted-foreground hover:text-foreground transition-colors"
              >
                JavaScript Guides
              </Link>
              <Link
                href="/contact"
                className="text-xs bg-muted/50 hover:bg-muted px-3 py-1 rounded-full text-muted-foreground hover:text-foreground transition-colors"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
