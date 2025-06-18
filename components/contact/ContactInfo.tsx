import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Mail,
  Twitter,
  Github,
  Linkedin,
  MapPin,
  Clock,
  Star,
  Zap,
} from "lucide-react";

export const ContactInfo = () => {
  return (
    <>
      {/* Contact Information */}
      <Card className="border-2 border-primary/10 bg-gradient-to-br from-primary-light to-primary/10 hover:shadow-elevation-medium transition-all duration-300">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Zap className="w-5 h-5 text-primary" />
            <span>Quick Contact</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center space-x-4 p-4 bg-background/60 rounded-lg border border-primary/20 hover:bg-background/80 transition-colors">
            <div className="w-10 h-10 bg-gradient-to-r from-primary to-primary/60 rounded-full flex items-center justify-center">
              <Mail className="w-5 h-5 text-primary-foreground" />
            </div>
            <div>
              <p className="font-semibold">Email</p>
              <p className="text-sm text-muted-foreground">
                akash@bitsandbytes.dev
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-4 p-4 bg-background/60 rounded-lg border border-primary/20 hover:bg-background/80 transition-colors">
            <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-green-400 rounded-full flex items-center justify-center">
              <Clock className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="font-semibold">Response Time</p>
              <p className="text-sm text-muted-foreground">Within 24 hours</p>
            </div>
          </div>

          <div className="flex items-center space-x-4 p-4 bg-background/60 rounded-lg border border-primary/20 hover:bg-background/80 transition-colors">
            <div className="w-10 h-10 bg-gradient-to-r from-accent to-accent/80 rounded-full flex items-center justify-center">
              <MapPin className="w-5 h-5 text-accent-foreground" />
            </div>
            <div>
              <p className="font-semibold">Location</p>
              <p className="text-sm text-muted-foreground">India</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Enhanced Social Links */}
      <Card className="border-2 border-primary/10 hover:shadow-elevation-medium transition-all duration-300">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Star className="w-5 h-5 text-warning" />
            <span>Connect</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <Button
              variant="outline"
              className="w-full justify-start h-12 hover:bg-primary-light hover:border-primary transition-all duration-300 group"
              asChild
            >
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Twitter className="w-4 h-4 mr-3 text-primary group-hover:scale-110 transition-transform" />
                <span className="font-medium">Follow on Twitter</span>
              </a>
            </Button>
            <Button
              variant="outline"
              className="w-full justify-start h-12 hover:bg-secondary-hover hover:border-border-hover transition-all duration-300 group"
              asChild
            >
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Github className="w-4 h-4 mr-3 text-foreground group-hover:scale-110 transition-transform" />
                <span className="font-medium">Check GitHub</span>
              </a>
            </Button>
            <Button
              variant="outline"
              className="w-full justify-start h-12 hover:bg-accent-light hover:border-accent transition-all duration-300 group"
              asChild
            >
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Linkedin className="w-4 h-4 mr-3 text-accent group-hover:scale-110 transition-transform" />
                <span className="font-medium">Connect LinkedIn</span>
              </a>
            </Button>
          </div>
        </CardContent>
      </Card>
    </>
  );
};
