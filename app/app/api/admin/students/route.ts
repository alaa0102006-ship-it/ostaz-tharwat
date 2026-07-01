import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase-admin'
import { requireAdmin } from '@/lib/require-admin'

export async function GET(req: NextRequest) {
  const admin = await requireAdmin(req)
  if (!admin) return NextResponse.json({ error: 'غير مصرح' }, { status: 403 })

  const { data, error } = await supabaseAdmin
    .from('profiles')
    .select('*')
    .eq('role', 'student')
    .order('created_at', { ascending: false })

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ students: data ?? [] })
}

export async function PATCH(req: NextRequest) {
  const admin = await requireAdmin(req)
  if (!admin) return NextResponse.json({ error: 'غير مصرح' }, { status: 403 })

  const { id, is_active } = await req.json()
  if (!id || typeof is_active !== 'boolean') {
    return NextResponse.json({ error: 'بيانات ناقصة' }, { status: 400 })
  }

  const { error } = await supabaseAdmin.from('profiles').update({ is_active }).eq('id', id)
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ success: true })
}
