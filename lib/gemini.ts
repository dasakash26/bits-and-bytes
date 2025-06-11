import { GoogleGenerativeAI } from "@google/generative-ai";
import { AI_PROMPTS, formatPrompt } from "./prompts";

const API_KEY =
  process.env.GEMINI_API_KEY || process.env.NEXT_PUBLIC_GEMINI_API_KEY;

// Don't throw error immediately, handle it in the functions
const genAI = API_KEY ? new GoogleGenerativeAI(API_KEY) : null;

export interface PostSuggestion {
  title: string;
  excerpt: string;
  content: string;
  tags: string[];
  category: string;
  slug?: string;
  readTime?: string;
  qualityScore?: number;
  qualityFeedback?: string;
  isPublishable?: boolean;
}

export interface ContentQualityAssessment {
  score: number; // 1-10 scale
  feedback: string;
  isPublishable: boolean;
  improvements: string[];
}

const generateFallbackSuggestions = (prompt: string): PostSuggestion => {
  // Generate basic suggestions based on content analysis
  const contentLower = prompt.toLowerCase();

  let category = "technology";
  let title = "Understanding Your Content";
  let tags = ["development", "technology"];

  if (contentLower.includes("react") || contentLower.includes("javascript")) {
    category = "programming";
    title = "JavaScript Development Guide";
    tags = ["javascript", "react", "programming", "development"];
  } else if (
    contentLower.includes("tutorial") ||
    contentLower.includes("guide")
  ) {
    category = "tutorial";
    title = "Step-by-Step Tutorial";
    tags = ["tutorial", "guide", "learning"];
  } else if (
    contentLower.includes("web") ||
    contentLower.includes("frontend")
  ) {
    category = "web-development";
    title = "Web Development Insights";
    tags = ["web", "frontend", "development"];
  }

  const excerpt =
    prompt.length > 150
      ? `${prompt.substring(0, 150)}... A comprehensive guide for developers.`
      : `${prompt} - A comprehensive guide for developers.`;

  // Generate slug from title
  const slug = title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");

  // Calculate read time
  const wordsPerMinute = 200;
  const wordCount = prompt.trim().split(/\s+/).length;
  const minutes = Math.ceil(wordCount / wordsPerMinute);
  const readTime = `${minutes} min read`;

  return {
    title,
    excerpt,
    content: prompt,
    tags,
    category,
    slug,
    readTime,
  };
};

export const assessContentQuality = async (
  content: string
): Promise<ContentQualityAssessment> => {
  if (!genAI || !API_KEY) {
    // Fallback quality assessment
    const wordCount = content.trim().split(/\s+/).length;
    const hasCode = content.includes("```") || content.includes("`");
    const hasStructure = content.includes("#") || content.includes("\n\n");

    let score = 3; // Base score
    if (wordCount > 200) score += 1;
    if (wordCount > 500) score += 1;
    if (hasCode) score += 2;
    if (hasStructure) score += 1;
    if (content.length > 1000) score += 1;

    score = Math.min(score, 10);

    return {
      score,
      feedback:
        score >= 5
          ? "Content meets basic publishing standards."
          : "Content needs improvement before publishing.",
      isPublishable: score >= 5,
      improvements:
        score < 5
          ? [
              "Add more detailed content",
              "Include code examples",
              "Improve structure with headings",
            ]
          : [],
    };
  }

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = formatPrompt(AI_PROMPTS.CONTENT_QUALITY_ASSESSMENT, {
      CONTENT: content,
    });

    const result = await model.generateContent(prompt);
    const response = await result.response;
    let text = response.text().trim();

    // Clean up response
    text = text
      .replace(/```json\n?/g, "")
      .replace(/```\n?/g, "")
      .trim();

    const assessment = JSON.parse(text);

    // Validate response
    assessment.score = Math.max(1, Math.min(10, Number(assessment.score) || 1));
    assessment.isPublishable = assessment.score >= 5;
    assessment.improvements = Array.isArray(assessment.improvements)
      ? assessment.improvements.slice(0, 5)
      : [];

    return assessment;
  } catch (error) {
    console.error("Error assessing content quality:", error);

    // Fallback assessment
    const wordCount = content.trim().split(/\s+/).length;
    const score = wordCount > 300 ? 6 : 4;

    return {
      score,
      feedback:
        "Unable to perform detailed quality assessment. Basic content check completed.",
      isPublishable: score >= 5,
      improvements:
        score < 5 ? ["Expand content with more details", "Add examples"] : [],
    };
  }
};

export const generatePostSuggestions = async (
  prompt: string
): Promise<PostSuggestion> => {
  if (!genAI || !API_KEY) {
    console.warn("Gemini API key not configured, using fallback suggestions");
    const fallback = generateFallbackSuggestions(prompt);

    // Add quality assessment to fallback
    const qualityAssessment = await assessContentQuality(prompt);
    return {
      ...fallback,
      qualityScore: qualityAssessment.score,
      qualityFeedback: qualityAssessment.feedback,
      isPublishable: qualityAssessment.isPublishable,
    };
  }

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const enhancedPrompt = formatPrompt(AI_PROMPTS.POST_SUGGESTIONS, {
      CONTENT: prompt,
    });

    const result = await model.generateContent(enhancedPrompt);
    const response = await result.response;
    let text = response.text().trim();

    // Clean up any markdown formatting
    text = text
      .replace(/```json\n?/g, "")
      .replace(/```\n?/g, "")
      .trim();

    // Parse the JSON response
    const suggestion = JSON.parse(text);

    // Ensure we keep the original content and add calculated fields
    suggestion.content = prompt;

    // Calculate read time if not provided
    if (!suggestion.readTime) {
      const wordsPerMinute = 200;
      const wordCount = prompt.trim().split(/\s+/).length;
      const minutes = Math.ceil(wordCount / wordsPerMinute);
      suggestion.readTime = `${minutes} min read`;
    }

    // Validate quality score
    suggestion.qualityScore = Math.max(
      1,
      Math.min(10, Number(suggestion.qualityScore) || 5)
    );
    suggestion.isPublishable = suggestion.qualityScore >= 5;

    // Validate and clean tags
    if (Array.isArray(suggestion.tags)) {
      suggestion.tags = suggestion.tags
        .map((tag: string) => tag.toLowerCase().trim())
        .filter((tag: string) => tag.length > 0)
        .slice(0, 6); // Limit to 6 tags max
    }

    // Validate category
    const validCategories = [
      "programming",
      "tutorial",
      "web-development",
      "technology",
    ];
    if (!validCategories.includes(suggestion.category)) {
      suggestion.category = "technology"; // fallback
    }

    // Clean slug
    if (suggestion.slug) {
      suggestion.slug = suggestion.slug
        .toLowerCase()
        .replace(/[^a-z0-9-]/g, "")
        .replace(/-+/g, "-")
        .replace(/(^-|-$)/g, "");
    }

    return suggestion;
  } catch (error) {
    console.error("Error generating post suggestions:", error);
    console.warn("Falling back to basic suggestions");
    const fallback = generateFallbackSuggestions(prompt);

    // Add quality assessment to fallback
    const qualityAssessment = await assessContentQuality(prompt);
    return {
      ...fallback,
      qualityScore: qualityAssessment.score,
      qualityFeedback: qualityAssessment.feedback,
      isPublishable: qualityAssessment.isPublishable,
    };
  }
};

export const improveContent = async (content: string): Promise<string> => {
  if (!genAI || !API_KEY) {
    throw new Error("Gemini API key is not configured");
  }

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = formatPrompt(AI_PROMPTS.CONTENT_IMPROVEMENT, {
      CONTENT: content,
    });

    const result = await model.generateContent(prompt);
    const response = await result.response;

    return response.text().trim();
  } catch (error) {
    console.error("Error improving content:", error);
    throw new Error("Failed to improve content");
  }
};

export const generateTags = async (content: string): Promise<string[]> => {
  if (!genAI || !API_KEY) {
    return ["programming", "technology", "development"];
  }

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = formatPrompt(AI_PROMPTS.TAG_GENERATION, {
      CONTENT: content,
    });

    const result = await model.generateContent(prompt);
    const response = await result.response;
    let text = response.text().trim();

    // Clean up response
    text = text
      .replace(/```json\n?/g, "")
      .replace(/```\n?/g, "")
      .trim();

    const tags = JSON.parse(text);

    // Validate and clean tags
    if (Array.isArray(tags)) {
      return tags
        .map((tag: string) => tag.toLowerCase().trim())
        .filter((tag: string) => tag.length > 0 && tag.length < 30)
        .slice(0, 6);
    }

    return ["programming", "technology", "development"];
  } catch (error) {
    console.error("Error generating tags:", error);
    return ["programming", "technology", "development"];
  }
};

// New utility function for generating SEO-optimized slugs
export const generateSlug = (title: string): string => {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/(^-|-$)/g, "")
    .substring(0, 60); // Limit slug length
};

// New utility function for calculating read time
export const calculateReadTime = (content: string): string => {
  const wordsPerMinute = 200;
  const wordCount = content.trim().split(/\s+/).length;
  const minutes = Math.ceil(wordCount / wordsPerMinute);
  return `${minutes} min read`;
};
