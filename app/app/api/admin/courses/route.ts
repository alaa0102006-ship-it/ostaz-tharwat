import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase-admin'
import { requireAdmin } from '@/lib/require-admin'

export async function GET(req: NextRequest) {
  const admin = await requireAdmin(req)
  if (!admin) return NextResponse.json({ error: 'غير مصرح' }, { status: 403 })

  const { data, error } = await supabaseAdmin
    .from('courses')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ courses: data ?? [] })
}

export async function POST(req: NextRequest) {
  const admin = await requireAdmin(req)
  if (!admin) return NextResponse.json({ error: 'غير مصرح' }, { status: 403 })

  const { title, description, grade } = await req.json()
  if (!title || !grade) return NextResponse.json({ error: 'بيانات ناقصة' }, { status: 400 })

  const { error } = await supabaseAdmin.from('courses').insert({ title, description, grade })
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ success: true })
}
