import { useState } from "react";

export const usePostForm = () => {
  const [postContent, setPostContent] = useState("");
  const [postTitle, setPostTitle] = useState("");
  const [postExcerpt, setPostExcerpt] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [featuredImage, setFeaturedImage] = useState("");

  const addTag = (tag: string) => {
    if (tag && !tags.includes(tag)) {
      setTags((prev) => [...prev, tag]);
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  const handlePublish = () => {
    console.log("Publishing:", {
      title: postTitle,
      excerpt: postExcerpt,
      content: postContent,
      category: selectedCategory,
      tags,
      featuredImage,
    });

    // Reset form
    setPostContent("");
    setPostTitle("");
    setPostExcerpt("");
    setSelectedCategory("");
    setTags([]);
    setFeaturedImage("");
  };

  const isFormValid = postContent.trim() && postTitle.trim();

  return {
    postContent,
    setPostContent,
    postTitle,
    setPostTitle,
    postExcerpt,
    setPostExcerpt,
    selectedCategory,
    setSelectedCategory,
    tags,
    addTag,
    removeTag,
    featuredImage,
    setFeaturedImage,
    handlePublish,
    isFormValid,
  };
};
