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

// CORS configuration
export const PRODUCTION_DOMAIN = "https://scribemate.jialinwang.pro";
export const ALLOWED_ORIGINS = [
  PRODUCTION_DOMAIN,
  'http://localhost:3000',
  'http://localhost:5173' // Vite default port
];
export const GENERATE_POST_STYLE_GUIDE = "The author's tone is conversational and enthusiastic, characterized by an informal and personal voice. Sentence structure varies between short and medium lengths, contributing to a relaxed feel, and the vocabulary is accessible and straightforward. Punctuation habits include the use of exclamation points to express excitement, while the overall style employs relatable and encouraging language to engage readers. \n\nvoice:first-person; tone_adjectives:conversational, enthusiastic; sentence_length:varied; punctuation_habits:casual with exclamation points; vocabulary_level:basic; rhetorical_devices:anecdote; formatting_habits:none; dos:use clear explanations, be relatable; donts:use jargon, sound overly formal; sample_paragraph:When the sun sets, the sky transforms into a canvas of colors. Birds return to their nests, filling the air with soft chirps. It is a peaceful time to reflect on the day and plan for tomorrow."

export const SUGGEST_TOPICS_PROMPT = "You are a senior social strategist; generate exactly 4 social media suitable topic titles for the {{industry}} sector in British English for Australia - two Evergreen FAQs and two Trending items; when web search is available, ground the Trending items in Australian interest from the last 90 days and ignore sources older than 120 days; never include years or dates in any title; each title must be 8-12 words, specific, non-overlapping, audience-centred, no hashtags, no em dashes - use single hyphen, and end each title with [Evergreen] or [Trending]; output only a numbered list of the four titles. Keep topics specific, not generic. Anchor them in audience concerns, myths, or hot issues. Do not generate the full article, only the 4 topic titles. Always adapt phrasing to be suitable for Facebook posts that spark curiosity and interest. Output - A simple numbered list with 4 topic titles. - Each title should end with its label in brackets: [Evergreen] or [Trending]."
export const GENERATE_POST_PROMPT = `Write a Facebook {{social_media}} post of less than {{max_word_count}} words about '{{topic}}'; use the web_search tool to verify the most up-to-date techniques and products, but never include any URLs (http, https, www, .com, .org, etc.) or citations of any kind - if a source contains them, omit them entirely; Use the writing style guide below to shape the overall tone, rhythm, and expression. The sample_paragraph in the guide is only a tonal reference for feel and flow, not for content – do not copy or adapt its ideas. Ensure the article reads as natural and human-like, avoiding mechanical or formulaic phrasing. Output only the article text, with no notes or metadata. Writing style guide: ${GENERATE_POST_STYLE_GUIDE}`

// Validate that the API key is loaded
if (!process.env.OPENAI_API_KEY) {
  console.error('❌ OPENAI_API_KEY not found in environment variables')
  console.error('Make sure .env.local contains: OPENAI_API_KEY=your_key_here')
}
export const OPENAI_BASE_URL = "https://api.openai.com/v1";
export const OPENAI_RESPONSE_API = `${OPENAI_BASE_URL}/responses`;