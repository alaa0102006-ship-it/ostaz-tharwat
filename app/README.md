# منصة الأستاذ ثروت 🎓

## خطوات الإعداد

### 1. Supabase
- روح supabase.com وافتح مشروع جديد
- في SQL Editor انسخ محتوى ملف `supabase-schema.sql` وشغّله
- خد الـ URL و Anon Key و Service Role Key

### 2. ملف .env.local
```
NEXT_PUBLIC_SUPABASE_URL=رابط مشروعك
NEXT_PUBLIC_SUPABASE_ANON_KEY=مفتاحك
SUPABASE_SERVICE_ROLE_KEY=مفتاح الأدمن
```

### 3. حساب الأدمن
- سجل بإيميلك عادي
- في Supabase Table Editor افتح profiles
- غير role من student لـ admin
- خلي is_active = true

### 4. رفع على Vercel
- ارفع الكود على GitHub
- اربط Vercel بالـ Repository
- حط الـ Environment Variables
- Deploy!

### 5. رقم فودافون كاش
- غير الرقم في:
  - app/page.tsx
  - app/register/page.tsx

## الصفحات
- `/` الصفحة الرئيسية
- `/register` تسجيل طالب جديد
- `/login` تسجيل الدخول
- `/dashboard` لوحة الطالب
- `/course/[id]` مشاهدة الكورس
- `/admin` لوحة الأدمن
