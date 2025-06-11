import { User } from "./user";

export interface BlogPost {
  id: string; // Changed from number to string to match Prisma
  title: string;
  slug: string;
  excerpt: string;
  authorId: string; // Added authorId field
  author: Author; // This will be populated via relation
  date: Date; // Changed from string to Date to match Prisma
  readTime: string;
  categoryId: string; // Added categoryId field
  category: Category; // This will be populated via relation
  tags: string[];
  image: string; // This is the featured image URL
  content: string;
  likeCount: number;
  commentCount: number;
  viewCount: number;
}

export interface Category {
  id: string;
  name: string;
  description?: string;
  icon?: string;
}

export interface Author {
  id: string;
  name: string;
  avatar?: string;
  bio?: string;
  twitter?: string; // Flattened from social object
  github?: string;
  linkedin?: string;
  userId?: string; // Added to match Prisma relation
  user?: User; // Optional user relation
}

export type BlogPosts = BlogPost[];
export type Categories = Category[];
