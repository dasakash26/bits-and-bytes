import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Hash, X } from "lucide-react";
import { useCategories } from "../../../hooks/useCategories";

interface CategoryTagsSectionProps {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  tags: string[];
  newTag: string;
  onNewTagChange: (tag: string) => void;
  onAddTag: () => void;
  onRemoveTag: (tag: string) => void;
}

export const CategoryTagsSection = ({
  selectedCategory,
  onCategoryChange,
  tags,
  newTag,
  onNewTagChange,
  onAddTag,
  onRemoveTag,
}: CategoryTagsSectionProps) => {
  const { categories, isLoading } = useCategories();

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="category" className="text-sm font-medium">
            Category
          </Label>
          <Select
            value={selectedCategory}
            onValueChange={onCategoryChange}
            disabled={isLoading}
          >
            <SelectTrigger>
              <SelectValue
                placeholder={
                  isLoading
                    ? "Loading categories..."
                    : categories.length > 0
                    ? "Select category"
                    : "No categories available"
                }
              />
            </SelectTrigger>
            <SelectContent>
              {categories.length > 0 ? (
                categories.map((category) => (
                  <SelectItem key={category.id} value={category.id}>
                    {category.name}
                  </SelectItem>
                ))
              ) : (
                <SelectItem value="general" disabled>
                  No categories available
                </SelectItem>
              )}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label className="text-sm font-medium">Tags</Label>
          <div className="flex gap-2">
            <Input
              placeholder="Add tag..."
              value={newTag}
              onChange={(e) => onNewTagChange(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  onAddTag();
                }
              }}
              className="flex-1"
            />
            <Button
              type="button"
              onClick={onAddTag}
              size="sm"
              variant="outline"
              disabled={!newTag.trim()}
            >
              <Hash className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      {tags.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {tags.map((tag, index) => (
            <Badge
              key={index}
              variant="secondary"
              className="flex items-center gap-1 px-3 py-1"
            >
              #{tag}
              <X
                className="w-3 h-3 cursor-pointer hover:text-destructive"
                onClick={() => onRemoveTag(tag)}
              />
            </Badge>
          ))}
        </div>
      )}
    </>
  );
};
