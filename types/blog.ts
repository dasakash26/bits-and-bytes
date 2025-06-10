export interface BlogPost {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  author: string;
  date: string;
  readTime: string;
  category: string;
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
  social?: {
    twitter?: string;
    github?: string;
    linkedin?: string;
  };
}

export type BlogPosts = BlogPost[];
export type Categories = Category[];
