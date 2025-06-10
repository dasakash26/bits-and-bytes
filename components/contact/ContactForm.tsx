"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Send } from "lucide-react";

export const ContactForm = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // Handle form submission
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  return (
    <Card className="border-2 border-primary/10 shadow-2xl bg-gradient-to-br from-background/80 to-muted/20 backdrop-blur-sm hover:shadow-3xl transition-all duration-500">
      <CardHeader className="pb-8">
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-12 h-12 bg-gradient-to-r from-primary to-primary/60 rounded-full flex items-center justify-center">
            <Send className="w-6 h-6 text-white" />
          </div>
          <div>
            <CardTitle className="text-2xl font-bold">Send a Message</CardTitle>
            <CardDescription className="text-base">
              I'll respond within 24 hours
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="group">
              <label
                htmlFor="firstName"
                className="block text-sm font-medium mb-2 text-muted-foreground group-focus-within:text-primary transition-colors"
              >
                First Name
              </label>
              <Input
                id="firstName"
                placeholder="John"
                value={formData.firstName}
                onChange={handleChange}
                className="h-12 border-2 transition-all duration-300 focus:border-primary focus:ring-2 focus:ring-primary/20 hover:border-primary/50"
              />
            </div>
            <div className="group">
              <label
                htmlFor="lastName"
                className="block text-sm font-medium mb-2 text-muted-foreground group-focus-within:text-primary transition-colors"
              >
                Last Name
              </label>
              <Input
                id="lastName"
                placeholder="Doe"
                value={formData.lastName}
                onChange={handleChange}
                className="h-12 border-2 transition-all duration-300 focus:border-primary focus:ring-2 focus:ring-primary/20 hover:border-primary/50"
              />
            </div>
          </div>

          <div className="group">
            <label
              htmlFor="email"
              className="block text-sm font-medium mb-2 text-muted-foreground group-focus-within:text-primary transition-colors"
            >
              Email Address
            </label>
            <Input
              id="email"
              type="email"
              placeholder="john@example.com"
              value={formData.email}
              onChange={handleChange}
              className="h-12 border-2 transition-all duration-300 focus:border-primary focus:ring-2 focus:ring-primary/20 hover:border-primary/50"
            />
          </div>

          <div className="group">
            <label
              htmlFor="subject"
              className="block text-sm font-medium mb-2 text-muted-foreground group-focus-within:text-primary transition-colors"
            >
              Subject
            </label>
            <Input
              id="subject"
              placeholder="What's this about?"
              value={formData.subject}
              onChange={handleChange}
              className="h-12 border-2 transition-all duration-300 focus:border-primary focus:ring-2 focus:ring-primary/20 hover:border-primary/50"
            />
          </div>

          <div className="group">
            <label
              htmlFor="message"
              className="block text-sm font-medium mb-2 text-muted-foreground group-focus-within:text-primary transition-colors"
            >
              Your Message
            </label>
            <Textarea
              id="message"
              placeholder="Tell me what's on your mind..."
              rows={6}
              value={formData.message}
              onChange={handleChange}
              className="border-2 transition-all duration-300 focus:border-primary focus:ring-2 focus:ring-primary/20 hover:border-primary/50 resize-none"
            />
          </div>

          <Button
            type="submit"
            className="w-full h-12 text-base font-semibold bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
          >
            <Send className="w-4 h-4 mr-2" />
            Send Message
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};
