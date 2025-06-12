import { submitCommentAction } from "@/app/actions/comment.actions";

export const handleAddComment = async (
  postId: string,
  content: string,
  parentId: string | null
) => {
  if (!content.trim() || !postId) return;
  try {
    console.log("Adding comment:", { postId, content });
    await submitCommentAction(postId, content, parentId);
  } catch (error) {
    console.error("Error adding comment:", error);
  }
};

export const handleLikeComment = (commentId: string) => {
  console.log("Liking comment:", commentId);
  // TODO: Implement like functionality
};
