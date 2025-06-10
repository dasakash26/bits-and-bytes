export interface User {
  id: string;
  name: string;
  email: string;
  username: string;
  avatar: string;
  bio?: string;
  title?: string;
  location?: string;
  website?: string;
  twitter?: string;
  github?: string;
  linkedin?: string;
  joinedDate: string;
  followersCount: number;
  followingCount: number;
  postsCount: number;
  isVerified?: boolean;
  badges?: string[];
}

export interface UserStats {
  totalViews: number;
  totalLikes: number;
  totalComments: number;
  totalShares: number;
}
