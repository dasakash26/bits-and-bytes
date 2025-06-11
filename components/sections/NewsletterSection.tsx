import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail } from "lucide-react";

export function NewsletterSection() {
  const benefits = [
    {
      gradient: "from-blue-500 to-purple-500",
      text: "🎯 Weekly curated tech insights",
    },
    {
      gradient: "from-green-500 to-teal-500",
      text: "💡 Exclusive tutorials and code samples",
    },
    {
      gradient: "from-orange-500 to-red-500",
      text: "🌟 Early access to new features",
    },
    {
      gradient: "from-purple-500 to-pink-500",
      text: "🎁 Monthly developer resources & tools",
    },
  ];

  return (
    <section id="newsletter" className="container mx-auto px-4 py-20">
      <div className="max-w-4xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <Badge variant="secondary" className="mb-4">
              <Mail className="w-3 h-3 mr-1" />
              🚀 Elite Developer Newsletter
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Join the Inner Circle
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Get exclusive access to premium content, early article previews,
              and insider tips from top tech leaders. Join 10,000+ elite
              developers.
            </p>

            <div className="space-y-4 mb-8">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <div
                    className={`w-2 h-2 bg-gradient-to-r ${benefit.gradient} rounded-full`}
                  ></div>
                  <span className="text-muted-foreground">{benefit.text}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-gradient-to-br from-muted/30 to-muted/50 p-8 rounded-lg border border-border/50 backdrop-blur-sm">
            <h3 className="text-xl font-semibold mb-6 flex items-center">
              <span className="mr-2">✨</span>
              Join the Elite Community
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
              <Button
                className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
                size="lg"
              >
                Get Premium Access
                <Mail className="ml-2 w-4 h-4" />
              </Button>
            </div>
            <p className="text-sm text-muted-foreground mt-4 text-center">
              Join 10,000+ elite developers. Premium content. Cancel anytime.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
