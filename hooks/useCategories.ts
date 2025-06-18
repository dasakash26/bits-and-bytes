import { useState, useEffect } from "react";
import { Category } from "../types/blog";

export const useCategories = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setIsLoading(true);
        console.log("Fetching categories from API...");
        const res = await fetch("/api/category");
        const defaultCategories = await res.json();
        setCategories(defaultCategories);
      } catch (error) {
        console.error("Error fetching categories:", error);
        setCategories([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCategories();
  }, []);

  return { categories, isLoading };
};
