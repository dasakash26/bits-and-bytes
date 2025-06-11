export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string| null; // Optional excerpt for SEO and previews
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
  commentCount: number;
  viewCount: number;
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

export type BlogPosts = BlogPost[];
export type Categories = Category[];
