export const AI_PROMPTS = {
  CONTENT_QUALITY_ASSESSMENT: `
You are a senior content editor for a technical blog. Assess the quality of this blog post content and determine if it's ready for publication.

CONTENT TO ASSESS:
"{{CONTENT}}"

EVALUATION CRITERIA (Rate 1-10):
1. TECHNICAL ACCURACY: Is the information correct and up-to-date?
2. CLARITY: Is it easy to understand for the target audience?
3. COMPLETENESS: Does it thoroughly cover the topic?
4. STRUCTURE: Is it well-organized with proper headings/flow?
5. ENGAGEMENT: Is it interesting and valuable to developers?
6. CODE QUALITY: Are code examples clear, correct, and well-formatted?
7. PRACTICAL VALUE: Does it provide actionable insights?
8. LENGTH: Is it substantial enough to be valuable?

SCORING GUIDE:
- 8-10: Excellent, publish immediately
- 6-7: Good, minor improvements needed
- 4-5: Average, needs significant improvement
- 1-3: Poor, major revision required

MINIMUM PUBLISHABLE SCORE: 5

RESPOND WITH ONLY THIS JSON FORMAT:
{
  "score": 7,
  "feedback": "Brief overall assessment of content quality",
  "isPublishable": true,
  "improvements": ["specific improvement suggestion 1", "specific improvement suggestion 2"]
}`,

  POST_SUGGESTIONS: `
You are an expert content strategist and SEO specialist. Analyze the following blog post content and generate optimized metadata WITH quality assessment.

CONTENT TO ANALYZE:
"{{CONTENT}}"

REQUIREMENTS:
1. TITLE: Create a compelling, click-worthy title that's SEO-optimized (40-60 characters ideal)
2. EXCERPT: Write a compelling meta description that encourages clicks (150-160 characters max)
3. TAGS: Generate 4-6 highly relevant, searchable tags (lowercase, use hyphens for multi-word tags)
4. CATEGORY: Choose the MOST specific category from these options ONLY: "programming", "tutorial", "web-development", "technology"
5. SLUG: Create an SEO-friendly URL slug (lowercase, hyphens only, 3-5 words max)
6. QUALITY SCORE: Rate content quality 1-10 (5+ is publishable)
7. QUALITY FEEDBACK: Brief assessment of content quality

QUALITY CRITERIA:
- Technical accuracy and completeness
- Clarity and structure
- Practical value for developers
- Proper length and depth

RESPOND WITH ONLY THIS JSON FORMAT (no markdown, no explanations):
{
  "title": "Your SEO-optimized title here",
  "excerpt": "Compelling meta description under 160 chars",
  "tags": ["specific-tag", "broad-tag", "tech-stack", "concept"],
  "category": "most-specific-category",
  "slug": "seo-friendly-url-slug",
  "qualityScore": 7,
  "qualityFeedback": "Brief quality assessment",
  "isPublishable": true
}`,

  CONTENT_IMPROVEMENT: `
You are a senior technical writer specializing in developer content. Improve the following blog post content:

ORIGINAL CONTENT:
"{{CONTENT}}"

IMPROVEMENT GUIDELINES:
- Enhance clarity and technical accuracy
- Add code examples where appropriate
- Improve structure with proper headings (##, ###)
- Make it more engaging for developers
- Add actionable insights and best practices
- Ensure proper markdown formatting
- Keep the original intent and technical depth

FORMATTING REQUIREMENTS:
- Use proper markdown syntax
- Include code blocks with language specification
- Add relevant emojis for better readability
- Structure with clear headings and subheadings

Return only the improved markdown content, no additional explanations.`,

  TAG_GENERATION: `
Generate 4-6 highly relevant, searchable tags for this technical content:

"{{CONTENT}}"

REQUIREMENTS:
- Tags should be lowercase with hyphens for multi-word tags
- Include both specific technical terms and broader categories
- Focus on technologies, concepts, and methodologies mentioned
- Ensure tags are commonly searched by developers
- Avoid generic tags like "coding" or "programming" unless highly relevant

Examples of good tags: "react-hooks", "typescript", "api-design", "performance-optimization", "docker", "microservices"

Return ONLY a JSON array of strings: ["tag1", "tag2", "tag3"]`,
};

// Utility function to replace placeholders in prompts
export const formatPrompt = (
  template: string,
  replacements: Record<string, string>
): string => {
  let result = template;
  Object.entries(replacements).forEach(([key, value]) => {
    result = result.replace(new RegExp(`{{${key}}}`, "g"), value);
  });
  return result;
};
