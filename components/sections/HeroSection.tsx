import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Code, Coffee } from "lucide-react";
import CallToActionButton from "@/components/sections/CallToActionButton";

export function HeroSection() {
  return (
    <section className="container mx-auto px-4 py-20 text-center">
      <div className="max-w-4xl mx-auto">
        <Badge variant="secondary" className="mb-6">
          <Coffee className="w-3 h-3 mr-1" />
          Welcome to the Future of Tech
        </Badge>
        <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
          Where Code Meets
          <br />
          <span className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
            Innovation
          </span>
        </h1>
        <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
          Join the most vibrant developer community where cutting-edge insights,
          breakthrough tutorials, and revolutionary ideas come together. From AI
          to blockchain, from startups to enterprise - we cover it all.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <CallToActionButton />
          <Button size="lg" variant="outline" className="text-lg px-8">
            <Code className="mr-2 w-4 h-4" />
            Start Writing
          </Button>
        </div>
      </div>
    </section>
  );
}
