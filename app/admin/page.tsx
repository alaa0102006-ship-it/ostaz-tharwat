'use client'
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'

export default function Admin() {
  const [students, setStudents] = useState<any[]>([])
  const [courses, setCourses] = useState<any[]>([])
  const [tab, setTab] = useState('students')
  const [nc, setNc] = useState({title:'', description:'', grade:'أول ثانوي'})
  const [nl, setNl] = useState({title:'', youtube_id:'', course_id:'', order_num:1})
  const [loading, setLoading] = useState(false)
  const [search, setSearch] = useState('')
  const router = useRouter()

  useEffect(() => {
    const load = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) { router.push('/login'); return }
      const { data: prof } = await supabase.from('profiles').select('role').eq('id', user.id).single()
      if (prof?.role !== 'admin') { router.push('/dashboard'); return }
      loadData()
    }
    load()
  }, [])

  const loadData = async () => {
    const { data: s } = await supabase.from('profiles').select('*').eq('role','student').order('created_at',{ascending:false})
    setStudents(s||[])
    const { data: c } = await supabase.from('courses').select('*').order('created_at',{ascending:false})
    setCourses(c||[])
  }

  const toggle = async (id:string, cur:boolean) => {
    await supabase.from('profiles').update({is_active:!cur}).eq('id',id)
    loadData()
  }

  const addCourse = async () => {
    if (!nc.title) return
    setLoading(true)
    await supabase.from('courses').insert(nc)
    setNc({title:'',description:'',grade:'أول ثانوي'})
    setLoading(false); loadData()
  }

  const addLesson = async () => {
    if (!nl.title||!nl.youtube_id||!nl.course_id) return
    setLoading(true)
    await supabase.from('lessons').insert(nl)
    setNl({title:'',youtube_id:'',course_id:'',order_num:1})
    setLoading(false); loadData()
  }

  const logout = async () => { await supabase.auth.signOut(); router.push('/') }

  const filtered = students.filter(s => s.name?.includes(search) || s.phone?.includes(search) || s.email?.includes(search))
  const active = students.filter(s=>s.is_active).length
  const inactive = students.filter(s=>!s.is_active).length

  const inp:any = {background:'rgba(255,255,255,0.06)', border:'1px solid rgba(255,255,255,0.1)', borderRadius:10, padding:'11px 14px', color:'#fff', fontSize:14, outline:'none', width:'100%', boxSizing:'border-box', textAlign:'right'}

  return (
    <div style={{minHeight:'100vh', background:'#0a0f1e', fontFamily:"'Segoe UI',sans-serif", direction:'rtl'}}>
      <nav style={{background:'rgba(255,255,255,0.03)', borderBottom:'1px solid rgba(255,255,255,0.06)', padding:'0 5%', display:'flex', justifyContent:'space-between', alignItems:'center', height:64}}>
        <div style={{display:'flex', alignItems:'center', gap:10}}>
          <span style={{fontSize:22}}>📐</span>
          <span style={{fontWeight:800, color:'#ffd000', fontSize:16}}>لوحة الأدمن</span>
        </div>
        <button onClick={logout} style={{padding:'6px 16px', borderRadius:8, border:'1px solid rgba(239,68,68,0.3)', background:'rgba(239,68,68,0.1)', color:'#f87171', cursor:'pointer', fontSize:13}}>خروج</button>
      </nav>

      <div style={{maxWidth:1200, margin:'0 auto', padding:'32px 5%'}}>
        {/* Stats */}
        <div style={{display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(180px,1fr))', gap:16, marginBottom:32}}>
          {[
            {label:'إجمالي الطلاب', value:students.length, color:'#3b82f6', icon:'👥'},
            {label:'مشتركين فعالين', value:active, color:'#22c55e', icon:'✅'},
            {label:'في انتظار التفعيل', value:inactive, color:'#f59e0b', icon:'⏳'},
            {label:'الكورسات', value:courses.length, color:'#a855f7', icon:'📚'},
          ].map(({label,value,color,icon})=>(
            <div key={label} style={{background:'rgba(255,255,255,0.04)', border:`1px solid ${color}33`, borderRadius:16, padding:'20px 24px'}}>
              <div style={{fontSize:24, marginBottom:8}}>{icon}</div>
              <div style={{fontSize:28, fontWeight:900, color}}>{value}</div>
              <div style={{fontSize:13, color:'rgba(255,255,255,0.4)', marginTop:4}}>{label}</div>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div style={{display:'flex', gap:8, marginBottom:24}}>
          {[['students','الطلاب'],['courses','الكورسات'],['lessons','الدروس']].map(([t,label])=>(
            <button key={t} onClick={()=>setTab(t)} style={{
              padding:'9px 20px', borderRadius:10, border:'none', cursor:'pointer', fontWeight:700, fontSize:14,
              background: tab===t ? 'linear-gradient(135deg,#ffd000,#ff8c00)' : 'rgba(255,255,255,0.06)',
              color: tab===t ? '#0a0f1e' : 'rgba(255,255,255,0.6)'
            }}>{label}</button>
          ))}
        </div>

        {/* Students */}
        {tab==='students' && (
          <div>
            <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="ابحث باسم أو تليفون أو إيميل..." style={{...inp, marginBottom:16, maxWidth:400}} />
            <div style={{background:'rgba(255,255,255,0.03)', border:'1px solid rgba(255,255,255,0.07)', borderRadius:16, overflow:'hidden'}}>
              <div style={{display:'grid', gridTemplateColumns:'2fr 2fr 1.5fr 1fr 1fr 1fr', padding:'12px 20px', background:'rgba(255,255,255,0.04)', fontSize:13, color:'rgba(255,255,255,0.4)', fontWeight:700}}>
                <span>الاسم</span><span>الإيميل</span><span>التليفون</span><span>الصف</span><span>الحالة</span><span>تفعيل</span>
              </div>
              {filtered.map(s=>(
                <div key={s.id} style={{display:'grid', gridTemplateColumns:'2fr 2fr 1.5fr 1fr 1fr 1fr', padding:'14px 20px', borderTop:'1px solid rgba(255,255,255,0.05)', alignItems:'center'}}>
                  <span style={{fontWeight:700, color:'#fff', fontSize:14}}>{s.name}</span>
                  <span style={{color:'rgba(255,255,255,0.4)', fontSize:12}}>{s.email}</span>
                  <span style={{color:'rgba(255,255,255,0.6)', fontSize:13}}>{s.phone}</span>
                  <span style={{color:'rgba(255,255,255,0.5)', fontSize:13}}>{s.grade}</span>
                  <span style={{fontSize:12, fontWeight:700, padding:'4px 10px', borderRadius:20, display:'inline-block', textAlign:'center',
                    background: s.is_active ? 'rgba(34,197,94,0.1)' : 'rgba(239,68,68,0.1)',
                    color: s.is_active ? '#22c55e' : '#f87171'
                  }}>{s.is_active ? 'فعال' : 'معطل'}</span>
                  <button onClick={()=>toggle(s.id, s.is_active)} style={{
                    padding:'6px 14px', borderRadius:8, border:'none', cursor:'pointer', fontSize:12, fontWeight:700,
                    background: s.is_active ? 'rgba(239,68,68,0.15)' : 'rgba(34,197,94,0.15)',
                    color: s.is_active ? '#f87171' : '#22c55e'
                  }}>{s.is_active ? 'إيقاف' : 'تفعيل'}</button>
                </div>
              ))}
              {filtered.length===0 && <p style={{textAlign:'center', padding:40, color:'rgba(255,255,255,0.3)', fontSize:14}}>مفيش نتايج</p>}
            </div>
          </div>
        )}

        {/* Courses */}
        {tab==='courses' && (
          <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:24}}>
            <div style={{background:'rgba(255,255,255,0.04)', border:'1px solid rgba(255,255,255,0.08)', borderRadius:16, padding:24}}>
              <h3 style={{color:'#fff', fontWeight:800, marginBottom:20}}>إضافة كورس جديد</h3>
              <div style={{display:'flex', flexDirection:'column', gap:12}}>
                <input placeholder="اسم الكورس" value={nc.title} onChange={e=>setNc({...nc,title:e.target.value})} style={inp}/>
                <input placeholder="وصف الكورس" value={nc.description} onChange={e=>setNc({...nc,description:e.target.value})} style={inp}/>
                <select value={nc.grade} onChange={e=>setNc({...nc,grade:e.target.value})} style={{...inp,cursor:'pointer'}}>
                  <option style={{background:'#1a2035'}}>أول ثانوي</option>
                  <option style={{background:'#1a2035'}}>تاني ثانوي</option>
                  <option style={{background:'#1a2035'}}>تالت ثانوي</option>
                </select>
                <button onClick={addCourse} disabled={loading} style={{padding:'12px', borderRadius:10, border:'none', cursor:'pointer', background:'linear-gradient(135deg,#ffd000,#ff8c00)', color:'#0a0f1e', fontWeight:800, fontSize:15}}>
                  {loading ? 'جاري الإضافة...' : '+ إضافة الكورس'}
                </button>
              </div>
            </div>
            <div style={{display:'flex', flexDirection:'column', gap:12}}>
              {courses.map(c=>(
                <div key={c.id} style={{background:'rgba(255,255,255,0.04)', border:'1px solid rgba(255,255,255,0.07)', borderRadius:12, padding:'16px 20px', borderRight:'3px solid #ffd000'}}>
                  <h4 style={{color:'#fff', fontWeight:700, margin:'0 0 4px'}}>{c.title}</h4>
                  <p style={{color:'rgba(255,255,255,0.4)', fontSize:13, margin:'0 0 8px'}}>{c.description}</p>
                  <span style={{fontSize:12, color:'#ffd000', background:'rgba(255,208,0,0.1)', padding:'3px 10px', borderRadius:20}}>{c.grade}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Lessons */}
        {tab==='lessons' && (
          <div style={{background:'rgba(255,255,255,0.04)', border:'1px solid rgba(255,255,255,0.08)', borderRadius:16, padding:24, maxWidth:600}}>
            <h3 style={{color:'#fff', fontWeight:800, marginBottom:20}}>إضافة درس جديد</h3>
            <div style={{display:'flex', flexDirection:'column', gap:12}}>
              <select value={nl.course_id} onChange={e=>setNl({...nl,course_id:e.target.value})} style={{...inp,cursor:'pointer'}}>
                <option value="" style={{background:'#1a2035'}}>اختار الكورس</option>
                {courses.map(c=><option key={c.id} value={c.id} style={{background:'#1a2035'}}>{c.title}</option>)}
              </select>
              <input placeholder="عنوان الدرس" value={nl.title} onChange={e=>setNl({...nl,title:e.target.value})} style={inp}/>
              <input placeholder="YouTube Video ID — مثلاً: dQw4w9WgXcQ" value={nl.youtube_id} onChange={e=>setNl({...nl,youtube_id:e.target.value})} style={inp}/>
              <input type="number" placeholder="رقم الدرس (الترتيب)" value={nl.order_num} onChange={e=>setNl({...nl,order_num:parseInt(e.target.value)})} style={inp}/>
              <div style={{background:'rgba(255,208,0,0.07)', border:'1px solid rgba(255,208,0,0.15)', borderRadius:10, padding:'12px 14px', fontSize:13, color:'rgba(255,208,0,0.8)', lineHeight:1.6}}>
                💡 عشان تجيب YouTube ID: افتح الفيديو — خد الكود اللي بعد <strong>v=</strong> في الرابط
              </div>
              <button onClick={addLesson} disabled={loading} style={{padding:'12px', borderRadius:10, border:'none', cursor:'pointer', background:'linear-gradient(135deg,#ffd000,#ff8c00)', color:'#0a0f1e', fontWeight:800, fontSize:15}}>
                {loading ? 'جاري الإضافة...' : '+ إضافة الدرس'}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
