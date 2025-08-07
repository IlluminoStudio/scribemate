import dotenv from 'dotenv'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'
import { log, logError } from '../lib/consoleLogger.js'

// Only load .env.local in development (not on Vercel production)
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const envPath = join(__dirname, '..', '.env.local')

// Check if we're in development (not on Vercel)
const isDevelopment = process.env.NODE_ENV !== 'production' && !process.env.VERCEL

if (isDevelopment) {
  log('🔍 Development mode: Looking for .env.local at: ' + envPath)
  const result = dotenv.config({ path: envPath })

  if (result.error) {
    logError('Error loading .env.local: ' + result.error)
    process.exit(1)
  } else {
    log('✅ .env.local loaded successfully')
  }
} else {
  log('🚀 Production mode: Using Vercel environment variables')
}

// Now import other modules after environment is loaded
import express from 'express'
import cors from 'cors'

const app = express()
const PORT = process.env.PORT || 3001

// Middleware
app.use(cors())
app.use(express.json())

// Error handling middleware for JSON parsing errors
app.use((error, req, res, next) => {
  if (error instanceof SyntaxError && error.status === 400 && 'body' in error) {
    logError(`JSON parsing error: ${error.message}`)
    logError(`Request URL: ${req.url}`)
    logError(`Request method: ${req.method}`)
    return res.status(400).json({ 
      error: 'Invalid JSON in request body',
      message: error.message 
    })
  }
  next(error)
})

// Import API routes
import usersHandler from '../api/user.js'
import messageHandler from '../api/message.js'
import myMessagesHandler from '../api/my-message.js'
import myCareEventHandler from '../api/my-care-event.js'
import myClockStatusHandler from '../api/my-clock-status.js'
import careEventHandler from '../api/care-event/today.js'
import databaseTestHandler from './database-test.js'
import loginHandler from '../api/auth/login.js'
import logoutHandler from '../api/auth/logout.js'

// API routes - use specific HTTP methods to handle URL parameters properly
app.get('/api/user', usersHandler)
app.get('/api/message', messageHandler)
app.post('/api/message', messageHandler)
app.get('/api/my-message', myMessagesHandler)
app.post('/api/my-message', myMessagesHandler)
app.post('/api/my-care-event', myCareEventHandler)
app.get('/api/my-clock-status', myClockStatusHandler)
app.get('/api/care-event/today', careEventHandler)

// Auth routes
app.post('/api/auth/login', loginHandler)
app.post('/api/auth/logout', logoutHandler)

// Database connection test
app.get('/api/test', databaseTestHandler)

// API Documentation routes
app.get('/api/docs', (req, res) => {
  res.sendFile(join(__dirname, 'docs.html'))
})

app.get('/api/api.yaml', (req, res) => {
  res.setHeader('Content-Type', 'application/yaml')
  res.sendFile(join(__dirname, 'api.yaml'))
})

// Health check
app.get('/api/health', (req, res) => {
  res.json({ 
    message: 'API Server Running',
    timestamp: new Date().toISOString(),
    port: PORT,
    env: {
      hasSupabaseUrl: !!process.env.SUPABASE_URL,
      hasSupabaseKey: !!process.env.SUPABASE_SERVICE_ROLE_KEY,
      envPath: envPath
    }
  })
})

// General error handler for unhandled errors
app.use((error, req, res, next) => {
  logError(`Unhandled error: ${error.message}`)
  logError(`Request URL: ${req.url}`)
  logError(`Request method: ${req.method}`)
  logError(`Stack trace: ${error.stack}`)
  
  res.status(500).json({ 
    error: 'Internal server error',
    message: 'An unexpected error occurred'
  })
})

// Start server
app.listen(PORT, () => {
  log(`🚀 API Server running on http://localhost:${PORT}`)
  log(`📝 Available endpoints:`)
  log(`   GET  /api/health`)
  log(`   GET  /api/test`)
  log(`   GET  /api/user`)
  log(`   GET  /api/message`)
  log(`   POST /api/message`)
  log(`   GET  /api/my-message`)
  log(`   GET  /api/my-clock-status`)
  log(`   GET  /api/care-event/today`)
  log(`   POST /api/my-care-event`)
  log(`   POST /api/auth/login`)
  log(`   POST /api/auth/logout`)
  log(`📚 API Documentation:`)
  log(`   GET  /api/docs`)
  log(`   GET  /api/api.yaml`)
  log(`🔧 Environment: ${JSON.stringify({
    hasSupabaseUrl: !!process.env.SUPABASE_URL,
    hasSupabaseKey: !!process.env.SUPABASE_SERVICE_ROLE_KEY,
    envPath: envPath
  })}`)
}) 