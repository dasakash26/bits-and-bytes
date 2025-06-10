"use client";
import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Pencil, Sparkles } from "lucide-react";
import { PostDialog } from "./PostDialog";

export const NewPostInput = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Card className="mb-4 border border-border shadow-none bg-background p-2">
      <CardContent className="p-0">
        <PostDialog isOpen={isOpen} onOpenChange={setIsOpen}>
          <div className="w-full p-3 rounded-lg hover:shadow-sm bg-muted/30 hover:bg-muted/50 cursor-text transition-all duration-200 flex items-center justify-between group">
            <div className="flex-1">
              <p className="text-muted-foreground text-sm">
                Share your knowledge with the community
              </p>
              <span className="text-xs text-muted-foreground/60 mt-0.5 flex items-center gap-1">
                <Sparkles className="w-3 h-3" />
                Gemini AI assist available
              </span>
            </div>
            <Pencil className="w-5 h-5 text-muted-foreground/40 group-hover:text-muted-foreground/70 transition-colors" />
          </div>
        </PostDialog>
      </CardContent>
    </Card>
  );
};
