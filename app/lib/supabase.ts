import { createClient } from '@supabase/supabase-js'

// This client is safe to use in the browser ('use client' components).
// It only ever uses the public anon key.
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
