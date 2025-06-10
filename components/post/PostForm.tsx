import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sparkles,
  Loader2,
  Brain,
  Wand2,
  CheckCircle,
  Upload,
  X,
  Image,
} from "lucide-react";
import { AuthorSection } from "./form/AuthorSection";
import { ContentEditor } from "./form/ContentEditor";
import { usePostForm } from "@/hooks/usePostForm";
import { generatePostSuggestions } from "@/lib/gemini";

// Define the props for the PostForm component
interface PostFormProps {
  onClose: () => void;
}

export const PostForm = ({ onClose }: PostFormProps) => {
  const {
    postContent,
    setPostContent,
    postTitle,
    setPostTitle,
    postExcerpt,
    setPostExcerpt,
    selectedCategory,
    setSelectedCategory,
    tags,
    addTag,
    removeTag,
    handlePublish,
  } = usePostForm();

  const [isPreview, setIsPreview] = useState(false);
  const [isInferring, setIsInferring] = useState(false);
  const [hasInferred, setHasInferred] = useState(false);
  const [coverImage, setCoverImage] = useState<string | null>(null);
  const [isUploadingImage, setIsUploadingImage] = useState(false);

  const handleImageUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith("image/")) {
      alert("Please select an image file");
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert("Image size should be less than 5MB");
      return;
    }

    setIsUploadingImage(true);
    try {
      // Convert to base64 for preview (in a real app, you'd upload to a service)
      const reader = new FileReader();
      reader.onload = (e) => {
        setCoverImage(e.target?.result as string);
        setIsUploadingImage(false);
      };
      reader.readAsDataURL(file);
    } catch (error) {
      console.error("Error uploading image:", error);
      setIsUploadingImage(false);
    }
  };

  const removeCoverImage = () => {
    setCoverImage(null);
  };

  const handleAIInference = async () => {
    if (!postContent.trim()) return;

    setIsInferring(true);
    try {
      // Call Gemini API
      const suggestions = await generatePostSuggestions(postContent);
      console.log("AI Suggestions:", suggestions);
      console.log("Suggested tags:", suggestions.tags);

      // Use AI-generated suggestions, but don't override existing values
      if (suggestions.title && !postTitle.trim()) {
        setPostTitle(suggestions.title);
      }

      if (suggestions.excerpt && !postExcerpt.trim()) {
        setPostExcerpt(suggestions.excerpt);
      }

      if (suggestions.category && !selectedCategory) {
        setSelectedCategory(suggestions.category);
      }

      suggestions.tags.forEach((tag, index) => {
        console.log(`Adding tag ${index}:`, tag);
        addTag(tag);
      });

      setHasInferred(true);
    } catch (error) {
      console.error("AI inference failed:", error);
    } finally {
      setIsInferring(false);
    }
  };

  const handleFormSubmit = () => {
    handlePublish();
    onClose();
  };

  return (
    <div className="flex-1 overflow-y-auto space-y-6 mt-6">
      <AuthorSection />
      <Separator />

      {/* Content Editor - Primary Focus */}
      <ContentEditor
        content={postContent}
        onContentChange={setPostContent}
        isPreview={isPreview}
        onPreviewToggle={() => setIsPreview(!isPreview)}
      />

      {/* AI Inference Section */}
      <Card className="border-2 border-primary/20 bg-primary/5 dark:bg-primary/10">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center space-x-2 text-lg">
            <Brain className="w-5 h-5 text-primary" />
            <span>AI Content Analysis</span>
            {hasInferred && <CheckCircle className="w-4 h-4 text-green-500" />}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {!hasInferred ? (
            <div className="text-center">
              <p className="text-sm text-muted-foreground mb-4">
                Let AI analyze your content and automatically generate title,
                excerpt, category, and tags
              </p>
              <Button
                onClick={handleAIInference}
                disabled={isInferring || !postContent.trim()}
                className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg hover:shadow-xl transition-all duration-300"
              >
                {isInferring ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    AI is analyzing...
                  </>
                ) : (
                  <>
                    <Wand2 className="w-4 h-4 mr-2" />
                    Generate with AI
                  </>
                )}
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                  Generated Title
                </label>
                <Input
                  value={postTitle}
                  onChange={(e) => setPostTitle(e.target.value)}
                  placeholder="Enter post title..."
                  className="font-semibold text-sm"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                  Generated Category
                </label>
                <Select
                  value={selectedCategory}
                  onValueChange={setSelectedCategory}
                >
                  <SelectTrigger className="font-semibold text-sm">
                    <SelectValue placeholder="Select category..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="programming">Programming</SelectItem>
                    <SelectItem value="tutorial">Tutorial</SelectItem>
                    <SelectItem value="web-development">
                      Web Development
                    </SelectItem>
                    <SelectItem value="technology">Technology</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2 md:col-span-2">
                <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                  Generated Excerpt
                </label>
                <Textarea
                  value={postExcerpt}
                  onChange={(e) => setPostExcerpt(e.target.value)}
                  placeholder="Enter post excerpt..."
                  className="text-sm min-h-[80px]"
                />
              </div>
              <div className="space-y-2 md:col-span-2">
                <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                  Generated Tags ({tags.length})
                </label>
                <div className="flex flex-wrap gap-2 min-h-[2rem] p-2 border rounded-md">
                  {tags.length > 0 ? (
                    tags.map((tag, index) => (
                      <Badge
                        key={index}
                        className="cursor-pointer"
                        onClick={() => removeTag(tag)}
                      >
                        {tag}
                      </Badge>
                    ))
                  ) : (
                    <p className="text-sm text-muted-foreground italic">
                      No tags generated yet
                    </p>
                  )}
                </div>
                <div className="mt-2">
                  <Input
                    placeholder="Add custom tag and press Enter..."
                    className="text-sm"
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        const value = e.currentTarget.value.trim();
                        if (value && !tags.includes(value)) {
                          addTag(value);
                          e.currentTarget.value = "";
                        }
                      }
                    }}
                  />
                </div>
              </div>
              <div className="md:col-span-2 flex justify-center">
                <Button
                  onClick={() => {
                    setHasInferred(false);
                    setPostTitle("");
                    setPostExcerpt("");
                    setSelectedCategory("");
                    tags.forEach((tag) => removeTag(tag));
                  }}
                  variant="outline"
                  size="sm"
                  className="text-xs"
                >
                  <Sparkles className="w-3 h-3 mr-1" />
                  Regenerate
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Cover Image Upload Section - Moved to end and made optional */}
      <Card>
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center space-x-2 text-lg">
            <Image className="w-5 h-5 text-muted-foreground" />
            <span className="text-muted-foreground">
              Cover Image (Optional)
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {!coverImage ? (
            <div className="border-2 border-dashed border-muted-foreground/20 rounded-lg p-6 text-center hover:border-muted-foreground/30 transition-colors">
              <div className="flex flex-col items-center space-y-3">
                <Upload className="w-8 h-8 text-muted-foreground/40" />
                <div>
                  <p className="text-sm text-muted-foreground mb-1">
                    Add a cover image to make your post stand out
                  </p>
                  <p className="text-xs text-muted-foreground/60">
                    PNG, JPG, GIF up to 5MB
                  </p>
                </div>
                <label htmlFor="cover-image-upload">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    disabled={isUploadingImage}
                    className="cursor-pointer"
                    asChild
                  >
                    <span>
                      {isUploadingImage ? (
                        <>
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                          Uploading...
                        </>
                      ) : (
                        <>
                          <Upload className="w-4 h-4 mr-2" />
                          Choose Image
                        </>
                      )}
                    </span>
                  </Button>
                </label>
                <input
                  id="cover-image-upload"
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </div>
            </div>
          ) : (
            <div className="relative">
              <img
                src={coverImage}
                alt="Cover preview"
                className="w-full h-40 object-cover rounded-lg border"
              />
              <Button
                type="button"
                variant="destructive"
                size="sm"
                onClick={removeCoverImage}
                className="absolute top-2 right-2"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="flex justify-between items-center pt-6 border-t">
        <Button variant="outline" onClick={onClose}>
          Cancel
        </Button>
        <div className="flex gap-3">
          <Button
            variant="outline"
            disabled={!postContent.trim()}
            className="px-6"
          >
            Save Draft
          </Button>
          <Button
            onClick={handleFormSubmit}
            disabled={!postContent.trim()}
            className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary text-white px-8 shadow-lg hover:shadow-xl transition-all duration-300"
          >
            {hasInferred ? "Publish Article" : "Publish (Basic)"}
          </Button>
        </div>
      </div>
    </div>
  );
};
