import { notFound } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { AuthorInfo } from "@/components/AuthorInfo";
import { CommentSection } from "@/components/CommentSection";
import { prisma } from "@/lib/prisma";
import { BlogActions } from "@/components/blog/BlogActions";
import { BlogHeader } from "@/components/blog/BlogHeader";
import { MarkdownContent } from "@/components/MarkdownContent";
export default async function BlogPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id: postId } = await params;
  const post = await prisma.blogPost.findUnique({
    where: { id: postId },
    include: {
      author: true,
      category: true,
      likes:true,
      savedBy: true,
      views: true,
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
            <AuthorInfo post={post} showMoreButton={false} />

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
          <div className="prose prose-lg max-w-none">
            <MarkdownContent content={post.content} />
          </div>

          {/* Blog Actions */}
          <BlogActions post={post as any} />

          {/* Comments Section */}
          <div className="border-t pt-8">
            <CommentSection postId={post.id} comments={post.comments} />
          </div>
        </article>
      </main>
    </div>
  );
}
