import { notFound } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { AuthorInfo } from "@/components/AuthorInfo";
import { CommentSection } from "@/components/CommentSection";
import { prisma } from "@/lib/prisma";
import { BlogActions } from "@/components/blog/BlogActions";
import { BlogHeader } from "@/components/blog/BlogHeader";

export default async function BlogPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id: postId } = await params;
  const post = await prisma.blogPost.findUnique({
    where: { id: postId },
    include: {
      author: {
        include: {
          user: true,
        },
      },
      category: true,
      comments: {
        include: {
          author: true,
          replies: {
            include: {
              author: true,
            },
          },
        },
      },
    },
  });

  if (!post || !post.excerpt) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-background">
      <BlogHeader />

      {/* Article Content */}
      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <article className="space-y-8">
          {/* Article Header */}
          <header className="space-y-6">
            <AuthorInfo post={post as any} showMoreButton={false} />

            <h1 className="text-4xl font-bold leading-tight">{post.title}</h1>

            <div className="flex items-center gap-4 text-muted-foreground">
              <span>Published {post.date.toLocaleDateString()}</span>
              <span>•</span>
              <span>{post.readTime} min read</span>
            </div>

            <div className="flex flex-wrap gap-2">
              {post.tags?.map((tag, index) => (
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
                src={post?.image}
                alt={post.title}
                className="w-full h-96 object-cover rounded-lg border"
                loading="lazy"
              />
            </div>
          )}

          {/* Article Content */}
          <div className="prose prose-lg max-w-none dark:prose-invert">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
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
                code: ({
                  node,
                  inline,
                  className,
                  children,
                  ...props
                }: any) => {
                  const match = /language-(\w+)/.exec(className || "");
                  const language = match ? match[1] : "";

                  // Check if this is a code block (not inline)
                  if (!inline) {
                    return (
                      <div className="my-6">
                        <SyntaxHighlighter
                          style={oneDark as any}
                          language={language || "text"}
                          PreTag="div"
                          customStyle={{
                            margin: 0,
                            borderRadius: "8px",
                            fontSize: "14px",
                            padding: "16px",
                          }}
                          showLineNumbers={true}
                        >
                          {String(children).replace(/\n$/, "")}
                        </SyntaxHighlighter>
                      </div>
                    );
                  }

                  return (
                    <code
                      className="bg-muted px-2 py-1 rounded text-sm font-mono border"
                      {...props}
                    >
                      {children}
                    </code>
                  );
                },
                pre: ({ children }) => children,
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

          {/* Blog Actions */}
          <BlogActions post={post as any} />

          {/* Comments Section */}
          <div className="border-t pt-8">
            <CommentSection comments={post.comments as any} postId={post.id} />
          </div>
        </article>
      </main>
    </div>
  );
}
