import type { Metadata } from 'next'
import { Ubuntu, Hind } from 'next/font/google'
import './globals.css'

const ubuntu = Ubuntu({
  subsets: ['latin'],
  weight: ['300','400','500','700'],
  variable: '--font-ubuntu',
  display: 'swap',
})

const hind = Hind({
  subsets: ['latin'],
  weight: ['300','400','500','600'],
  variable: '--font-hind',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Lakes Region Web Co. — We Build Websites That Drive Results',
  description: 'Custom-designed, performance-first websites built to grow your business. No templates, no shortcuts.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${ubuntu.variable} ${hind.variable}`}>{children}</body>
    </html>
  )
}
