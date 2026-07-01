'use client'
import Link from 'next/link'
import { useState, useEffect } from 'react'

const VODAFONE = '01012345678'
const WHATSAPP = '201012345678'

export default function Home() {
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', h)
    return () => window.removeEventListener('scroll', h)
  }, [])

  return (
    <main style={{fontFamily:"'Segoe UI',sans-serif", direction:'rtl', background:'#0a0f1e', color:'#fff', minHeight:'100vh'}}>

      {/* NAV */}
      <nav style={{
        position:'fixed', top:0, right:0, left:0, zIndex:100,
        background: scrolled ? 'rgba(10,15,30,0.97)' : 'transparent',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(255,200,0,0.15)' : 'none',
        transition:'all .3s', padding:'0 5%',
        display:'flex', justifyContent:'space-between', alignItems:'center', height:70
      }}>
        <div style={{display:'flex', alignItems:'center', gap:12}}>
          <div style={{width:38, height:38, borderRadius:10, background:'linear-gradient(135deg,#ffd000,#ff8c00)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:20}}>📐</div>
          <span style={{fontWeight:800, fontSize:18, color:'#ffd000', letterSpacing:'-0.5px'}}>الأستاذ ثروت</span>
        </div>
        <div style={{display:'flex', gap:12}}>
          <Link href="/login" style={{padding:'8px 20px', borderRadius:8, border:'1.5px solid rgba(255,208,0,0.4)', color:'#ffd000', textDecoration:'none', fontSize:14, fontWeight:600}}>دخول</Link>
          <Link href="/register" style={{padding:'8px 20px', borderRadius:8, background:'linear-gradient(135deg,#ffd000,#ff8c00)', color:'#0a0f1e', textDecoration:'none', fontSize:14, fontWeight:800}}>اشترك الآن</Link>
        </div>
      </nav>

      {/* HERO */}
      <section style={{minHeight:'100vh', display:'flex', alignItems:'center', justifyContent:'center', textAlign:'center', padding:'120px 5% 60px', position:'relative', overflow:'hidden'}}>
        {/* glow blobs */}
        <div style={{position:'absolute', top:'20%', right:'10%', width:400, height:400, borderRadius:'50%', background:'radial-gradient(circle,rgba(255,208,0,0.12),transparent 70%)', pointerEvents:'none'}}/>
        <div style={{position:'absolute', bottom:'20%', left:'10%', width:300, height:300, borderRadius:'50%', background:'radial-gradient(circle,rgba(255,140,0,0.1),transparent 70%)', pointerEvents:'none'}}/>

        <div style={{maxWidth:750, position:'relative', zIndex:1}}>
          <div style={{display:'inline-block', padding:'6px 18px', borderRadius:20, border:'1px solid rgba(255,208,0,0.3)', background:'rgba(255,208,0,0.07)', fontSize:13, color:'#ffd000', marginBottom:28, fontWeight:600}}>
            🎓 منصة تعليمية متخصصة في الرياضيات
          </div>
          <h1 style={{fontSize:'clamp(2.2rem,6vw,4rem)', fontWeight:900, lineHeight:1.15, marginBottom:20, letterSpacing:'-1px'}}>
            رياضيات الثانوي<br/>
            <span style={{background:'linear-gradient(90deg,#ffd000,#ff8c00)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent'}}>بأسلوب مختلف</span>
          </h1>
          <p style={{fontSize:'clamp(1rem,2.5vw,1.2rem)', color:'rgba(255,255,255,0.6)', marginBottom:40, lineHeight:1.8}}>
            شرح واضح ومبسط لمناهج أول وتاني وتالت ثانوي — فيديوهات عالية الجودة مع متابعة تقدمك خطوة بخطوة
          </p>
          <div style={{display:'flex', gap:14, justifyContent:'center', flexWrap:'wrap'}}>
            <Link href="/register" style={{
              padding:'14px 36px', borderRadius:12,
              background:'linear-gradient(135deg,#ffd000,#ff8c00)',
              color:'#0a0f1e', textDecoration:'none', fontWeight:800, fontSize:16,
              boxShadow:'0 8px 32px rgba(255,208,0,0.3)'
            }}>ابدأ التعلم مجاناً 🚀</Link>
            <a href={`https://wa.me/${WHATSAPP}`} style={{
              padding:'14px 36px', borderRadius:12,
              border:'1.5px solid rgba(255,255,255,0.2)',
              color:'#fff', textDecoration:'none', fontWeight:600, fontSize:16
            }}>تواصل معنا 💬</a>
          </div>
          {/* stats */}
          <div style={{display:'flex', gap:32, justifyContent:'center', marginTop:56, flexWrap:'wrap'}}>
            {[['📚','3 مراحل','أول — تاني — تالت'],['🎬','فيديوهات HD','شرح واضح'],['🔒','محتوى حصري','لطلاب المنصة فقط']].map(([icon,title,sub])=>(
              <div key={title} style={{textAlign:'center'}}>
                <div style={{fontSize:28, marginBottom:4}}>{icon}</div>
                <div style={{fontWeight:700, fontSize:15}}>{title}</div>
                <div style={{fontSize:12, color:'rgba(255,255,255,0.45)', marginTop:2}}>{sub}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* GRADES */}
      <section style={{padding:'80px 5%', maxWidth:1100, margin:'0 auto'}}>
        <div style={{textAlign:'center', marginBottom:56}}>
          <p style={{color:'#ffd000', fontWeight:700, fontSize:13, letterSpacing:2, marginBottom:12}}>الباقات الدراسية</p>
          <h2 style={{fontSize:'clamp(1.8rem,4vw,2.6rem)', fontWeight:900, margin:0}}>اختار صفك</h2>
        </div>
        <div style={{display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(280px,1fr))', gap:24}}>
          {[
            {grade:'أول ثانوي', price:50, icon:'🥇', topics:['الجبر والهندسة','المتتاليات','التفاضل والتكامل'], color:'#3b82f6'},
            {grade:'تاني ثانوي', price:50, icon:'🥈', topics:['المثلثات','الإحصاء','الجبر الخطي'], color:'#8b5cf6', featured:true},
            {grade:'تالت ثانوي', price:50, icon:'🥉', topics:['التفاضل','الجبر','الهندسة التحليلية'], color:'#f59e0b'},
          ].map(({grade,price,icon,topics,color,featured})=>(
            <div key={grade} style={{
              borderRadius:20,
              border: featured ? '2px solid #ffd000' : '1px solid rgba(255,255,255,0.08)',
              background: featured ? 'linear-gradient(145deg,rgba(255,208,0,0.07),rgba(255,140,0,0.04))' : 'rgba(255,255,255,0.03)',
              padding:'32px 28px',
              position:'relative',
              transition:'transform .2s',
            }}>
              {featured && <div style={{position:'absolute', top:-13, right:'50%', transform:'translateX(50%)', background:'linear-gradient(90deg,#ffd000,#ff8c00)', color:'#0a0f1e', fontSize:11, fontWeight:800, padding:'4px 16px', borderRadius:20}}>الأكثر اختياراً</div>}
              <div style={{fontSize:40, marginBottom:16}}>{icon}</div>
              <h3 style={{fontSize:22, fontWeight:800, marginBottom:8}}>{grade}</h3>
              <div style={{display:'flex', alignItems:'baseline', gap:4, marginBottom:20}}>
                <span style={{fontSize:36, fontWeight:900, color:'#ffd000'}}>{price}</span>
                <span style={{color:'rgba(255,255,255,0.5)', fontSize:14}}>جنيه / شهر</span>
              </div>
              <ul style={{listStyle:'none', padding:0, margin:'0 0 24px', display:'flex', flexDirection:'column', gap:10}}>
                {topics.map(t=>(
                  <li key={t} style={{display:'flex', alignItems:'center', gap:8, fontSize:14, color:'rgba(255,255,255,0.75)'}}>
                    <span style={{color:'#ffd000', fontSize:16}}>✓</span> {t}
                  </li>
                ))}
              </ul>
              <Link href="/register" style={{
                display:'block', textAlign:'center', padding:'12px',
                borderRadius:10,
                background: featured ? 'linear-gradient(135deg,#ffd000,#ff8c00)' : 'rgba(255,255,255,0.07)',
                color: featured ? '#0a0f1e' : '#fff',
                textDecoration:'none', fontWeight:700, fontSize:15,
                border: featured ? 'none' : '1px solid rgba(255,255,255,0.1)'
              }}>اشترك دلوقتي</Link>
            </div>
          ))}
        </div>
      </section>

      {/* HOW TO PAY */}
      <section style={{padding:'80px 5%', background:'rgba(255,208,0,0.04)', borderTop:'1px solid rgba(255,208,0,0.1)', borderBottom:'1px solid rgba(255,208,0,0.1)'}}>
        <div style={{maxWidth:700, margin:'0 auto', textAlign:'center'}}>
          <p style={{color:'#ffd000', fontWeight:700, fontSize:13, letterSpacing:2, marginBottom:12}}>طريقة الاشتراك</p>
          <h2 style={{fontSize:'clamp(1.6rem,4vw,2.2rem)', fontWeight:900, marginBottom:40}}>3 خطوات بسيطة</h2>
          <div style={{display:'flex', flexDirection:'column', gap:20}}>
            {[
              {n:'1', text:`حوّل قيمة الاشتراك على فودافون كاش`, sub:VODAFONE},
              {n:'2', text:'ابعت رقم العملية مع اسمك وصفك على واتساب', sub:'سيتم التفعيل خلال دقائق'},
              {n:'3', text:'سجّل دخولك واستمتع بكل الدروس', sub:'وصول فوري لكل المحتوى'},
            ].map(({n,text,sub})=>(
              <div key={n} style={{display:'flex', alignItems:'center', gap:20, background:'rgba(255,255,255,0.03)', borderRadius:16, padding:'20px 24px', border:'1px solid rgba(255,255,255,0.07)', textAlign:'right'}}>
                <div style={{width:44, height:44, borderRadius:12, background:'linear-gradient(135deg,#ffd000,#ff8c00)', display:'flex', alignItems:'center', justifyContent:'center', fontWeight:900, fontSize:18, color:'#0a0f1e', flexShrink:0}}>{n}</div>
                <div>
                  <div style={{fontWeight:700, fontSize:15}}>{text}</div>
                  <div style={{fontSize:13, color:'#ffd000', marginTop:4, fontWeight:600}}>{sub}</div>
                </div>
              </div>
            ))}
          </div>
          <a href={`https://wa.me/${WHATSAPP}`} style={{
            display:'inline-block', marginTop:36,
            padding:'14px 40px', borderRadius:12,
            background:'#25d366', color:'#fff',
            textDecoration:'none', fontWeight:800, fontSize:16,
            boxShadow:'0 8px 24px rgba(37,211,102,0.3)'
          }}>ابعت رقم العملية على واتساب 📱</a>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{padding:'32px 5%', textAlign:'center', color:'rgba(255,255,255,0.3)', fontSize:13}}>
        <div style={{display:'flex', alignItems:'center', justifyContent:'center', gap:8, marginBottom:8}}>
          <span style={{fontSize:18}}>📐</span>
          <span style={{fontWeight:700, color:'rgba(255,255,255,0.6)'}}>منصة الأستاذ ثروت</span>
        </div>
        <p>جميع الحقوق محفوظة © 2026</p>
      </footer>
    </main>
  )
}
