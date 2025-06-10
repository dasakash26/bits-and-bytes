"use client";

import { ContactForm } from "@/components/contact/ContactForm";
import { ContactInfo } from "@/components/contact/ContactInfo";
import {
  Mail,
  Globe,
  Users,
  MessageSquare,
  Github,
  Twitter,
  Linkedin,
  Instagram,
} from "lucide-react";
import Link from "next/link";

export default function ContactPage() {
  const socialLinks = [
    {
      name: "GitHub",
      url: "https://github.com/dasakash26",
      icon: Github,
      username: "@dasakash26",
    },
    {
      name: "Twitter",
      url: "https://twitter.com/dasakash26",
      icon: Twitter,
      username: "@dasakash26",
    },
    {
      name: "LinkedIn",
      url: "https://linkedin.com/in/dasakash26",
      icon: Linkedin,
      username: "/in/dasakash26",
    },
    {
      name: "Instagram",
      url: "https://instagram.com/dasakash26",
      icon: Instagram,
      username: "@dasakash26",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-accent/10 relative overflow-hidden">
      {/* Subtle Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute top-40 right-20 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-1/4 w-80 h-80 bg-muted/20 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 py-16 relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Professional Header */}
          <div className="text-center mb-16 relative">
            {/* Floating Icons */}
            <div className="absolute -top-8 left-1/4 animate-bounce">
              <Mail className="w-6 h-6 text-primary" />
            </div>
            <div
              className="absolute -top-6 right-1/4 animate-bounce"
              style={{ animationDelay: "0.5s" }}
            >
              <MessageSquare className="w-5 h-5 text-accent" />
            </div>

            <div className="inline-flex items-center space-x-3 mb-8 bg-card/80 backdrop-blur-sm rounded-full px-6 py-3 border border-border shadow-sm">
              <Globe className="w-5 h-5 text-primary" />
              <span className="text-sm font-semibold text-primary uppercase tracking-wider">
                Connect & Collaborate
              </span>
              <Users className="w-5 h-5 text-primary" />
            </div>

            <h1 className="text-5xl md:text-7xl font-bold mb-8 bg-gradient-to-r from-foreground via-primary to-accent bg-clip-text text-transparent leading-tight">
              Get in Touch
            </h1>

            <p className="text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed mb-8">
              Whether you have a project in mind, want to discuss opportunities,
              or need technical consultation,{" "}
              <span className="text-transparent bg-gradient-to-r from-primary to-accent bg-clip-text font-semibold">
                I'm here to help
              </span>
              . Let's connect and explore how we can work together.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 max-w-3xl mx-auto">
              <div className="flex flex-col items-center p-4 bg-card/60 backdrop-blur-sm rounded-xl border border-border">
                <Mail className="w-8 h-8 text-primary mb-2" />
                <span className="text-sm font-medium text-foreground">
                  Quick Response
                </span>
                <span className="text-xs text-muted-foreground">
                  Within 24 hours
                </span>
              </div>
              <div className="flex flex-col items-center p-4 bg-card/60 backdrop-blur-sm rounded-xl border border-border">
                <Globe className="w-8 h-8 text-accent mb-2" />
                <span className="text-sm font-medium text-foreground">
                  Global Reach
                </span>
                <span className="text-xs text-muted-foreground">
                  Worldwide collaboration
                </span>
              </div>
              <div className="flex flex-col items-center p-4 bg-card/60 backdrop-blur-sm rounded-xl border border-border">
                <Users className="w-8 h-8 text-primary mb-2" />
                <span className="text-sm font-medium text-foreground">
                  Professional
                </span>
                <span className="text-xs text-muted-foreground">
                  Enterprise ready
                </span>
              </div>
            </div>

            {/* Social Links Section */}
            <div className="mt-12">
              <h3 className="text-lg font-semibold text-foreground mb-6">
                Connect on Social Media
              </h3>
              <div className="flex justify-center gap-4 flex-wrap">
                {socialLinks.map((social) => (
                  <Link
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-3 bg-card/80 hover:bg-card border border-border hover:border-primary/50 rounded-xl px-4 py-3 transition-all duration-200 hover:scale-105 hover:shadow-md"
                  >
                    <social.icon className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                    <div className="text-left">
                      <div className="text-sm font-medium text-foreground">
                        {social.name}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {social.username}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="bg-card/80 backdrop-blur-lg rounded-2xl border border-border p-1 shadow-xl">
                <div className="bg-gradient-to-br from-card/50 to-transparent rounded-xl p-6">
                  <ContactForm />
                </div>
              </div>
            </div>
            <div className="space-y-6">
              <div className="bg-card/80 backdrop-blur-lg rounded-2xl border border-border p-1 shadow-xl">
                <div className="bg-gradient-to-br from-card/50 to-transparent rounded-xl p-6">
                  <ContactInfo />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Professional Footer Gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </div>
  );
}
