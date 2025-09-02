// AI and content generation constants
export const MODEL = "gpt-4o-mini";
export const TOOL = "web_search";
export const ROLE_USER = "user";
export const ROLE_ASSISTANT = "assistant";
export const INDUSTRY = "private piano teaching";
export const SOCIAL_MEDIA = ["LinkedIn", "Facebook", "blog"];
export const MESSAGE = "message";
export const OUTPUT_TEXT = "output_text";
export const EVERGREEN = "Evergreen";
export const TRENDING = "Trending";
export const SUGGEST_TOPICS_PROMPT = "You are a senior social strategist; generate exactly 4 social media suitable topic titles for the {{industry}} sector in British English for Australia - two Evergreen FAQs and two Trending items; when web search is available, ground the Trending items in Australian interest from the last 90 days and ignore sources older than 120 days; never include years or dates in any title; each title must be 8-12 words, specific, non-overlapping, audience-centred, no hashtags, no em dashes - use single hyphen, and end each title with [Evergreen] or [Trending]; output only a numbered list of the four titles. Keep topics specific, not generic. Anchor them in audience concerns, myths, or hot issues. Do not generate the full article, only the 4 topic titles. Always adapt phrasing to be suitable for Facebook posts that spark curiosity and interest. Output - A simple numbered list with 4 topic titles. - Each title should end with its label in brackets: [Evergreen] or [Trending]."

// Validate that the API key is loaded
if (!process.env.OPENAI_API_KEY) {
  console.error('❌ OPENAI_API_KEY not found in environment variables')
  console.error('Make sure .env.local contains: OPENAI_API_KEY=your_key_here')
}
>>>>>>> d946629 (parameterised topic:suggest prompt)
export const OPENAI_BASE_URL = "https://api.openai.com/v1";
export const OPENAI_RESPONSE_API = `${OPENAI_BASE_URL}/responses`;