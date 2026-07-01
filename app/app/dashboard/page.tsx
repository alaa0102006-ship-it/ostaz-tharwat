'use client'
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function Dashboard() {
  const [profile, setProfile] = useState<any>(null)
  const [courses, setCourses] = useState<any[]>([])
  const router = useRouter()

  useEffect(() => {
    const load = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) { router.push('/login'); return }
      const { data: prof } = await supabase.from('profiles').select('*').eq('id', user.id).single()
      if (!prof?.is_active) { router.push('/login'); return }
      setProfile(prof)
      const { data: c } = await supabase.from('courses').select('*, lessons(count)').eq('grade', prof.grade).order('created_at')
      setCourses(c || [])
    }
    load()
  }, [])

  const logout = async () => { await supabase.auth.signOut(); router.push('/') }

  if (!profile) return (
    <div style={{minHeight:'100vh', background:'#0a0f1e', display:'flex', alignItems:'center', justifyContent:'center'}}>
      <div style={{color:'rgba(255,255,255,0.5)', fontSize:16}}>جاري التحميل...</div>
    </div>
  )

  return (
    <div style={{minHeight:'100vh', background:'#0a0f1e', fontFamily:"'Segoe UI',sans-serif", direction:'rtl'}}>
      {/* Nav */}
      <nav style={{background:'rgba(255,255,255,0.03)', borderBottom:'1px solid rgba(255,255,255,0.06)', padding:'0 5%', display:'flex', justifyContent:'space-between', alignItems:'center', height:64}}>
        <div style={{display:'flex', alignItems:'center', gap:10}}>
          <span style={{fontSize:22}}>📐</span>
          <span style={{fontWeight:800, color:'#ffd000', fontSize:16}}>الأستاذ ثروت</span>
        </div>
        <div style={{display:'flex', alignItems:'center', gap:12}}>
          <span style={{color:'rgba(255,255,255,0.5)', fontSize:13}}>أهلاً، {profile.name}</span>
          <button onClick={logout} style={{padding:'6px 16px', borderRadius:8, border:'1px solid rgba(239,68,68,0.3)', background:'rgba(239,68,68,0.1)', color:'#f87171', cursor:'pointer', fontSize:13}}>خروج</button>
        </div>
      </nav>

      <div style={{maxWidth:1100, margin:'0 auto', padding:'40px 5%'}}>
        {/* Welcome */}
        <div style={{background:'linear-gradient(135deg,rgba(255,208,0,0.1),rgba(255,140,0,0.05))', border:'1px solid rgba(255,208,0,0.15)', borderRadius:20, padding:'28px 32px', marginBottom:40, display:'flex', justifyContent:'space-between', alignItems:'center', flexWrap:'wrap', gap:16}}>
          <div>
            <h2 style={{fontSize:24, fontWeight:900, color:'#fff', margin:'0 0 6px'}}>أهلاً {profile.name} 👋</h2>
            <p style={{color:'rgba(255,255,255,0.5)', margin:0, fontSize:14}}>صفك: <span style={{color:'#ffd000', fontWeight:700}}>{profile.grade}</span></p>
          </div>
          <div style={{background:'rgba(255,208,0,0.1)', border:'1px solid rgba(255,208,0,0.2)', borderRadius:12, padding:'12px 20px', textAlign:'center'}}>
            <div style={{fontSize:22, fontWeight:900, color:'#ffd000'}}>{courses.length}</div>
            <div style={{fontSize:12, color:'rgba(255,255,255,0.4)'}}>كورس متاح</div>
          </div>
        </div>

        {/* Courses */}
        <h3 style={{fontSize:18, fontWeight:800, color:'#fff', marginBottom:20}}>الكورسات المتاحة</h3>
        {courses.length === 0 ? (
          <div style={{textAlign:'center', padding:'80px 20px', color:'rgba(255,255,255,0.3)'}}>
            <div style={{fontSize:48, marginBottom:16}}>📚</div>
            <p style={{fontSize:16}}>هيتم إضافة الكورسات قريباً</p>
          </div>
        ) : (
          <div style={{display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(280px,1fr))', gap:20}}>
            {courses.map(course => (
              <Link key={course.id} href={`/course/${course.id}`} style={{textDecoration:'none'}}>
                <div style={{background:'rgba(255,255,255,0.04)', border:'1px solid rgba(255,255,255,0.08)', borderRadius:16, padding:'24px', cursor:'pointer', transition:'all .2s', borderRight:'3px solid #ffd000'}}>
                  <div style={{fontSize:32, marginBottom:12}}>📖</div>
                  <h4 style={{fontSize:17, fontWeight:800, color:'#fff', margin:'0 0 8px'}}>{course.title}</h4>
                  <p style={{fontSize:13, color:'rgba(255,255,255,0.4)', margin:'0 0 16px', lineHeight:1.6}}>{course.description}</p>
                  <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
                    <span style={{fontSize:12, color:'#ffd000', fontWeight:700, background:'rgba(255,208,0,0.1)', padding:'4px 12px', borderRadius:20}}>
                      {course.lessons?.[0]?.count || 0} درس
                    </span>
                    <span style={{color:'rgba(255,255,255,0.3)', fontSize:13}}>ابدأ الآن ←</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
