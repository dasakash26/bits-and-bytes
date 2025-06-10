"use client";
import { BackgroundLines } from "@/components/ui/background-lines";
import { ModeToggle } from "@/components/ui/theme-toggler";
import LoginButton from "@/components/LoginButton";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  ArrowRight,
  BookOpen,
  Code,
  Coffee,
  Github,
  Linkedin,
  Twitter,
  Users,
  TrendingUp,
  Award,
  Globe,
  Mail,
  Clock,
  Target,
} from "lucide-react";
import Link from "next/link";
import posts from "@/data/posts";
export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-sm border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Code className="w-8 h-8 text-primary" />
            <span className="text-xl font-bold">Bits & Bytes</span>
          </div>
          <div className="hidden md:flex items-center space-x-6">
            <a
              href="#articles"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              Articles
            </a>
            <a
              href="#newsletter"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              Newsletter
            </a>
            <a
              href="#stats"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              Stats
            </a>
            <a
              href="#footer"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              About
            </a>
            <Link
              href="/feed"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              Feed
            </Link>
          </div>
          <div className="flex items-center space-x-2">
            <ModeToggle />
            <LoginButton />
          </div>
        </div>
      </nav>

      <BackgroundLines className="pt-20">
        {/* Hero Section */}
        <section className="container mx-auto px-4 py-20 text-center">
          <div className="max-w-4xl mx-auto">
            <Badge variant="secondary" className="mb-6">
              <Coffee className="w-3 h-3 mr-1" />
              Welcome to Akash's Tech Universe
            </Badge>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
              My Personal
              <br />
              Tech Blog
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
              Join me on my journey through code, technology, and innovation.
              This is my personal space where I share insights, and invite
              fellow developers to contribute their knowledge too.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="text-lg px-8"
                onClick={() => {
                  window.location.href = "/feed";
                }}
              >
                Explore My Articles
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
              <Button variant="outline" size="lg" className="text-lg px-8">
                <BookOpen className="mr-2 w-4 h-4" />
                Guest Post
              </Button>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section id="stats" className="container mx-auto px-4 py-20">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Blog Statistics
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Growing community of developers who enjoy reading my thoughts and
              contributing their own insights
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            <div className="text-center p-6 rounded-lg bg-muted/30">
              <TrendingUp className="w-12 h-12 text-primary mx-auto mb-4" />
              <div className="text-4xl font-bold mb-2">25K+</div>
              <div className="text-muted-foreground">Monthly Readers</div>
              <p className="text-sm text-muted-foreground mt-2">
                And growing every month
              </p>
            </div>
            <div className="text-center p-6 rounded-lg bg-muted/30">
              <Users className="w-12 h-12 text-primary mx-auto mb-4" />
              <div className="text-4xl font-bold mb-2">15+</div>
              <div className="text-muted-foreground">Guest Contributors</div>
              <p className="text-sm text-muted-foreground mt-2">
                Talented developers sharing knowledge
              </p>
            </div>
            <div className="text-center p-6 rounded-lg bg-muted/30">
              <BookOpen className="w-12 h-12 text-primary mx-auto mb-4" />
              <div className="text-4xl font-bold mb-2">50+</div>
              <div className="text-muted-foreground">Published Articles</div>
              <p className="text-sm text-muted-foreground mt-2">
                Deep dives into various tech topics
              </p>
            </div>
            <div className="text-center p-6 rounded-lg bg-muted/30">
              <Globe className="w-12 h-12 text-primary mx-auto mb-4" />
              <div className="text-4xl font-bold mb-2">30+</div>
              <div className="text-muted-foreground">Countries Reached</div>
              <p className="text-sm text-muted-foreground mt-2">
                Global developer readership
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <Award className="w-8 h-8 text-primary mx-auto mb-3" />
              <h3 className="font-semibold mb-2">Personal Touch</h3>
              <p className="text-sm text-muted-foreground">
                Real experiences from my coding journey
              </p>
            </div>
            <div className="text-center">
              <Clock className="w-8 h-8 text-primary mx-auto mb-3" />
              <h3 className="font-semibold mb-2">Regular Updates</h3>
              <p className="text-sm text-muted-foreground">
                New posts every week
              </p>
            </div>
            <div className="text-center">
              <Target className="w-8 h-8 text-primary mx-auto mb-3" />
              <h3 className="font-semibold mb-2">Open Contributions</h3>
              <p className="text-sm text-muted-foreground">
                Guest posts welcome from fellow developers
              </p>
            </div>
          </div>
        </section>

        {/* Featured Articles Section */}
        <section
          id="articles"
          className="container mx-auto px-4 py-20 bg-muted/20"
        >
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Latest Articles
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              My recent thoughts on technology, coding practices, and industry
              trends. Some articles also feature contributions from amazing
              guest writers.
            </p>
          </div>

          {/* Article Tags */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {[
              "All",
              "My Posts",
              "Guest Posts",
              "Tutorials",
              "Opinions",
              "Reviews",
            ].map((tag) => (
              <Badge
                key={tag}
                variant={tag === "All" ? "default" : "outline"}
                className="cursor-pointer"
              >
                {tag}
              </Badge>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {posts.slice(0, 6).map((post, index) => (
              <Link key={index} href={`/article/${post.id || index + 1}`}>
                <Card className="hover:shadow-lg transition-all duration-300 cursor-pointer group">
                  <CardHeader>
                    <div className="flex items-center space-x-2 mb-2">
                      <Badge variant="outline">{post.tags?.[0]}</Badge>
                      <span className="text-sm text-muted-foreground">
                        5 min read
                      </span>
                    </div>
                    <CardTitle className="group-hover:text-primary transition-colors line-clamp-2">
                      {post.title}
                    </CardTitle>
                    <CardDescription className="line-clamp-3">
                      {post.excerpt ||
                        "Discover the latest insights and best practices in modern software development with real-world examples and actionable tips."}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                          {post.author?.charAt(0) || "A"}
                        </div>
                        <div>
                          <div className="font-medium text-sm">
                            {post.author || "Anonymous"}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {post.date || "Today"}
                          </div>
                        </div>
                      </div>
                      <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>

          <div className="text-center">
            <Link href="/articles">
              <Button size="lg" variant="outline">
                View All Articles
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
          </div>
        </section>

        {/* Newsletter Section */}
        <section id="newsletter" className="container mx-auto px-4 py-20">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <Badge variant="secondary" className="mb-4">
                  <Mail className="w-3 h-3 mr-1" />
                  Personal Newsletter
                </Badge>
                <h2 className="text-3xl md:text-4xl font-bold mb-6">
                  Stay Connected
                </h2>
                <p className="text-xl text-muted-foreground mb-8">
                  Get notified when I publish new articles or when guest
                  contributors share their insights. Join my personal mailing
                  list for exclusive content.
                </p>

                <div className="space-y-4 mb-8">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    <span className="text-muted-foreground">
                      New article notifications
                    </span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    <span className="text-muted-foreground">
                      Behind-the-scenes content
                    </span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    <span className="text-muted-foreground">
                      Guest contributor announcements
                    </span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    <span className="text-muted-foreground">
                      Personal tech updates and recommendations
                    </span>
                  </div>
                </div>
              </div>

              <div className="bg-muted/30 p-8 rounded-lg">
                <h3 className="text-xl font-semibold mb-6">
                  Join My Newsletter
                </h3>
                <div className="space-y-4">
                  <Input
                    placeholder="Enter your email address"
                    type="email"
                    className="w-full"
                  />
                  <Input
                    placeholder="Your name (optional)"
                    type="text"
                    className="w-full"
                  />
                  <Button className="w-full" size="lg">
                    Subscribe to Updates
                    <Mail className="ml-2 w-4 h-4" />
                  </Button>
                </div>
                <p className="text-sm text-muted-foreground mt-4 text-center">
                  Join 2,500+ readers. Unsubscribe anytime. No spam, just good
                  content.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section
          id="about"
          className="container mx-auto px-4 py-20 bg-muted/20"
        >
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                About This Blog
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Hi, I'm Akash! This is my personal corner of the internet where
                I share my thoughts on technology, coding experiences, and
                invite other talented developers to contribute their knowledge.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-16">
              <div>
                <h3 className="text-2xl font-bold mb-6">Why I Blog</h3>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  I believe in sharing knowledge and learning from others. This
                  blog started as a way to document my coding journey, but it
                  has evolved into a platform where I can share insights and
                  invite other developers to contribute their unique
                  perspectives.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  Whether you're looking to read about the latest tech trends,
                  learn from practical tutorials, or share your own knowledge as
                  a guest contributor, this space is designed to foster learning
                  and community.
                </p>
              </div>

              <div>
                <h3 className="text-2xl font-bold mb-6">
                  What You'll Find Here
                </h3>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <BookOpen className="w-5 h-5 text-primary mt-1" />
                    <div>
                      <h4 className="font-semibold">Personal Insights</h4>
                      <p className="text-sm text-muted-foreground">
                        My thoughts on development practices, tools, and
                        industry trends
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Code className="w-5 h-5 text-primary mt-1" />
                    <div>
                      <h4 className="font-semibold">Coding Tutorials</h4>
                      <p className="text-sm text-muted-foreground">
                        Step-by-step guides based on real projects and
                        challenges
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Users className="w-5 h-5 text-primary mt-1" />
                    <div>
                      <h4 className="font-semibold">Guest Contributions</h4>
                      <p className="text-sm text-muted-foreground">
                        Articles from fellow developers sharing their expertise
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <TrendingUp className="w-5 h-5 text-primary mt-1" />
                    <div>
                      <h4 className="font-semibold">Tech Reviews</h4>
                      <p className="text-sm text-muted-foreground">
                        Honest reviews of tools, frameworks, and technologies I
                        use
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="text-center">
              <h3 className="text-2xl font-bold mb-8">Want to Contribute?</h3>
              <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
                I'm always looking for talented developers to share their
                knowledge. If you have an interesting story, tutorial, or
                insight to share, I'd love to feature it!
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg">
                  <Mail className="mr-2 w-4 h-4" />
                  Submit Guest Post
                </Button>
                <Button variant="outline" size="lg">
                  <Twitter className="mr-2 w-4 h-4" />
                  Connect on Twitter
                </Button>
                <Button variant="outline" size="lg">
                  <Github className="mr-2 w-4 h-4" />
                  Follow on GitHub
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer id="footer" className="border-t bg-muted/30">
          <div className="container mx-auto px-4 py-12">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Code className="w-6 h-6 text-primary" />
                  <span className="text-lg font-bold">Bits & Bytes</span>
                </div>
                <p className="text-muted-foreground">
                  Empowering developers with knowledge, one byte at a time.
                </p>
                <div className="flex space-x-4">
                  <Twitter className="w-5 h-5 text-muted-foreground hover:text-foreground cursor-pointer" />
                  <Github className="w-5 h-5 text-muted-foreground hover:text-foreground cursor-pointer" />
                  <Linkedin className="w-5 h-5 text-muted-foreground hover:text-foreground cursor-pointer" />
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-4">Content</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li>
                    <a href="#" className="hover:text-foreground">
                      Latest Articles
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-foreground">
                      Tutorials
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-foreground">
                      Case Studies
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-foreground">
                      Tech News
                    </a>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold mb-4">Community</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li>
                    <a href="#" className="hover:text-foreground">
                      Discord
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-foreground">
                      Newsletter
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-foreground">
                      Contributors
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-foreground">
                      Events
                    </a>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold mb-4">Company</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li>
                    <a href="#" className="hover:text-foreground">
                      About
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-foreground">
                      Careers
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-foreground">
                      Privacy
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-foreground">
                      Terms
                    </a>
                  </li>
                </ul>
              </div>
            </div>

            <div className="border-t mt-8 pt-8 text-center text-muted-foreground">
              <p>&copy; 2024 Bits & Bytes. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </BackgroundLines>
    </div>
  );
}
