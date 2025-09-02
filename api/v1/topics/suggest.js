import { 
  MODEL, 
  TOOL, 
  ROLE_USER, 
  OPENAI_API_KEY, 
  OPENAI_RESPONSE_API 
} from '../../../dev-scripts/constants.js'
import { log, logError } from '../../../lib/consoleLogger.js'

/**
 * POST /api/v1/topics:suggest
 * Suggest trending social media topics for an industry
 */
export default async function suggestTopics(req, res) {
  try {
    
    // Validate request body
    const { industry } = req.body
    
    if (!industry || typeof industry !== 'string') {
      logError(`Validation failed - industry: ${industry}, type: ${typeof industry}`)
      return res.status(400).json({
        status: 'error',
        message: 'Industry parameter is required and must be a string'
      })
    }

    // Prepare OpenAI request
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
              text: `Suggest 5 trending social media topics for the ${industry} industry. Focus on current trends, challenges, and opportunities that would engage audiences. Return only the topic titles, one per line.`
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
    
    // Extract topics from OpenAI response
    let topics = []
    if (openaiData.output && openaiData.output.length > 0) {
      const content = openaiData.output[0].content
      if (content && content.length > 0 && content[0].text) {
        // Split by newlines and clean up
        topics = content[0].text
          .split('\n')
          .map(topic => topic.trim())
          .filter(topic => topic.length > 0)
          .slice(0, 5) // Limit to 5 topics
      }
    }

    // Fallback if no topics extracted
    if (topics.length === 0) {
      topics = [
        `Latest trends in ${industry}`,
        `Common challenges in ${industry}`,
        `Best practices for ${industry}`,
        `Future of ${industry}`,
        `Success stories in ${industry}`
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
