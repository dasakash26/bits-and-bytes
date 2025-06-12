import React from "react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Folder } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { generateColor } from "./[slug]/page";

export default async function CategoriesPage() {
  try {
    const categories = await prisma.category.findMany({
      include: {
        _count: {
          select: { posts: true },
        },
      },
      orderBy: { name: "asc" },
    });

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
            <Link key={category.id} href={`/categories/${category.id}`}>
              <Card className="group hover:shadow-xl transition-all duration-300 hover:scale-105 overflow-hidden cursor-pointer">
                <div
                  className={`h-32 bg-gradient-to-r ${generateColor(
                    category._count.posts
                  )} relative`}
                >
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
                  <div className="absolute bottom-4 left-4">
                    {category.icon ? (
                      <span className="text-2xl">{category.icon}</span>
                    ) : (
                      <Folder className="w-8 h-8 text-white" />
                    )}
                  </div>
                </div>

                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-xl font-bold group-hover:text-primary transition-colors">
                      {category.name}
                    </h3>
                    <Badge variant="secondary">
                      {category._count.posts} posts
                    </Badge>
                  </div>

                  <p className="text-muted-foreground mb-4">
                    {category.description || "Explore posts in this category"}
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

        {categories.length === 0 && (
          <div className="text-center py-12">
            <Folder className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">No categories found</h3>
            <p className="text-muted-foreground mb-4">
              Categories will appear here once they are created.
            </p>
            <p className="text-sm text-muted-foreground">
              Check your database connection or seed some categories to get
              started.
            </p>
          </div>
        )}
      </div>
    );
  } catch (error) {
    console.error("Error fetching categories:", error);
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center py-12">
          <Folder className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h3 className="text-xl font-semibold mb-2">
            Error loading categories
          </h3>
          <p className="text-muted-foreground">
            Please check your database connection and try again.
          </p>
        </div>
      </div>
    );
  }
}
