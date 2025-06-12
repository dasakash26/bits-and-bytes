function BlogHeaderSkeleton() {
  return (
    <div className="bg-card border-b animate-pulse">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="h-8 bg-muted rounded w-32"></div>
          <div className="flex items-center gap-4">
            <div className="h-8 bg-muted rounded w-20"></div>
            <div className="h-8 bg-muted rounded w-20"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

function AuthorInfoSkeleton() {
  return (
    <div className="flex items-center gap-3 animate-pulse">
      <div className="w-12 h-12 bg-muted rounded-full"></div>
      <div className="space-y-2">
        <div className="h-4 bg-muted rounded w-24"></div>
        <div className="h-3 bg-muted rounded w-16"></div>
      </div>
    </div>
  );
}

function ArticleContentSkeleton() {
  return (
    <div className="space-y-6 animate-pulse">
      {/* Title */}
      <div className="space-y-3">
        <div className="h-8 bg-muted rounded w-3/4"></div>
        <div className="h-8 bg-muted rounded w-1/2"></div>
      </div>

      {/* Meta info */}
      <div className="flex items-center gap-4">
        <div className="h-4 bg-muted rounded w-32"></div>
        <div className="h-4 bg-muted rounded w-20"></div>
      </div>

      {/* Tags */}
      <div className="flex gap-2">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="h-6 bg-muted rounded-full w-16"></div>
        ))}
      </div>

      {/* Featured image */}
      <div className="h-96 bg-muted rounded-lg"></div>

      {/* Content paragraphs */}
      <div className="space-y-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="space-y-2">
            <div className="h-4 bg-muted rounded w-full"></div>
            <div className="h-4 bg-muted rounded w-5/6"></div>
            <div className="h-4 bg-muted rounded w-4/5"></div>
          </div>
        ))}
      </div>

      {/* Actions */}
      <div className="flex items-center justify-between border-t pt-6">
        <div className="flex items-center gap-4">
          <div className="h-8 bg-muted rounded w-16"></div>
          <div className="h-8 bg-muted rounded w-16"></div>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-8 bg-muted rounded w-8"></div>
          <div className="h-8 bg-muted rounded w-8"></div>
        </div>
      </div>
    </div>
  );
}

function CommentsSkeleton() {
  return (
    <div className="border-t pt-8 space-y-6 animate-pulse">
      <div className="h-6 bg-muted rounded w-32"></div>
      {Array.from({ length: 3 }).map((_, i) => (
        <div key={i} className="flex gap-3">
          <div className="w-8 h-8 bg-muted rounded-full"></div>
          <div className="flex-1 space-y-2">
            <div className="h-4 bg-muted rounded w-24"></div>
            <div className="h-4 bg-muted rounded w-full"></div>
            <div className="h-4 bg-muted rounded w-3/4"></div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default function Loading() {
  return (
    <div className="min-h-screen bg-background">
      <BlogHeaderSkeleton />

      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <article className="space-y-8">
          <header className="space-y-6">
            <AuthorInfoSkeleton />
          </header>

          <ArticleContentSkeleton />

          <CommentsSkeleton />
        </article>
      </main>
    </div>
  );
}
