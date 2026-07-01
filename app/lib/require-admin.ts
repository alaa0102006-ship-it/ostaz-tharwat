import { NextRequest } from 'next/server'
import { supabaseAdmin } from './supabase-admin'

// Verifies the request's bearer token belongs to a logged-in admin.
// Returns the user, or null if not authorized.
export async function requireAdmin(req: NextRequest) {
  const authHeader = req.headers.get('authorization') || ''
  const token = authHeader.replace('Bearer ', '').trim()
  if (!token) return null

  const { data: userData, error } = await supabaseAdmin.auth.getUser(token)
  if (error || !userData.user) return null

  const { data: profile } = await supabaseAdmin
    .from('profiles')
    .select('role')
    .eq('id', userData.user.id)
    .single()

  if (profile?.role !== 'admin') return null
  return userData.user
}
