import { prisma } from "@/lib/prisma";
import { CarouselClient } from "./CarouselClient";

interface CategoryCarouselProps {
  categoryId?: string;
  limit?: number;
}

async function getPostsByCategory(categoryId: string, limit: number) {
  return await prisma.blogPost.findMany({
    where: categoryId
      ? {
          categoryId: categoryId,
        }
      : {},
    include: {
      author: true,
      category: true,
    },
    take: limit,
  });
}

export const CategoryCarousel = async ({
  categoryId,
  limit = 5,
}: CategoryCarouselProps) => {
  if (!categoryId) return null;
  const posts = await getPostsByCategory(categoryId, limit);

  if (!posts.length) return null;

  return <CarouselClient posts={posts} />;
};
