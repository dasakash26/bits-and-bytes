export interface Comment {
  id: string;
  author: {
    name: string;
    avatar?: string;
    username: string;
  };
  content: string;
  timestamp: Date;
  likes: number;
  isLiked: boolean;
  replies?: Comment[];
}

export const mockComments: Comment[] = [
  {
    id: "1",
    author: {
      name: "Alex Johnson",
      username: "alexj",
      avatar:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    },
    content: "Great article! Really helped me understand the concepts better.",
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
    likes: 5,
    isLiked: false,
    replies: [
      {
        id: "1-1",
        author: {
          name: "Sarah Chen",
          username: "sarahc",
          avatar:
            "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
        },
        content: "I agree! The examples were particularly helpful.",
        timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000),
        likes: 2,
        isLiked: true,
      },
    ],
  },
  {
    id: "2",
    author: {
      name: "Mike Rodriguez",
      username: "miker",
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    },
    content:
      "Thanks for sharing this! I've been looking for this information everywhere.",
    timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000),
    likes: 8,
    isLiked: false,
  },
];
