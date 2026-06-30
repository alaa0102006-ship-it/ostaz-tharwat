'use client'
import { useState } from 'react'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()

  const handleLogin = async () => {
    if (!email || !password) { setError('ادخل الإيميل والباسورد'); return }
    setLoading(true); setError('')
    const { data, error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) { setError('الإيميل أو الباسورد غلط'); setLoading(false); return }
    const { data: profile } = await supabase.from('profiles').select('role, is_active').eq('id', data.user.id).single()
    if (profile?.role === 'admin') { router.push('/admin'); return }
    if (!profile?.is_active) { setError('الاشتراك غير مفعل — تواصل مع الأستاذ ثروت على واتساب'); setLoading(false); return }
    router.push('/dashboard')
  }

  return (
    <div style={{minHeight:'100vh', background:'#0a0f1e', display:'flex', alignItems:'center', justifyContent:'center', padding:20, fontFamily:"'Segoe UI',sans-serif", direction:'rtl'}}>
      <div style={{width:'100%', maxWidth:420}}>
        <div style={{textAlign:'center', marginBottom:36}}>
          <div style={{width:56, height:56, borderRadius:16, background:'linear-gradient(135deg,#ffd000,#ff8c00)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:28, margin:'0 auto 16px'}}>📐</div>
          <h1 style={{fontSize:26, fontWeight:900, color:'#fff', margin:0}}>الأستاذ ثروت</h1>
          <p style={{color:'rgba(255,255,255,0.4)', marginTop:6, fontSize:14}}>سجّل دخولك للمتابعة</p>
        </div>
        <div style={{background:'rgba(255,255,255,0.04)', border:'1px solid rgba(255,255,255,0.08)', borderRadius:20, padding:'32px 28px'}}>
          {error && <div style={{background:'rgba(239,68,68,0.1)', border:'1px solid rgba(239,68,68,0.3)', borderRadius:10, padding:'12px 16px', marginBottom:20, color:'#f87171', fontSize:14}}>{error}</div>}
          <div style={{marginBottom:16}}>
            <label style={{fontSize:13, color:'rgba(255,255,255,0.5)', fontWeight:600, display:'block', marginBottom:8}}>الإيميل</label>
            <input type="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="example@email.com"
              style={{width:'100%', background:'rgba(255,255,255,0.06)', border:'1px solid rgba(255,255,255,0.1)', borderRadius:10, padding:'12px 14px', color:'#fff', fontSize:14, outline:'none', boxSizing:'border-box', textAlign:'right'}} />
          </div>
          <div style={{marginBottom:24}}>
            <label style={{fontSize:13, color:'rgba(255,255,255,0.5)', fontWeight:600, display:'block', marginBottom:8}}>الباسورد</label>
            <input type="password" value={password} onChange={e=>setPassword(e.target.value)} placeholder="••••••••"
              style={{width:'100%', background:'rgba(255,255,255,0.06)', border:'1px solid rgba(255,255,255,0.1)', borderRadius:10, padding:'12px 14px', color:'#fff', fontSize:14, outline:'none', boxSizing:'border-box', textAlign:'right'}} />
          </div>
          <button onClick={handleLogin} disabled={loading} style={{
            width:'100%', padding:'14px', borderRadius:12, border:'none', cursor:'pointer',
            background:'linear-gradient(135deg,#ffd000,#ff8c00)', color:'#0a0f1e',
            fontWeight:800, fontSize:16, opacity: loading ? 0.7 : 1
          }}>{loading ? 'جاري الدخول...' : 'دخول →'}</button>
        </div>
        <p style={{textAlign:'center', marginTop:20, color:'rgba(255,255,255,0.4)', fontSize:14}}>
          مش عندك حساب؟ <Link href="/register" style={{color:'#ffd000', fontWeight:700, textDecoration:'none'}}>اشترك دلوقتي</Link>
        </p>
        <p style={{textAlign:'center', marginTop:8}}>
          <Link href="/" style={{color:'rgba(255,255,255,0.3)', fontSize:13, textDecoration:'none'}}>← رجوع للرئيسية</Link>
        </p>
      </div>
    </div>
  )
}
