"use client";

import React from "react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Folder } from "lucide-react";

const categories = [
  {
    slug: "technology",
    title: "Technology",
    description: "Latest trends in tech, programming, and innovation",
    color: "from-blue-500 to-purple-500",
    count: 24,
    image: "/api/placeholder/400/200",
  },
  {
    slug: "design",
    title: "Design",
    description: "UI/UX, visual design, and creative inspiration",
    color: "from-pink-500 to-orange-500",
    count: 18,
    image: "/api/placeholder/400/200",
  },
  {
    slug: "lifestyle",
    title: "Lifestyle",
    description: "Personal growth, productivity, and life insights",
    color: "from-green-500 to-teal-500",
    count: 15,
    image: "/api/placeholder/400/200",
  },
];

export default function CategoriesPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Explore Categories</h1>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          Discover content organized by topics that interest you most
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((category) => (
          <Link key={category.slug} href={`/categories/${category.slug}`}>
            <Card className="group hover:shadow-xl transition-all duration-300 hover:scale-105 overflow-hidden cursor-pointer">
              <div
                className={`h-32 bg-gradient-to-r ${category.color} relative`}
              >
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
                <div className="absolute bottom-4 left-4">
                  <Folder className="w-8 h-8 text-white" />
                </div>
              </div>

              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-xl font-bold group-hover:text-primary transition-colors">
                    {category.title}
                  </h3>
                  <Badge variant="secondary">{category.count} posts</Badge>
                </div>

                <p className="text-muted-foreground mb-4">
                  {category.description}
                </p>

                <div className="flex items-center text-primary font-medium group-hover:gap-2 transition-all">
                  <span>Explore</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
