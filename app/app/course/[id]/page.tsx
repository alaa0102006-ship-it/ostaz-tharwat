'use client'
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { useRouter, useParams } from 'next/navigation'
import Link from 'next/link'

export default function CoursePage() {
  const [course, setCourse] = useState<any>(null)
  const [lessons, setLessons] = useState<any[]>([])
  const [active, setActive] = useState<any>(null)
  const router = useRouter()
  const params = useParams()

  useEffect(() => {
    const load = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) { router.push('/login'); return }
      const { data: prof } = await supabase.from('profiles').select('is_active').eq('id', user.id).single()
      if (!prof?.is_active) { router.push('/login'); return }
      const { data: c } = await supabase.from('courses').select('*').eq('id', params.id).single()
      setCourse(c)
      const { data: l } = await supabase.from('lessons').select('*').eq('course_id', params.id).order('order_num')
      setLessons(l || [])
      if (l && l.length > 0) setActive(l[0])
    }
    load()
  }, [])

  if (!course) return (
    <div style={{minHeight:'100vh', background:'#0a0f1e', display:'flex', alignItems:'center', justifyContent:'center'}}>
      <div style={{color:'rgba(255,255,255,0.5)'}}>جاري التحميل...</div>
    </div>
  )

  return (
    <div style={{minHeight:'100vh', background:'#0a0f1e', fontFamily:"'Segoe UI',sans-serif", direction:'rtl'}}>
      <nav style={{background:'rgba(255,255,255,0.03)', borderBottom:'1px solid rgba(255,255,255,0.06)', padding:'0 5%', display:'flex', justifyContent:'space-between', alignItems:'center', height:64}}>
        <div style={{display:'flex', alignItems:'center', gap:10}}>
          <span style={{fontSize:22}}>📐</span>
          <span style={{fontWeight:800, color:'#ffd000', fontSize:16}}>{course.title}</span>
        </div>
        <Link href="/dashboard" style={{color:'rgba(255,255,255,0.4)', textDecoration:'none', fontSize:14}}>← لوحة التحكم</Link>
      </nav>

      <div style={{display:'grid', gridTemplateColumns:'1fr 320px', height:'calc(100vh - 64px)'}}>
        {/* Video */}
        <div style={{padding:24, overflowY:'auto'}}>
          {active ? (
            <div>
              <div style={{borderRadius:16, overflow:'hidden', background:'#000', aspectRatio:'16/9', marginBottom:20}}>
                <iframe src={`https://www.youtube.com/embed/${active.youtube_id}?rel=0&modestbranding=1`}
                  style={{width:'100%', height:'100%', border:'none'}} allowFullScreen />
              </div>
              <h2 style={{fontSize:20, fontWeight:800, color:'#fff', marginBottom:8}}>{active.title}</h2>
              <p style={{color:'rgba(255,255,255,0.4)', fontSize:14}}>درس {active.order_num} من {lessons.length}</p>
            </div>
          ) : (
            <div style={{display:'flex', alignItems:'center', justifyContent:'center', height:'100%', flexDirection:'column', gap:16, color:'rgba(255,255,255,0.3)'}}>
              <div style={{fontSize:64}}>▶️</div>
              <p>اختار درس من القائمة</p>
            </div>
          )}
        </div>

        {/* Lessons sidebar */}
        <div style={{background:'rgba(255,255,255,0.02)', borderRight:'1px solid rgba(255,255,255,0.06)', overflowY:'auto', padding:16}}>
          <h3 style={{fontSize:14, fontWeight:700, color:'rgba(255,255,255,0.4)', marginBottom:16, padding:'0 4px'}}>قائمة الدروس</h3>
          <div style={{display:'flex', flexDirection:'column', gap:8}}>
            {lessons.map((lesson, i) => (
              <button key={lesson.id} onClick={() => setActive(lesson)} style={{
                display:'flex', alignItems:'center', gap:12, padding:'12px 14px', borderRadius:12, border:'none', cursor:'pointer', textAlign:'right', width:'100%',
                background: active?.id === lesson.id ? 'rgba(255,208,0,0.1)' : 'transparent',
                borderRight: active?.id === lesson.id ? '2px solid #ffd000' : '2px solid transparent',
              }}>
                <div style={{width:32, height:32, borderRadius:8, flexShrink:0, display:'flex', alignItems:'center', justifyContent:'center', fontSize:13, fontWeight:700,
                  background: active?.id === lesson.id ? 'linear-gradient(135deg,#ffd000,#ff8c00)' : 'rgba(255,255,255,0.07)',
                  color: active?.id === lesson.id ? '#0a0f1e' : 'rgba(255,255,255,0.5)'
                }}>{i+1}</div>
                <span style={{fontSize:13, color: active?.id === lesson.id ? '#fff' : 'rgba(255,255,255,0.6)', fontWeight: active?.id === lesson.id ? 700 : 400, flex:1}}>{lesson.title}</span>
              </button>
            ))}
            {lessons.length === 0 && <p style={{color:'rgba(255,255,255,0.3)', fontSize:13, textAlign:'center', padding:20}}>هيتم إضافة الدروس قريباً</p>}
          </div>
        </div>
      </div>
    </div>
  )
}
