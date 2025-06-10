import { useState, useEffect } from "react";
import { Categories } from "../types/blog";
import { defaultCategories } from "../data/categories";

export const useCategories = () => {
  const [categories, setCategories] = useState<Categories>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setIsLoading(true);
        // Simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 300));
        setCategories(defaultCategories);
      } catch (error) {
        console.error("Error fetching categories:", error);
        setCategories(defaultCategories);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCategories();
  }, []);

  return { categories, isLoading };
};
