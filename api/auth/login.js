import { getSupabaseClient } from '../../lib/supabase.js'
import bcrypt from 'bcryptjs'

export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')

  if (req.method === 'OPTIONS') {
    res.status(200).end()
    return
  }

  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST'])
    return res.status(405).json({ 
      status: 'error', 
      message: `Method ${req.method} Not Allowed` 
    })
  }

  const supabase = getSupabaseClient()

  try {
    const { username, password } = req.body

    // Validate required fields
    if (!username || !password) {
      return res.status(400).json({
        status: 'error',
        message: 'Username and password are required'
      })
    }

    // Get user with salt and password_hash from users table
    const { data: user, error: userError } = await supabase
      .from('users')
      .select('id, username, full_name, role, salt, password_hash, created_at')
      .eq('username', username)
      .is('deleted_at', null)
      .single()

    if (userError || !user) {
      return res.status(401).json({
        status: 'error',
        message: 'Invalid username or password'
      })
    }

    // Verify password using salt + password
    const saltedPassword = user.salt + password
    const isPasswordValid = await bcrypt.compare(saltedPassword, user.password_hash)

    if (!isPasswordValid) {
      return res.status(401).json({
        status: 'error',
        message: 'Invalid username or password'
      })
    }

    // Password is valid - login successful

    // Return user profile (without sensitive data)
    const profile = {
      id: user.id,
      username: user.username,
      full_name: user.full_name,
      role: user.role
    }

    return res.status(200).json({
      status: 'success',
      profile
    })

  } catch (error) {
    console.error('[Login] Handler error:', error)
    
    // Log error event
    await logApiEvent(
      null,
      'login_failed',
      { error: error.message },
      req.body?.username || 'unknown'
    )

    return res.status(500).json({
      status: 'error',
      message: 'Internal server error'
    })
  }
} 