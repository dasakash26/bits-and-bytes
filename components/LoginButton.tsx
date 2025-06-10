"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import { LogIn, LogOut, User, ChevronDown } from "lucide-react";
import { useState } from "react";

export default function LoginButton() {
  const { data: session, status } = useSession();
  const [showDropdown, setShowDropdown] = useState(false);
  const [imageError, setImageError] = useState(false);

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

  if (status === "loading") {
    return <div className="w-8 h-8 rounded-full bg-muted animate-pulse"></div>;
  }

  return session ? (
    <div className="relative">
      <button
        onClick={() => setShowDropdown(!showDropdown)}
        className="flex items-center gap-2 hover:bg-muted/50 rounded-full p-1 pr-3 transition-all duration-200 group"
      >
        {/* Avatar */}
        <div className="relative">
          {session.user?.image && !imageError ? (
            <img
              src={session.user.image}
              alt={session.user.name || "User"}
              className="w-8 h-8 rounded-full object-cover border-2 border-border group-hover:border-primary/50 transition-colors"
              onError={() => setImageError(true)}
              onLoad={() => setImageError(false)}
            />
          ) : (
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold border-2 border-border group-hover:border-primary/50 transition-colors ${
                session.user?.name
                  ? getAvatarColor(session.user.name)
                  : "bg-gray-500"
              }`}
            >
              {session.user?.name
                ? getInitials(session.user.name)
                : session.user?.email?.[0]?.toUpperCase() || "U"}
            </div>
          )}
        </div>

        {/* Name (hidden on mobile) */}
        <span className="hidden sm:block text-sm font-medium text-foreground">
          {session.user?.name?.split(" ")[0] ||
            session.user?.email?.split("@")[0]}
        </span>

        {/* Dropdown arrow */}
        <ChevronDown className="w-3 h-3 text-muted-foreground group-hover:text-foreground transition-colors" />
      </button>

      {/* Dropdown menu */}
      {showDropdown && (
        <div className="absolute right-0 top-full mt-2 w-48 bg-background border border-border rounded-xl shadow-lg py-2 z-50">
          <div className="px-3 py-2 border-b border-border">
            <p className="text-sm font-medium text-foreground">
              {session.user?.name}
            </p>
            <p className="text-xs text-muted-foreground">
              {session.user?.email}
            </p>
          </div>
          <button
            onClick={() => {
              signOut();
              setShowDropdown(false);
            }}
            className="w-full flex items-center gap-2 px-3 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            Sign out
          </button>
        </div>
      )}

      {/* Backdrop to close dropdown */}
      {showDropdown && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setShowDropdown(false)}
        />
      )}
    </div>
  ) : (
    <button
      onClick={() => signIn("google")}
      className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-primary-foreground bg-primary hover:bg-primary/90 rounded-full transition-all duration-200 hover:scale-105 shadow-sm"
    >
      <LogIn className="w-4 h-4" />
      <span className="hidden sm:inline">Sign in</span>
    </button>
  );
}
