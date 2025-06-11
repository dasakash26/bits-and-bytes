"use client";
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Brain, Sparkles } from "lucide-react";
import { PostForm } from "./PostForm";

interface PostDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  children: React.ReactNode;
}

export const PostDialog = ({
  isOpen,
  onOpenChange,
  children,
}: PostDialogProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
        <DialogHeader className="pb-4">
          <div className="flex items-center gap-2 mb-2">
            <Brain className="w-4 h-4 text-primary" />
            <span className="text-xs font-medium text-primary uppercase tracking-wide">
              AI Assistant
            </span>
          </div>
          <DialogTitle className="text-xl font-bold">
            Write Your Article
          </DialogTitle>
          <DialogDescription className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-muted-foreground" />
            Focus on writing — AI will handle title, tags, and formatting
          </DialogDescription>
        </DialogHeader>
        <PostForm onClose={() => onOpenChange(false)} />
      </DialogContent>
    </Dialog>
  );
};
