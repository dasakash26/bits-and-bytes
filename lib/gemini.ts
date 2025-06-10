import { GoogleGenerativeAI } from "@google/generative-ai";

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

  return {
    title,
    excerpt,
    content: prompt,
    tags,
    category,
  };
};

export const generatePostSuggestions = async (
  prompt: string
): Promise<PostSuggestion> => {
  if (!genAI || !API_KEY) {
    console.warn("Gemini API key not configured, using fallback suggestions");
    return generateFallbackSuggestions(prompt);
  }

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const enhancedPrompt = `
      Analyze the following blog post content and generate improved metadata for it: "${prompt}"
      
      Instructions:
      1. Create a compelling, SEO-friendly title (different from any existing title in the content)
      2. Write a concise excerpt that summarizes the main points (2-3 sentences max)
      3. Suggest 3-5 relevant tags
      4. Assign the most appropriate category from: programming, tutorial, web-development, technology
      5. Do NOT include the original content in your response
      
      Respond ONLY with valid JSON in this exact format:
      {
        "title": "Your generated title here",
        "excerpt": "Your generated excerpt here",
        "content": "Keep original content as-is",
        "tags": ["tag1", "tag2", "tag3"],
        "category": "most-appropriate-category"
      }
      
      Important: Return ONLY the JSON object, no markdown formatting, no explanations.
    `;

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

    // Ensure we keep the original content
    suggestion.content = prompt;

    return suggestion;
  } catch (error) {
    console.error("Error generating post suggestions:", error);
    console.warn("Falling back to basic suggestions");
    return generateFallbackSuggestions(prompt);
  }
};

export const improveContent = async (content: string): Promise<string> => {
  if (!genAI || !API_KEY) {
    throw new Error("Gemini API key is not configured");
  }

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    const prompt = `
      Improve the following blog post content by making it more engaging, well-structured, and informative:
      
      "${content}"
      
      Please:
      - Enhance clarity and readability
      - Add relevant examples if needed
      - Improve structure with proper headings
      - Make it more engaging for a tech community
      - Keep the original intent and main points
      
      Return only the improved content without any additional formatting or explanations.
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;

    return response.text();
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
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    const prompt = `
      Generate 5-8 relevant tags for the following content:
      "${content}"
      
      Return only a JSON array of strings like: ["tag1", "tag2", "tag3"]
      Tags should be relevant to programming, technology, and the specific content topic.
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    return JSON.parse(text.trim());
  } catch (error) {
    console.error("Error generating tags:", error);
    return ["programming", "technology", "development"];
  }
};
