import { 
  MODEL, 
  TOOL, 
  ROLE_USER, 
  OPENAI_RESPONSE_API,
  GENERATE_POST_PROMPT,
  ALLOWED_ORIGINS
} from '../../../dev-scripts/constants.js'
import { log, logError } from '../../../lib/consoleLogger.js'

// Fallback tone guide when none is provided
const FALLBACK_TONE_GUIDE = "The author's tone is conversational and enthusiastic, characterized by an informal and personal voice. Sentence structure varies between short and medium lengths, contributing to a relaxed feel, and the vocabulary is accessible and straightforward. Punctuation habits include the use of exclamation points to express excitement, while the overall style employs relatable and encouraging language to engage readers. \n\nvoice:first-person; tone_adjectives:conversational, enthusiastic; sentence_length:varied; punctuation_habits:casual with exclamation points; vocabulary_level:basic; rhetorical_devices:anecdote; formatting_habits:none; dos:use clear explanations, be relatable; donts:use jargon, sound overly formal; sample_paragraph:When the sun sets, the sky transforms into a canvas of colors. Birds return to their nests, filling the air with soft chirps. It is a peaceful time to reflect on the day and plan for tomorrow."

/**
 * POST /api/v1/posts:generate
 * Generate a social media post for a specific topic
 */
export default async function generatePost(req, res) {
  // CORS headers - allow both production and localhost
  const origin = req.headers.origin
  if (ALLOWED_ORIGINS.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin)
  }
  
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')

  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    return res.status(200).end()
  }

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
    const { topic, social_media, max_word_count, tone_guide } = req.body
    
    if (!topic || typeof topic !== 'string') {
      logError(`Validation failed - topic: ${topic}, type: ${typeof topic}`)
      return res.status(400).json({
        status: 'error',
        message: 'Topic parameter is required and must be a string'
      })
    }

    // Validate topic length (5-160 characters)
    if (topic.length < 5 || topic.length > 160) {
      logError(`Validation failed - topic length: ${topic.length}`)
      return res.status(400).json({
        status: 'error',
        message: 'Topic must be between 5 and 160 characters'
      })
    }

    // Validate topic contains only keyboard-typable characters
    const keyboardTypablePattern = /^[a-zA-Z0-9\s\-.,!?()]+$/
    if (!keyboardTypablePattern.test(topic)) {
      logError(`Validation failed - topic contains invalid characters: ${topic}`)
      return res.status(400).json({
        status: 'error',
        message: 'Topic must contain only keyboard-typable characters (letters, numbers, spaces, hyphens, periods, commas, exclamation marks, question marks, and parentheses)'
      })
    }
    
    if (!social_media || typeof social_media !== 'string') {
      logError(`Validation failed - social_media: ${social_media}, type: ${typeof social_media}`)
      return res.status(400).json({
        status: 'error',
        message: 'Social media parameter is required and must be a string'
      })
    }

    // Validate social_media contains only allowed values
    const allowedSocialMedia = ['facebook', 'linkedin', 'blog']
    if (!allowedSocialMedia.includes(social_media)) {
      logError(`Validation failed - invalid social media platform: ${social_media}`)
      return res.status(400).json({
        status: 'error',
        message: 'Invalid social media platform specified'
      })
    }
    
    if (!max_word_count || typeof max_word_count !== 'number' || max_word_count < 5 || max_word_count > 2000) {
      logError(`Validation failed - max_word_count: ${max_word_count}, type: ${typeof max_word_count}`)
      return res.status(400).json({
        status: 'error',
        message: 'Max word count parameter is required and must be a number between 5 and 2000'
      })
    }
    
    // tone_guide is now optional - use fallback if not provided
    let finalToneGuide = tone_guide
    
    if (!tone_guide) {
      // Use fallback tone guide with social_media substitution
      finalToneGuide = FALLBACK_TONE_GUIDE.replace('{{social_media}}', social_media)
      log(`Using fallback tone guide for social media: ${social_media}`)
    } else if (typeof tone_guide !== 'string') {
      logError(`Validation failed - tone_guide: ${tone_guide}, type: ${typeof tone_guide}`)
      return res.status(400).json({
        status: 'error',
        message: 'Tone guide parameter must be a string when provided'
      })
    } else {
      // Validate tone_guide contains only keyboard-typable characters
      if (!keyboardTypablePattern.test(tone_guide)) {
        logError(`Validation failed - tone_guide contains invalid characters: ${tone_guide}`)
        return res.status(400).json({
          status: 'error',
          message: 'Tone guide must contain only keyboard-typable characters (letters, numbers, spaces, hyphens, periods, commas, exclamation marks, question marks, and parentheses)'
        })
      }
    }

    // Prepare OpenAI request with dynamic parameter replacement
    const promptText = GENERATE_POST_PROMPT
      .replace('{{social_media}}', social_media)
      .replace('{{max_word_count}}', max_word_count.toString())
      .replace('{{topic}}', topic)
      .replace('${TONE_GUIDE}', finalToneGuide)
    
    // Debug: Log the exact prompt being sent
    log(`=== OUTGOING PROMPT ===`)
    log(`Topic: ${topic}`)
    log(`Social Media: ${social_media}`)
    log(`Max Word Count: ${max_word_count}`)
    log(`Tone Guide: ${finalToneGuide}`)
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
        message: 'Failed to generate post content'
      })
    }

    const openaiData = await response.json()
    
    // Debug: Log the raw OpenAI response
    log(`=== OPENAI RESPONSE ===`)
    log(`Raw response: ${JSON.stringify(openaiData, null, 2)}`)
    log(`=======================`)
    
    // Extract post content from OpenAI response
    let postContent = ''
    if (openaiData.output && openaiData.output.length > 0) {
      // Look for the message output (usually the second item after web_search_call)
      const messageOutput = openaiData.output.find(item => item.type === 'message')
      
      if (messageOutput && messageOutput.content && messageOutput.content.length > 0) {
        postContent = messageOutput.content[0].text
        
        // Debug: Log the raw text content
        log(`=== RAW TEXT CONTENT ===`)
        log(`Content: ${postContent}`)
        log(`========================`)
      }
    }

    // Fallback if no content extracted
    if (!postContent || postContent.trim().length === 0) {
      postContent = `Here's an engaging post about ${topic} for ${social_media}. This topic is relevant and timely, offering valuable insights for your audience. The content is crafted to be informative while maintaining an engaging tone that encourages interaction and discussion.`
    }

    // Calculate word count
    const wordCount = postContent.trim().split(/\s+/).length

    log(`Generated post content for topic: ${topic}, word count: ${wordCount}`)

    // Return success response
    res.status(200).json({
      status: 'success',
      post_content: postContent,
      word_count: wordCount,
      created_at: new Date().toISOString()
    })

  } catch (error) {
    logError(`Error in generatePost: ${error.message}`)
    logError(`Stack trace: ${error.stack}`)
    
    res.status(500).json({
      status: 'error',
      message: 'Internal server error while generating post content'
    })
  }
}
