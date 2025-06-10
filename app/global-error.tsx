"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { AlertTriangle, RefreshCw, Home } from "lucide-react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error("Global error:", error);
  }, [error]);

  return (
    <html>
      <body>
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center p-4">
          <div className="w-full max-w-lg bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl border border-white/50 p-8 text-center space-y-6">
            {/* Error Icon */}
            <div className="mx-auto w-20 h-20 bg-red-100 rounded-full flex items-center justify-center">
              <AlertTriangle className="w-10 h-10 text-red-600" />
            </div>

            {/* Error Message */}
            <div className="space-y-3">
              <h1 className="text-3xl font-bold text-slate-900">
                Critical Error!
              </h1>
              <p className="text-slate-600 text-lg">
                We encountered a critical system error. Please try refreshing
                the page or return to the homepage.
              </p>
            </div>

            {/* Error Details (Development only) */}
            {process.env.NODE_ENV === "development" && error.message && (
              <div className="bg-slate-100 rounded-xl p-4 text-left border border-slate-200">
                <div className="text-sm font-medium text-slate-700 mb-2 flex items-center gap-2">
                  <div className="w-2 h-2 bg-red-500 rounded-full" />
                  Error Details (Development Mode):
                </div>
                <code className="text-xs text-red-700 font-mono break-all block bg-red-50 p-2 rounded border">
                  {error.message}
                </code>
                {error.digest && (
                  <p className="text-xs text-slate-500 mt-2">
                    Error ID: {error.digest}
                  </p>
                )}
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button
                onClick={reset}
                className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-medium transition-all duration-200 hover:scale-105"
              >
                <RefreshCw className="w-4 h-4" />
                Try again
              </Button>

              <Button
                variant="outline"
                className="flex items-center justify-center gap-2 border-slate-300 text-slate-700 hover:bg-slate-50 px-6 py-3 rounded-xl font-medium transition-all duration-200 hover:scale-105"
                onClick={() => (window.location.href = "/")}
              >
                <Home className="w-4 h-4" />
                Go home
              </Button>
            </div>

            {/* Fallback Info */}
            <div className="pt-4 border-t border-slate-200">
              <p className="text-sm text-slate-500">
                If this problem persists, please{" "}
                <a
                  href="/contact"
                  className="text-blue-600 hover:text-blue-500 font-medium underline underline-offset-2"
                >
                  contact our support team
                </a>
              </p>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
