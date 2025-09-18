import {
  MODEL,
  TOOL,
  ROLE_USER,
  OPENAI_RESPONSE_API,
  SUGGEST_TOPICS_PROMPT,
  ALLOWED_ORIGINS,
  EVERGREEN,
  TRENDING,
} from "../../../dev-scripts/constants.js";
import { log, logError } from "../../../lib/consoleLogger.js";

/**
 * POST /api/v1/topics:suggest
 * Suggest trending social media topics for an industry
 */
export default async function suggestTopics(req, res) {
  // CORS headers - allow both production and localhost
  const origin = req.headers.origin;
  if (ALLOWED_ORIGINS.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
  }

  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

  // Handle preflight requests
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  try {
    // Get API key from environment variables at runtime
    const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

    if (!OPENAI_API_KEY) {
      logError("OPENAI_API_KEY not found in environment variables");
      return res.status(500).json({
        status: "error",
        message: "OpenAI API key not configured",
      });
    }

    // Validate request body
    const { industry } = req.body;

    if (!industry || typeof industry !== "string") {
      logError(
        `Validation failed - industry: ${industry}, type: ${typeof industry}`
      );
      return res.status(400).json({
        status: "error",
        message: "Industry parameter is required and must be a string",
      });
    }

    // Validate industry length (3-80 characters)
    if (industry.length < 3 || industry.length > 80) {
      logError(`Validation failed - industry length: ${industry.length}`);
      return res.status(400).json({
        status: "error",
        message: "Industry must be between 3 and 80 characters",
      });
    }

    // Validate industry contains only keyboard-typable characters
    const keyboardTypablePattern = /^[a-zA-Z0-9\s\-.,!?()]+$/;
    if (!keyboardTypablePattern.test(industry)) {
      logError(
        `Validation failed - industry contains invalid characters: ${industry}`
      );
      return res.status(400).json({
        status: "error",
        message:
          "Industry must contain only keyboard-typable characters (letters, numbers, spaces, hyphens, periods, commas, exclamation marks, question marks, and parentheses)",
      });
    }

    // Prepare OpenAI request with dynamic industry replacement
    const promptText = SUGGEST_TOPICS_PROMPT.replace('{{industry}}', industry)
    
    // Debug: Log the exact prompt being sent
    log(`=== OUTGOING PROMPT ===`)
    log(`Industry: ${industry}`)
    log(`Prompt text: ${promptText}`)
    log(`======================`)

    const openaiRequest = {
      model: MODEL,
      tools: [
        {
          type: TOOL,
        },
      ],
      temperature: 1.2,
      top_p: 0.9,
      input: [
        {
          role: ROLE_USER,
          content: [
            {
              type: "input_text",
              text: promptText,
            },
          ],
        },
      ],
    };

    // Call OpenAI API
    const response = await fetch(OPENAI_RESPONSE_API, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${OPENAI_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(openaiRequest),
    });

    if (!response.ok) {
      const errorText = await response.text();
      logError(`OpenAI API error: ${response.status} - ${errorText}`);
      return res.status(500).json({
        status: "error",
        message: "Failed to generate topic suggestions",
      });
    }

    const openaiData = await response.json();

    // Debug: Log the raw OpenAI response
    log(`=== OPENAI RESPONSE ===`);
    log(`Raw response: ${JSON.stringify(openaiData, null, 2)}`);
    log(`=======================`);

    // Extract topics from OpenAI response
    let topics = [];
    if (openaiData.output && openaiData.output.length > 0) {
      // Look for the assistant's message output
      const messageOutput = openaiData.output.find(
        (item) => item.type === "message" && item.role === "assistant"
      );

      let textContent = "";
      if (
        messageOutput &&
        messageOutput.content &&
        messageOutput.content.length > 0
      ) {
        textContent = messageOutput.content[0].text;

        // Debug: Log the raw text content
        log(`=== RAW TEXT CONTENT ===`);
        log(`Content: ${textContent}`);
        log(`========================`);
      } else {
        // Fallback: if no assistant message found, try any message type
        const fallbackMessage = openaiData.output.find(
          (item) => item.type === "message"
        );
        if (
          fallbackMessage &&
          fallbackMessage.content &&
          fallbackMessage.content.length > 0
        ) {
          textContent = fallbackMessage.content[0].text;
          log(`Using fallback message (no assistant role found)`);

          // Debug: Log the raw text content
          log(`=== RAW TEXT CONTENT ===`);
          log(`Content: ${textContent}`);
          log(`========================`);
        }
      }

      // Parse topics and extract type and content
      if (textContent) {
        const rawTopics = textContent
          .split("\n")
          .map((topic) => topic.trim())
          .filter((topic) => topic.length > 0)
          .slice(0, 4); // Limit to 4 topics as per prompt requirement

        // Parse each topic to extract type and content
        topics = rawTopics.map((rawTopic) => {
          // Remove numbering (e.g., "1. ", "2. ")
          let cleanTopic = rawTopic.replace(/^\d+\.\s*/, "");

          // Extract type from pipe format Evergreen| or Trending|
          const typeMatch = cleanTopic.match(
            new RegExp(`^(${EVERGREEN}|${TRENDING})\\|`)
          );
          const type = typeMatch ? typeMatch[1] : EVERGREEN; // Default to Evergreen if not specified

          // Remove the type brackets and quotes
          const topicText = cleanTopic
            .replace(new RegExp(`\\[${EVERGREEN}\\]`, "g"), "") // Remove [Evergreen] brackets
            .replace(new RegExp(`\\[${TRENDING}\\]`, "g"), "") // Remove [Trending] brackets
            .replace(new RegExp(`${EVERGREEN}\\|`, "g"), "") // Remove "Evergreen|" pattern
            .replace(new RegExp(`${TRENDING}\\|`, "g"), "") // Remove "Trending|" pattern
            .replace(/[\u2013\u2014]/g, "-") // Replace en dash and em dash with regular hyphen
            .replace(/^["']+|["']+$/g, "") // Remove leading/trailing quotes (one or more)
            .replace(/["']+/g, "") // Remove any remaining quotes
            .trim();

          return {
            type: type,
            topic: topicText,
          };
        });
      }
    }

    log(`Generated ${topics.length} topics for industry: ${industry}`);

    // Return success response
    res.status(200).json({
      status: "success",
      topics: topics,
      created_at: new Date().toISOString(),
    });
  } catch (error) {
    logError(`Error in suggestTopics: ${error.message}`);
    logError(`Stack trace: ${error.stack}`);

    res.status(500).json({
      status: "error",
      message: "Internal server error while generating topic suggestions",
    });
  }
}
