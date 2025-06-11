import { BackgroundLines } from "@/components/ui/background-lines";
import { Button } from "@/components/ui/button";
import {
  BookOpen,
  Code,
  Github,
  Linkedin,
  Twitter,
  Users,
  TrendingUp,
  Mail,
} from "lucide-react";
import { Navigation } from "@/components/sections/Navigation";
import { HeroSection } from "@/components/sections/HeroSection";
import { StatsSection } from "@/components/sections/StatsSection";
import { ArticlesSection } from "@/components/sections/ArticlesSection";
import { NewsletterSection } from "@/components/sections/NewsletterSection";

export default function Home() {
  return (
    <div className="min-h-screen">
      <Navigation />

      <BackgroundLines className="pt-20">
        <HeroSection />
        <StatsSection />
        <ArticlesSection />
        <NewsletterSection />

        {/* About Section */}
        <section
          id="about"
          className="container mx-auto px-4 py-20 bg-muted/20"
        >
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                About Bits & Bytes
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                The premier destination for developers who want to stay ahead of
                the curve. We're not just another tech blog - we're your gateway
                to the future of development.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-16">
              <div>
                <h3 className="text-2xl font-bold mb-6">Our Vision</h3>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  To democratize access to cutting-edge technical knowledge and
                  create the world's most comprehensive developer resource. We
                  believe that when developers share knowledge freely,
                  innovation accelerates exponentially.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  From junior developers taking their first steps to seasoned
                  architects shaping the future, our platform serves every level
                  with content that matters, tutorials that work, and insights
                  that inspire.
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
                      <h4 className="font-semibold">Community Insights</h4>
                      <p className="text-sm text-muted-foreground">
                        Thoughts on development practices, tools, and industry
                        trends from our contributors
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
                      <h4 className="font-semibold">Community Contributions</h4>
                      <p className="text-sm text-muted-foreground">
                        Articles from developers sharing their expertise and
                        experiences
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <TrendingUp className="w-5 h-5 text-primary mt-1" />
                    <div>
                      <h4 className="font-semibold">Tech Reviews</h4>
                      <p className="text-sm text-muted-foreground">
                        Honest reviews of tools, frameworks, and technologies
                        from our community
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="text-center">
              <h3 className="text-2xl font-bold mb-8">Want to Contribute?</h3>
              <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
                We're always looking for talented developers to share their
                knowledge. If you have an interesting story, tutorial, or
                insight to share, we'd love to feature it!
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600"
                >
                  <Mail className="mr-2 w-4 h-4" />
                  Become a Contributor
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="border-blue-200 text-blue-600 hover:bg-blue-50 dark:border-blue-800 dark:text-blue-400 dark:hover:bg-blue-950"
                >
                  <Twitter className="mr-2 w-4 h-4" />
                  Follow @BitsAndBytes
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="border-purple-200 text-purple-600 hover:bg-purple-50 dark:border-purple-800 dark:text-purple-400 dark:hover:bg-purple-950"
                >
                  <Github className="mr-2 w-4 h-4" />
                  Star on GitHub
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
