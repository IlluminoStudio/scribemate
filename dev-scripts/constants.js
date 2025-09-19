import { randomUUID, randomInt } from "crypto";

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

// Random generation utilities
export const generateRandomGuid = () => randomUUID();
export const generateRandomInt = (min = 1000, max = 9999) =>
  randomInt(min, max);

// Creative modifiers for topic generation
const CREATIVE_MODIFIERS = [
  "unexpected angle",
  "personal story",
  "behind-the-scenes",
  "myth-busting",
  "beginner-friendly",
  "advanced technique",
  "common mistake",
  "success story",
  "seasonal twist",
  "cultural perspective",
  "historical context",
  "future-focused",
  "practical tip",
  "emotional connection",
  "scientific approach",
  "creative method",
  "step-by-step guide",
  "expert insight",
  "real-world example",
  "quick win",
  "deep dive",
  "contrarian view",
  "trending topic",
  "evergreen wisdom",
  "case study",
  "pro tip",
  "hidden gem",
  "industry secret",
  "beginner mistake",
  "expert level",
  "time-saving hack",
  "game-changer",
  "underrated approach",
  "overrated myth",
  "insider knowledge",
  "fresh perspective",
  "counterintuitive strategy",
  "playful analogy",
  "thought experiment",
  "ethical dilemma",
  "unexpected comparison",
  "sensory experience",
  "storytelling metaphor",
  "extreme scenario",
  "role reversal",
  "crowd-sourced insight",
  "overlooked detail",
  "humorous twist",
  "failure analysis",
  "risky move",
  "alternative path",
  "origin story",
  "long-term impact",
  "cross-disciplinary link",
  "visual explanation",
  "what-if scenario",
  "Two Truths and a Lie",
  "Unsolved Mystery",
  "Parallel Universe Version",
  "Question Everything",
  "The \"Third Thing\"",
  "Cost-Benefit Breakdown",
  "Guilty Pleasure Defense",
  "The \"Why\" Behind the \"What\"",
  "Speculative Fiction Lens",
  "Deconstructed Concept",
  "The Perfect Storm",
  "Unspoken Rule",
  "The Moment It Clicked",
  "Tribal Knowledge",
  "Socratic Dialogue",
  "The Price of Admission",
  "Through a Child's Eyes",
  "The Anti-Manual",
  "The Butterfly Effect",
  "A Day in the Life",
  "reverse engineering",
  "micro-moment focus",
  "analogy from nature",
  "childlike perspective",
  "rapid-fire insights",
  "minimalist approach",
  "paradox spotlight",
  "habit formation lens",
  "data-driven revelation",
  "symbolic interpretation",
  "cultural mash-up",
  "rule-breaking experiment",
  "outsider's viewpoint",
  "aspirational vision",
  "collective memory",
  "unexpected consequence",
  "design thinking lens",
  "survival guide format",
  "origin of misconception",
  "turning point moment",
];

export const generateRandomModifiers = () => {
  // Pick 4 random indices from the array
  const indices = new Set();
  while (indices.size < 4) {
    indices.add(randomInt(0, CREATIVE_MODIFIERS.length - 1));
  }
  return Array.from(indices)
    .map((i) => CREATIVE_MODIFIERS[i])
    .join(", ");
};

// CORS configuration
export const PRODUCTION_DOMAIN = "https://scribemate.jialinwang.pro";
export const LOCAL_DOMAIN = "http://localhost:3001";
export const MOCKAROO_DOMAIN = "https://my.api.mockaroo.com";
export const ALLOWED_ORIGINS = [
  PRODUCTION_DOMAIN,
  "http://localhost:3000",
  "http://localhost:5173", // Vite default port
];

export const SAMPLE_TONE_GUIDE =
  "The author's tone is conversational and enthusiastic, characterized by an informal and personal voice. Sentence structure varies between short and medium lengths, contributing to a relaxed feel, and the vocabulary is accessible and straightforward. Punctuation habits include the use of exclamation points to express excitement, while the overall style employs relatable and encouraging language to engage readers. \n\nvoice:first-person; tone_adjectives:conversational, enthusiastic; sentence_length:varied; punctuation_habits:casual with exclamation points; vocabulary_level:basic; rhetorical_devices:anecdote; formatting_habits:none; dos:use clear explanations, be relatable; donts:use jargon, sound overly formal; sample_paragraph:When the sun sets, the sky transforms into a canvas of colors. Birds return to their nests, filling the air with soft chirps. It is a peaceful time to reflect on the day and plan for tomorrow.";
export const TONE_GUIDE =
  "a social media post for {{social_media}} with tone aligned to platform norms: Facebook - conversational and community-focused, LinkedIn - professional and value-driven, Blog - informative and reflective; ensure clarity, engagement, and audience alignment.";

export const SUGGEST_TOPICS_PROMPT = `SeedGUID: {{RANDOM_GUID}}; SeedInt: {{RANDOM_INT}}. Modifiers: {{RAND_MODIFIERS}}. Use each modifier exactly once to give each title a distinct creative twist. Do not include the seeds, modifiers, dates or times in the output.
You are a senior social strategist; generate exactly 4 social media suitable topic titles for the {{industry}} industry in British English for Australia - 2 ${EVERGREEN} FAQs and 2 ${TRENDING} items. Each of the 4 titles should use a different angle. Label the angle in your head only; do not print it. When web search is available, ground the ${TRENDING} items in Australian interest from the last 120 days and ignore sources older than 180 days; never include years or dates in any title; each title must be 8-12 words, specific, non-overlapping, audience-centred, no hashtags, no em dashes - use single hyphen; do not generate any topics that are listed in the following list (topics separated by semicolons): <<< {{DO_NOT_GEN_LIST}} >>>. output only a 4-line list in the format: ${EVERGREEN}|topic text or ${TRENDING}|topic text, with no extra characters or numbering.`;
export const GENERATE_POST_PROMPT = `Write a {{social_media}} post of less than {{max_word_count}} words about '{{topic}}'; Additional context: {{additional_context}}; use the web_search tool to verify the most up-to-date techniques and products, but under no circumstances are you allowed to include URLs, links, web addresses, or citations. This is a strict rule: if a source contains them, you must delete them entirely. Do not reference sources, websites, or publications in any form. The output must contain only plain text paragraphs with no links, citations, metadata, or references of any kind. Use the writing style guide below to shape the overall tone, rhythm, and expression. The sample_paragraph in the guide is only a tonal reference for feel and flow, not for content – do not copy or adapt its ideas. Ensure the article reads as natural and human-like, avoiding mechanical or formulaic phrasing. Output only the article text, with no notes or metadata. Writing style guide: {{tone_guide}}`;

export const OPENAI_BASE_URL = "https://api.openai.com/v1";
export const OPENAI_RESPONSE_API = `${OPENAI_BASE_URL}/responses`;
