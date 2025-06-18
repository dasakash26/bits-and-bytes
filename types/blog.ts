import { User } from "next-auth";

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  authorId: string;
  author: User;
  date: Date;
  readTime: string | null;
  categoryId: string;
  category: Category;
  tags: string[];
  image: string | null;
  content: string;
  likes: Like[];
  views: View[];
  savedBy: User[];
  comments: Comment[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Category {
  id: string;
  name: string;
  description?: string | null;
  icon?: string | null;
}

export interface Author {
  id: string;
  name: string;
  avatar?: string | null;
  bio?: string | null;
  twitter?: string | null;
  github?: string | null;
  linkedin?: string | null;
  userId?: string | null;
}

export interface Comment {
  id: string;
  content: string;
  authorId: string;
  postId: string;
  parentId?: string | null;
  createdAt: Date;
  updatedAt: Date;

  replies?: Comment[];
  author?: User;
}

export interface Like {
  id: string;
  userId: string;
  postId: string;
  createdAt: Date;
}
export interface View {
  id: string;
  userId: string;
  postId: string;
  createdAt: Date;
}

