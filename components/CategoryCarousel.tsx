import { prisma } from "@/lib/prisma";
import { CarouselClient } from "./CarouselClient";

interface CategoryCarouselProps {
  categoryId?: string;
  limit?: number;
}

export const CategoryCarousel = async ({
  categoryId,
  limit = 5,
}: CategoryCarouselProps) => {
  const posts = await prisma.blogPost.findMany({
    where: categoryId
      ? {
          categoryId: categoryId,
        }
      : {},
    include: {
      author: {
        include: {
          user: true,
        },
      },
      category: true,
    },
    take: limit,
  });

  if (!posts.length) return null;

  return <CarouselClient posts={posts} />;
};
