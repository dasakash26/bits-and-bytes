export interface Comment {
  id: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  authorId: string;
  postId: string;
  parentId: string | null;
  author: {
    id: string;
    name: string | null;
    image: string | null;
    username: string | null;
  };
  replies?: Comment[];
}
