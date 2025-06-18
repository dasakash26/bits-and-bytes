import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { prisma } from "@/lib/prisma";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export async function ArticlesSection() {
  const posts = await prisma.blogPost.findMany({
    include: { author: true },
  });

  const tags = [
    "🔥 Trending",
    "🤖 AI & ML",
    "⚛️ React",
    "🚀 DevOps",
    "🔐 Security",
    "📱 Mobile",
    "☁️ Cloud",
    "🌐 Web3",
  ];

  return (
    <section
      id="articles"
      className="container mx-auto px-4 py-20 bg-secondary/30"
    >
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
          Trending Articles
        </h2>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Discover the hottest topics in tech right now - from AI breakthroughs
          to developer tools that are changing the game.
        </p>
      </div>

      {/* Article Tags */}
      <div className="flex flex-wrap justify-center gap-4 mb-12">
        {tags.map((tag) => (
          <Badge
            key={tag}
            variant={tag === "🔥 Trending" ? "default" : "outline"}
            className="cursor-pointer hover:bg-primary-hover hover:text-primary-foreground hover:border-primary transition-all duration-200 text-sm py-2 px-4 shadow-elevation-low hover:shadow-elevation-medium"
          >
            {tag}
          </Badge>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
        {posts.slice(0, 6).map((post, index) => (
          <Link key={index} href={`/article/${post.id || index + 1}`}>
            <Card className="hover:shadow-elevation-medium transition-all duration-300 cursor-pointer group bg-card border-border hover:border-primary/20 shadow-elevation-low">
              <CardHeader>
                <div className="flex items-center space-x-2 mb-2">
                  <Badge
                    variant="outline"
                    className="border-accent/30 text-accent bg-accent-light"
                  >
                    {post.tags?.[0]}
                  </Badge>
                  <span className="text-sm text-muted-foreground">
                    5 min read
                  </span>
                </div>
                <CardTitle className="group-hover:text-primary transition-colors line-clamp-2 text-foreground">
                  {post.title}
                </CardTitle>
                <CardDescription className="line-clamp-3 text-muted-foreground">
                  {post.excerpt ||
                    "Discover the latest insights and best practices in modern software development with real-world examples and actionable tips."}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-gradient-to-r from-primary to-accent rounded-full flex items-center justify-center text-primary-foreground text-sm font-bold shadow-elevation-low">
                      {post.author && typeof post.author === "string"
                        ? post.author
                        : post.author &&
                          typeof post.author === "object" &&
                          post.author.name
                        ? post.author.name.charAt(0)
                        : "A"}
                    </div>
                    <div>
                      <div className="font-medium text-sm text-foreground">
                        {post.author && typeof post.author === "string"
                          ? post.author
                          : post.author &&
                            typeof post.author === "object" &&
                            post.author.name
                          ? post.author.name
                          : "Anonymous"}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {post.date
                          ? new Date(post.date).toLocaleDateString()
                          : "Today"}
                      </div>
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors group-hover:translate-x-1" />
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      <div className="text-center">
        <Link href="/articles">
          <Button
            size="lg"
            variant="outline"
            className="border-border hover:bg-secondary-hover hover:border-border-hover transition-all duration-200 shadow-elevation-low hover:shadow-elevation-medium"
          >
            View All Articles
            <ArrowRight className="ml-2 w-4 h-4" />
          </Button>
        </Link>
      </div>
    </section>
  );
}
