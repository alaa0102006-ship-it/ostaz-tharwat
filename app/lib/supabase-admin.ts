import { createClient } from '@supabase/supabase-js'

// SERVER ONLY. Never import this file from a 'use client' component —
// it uses the secret service-role key, which bypasses Row Level Security.
// It must only run inside API routes (app/api/**/route.ts).
if (typeof window !== 'undefined') {
  throw new Error('lib/supabase-admin.ts must never run in the browser')
}

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

export const supabaseAdmin = createClient(supabaseUrl, serviceRoleKey, {
  auth: { autoRefreshToken: false, persistSession: false },
})
