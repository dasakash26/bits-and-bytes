import { useState } from "react";

interface AIEnhancementOptions {
  improveReadability?: boolean;
  addStructure?: boolean;
  suggestTags?: boolean;
  generateExcerpt?: boolean;
  fixGrammar?: boolean;
}

export const useAIEnhancement = () => {
  const [isEnhancing, setIsEnhancing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const enhanceContent = async (
    content: string,
    options: AIEnhancementOptions = {}
  ): Promise<string> => {
    setIsEnhancing(true);
    setError(null);

    try {
      // Simulate API call to AI service
      await new Promise((resolve) => setTimeout(resolve, 2000));

      let enhancedContent = content;

      // Mock AI enhancements based on options
      if (options.improveReadability) {
        enhancedContent = enhancedContent.replace(/\. /g, ".\n\n");
      }

      if (options.addStructure && !content.includes("#")) {
        enhancedContent = `# Enhanced Content\n\n${enhancedContent}\n\n## Summary\n\nThis content has been enhanced for better readability and structure.`;
      }

      if (options.fixGrammar) {
        // Simple grammar fixes (in real implementation, this would use an AI service)
        enhancedContent = enhancedContent
          .replace(/\bi\b/g, "I")
          .replace(
            /\b(javascript|typescript|react)\b/gi,
            (match) =>
              match.charAt(0).toUpperCase() + match.slice(1).toLowerCase()
          );
      }

      return enhancedContent;
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "AI enhancement failed";
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setIsEnhancing(false);
    }
  };

  const generateExcerpt = async (
    title: string,
    content: string
  ): Promise<string> => {
    setIsEnhancing(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Mock excerpt generation
      const words = content.split(" ").slice(0, 20).join(" ");
      return `${words}... An insightful article about ${title.toLowerCase()}.`;
    } catch (err) {
      setError("Failed to generate excerpt");
      throw err;
    } finally {
      setIsEnhancing(false);
    }
  };

  const suggestTags = async (
    title: string,
    content: string,
    category?: string
  ): Promise<string[]> => {
    setIsEnhancing(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 800));

      // Mock tag suggestions based on content analysis
      const commonTechTerms = [
        "javascript",
        "react",
        "node",
        "typescript",
        "api",
        "web",
        "development",
        "programming",
        "tutorial",
        "guide",
      ];
      const contentLower = (title + " " + content).toLowerCase();

      const suggestedTags = commonTechTerms
        .filter((term) => contentLower.includes(term))
        .slice(0, 5);

      // Add category-based tags
      if (category) {
        const categoryTags = {
          programming: ["coding", "software"],
          "web-development": ["frontend", "backend"],
          tutorial: ["howto", "learning"],
        };
        const additional =
          categoryTags[category as keyof typeof categoryTags] || [];
        suggestedTags.push(...additional.slice(0, 2));
      }

      return [...new Set(suggestedTags)].slice(0, 6);
    } catch (err) {
      setError("Failed to suggest tags");
      throw err;
    } finally {
      setIsEnhancing(false);
    }
  };

  return {
    enhanceContent,
    generateExcerpt,
    suggestTags,
    isEnhancing,
    error,
    clearError: () => setError(null),
  };
};
