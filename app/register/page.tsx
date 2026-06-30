'use client'
import { useState } from 'react'
import { supabase } from '@/lib/supabase'
import Link from 'next/link'

const WHATSAPP = '201012345678'

export default function Register() {
  const [form, setForm] = useState({name:'', email:'', password:'', phone:'', grade:''})
  const [loading, setLoading] = useState(false)
  const [done, setDone] = useState(false)
  const [error, setError] = useState('')
  const set = (k:string) => (e:any) => setForm(f=>({...f,[k]:e.target.value}))

  const handle = async () => {
    if (!form.name||!form.email||!form.password||!form.phone||!form.grade) { setError('كمّل كل البيانات'); return }
    if (form.password.length < 6) { setError('الباسورد لازم يكون 6 حروف على الأقل'); return }
    setLoading(true); setError('')
    const { data, error } = await supabase.auth.signUp({ email:form.email, password:form.password })
    if (error) { setError('في مشكلة — جرب إيميل تاني'); setLoading(false); return }
    await supabase.from('profiles').insert({ id:data.user!.id, name:form.name, email:form.email, phone:form.phone, grade:form.grade, role:'student', is_active:false })
    setDone(true)
  }

  const inputStyle:any = {width:'100%', background:'rgba(255,255,255,0.06)', border:'1px solid rgba(255,255,255,0.1)', borderRadius:10, padding:'12px 14px', color:'#fff', fontSize:14, outline:'none', boxSizing:'border-box', textAlign:'right'}

  if (done) return (
    <div style={{minHeight:'100vh', background:'#0a0f1e', display:'flex', alignItems:'center', justifyContent:'center', padding:20, fontFamily:"'Segoe UI',sans-serif", direction:'rtl'}}>
      <div style={{width:'100%', maxWidth:440, textAlign:'center'}}>
        <div style={{fontSize:64, marginBottom:16}}>✅</div>
        <h2 style={{fontSize:26, fontWeight:900, color:'#fff', marginBottom:8}}>تم التسجيل بنجاح!</h2>
        <p style={{color:'rgba(255,255,255,0.5)', marginBottom:32, lineHeight:1.8}}>حوّل قيمة الاشتراك وابعت رقم العملية على واتساب عشان يتفعل حسابك</p>
        <div style={{background:'rgba(255,208,0,0.07)', border:'1px solid rgba(255,208,0,0.2)', borderRadius:16, padding:'20px 24px', marginBottom:24}}>
          <p style={{color:'rgba(255,255,255,0.5)', fontSize:13, marginBottom:6}}>فودافون كاش</p>
          <p style={{fontSize:28, fontWeight:900, color:'#ffd000', margin:0}}>01012345678</p>
        </div>
        <a href={`https://wa.me/${WHATSAPP}?text=اسمي ${form.name} — صفي ${form.grade} — بعت الاشتراك`}
          style={{display:'block', padding:'14px', borderRadius:12, background:'#25d366', color:'#fff', textDecoration:'none', fontWeight:800, fontSize:16, boxShadow:'0 8px 24px rgba(37,211,102,0.3)'}}>
          ابعت رقم العملية على واتساب 📱
        </a>
      </div>
    </div>
  )

  return (
    <div style={{minHeight:'100vh', background:'#0a0f1e', display:'flex', alignItems:'center', justifyContent:'center', padding:20, fontFamily:"'Segoe UI',sans-serif", direction:'rtl'}}>
      <div style={{width:'100%', maxWidth:440}}>
        <div style={{textAlign:'center', marginBottom:32}}>
          <div style={{width:56, height:56, borderRadius:16, background:'linear-gradient(135deg,#ffd000,#ff8c00)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:28, margin:'0 auto 16px'}}>📐</div>
          <h1 style={{fontSize:26, fontWeight:900, color:'#fff', margin:0}}>إنشاء حساب جديد</h1>
          <p style={{color:'rgba(255,255,255,0.4)', marginTop:6, fontSize:14}}>انضم لمنصة الأستاذ ثروت</p>
        </div>
        <div style={{background:'rgba(255,255,255,0.04)', border:'1px solid rgba(255,255,255,0.08)', borderRadius:20, padding:'32px 28px'}}>
          {error && <div style={{background:'rgba(239,68,68,0.1)', border:'1px solid rgba(239,68,68,0.3)', borderRadius:10, padding:'12px 16px', marginBottom:20, color:'#f87171', fontSize:14}}>{error}</div>}
          <div style={{display:'flex', flexDirection:'column', gap:14}}>
            <div><label style={{fontSize:13, color:'rgba(255,255,255,0.5)', fontWeight:600, display:'block', marginBottom:8}}>الاسم كامل</label><input placeholder="محمد أحمد" value={form.name} onChange={set('name')} style={inputStyle}/></div>
            <div><label style={{fontSize:13, color:'rgba(255,255,255,0.5)', fontWeight:600, display:'block', marginBottom:8}}>الإيميل</label><input type="email" placeholder="example@email.com" value={form.email} onChange={set('email')} style={inputStyle}/></div>
            <div><label style={{fontSize:13, color:'rgba(255,255,255,0.5)', fontWeight:600, display:'block', marginBottom:8}}>الباسورد</label><input type="password" placeholder="6 حروف على الأقل" value={form.password} onChange={set('password')} style={inputStyle}/></div>
            <div><label style={{fontSize:13, color:'rgba(255,255,255,0.5)', fontWeight:600, display:'block', marginBottom:8}}>رقم التليفون</label><input placeholder="01xxxxxxxxx" value={form.phone} onChange={set('phone')} style={inputStyle}/></div>
            <div>
              <label style={{fontSize:13, color:'rgba(255,255,255,0.5)', fontWeight:600, display:'block', marginBottom:8}}>الصف الدراسي</label>
              <select value={form.grade} onChange={set('grade')} style={{...inputStyle, cursor:'pointer'}}>
                <option value="" style={{background:'#1a2035'}}>اختار صفك</option>
                <option value="أول ثانوي" style={{background:'#1a2035'}}>أول ثانوي</option>
                <option value="تاني ثانوي" style={{background:'#1a2035'}}>تاني ثانوي</option>
                <option value="تالت ثانوي" style={{background:'#1a2035'}}>تالت ثانوي</option>
              </select>
            </div>
          </div>
          <button onClick={handle} disabled={loading} style={{
            width:'100%', marginTop:24, padding:'14px', borderRadius:12, border:'none', cursor:'pointer',
            background:'linear-gradient(135deg,#ffd000,#ff8c00)', color:'#0a0f1e',
            fontWeight:800, fontSize:16, opacity: loading ? 0.7 : 1
          }}>{loading ? 'جاري التسجيل...' : 'سجّل دلوقتي →'}</button>
        </div>
        <p style={{textAlign:'center', marginTop:20, color:'rgba(255,255,255,0.4)', fontSize:14}}>
          عندك حساب؟ <Link href="/login" style={{color:'#ffd000', fontWeight:700, textDecoration:'none'}}>سجّل دخولك</Link>
        </p>
      </div>
    </div>
  )
}
