"use client";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { Mail, X, Send, Loader2 } from "lucide-react";

export default function EmailSignIn() {
  const [email, setEmail] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const res= await signIn("nodemailer", {
        email,
        callbackUrl: "/",
        redirect: false,
      });
      console.log("Sign in response:", res);
      setIsSuccess(true);
      setTimeout(() => {
        setIsOpen(false);
        setEmail("");
        setIsSuccess(false);
      }, 2000);
    } catch (error) {
      console.error("Email sign in error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    setIsOpen(false);
    setEmail("");
    setIsSuccess(false);
    setIsLoading(false);
  };

  return (
    <>
      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="inline-flex items-center gap-2 px-3 py-2 text-sm font-medium text-muted-foreground bg-muted/50 hover:bg-muted/70 border border-border/50 hover:border-border rounded-2xl transition-all duration-300 hover:scale-105 hover:text-foreground group"
        aria-label="Sign in with email"
      >
        <Mail className="w-4 h-4 group-hover:text-primary transition-colors" />
        <span className="hidden sm:inline">Email</span>
      </button>

      {/* Modal Backdrop */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={handleClose}
          />

          {/* Modal Content */}
          <div className="relative w-full max-w-md bg-background border border-border rounded-3xl shadow-2xl p-6 animate-in fade-in-0 zoom-in-95 duration-300">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary/10 rounded-2xl">
                  <Mail className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-foreground">
                    Sign in with Email
                  </h2>
                  <p className="text-sm text-muted-foreground">
                    We'll send you a magic link
                  </p>
                </div>
              </div>
              <button
                onClick={handleClose}
                className="p-2 hover:bg-muted/50 rounded-xl transition-colors group"
              >
                <X className="w-4 h-4 text-muted-foreground group-hover:text-foreground" />
              </button>
            </div>

            {/* Success State */}
            {isSuccess ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Send className="w-8 h-8 text-green-600 dark:text-green-400" />
                </div>
                <h3 className="text-lg font-medium text-foreground mb-2">
                  Check your email!
                </h3>
                <p className="text-sm text-muted-foreground">
                  We've sent a magic link to {email}
                </p>
              </div>
            ) : (
              /* Form */
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <label
                    htmlFor="email"
                    className="text-sm font-medium text-foreground"
                  >
                    Email address
                  </label>
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="w-full px-4 py-3 bg-muted/50 border border-border rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors text-foreground placeholder:text-muted-foreground"
                    required
                    disabled={isLoading}
                  />
                </div>

                <button
                  type="submit"
                  disabled={isLoading || !email}
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-primary hover:bg-primary/90 disabled:bg-muted disabled:text-muted-foreground text-primary-foreground font-medium rounded-2xl transition-all duration-200 hover:scale-[1.02] disabled:hover:scale-100 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Sending magic link...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      Send magic link
                    </>
                  )}
                </button>

                <p className="text-xs text-muted-foreground text-center">
                  By continuing, you agree to our Terms of Service and Privacy
                  Policy.
                </p>
              </form>
            )}
          </div>
        </div>
      )}
    </>
  );
}
