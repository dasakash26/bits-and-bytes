import React from "react";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

interface ExcerptSectionProps {
  value: string;
  onChange: (value: string) => void;
}

export const ExcerptSection = ({ value, onChange }: ExcerptSectionProps) => {
  return (
    <div className="space-y-2">
      <Label htmlFor="excerpt" className="text-sm font-medium">
        Excerpt (Optional)
      </Label>
      <Textarea
        id="excerpt"
        placeholder="Brief description of your article..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="min-h-[60px] resize-none border-2 focus:border-primary"
      />
    </div>
  );
};
