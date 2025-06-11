import { z } from "zod";

const blogPostSchema = z.object({
  id: z.string().optional(),
  title: z.string().min(1, "Title is required"),
  slug: z.string().min(1, "Slug is required"),
  excerpt: z.string().optional(),
  authorId: z.string().min(1, "Author ID is required"),
  readTime: z.string(),
  categoryId: z.string().min(1, "Category ID is required"),
  tags: z.array(z.string()).optional(),
  image: z.string().url("Invalid image URL").optional(),
  content: z.string().min(10, "Content is required"),
});

export default blogPostSchema;
export type BlogPostSchema = z.infer<typeof blogPostSchema>;
