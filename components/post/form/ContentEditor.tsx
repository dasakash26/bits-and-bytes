import React from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Bold,
  Italic,
  Code,
  Link,
  List,
  Eye,
  Type,
  Quote,
  Image,
  Sparkles,
  PenTool,
} from "lucide-react";
import ReactMarkdown from "react-markdown";
import { useMarkdownHelpers } from "@/hooks/useMarkdownHelpers";

interface ContentEditorProps {
  content: string;
  onContentChange: (content: string) => void;
  isPreview: boolean;
  onPreviewToggle: () => void;
  onAIEnhance?: () => void;
  isEnhancing?: boolean;
}

export const ContentEditor = ({
  content,
  onContentChange,
  isPreview,
  onPreviewToggle,
}: ContentEditorProps) => {
  const { insertMarkdown } = useMarkdownHelpers(content, onContentChange);

  const toolbarButtons = [
    { icon: Bold, action: "bold", tooltip: "Bold text" },
    { icon: Italic, action: "italic", tooltip: "Italic text" },
    { icon: Code, action: "code", tooltip: "Inline code" },
    { icon: Link, action: "link", tooltip: "Insert link" },
    { icon: List, action: "list", tooltip: "Bullet list" },
    { icon: Quote, action: "quote", tooltip: "Quote block" },
    { icon: Type, action: "heading", tooltip: "Heading" },
  ];

  return (
    <div className="space-y-4">
      {/* Enhanced Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Label className="text-xl font-bold">Your Story</Label>
          <Badge
            variant="outline"
            className="text-xs font-medium bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900 dark:to-purple-900"
          >
            <Sparkles className="w-3 h-3 mr-1" />
            Focus on content - AI handles the rest
          </Badge>
        </div>
        <Button
          type="button"
          variant={isPreview ? "default" : "outline"}
          size="sm"
          onClick={onPreviewToggle}
          className="flex items-center gap-2 font-medium transition-all duration-200 hover:scale-105"
        >
          <Eye className="w-3 h-3" />
          {isPreview ? "Edit Mode" : "Preview Mode"}
        </Button>
      </div>

      {/* Enhanced Content Area */}
      <div className="border-2 border-border/50 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 bg-gradient-to-br from-background to-muted/10">
        <div className="bg-gradient-to-r from-primary/5 to-purple/5 px-6 py-3 border-b border-border/50">
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
              {isPreview ? "✨ Preview" : "✍️ Write"}
            </span>
            <div className="flex items-center gap-4 text-xs text-muted-foreground">
              <span>{content.length} characters</span>
              <span>
                {content.split(/\s+/).filter((word) => word.length > 0).length}{" "}
                words
              </span>
              <div className="flex items-center gap-1">
                <div
                  className={`w-2 h-2 rounded-full ${
                    content.length > 100 ? "bg-green-500" : "bg-yellow-500"
                  }`}
                />
                <span>
                  {content.length > 100 ? "Good length" : "Keep writing"}
                </span>
              </div>
            </div>
          </div>
        </div>

        {!isPreview ? (
          <Textarea
            id="content"
            placeholder="Start writing your article here...

Share your thoughts, experiences, and insights. Don't worry about the title, tags, or category - our AI will analyze your content and suggest everything automatically.

Just focus on telling your story! ✨"
            value={content}
            onChange={(e) => onContentChange(e.target.value)}
            className="min-h-[500px] resize-none border-0 focus-visible:ring-0 text-base leading-relaxed p-8 bg-transparent placeholder:text-muted-foreground/60"
          />
        ) : (
          <div className="p-8 min-h-[500px] overflow-y-auto">
            {content ? (
              <div className="prose prose-sm max-w-none dark:prose-invert">
                <ReactMarkdown
                  components={{
                    h1: ({ children }) => (
                      <h1 className="text-3xl font-bold mt-8 mb-6 first:mt-0 text-foreground border-b border-border/30 pb-3">
                        {children}
                      </h1>
                    ),
                    h2: ({ children }) => (
                      <h2 className="text-2xl font-bold mt-7 mb-4 text-foreground">
                        {children}
                      </h2>
                    ),
                    h3: ({ children }) => (
                      <h3 className="text-xl font-semibold mt-6 mb-3 text-foreground">
                        {children}
                      </h3>
                    ),
                    p: ({ children }) => (
                      <p className="mb-4 leading-relaxed text-foreground/90">
                        {children}
                      </p>
                    ),
                    code: ({ children }) => (
                      <code className="bg-primary/10 text-primary px-2 py-1 rounded-md text-sm font-mono border">
                        {children}
                      </code>
                    ),
                    pre: ({ children }) => (
                      <pre className="bg-muted p-4 rounded-lg overflow-x-auto mb-6 border border-border/50 shadow-sm">
                        <code className="text-sm leading-relaxed">
                          {children}
                        </code>
                      </pre>
                    ),
                    ul: ({ children }) => (
                      <ul className="list-disc pl-6 mb-6 space-y-2">
                        {children}
                      </ul>
                    ),
                    ol: ({ children }) => (
                      <ol className="list-decimal pl-6 mb-6 space-y-2">
                        {children}
                      </ol>
                    ),
                    blockquote: ({ children }) => (
                      <blockquote className="border-l-4 border-primary bg-primary/5 pl-6 py-2 my-6 italic text-muted-foreground rounded-r-lg">
                        {children}
                      </blockquote>
                    ),
                    a: ({ children, href }) => (
                      <a
                        href={href}
                        className="text-primary hover:text-primary/80 underline underline-offset-2 transition-colors"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {children}
                      </a>
                    ),
                    strong: ({ children }) => (
                      <strong className="font-bold text-foreground">
                        {children}
                      </strong>
                    ),
                    em: ({ children }) => (
                      <em className="italic text-foreground/80">{children}</em>
                    ),
                  }}
                >
                  {content}
                </ReactMarkdown>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-center py-16">
                <div className="w-20 h-20 bg-gradient-to-br from-primary/20 to-purple/20 rounded-full flex items-center justify-center mb-6">
                  <PenTool className="w-10 h-10 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-muted-foreground mb-3">
                  Ready to share your story?
                </h3>
                <p className="text-sm text-muted-foreground max-w-md">
                  Switch to edit mode and start writing. Our AI will help with
                  everything else!
                </p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Simplified Help Text */}
      <div className="text-center">
        <p className="text-sm text-muted-foreground">
          Just write naturally - AI will handle title, excerpt, tags, and
          category for you ✨
        </p>
      </div>
    </div>
  );
};
