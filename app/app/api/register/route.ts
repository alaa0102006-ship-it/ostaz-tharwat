import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase-admin'

export async function POST(req: NextRequest) {
  try {
    const { name, email, password, phone, grade } = await req.json()

    if (!name || !email || !password || !phone || !grade) {
      return NextResponse.json({ error: 'كمّل كل البيانات' }, { status: 400 })
    }
    if (typeof password !== 'string' || password.length < 6) {
      return NextResponse.json({ error: 'الباسورد لازم يكون 6 حروف على الأقل' }, { status: 400 })
    }

    // Create the auth user server-side (service role), and confirm the
    // email immediately so students can log in right away without
    // waiting on a confirmation email.
    const { data: created, error: createErr } = await supabaseAdmin.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
      user_metadata: { name },
    })

    if (createErr || !created?.user) {
      const msg = createErr?.message?.includes('already') ? 'الإيميل ده مسجل قبل كده' : 'في مشكلة — جرب إيميل تاني'
      return NextResponse.json({ error: msg }, { status: 400 })
    }

    const { error: profileErr } = await supabaseAdmin.from('profiles').insert({
      id: created.user.id,
      name,
      email,
      phone,
      grade,
      role: 'student',
      is_active: false,
    })

    if (profileErr) {
      // Roll back the auth user so we don't leave an orphaned account.
      await supabaseAdmin.auth.admin.deleteUser(created.user.id)
      return NextResponse.json({ error: 'حصل خطأ في التسجيل، حاول تاني' }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: 'حصل خطأ غير متوقع' }, { status: 500 })
  }
}
