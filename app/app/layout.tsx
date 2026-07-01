import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'منصة الأستاذ ثروت - رياضيات الثانوي',
  description: 'منصة تعليمية متخصصة في الرياضيات للمرحلة الثانوية',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ar" dir="rtl">
      <body>{children}</body>
    </html>
  )
}
