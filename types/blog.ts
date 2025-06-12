import { User } from "next-auth";

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string| null;
  authorId: string; 
  author: Author; 
  date: Date; 
  readTime: string|null;
  categoryId: string; 
  category: Category; 
  tags: string[];
  image: string| null; 
  content: string;
  likeCount: number;
  viewCount: number;
  comments: Comment[];
}

export interface Category {
  id: string;
  name: string;
  description?: string| null;
  icon?: string| null;
}

export interface Author {
  id: string;
  name: string;
  avatar?: string|null;
  bio?: string|null;
  twitter?: string|null;
  github?: string|null;
  linkedin?: string|null;
  userId?: string|null; 
}

export interface Comment{
  id: string;
  content: string;
  authorId: string;
  postId: string;
  parentId?: string|null;
  createdAt: Date;
  updatedAt: Date;

  replies?: Comment[]; 
  author?: User; 
}

export type BlogPosts = BlogPost[];
export type Categories = Category[];
