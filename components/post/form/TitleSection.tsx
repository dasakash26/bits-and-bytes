import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface TitleSectionProps {
  value: string;
  onChange: (value: string) => void;
}

export const TitleSection = ({ value, onChange }: TitleSectionProps) => {
  return (
    <div className="space-y-2">
      <Label htmlFor="title" className="text-base font-medium">
        Article Title
      </Label>
      <Input
        id="title"
        placeholder="Enter your article title..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="text-lg font-semibold border-2 focus:border-primary h-12"
      />
    </div>
  );
};
