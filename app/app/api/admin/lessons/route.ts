import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase-admin'
import { requireAdmin } from '@/lib/require-admin'

export async function POST(req: NextRequest) {
  const admin = await requireAdmin(req)
  if (!admin) return NextResponse.json({ error: 'غير مصرح' }, { status: 403 })

  const { title, youtube_id, course_id, order_num } = await req.json()
  if (!title || !youtube_id || !course_id) {
    return NextResponse.json({ error: 'بيانات ناقصة' }, { status: 400 })
  }

  const { error } = await supabaseAdmin.from('lessons').insert({
    title,
    youtube_id,
    course_id,
    order_num: order_num || 1,
  })
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ success: true })
}
