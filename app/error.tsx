"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { AlertTriangle, RefreshCw, Home, Bug } from "lucide-react";
import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-accent/10 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl bg-card/80 backdrop-blur-sm border-border shadow-xl">
        <CardContent className="p-8 text-center space-y-6">
          {/* Error Icon */}
          <div className="mx-auto w-20 h-20 bg-destructive/10 rounded-full flex items-center justify-center">
            <AlertTriangle className="w-10 h-10 text-destructive" />
          </div>

          {/* Error Message */}
          <div className="space-y-3">
            <h1 className="text-3xl font-bold text-foreground">
              Oops! Something went wrong
            </h1>
            <p className="text-muted-foreground text-lg">
              We encountered an unexpected error while processing your request.
              Don't worry, our team has been notified and we're working to fix
              it.
            </p>
          </div>

          {/* Error Details (Development only) */}
          {process.env.NODE_ENV === "development" && error.message && (
            <Card className="bg-muted/50 border-border/50">
              <CardContent className="p-4 text-left">
                <div className="flex items-center gap-2 mb-2">
                  <Bug className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm font-medium text-muted-foreground">
                    Error Details (Development Mode)
                  </span>
                </div>
                <code className="text-sm text-destructive font-mono break-all">
                  {error.message}
                </code>
                {error.digest && (
                  <p className="text-xs text-muted-foreground mt-2">
                    Error ID: {error.digest}
                  </p>
                )}
              </CardContent>
            </Card>
          )}

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button
              onClick={reset}
              className="flex items-center gap-2 hover:scale-105 transition-transform"
            >
              <RefreshCw className="w-4 h-4" />
              Try again
            </Button>

            <Button
              variant="outline"
              asChild
              className="flex items-center gap-2 hover:scale-105 transition-transform"
            >
              <Link href="/">
                <Home className="w-4 h-4" />
                Go home
              </Link>
            </Button>
          </div>

          {/* Additional Help */}
          <div className="pt-6 border-t border-border/50">
            <p className="text-sm text-muted-foreground">
              If this problem persists, please{" "}
              <Link
                href="/contact"
                className="text-primary hover:text-primary/80 font-medium underline underline-offset-4"
              >
                contact our support team
              </Link>
              .
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
