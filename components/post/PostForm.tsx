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
  X,
  Image,
  Link2,
  Clock,
  AlertTriangle,
  Star,
} from "lucide-react";
import { AuthorSection } from "./form/AuthorSection";
import { ContentEditor } from "./form/ContentEditor";
import { usePostForm } from "@/hooks/usePostForm";
import { generatePostSuggestions } from "@/lib/gemini";
import { submitBlogAction } from "@/app/actions/submitBlog";
import { toast } from "sonner";

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
  const [coverImageUrl, setCoverImageUrl] = useState<string>("");

  // Additional required fields for schema compliance
  const [slug, setSlug] = useState("");
  const [readTime, setReadTime] = useState("");

  // Add quality assessment state
  const [qualityScore, setQualityScore] = useState<number>(0);
  const [qualityFeedback, setQualityFeedback] = useState<string>("");
  const [isPublishable, setIsPublishable] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  // Auto-generate slug from title
  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)+/g, "");
  };

  // Auto-calculate read time based on content
  const calculateReadTime = (content: string) => {
    const wordsPerMinute = 200;
    const wordCount = content.trim().split(/\s+/).length;
    const minutes = Math.ceil(wordCount / wordsPerMinute);
    return `${minutes} min read`;
  };

  // Update slug when title changes
  React.useEffect(() => {
    if (postTitle) {
      setSlug(generateSlug(postTitle));
    }
  }, [postTitle]);

  // Update read time when content changes
  React.useEffect(() => {
    if (postContent) {
      setReadTime(calculateReadTime(postContent));
    }
  }, [postContent]);

  const handleAIInference = async () => {
    if (!postContent.trim()) return;

    setIsInferring(true);
    try {
      // Call Gemini API
      const suggestions = await generatePostSuggestions(postContent);
      console.log("AI Suggestions:", suggestions);

      // Use AI-generated suggestions
      if (suggestions.title && !postTitle.trim()) {
        setPostTitle(suggestions.title);
      }

      if (suggestions.excerpt && !postExcerpt.trim()) {
        setPostExcerpt(suggestions.excerpt);
      }

      if (suggestions.category && !selectedCategory) {
        setSelectedCategory(suggestions.category);
      }

      suggestions.tags.forEach((tag) => {
        addTag(tag);
      });

      // Set quality assessment
      setQualityScore(suggestions.qualityScore || 0);
      setQualityFeedback(suggestions.qualityFeedback || "");
      setIsPublishable(suggestions.isPublishable || false);

      setHasInferred(true);
    } catch (error) {
      console.error("AI inference failed:", error);
    } finally {
      setIsInferring(false);
    }
  };

  const getQualityColor = (score: number) => {
    if (score >= 8) return "text-green-600";
    if (score >= 6) return "text-blue-600";
    if (score >= 5) return "text-yellow-600";
    return "text-red-600";
  };

  const getQualityBadgeVariant = (score: number) => {
    if (score >= 8) return "default";
    if (score >= 6) return "secondary";
    if (score >= 5) return "outline";
    return "destructive";
  };

  const handleFormSubmit = async () => {
    if (isSubmitting) return;

    setIsSubmitting(true);

    try {
      // Validate required fields before submission
      const postData = {
        title: postTitle,
        slug,
        excerpt: postExcerpt,
        readTime,
        categoryId: selectedCategory,
        tags,
        image: coverImageUrl || undefined,
        content: postContent,
      };
      console.log("Submitting post data:", postData);
      const result = await submitBlogAction(postData);

      // Success - show toast notification with email confirmation status
      if (result.emailSent) {
        toast.success("🎉 Blog Post Published!", {
          description:
            "Your post is live and a confirmation email has been sent to your inbox.",
          duration: 5000,
        });
      } else {
        toast.success("🎉 Blog Post Published!", {
          description: "Your post is now live on Bits and Bytes!",
          duration: 4000,
        });
      }

      console.log("Blog post published successfully!");

      // Close the modal after successful submission
      onClose();
    } catch (error) {
      console.error("Failed to submit blog post:", error);

      // Show error toast with specific error message
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Failed to submit blog post. Please try again.";

      toast.error("❌ Publication Failed", {
        description: errorMessage,
        duration: 6000,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex-1 overflow-y-auto space-y-8 mt-6">
      <AuthorSection />
      <Separator />

      {/* Content Editor - Primary Focus */}
      <ContentEditor
        content={postContent}
        onContentChange={setPostContent}
        isPreview={isPreview}
        onPreviewToggle={() => setIsPreview(!isPreview)}
      />

      {/* AI Generation Section */}
      <Card className="border-primary/30 bg-gradient-to-br from-primary/5 to-purple-500/5">
        <CardHeader className="pb-6">
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                <Brain className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h3 className="text-lg font-semibold">AI Assistant</h3>
                <p className="text-sm text-muted-foreground">
                  Generate metadata and assess quality
                </p>
              </div>
            </div>
            {hasInferred && (
              <div className="flex items-center space-x-3">
                {/* Quality Score Badge */}
                <Badge
                  variant={getQualityBadgeVariant(qualityScore)}
                  className="flex items-center space-x-1"
                >
                  <Star className="w-3 h-3" />
                  <span>{qualityScore}/10</span>
                </Badge>
                <div className="flex items-center space-x-2 text-green-600">
                  <CheckCircle className="w-5 h-5" />
                  <span className="text-sm font-medium">Generated</span>
                </div>
              </div>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {!hasInferred ? (
            <div className="text-center py-8">
              <div className="mb-6">
                <div className="w-16 h-16 mx-auto rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <Wand2 className="w-8 h-8 text-primary" />
                </div>
                <h4 className="text-lg font-semibold mb-2">
                  Ready to Generate
                </h4>
                <p className="text-muted-foreground max-w-md mx-auto">
                  AI will analyze your content, assess its quality, and create
                  metadata automatically.
                </p>
              </div>
              <Button
                onClick={handleAIInference}
                disabled={isInferring || !postContent.trim() || isSubmitting}
                size="lg"
                className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg hover:shadow-xl transition-all duration-300"
              >
                {isInferring ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-3 animate-spin" />
                    Analyzing Content...
                  </>
                ) : (
                  <>
                    <Wand2 className="w-5 h-5 mr-3" />
                    Generate & Assess Quality
                  </>
                )}
              </Button>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Quality Assessment Section */}
              <div
                className={`p-4 rounded-lg border-2 ${
                  isPublishable
                    ? "bg-green-50 border-green-200 dark:bg-green-950/20 dark:border-green-800"
                    : "bg-red-50 border-red-200 dark:bg-red-950/20 dark:border-red-800"
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-2">
                    {isPublishable ? (
                      <CheckCircle className="w-5 h-5 text-green-600" />
                    ) : (
                      <AlertTriangle className="w-5 h-5 text-red-600" />
                    )}
                    <h4 className="font-semibold">
                      Content Quality Assessment
                    </h4>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span
                      className={`text-sm font-medium ${getQualityColor(
                        qualityScore
                      )}`}
                    >
                      Score: {qualityScore}/10
                    </span>
                    <Badge variant={getQualityBadgeVariant(qualityScore)}>
                      {isPublishable ? "Ready to Publish" : "Needs Improvement"}
                    </Badge>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground mb-3">
                  {qualityFeedback}
                </p>
                {!isPublishable && (
                  <div className="text-xs text-muted-foreground">
                    💡 Tip: Content with a score of 5 or higher can be
                    published. Consider adding more details, examples, or
                    improving structure.
                  </div>
                )}
              </div>

              {/* Title & Category Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">
                    Post Title
                  </label>
                  <Input
                    value={postTitle}
                    onChange={(e) => setPostTitle(e.target.value)}
                    placeholder="Enter post title..."
                    className="h-11"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">
                    Category
                  </label>
                  <Select
                    value={selectedCategory}
                    onValueChange={setSelectedCategory}
                  >
                    <SelectTrigger className="h-11">
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
              </div>

              {/* Excerpt */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">
                  Excerpt
                </label>
                <Textarea
                  value={postExcerpt}
                  onChange={(e) => setPostExcerpt(e.target.value)}
                  placeholder="Brief description of your post..."
                  className="min-h-[100px] resize-none"
                />
              </div>

              {/* Tags */}
              <div className="space-y-3">
                <label className="text-sm font-medium text-foreground">
                  Tags
                </label>
                {tags.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {tags.map((tag, index) => (
                      <Badge
                        key={index}
                        variant="secondary"
                        className="cursor-pointer hover:bg-destructive/20 hover:text-destructive transition-colors px-3 py-1"
                        onClick={() => removeTag(tag)}
                      >
                        {tag}
                        <X className="w-3 h-3 ml-2" />
                      </Badge>
                    ))}
                  </div>
                )}
                <Input
                  placeholder="Type a tag and press Enter..."
                  className="h-11"
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

              {/* URL Slug & Read Time */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground flex items-center space-x-2">
                    <Link2 className="w-4 h-4" />
                    <span>URL Slug</span>
                  </label>
                  <Input
                    value={slug}
                    onChange={(e) => setSlug(e.target.value)}
                    placeholder="post-url-slug"
                    className="font-mono h-11"
                  />
                  <p className="text-xs text-muted-foreground">
                    /posts/{slug || "your-slug-here"}
                  </p>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground flex items-center space-x-2">
                    <Clock className="w-4 h-4" />
                    <span>Read Time</span>
                  </label>
                  <Input
                    value={readTime}
                    placeholder="Auto-calculated"
                    className="h-11"
                    readOnly
                  />
                </div>
              </div>

              {/* Regenerate Button */}
              <div className="flex justify-center pt-4">
                <Button
                  onClick={() => {
                    setHasInferred(false);
                    setPostTitle("");
                    setPostExcerpt("");
                    setSelectedCategory("");
                    setSlug("");
                    setQualityScore(0);
                    setQualityFeedback("");
                    setIsPublishable(false);
                    tags.forEach((tag) => removeTag(tag));
                  }}
                  variant="outline"
                  className="flex items-center space-x-2"
                  disabled={isSubmitting}
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Regenerate</span>
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Cover Image Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-3">
            <Image className="w-5 h-5 text-muted-foreground" />
            <span>Cover Image</span>
            <Badge variant="secondary" className="text-xs">
              Optional
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">
                Image URL
              </label>
              <Input
                type="url"
                value={coverImageUrl}
                onChange={(e) => setCoverImageUrl(e.target.value)}
                placeholder="https://example.com/image.jpg"
                className="h-11"
              />
              <p className="text-xs text-muted-foreground">
                Enter a direct URL to an image (JPG, PNG, GIF, WebP)
              </p>
            </div>

            {coverImageUrl && (
              <div className="relative">
                <img
                  src={coverImageUrl}
                  alt="Cover preview"
                  className="w-full h-48 object-cover rounded-xl border"
                  onError={() => {
                    console.error("Failed to load image");
                  }}
                />
                <Button
                  type="button"
                  variant="destructive"
                  size="sm"
                  onClick={() => setCoverImageUrl("")}
                  className="absolute top-3 right-3"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="flex justify-between items-center pt-8 border-t">
        <Button
          variant="ghost"
          onClick={onClose}
          className="px-8"
          disabled={isSubmitting}
        >
          Cancel
        </Button>
        <div className="flex gap-4">
          <Button
            variant="outline"
            disabled={!postContent.trim() || isSubmitting}
            className="px-8"
          >
            Save Draft
          </Button>
          <Button
            onClick={handleFormSubmit}
            disabled={
              !postContent.trim() ||
              !hasInferred ||
              !postTitle.trim() ||
              !selectedCategory ||
              !isPublishable ||
              isSubmitting
            }
            className={`px-8 shadow-lg hover:shadow-xl transition-all duration-300 ${
              isPublishable && !isSubmitting
                ? "bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 text-white"
                : "bg-gradient-to-r from-gray-400 to-gray-300 text-gray-700 cursor-not-allowed"
            }`}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Publishing...
              </>
            ) : !hasInferred ? (
              "Generate Fields First"
            ) : !isPublishable ? (
              `Improve Quality (${qualityScore}/10)`
            ) : (
              "Publish Article"
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};
