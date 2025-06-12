import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CategoryCarousel } from "@/components/CategoryCarousel";
import { prisma } from "@/lib/prisma";
import { CategoryPageClient } from "./CategoryPageClient";

export function generateColor(len: number) {
  const colors = [
    "from-blue-500 to-purple-500",
    "from-pink-500 to-orange-500",
    "from-green-500 to-teal-500",
    "from-yellow-500 to-red-500",
    "from-indigo-500 to-blue-500",
    "from-purple-500 to-pink-500",
  ];
  return colors[len % colors.length];
}

export default async function CategoryPage({
  params,
}: {
  params: { slug: string };
}) {
  const category = await prisma.category.findUnique({
    where: { id: params.slug },
    include: {
      posts: {
        include: {
          author: {
            include: {
              user: true,
            },
          },
          category: true,
          comments: true,
        },
      },
    },
  });

  if (!category) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Card className="p-8 text-center">
          <h1 className="text-2xl font-bold mb-4">Category Not Found</h1>
          <p className="text-muted-foreground">
            The category you're looking for doesn't exist.
          </p>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div
        className={`bg-gradient-to-r ${generateColor(
          category.posts.length
        )} text-white py-16 px-4`}
      >
        <div className="container mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            {category.name}
          </h1>
          <p className="text-xl opacity-90 max-w-2xl mx-auto">
            {category.description}
          </p>
          <Badge className="mt-4 bg-white/20 text-white border-white/30">
            {category.posts.length} Articles
          </Badge>
        </div>
      </div>

      {/* Featured Carousel */}
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">
            Featured in {category.name}
          </h2>
          <CategoryCarousel categoryId={category.id} />
        </div>

        {/* Client Component for Interactive Features */}
        <CategoryPageClient category={category} />
      </div>
    </div>
  );
}
