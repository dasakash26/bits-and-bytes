"use client";

import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

interface BackButtonProps {
  className?: string;
}

export function BackButton({ className }: BackButtonProps) {
  const handleBack = () => {
    if (typeof window !== "undefined") {
      window.history.back();
    }
  };

  return (
    <Button
      variant="ghost"
      onClick={handleBack}
      className={className}
    >
      <ArrowLeft className="w-4 h-4" />
      Go back
    </Button>
  );
}
