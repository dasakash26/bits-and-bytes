"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import {
  LogIn,
  LogOut,
  User,
  ChevronDown,
  Mail,
  Send,
  Loader2,
  X,
} from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function LoginButton() {
  const { data: session, status } = useSession();
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Function to get user initials
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  // Function to generate a consistent color based on name
  const getAvatarColor = (name: string) => {
    const colors = [
      "bg-red-500",
      "bg-blue-500",
      "bg-green-500",
      "bg-yellow-500",
      "bg-purple-500",
      "bg-pink-500",
      "bg-indigo-500",
      "bg-teal-500",
    ];
    const index = name.charCodeAt(0) % colors.length;
    return colors[index];
  };

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await signIn("nodemailer", {
        email,
        callbackUrl: "/",
        redirect: false,
      });
      setIsSuccess(true);
      setTimeout(() => {
        setShowEmailModal(false);
        setEmail("");
        setIsSuccess(false);
      }, 2000);
    } catch (error) {
      console.error("Email sign in error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEmailModalClose = () => {
    setShowEmailModal(false);
    setEmail("");
    setIsSuccess(false);
    setIsLoading(false);
  };

  if (status === "loading") {
    return <div className="w-8 h-8 rounded-full bg-muted animate-pulse"></div>;
  }

  return session ? (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          <Avatar className="h-8 w-8">
            <AvatarImage
              src={session.user?.image || ""}
              alt={session.user?.name || ""}
            />
            <AvatarFallback>
              {session.user?.name
                ? getInitials(session.user.name)
                : session.user?.email?.[0]?.toUpperCase() || "U"}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">
              {session.user?.name}
            </p>
            <p className="text-xs leading-none text-muted-foreground">
              {session.user?.email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => signOut()}>
          <LogOut className="mr-2 h-4 w-4" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  ) : (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button className="rounded-full">
            <LogIn className="mr-2 h-4 w-4" />
            <span className="hidden sm:inline">Sign in</span>
            <ChevronDown className="ml-2 h-3 w-3" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" align="end">
          <DropdownMenuItem onClick={() => signIn("google")}>
            <LogIn className="mr-2 h-4 w-4" />
            <span>Continue with Google</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setShowEmailModal(true)}>
            <Mail className="mr-2 h-4 w-4" />
            <span>Continue with Email</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <Dialog open={showEmailModal} onOpenChange={setShowEmailModal}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Mail className="h-5 w-5 text-primary" />
              </div>
              <div>
                <DialogTitle>Sign in with Email</DialogTitle>
                <DialogDescription>
                  We'll send you a magic link to sign in
                </DialogDescription>
              </div>
            </div>
          </DialogHeader>

          {isSuccess ? (
            <div className="flex flex-col items-center text-center py-6">
              <div className="h-16 w-16 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center mb-4">
                <Send className="h-8 w-8 text-green-600 dark:text-green-400" />
              </div>
              <h3 className="text-lg font-medium mb-2">Check your email!</h3>
              <p className="text-sm text-muted-foreground">
                We've sent a magic link to {email}
              </p>
            </div>
          ) : (
            <form onSubmit={handleEmailSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email address</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={isLoading}
                  required
                />
              </div>

              <Button
                type="submit"
                className="w-full"
                disabled={isLoading || !email}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Sending magic link...
                  </>
                ) : (
                  <>
                    <Send className="mr-2 h-4 w-4" />
                    Send magic link
                  </>
                )}
              </Button>

              <p className="text-xs text-muted-foreground text-center">
                By continuing, you agree to our Terms of Service and Privacy
                Policy.
              </p>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
