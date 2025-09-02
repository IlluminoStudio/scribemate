import { 
  MODEL, 
  TOOL, 
  ROLE_USER, 
  OPENAI_RESPONSE_API,
  SUGGEST_TOPICS_PROMPT
} from '../../../dev-scripts/constants.js'
import { log, logError } from '../../../lib/consoleLogger.js'

/**
 * POST /api/v1/topics:suggest
 * Suggest trending social media topics for an industry
 */
export default async function suggestTopics(req, res) {
  try {
    // Get API key from environment variables at runtime
    const OPENAI_API_KEY = process.env.OPENAI_API_KEY
    
    if (!OPENAI_API_KEY) {
      logError('OPENAI_API_KEY not found in environment variables')
      return res.status(500).json({
        status: 'error',
        message: 'OpenAI API key not configured'
      })
    }
    
    // Validate request body
    const { industry } = req.body
    
    if (!industry || typeof industry !== 'string') {
      logError(`Validation failed - industry: ${industry}, type: ${typeof industry}`)
      return res.status(400).json({
        status: 'error',
        message: 'Industry parameter is required and must be a string'
      })
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
          type: TOOL
        }
      ],
      input: [
        {
          role: ROLE_USER,
          content: [
            {
              type: "input_text",
              text: promptText
            }
          ]
        }
      ]
    }

    // Call OpenAI API
    const response = await fetch(OPENAI_RESPONSE_API, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${OPENAI_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(openaiRequest)
    })

    if (!response.ok) {
      const errorText = await response.text()
      logError(`OpenAI API error: ${response.status} - ${errorText}`)
      return res.status(500).json({
        status: 'error',
        message: 'Failed to generate topic suggestions'
      })
    }

    const openaiData = await response.json()
    
    // Debug: Log the raw OpenAI response
    log(`=== OPENAI RESPONSE ===`)
    log(`Raw response: ${JSON.stringify(openaiData, null, 2)}`)
    log(`=======================`)
    
    // Extract topics from OpenAI response
    let topics = []
    if (openaiData.output && openaiData.output.length > 0) {
      const content = openaiData.output[0].content
      if (content && content.length > 0 && content[0].text) {
        // Debug: Log the raw text content
        log(`=== RAW TEXT CONTENT ===`)
        log(`Content: ${content[0].text}`)
        log(`========================`)
        
        // Split by newlines and clean up
        topics = content[0].text
          .split('\n')
          .map(topic => topic.trim())
          .filter(topic => topic.length > 0)
          .slice(0, 4) // Limit to 4 topics as per prompt requirement
      }
    }

    // Fallback if no topics extracted
    if (topics.length === 0) {
      topics = [
        `Latest trends in ${industry} [Trending]`,
        `Common challenges in ${industry} [Evergreen]`,
        `Best practices for ${industry} [Evergreen]`,
        `Future of ${industry} [Trending]`
      ]
    }

    log(`Generated ${topics.length} topics for industry: ${industry}`)

    // Return success response
    res.status(200).json({
      status: 'success',
      topics: topics,
      created_at: new Date().toISOString()
    })

  } catch (error) {
    logError(`Error in suggestTopics: ${error.message}`)
    logError(`Stack trace: ${error.stack}`)
    
    res.status(500).json({
      status: 'error',
      message: 'Internal server error while generating topic suggestions'
    })
  }
}
