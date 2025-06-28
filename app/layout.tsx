import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: '멍사반 X 티어하우스 수제간식 공동구매',
  description: 'Created with v0',
  generator: 'v0.dev',
  openGraph: {
    title: '멍사반 X 티어하우스 수제간식 공동구매',
    description: 'Created with v0',
    type: 'website',
    siteName: '멍사반 X 티어하우스',
    locale: 'ko_KR',
    url: 'https://tierhaus-mungsaban.vercel.app/', // 실제 배포 URL로 교체 필요
    images: [
      {
        url: '/logo/공동구매 로고.png', // 
        width: 1200,
        height: 630,
        alt: '멍사반 X 티어하우스 수제간식 공동구매',
      },
    ],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
