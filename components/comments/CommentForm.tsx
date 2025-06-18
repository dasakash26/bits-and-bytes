"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

interface CommentFormProps {
  onSubmit: (content: string) => void;
  placeholder?: string;
  onCancel?: () => void;
  autoFocus?: boolean;
}

export const CommentForm = ({
  onSubmit,
  placeholder = "What are your thoughts?",
  onCancel,
  autoFocus = false,
}: CommentFormProps) => {
  const [content, setContent] = useState("");

  const handleSubmit = () => {
    if (content.trim()) {
      try {
        onSubmit(content.trim());
        setContent("");
      } catch (error) {
        console.error("Error submitting comment:", error);
      } finally {
      }
    }
  };

  return (
    <div className="space-y-3">
      <Textarea
        placeholder={placeholder}
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className={onCancel ? "min-h-[80px] text-sm" : "min-h-[100px]"}
        autoFocus={autoFocus}
      />
      <div className={`flex ${onCancel ? "gap-2" : "justify-end"}`}>
        <Button
          onClick={handleSubmit}
          disabled={!content.trim()}
          size={onCancel ? "sm" : "default"}
        >
          {onCancel ? "Reply" : "Comment"}
        </Button>
        {onCancel && (
          <Button variant="outline" size="sm" onClick={onCancel}>
            Cancel
          </Button>
        )}
      </div>
    </div>
  );
};
