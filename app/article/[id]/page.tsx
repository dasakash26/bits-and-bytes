import React from "react";
import { notFound } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import ReactMarkdown from "react-markdown";
import { AuthorInfo } from "@/components/AuthorInfo";
import { CommentSection } from "@/components/CommentSection";
import { mockComments } from "@/data/mockComments";
import posts from "@/data/posts";
import { ArticleHeader } from "@/components/article/ArticleHeader";
import { ArticleActions } from "@/components/article/ArticleActions";

interface ArticlePageProps {
  params: { id: string };
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const postId = parseInt(params.id);
  const post = posts.find((p) => p.id === postId);

  if (!post) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-background">
      <ArticleHeader />

      {/* Article Content */}
      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <article className="space-y-8">
          {/* Article Header */}
          <header className="space-y-6">
            <AuthorInfo post={post} showMoreButton={false} />

            <h1 className="text-4xl font-bold leading-tight">{post.title}</h1>

            <div className="flex items-center gap-4 text-muted-foreground">
              <span>Published {post.date}</span>
              <span>•</span>
              <span>{post.readTime}</span>
            </div>

            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag, index) => (
                <Badge key={`${tag}-${index}`} variant="secondary">
                  #{tag}
                </Badge>
              ))}
            </div>
          </header>

          {/* Featured Image */}
          {post.image && (
            <div className="w-full">
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-96 object-cover rounded-lg border"
                loading="lazy"
              />
            </div>
          )}

          {/* Article Content */}
          <div className="prose prose-lg max-w-none dark:prose-invert">
            <ReactMarkdown
              components={{
                h1: ({ children }) => (
                  <h1 className="text-3xl font-bold mt-8 mb-4 first:mt-0">
                    {children}
                  </h1>
                ),
                h2: ({ children }) => (
                  <h2 className="text-2xl font-bold mt-6 mb-3">{children}</h2>
                ),
                h3: ({ children }) => (
                  <h3 className="text-xl font-semibold mt-5 mb-2">
                    {children}
                  </h3>
                ),
                p: ({ children }) => (
                  <p className="mb-4 leading-relaxed text-foreground">
                    {children}
                  </p>
                ),
                code: ({ children }) => (
                  <code className="bg-muted px-2 py-1 rounded text-sm font-mono">
                    {children}
                  </code>
                ),
                pre: ({ children }) => (
                  <pre className="bg-muted p-4 rounded-lg overflow-x-auto mb-4 border">
                    {children}
                  </pre>
                ),
                ul: ({ children }) => (
                  <ul className="list-disc pl-6 mb-4 space-y-2">{children}</ul>
                ),
                ol: ({ children }) => (
                  <ol className="list-decimal pl-6 mb-4 space-y-2">
                    {children}
                  </ol>
                ),
                blockquote: ({ children }) => (
                  <blockquote className="border-l-4 border-primary pl-4 italic my-4 text-muted-foreground">
                    {children}
                  </blockquote>
                ),
              }}
            >
              {post.content}
            </ReactMarkdown>
          </div>

          {/* Article Actions */}
          <ArticleActions post={post} />

          {/* Comments Section */}
          <div className="border-t pt-8">
            <CommentSection comments={mockComments} />
          </div>
        </article>
      </main>
    </div>
  );
}
