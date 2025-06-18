import { BlogPost } from "./blog";

export interface User {
  id: string;
  name?: string;
  email: string;
  emailVerified?: Date;
  image?: string;
  username?: string;
  bio?: string;
  title?: string;
  location?: string;
  website?: string;
  twitter?: string;
  github?: string;
  linkedin?: string;
  postsCount: number;
  badges: string[];
  createdAt: Date;
  updatedAt: Date;
  posts?: BlogPost[];
}

export interface UserStats {
  totalViews: number;
  totalLikes: number;
  totalComments: number;
  totalShares: number;
}
